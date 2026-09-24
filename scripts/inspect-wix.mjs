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

console.log("--------------------------------------------------");
console.log("🔍 Querying Wix CMS for TRC 254 comments...");
console.log(`   Site ID: ${siteId}`);
console.log(`   Account ID: ${accountId}`);
console.log("--------------------------------------------------");

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
      query: {
        paging: { limit: 100 },
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Wix API HTTP ${res.status}: ${text}`);
  }

  const data = await res.json();
  return data.dataItems || data.items || [];
}

async function run() {
  try {
    const comments = await queryCollection("BlogComments");
    console.log(`✅ Fetched ${comments.length} items from 'BlogComments'`);

    let replies = [];
    try {
      replies = await queryCollection("BlogReplies");
      console.log(`✅ Fetched ${replies.length} items from 'BlogReplies'`);
    } catch (e) {
      console.log(`ℹ️ 'BlogReplies' query note: ${e.message}`);
    }

    console.log("\n--- Sample Comments Data ---");
    comments.slice(0, 3).forEach((item, i) => {
      const d = item.data || item;
      console.log(`[${i + 1}] Post ID: ${d.blogId}`);
      console.log(`    Author: ${d.name || "Anonymous"}`);
      console.log(`    Date: ${d.createdAt || item._createdDate || "N/A"}`);
      console.log(`    Content: "${d.comment || ""}"`);
    });

    console.log("\n--- Sample Replies Data ---");
    replies.slice(0, 3).forEach((item, i) => {
      const d = item.data || item;
      console.log(`[${i + 1}] Reply ID: ${d._id || item._id}`);
      console.log(`    Parent Comment ID: ${d.commentId}`);
      console.log(`    Author: ${d.name || "Anonymous"}`);
      console.log(`    Date: ${d.createdAt || item._createdDate || "N/A"}`);
      console.log(`    Content: "${d.reply || ""}"`);
    });

    console.log("\nAudit finished successfully.");
  } catch (err) {
    console.error("Query failed:", err);
  }
}

run();
