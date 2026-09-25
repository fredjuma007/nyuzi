import { Hono } from "hono";
import { cors } from "hono/cors";
import { drizzle } from "drizzle-orm/d1";
import { eq, and, asc, sql } from "drizzle-orm";
import { sites, threads, comments } from "@nyuzi/db";
import { sendReplyNotificationEmail } from "./email";

type Bindings = {
  DB: D1Database;
  TURNSTILE_SECRET_KEY?: string;
  RESEND_API_KEY?: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// Enable CORS for embed widgets on external sites
app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

// Basic edge-friendly input sanitizer
function sanitizeContent(raw: string): string {
  return raw
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "")
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, "")
    .replace(/javascript:[^"']*/gi, "")
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
    .trim();
}

app.get("/", (c) => {
  return c.json({
    name: "Nyuzi Edge Comments API",
    status: "online",
    version: "0.1.0",
    docs: "/health",
    endpoints: {
      health: "GET /health",
      getComments: "GET /api/v1/comments?siteId={id}&threadUrl={url}",
      postComment: "POST /api/v1/comments",
      upvoteComment: "POST /api/v1/comments/:id/upvote",
    },
  });
});

app.get("/health", (c) => {
  return c.json({
    status: "ok",
    service: "nyuzi-api",
    timestamp: new Date().toISOString(),
  });
});

// GET /api/v1/comments?siteId=...&threadUrl=...
app.get("/api/v1/comments", async (c) => {
  const siteId = c.req.query("siteId");
  const threadUrl = c.req.query("threadUrl");

  if (!siteId || !threadUrl) {
    return c.json(
      { error: "Missing required query parameters: siteId and threadUrl" },
      400
    );
  }

  const db = drizzle(c.env.DB);

  // 1. Find thread
  const [thread] = await db
    .select()
    .from(threads)
    .where(and(eq(threads.siteId, siteId), eq(threads.url, threadUrl)))
    .limit(1);

  if (!thread) {
    return c.json({
      thread: null,
      comments: [],
      total: 0,
    });
  }

  // 2. Fetch approved comments for this thread
  const threadComments = await db
    .select({
      id: comments.id,
      parentId: comments.parentId,
      authorName: comments.authorName,
      content: comments.content,
      status: comments.status,
      upvotes: comments.upvotes,
      createdAt: comments.createdAt,
    })
    .from(comments)
    .where(
      and(
        eq(comments.threadId, thread.id),
        eq(comments.status, "approved")
      )
    )
    .orderBy(asc(comments.createdAt));

  return c.json({
    thread: {
      id: thread.id,
      url: thread.url,
      title: thread.title,
      commentCount: threadComments.length,
    },
    comments: threadComments,
    total: threadComments.length,
  });
});

// POST /api/v1/comments
app.post("/api/v1/comments", async (c) => {
  let body: any;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const {
    siteId,
    threadUrl,
    threadTitle,
    parentId,
    authorName,
    authorEmail,
    content,
    notifyOnReply = true,
    turnstileToken,
  } = body;

  if (!siteId || typeof siteId !== "string") {
    return c.json({ error: "siteId is required" }, 400);
  }
  if (!threadUrl || typeof threadUrl !== "string") {
    return c.json({ error: "threadUrl is required" }, 400);
  }
  if (!authorName || typeof authorName !== "string" || !authorName.trim()) {
    return c.json({ error: "authorName is required" }, 400);
  }
  if (!content || typeof content !== "string" || !content.trim()) {
    return c.json({ error: "content is required" }, 400);
  }

  const cleanAuthor = sanitizeContent(authorName).slice(0, 60);
  const cleanContent = sanitizeContent(content).slice(0, 3000);
  const cleanEmail =
    typeof authorEmail === "string" && authorEmail.includes("@")
      ? authorEmail.trim().slice(0, 120)
      : null;

  if (!cleanAuthor) {
    return c.json({ error: "Author name contains invalid characters" }, 400);
  }
  if (!cleanContent) {
    return c.json({ error: "Comment content is empty or contains invalid markup" }, 400);
  }

  const db = drizzle(c.env.DB);

  // 1. Ensure site exists (auto-provision demo/dev site if first time)
  let [site] = await db.select().from(sites).where(eq(sites.id, siteId)).limit(1);
  if (!site) {
    const newSite = {
      id: siteId,
      name: siteId === "trc254" ? "TRC 254" : "Default Site",
      domain: "*",
      turnstileEnabled: false,
      moderationRequired: false,
      createdAt: new Date(),
    };
    await db.insert(sites).values(newSite);
    site = newSite as any;
  }

  // 2. Turnstile Verification (if enabled on site and secret provided)
  if (site.turnstileEnabled && c.env.TURNSTILE_SECRET_KEY) {
    if (!turnstileToken) {
      return c.json({ error: "Captcha verification required" }, 400);
    }
    const verifyFormData = new FormData();
    verifyFormData.append("secret", c.env.TURNSTILE_SECRET_KEY);
    verifyFormData.append("response", turnstileToken);
    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: verifyFormData,
    });
    const verifyData: any = await verifyRes.json();
    if (!verifyData.success) {
      return c.json({ error: "Captcha verification failed. Please try again." }, 403);
    }
  }

  // 3. Ensure thread exists
  let [thread] = await db
    .select()
    .from(threads)
    .where(and(eq(threads.siteId, siteId), eq(threads.url, threadUrl)))
    .limit(1);

  if (!thread) {
    const newThreadId = "th_" + crypto.randomUUID().replace(/-/g, "").slice(0, 16);
    const newThread = {
      id: newThreadId,
      siteId,
      url: threadUrl,
      title: threadTitle || "Untitled Thread",
      commentCount: 1,
      createdAt: new Date(),
    };
    await db.insert(threads).values(newThread);
    thread = newThread as any;
  } else {
    await db
      .update(threads)
      .set({ commentCount: (thread.commentCount || 0) + 1 })
      .where(eq(threads.id, thread.id));
  }

  // 4. Create comment
  const commentId = "cmt_" + crypto.randomUUID().replace(/-/g, "").slice(0, 16);
  const now = new Date();

  await db.insert(comments).values({
    id: commentId,
    siteId,
    threadId: thread.id,
    parentId: parentId || null,
    authorName: cleanAuthor,
    authorEmail: cleanEmail,
    content: cleanContent,
    status: "approved",
    notifyOnReply: Boolean(notifyOnReply),
    upvotes: 0,
    createdAt: now,
  });

  // 5. Trigger reply email notification asynchronously
  if (parentId && c.env.RESEND_API_KEY) {
    c.executionCtx.waitUntil(
      (async () => {
        try {
          const [parentComment] = await db
            .select({
              id: comments.id,
              authorName: comments.authorName,
              authorEmail: comments.authorEmail,
              notifyOnReply: comments.notifyOnReply,
            })
            .from(comments)
            .where(eq(comments.id, parentId))
            .limit(1);

          if (
            parentComment &&
            parentComment.authorEmail &&
            parentComment.notifyOnReply &&
            (!cleanEmail || cleanEmail.toLowerCase() !== parentComment.authorEmail.toLowerCase())
          ) {
            await sendReplyNotificationEmail({
              apiKey: c.env.RESEND_API_KEY!,
              toEmail: parentComment.authorEmail,
              parentAuthorName: parentComment.authorName,
              replierName: cleanAuthor,
              replyContent: cleanContent,
              threadTitle: thread.title || threadTitle || "The Reading Circle",
              threadUrl,
              replyCommentId: commentId,
              siteName: site.name || "The Reading Circle",
              siteId,
            });
          }
        } catch (emailErr) {
          console.error("[Nyuzi Email] Trigger error:", emailErr);
        }
      })()
    );
  }

  return c.json(
    {
      success: true,
      comment: {
        id: commentId,
        parentId: parentId || null,
        authorName: cleanAuthor,
        content: cleanContent,
        status: "approved",
        upvotes: 0,
        createdAt: now.toISOString(),
      },
    },
    201
  );
});

