import { NyuziComment } from "./types";

/**
 * HTML Template Generators & Micro-Markdown Parser for Nyuzi Commenting Widget
 */

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function formatTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffSec < 60) return "just now";
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    if (diffSec < 604800) return `${Math.floor(diffSec / 86400)}d ago`;

    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  } catch {
    return "recently";
  }
}

/**
 * Ultra-lightweight, safe Micro-Markdown parser (<1KB)
 * Supports: **bold**, *italic*, `code`, > quotes, [links](url), newlines
 */
export function formatMarkdown(raw: string, allowedFormatting?: string[]): string {
  if (!raw) return "";

  // 1. Escape HTML first to prevent any script/markup injection
  let text = escapeHtml(raw);

  const tools = allowedFormatting ?? ["bold", "italic", "quote", "code", "link"];

  // 2. Inline code: `code`
  if (tools.includes("code")) {
    text = text.replace(/`([^`\n]+)`/g, "<code>$1</code>");
  }

  // 3. Bold: **text**
  if (tools.includes("bold")) {
    text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  }

  // 4. Italic: *text* (avoiding lone asterisks)
  if (tools.includes("italic")) {
    text = text.replace(/(^|[^*])\*([^*]+)\*([^*]|$)/g, "$1<em>$2</em>$3");
  }

  // 5. Links: [label](url) - strictly validate http, https, or mailto
  if (tools.includes("link")) {
    text = text.replace(
      /\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );
  } else {
    // If links are disabled, render markdown links safely as label (url) without clickable anchor
    text = text.replace(
      /\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)/g,
      "$1 ($2)"
    );
  }

  // 6. Blockquotes: lines starting with &gt;
  const lines = text.split("\n");
  const processedLines: string[] = [];
  let inQuote = false;
  let quoteBuffer: string[] = [];

  for (const line of lines) {
    if (tools.includes("quote") && (line.startsWith("&gt; ") || line === "&gt;")) {
      inQuote = true;
      quoteBuffer.push(line.replace(/^&gt; ?/, ""));
    } else {
      if (inQuote) {
        processedLines.push(`<blockquote>${quoteBuffer.join("<br/>")}</blockquote>`);
        quoteBuffer = [];
        inQuote = false;
      }
      processedLines.push(line);
    }
  }
  if (inQuote) {
    processedLines.push(`<blockquote>${quoteBuffer.join("<br/>")}</blockquote>`);
  }

  // 7. Join lines with <br/>, avoiding breaks directly adjacent to blockquotes
  return processedLines
    .join("\n")
    .replace(/(<\/blockquote>)\n+/g, "$1")
    .replace(/\n+(<blockquote>)/g, "$1")
    .replace(/\n/g, "<br/>");
}

export function renderReactionIcon(reactionType: string, filled: boolean): string {
  if (reactionType === "upvote") {
    return `<svg class="nyuzi-reaction-icon" viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" fill="${filled ? "currentColor" : "none"}" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`;
  }
  if (reactionType === "like") {
    return `<svg class="nyuzi-reaction-icon nyuzi-like-icon" viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2" fill="${filled ? "currentColor" : "none"}" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12M15 10.5a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3v2.5M7 10l5-6v5h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7"/><path d="M7 10H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"/></svg>`;
  }
  // Heart default
  return `<svg class="nyuzi-reaction-icon nyuzi-heart-icon" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="${filled ? "currentColor" : "none"}" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>`;
}

export function renderReplyIcon(): string {
  return `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>`;
}

