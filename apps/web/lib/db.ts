import { createClient } from "@libsql/client";
import { drizzle as drizzleLibsql } from "drizzle-orm/libsql";
import { drizzle as drizzleD1 } from "drizzle-orm/d1";
import * as schema from "@nyuzi/db";
import { createD1HttpClient, type D1DatabaseLike } from "./d1-http";

const isCloudflareD1 = Boolean(
  process.env.CLOUDFLARE_D1_API_TOKEN &&
  process.env.CLOUDFLARE_ACCOUNT_ID
);

let dbInstance: any;
let d1Client: D1DatabaseLike | null = null;
let libsqlClient: ReturnType<typeof createClient> | null = null;

if (isCloudflareD1) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID!;
  const databaseId =
    process.env.CLOUDFLARE_DATABASE_ID ||
    "8364d114-958c-4c1d-9875-b6e0781287da";
  const token = process.env.CLOUDFLARE_D1_API_TOKEN!;

  d1Client = createD1HttpClient({
    accountId,
    databaseId,
    token,
  });

  dbInstance = drizzleD1(d1Client as any, { schema });
} else {
  const url = process.env.DATABASE_URL || "file:./nyuzi.db";
  const authToken = process.env.DATABASE_AUTH_TOKEN;

  libsqlClient = createClient({
    url,
    authToken,
  });

  dbInstance = drizzleLibsql(libsqlClient, { schema });
}

import type { BaseSQLiteDatabase } from "drizzle-orm/sqlite-core";

export type NyuziDatabase = BaseSQLiteDatabase<"async", any, typeof schema>;
export const db: NyuziDatabase = dbInstance;

const SCHEMA_DDL = `
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

  CREATE TABLE IF NOT EXISTS "organization" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL UNIQUE,
    "logo" TEXT,
    "created_at" INTEGER NOT NULL,
    "metadata" TEXT DEFAULT '{}'
  );

  CREATE TABLE IF NOT EXISTS "member" (
    "id" TEXT PRIMARY KEY,
    "organization_id" TEXT NOT NULL REFERENCES "organization"("id") ON DELETE CASCADE,
    "user_id" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "role" TEXT NOT NULL DEFAULT 'owner',
    "created_at" INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "sites" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "owner_id" TEXT REFERENCES "user"("id"),
    "owner_email" TEXT,
    "organization_id" TEXT REFERENCES "organization"("id"),
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

  INSERT OR IGNORE INTO "organization" ("id", "name", "slug", "created_at")
  VALUES ('org_fred_personal', 'Fred''s Projects', 'freds-projects', unixepoch() * 1000);

  INSERT OR IGNORE INTO "sites" ("id", "name", "domain", "owner_email", "organization_id", "settings", "created_at")
  VALUES ('trc254', 'The Reading Circle', 'readingcircle254.com', 'fredjuma8@gmail.com', 'org_fred_personal', '{"accentColor":"#f56220"}', unixepoch() * 1000);
`;

let isInitialized = false;

export async function ensureTables() {
  if (isInitialized) return;
  try {
    if (d1Client) {
      await d1Client.exec(SCHEMA_DDL);
      try {
        await d1Client.exec('ALTER TABLE sites ADD COLUMN organization_id TEXT REFERENCES organization(id)');
      } catch {
        // Column already exists
      }
    } else if (libsqlClient) {
      await libsqlClient.executeMultiple(SCHEMA_DDL);
      try {
        await libsqlClient.execute('ALTER TABLE sites ADD COLUMN organization_id TEXT REFERENCES organization(id)');
      } catch {
        // Column already exists
      }
    }
    isInitialized = true;
  } catch (err) {
    console.error("Failed to ensure database tables:", err);
  }
}

// Trigger initial ensure on load
void ensureTables();