// POST /api/v1/comments/:id/upvote
app.post("/api/v1/comments/:id/upvote", async (c) => {
  const commentId = c.req.param("id");
  if (!commentId) {
    return c.json({ error: "Comment ID required" }, 400);
  }

  let body: any = {};
  try {
    body = await c.req.json();
  } catch {}

  const isUnvote = body.action === "unvote" || body.action === "decrement";
  const db = drizzle(c.env.DB);

  // 1. Check comment exists
  const [existing] = await db
    .select()
    .from(comments)
    .where(eq(comments.id, commentId))
    .limit(1);

  if (!existing) {
    return c.json({ error: "Comment not found" }, 404);
  }

  // 2. Update upvotes atomically in SQLite
  if (isUnvote) {
    await db
      .update(comments)
      .set({ upvotes: sql`MAX(0, ${comments.upvotes} - 1)` })
      .where(eq(comments.id, commentId));
  } else {
    await db
      .update(comments)
      .set({ upvotes: sql`${comments.upvotes} + 1` })
      .where(eq(comments.id, commentId));
  }

  const currentCount = existing.upvotes || 0;
  const newCount = isUnvote ? Math.max(0, currentCount - 1) : currentCount + 1;

  return c.json({
    success: true,
    commentId,
    upvotes: newCount,
    action: isUnvote ? "unvote" : "upvote",
  });
});

export default app;