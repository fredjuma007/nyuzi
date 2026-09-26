import { eq, and, sql } from "drizzle-orm";
import { authors } from "@nyuzi/db";

/**
 * Author Ingestion & Resolution Engine
 * Handles persistent D1 storage, auto-discovery of new contributors, and email alert routing
 */

export interface AuthorRecipient {
  name: string;
  email: string;
  authorId?: string;
  status?: string;
}

export const FALLBACK_AUTHOR_ROSTER: Record<string, string> = {
  "fred juma": "fredjuma8@gmail.com",
  "brenda frenjo": "readingcircle254@gmail.com",
  "sumeiya juma": "readingcircle254@gmail.com",
  "sumaiya juma": "readingcircle254@gmail.com",
  "the reading circle": "readingcircle254@gmail.com",
};

/**
 * Parses raw author strings (e.g. "Fred Juma, Brenda Frenjo" or "Fred Juma & Amina")
 */
export function parseAuthorNames(rawAuthorString?: string | null): string[] {
  if (!rawAuthorString || typeof rawAuthorString !== "string") return [];
  return rawAuthorString
    .split(/,|\band\b|&/i)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && s.length <= 60);
}

/**
 * Resolves author emails dynamically from Cloudflare D1.
 * Auto-provisions new writers as 'discovered' if seen for the first time.
 */
export async function resolveAndProvisionAuthors(
  db: any,
  siteId: string,
  rawAuthorString?: string | null,
  postAuthorEmail?: string | null
): Promise<AuthorRecipient[]> {
  const authorNames = parseAuthorNames(rawAuthorString);
  const results: AuthorRecipient[] = [];
  const seenEmails = new Set<string>();

  for (const name of authorNames) {
    const cleanName = name.trim();
    const normalized = cleanName.toLowerCase();

    try {
      // 1. Check if author already exists in D1 for this site
      const [existing] = await db
        .select()
        .from(authors)
        .where(
          and(
            eq(authors.siteId, siteId),
            sql`lower(${authors.name}) = ${normalized}`
          )
        )
        .limit(1);

      if (existing) {
        // If author is muted, do not send notification email
        if (existing.status === "muted") continue;

        const email = existing.email || FALLBACK_AUTHOR_ROSTER[normalized];
        if (email && !seenEmails.has(email.toLowerCase())) {
          seenEmails.add(email.toLowerCase());
          results.push({
            name: existing.name,
            email,
            authorId: existing.id,
            status: existing.status,
          });
        }
      } else {
        // 2. Auto-discover & provision new contributor in D1
        const newAuthorId = "auth_" + crypto.randomUUID().replace(/-/g, "").slice(0, 16);
        const resolvedEmail = postAuthorEmail || FALLBACK_AUTHOR_ROSTER[normalized] || null;
        const initialStatus = resolvedEmail ? "active" : "discovered";

        await db.insert(authors).values({
          id: newAuthorId,
          siteId,
          name: cleanName,
          email: resolvedEmail,
          status: initialStatus,
          autoDiscovered: true,
          createdAt: new Date(),
        });

        if (resolvedEmail && !seenEmails.has(resolvedEmail.toLowerCase())) {
          seenEmails.add(resolvedEmail.toLowerCase());
          results.push({
            name: cleanName,
            email: resolvedEmail,
            authorId: newAuthorId,
            status: initialStatus,
          });
        }
      }
    } catch (err) {
      console.warn(`[Author Ingestion] D1 lookup/provision error for "${cleanName}":`, err);

      // Fallback to static roster if D1 is still migrating
      const fallbackEmail = FALLBACK_AUTHOR_ROSTER[normalized];
      if (fallbackEmail && !seenEmails.has(fallbackEmail.toLowerCase())) {
        seenEmails.add(fallbackEmail.toLowerCase());
        results.push({ name: cleanName, email: fallbackEmail });
      }
    }
  }

  // 3. General Publication fallback if no specific author email could be mapped
  if (results.length === 0 && siteId === "trc254") {
    results.push({ name: "The Reading Circle 254", email: "readingcircle254@gmail.com" });
  }

  return results;
}
