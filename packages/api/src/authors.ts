/**
 * Author Roster & Resolution Engine
 * Maps publication authors to notification emails
 */

export interface AuthorEntry {
  name: string;
  email: string | null;
}

export const TRC_AUTHOR_ROSTER: Record<string, string> = {
  "fred juma": "fredjuma8@gmail.com",
  "sumeiya juma": "readingcircle254@gmail.com",
  "sumaiya juma": "readingcircle254@gmail.com",
  "brenda frenjo": "readingcircle254@gmail.com",
  "the reading circle": "readingcircle254@gmail.com",
};

/**
 * Resolves all author emails for a given author string.
 * Supports co-authored posts (e.g. "Fred Juma, Brenda Frenjo")
 */
export function resolveAuthorEmails(
  rawAuthorString?: string | null,
  siteId?: string
): Array<{ name: string; email: string }> {
  const results: Array<{ name: string; email: string }> = [];
  const seenEmails = new Set<string>();

  if (rawAuthorString && typeof rawAuthorString === "string") {
    // Split by comma, "and", "&"
    const authorNames = rawAuthorString
      .split(/,|\band\b|&/i)
      .map((s) => s.trim())
      .filter(Boolean);

    for (const name of authorNames) {
      const normalized = name.toLowerCase();
      const email = TRC_AUTHOR_ROSTER[normalized];
      if (email && !seenEmails.has(email.toLowerCase())) {
        seenEmails.add(email.toLowerCase());
        results.push({ name, email });
      }
    }
  }

  // Fallback to TRC general publication email if no author email mapped yet or postAuthor not passed
  if (results.length === 0 && siteId === "trc254") {
    results.push({ name: "The Reading Circle 254", email: "readingcircle254@gmail.com" });
  }

  return results;
}
