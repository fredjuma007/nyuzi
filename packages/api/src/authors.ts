/**
 * Author Roster & Resolution Engine
 * Maps publication authors to notification emails
 */

export interface AuthorEntry {
  name: string;
  email: string | null;
}

// Initial Roster for Customer #0 (TRC 254)
// Authors without emails will later be editable via Nyuzi Dashboard
export const TRC_AUTHOR_ROSTER: Record<string, string> = {
  "fred juma": "fredjuma8@gmail.com",
  // "sumaiya juma": "...",
  // "brenda frenjo": "...",
};

/**
 * Resolves all author emails for a given author string.
 * Supports co-authored posts (e.g. "Fred Juma, Brenda Frenjo")
 */
export function resolveAuthorEmails(
  rawAuthorString?: string | null,
  siteId?: string
): Array<{ name: string; email: string }> {
  if (!rawAuthorString || typeof rawAuthorString !== "string") {
    return [];
  }

  // Split by comma, "and", "&"
  const authorNames = rawAuthorString
    .split(/,|\band\b|&/i)
    .map((s) => s.trim())
    .filter(Boolean);

  const results: Array<{ name: string; email: string }> = [];
  const seenEmails = new Set<string>();

  for (const name of authorNames) {
    const normalized = name.toLowerCase();
    const email = TRC_AUTHOR_ROSTER[normalized];
    if (email && !seenEmails.has(email.toLowerCase())) {
      seenEmails.add(email.toLowerCase());
      results.push({ name, email });
    }
  }

  return results;
}
