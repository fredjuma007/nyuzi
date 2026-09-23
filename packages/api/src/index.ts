import { Hono } from "hono";
import { cors } from "hono/cors";
import { drizzle } from "drizzle-orm/d1";
import { eq, and, asc } from "drizzle-orm";
import { sites, threads, comments } from "@nyuzi/db";

type Bindings = {
  DB: D1Database;
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

  const { siteId, threadUrl, threadTitle, parentId, authorName, authorEmail, content } = body;

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

  const cleanAuthor = authorName.trim().slice(0, 60);
  const cleanContent = content.trim().slice(0, 3000);
  const cleanEmail = typeof authorEmail === "string" ? authorEmail.trim().slice(0, 120) : null;

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

  // 2. Ensure thread exists
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

  // 3. Create comment
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
    upvotes: 0,
    createdAt: now,
  });

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

export default app;