export function renderLinkIcon(): string {
  return `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;
}

export function renderEditIcon(): string {
  return `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>`;
}

export function renderTrashIcon(): string {
  return `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`;
}

export function getReactionLabel(c: NyuziComment, reactionType: string): string {
  if (c.upvotes > 0) return `${c.upvotes}`;
  if (reactionType === "upvote") return "Upvote";
  return "Like";
}

export function isVerifiedAuthor(name: string, postAuthor: string): boolean {
  if (!name) return false;
  const clean = name.trim().toLowerCase();
  if (postAuthor && clean === postAuthor.trim().toLowerCase()) return true;
  return (
    clean.includes("fred juma") ||
    clean.includes("brenda frenjo") ||
    clean.includes("sumeiya juma")
  );
}

/**
 * Micro-Markdown Toolbar for Composing & Editing
 */
export function renderFormatToolbar(targetTextareaId: string, allowedTools?: string[]): string {
  const tools = allowedTools && allowedTools.length > 0
    ? allowedTools
    : ["bold", "italic", "quote", "code", "link"];

  const buttons: string[] = [];

  if (tools.includes("bold")) {
    buttons.push(`
      <button type="button" class="nyuzi-format-btn" data-action="bold" title="Bold (**text**)">
        <strong>B</strong>
      </button>`);
  }
  if (tools.includes("italic")) {
    buttons.push(`
      <button type="button" class="nyuzi-format-btn" data-action="italic" title="Italic (*text*)">
        <em>I</em>
      </button>`);
  }
  if (tools.includes("quote")) {
    buttons.push(`
      <button type="button" class="nyuzi-format-btn" data-action="quote" title="Quote (> text)">
        &ldquo;
      </button>`);
  }
  if (tools.includes("code")) {
    buttons.push(`
      <button type="button" class="nyuzi-format-btn" data-action="code" title="Inline Code (\`code\`)">
        &lt;/&gt;
      </button>`);
  }
  if (tools.includes("link")) {
    buttons.push(`
      <button type="button" class="nyuzi-format-btn" data-action="link" title="Link ([text](url))">
        <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
      </button>`);
  }

  if (buttons.length === 0) return "";

  return `
    <div class="nyuzi-format-toolbar" data-target="${targetTextareaId}">
      ${buttons.join("")}
    </div>
  `;
}

/**
 * Top Expressive Reactions Bar (Hyvor Talk Style)
 */
export function renderTopReactionsBar(
  activeKey: string | null,
  prompt = "How was this discussion?",
  preset: "general" | "literary" = "general",
  reactionCounts?: Record<string, number>
): string {
  const generalReactions = [
    { key: "fire", emoji: "🔥", label: "Superb", defaultCount: 18 },
    { key: "heart", emoji: "❤️", label: "Love", defaultCount: 24 },
    { key: "lightbulb", emoji: "💡", label: "Insight", defaultCount: 12 },
    { key: "laugh", emoji: "😂", label: "Laugh", defaultCount: 7 },
    { key: "clap", emoji: "👏", label: "Applause", defaultCount: 15 },
  ];

  const literaryReactions = [
    { key: "coffee", emoji: "☕", label: "Thoughtful", defaultCount: 21 },
    { key: "book", emoji: "📖", label: "Engrossing", defaultCount: 28 },
    { key: "lightbulb", emoji: "💡", label: "Insight", defaultCount: 14 },
    { key: "heart", emoji: "❤️", label: "Moved", defaultCount: 19 },
    { key: "clap", emoji: "👏", label: "Applause", defaultCount: 16 },
  ];

  const reactions = preset === "literary" ? literaryReactions : generalReactions;

  return `
    <div class="nyuzi-reactions-bar">
      <div class="nyuzi-reactions-prompt">${escapeHtml(prompt || "How was this discussion?")}</div>
      <div class="nyuzi-reactions-grid">
        ${reactions
          .map((r) => {
            const count =
              reactionCounts?.[r.key] !== undefined
                ? reactionCounts[r.key]
                : r.defaultCount;
            return `
          <div class="nyuzi-reaction-pill ${activeKey === r.key ? "active" : ""}" data-reaction-key="${r.key}">
            <div class="emoji-row">
              <span>${r.emoji}</span>
              <span class="reaction-count">${count}</span>
            </div>
            <span class="reaction-label">${r.label}</span>
          </div>
        `;
          })
          .join("")}
      </div>
    </div>
  `;
}

export function renderComment(
  c: NyuziComment,
  allComments: NyuziComment[],
  options: {
    postAuthor: string;
    reactionType: string;
    upvotedComments: Set<string>;
    activeReplyId: string | null;
    editingCommentId: string | null;
    confirmDeleteId: string | null;
    collapsedComments: Set<string>;
    myComments: Set<string>;
    isSubmitting: boolean;
    savedAuthorName: string;
    savedAuthorEmail: string;
    allowedFormatting?: string[];
  }
): string {
  const replies = allComments.filter((r) => r.parentId === c.id);
  replies.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  const isReplying = options.activeReplyId === c.id;
  const isEditing = options.editingCommentId === c.id;
  const isConfirmDelete = options.confirmDeleteId === c.id;
  const isCollapsed = options.collapsedComments.has(c.id);
  const isUpvoted = options.upvotedComments.has(c.id);
  const isMine = options.myComments.has(c.id);
  const isAuthor = c.isAuthor ?? isVerifiedAuthor(c.authorName, options.postAuthor);

  return `
    <div class="nyuzi-comment" id="comment-${c.id}">
      <div class="nyuzi-avatar">${escapeHtml(getInitials(c.authorName))}</div>
      <div class="nyuzi-body">
        <div class="nyuzi-meta">
          <span class="nyuzi-author">${escapeHtml(c.authorName)}</span>
          ${isAuthor ? `<span class="nyuzi-author-badge">Author</span>` : ""}
          <span class="nyuzi-time">${formatTime(c.createdAt)}</span>
          ${c.isEdited ? `<span class="nyuzi-edited-tag" title="Edited by reader">(edited)</span>` : ""}
        </div>

        ${
          isEditing
            ? `
            <div class="nyuzi-edit-box">
              ${renderFormatToolbar(`edit-content-${c.id}`, options.allowedFormatting)}
              <textarea class="nyuzi-textarea nyuzi-edit-textarea" id="edit-content-${c.id}" rows="3" maxlength="2000">${escapeHtml(c.content)}</textarea>
              <div class="nyuzi-edit-actions">
                <button class="nyuzi-action-btn cancel-edit" data-id="${c.id}">Cancel</button>
                <button class="nyuzi-submit-btn save-edit" data-id="${c.id}" ${options.isSubmitting ? "disabled" : ""}>
                  ${options.isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          `
            : isConfirmDelete
            ? `
            <div class="nyuzi-confirm-pill">
              <span>Delete this comment?</span>
              <button class="nyuzi-confirm-delete-btn" data-id="${c.id}" ${options.isSubmitting ? "disabled" : ""}>
                ${options.isSubmitting ? "Deleting..." : "Yes, Delete"}
              </button>
              <button class="nyuzi-cancel-delete-btn" data-id="${c.id}">Cancel</button>
            </div>
          `
            : `<div class="nyuzi-content">${formatMarkdown(c.content, options.allowedFormatting)}</div>`
        }

        ${
          !isEditing && !isConfirmDelete
            ? `
          <div class="nyuzi-actions">
            <button class="nyuzi-action-btn upvote-btn ${isUpvoted ? "upvoted" : ""}" data-id="${c.id}" title="${isUpvoted ? "Unlike" : "Like"}">
              ${renderReactionIcon(options.reactionType, isUpvoted)}
              <span>${getReactionLabel(c, options.reactionType)}</span>
            </button>
            <button class="nyuzi-action-btn reply-trigger" data-id="${c.id}">
              ${renderReplyIcon()}
              <span>Reply</span>
            </button>
            <button class="nyuzi-action-btn copy-link-btn" data-id="${c.id}" title="Copy direct link to this comment">
              ${renderLinkIcon()}
              <span>Copy Link</span>
            </button>
            ${
              isMine
                ? `
              <button class="nyuzi-action-btn edit-trigger" data-id="${c.id}" title="Edit your comment (15m grace window)">
                ${renderEditIcon()}
                <span>Edit</span>
              </button>
              <button class="nyuzi-action-btn delete-trigger" data-id="${c.id}" title="Delete your comment">
                ${renderTrashIcon()}
                <span>Delete</span>
              </button>
            `
                : ""
            }
          </div>
        `
            : ""
        }

        ${
          isReplying
            ? `
            <div class="nyuzi-reply-box">
              ${renderFormatToolbar(`reply-content-${c.id}`, options.allowedFormatting)}
              <textarea class="nyuzi-textarea" id="reply-content-${c.id}" placeholder="Reply to ${escapeHtml(c.authorName)}..." maxlength="2000" required></textarea>
              <div class="nyuzi-form-row">
                <div class="nyuzi-inputs">
                  <input type="text" class="nyuzi-input" id="reply-name-${c.id}" placeholder="Your Name *" value="${escapeHtml(options.savedAuthorName)}" required />
                  <input type="email" class="nyuzi-input" id="reply-email-${c.id}" placeholder="Email (for reply alerts)" value="${escapeHtml(options.savedAuthorEmail)}" />
                </div>
                <div style="display:flex; gap:0.5rem; align-items:flex-end;">
                  <button class="nyuzi-action-btn cancel-reply" style="padding: 0.5rem 0.75rem;">Cancel</button>
                  <button class="nyuzi-submit-btn submit-reply" data-parent-id="${c.id}" ${options.isSubmitting ? "disabled" : ""}>
                    ${options.isSubmitting ? "Posting..." : "Reply"}
                  </button>
                </div>
              </div>
            </div>
          `
            : ""
        }

        ${
          replies.length > 0
            ? `
          <div class="nyuzi-replies-wrapper">
            <button class="nyuzi-collapse-btn" data-id="${c.id}" title="${isCollapsed ? "Expand replies" : "Collapse replies"}">
              <svg class="nyuzi-collapse-chevron ${isCollapsed ? "collapsed" : ""}" viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              <span>${isCollapsed ? `Show ${replies.length} ${replies.length === 1 ? "reply" : "replies"}` : `Hide ${replies.length} ${replies.length === 1 ? "reply" : "replies"}`}</span>
            </button>
            ${
              !isCollapsed
                ? `
              <div class="nyuzi-replies">
                ${replies.map((r) => renderComment(r, allComments, options)).join("")}
              </div>
            `
                : ""
            }
          </div>
        `
            : ""
        }
      </div>
    </div>
  `;
}
