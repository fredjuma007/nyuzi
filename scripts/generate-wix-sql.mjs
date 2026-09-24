import fs from "fs";
import path from "path";

// Read our_book_club .env directly
const envPath = "C:\\Users\\fredj\\OneDrive\\Desktop\\programing\\MyProject\\JavaScript\\our_book_club\\.env";

function getEnv() {
  const env = {};
  if (fs.existsSync(envPath)) {
    const raw = fs.readFileSync(envPath, "utf-8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx !== -1) {
        const k = trimmed.slice(0, idx).trim();
        let v = trimmed.slice(idx + 1).trim();
        if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
          v = v.slice(1, -1);
        }
        env[k] = v;
      }
    }
  }
  return env;
}

const env = getEnv();
const apiKey = env.NEXT_PUBLIC_WIX_API_KEY;
const siteId = env.WIX_SITE_ID;
const accountId = env.NEXT_PUBLIC_WIX_ACCOUNT_ID;

function sqlEscape(str) {
  if (!str) return "''";
  return `'${String(str).replace(/'/g, "''")}'`;
}

function toUnixSeconds(dateStr) {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return Math.floor(Date.now() / 1000);
    return Math.floor(d.getTime() / 1000);
  } catch {
    return Math.floor(Date.now() / 1000);
  }
}

function cleanId(raw) {
  if (!raw) return "unknown";
  return raw.replace(/-/g, "").slice(0, 16);
}

async function queryCollection(collectionId) {
  const url = "https://www.wixapis.com/wix-data/v2/items/query";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey,
      "wix-site-id": siteId,
      "wix-account-id": accountId,
    },
    body: JSON.stringify({
      dataCollectionId: collectionId,
      query: { paging: { limit: 1000 } },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Wix API HTTP ${res.status}: ${text}`);
  }

  const data = await res.json();
  return data.dataItems || data.items || [];
}

async function generate() {
  console.log("Fetching existing comments and replies from Wix CMS...");
  const rawComments = await queryCollection("BlogComments");
  const rawReplies = await queryCollection("BlogReplies");

  console.log(`Fetched ${rawComments.length} comments and ${rawReplies.length} replies.`);

  const sqlLines = [];
  sqlLines.push("-- ==================================================");
  sqlLines.push("-- NYUZI WIX MIGRATION SCRIPT FOR TRC 254");
  sqlLines.push(`-- Generated: ${new Date().toISOString()}`);
  sqlLines.push("-- ==================================================");
  sqlLines.push("");

  // 1. Ensure site exists
  sqlLines.push("-- 1. Ensure Site Exists");
  sqlLines.push(
    `INSERT OR IGNORE INTO sites (id, name, domain, turnstile_enabled, moderation_required, created_at) ` +
    `VALUES ('trc254', 'TRC 254', 'www.readingcircle254.com', 0, 0, ${Math.floor(Date.now() / 1000)});\n`
  );

  // 2. Identify all unique blogIds to create thread records
  const blogThreads = new Map();
  rawComments.forEach((item) => {
    const d = item.data || item;
    if (d.blogId) {
      blogThreads.set(d.blogId, (blogThreads.get(d.blogId) || 0) + 1);
    }
  });

  rawReplies.forEach((item) => {
    const d = item.data || item;
    if (d.blogId) {
      blogThreads.set(d.blogId, (blogThreads.get(d.blogId) || 0) + 1);
    }
  });

  sqlLines.push("-- 2. Threads for Each Blog Post");
  for (const [blogId, count] of blogThreads.entries()) {
    const threadId = `th_${cleanId(blogId)}`;
    const url = `https://www.readingcircle254.com/blog/${blogId}`;
    sqlLines.push(
      `INSERT OR IGNORE INTO threads (id, site_id, url, title, comment_count, created_at) ` +
      `VALUES ('${threadId}', 'trc254', '${url}', 'Blog Discussion', ${count}, ${Math.floor(Date.now() / 1000)});`
    );
  }
  sqlLines.push("");

  // 3. Top-Level Comments
  sqlLines.push("-- 3. Top-Level Comments");
  for (const item of rawComments) {
    const d = item.data || item;
    const commentId = `cmt_${cleanId(item._id || d._id)}`;
    const threadId = `th_${cleanId(d.blogId)}`;
    const authorName = (d.name && d.name.trim()) ? d.name.trim() : "Anonymous";
    const content = d.comment || "";
    const createdAt = toUnixSeconds(d.createdAt || item._createdDate);

    sqlLines.push(
      `INSERT OR IGNORE INTO comments (id, site_id, thread_id, parent_id, author_name, author_email, content, status, notify_on_reply, upvotes, created_at) ` +
      `VALUES ('${commentId}', 'trc254', '${threadId}', NULL, ${sqlEscape(authorName)}, NULL, ${sqlEscape(content)}, 'approved', 1, 0, ${createdAt});`
    );
  }
  sqlLines.push("");

  // 4. Nested Replies
  sqlLines.push("-- 4. Nested Replies");
  for (const item of rawReplies) {
    const d = item.data || item;
    const replyId = `cmt_${cleanId(item._id || d._id)}`;
    const parentCommentId = `cmt_${cleanId(d.commentId)}`;
    const threadId = `th_${cleanId(d.blogId)}`;
    const authorName = (d.name && d.name.trim()) ? d.name.trim() : "Anonymous";
    const content = d.reply || "";
    const createdAt = toUnixSeconds(d.createdAt || item._createdDate);

    sqlLines.push(
      `INSERT OR IGNORE INTO comments (id, site_id, thread_id, parent_id, author_name, author_email, content, status, notify_on_reply, upvotes, created_at) ` +
      `VALUES ('${replyId}', 'trc254', '${threadId}', '${parentCommentId}', ${sqlEscape(authorName)}, NULL, ${sqlEscape(content)}, 'approved', 1, 0, ${createdAt});`
    );
  }

  const outPath = path.resolve(process.cwd(), "scripts", "wix-migration.sql");
  fs.writeFileSync(outPath, sqlLines.join("\n"), "utf-8");

  console.log(`\n✅ Generated SQL migration file: ${outPath}`);
  console.log(`Total statements: ${sqlLines.filter(l => l.startsWith("INSERT")).length}`);
}

generate().catch(console.error);
