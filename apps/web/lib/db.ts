import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "@nyuzi/db";

const url = process.env.DATABASE_URL || "file:./nyuzi.db";
const authToken = process.env.DATABASE_AUTH_TOKEN;

export const client = createClient({
  url,
  authToken,
});

export const db = drizzle(client, { schema });

// Auto-bootstrap schema in local development so the dev server runs with zero manual steps
let isInitialized = false;

export async function ensureTables() {
  if (isInitialized) return;
  try {
    await client.executeMultiple(`
      CREATE TABLE IF NOT EXISTS "user" (
        "id" TEXT PRIMARY KEY,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL UNIQUE,
        "email_verified" INTEGER NOT NULL DEFAULT 0,
        "image" TEXT,
        "created_at" INTEGER NOT NULL,
        "updated_at" INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS "session" (
        "id" TEXT PRIMARY KEY,
        "expires_at" INTEGER NOT NULL,
        "token" TEXT NOT NULL UNIQUE,
        "created_at" INTEGER NOT NULL,
        "updated_at" INTEGER NOT NULL,
        "ip_address" TEXT,
        "user_agent" TEXT,
        "user_id" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "account" (
        "id" TEXT PRIMARY KEY,
        "account_id" TEXT NOT NULL,
        "provider_id" TEXT NOT NULL,
        "user_id" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
        "access_token" TEXT,
        "refresh_token" TEXT,
        "id_token" TEXT,
        "access_token_expires_at" INTEGER,
        "refresh_token_expires_at" INTEGER,
        "scope" TEXT,
        "password" TEXT,
        "created_at" INTEGER NOT NULL,
        "updated_at" INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS "verification" (
        "id" TEXT PRIMARY KEY,
        "identifier" TEXT NOT NULL,
        "value" TEXT NOT NULL,
        "expires_at" INTEGER NOT NULL,
        "created_at" INTEGER,
        "updated_at" INTEGER
      );

      CREATE TABLE IF NOT EXISTS "sites" (
        "id" TEXT PRIMARY KEY,
        "name" TEXT NOT NULL,
        "domain" TEXT NOT NULL,
        "owner_id" TEXT REFERENCES "user"("id"),
        "owner_email" TEXT,
        "turnstile_enabled" INTEGER NOT NULL DEFAULT 0,
        "moderation_required" INTEGER NOT NULL DEFAULT 0,
        "settings" TEXT DEFAULT '{}',
        "created_at" INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS "threads" (
        "id" TEXT PRIMARY KEY,
        "site_id" TEXT NOT NULL REFERENCES "sites"("id"),
        "url" TEXT NOT NULL,
        "title" TEXT,
        "comment_count" INTEGER NOT NULL DEFAULT 0,
        "reactions" TEXT DEFAULT '{}',
        "created_at" INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS "comments" (
        "id" TEXT PRIMARY KEY,
        "site_id" TEXT NOT NULL REFERENCES "sites"("id"),
        "thread_id" TEXT NOT NULL REFERENCES "threads"("id"),
        "parent_id" TEXT,
        "author_name" TEXT NOT NULL,
        "author_email" TEXT,
        "content" TEXT NOT NULL,
        "status" TEXT NOT NULL DEFAULT 'approved',
        "notify_on_reply" INTEGER NOT NULL DEFAULT 1,
        "upvotes" INTEGER NOT NULL DEFAULT 0,
        "created_at" INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS "authors" (
        "id" TEXT PRIMARY KEY,
        "site_id" TEXT NOT NULL REFERENCES "sites"("id"),
        "name" TEXT NOT NULL,
        "email" TEXT,
        "status" TEXT NOT NULL DEFAULT 'active',
        "auto_discovered" INTEGER NOT NULL DEFAULT 0,
        "created_at" INTEGER NOT NULL
      );
    `);
    isInitialized = true;
  } catch (err) {
    console.error("Failed to ensure database tables:", err);
  }
}

// Trigger initial ensure on first load
void ensureTables();
