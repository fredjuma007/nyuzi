import { Hono } from "hono";
import { cors } from "hono/cors";
import { drizzle } from "drizzle-orm/d1";
import { eq, and, asc, desc, isNull, isNotNull, sql } from "drizzle-orm";
import { sites, threads, comments, authors } from "@nyuzi/db";
import { sendReplyNotificationEmail, sendAuthorNotificationEmail } from "./email";
import { resolveAndProvisionAuthors } from "./authors";

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
    allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
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

// GET /api/v1/comments?siteId=...&threadUrl=...&page=1&limit=15&highlight=cmt_xxx
app.get("/api/v1/comments", async (c) => {
  const siteId = c.req.query("siteId");
  const threadUrl = c.req.query("threadUrl");
  const pageParam = c.req.query("page");
  const limitParam = c.req.query("limit");
  const highlightId = c.req.query("highlight");

  if (!siteId || !threadUrl) {
    return c.json(
      { error: "Missing required query parameters: siteId and threadUrl" },
      400
    );
  }

  const db = drizzle(c.env.DB);

  // Fetch site settings for remote widget configuration
  const [site] = await db
    .select({ settings: sites.settings })
    .from(sites)
    .where(eq(sites.id, siteId))
    .limit(1);

  let siteSettings: Record<string, any> = {};
  try {
    siteSettings = site?.settings ? JSON.parse(site.settings) : {};
  } catch {}

  // 1. Find thread
  const [thread] = await db
    .select()
    .from(threads)
    .where(and(eq(threads.siteId, siteId), eq(threads.url, threadUrl)))
    .limit(1);

  if (!thread) {
    return c.json({
      siteSettings,
      thread: null,
      comments: [],
      total: 0,
      pagination: {
        page: 1,
        limit: 15,
        totalTopLevel: 0,
        totalComments: 0,
        hasMore: false,
      },
    });
  }

  // 2. Count total top-level comments and total approved comments
  const [topLevelCountResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(comments)
    .where(
      and(
        eq(comments.threadId, thread.id),
        eq(comments.status, "approved"),
        isNull(comments.parentId)
      )
    );
  const totalTopLevel = Number(topLevelCountResult?.count || 0);

  const [totalCommentsResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(comments)
    .where(
      and(
        eq(comments.threadId, thread.id),
        eq(comments.status, "approved")
      )
    );
  const totalCommentsCount = Number(totalCommentsResult?.count || 0);

  // Pagination parameters
  const page = Math.max(1, parseInt(pageParam || "1", 10) || 1);
  const isAll = limitParam === "all";
  const limit = isAll ? 1000 : Math.min(100, Math.max(1, parseInt(limitParam || "15", 10) || 15));
  const offset = (page - 1) * limit;

  // 3. Fetch top-level comments (NEWEST FIRST)
  const topLevelComments = await db
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
        eq(comments.status, "approved"),
        isNull(comments.parentId)
      )
    )
    .orderBy(desc(comments.createdAt))
    .limit(limit)
    .offset(offset);

  // 4. Fetch all approved replies for this thread (OLDEST FIRST for natural conversation flow)
  const threadReplies = await db
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
        eq(comments.status, "approved"),
        isNotNull(comments.parentId)
      )
    )
    .orderBy(asc(comments.createdAt));

  // 5. Ensure highlighted comment is present if deep-linking
  if (highlightId && !topLevelComments.some((c) => c.id === highlightId) && !threadReplies.some((r) => r.id === highlightId)) {
    const [highlightComment] = await db
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
      .where(and(eq(comments.id, highlightId), eq(comments.status, "approved")))
      .limit(1);

    if (highlightComment) {
      if (highlightComment.parentId) {
        threadReplies.push(highlightComment);
        if (!topLevelComments.some((c) => c.id === highlightComment.parentId)) {
          const [parent] = await db
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
            .where(eq(comments.id, highlightComment.parentId))
            .limit(1);
          if (parent) topLevelComments.push(parent);
        }
      } else {
        topLevelComments.unshift(highlightComment);
      }
    }
  }

  const hasMore = offset + topLevelComments.length < totalTopLevel;

  return c.json({
    siteSettings,
    thread: {
      id: thread.id,
      url: thread.url,
      title: thread.title,
      commentCount: totalCommentsCount,
      reactions: (() => {
        try {
          return thread.reactions ? JSON.parse(thread.reactions) : {};
        } catch {
          return {};
        }
      })(),
    },
    comments: [...topLevelComments, ...threadReplies],
    pagination: {
      page,
      limit,
      totalTopLevel,
      totalComments: totalCommentsCount,
      hasMore,
    },
    total: totalCommentsCount,
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
    postAuthor,
    postAuthorEmail,
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

  // 6. Trigger publication author notification asynchronously
  if (c.env.RESEND_API_KEY) {
    c.executionCtx.waitUntil(
      (async () => {
        try {
          const authorRecipients = await resolveAndProvisionAuthors(
            db,
            siteId,
            postAuthor,
            postAuthorEmail
          );
          for (const recipient of authorRecipients) {
            // Self-comment guard: don't alert the author if the author is the one commenting
            if (cleanEmail && cleanEmail.toLowerCase() === recipient.email.toLowerCase()) {
              continue;
            }

            await sendAuthorNotificationEmail({
              apiKey: c.env.RESEND_API_KEY!,
              toEmail: recipient.email,
              authorName: recipient.name,
              commenterName: cleanAuthor,
              commentContent: cleanContent,
              threadTitle: thread.title || threadTitle || "The Reading Circle",
              threadUrl,
              commentId,
              siteName: site.name || "The Reading Circle",
              siteId,
              isReply: Boolean(parentId),
            });
          }
        } catch (authorErr) {
          console.error("[Nyuzi Author Alert] Trigger error:", authorErr);
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

// POST /api/v1/threads/react
app.post("/api/v1/threads/react", async (c) => {
  let body: any;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const { siteId, threadUrl, threadTitle, reactionKey, previousKey, action } = body;

  if (!siteId || !threadUrl || !reactionKey) {
    return c.json({ error: "siteId, threadUrl, and reactionKey are required" }, 400);
  }

  const db = drizzle(c.env.DB);

  // 1. Find or create thread
  let [thread] = await db
    .select()
    .from(threads)
    .where(and(eq(threads.siteId, siteId), eq(threads.url, threadUrl)))
    .limit(1);

  let reactionsObj: Record<string, number> = {};

  if (!thread) {
    const newThreadId = "th_" + crypto.randomUUID().replace(/-/g, "").slice(0, 16);
    if (action === "unvote") {
      reactionsObj = {};
    } else {
      reactionsObj[reactionKey] = 1;
    }

    const newThread = {
      id: newThreadId,
      siteId,
      url: threadUrl,
      title: threadTitle || "Untitled Thread",
      commentCount: 0,
      reactions: JSON.stringify(reactionsObj),
      createdAt: new Date(),
    };
    await db.insert(threads).values(newThread);
    thread = newThread as any;
  } else {
    try {
      reactionsObj = thread.reactions ? JSON.parse(thread.reactions) : {};
    } catch {
      reactionsObj = {};
    }

    if (action === "unvote") {
      reactionsObj[reactionKey] = Math.max(0, (reactionsObj[reactionKey] || 1) - 1);
      if (reactionsObj[reactionKey] === 0) delete reactionsObj[reactionKey];
    } else if (action === "switch" && previousKey) {
      reactionsObj[previousKey] = Math.max(0, (reactionsObj[previousKey] || 1) - 1);
      if (reactionsObj[previousKey] === 0) delete reactionsObj[previousKey];
      reactionsObj[reactionKey] = (reactionsObj[reactionKey] || 0) + 1;
    } else {
      reactionsObj[reactionKey] = (reactionsObj[reactionKey] || 0) + 1;
    }

    await db
      .update(threads)
      .set({ reactions: JSON.stringify(reactionsObj) })
      .where(eq(threads.id, thread.id));
  }

  return c.json({
    success: true,
    reactions: reactionsObj,
    activeKey: action === "unvote" ? null : reactionKey,
  });
});

// GET /api/v1/dashboard?siteId=...
app.get("/api/v1/dashboard", async (c) => {
  const siteId = c.req.query("siteId");
  if (!siteId) {
    return c.json({ error: "siteId query parameter is required" }, 400);
  }

  const db = drizzle(c.env.DB);

  // 1. Check site
  const [site] = await db.select().from(sites).where(eq(sites.id, siteId)).limit(1);

  // 2. Metrics: Total Comments & Upvotes
  const [commentStats] = await db
    .select({
      totalComments: sql<number>`count(${comments.id})`,
      totalUpvotes: sql<number>`coalesce(sum(${comments.upvotes}), 0)`,
    })
    .from(comments)
    .where(and(eq(comments.siteId, siteId), sql`${comments.status} != 'deleted'`));

  // 3. Metrics: Total Threads
  const [threadStats] = await db
    .select({
      totalThreads: sql<number>`count(${threads.id})`,
    })
    .from(threads)
    .where(eq(threads.siteId, siteId));

  // 4. Recent comments stream (joined with threads to get thread title & url)
  const recentComments = await db
    .select({
      id: comments.id,
      parentId: comments.parentId,
      authorName: comments.authorName,
      authorEmail: comments.authorEmail,
      content: comments.content,
      status: comments.status,
      upvotes: comments.upvotes,
      createdAt: comments.createdAt,
      threadTitle: threads.title,
      threadUrl: threads.url,
    })
    .from(comments)
    .leftJoin(threads, eq(comments.threadId, threads.id))
    .where(and(eq(comments.siteId, siteId), sql`${comments.status} != 'deleted'`))
    .orderBy(desc(comments.createdAt))
    .limit(50);

  // 5. Active threads
  const activeThreads = await db
    .select({
      id: threads.id,
      title: threads.title,
      url: threads.url,
      commentCount: threads.commentCount,
      createdAt: threads.createdAt,
    })
    .from(threads)
    .where(eq(threads.siteId, siteId))
    .orderBy(desc(threads.commentCount), desc(threads.createdAt))
    .limit(25);

  // 6. Comments grouped by author for roster stats
  const authorCounts = await db
    .select({
      authorName: comments.authorName,
      count: sql<number>`count(${comments.id})`,
    })
    .from(comments)
    .where(and(eq(comments.siteId, siteId), sql`${comments.status} != 'deleted'`))
    .groupBy(comments.authorName);

  const authorCountMap: Record<string, number> = {};
  if (Array.isArray(authorCounts)) {
    for (const item of authorCounts) {
      if (item.authorName) {
        authorCountMap[item.authorName] = Number(item.count || 0);
      }
    }
  }

  return c.json({
    success: true,
    site: site || {
      id: siteId,
      name: siteId === "trc254" ? "The Reading Circle 254" : "Demo Sandbox",
      domain: siteId === "trc254" ? "readingcircle254.com" : "*",
    },
    metrics: {
      totalComments: commentStats?.totalComments || 0,
      totalThreads: threadStats?.totalThreads || 0,
      totalUpvotes: commentStats?.totalUpvotes || 0,
    },
    comments: recentComments,
    recentComments: recentComments,
    threads: activeThreads,
    authorCounts: authorCounts,
    authorCountMap: authorCountMap,
  });
});

// PATCH /api/v1/comments/:id (supports both content editing & moderation status updates)
app.patch("/api/v1/comments/:id", async (c) => {
  const commentId = c.req.param("id");
  let body: any = {};
  try {
    body = await c.req.json();
  } catch {}

  const db = drizzle(c.env.DB);
  const updates: Record<string, any> = {};

  if (body.status !== undefined) {
    if (!["approved", "pending", "spam", "deleted"].includes(body.status)) {
      return c.json({ error: "Invalid status" }, 400);
    }
    updates.status = body.status;
  }

  if (typeof body.content === "string") {
    const clean = sanitizeContent(body.content).slice(0, 3000);
    if (!clean) {
      return c.json({ error: "Comment content cannot be empty" }, 400);
    }
    updates.content = clean;
  }

  if (Object.keys(updates).length === 0) {
    return c.json({ error: "No valid fields to update" }, 400);
  }

  await db
    .update(comments)
    .set(updates)
    .where(eq(comments.id, commentId));

  return c.json({ success: true, commentId, ...updates });
});

// PATCH /api/v1/comments/:id/status (legacy alias)
app.patch("/api/v1/comments/:id/status", async (c) => {
  const commentId = c.req.param("id");
  let body: any = {};
  try {
    body = await c.req.json();
  } catch {}

  const { status } = body;
  if (!["approved", "pending", "spam", "deleted"].includes(status)) {
    return c.json({ error: "Invalid status" }, 400);
  }

  const db = drizzle(c.env.DB);
  await db
    .update(comments)
    .set({ status })
    .where(eq(comments.id, commentId));

  return c.json({ success: true, commentId, status });
});

// DELETE /api/v1/comments/:id
app.delete("/api/v1/comments/:id", async (c) => {
  const commentId = c.req.param("id");
  const db = drizzle(c.env.DB);

  const [existing] = await db.select().from(comments).where(eq(comments.id, commentId)).limit(1);
  if (existing) {
    await db
      .update(comments)
      .set({ status: "deleted" })
      .where(eq(comments.id, commentId));

    if (existing.threadId) {
      await db
        .update(threads)
        .set({ commentCount: sql`max(0, ${threads.commentCount} - 1)` })
        .where(eq(threads.id, existing.threadId));
    }
  }

  return c.json({ success: true, commentId, status: "deleted" });
});

// GET /api/v1/authors?siteId=...
app.get("/api/v1/authors", async (c) => {
  const siteId = c.req.query("siteId");
  if (!siteId) return c.json({ error: "siteId query parameter is required" }, 400);

  const db = drizzle(c.env.DB);

  try {
    // 1. Fetch authors for this site
    const siteAuthors = await db
      .select()
      .from(authors)
      .where(eq(authors.siteId, siteId))
      .orderBy(desc(authors.createdAt));

    // 2. Aggregate discussion counts per author
    const authorCounts = await db
      .select({
        authorName: comments.authorName,
        count: sql<number>`count(${comments.id})`,
      })
      .from(comments)
      .where(and(eq(comments.siteId, siteId), sql`${comments.status} != 'deleted'`))
      .groupBy(comments.authorName);

    const countMap: Record<string, number> = {};
    for (const ac of authorCounts) {
      if (ac.authorName) {
        countMap[ac.authorName.toLowerCase()] = Number(ac.count || 0);
      }
    }

    const enrichedAuthors = siteAuthors.map((a) => ({
      id: a.id,
      name: a.name,
      email: a.email,
      status: a.status,
      autoDiscovered: Boolean(a.autoDiscovered),
      discussionsCount: countMap[a.name.toLowerCase()] ?? 0,
      createdAt: a.createdAt,
    }));

    return c.json({ success: true, authors: enrichedAuthors });
  } catch (err: any) {
    console.error("[Nyuzi Authors] Fetch error:", err);
    return c.json({ success: false, error: err.message || "Failed to load authors" }, 500);
  }
});

// POST /api/v1/authors
app.post("/api/v1/authors", async (c) => {
  let body: any = {};
  try {
    body = await c.req.json();
  } catch {}

  const { siteId, name, email, status = "active" } = body;
  if (!siteId || !name?.trim()) {
    return c.json({ error: "siteId and author name are required" }, 400);
  }

  const cleanName = sanitizeContent(name).slice(0, 60);
  const cleanEmail =
    typeof email === "string" && email.includes("@") ? email.trim().slice(0, 120) : null;
  const db = drizzle(c.env.DB);

  // Check if author already exists for this site (case-insensitive)
  const [existing] = await db
    .select()
    .from(authors)
    .where(and(eq(authors.siteId, siteId), sql`lower(${authors.name}) = ${cleanName.toLowerCase()}`))
    .limit(1);

  if (existing) {
    await db
      .update(authors)
      .set({
        email: cleanEmail ?? existing.email,
        status: (status as any) || existing.status,
      })
      .where(eq(authors.id, existing.id));

    return c.json({
      success: true,
      author: { ...existing, email: cleanEmail ?? existing.email, status },
    });
  }

  const authorId = "auth_" + crypto.randomUUID().replace(/-/g, "").slice(0, 16);
  const newAuthor = {
    id: authorId,
    siteId,
    name: cleanName,
    email: cleanEmail,
    status: (status as any) || "active",
    autoDiscovered: false,
    createdAt: new Date(),
  };

  await db.insert(authors).values(newAuthor);

  return c.json({ success: true, author: newAuthor }, 201);
});

// PATCH /api/v1/authors/:id
app.patch("/api/v1/authors/:id", async (c) => {
  const authorId = c.req.param("id");
  let body: any = {};
  try {
    body = await c.req.json();
  } catch {}

  const updates: Record<string, any> = {};
  if (typeof body.name === "string" && body.name.trim()) {
    updates.name = sanitizeContent(body.name).slice(0, 60);
  }
  if (body.email !== undefined) {
    updates.email =
      typeof body.email === "string" && body.email.includes("@")
        ? body.email.trim().slice(0, 120)
        : null;
  }
  if (["active", "discovered", "muted"].includes(body.status)) {
    updates.status = body.status;
  }

  if (Object.keys(updates).length === 0) {
    return c.json({ error: "No valid fields to update" }, 400);
  }

  const db = drizzle(c.env.DB);
  await db.update(authors).set(updates).where(eq(authors.id, authorId));

  return c.json({ success: true, authorId, ...updates });
});

// DELETE /api/v1/authors/:id
app.delete("/api/v1/authors/:id", async (c) => {
  const authorId = c.req.param("id");
  const db = drizzle(c.env.DB);
  await db.delete(authors).where(eq(authors.id, authorId));
  return c.json({ success: true, authorId, deleted: true });
});

// GET /api/v1/sites/:id/settings
app.get("/api/v1/sites/:id/settings", async (c) => {
  const siteId = c.req.param("id");
  const db = drizzle(c.env.DB);

  const [site] = await db
    .select({ id: sites.id, name: sites.name, domain: sites.domain, settings: sites.settings })
    .from(sites)
    .where(eq(sites.id, siteId))
    .limit(1);

  if (!site) {
    return c.json({ siteId, settings: {} });
  }

  let settingsObj: Record<string, any> = {};
  try {
    settingsObj = site.settings ? JSON.parse(site.settings) : {};
  } catch {}

  return c.json({ siteId, name: site.name, domain: site.domain, settings: settingsObj });
});

// POST /api/v1/sites/:id/settings (Save/Publish Remote Dashboard Settings)
app.post("/api/v1/sites/:id/settings", async (c) => {
  const siteId = c.req.param("id");
  let body: any = {};
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const incomingSettings = body.settings ?? body;
  const db = drizzle(c.env.DB);

  const [existingSite] = await db
    .select()
    .from(sites)
    .where(eq(sites.id, siteId))
    .limit(1);

  let mergedSettings: Record<string, any> = {};

  if (!existingSite) {
    mergedSettings = incomingSettings;
    await db.insert(sites).values({
      id: siteId,
      name: siteId === "trc254" ? "The Reading Circle" : "My Publication",
      domain: "*",
      settings: JSON.stringify(mergedSettings),
      createdAt: new Date(),
    });
  } else {
    try {
      mergedSettings = existingSite.settings ? JSON.parse(existingSite.settings) : {};
    } catch {}
    mergedSettings = { ...mergedSettings, ...incomingSettings };
    await db
      .update(sites)
      .set({ settings: JSON.stringify(mergedSettings) })
      .where(eq(sites.id, siteId));
  }

  return c.json({ success: true, siteId, settings: mergedSettings });
});

export default app;