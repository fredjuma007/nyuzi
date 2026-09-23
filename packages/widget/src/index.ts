/**
 * Nyuzi Embed Widget
 * Ultra-lightweight, edge-powered commenting client
 * Size target: <10KB
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
  // 1. Identify script parameters
  const currentScript = document.currentScript as HTMLScriptElement | null;
  const siteId =
    currentScript?.getAttribute("data-site-id") ||
    document.querySelector("[data-nyuzi-site-id]")?.getAttribute("data-nyuzi-site-id") ||
    "";

  const apiHost =
    currentScript?.getAttribute("data-api") ||
    "http://127.0.0.1:8787";

  const customAccent = currentScript?.getAttribute("data-accent-color") || "#6366f1";

  // 2. Identify target container
  let container = document.getElementById("nyuzi-comments");
  if (!container) {
    container = document.querySelector("nyuzi-comments");
  }

  if (!container) {
    console.warn("[Nyuzi] No container found (#nyuzi-comments or <nyuzi-comments>).");
    return;
  }

  if (!siteId) {
    console.warn("[Nyuzi] Missing siteId. Set data-site-id='...' on script tag.");
  }

  // 3. Attach Shadow DOM for complete CSS isolation
  const shadow = container.attachShadow({ mode: "open" });

  // Widget State
  const threadUrl = window.location.href.split("#")[0];
  const threadTitle = document.title || "Discussion";
  let commentsList: NyuziComment[] = [];
  let totalComments = 0;
  let isLoading = true;
  let errorMessage: string | null = null;
  let activeReplyId: string | null = null;
  let isSubmitting = false;

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

  // Injected Scoped CSS
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
      padding: 1rem 0;
    }

    /* Header */
    .nyuzi-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
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
      padding: 0.15rem 0.5rem;
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
      transition: border-color 0.2s;
    }
    .nyuzi-form:focus-within {
      border-color: var(--nyuzi-accent);
    }
    .nyuzi-textarea {
      width: 100%;
      min-height: 80px;
      padding: 0.75rem;
      border: 1px solid var(--nyuzi-border);
      border-radius: 0.5rem;
      background: var(--nyuzi-input-bg);
      color: var(--nyuzi-text-primary);
      font-family: inherit;
      font-size: 0.9375rem;
      resize: vertical;
      outline: none;
      transition: border-color 0.15s;
    }
    .nyuzi-textarea:focus {
      border-color: var(--nyuzi-accent);
      background: var(--nyuzi-card-bg);
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
      min-width: 250px;
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
    .nyuzi-submit-btn {
      background: var(--nyuzi-accent);
      color: #ffffff;
      border: none;
      padding: 0.55rem 1.25rem;
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
    .nyuzi-submit-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
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
      gap: 0.75rem;
      margin-top: 0.4rem;
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
      gap: 0.25rem;
      transition: color 0.15s;
    }
    .nyuzi-action-btn:hover {
      color: var(--nyuzi-accent);
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
      padding: 0.75rem;
      background: var(--nyuzi-input-bg);
      border: 1px solid var(--nyuzi-border);
      border-radius: 0.5rem;
    }

    /* Empty state */
    .nyuzi-empty {
      text-align: center;
      padding: 2.5rem 1rem;
      color: var(--nyuzi-text-muted);
    }

    /* Loading state */
    .nyuzi-loading {
      text-align: center;
      padding: 2rem 0;
      color: var(--nyuzi-text-muted);
      font-size: 0.875rem;
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
      gap: 0.25rem;
      transition: color 0.15s;
    }
    .nyuzi-brand:hover {
      color: var(--nyuzi-accent);
    }
    .nyuzi-brand strong {
      font-weight: 600;
      color: var(--nyuzi-text-secondary);
    }
    .nyuzi-brand:hover strong {
      color: var(--nyuzi-accent);
    }
  `;

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
    } catch (err: any) {
      console.error("[Nyuzi] Failed to load comments:", err);
      isLoading = false;
      errorMessage = "Unable to load comments. Please check your connection.";
      render();
    }
  }

  // Submit comment
  async function submitComment(
    authorName: string,
    authorEmail: string | null,
    content: string,
    parentId: string | null = null
  ) {
    if (!authorName.trim() || !content.trim()) return;

    try {
      isSubmitting = true;
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
      alert("Error posting comment: " + (err.message || "Please try again"));
      isSubmitting = false;
      render();
    }
  }

  // Render tree
  function renderComment(c: NyuziComment): string {
    const replies = commentsList.filter((r) => r.parentId === c.id);
    const isReplying = activeReplyId === c.id;

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
            <button class="nyuzi-action-btn reply-trigger" data-id="${c.id}">
              ðŸ’¬ Reply
            </button>
          </div>

          ${
            isReplying
              ? `
              <div class="nyuzi-reply-box">
                <textarea class="nyuzi-textarea" id="reply-content-${c.id}" placeholder="Reply to ${escapeHtml(c.authorName)}..." required></textarea>
                <div class="nyuzi-form-row">
                  <div class="nyuzi-inputs">
                    <input type="text" class="nyuzi-input" id="reply-name-${c.id}" placeholder="Your Name" required />
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
          <textarea class="nyuzi-textarea" id="nyuzi-main-content" placeholder="Share your thoughts or leave a question..." required></textarea>
          <div class="nyuzi-form-row">
            <div class="nyuzi-inputs">
              <input type="text" class="nyuzi-input" id="nyuzi-main-name" placeholder="Name *" required />
              <input type="email" class="nyuzi-input" id="nyuzi-main-email" placeholder="Email (private)" />
            </div>
            <button class="nyuzi-submit-btn" id="nyuzi-main-submit" ${isSubmitting ? "disabled" : ""}>
              ${isSubmitting ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </div>

        <!-- Comments List -->
        ${
          isLoading
            ? `<div class="nyuzi-loading">Loading discussion...</div>`
            : errorMessage
            ? `<div class="nyuzi-empty" style="color:#ef4444;">${errorMessage}</div>`
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
          <a href="https://github.com/fredjuma007/nyuzi" target="_blank" rel="noreferrer" class="nyuzi-brand">
            Powered by <strong>Nyuzi</strong>
          </a>
        </div>
      </div>
    `;

    // Attach Event Listeners
    const mainSubmit = shadow.getElementById("nyuzi-main-submit");
    if (mainSubmit) {
      mainSubmit.addEventListener("click", () => {
        const nameInput = shadow.getElementById("nyuzi-main-name") as HTMLInputElement;
        const emailInput = shadow.getElementById("nyuzi-main-email") as HTMLInputElement;
        const contentInput = shadow.getElementById("nyuzi-main-content") as HTMLTextAreaElement;

        if (!nameInput.value.trim()) {
          nameInput.focus();
          return;
        }
        if (!contentInput.value.trim()) {
          contentInput.focus();
          return;
        }

        submitComment(
          nameInput.value.trim(),
          emailInput.value.trim() || null,
          contentInput.value.trim(),
          null
        );
      });
    }

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
        const contentInput = shadow.getElementById(`reply-content-${parentId}`) as HTMLTextAreaElement;

        if (!nameInput.value.trim()) {
          nameInput.focus();
          return;
        }
        if (!contentInput.value.trim()) {
          contentInput.focus();
          return;
        }

        submitComment(
          nameInput.value.trim(),
          null,
          contentInput.value.trim(),
          parentId
        );
      });
    });
  }

  // Initial load
  loadComments();
})();