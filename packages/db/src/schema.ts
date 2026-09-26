import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const sites = sqliteTable("sites", {
  id: text("id").primaryKey(), // site_xxx
  name: text("name").notNull(),
  domain: text("domain").notNull(), // allowed origin e.g. "thereservedcircle.com" or "*"
  ownerEmail: text("owner_email"),
  turnstileEnabled: integer("turnstile_enabled", { mode: "boolean" }).notNull().default(false),
  moderationRequired: integer("moderation_required", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const threads = sqliteTable("threads", {
  id: text("id").primaryKey(), // thread_xxx
  siteId: text("site_id").notNull().references(() => sites.id),
  url: text("url").notNull(),
  title: text("title"),
  commentCount: integer("comment_count").notNull().default(0),
  reactions: text("reactions").default("{}"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const comments = sqliteTable("comments", {
  id: text("id").primaryKey(), // cmt_xxx
  siteId: text("site_id").notNull().references(() => sites.id),
  threadId: text("thread_id").notNull().references(() => threads.id),
  parentId: text("parent_id"), // self-reference for nested replies
  authorName: text("author_name").notNull(),
  authorEmail: text("author_email"), // kept private, never exposed to public API
  content: text("content").notNull(),
  status: text("status", { enum: ["approved", "pending", "spam", "deleted"] })
    .notNull()
    .default("approved"),
  notifyOnReply: integer("notify_on_reply", { mode: "boolean" }).notNull().default(true),
  upvotes: integer("upvotes").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const authors = sqliteTable(
  "authors",
  {
    id: text("id").primaryKey(), // auth_xxx
    siteId: text("site_id").notNull().references(() => sites.id),
    name: text("name").notNull(),
    email: text("email"),
    status: text("status", { enum: ["active", "discovered", "muted"] })
      .notNull()
      .default("active"),
    autoDiscovered: integer("auto_discovered", { mode: "boolean" }).notNull().default(false),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  }
);

export type Site = typeof sites.$inferSelect;
export type Thread = typeof threads.$inferSelect;
export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;
export type Author = typeof authors.$inferSelect;
export type NewAuthor = typeof authors.$inferInsert;