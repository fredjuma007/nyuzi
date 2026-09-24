/**
 * Nyuzi Embed Widget
 * Ultra-lightweight, edge-powered commenting client (<15KB)
 */

interface NyuziComment {
  id: string;
  parentId: string | null;
  authorName: string;
  content: string;
  status: string;
  upvotes: number;
  createdAt: string;
}

interface NyuziThread {
  id: string;
  url: string;
  title: string | null;
  commentCount: number;
}

interface NyuziResponse {
  thread: NyuziThread | null;
  comments: NyuziComment[];
  total: number;
}

(function () {
  const currentScript = document.currentScript as HTMLScriptElement | null;

  // 1. Identify target container
  let container = document.getElementById("nyuzi-comments");
  if (!container) {
    container = document.querySelector("nyuzi-comments");
  }

  if (!container) {
    console.warn("[Nyuzi] No container found (#nyuzi-comments or <nyuzi-comments>).");
    return;
  }

  const siteId =
    currentScript?.getAttribute("data-site-id") ||
    container.getAttribute("data-site-id") ||
    document.querySelector("[data-nyuzi-site-id]")?.getAttribute("data-nyuzi-site-id") ||
    "";

  const apiHost =
    currentScript?.getAttribute("data-api") ||
    container.getAttribute("data-api") ||
    "https://nyuzi-api.fredjuma8.workers.dev";

  const customAccent =
    currentScript?.getAttribute("data-accent-color") ||
    container.getAttribute("data-accent-color") ||
    "#6366f1";

  const reactionType =
    currentScript?.getAttribute("data-reaction") ||
    container.getAttribute("data-reaction") ||
    "heart";

  // 3. Attach Shadow DOM for complete CSS isolation
  const shadow = container.shadowRoot || container.attachShadow({ mode: "open" });
  shadow.innerHTML = "";

  // Widget State
  const threadUrl =
    currentScript?.getAttribute("data-thread-url") ||
    container.getAttribute("data-thread-url") ||
    window.location.href.split("#")[0];
  const threadTitle = document.title || "Discussion";
  let commentsList: NyuziComment[] = [];
  let totalComments = 0;
  let isLoading = true;
  let formError: string | null = null;
  let activeReplyId: string | null = null;
  let isSubmitting = false;
  const upvotedComments = new Set<string>();

  // Load upvoted state from session
  try {
    const saved = sessionStorage.getItem("nyuzi_upvotes");
    if (saved) JSON.parse(saved).forEach((id: string) => upvotedComments.add(id));
  } catch {}

  // Helpers
  function escapeHtml(str: string): string {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function formatTime(isoString: string): string {
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

  function renderReactionIcon(filled: boolean): string {
    if (reactionType === "upvote") {
      return `<span style="font-size:0.75rem;">▲</span>`;
    }
    return `<svg class="nyuzi-heart-icon" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="${filled ? "currentColor" : "none"}" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>`;
  }

  function renderReplyIcon(): string {
    return `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>`;
  }

  function renderLinkIcon(): string {
    return `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;
  }

  // Scoped CSS
  const styles = `
    :host {
      --nyuzi-accent: ${customAccent};
      --nyuzi-accent-hover: #4f46e5;
      --nyuzi-bg: transparent;
      --nyuzi-card-bg: #ffffff;
      --nyuzi-text-primary: #0f172a;
      --nyuzi-text-secondary: #64748b;
      --nyuzi-text-muted: #94a3b8;
      --nyuzi-border: #e2e8f0;
      --nyuzi-input-bg: #f8fafc;
      --nyuzi-thread-line: #e2e8f0;
      --nyuzi-avatar-bg: #e0e7ff;
      --nyuzi-avatar-text: #4338ca;
      --nyuzi-radius: 0.75rem;

      display: block;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 15px;
      line-height: 1.5;
      color: var(--nyuzi-text-primary);
      box-sizing: border-box;
      max-width: 100%;
    }

    @media (prefers-color-scheme: dark) {
      :host {
        --nyuzi-card-bg: #0f172a;
        --nyuzi-text-primary: #f8fafc;
        --nyuzi-text-secondary: #94a3b8;
        --nyuzi-text-muted: #64748b;
        --nyuzi-border: #1e293b;
        --nyuzi-input-bg: #1e293b;
        --nyuzi-thread-line: #334155;
        --nyuzi-avatar-bg: #312e81;
        --nyuzi-avatar-text: #c7d2fe;
      }
    }

    *, *::before, *::after {
      box-sizing: inherit;
    }

    .nyuzi-container {
      padding: 0.5rem 0;
    }

    /* Header */
    .nyuzi-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.25rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid var(--nyuzi-border);
    }
    .nyuzi-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--nyuzi-text-primary);
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .nyuzi-badge {
      font-size: 0.8125rem;
      font-weight: 600;
      background: var(--nyuzi-input-bg);
      color: var(--nyuzi-text-secondary);
      padding: 0.15rem 0.55rem;
      border-radius: 9999px;
      border: 1px solid var(--nyuzi-border);
    }

    /* Form */
    .nyuzi-form {
      background: var(--nyuzi-card-bg);
      border: 1px solid var(--nyuzi-border);
      border-radius: var(--nyuzi-radius);
      padding: 1rem;
      margin-bottom: 2rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .nyuzi-form:focus-within {
      border-color: var(--nyuzi-accent);
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }
    .nyuzi-textarea {
      width: 100%;
      min-height: 85px;
      padding: 0.75rem;
      border: 1px solid var(--nyuzi-border);
      border-radius: 0.5rem;
      background: var(--nyuzi-input-bg);
      color: var(--nyuzi-text-primary);
      font-family: inherit;
      font-size: 0.9375rem;
      resize: vertical;
      outline: none;
      transition: border-color 0.15s, background 0.15s;
    }
    .nyuzi-textarea:focus {
      border-color: var(--nyuzi-accent);
      background: var(--nyuzi-card-bg);
    }
    .nyuzi-counter-row {
      display: flex;
      justify-content: flex-end;
      font-size: 0.75rem;
      color: var(--nyuzi-text-muted);
      margin-top: 0.35rem;
    }
    .nyuzi-form-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-top: 0.75rem;
      align-items: center;
      justify-content: space-between;
    }
    .nyuzi-inputs {
      display: flex;
      gap: 0.5rem;
      flex: 1;
      min-width: 260px;
    }
    .nyuzi-input {
      flex: 1;
      padding: 0.5rem 0.75rem;
      border: 1px solid var(--nyuzi-border);
      border-radius: 0.5rem;
      background: var(--nyuzi-input-bg);
      color: var(--nyuzi-text-primary);
      font-size: 0.875rem;
      outline: none;
    }
    .nyuzi-input:focus {
      border-color: var(--nyuzi-accent);
      background: var(--nyuzi-card-bg);
    }
    .nyuzi-optin {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.8125rem;
      color: var(--nyuzi-text-secondary);
      cursor: pointer;
      user-select: none;
      margin-top: 0.5rem;
    }
    .nyuzi-optin input {
      accent-color: var(--nyuzi-accent);
      cursor: pointer;
    }
    .nyuzi-submit-btn {
      background: var(--nyuzi-accent);
      color: #ffffff;
      border: none;
      padding: 0.55rem 1.35rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      transition: opacity 0.2s, transform 0.1s;
    }
    .nyuzi-submit-btn:hover {
      opacity: 0.92;
    }
    .nyuzi-submit-btn:active {
      transform: scale(0.98);
    }
    .nyuzi-submit-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Error Alert */
    .nyuzi-alert {
      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #b91c1c;
      padding: 0.6rem 0.85rem;
      border-radius: 0.5rem;
      font-size: 0.8125rem;
      margin-bottom: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    /* Comments Tree */
    .nyuzi-list {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .nyuzi-comment {
      display: flex;
      gap: 0.875rem;
      transition: background 0.2s;
    }
    .nyuzi-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--nyuzi-avatar-bg);
      color: var(--nyuzi-avatar-text);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.8125rem;
      flex-shrink: 0;
      user-select: none;
    }
    .nyuzi-body {
      flex: 1;
    }
    .nyuzi-meta {
      display: flex;
      align-items: baseline;
      gap: 0.5rem;
      margin-bottom: 0.25rem;
    }
    .nyuzi-author {
      font-weight: 600;
      color: var(--nyuzi-text-primary);
      font-size: 0.9375rem;
    }
    .nyuzi-time {
      font-size: 0.75rem;
      color: var(--nyuzi-text-muted);
    }
    .nyuzi-content {
      color: var(--nyuzi-text-primary);
      font-size: 0.9375rem;
      white-space: pre-wrap;
      word-break: break-word;
      line-height: 1.55;
    }
    .nyuzi-actions {
      display: flex;
      gap: 1rem;
      margin-top: 0.45rem;
    }
    .nyuzi-action-btn {
      background: none;
      border: none;
      color: var(--nyuzi-text-secondary);
      font-size: 0.8125rem;
      font-weight: 500;
      cursor: pointer;
      padding: 0;
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      transition: color 0.15s, transform 0.1s;
    }
    .nyuzi-action-btn:hover {
      color: var(--nyuzi-accent);
    }
    .nyuzi-action-btn svg {
      flex-shrink: 0;
      transition: transform 0.15s, stroke 0.15s, fill 0.15s;
    }
    .nyuzi-action-btn:hover svg.nyuzi-heart-icon {
      stroke: #e11d48;
      transform: scale(1.15);
    }
    .nyuzi-action-btn.upvoted {
      color: #e11d48;
      font-weight: 600;
    }
    .nyuzi-action-btn.upvoted svg.nyuzi-heart-icon {
      fill: #e11d48;
      stroke: #e11d48;
      animation: nyuzi-pop 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    @keyframes nyuzi-pop {
      0% { transform: scale(1); }
      40% { transform: scale(1.35); }
      100% { transform: scale(1); }
    }
    .nyuzi-highlight {
      animation: nyuzi-flash 2.5s ease-out;
      border-radius: var(--nyuzi-radius);
      padding: 0.25rem 0.5rem;
    }
    @keyframes nyuzi-flash {
      0%, 25% { background: rgba(99, 102, 241, 0.16); }
      100% { background: transparent; }
    }

    /* Nested Replies */
    .nyuzi-replies {
      margin-top: 1rem;
      padding-left: 1.25rem;
      border-left: 2px solid var(--nyuzi-thread-line);
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    /* Reply Form */
    .nyuzi-reply-box {
      margin-top: 0.75rem;
      padding: 0.85rem;
      background: var(--nyuzi-input-bg);
      border: 1px solid var(--nyuzi-border);
      border-radius: 0.65rem;
    }

    /* Skeletons */
    .nyuzi-skeleton {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .nyuzi-skeleton-item {
      display: flex;
      gap: 0.875rem;
      align-items: flex-start;
    }
    .nyuzi-skeleton-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--nyuzi-border);
      animation: nyuzi-pulse 1.5s infinite ease-in-out;
      flex-shrink: 0;
    }
    .nyuzi-skeleton-lines {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .nyuzi-skeleton-line {
      height: 14px;
      border-radius: 4px;
      background: var(--nyuzi-border);
      animation: nyuzi-pulse 1.5s infinite ease-in-out;
    }
    .nyuzi-skeleton-line.short {
      width: 30%;
    }
    @keyframes nyuzi-pulse {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.85; }
    }

    /* Empty state */
    .nyuzi-empty {
      text-align: center;
      padding: 2.5rem 1rem;
      color: var(--nyuzi-text-muted);
    }

    /* Footer */
    .nyuzi-footer {
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid var(--nyuzi-border);
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .nyuzi-brand {
      font-size: 0.75rem;
      color: var(--nyuzi-text-muted);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      transition: color 0.15s, opacity 0.15s, transform 0.15s;
    }
    .nyuzi-brand:hover {
      opacity: 0.95;
      transform: translateY(-0.5px);
    }
    .nyuzi-brand strong {
      font-weight: 700;
      color: #f56220;
      letter-spacing: -0.01em;
      transition: color 0.15s, text-shadow 0.15s;
    }
    .nyuzi-brand:hover strong {
      color: #ea580c;
      text-shadow: 0 0 12px rgba(245, 98, 32, 0.5);
    }
    .nyuzi-brand-dot {
      display: inline-block;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #f56220;
      box-shadow: 0 0 6px rgba(245, 98, 32, 0.6);
      transition: transform 0.15s;
    }
    .nyuzi-brand:hover .nyuzi-brand-dot {
      transform: scale(1.2);
    }
  `;

  // Scroll and highlight target comment if URL has #comment-xxx
  function scrollToHashComment() {
    const hash = window.location.hash;
    if (hash && hash.startsWith("#comment-")) {
      setTimeout(() => {
        const target = shadow.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
          target.classList.add("nyuzi-highlight");
          setTimeout(() => target.classList.remove("nyuzi-highlight"), 3000);
        }
      }, 200);
    }
  }

  // Fetch comments from API
  async function loadComments() {
    try {
      isLoading = true;
      render();

      const url = `${apiHost}/api/v1/comments?siteId=${encodeURIComponent(siteId)}&threadUrl=${encodeURIComponent(threadUrl)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: NyuziResponse = await res.json();

      commentsList = data.comments || [];
      totalComments = data.total || commentsList.length;
      isLoading = false;
      render();
      scrollToHashComment();
    } catch (err: any) {
      console.error("[Nyuzi] Failed to load comments:", err);
      isLoading = false;
      formError = "Unable to connect to comments server.";
      render();
    }
  }

  // Toggle upvote/un-upvote comment
  async function toggleUpvote(commentId: string) {
    const isCurrentlyUpvoted = upvotedComments.has(commentId);
    const action = isCurrentlyUpvoted ? "unvote" : "upvote";
    const c = commentsList.find((item) => item.id === commentId);

    // Optimistic UI update
    if (isCurrentlyUpvoted) {
      upvotedComments.delete(commentId);
      if (c) c.upvotes = Math.max(0, (c.upvotes || 1) - 1);
    } else {
      upvotedComments.add(commentId);
      if (c) c.upvotes = (c.upvotes || 0) + 1;
    }

    try {
      sessionStorage.setItem("nyuzi_upvotes", JSON.stringify(Array.from(upvotedComments)));
    } catch {}

    render();

    try {
      const res = await fetch(`${apiHost}/api/v1/comments/${encodeURIComponent(commentId)}/upvote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (!res.ok) throw new Error("Vote action failed");
      const data = await res.json();
      if (c && typeof data.upvotes === "number") {
        c.upvotes = data.upvotes;
        render();
      }
    } catch {
      // Revert on failure
      if (isCurrentlyUpvoted) {
        upvotedComments.add(commentId);
        if (c) c.upvotes = (c.upvotes || 0) + 1;
      } else {
        upvotedComments.delete(commentId);
        if (c) c.upvotes = Math.max(0, (c.upvotes || 1) - 1);
      }
      try {
        sessionStorage.setItem("nyuzi_upvotes", JSON.stringify(Array.from(upvotedComments)));
      } catch {}
      render();
    }
  }

  // Submit comment
  async function submitComment(
    authorName: string,
    authorEmail: string | null,
    content: string,
    notifyOnReply: boolean,
    parentId: string | null = null
  ) {
    if (!authorName.trim() || !content.trim()) return;

    try {
      isSubmitting = true;
      formError = null;
      render();

      const res = await fetch(`${apiHost}/api/v1/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteId,
          threadUrl,
          threadTitle,
          parentId,
          authorName,
          authorEmail,
          content,
          notifyOnReply,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `HTTP ${res.status}`);
      }

      const data = await res.json();
      if (data.comment) {
        commentsList.push(data.comment);
        totalComments += 1;
        activeReplyId = null;
      }
      isSubmitting = false;
      render();
    } catch (err: any) {
      formError = err.message || "Failed to post comment. Please try again.";
      isSubmitting = false;
      render();
    }
  }

  // Render a comment node
  function renderComment(c: NyuziComment): string {
    const replies = commentsList.filter((r) => r.parentId === c.id);
    const isReplying = activeReplyId === c.id;
    const isUpvoted = upvotedComments.has(c.id);

    return `
      <div class="nyuzi-comment" id="comment-${c.id}">
        <div class="nyuzi-avatar">${escapeHtml(getInitials(c.authorName))}</div>
        <div class="nyuzi-body">
          <div class="nyuzi-meta">
            <span class="nyuzi-author">${escapeHtml(c.authorName)}</span>
            <span class="nyuzi-time">${formatTime(c.createdAt)}</span>
          </div>
          <div class="nyuzi-content">${escapeHtml(c.content)}</div>
          <div class="nyuzi-actions">
            <button class="nyuzi-action-btn upvote-btn ${isUpvoted ? "upvoted" : ""}" data-id="${c.id}" title="${isUpvoted ? "Unlike" : "Like"}">
              ${renderReactionIcon(isUpvoted)}
              <span>${c.upvotes > 0 ? c.upvotes : (reactionType === "heart" ? "Like" : "Upvote")}</span>
            </button>
            <button class="nyuzi-action-btn reply-trigger" data-id="${c.id}">
              ${renderReplyIcon()}
              <span>Reply</span>
            </button>
            <button class="nyuzi-action-btn copy-link-btn" data-id="${c.id}" title="Copy direct link to this comment">
              ${renderLinkIcon()}
              <span>Copy Link</span>
            </button>
          </div>

          ${
            isReplying
              ? `
              <div class="nyuzi-reply-box">
                <textarea class="nyuzi-textarea" id="reply-content-${c.id}" placeholder="Reply to ${escapeHtml(c.authorName)}..." required></textarea>
                <div class="nyuzi-form-row">
                  <div class="nyuzi-inputs">
                    <input type="text" class="nyuzi-input" id="reply-name-${c.id}" placeholder="Your Name *" required />
                  </div>
                  <div style="display:flex; gap:0.5rem;">
                    <button class="nyuzi-action-btn cancel-reply" style="padding: 0.5rem 0.75rem;">Cancel</button>
                    <button class="nyuzi-submit-btn submit-reply" data-parent-id="${c.id}" ${isSubmitting ? "disabled" : ""}>
                      ${isSubmitting ? "Posting..." : "Reply"}
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
            <div class="nyuzi-replies">
              ${replies.map((r) => renderComment(r)).join("")}
            </div>
          `
              : ""
          }
        </div>
      </div>
    `;
  }

  function render() {
    const topLevelComments = commentsList.filter((c) => !c.parentId);

    shadow.innerHTML = `
      <style>${styles}</style>
      <div class="nyuzi-container">
        <!-- Header -->
        <div class="nyuzi-header">
          <h3 class="nyuzi-title">
            Discussion
            <span class="nyuzi-badge">${totalComments}</span>
          </h3>
        </div>

        <!-- Main Comment Form -->
        <div class="nyuzi-form">
          ${
            formError
              ? `<div class="nyuzi-alert">
                   <span>âš ï¸ ${escapeHtml(formError)}</span>
                   <button class="nyuzi-action-btn" id="dismiss-error" style="color:#b91c1c;">âœ•</button>
                 </div>`
              : ""
          }
          <textarea class="nyuzi-textarea" id="nyuzi-main-content" maxlength="2000" placeholder="Share your thoughts or leave a question..." required></textarea>
          <div class="nyuzi-counter-row">
            <span id="nyuzi-char-count">0 / 2,000</span>
          </div>

          <div class="nyuzi-form-row">
            <div class="nyuzi-inputs">
              <input type="text" class="nyuzi-input" id="nyuzi-main-name" placeholder="Name *" required />
              <input type="email" class="nyuzi-input" id="nyuzi-main-email" placeholder="Email (for reply alerts)" />
            </div>
            <button class="nyuzi-submit-btn" id="nyuzi-main-submit" ${isSubmitting ? "disabled" : ""}>
              ${isSubmitting ? "Posting..." : "Post Comment"}
            </button>
          </div>

          <label class="nyuzi-optin" id="nyuzi-optin-wrapper">
            <input type="checkbox" id="nyuzi-main-notify" checked />
            <span>Notify me via email when someone replies</span>
          </label>
        </div>

        <!-- Comments List -->
        ${
          isLoading
            ? `<div class="nyuzi-skeleton">
                 <div class="nyuzi-skeleton-item">
                   <div class="nyuzi-skeleton-avatar"></div>
                   <div class="nyuzi-skeleton-lines">
                     <div class="nyuzi-skeleton-line short"></div>
                     <div class="nyuzi-skeleton-line"></div>
                   </div>
                 </div>
                 <div class="nyuzi-skeleton-item">
                   <div class="nyuzi-skeleton-avatar"></div>
                   <div class="nyuzi-skeleton-lines">
                     <div class="nyuzi-skeleton-line short"></div>
                     <div class="nyuzi-skeleton-line"></div>
                   </div>
                 </div>
               </div>`
            : topLevelComments.length === 0
            ? `<div class="nyuzi-empty">
                 <p style="font-size:1.1rem; margin:0 0 0.25rem 0; font-weight:600; color:var(--nyuzi-text-primary);">No comments yet</p>
                 <p style="margin:0; font-size:0.875rem;">Be the first to share your thoughts!</p>
               </div>`
            : `<div class="nyuzi-list">
                 ${topLevelComments.map((c) => renderComment(c)).join("")}
               </div>`
        }

        <!-- Footer -->
        <div class="nyuzi-footer">
          <a href="https://nyuzi-yap.vercel.app/" target="_blank" rel="noreferrer" class="nyuzi-brand" title="NyuziYap — Privacy-first, edge-powered comments">
            <span class="nyuzi-brand-dot"></span>
            <span>Powered by</span>
            <strong>NyuziYap</strong>
          </a>
        </div>
      </div>
    `;

    // Event Listeners
    const contentInput = shadow.getElementById("nyuzi-main-content") as HTMLTextAreaElement | null;
    const charCount = shadow.getElementById("nyuzi-char-count");
    if (contentInput && charCount) {
      contentInput.addEventListener("input", () => {
        charCount.textContent = `${contentInput.value.length} / 2,000`;
      });
    }

    const dismissError = shadow.getElementById("dismiss-error");
    if (dismissError) {
      dismissError.addEventListener("click", () => {
        formError = null;
        render();
      });
    }

    const mainSubmit = shadow.getElementById("nyuzi-main-submit");
    if (mainSubmit) {
      mainSubmit.addEventListener("click", () => {
        const nameInput = shadow.getElementById("nyuzi-main-name") as HTMLInputElement;
        const emailInput = shadow.getElementById("nyuzi-main-email") as HTMLInputElement;
        const notifyCheck = shadow.getElementById("nyuzi-main-notify") as HTMLInputElement;

        if (!nameInput.value.trim()) {
          formError = "Please enter your name.";
          render();
          return;
        }
        if (!contentInput || !contentInput.value.trim()) {
          formError = "Comment content cannot be empty.";
          render();
          return;
        }

        submitComment(
          nameInput.value.trim(),
          emailInput.value.trim() || null,
          contentInput.value.trim(),
          notifyCheck ? notifyCheck.checked : true,
          null
        );
      });
    }

    // Upvote buttons
    shadow.querySelectorAll(".upvote-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute("data-id");
        if (id) toggleUpvote(id);
      });
    });

    // Reply triggers
    shadow.querySelectorAll(".reply-trigger").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute("data-id");
        activeReplyId = activeReplyId === id ? null : id;
        render();
      });
    });

    // Cancel reply
    shadow.querySelectorAll(".cancel-reply").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeReplyId = null;
        render();
      });
    });

    // Submit reply
    shadow.querySelectorAll(".submit-reply").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const parentId = (e.currentTarget as HTMLElement).getAttribute("data-parent-id");
        if (!parentId) return;

        const nameInput = shadow.getElementById(`reply-name-${parentId}`) as HTMLInputElement;
        const replyContent = shadow.getElementById(`reply-content-${parentId}`) as HTMLTextAreaElement;

        if (!nameInput.value.trim()) {
          alert("Please enter your name.");
          return;
        }
        if (!replyContent || !replyContent.value.trim()) {
          alert("Reply content cannot be empty.");
          return;
        }

        submitComment(
          nameInput.value.trim(),
          null,
          replyContent.value.trim(),
          true,
          parentId
        );
      });
    });

    // Copy link buttons
    shadow.querySelectorAll(".copy-link-btn").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const button = e.currentTarget as HTMLButtonElement;
        const id = button.getAttribute("data-id");
        if (!id) return;
        const cleanUrl = window.location.href.split("#")[0];
        const shareUrl = `${cleanUrl}#comment-${id}`;

        try {
          await navigator.clipboard.writeText(shareUrl);
          const originalHtml = button.innerHTML;
          button.innerHTML = "✓ Copied!";
          button.style.color = "var(--nyuzi-accent)";
          setTimeout(() => {
            button.innerHTML = originalHtml;
            button.style.color = "";
          }, 2000);
        } catch {
          window.location.hash = `comment-${id}`;
        }
      });
    });
  }

  // Listen to hash changes in URL
  window.addEventListener("hashchange", scrollToHashComment);

  // Initial load
  loadComments();
})();