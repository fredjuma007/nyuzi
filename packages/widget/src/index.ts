/**
 * Nyuzi Embed Widget
 * Ultra-lightweight, edge-powered commenting client (<15KB)
 * Built with modular Shadow DOM architecture, Micro-Markdown, 15-min edit grace window & collapsible threads
 */

import { NyuziComment, NyuziResponse, ThemeConfig } from "./types";
import { generateWidgetStyles } from "./styles";
import {
  escapeHtml,
  renderComment,
  renderTopReactionsBar,
  renderFormatToolbar,
} from "./templates";
import {
  fetchCommentsApi,
  submitCommentApi,
  toggleUpvoteApi,
  editCommentApi,
  deleteCommentApi,
  toggleThreadReactionApi,
} from "./api";

(function () {
  const currentScript = document.currentScript as HTMLScriptElement | null;

  // 1. Identify target container
  const rawContainer =
    document.getElementById("nyuzi-comments") || document.querySelector("nyuzi-comments");

  if (!rawContainer) {
    console.warn("[Nyuzi] No container found (#nyuzi-comments or <nyuzi-comments>).");
    return;
  }
  const container = rawContainer as HTMLElement;

  // 2. Extract Configuration & Visual Tokens
  const siteId =
    currentScript?.getAttribute("data-site-id") ||
    container.getAttribute("data-site-id") ||
    document.querySelector("[data-nyuzi-site-id]")?.getAttribute("data-nyuzi-site-id") ||
    "";

  const apiHost =
    currentScript?.getAttribute("data-api") ||
    container.getAttribute("data-api") ||
    "https://nyuzi-api.fredjuma8.workers.dev";

  const isMockMode =
    currentScript?.getAttribute("data-mock") === "true" ||
    container.getAttribute("data-mock") === "true";

  const rawReactionsAttr =
    currentScript?.getAttribute("data-reactions-bar") ??
    container.getAttribute("data-reactions-bar");
  const showReactionsBar =
    rawReactionsAttr === null ? true : rawReactionsAttr !== "false";

  const reactionsPrompt =
    currentScript?.getAttribute("data-reactions-prompt") ||
    container.getAttribute("data-reactions-prompt") ||
    "How was this discussion?";

  const reactionsPreset = (
    currentScript?.getAttribute("data-reactions-preset") ||
    container.getAttribute("data-reactions-preset") ||
    "general"
  ) as "general" | "literary";

  const rawFormatting =
    currentScript?.getAttribute("data-formatting") ||
    container.getAttribute("data-formatting") ||
    "bold,italic,quote,code,link";

  const allowedFormatting = rawFormatting
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  const hasExplicitAccent = Boolean(currentScript?.getAttribute("data-accent-color") || container.getAttribute("data-accent-color"));
  const hasExplicitTheme = Boolean(currentScript?.getAttribute("data-theme") || container.getAttribute("data-theme"));
  const hasExplicitBgMode = Boolean(currentScript?.getAttribute("data-bg") || container.getAttribute("data-bg"));
  const hasExplicitBgColor = Boolean(currentScript?.getAttribute("data-bg-color") || container.getAttribute("data-bg-color"));
  const hasExplicitCardBg = Boolean(currentScript?.getAttribute("data-card-bg") || container.getAttribute("data-card-bg"));
  const hasExplicitTextColor = Boolean(currentScript?.getAttribute("data-text-color") || container.getAttribute("data-text-color"));
  const hasExplicitBorderColor = Boolean(currentScript?.getAttribute("data-border-color") || container.getAttribute("data-border-color"));
  const hasExplicitRadius = Boolean(currentScript?.getAttribute("data-radius") || container.getAttribute("data-radius"));
  const hasExplicitReactionType = Boolean(currentScript?.getAttribute("data-reaction") || container.getAttribute("data-reaction"));
  const hasExplicitReactionsBar = rawReactionsAttr !== null && rawReactionsAttr !== undefined;
  const hasExplicitPrompt = Boolean(currentScript?.getAttribute("data-reactions-prompt") || container.getAttribute("data-reactions-prompt"));
  const hasExplicitPreset = Boolean(currentScript?.getAttribute("data-reactions-preset") || container.getAttribute("data-reactions-preset"));
  const hasExplicitFormatting = Boolean(currentScript?.getAttribute("data-formatting") || container.getAttribute("data-formatting"));

  const themeConfig: ThemeConfig = {
    accent:
      currentScript?.getAttribute("data-accent-color") ||
      container.getAttribute("data-accent-color") ||
      "#f56220",
    bg:
      currentScript?.getAttribute("data-bg-color") ||
      container.getAttribute("data-bg-color") ||
      "",
    cardBg:
      currentScript?.getAttribute("data-card-bg") ||
      container.getAttribute("data-card-bg") ||
      "",
    textColor:
      currentScript?.getAttribute("data-text-color") ||
      container.getAttribute("data-text-color") ||
      "",
    textSecondary:
      currentScript?.getAttribute("data-text-secondary") ||
      container.getAttribute("data-text-secondary") ||
      "",
    borderColor:
      currentScript?.getAttribute("data-border-color") ||
      container.getAttribute("data-border-color") ||
      "",
    inputBg:
      currentScript?.getAttribute("data-input-bg") ||
      container.getAttribute("data-input-bg") ||
      "",
    radius:
      currentScript?.getAttribute("data-radius") ||
      container.getAttribute("data-radius") ||
      "0.75rem",
    reactionType: (currentScript?.getAttribute("data-reaction") ||
      container.getAttribute("data-reaction") ||
      "like") as any,
    themeMode: (currentScript?.getAttribute("data-theme") ||
      container.getAttribute("data-theme") ||
      "auto") as any,
    bgMode: (currentScript?.getAttribute("data-bg") ||
      container.getAttribute("data-bg") ||
      "transparent") as any,
    showReactionsBar,
    reactionsPrompt,
    reactionsPreset,
    allowedFormatting,
  };

  // 3. Attach Shadow DOM for CSS isolation
  const shadow = container.shadowRoot || container.attachShadow({ mode: "open" });
  shadow.innerHTML = "";
  if (themeConfig.themeMode) {
    container.setAttribute("data-theme", themeConfig.themeMode);
  }

  // 4. Widget State
  const threadUrl =
    currentScript?.getAttribute("data-thread-url") ||
    container.getAttribute("data-thread-url") ||
    window.location.href.split("#")[0];

  const threadTitle =
    currentScript?.getAttribute("data-thread-title") ||
    container.getAttribute("data-thread-title") ||
    document.title ||
    "Discussion";

  const postAuthor =
    currentScript?.getAttribute("data-author-name") ||
    container.getAttribute("data-author-name") ||
    "";

  let commentsList: NyuziComment[] = [];
  let totalComments = 0;
  let totalTopLevel = 0;
  let currentPage = 1;
  const pageSize = 15;
  let hasMoreComments = false;
  let isLoadingMore = false;
  let isLoading = true;
  let formError: string | null = null;
  let activeReplyId: string | null = null;
  let editingCommentId: string | null = null;
  let confirmDeleteId: string | null = null;
  let isSubmitting = false;
  let activeReactionKey: string | null = null;
  const upvotedComments = new Set<string>();
  const collapsedComments = new Set<string>();

  // Persistent Thread Reactions
  const THREAD_REACTION_STORAGE_KEY = `nyuzi_react_${siteId}_${encodeURIComponent(threadUrl)}`;
  const THREAD_COUNTS_STORAGE_KEY = `nyuzi_counts_${siteId}_${encodeURIComponent(threadUrl)}`;

  const defaultBaseCounts: Record<string, number> =
    themeConfig.reactionsPreset === "literary"
      ? { coffee: 21, book: 28, lightbulb: 14, heart: 19, clap: 16 }
      : { fire: 18, heart: 24, lightbulb: 12, laugh: 7, clap: 15 };

  let threadReactionCounts: Record<string, number> = { ...defaultBaseCounts };

  try {
    const savedActiveReaction = localStorage.getItem(THREAD_REACTION_STORAGE_KEY);
    if (savedActiveReaction) {
      activeReactionKey = savedActiveReaction;
    }
  } catch {}

  try {
    const savedCounts = localStorage.getItem(THREAD_COUNTS_STORAGE_KEY);
    if (savedCounts) {
      threadReactionCounts = { ...threadReactionCounts, ...JSON.parse(savedCounts) };
    }
  } catch {}

  // Reader Ownership for 15-Minute Grace Window
  const OWNERSHIP_STORAGE_KEY = "nyuzi_reader_ownership";
  const GRACE_PERIOD_MS = 15 * 60 * 1000; // 15 mins

  function saveCommentOwnership(commentId: string) {
    try {
      const stored = localStorage.getItem(OWNERSHIP_STORAGE_KEY);
      const data: Record<string, number> = stored ? JSON.parse(stored) : {};
      data[commentId] = Date.now() + GRACE_PERIOD_MS;
      localStorage.setItem(OWNERSHIP_STORAGE_KEY, JSON.stringify(data));
    } catch {}
  }

  function removeCommentOwnership(commentId: string) {
    try {
      const stored = localStorage.getItem(OWNERSHIP_STORAGE_KEY);
      if (stored) {
        const data: Record<string, number> = JSON.parse(stored);
        delete data[commentId];
        localStorage.setItem(OWNERSHIP_STORAGE_KEY, JSON.stringify(data));
      }
    } catch {}
  }

  function getMyActiveComments(): Set<string> {
    const mine = new Set<string>();
    try {
      const stored = localStorage.getItem(OWNERSHIP_STORAGE_KEY);
      if (stored) {
        const data: Record<string, number> = JSON.parse(stored);
        const now = Date.now();
        for (const [id, expiresAt] of Object.entries(data)) {
          if (now < expiresAt) {
            mine.add(id);
          }
        }
      }
    } catch {}
    // In mock mode, pre-grant edit/delete on mock-3 so the user can test the UI in Embed Studio
    if (isMockMode) {
      mine.add("mock-3");
    }
    return mine;
  }

  // Restore upvoted comments from session
  try {
    const saved = sessionStorage.getItem("nyuzi_upvotes");
    if (saved) JSON.parse(saved).forEach((id: string) => upvotedComments.add(id));
  } catch {}

  // Author Persistence in LocalStorage
  let savedAuthorName = "";
  let savedAuthorEmail = "";
  try {
    savedAuthorName = localStorage.getItem("nyuzi_author_name") || "";
    savedAuthorEmail = localStorage.getItem("nyuzi_author_email") || "";
  } catch {}

  function saveAuthorInfo(name: string, email: string | null) {
    if (name) savedAuthorName = name;
    if (email) savedAuthorEmail = email;
    try {
      if (name) localStorage.setItem("nyuzi_author_name", name);
      if (email) localStorage.setItem("nyuzi_author_email", email);
    } catch {}
  }

  // Pre-populated Discussion for Studio Sandbox
  function seedMockComments(): NyuziComment[] {
    return [
      {
        id: "mock-1",
        parentId: null,
        authorName: postAuthor || "Fred Juma",
        authorEmail: "fredjuma8@gmail.com",
        content:
          "Welcome to our literary salon! **The Reading Circle** invites your reflections on this essay:\n\n> \"A reader lives a thousand lives before he dies. The man who never reads lives only one.\"\n\nFeel free to share your thoughts, quote your favorite passages, or reply to fellow readers below.",
        status: "approved",
        upvotes: 14,
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        isAuthor: true,
      },
      {
        id: "mock-2",
        parentId: "mock-1",
        authorName: "Brenda Frenjo",
        authorEmail: "readingcircle254@gmail.com",
        content:
          "The second chapter in particular felt so poignant. The pacing and character progression really resonated with what we discussed during Sunday's book circle session!",
        status: "approved",
        upvotes: 8,
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        isAuthor: true,
      },
      {
        id: "mock-3",
        parentId: null,
        authorName: "Amina Odhiambo",
        authorEmail: "amina@example.com",
        content:
          "Reading this made me pause and reflect on how we consume stories in the digital age. Check out this related discussion on [Bookish Perspectives](https://readingcircle254.com/blog)!",
        status: "approved",
        upvotes: 5,
        createdAt: new Date(Date.now() - 1800000).toISOString(),
      },
    ];
  }

  // Scroll to anchor on load
  function scrollToHashComment() {
    const hash = window.location.hash;
    if (hash && hash.startsWith("#comment-")) {
      setTimeout(() => {
        const target = shadow.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
          target.classList.add("nyuzi-highlight");
          setTimeout(() => target.classList.remove("nyuzi-highlight"), 3500);
        }
      }, 200);
    }
  }

  // Load comments
  async function loadComments() {
    if (isMockMode) {
      commentsList = seedMockComments();
      totalComments = commentsList.length;
      totalTopLevel = commentsList.filter((c) => !c.parentId).length;
      isLoading = false;
      render();
      return;
    }

    try {
      isLoading = true;
      currentPage = 1;
      render();

      const hash = window.location.hash;
      const highlight = hash && hash.startsWith("#comment-") ? hash.replace("#comment-", "") : "";

      const data: NyuziResponse = await fetchCommentsApi(
        apiHost,
        siteId,
        threadUrl,
        1,
        pageSize,
        highlight
      );

      commentsList = data.comments || [];
      totalComments = data.total || (data.pagination?.totalComments ?? commentsList.length);
      totalTopLevel = data.pagination?.totalTopLevel ?? commentsList.filter((c) => !c.parentId).length;
      hasMoreComments = data.pagination?.hasMore ?? false;
      if (data.thread?.reactions && Object.keys(data.thread.reactions).length > 0) {
        threadReactionCounts = { ...threadReactionCounts, ...data.thread.reactions };
      }
      if (data.siteSettings && typeof data.siteSettings === "object") {
        const s = data.siteSettings;
        if (!hasExplicitAccent && s.accentColor) themeConfig.accent = s.accentColor;
        if (!hasExplicitTheme && s.themeMode) themeConfig.themeMode = s.themeMode;
        if (!hasExplicitBgMode && s.bgMode) themeConfig.bgMode = s.bgMode;
        if (!hasExplicitBgColor && s.canvasBg !== undefined) themeConfig.bg = s.canvasBg;
        if (!hasExplicitCardBg && s.cardBg !== undefined) themeConfig.cardBg = s.cardBg;
        if (!hasExplicitTextColor && s.textColor !== undefined) themeConfig.textColor = s.textColor;
        if (!hasExplicitBorderColor && s.borderColor !== undefined) themeConfig.borderColor = s.borderColor;
        if (!hasExplicitRadius && s.radiusValue) themeConfig.radius = s.radiusValue;
        if (!hasExplicitReactionType && s.reactionType) themeConfig.reactionType = s.reactionType;
        if (!hasExplicitReactionsBar && s.showReactionsBar !== undefined) themeConfig.showReactionsBar = Boolean(s.showReactionsBar);
        if (!hasExplicitPrompt && s.reactionsPrompt) themeConfig.reactionsPrompt = s.reactionsPrompt;
        if (!hasExplicitPreset && s.reactionsPreset) themeConfig.reactionsPreset = s.reactionsPreset;
        if (!hasExplicitFormatting && Array.isArray(s.formattingTools)) themeConfig.allowedFormatting = s.formattingTools;
      }
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

  // Load more pagination
  async function loadMoreComments() {
    if (isLoadingMore || !hasMoreComments || isMockMode) return;
    try {
      isLoadingMore = true;
      render();

      const nextPage = currentPage + 1;
      const data: NyuziResponse = await fetchCommentsApi(
        apiHost,
        siteId,
        threadUrl,
        nextPage,
        pageSize
      );

      const newComments = data.comments || [];
      const existingIds = new Set(commentsList.map((c) => c.id));
      for (const c of newComments) {
        if (!existingIds.has(c.id)) {
          commentsList.push(c);
        }
      }

      currentPage = nextPage;
      hasMoreComments = data.pagination?.hasMore ?? false;
      totalTopLevel = data.pagination?.totalTopLevel ?? totalTopLevel;
      totalComments = data.pagination?.totalComments ?? totalComments;
      isLoadingMore = false;
      render();
    } catch (err) {
      console.error("[Nyuzi] Error loading more comments:", err);
      isLoadingMore = false;
      render();
    }
  }

  // Toggle upvote / like
  async function toggleUpvote(commentId: string) {
    const isCurrentlyUpvoted = upvotedComments.has(commentId);
    const action = isCurrentlyUpvoted ? "unvote" : "upvote";
    const c = commentsList.find((item) => item.id === commentId);

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

    if (isMockMode) return;

    try {
      const data = await toggleUpvoteApi(apiHost, commentId, action);
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

      if (isMockMode) {
        const mockNew: NyuziComment = {
          id: `mock-${Date.now()}`,
          parentId,
          authorName: authorName.trim(),
          authorEmail,
          content: content.trim(),
          status: "approved",
          upvotes: 0,
          createdAt: new Date().toISOString(),
        };
        saveCommentOwnership(mockNew.id);
        if (!parentId) {
          commentsList.unshift(mockNew);
          totalTopLevel += 1;
        } else {
          commentsList.push(mockNew);
        }
        totalComments += 1;
        activeReplyId = null;
        isSubmitting = false;
        render();
        return;
      }

      const data = await submitCommentApi(apiHost, {
        siteId,
        threadUrl,
        threadTitle,
        postAuthor,
        parentId,
        authorName,
        authorEmail,
        content,
        notifyOnReply,
      });

      if (data.comment) {
        saveCommentOwnership(data.comment.id);
        if (!parentId) {
          commentsList.unshift(data.comment);
          totalTopLevel += 1;
        } else {
          commentsList.push(data.comment);
        }
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

  // Edit comment (15-min grace window)
  async function editComment(commentId: string, newContent: string) {
    if (!newContent.trim()) return;
    try {
      isSubmitting = true;
      render();

      if (isMockMode) {
        const target = commentsList.find((c) => c.id === commentId);
        if (target) {
          target.content = newContent.trim();
          target.isEdited = true;
        }
        editingCommentId = null;
        isSubmitting = false;
        render();
        return;
      }

      await editCommentApi(apiHost, commentId, newContent.trim());
      const target = commentsList.find((c) => c.id === commentId);
      if (target) {
        target.content = newContent.trim();
        target.isEdited = true;
      }
      editingCommentId = null;
      isSubmitting = false;
      render();
    } catch (err: any) {
      alert(err.message || "Failed to edit comment.");
      isSubmitting = false;
      render();
    }
  }

  // Delete comment (15-min grace window)
  async function deleteComment(commentId: string) {
    try {
      isSubmitting = true;
      render();

      if (isMockMode) {
        commentsList = commentsList.filter((c) => c.id !== commentId && c.parentId !== commentId);
        totalComments = commentsList.length;
        totalTopLevel = commentsList.filter((c) => !c.parentId).length;
        removeCommentOwnership(commentId);
        confirmDeleteId = null;
        isSubmitting = false;
        render();
        return;
      }

      await deleteCommentApi(apiHost, commentId);
      commentsList = commentsList.filter((c) => c.id !== commentId && c.parentId !== commentId);
      totalComments = commentsList.length;
      totalTopLevel = commentsList.filter((c) => !c.parentId).length;
      removeCommentOwnership(commentId);
      confirmDeleteId = null;
      isSubmitting = false;
      render();
    } catch (err: any) {
      alert("Failed to delete comment. Please try again.");
      confirmDeleteId = null;
      isSubmitting = false;
      render();
    }
  }

  // Formatting Toolbar Helper
  function applyFormatting(textarea: HTMLTextAreaElement, action: string) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const val = textarea.value;
    const selection = val.substring(start, end);

    let replacement = "";
    let cursorOffset = 0;

    switch (action) {
      case "bold":
        replacement = selection ? `**${selection}**` : "**bold text**";
        cursorOffset = selection ? replacement.length : 2;
        break;
      case "italic":
        replacement = selection ? `*${selection}*` : "*italic text*";
        cursorOffset = selection ? replacement.length : 1;
        break;
      case "quote":
        if (selection) {
          replacement = selection
            .split("\n")
            .map((line) => `> ${line}`)
            .join("\n");
        } else {
          replacement = "> quote text";
        }
        cursorOffset = replacement.length;
        break;
      case "code":
        replacement = selection ? `\`${selection}\`` : "`code`";
        cursorOffset = selection ? replacement.length : 1;
        break;
      case "link":
        replacement = selection ? `[${selection}](https://)` : "[link title](https://example.com)";
        cursorOffset = replacement.length - 1;
        break;
      default:
        return;
    }

    textarea.value = val.substring(0, start) + replacement + val.substring(end);
    textarea.focus();
    const newPos = start + cursorOffset;
    textarea.setSelectionRange(newPos, newPos);

    // Trigger input event to update counters
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
  }

  // Main Render Routine
  function render() {
    const topLevelComments = commentsList.filter((c) => !c.parentId);
    const styles = generateWidgetStyles(themeConfig);
    const myComments = getMyActiveComments();
    if (themeConfig.themeMode && container) {
      container.setAttribute("data-theme", themeConfig.themeMode);
    }

    shadow.innerHTML = `
      <style>${styles}</style>
      <div class="nyuzi-container">
        ${themeConfig.showReactionsBar ? renderTopReactionsBar(activeReactionKey, themeConfig.reactionsPrompt, themeConfig.reactionsPreset, threadReactionCounts) : ""}

        <!-- Header -->
        <div class="nyuzi-header">
          <h3 class="nyuzi-title">
            Discussion
            <span class="nyuzi-badge">${totalComments}</span>
          </h3>
        </div>

        <!-- Main Form -->
        <div class="nyuzi-form">
          ${
            formError
              ? `<div class="nyuzi-alert">
                   <span>⚠️ ${escapeHtml(formError)}</span>
                   <button class="nyuzi-action-btn" id="dismiss-error" style="color:#b91c1c;">✕</button>
                 </div>`
              : ""
          }

          ${renderFormatToolbar("nyuzi-main-content", themeConfig.allowedFormatting)}
          <textarea class="nyuzi-textarea" id="nyuzi-main-content" maxlength="2000" placeholder="Share your thoughts or leave a question..." required></textarea>
          <div class="nyuzi-counter-row">
            <span id="nyuzi-char-count">0 / 2,000</span>
          </div>

          <div class="nyuzi-form-row">
            <div class="nyuzi-inputs">
              <input type="text" class="nyuzi-input" id="nyuzi-main-name" placeholder="Name *" value="${escapeHtml(savedAuthorName)}" required />
              <input type="email" class="nyuzi-input" id="nyuzi-main-email" placeholder="Email (for reply alerts)" value="${escapeHtml(savedAuthorEmail)}" />
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

        <!-- Comments Stream -->
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
                 ${topLevelComments
                   .map((c) =>
                     renderComment(c, commentsList, {
                       postAuthor,
                       reactionType: themeConfig.reactionType,
                       upvotedComments,
                       activeReplyId,
                       editingCommentId,
                       confirmDeleteId,
                       collapsedComments,
                       myComments,
                       isSubmitting,
                       savedAuthorName,
                       savedAuthorEmail,
                       allowedFormatting: themeConfig.allowedFormatting,
                     })
                   )
                   .join("")}
               </div>
               ${
                 hasMoreComments
                   ? `<div class="nyuzi-pagination">
                        <button class="nyuzi-load-more-btn" id="nyuzi-load-more" ${isLoadingMore ? "disabled" : ""}>
                          ${
                            isLoadingMore
                              ? `<span class="nyuzi-spinner"></span> Loading comments...`
                              : `Load more comments (${Math.max(0, totalTopLevel - topLevelComments.length)} remaining) ↓`
                          }
                        </button>
                      </div>`
                   : ""
               }`
        }

        <!-- Footer -->
        <div class="nyuzi-footer">
          <a href="https://nyuzi-yap.vercel.app/" target="_blank" rel="noreferrer" class="nyuzi-brand" title="NyuziYap — Privacy-first, edge-powered comments">
            <svg class="nyuzi-bolt-icon" viewBox="0 0 24 24" fill="url(#nyuzi-bolt-grad)">
              <defs>
                <linearGradient id="nyuzi-bolt-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#FACC15" />
                  <stop offset="100%" stop-color="#F56220" />
                </linearGradient>
              </defs>
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span>Powered by</span>
            <strong>NyuziYap</strong>
          </a>
        </div>
      </div>
    `;

    // Bind Listeners
    attachEventListeners();
  }

  function attachEventListeners() {
    // Reactions bar pills (Persistent voting & unvoting)
    shadow.querySelectorAll(".nyuzi-reaction-pill").forEach((pill) => {
      pill.addEventListener("click", async (e) => {
        const key = (e.currentTarget as HTMLElement).getAttribute("data-reaction-key");
        if (!key) return;

        const prevKey = activeReactionKey;
        let action: "react" | "unreact" | "switch";

        if (activeReactionKey === key) {
          // Unvote
          action = "unreact";
          activeReactionKey = null;
          threadReactionCounts[key] = Math.max(0, (threadReactionCounts[key] || 1) - 1);
          try {
            localStorage.removeItem(THREAD_REACTION_STORAGE_KEY);
          } catch {}
        } else if (activeReactionKey) {
          // Switch vote from previous
          action = "switch";
          const old = activeReactionKey;
          activeReactionKey = key;
          threadReactionCounts[old] = Math.max(0, (threadReactionCounts[old] || 1) - 1);
          threadReactionCounts[key] = (threadReactionCounts[key] || 0) + 1;
          try {
            localStorage.setItem(THREAD_REACTION_STORAGE_KEY, key);
          } catch {}
        } else {
          // New vote
          action = "react";
          activeReactionKey = key;
          threadReactionCounts[key] = (threadReactionCounts[key] || 0) + 1;
          try {
            localStorage.setItem(THREAD_REACTION_STORAGE_KEY, key);
          } catch {}
        }

        try {
          localStorage.setItem(THREAD_COUNTS_STORAGE_KEY, JSON.stringify(threadReactionCounts));
        } catch {}

        render();

        if (!isMockMode) {
          try {
            const result = await toggleThreadReactionApi(apiHost, {
              siteId,
              threadUrl,
              threadTitle,
              reactionKey: key,
              previousKey: prevKey,
              action,
            });
            if (result && result.reactions) {
              threadReactionCounts = { ...threadReactionCounts, ...result.reactions };
              render();
            }
          } catch (err) {
            console.warn("[Nyuzi] Failed to sync reaction to server:", err);
          }
        }
      });
    });

    // Formatting Toolbar Buttons
    shadow.querySelectorAll(".nyuzi-format-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const action = (e.currentTarget as HTMLElement).getAttribute("data-action");
        const toolbar = (e.currentTarget as HTMLElement).closest(".nyuzi-format-toolbar");
        const targetId = toolbar?.getAttribute("data-target");
        if (!action || !targetId) return;

        const targetTextarea = shadow.getElementById(targetId) as HTMLTextAreaElement | null;
        if (targetTextarea) {
          applyFormatting(targetTextarea, action);
        }
      });
    });

    // Character counter
    const contentInput = shadow.getElementById("nyuzi-main-content") as HTMLTextAreaElement | null;
    const charCount = shadow.getElementById("nyuzi-char-count");
    if (contentInput && charCount) {
      contentInput.addEventListener("input", () => {
        charCount.textContent = `${contentInput.value.length} / 2,000`;
      });
    }

    // Dismiss error
    const dismissError = shadow.getElementById("dismiss-error");
    if (dismissError) {
      dismissError.addEventListener("click", () => {
        formError = null;
        render();
      });
    }

    // Submit main comment
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

        const cleanName = nameInput.value.trim();
        const cleanEmail = emailInput.value.trim() || null;
        saveAuthorInfo(cleanName, cleanEmail);

        submitComment(
          cleanName,
          cleanEmail,
          contentInput.value.trim(),
          notifyCheck ? notifyCheck.checked : true,
          null
        );
      });
    }

    // Load more
    const loadMoreBtn = shadow.getElementById("nyuzi-load-more");
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", () => {
        loadMoreComments();
      });
    }

    // Reaction upvote buttons
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
        editingCommentId = null;
        confirmDeleteId = null;
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
        const emailInput = shadow.getElementById(`reply-email-${parentId}`) as HTMLInputElement | null;
        const replyContent = shadow.getElementById(`reply-content-${parentId}`) as HTMLTextAreaElement;

        if (!nameInput.value.trim()) {
          alert("Please enter your name.");
          return;
        }
        if (!replyContent || !replyContent.value.trim()) {
          alert("Reply content cannot be empty.");
          return;
        }

        const cleanName = nameInput.value.trim();
        const cleanEmail = emailInput?.value.trim() || null;
        saveAuthorInfo(cleanName, cleanEmail);

        submitComment(cleanName, cleanEmail, replyContent.value.trim(), true, parentId);
      });
    });

    // Edit triggers (15-min grace window)
    shadow.querySelectorAll(".edit-trigger").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute("data-id");
        editingCommentId = id;
        activeReplyId = null;
        confirmDeleteId = null;
        render();
      });
    });

    // Cancel edit
    shadow.querySelectorAll(".cancel-edit").forEach((btn) => {
      btn.addEventListener("click", () => {
        editingCommentId = null;
        render();
      });
    });

    // Save edit
    shadow.querySelectorAll(".save-edit").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute("data-id");
        if (!id) return;
        const textarea = shadow.getElementById(`edit-content-${id}`) as HTMLTextAreaElement | null;
        if (!textarea || !textarea.value.trim()) {
          alert("Comment content cannot be empty.");
          return;
        }
        editComment(id, textarea.value.trim());
      });
    });

    // Delete trigger (15-min grace window)
    shadow.querySelectorAll(".delete-trigger").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute("data-id");
        confirmDeleteId = id;
        activeReplyId = null;
        editingCommentId = null;
        render();
      });
    });

    // Cancel delete
    shadow.querySelectorAll(".nyuzi-cancel-delete-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        confirmDeleteId = null;
        render();
      });
    });

    // Confirm delete
    shadow.querySelectorAll(".nyuzi-confirm-delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute("data-id");
        if (id) deleteComment(id);
      });
    });

    // Collapsible replies toggle
    shadow.querySelectorAll(".nyuzi-collapse-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute("data-id");
        if (!id) return;
        if (collapsedComments.has(id)) {
          collapsedComments.delete(id);
        } else {
          collapsedComments.add(id);
        }
        render();
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

  // Listen to hash changes
  window.addEventListener("hashchange", scrollToHashComment);

  // Initial load
  loadComments();
})();