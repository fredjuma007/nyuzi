import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// ==========================================
// 1. Better Auth Core Tables
// ==========================================

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull().default(false),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp" }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp" }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// ==========================================
// 2. Nyuzi Core Domain Tables
// ==========================================

export const sites = sqliteTable("sites", {
  id: text("id").primaryKey(), // site_xxx
  name: text("name").notNull(),
  domain: text("domain").notNull(), // allowed origin e.g. "thereservedcircle.com" or "*"
  ownerId: text("owner_id").references(() => user.id),
  ownerEmail: text("owner_email"),
  turnstileEnabled: integer("turnstile_enabled", { mode: "boolean" }).notNull().default(false),
  moderationRequired: integer("moderation_required", { mode: "boolean" }).notNull().default(false),
  settings: text("settings").default("{}"),
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

// Type Definitions
export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
export type Session = typeof session.$inferSelect;
export type Account = typeof account.$inferSelect;
export type Verification = typeof verification.$inferSelect;

export type Site = typeof sites.$inferSelect;
export type Thread = typeof threads.$inferSelect;
export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;
export type Author = typeof authors.$inferSelect;
export type NewAuthor = typeof authors.$inferInsert;