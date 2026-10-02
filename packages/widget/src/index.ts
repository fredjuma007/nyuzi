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
  renderBottomToolbar,
} from "./templates";
import {
  fetchCommentsApi,
  submitCommentApi,
  toggleUpvoteApi,
  editCommentApi,
  deleteCommentApi,
  toggleThreadReactionApi,
  fetchGifsApi,
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
  if ((container as any).__nyuzi_initialized) {
    return;
  }
  (container as any).__nyuzi_initialized = true;

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
    "bold,italic,quote,code,link,emoji,gif";

  const allowedFormatting = rawFormatting
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  // Lazy-Loaded Emoji Architecture (Option C)
  const scriptSrc = currentScript?.src || "";
  let widgetOrigin = "https://nyuzi-yap.vercel.app";
  if (scriptSrc) {
    try {
      const url = new URL(scriptSrc);
      widgetOrigin = url.origin;
    } catch {}
  }
  const emojiPickerScriptUrl = `${widgetOrigin}/emoji-picker.js`;

  let isEmojiPickerLoaded = false;
  let isEmojiPickerLoading = false;

  function loadEmojiPicker(): Promise<void> {
    if (typeof customElements !== "undefined" && customElements.get("emoji-picker")) {
      isEmojiPickerLoaded = true;
      return Promise.resolve();
    }
    if (isEmojiPickerLoaded) return Promise.resolve();

    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src*="emoji-picker.js"]`);
      if (existing) {
        if (customElements.get("emoji-picker")) {
          isEmojiPickerLoaded = true;
          return resolve();
        }
        existing.addEventListener("load", () => {
          isEmojiPickerLoaded = true;
          resolve();
        });
        existing.addEventListener("error", reject);
        return;
      }

      isEmojiPickerLoading = true;
      const script = document.createElement("script");
      script.src = emojiPickerScriptUrl;
      script.async = true;
      script.onload = () => {
        isEmojiPickerLoaded = true;
        isEmojiPickerLoading = false;
        resolve();
      };
      script.onerror = (err) => {
        isEmojiPickerLoading = false;
        reject(err);
      };
      document.head.appendChild(script);
    });
  }

  function prefetchEmojiPicker() {
    if (isEmojiPickerLoaded || isEmojiPickerLoading || (typeof customElements !== "undefined" && customElements.get("emoji-picker"))) return;
    loadEmojiPicker().catch(() => {});
  }

  function insertEmojiAtCursor(textarea: HTMLTextAreaElement, emoji: string) {
    const start = textarea.selectionStart ?? textarea.value.length;
    const end = textarea.selectionEnd ?? textarea.value.length;
    const val = textarea.value;
    textarea.value = val.substring(0, start) + emoji + val.substring(end);
    const newPos = start + emoji.length;
    textarea.focus();
    textarea.setSelectionRange(newPos, newPos);
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
  }

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
  /**
   * Host Theme Auto-Detection (#2)
   * Deeply inspects host <html>/<body> class names, data attributes,
   * computed parent background luminance, and system prefers-color-scheme.
   */
  function detectHostTheme(): "light" | "dark" {
    try {
      const html = document.documentElement;
      const body = document.body;

      // 1. Check explicit attributes or class names on <html> or <body>
      const htmlTheme =
        html.getAttribute("data-theme") ||
        html.getAttribute("data-color-mode") ||
        html.getAttribute("data-bs-theme") ||
        "";
      const bodyTheme =
        body?.getAttribute("data-theme") ||
        body?.getAttribute("data-color-mode") ||
        body?.getAttribute("data-bs-theme") ||
        "";
      const explicitTheme = `${htmlTheme} ${bodyTheme}`.toLowerCase();
      if (explicitTheme.includes("dark")) return "dark";
      if (explicitTheme.includes("light")) return "light";

      const hasDarkClass =
        html.classList.contains("dark") ||
        html.classList.contains("dark-theme") ||
        html.classList.contains("dark-mode") ||
        html.classList.contains("theme-dark") ||
        Boolean(
          body && (
            body.classList.contains("dark") ||
            body.classList.contains("dark-theme") ||
            body.classList.contains("dark-mode") ||
            body.classList.contains("theme-dark")
          )
        );
      if (hasDarkClass) return "dark";

      const hasLightClass =
        html.classList.contains("light") ||
        html.classList.contains("light-theme") ||
        html.classList.contains("light-mode") ||
        html.classList.contains("theme-light") ||
        Boolean(
          body && (
            body.classList.contains("light") ||
            body.classList.contains("light-theme") ||
            body.classList.contains("light-mode") ||
            body.classList.contains("theme-light")
          )
        );
      if (hasLightClass) return "light";

      // 2. Computed background color walk-up from container to body/html
      let el: HTMLElement | null = container.parentElement;
      while (el && el !== document.documentElement) {
        const bg = window.getComputedStyle(el).backgroundColor;
        if (bg && bg !== "transparent" && !bg.startsWith("rgba(0, 0, 0, 0)")) {
          const rgb = bg.match(/\d+/g);
          if (rgb && rgb.length >= 3) {
            const r = parseInt(rgb[0], 10);
            const g = parseInt(rgb[1], 10);
            const b = parseInt(rgb[2], 10);
            const a = rgb.length >= 4 ? parseFloat(rgb[3]) : 1;
            if (a > 0.1) {
              const lum = (r * 299 + g * 587 + b * 114) / 1000;
              return lum < 130 ? "dark" : "light";
            }
          }
        }
        el = el.parentElement;
      }

      if (body) {
        const bg = window.getComputedStyle(body).backgroundColor;
        if (bg && bg !== "transparent" && !bg.startsWith("rgba(0, 0, 0, 0)")) {
          const rgb = bg.match(/\d+/g);
          if (rgb && rgb.length >= 3) {
            const r = parseInt(rgb[0], 10);
            const g = parseInt(rgb[1], 10);
            const b = parseInt(rgb[2], 10);
            const lum = (r * 299 + g * 587 + b * 114) / 1000;
            return lum < 130 ? "dark" : "light";
          }
        }
      }
    } catch {}

    // 3. Fallback to browser/OS prefers-color-scheme
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  }

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

  const initialUserName =
    currentScript?.getAttribute("data-user-name") ||
    container.getAttribute("data-user-name") ||
    "";

  const initialUserEmail =
    currentScript?.getAttribute("data-user-email") ||
    container.getAttribute("data-user-email") ||
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
  let isTogglingReaction = false;

  // Persistent Thread Reactions
  const THREAD_REACTION_STORAGE_KEY = `nyuzi_react_${siteId}_${encodeURIComponent(threadUrl)}`;
  const THREAD_COUNTS_STORAGE_KEY = `nyuzi_counts_${siteId}_${encodeURIComponent(threadUrl)}`;

  const defaultBaseCounts: Record<string, number> = isMockMode
    ? (themeConfig.reactionsPreset === "literary"
      ? { coffee: 21, book: 28, lightbulb: 14, heart: 19, clap: 16 }
      : { fire: 18, heart: 24, lightbulb: 12, laugh: 7, clap: 15 })
    : {};

  let threadReactionCounts: Record<string, number> = { ...defaultBaseCounts };

  try {
    const savedActiveReaction = localStorage.getItem(THREAD_REACTION_STORAGE_KEY);
    if (savedActiveReaction) {
      activeReactionKey = savedActiveReaction;
    }
  } catch {}

  if (isMockMode) {
    try {
      const savedCounts = localStorage.getItem(THREAD_COUNTS_STORAGE_KEY);
      if (savedCounts) {
        threadReactionCounts = { ...threadReactionCounts, ...JSON.parse(savedCounts) };
      }
    } catch {}
  }

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

  // Author Persistence in LocalStorage (Prioritizing host site user identity)
  let savedAuthorName = initialUserName || "";
  let savedAuthorEmail = initialUserEmail || "";
  try {
    if (!savedAuthorName) {
      savedAuthorName = localStorage.getItem("nyuzi_author_name") || "";
    }
    if (!savedAuthorEmail) {
      savedAuthorEmail = localStorage.getItem("nyuzi_author_email") || "";
    }
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
          "The second chapter in particular felt so poignant. The pacing and character progression really resonated with what we discussed during Sunday's book circle session!\n\n![Mind Blown](https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif)",
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
      if (!isMockMode) {
        threadReactionCounts =
          data.thread?.reactions && typeof data.thread.reactions === "object"
            ? { ...data.thread.reactions }
            : {};
      }
      if (data.siteSettings && typeof data.siteSettings === "object") {
        const s = data.siteSettings;
        if (s.accentColor) themeConfig.accent = s.accentColor;
        if (s.themeMode) themeConfig.themeMode = s.themeMode;
        if (s.bgMode) themeConfig.bgMode = s.bgMode;
        if (s.canvasBg !== undefined && s.canvasBg !== "") themeConfig.bg = s.canvasBg;
        if (s.cardBg !== undefined && s.cardBg !== "") themeConfig.cardBg = s.cardBg;
        if (s.textColor !== undefined && s.textColor !== "") themeConfig.textColor = s.textColor;
        if (s.borderColor !== undefined && s.borderColor !== "") themeConfig.borderColor = s.borderColor;
        if (s.radiusValue) themeConfig.radius = s.radiusValue;
        if (s.reactionType) themeConfig.reactionType = s.reactionType;
        if (s.showReactionsBar !== undefined) themeConfig.showReactionsBar = Boolean(s.showReactionsBar);
        if (s.reactionsPrompt) themeConfig.reactionsPrompt = s.reactionsPrompt;
        if (s.reactionsPreset) themeConfig.reactionsPreset = s.reactionsPreset;
        if (Array.isArray(s.formattingTools)) themeConfig.allowedFormatting = s.formattingTools;
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
    const hostTheme = detectHostTheme();
    const resolvedTheme =
      themeConfig.themeMode === "auto"
        ? hostTheme
        : themeConfig.themeMode || hostTheme;

    // Check if the widget's theme clashes with the host's background
    const isOpposite =
      (resolvedTheme === "light" && hostTheme === "dark") ||
      (resolvedTheme === "dark" && hostTheme === "light");

    const isTransparentBg =
      !themeConfig.bg ||
      themeConfig.bg === "transparent" ||
      themeConfig.bgMode === "transparent";

    // Smart Card Isolation (#1):
    // When a forced opposite theme (e.g. Light widget on Dark host) is placed on a transparent canvas,
    // isolate it inside an elevated card container with its own solid canvas bg, border, and depth shadow.
    const isCardIsolated = Boolean(
      isOpposite && isTransparentBg && themeConfig.themeMode !== "auto"
    );

    const activeConfig: ThemeConfig = {
      ...themeConfig,
      resolvedTheme,
      isCardIsolated,
    };

    const styles = generateWidgetStyles(activeConfig);
    const myComments = getMyActiveComments();
    if (container) {
      container.setAttribute("data-theme", resolvedTheme);
      if (isCardIsolated) {
        container.setAttribute("data-card-isolated", "true");
      } else {
        container.removeAttribute("data-card-isolated");
      }
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
          <div class="nyuzi-attached-gif-preview" id="nyuzi-main-content-gif-preview" style="display: none;"></div>
          ${
            initialUserName
              ? `<div class="nyuzi-member-chip" style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:9999px;background:var(--nyuzi-accent-soft);color:var(--nyuzi-accent);font-size:0.75rem;font-weight:700;margin-bottom:8px;border:1px solid var(--nyuzi-accent-border);">
                   <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                   <span>Logged in as <strong>${escapeHtml(savedAuthorName)}</strong>${savedAuthorEmail ? ` &bull; ${escapeHtml(savedAuthorEmail)}` : ""}</span>
                 </div>`
              : ""
          }

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

        <!-- Footer (link commented out to protect dashboard until auth is ready) -->
        <div class="nyuzi-footer">
          <!-- <a href="https://nyuzi-yap.vercel.app/" target="_blank" rel="noreferrer" class="nyuzi-brand" title="NyuziYap — Privacy-first, edge-powered comments"> -->
          <span class="nyuzi-brand" title="NyuziYap — Privacy-first, edge-powered comments" style="cursor: default; pointer-events: none;">
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
          </span>
          <!-- </a> -->
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
        if (isTogglingReaction) return;
        const key = (e.currentTarget as HTMLElement).getAttribute("data-reaction-key");
        if (!key) return;

        isTogglingReaction = true;

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
              threadReactionCounts = { ...result.reactions };
              render();
            }
          } catch (err) {
            console.warn("[Nyuzi] Failed to sync reaction to server:", err);
          } finally {
            isTogglingReaction = false;
          }
        } else {
          isTogglingReaction = false;
        }
      });
    });

    // Emoji Popover Toggle
    async function toggleEmojiPopover(toolbar: HTMLElement, targetTextarea: HTMLTextAreaElement) {
      const popover = toolbar.querySelector(".nyuzi-emoji-popover") as HTMLElement | null;
      if (!popover) return;

      if (popover.style.display !== "none") {
        popover.style.display = "none";
        return;
      }

      // Close all other open emoji & gif popovers
      shadow.querySelectorAll(".nyuzi-emoji-popover, .nyuzi-gif-popover").forEach((p) => {
        (p as HTMLElement).style.display = "none";
      });

      popover.style.display = "block";

      const existingPicker = popover.querySelector("emoji-picker");
      if (existingPicker) {
        setTimeout(() => (existingPicker as any).shadowRoot?.querySelector("input")?.focus(), 50);
        return;
      }

      popover.innerHTML = `
        <div class="nyuzi-emoji-loading">
          <span class="nyuzi-spinner"></span>
          <span>Loading emoji library...</span>
        </div>
      `;

      try {
        await loadEmojiPicker();
        if (popover.style.display === "none") return;

        const currentTheme = container.getAttribute("data-theme") || "dark";
        const picker = document.createElement("emoji-picker") as any;
        picker.className = currentTheme === "light" ? "light" : "dark";

        picker.addEventListener("emoji-click", (ev: any) => {
          const unicode = ev.detail?.unicode;
          if (unicode) {
            insertEmojiAtCursor(targetTextarea, unicode);
          }
        });

        popover.innerHTML = "";
        popover.appendChild(picker);
        setTimeout(() => picker.shadowRoot?.querySelector("input")?.focus(), 50);
      } catch (err) {
        console.error("[Nyuzi] Failed to load emoji picker:", err);
        popover.innerHTML = `
          <div class="nyuzi-emoji-loading" style="color: #ef4444;">
            <span>Failed to load emoji library.</span>
          </div>
        `;
      }
    }

    // Session cache for GIF searches (0ms instant hits across popover openings)
    const gifSessionCache = new Map<string, Array<{ id: string; title: string; url: string; preview: string }>>();

    // GIF Popover Toggle
    async function toggleGifPopover(toolbar: HTMLElement, targetTextarea: HTMLTextAreaElement) {
      const popover = toolbar.querySelector(".nyuzi-gif-popover") as HTMLElement | null;
      if (!popover) return;
      const gifPopover: HTMLElement = popover;

      if (gifPopover.style.display !== "none") {
        gifPopover.style.display = "none";
        return;
      }

      // Close all other open emoji & gif popovers
      shadow.querySelectorAll(".nyuzi-emoji-popover, .nyuzi-gif-popover").forEach((p) => {
        (p as HTMLElement).style.display = "none";
      });

      popover.style.display = "block";

      const fallbackGifs: Array<{
        id: string;
        title: string;
        tags: string[];
        url: string;
        preview: string;
      }> = [
        {
          id: "dance_carlton",
          title: "Carlton Dance",
          tags: ["dance", "dancing", "happy", "party", "celebration", "groove", "vibes"],
          url: "https://media.giphy.com/media/pa37AAGzKXoek/giphy.gif",
          preview: "https://media.giphy.com/media/pa37AAGzKXoek/200_d.gif",
        },
        {
          id: "dance_snoopy",
          title: "Snoopy Dance",
          tags: ["dance", "dancing", "snoopy", "cartoon", "happy", "cute", "vibing"],
          url: "https://media.giphy.com/media/mKMGLhoD8L4yc/giphy.gif",
          preview: "https://media.giphy.com/media/mKMGLhoD8L4yc/200_d.gif",
        },
        {
          id: "dance_kid",
          title: "Dancing Kid",
          tags: ["dance", "dancing", "kid", "excited", "happy", "party", "moves"],
          url: "https://media.giphy.com/media/blSTtZehjAZ8I/giphy.gif",
          preview: "https://media.giphy.com/media/blSTtZehjAZ8I/200_d.gif",
        },
        {
          id: "dance_cat",
          title: "Dancing Cat",
          tags: ["dance", "dancing", "cat", "kitten", "pet", "vibes", "funny"],
          url: "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif",
          preview: "https://media.giphy.com/media/JIX9t2j0ZTN9S/200_d.gif",
        },
        {
          id: "cheers_gatsby",
          title: "Gatsby Cheers",
          tags: ["cheers", "toast", "drink", "respect", "congrats", "salute", "celebrate"],
          url: "https://media.giphy.com/media/g9582DNuQppxC/giphy.gif",
          preview: "https://media.giphy.com/media/g9582DNuQppxC/200_d.gif",
        },
        {
          id: "nod_yes",
          title: "Jack Nicholson Nod",
          tags: ["yes", "nod", "nodding", "agree", "perfect", "evil smile", "indeed"],
          url: "https://media.giphy.com/media/10Jpr9KSaXLchW/giphy.gif",
          preview: "https://media.giphy.com/media/10Jpr9KSaXLchW/200_d.gif",
        },
        {
          id: "popcorn_mj",
          title: "Eating Popcorn",
          tags: ["popcorn", "drama", "watching", "waiting", "reading", "thriller", "tea"],
          url: "https://media.giphy.com/media/gl0mkIZOW6Nwc/giphy.gif",
          preview: "https://media.giphy.com/media/gl0mkIZOW6Nwc/200_d.gif",
        },
        {
          id: "facepalm_picard",
          title: "Facepalm",
          tags: ["facepalm", "smh", "disappointed", "no", "why", "ugh", "sigh"],
          url: "https://media.giphy.com/media/3og0INyCmHlNylks9O/giphy.gif",
          preview: "https://media.giphy.com/media/3og0INyCmHlNylks9O/200_d.gif",
        },
        {
          id: "clap_applause",
          title: "Clap",
          tags: ["clap", "applause", "bravo", "cheer", "great", "awesome", "yes"],
          url: "https://media.giphy.com/media/l3q2XhfQ8oCkm1Ts4/giphy.gif",
          preview: "https://media.giphy.com/media/l3q2XhfQ8oCkm1Ts4/200_d.gif",
        },
        {
          id: "mind_blown",
          title: "Mind Blown",
          tags: ["mind blown", "shocked", "wow", "amazing", "boom", "galaxy", "crazy"],
          url: "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif",
          preview: "https://media.giphy.com/media/26ufdipQqU2lhNA4g/200_d.gif",
        },
        {
          id: "reading_book",
          title: "Reading Book",
          tags: ["reading", "book", "read", "learn", "study", "literature", "words"],
          url: "https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif",
          preview: "https://media.giphy.com/media/3o7btPCcdNniyf0ArS/200_d.gif",
        },
        {
          id: "laughing_lol",
          title: "Laughing",
          tags: ["laugh", "laughing", "lol", "haha", "funny", "lmao", "rofl"],
          url: "https://media.giphy.com/media/10JhviFuU2gWD6/giphy.gif",
          preview: "https://media.giphy.com/media/10JhviFuU2gWD6/200_d.gif",
        },
        {
          id: "thinking_brain",
          title: "Thinking",
          tags: ["think", "thinking", "smart", "brain", "idea", "clever", "plan"],
          url: "https://media.giphy.com/media/d3mlE7uhX8KFgEmY/giphy.gif",
          preview: "https://media.giphy.com/media/d3mlE7uhX8KFgEmY/200_d.gif",
        },
        {
          id: "thumbs_up",
          title: "Thumbs Up",
          tags: ["thumbs up", "good", "nice", "ok", "cool", "like", "approve"],
          url: "https://media.giphy.com/media/111ebonMs90YLu/giphy.gif",
          preview: "https://media.giphy.com/media/111ebonMs90YLu/200_d.gif",
        },
        {
          id: "love_heart",
          title: "Love / Heart",
          tags: ["love", "heart", "wholesome", "sweet", "aww", "lovely", "care"],
          url: "https://media.giphy.com/media/26FLdm964upIslUZ2/giphy.gif",
          preview: "https://media.giphy.com/media/26FLdm964upIslUZ2/200_d.gif",
        },
        {
          id: "speechless_cat",
          title: "Speechless",
          tags: ["speechless", "confused", "what", "awkward", "silence", "stare"],
          url: "https://media.giphy.com/media/l0HlvtIPzPdt2usKs/giphy.gif",
          preview: "https://media.giphy.com/media/l0HlvtIPzPdt2usKs/200_d.gif",
        },
        {
          id: "celebration_party",
          title: "Celebration",
          tags: ["celebration", "celebrate", "party", "winner", "victory", "hurray", "dance"],
          url: "https://media.giphy.com/media/ely3apij36BJhoZ234/giphy.gif",
          preview: "https://media.giphy.com/media/ely3apij36BJhoZ234/200_d.gif",
        },
        {
          id: "coffee_cup",
          title: "Coffee",
          tags: ["coffee", "tea", "morning", "work", "cafe", "warm"],
          url: "https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif",
          preview: "https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/200_d.gif",
        },
        {
          id: "writing_type",
          title: "Writing",
          tags: ["writing", "write", "author", "typing", "keyboard", "essay", "draft"],
          url: "https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif",
          preview: "https://media.giphy.com/media/13HgwGsXF0aiGY/200_d.gif",
        },
        {
          id: "excited_jonah",
          title: "Excited",
          tags: ["excited", "hype", "scream", "omg", "yes", "dance", "happy"],
          url: "https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif",
          preview: "https://media.giphy.com/media/5GoVLqeAOo6PK/200_d.gif",
        },
      ];

      popover.innerHTML = `
        <div class="nyuzi-gif-header">
          <input type="text" class="nyuzi-gif-search-input" placeholder="Search GIFs..." autocomplete="off" />
        </div>
        <div class="nyuzi-gif-grid">
          <div style="grid-column: 1 / -1; padding: 1.5rem; text-align: center; color: var(--nyuzi-text-muted); font-size: 0.8125rem;">
            <span class="nyuzi-spinner" style="display: inline-block; margin-bottom: 0.35rem;"></span>
            <div>Loading GIFs...</div>
          </div>
        </div>
        <div class="nyuzi-gif-footer">
          <span>Powered by GIPHY</span>
        </div>
      `;

      const searchInput = popover.querySelector(".nyuzi-gif-search-input") as HTMLInputElement | null;
      const grid = popover.querySelector(".nyuzi-gif-grid") as HTMLElement | null;

      if (searchInput) {
        setTimeout(() => searchInput.focus(), 50);
      }

      function displayResults(items: Array<{ id: string; title: string; url: string; preview: string }>, activeQuery: string) {
        if (!grid) return;
        if (items.length === 0) {
          grid.innerHTML = `
            <div style="grid-column: 1 / -1; padding: 1.5rem; text-align: center; color: var(--nyuzi-text-muted); font-size: 0.8125rem;">
              No GIFs found for "${escapeHtml(activeQuery)}"
            </div>
          `;
          return;
        }

        grid.innerHTML = items
          .map(
            (g) => `
          <div class="nyuzi-gif-card" data-gif-url="${escapeHtml(g.url)}" title="${escapeHtml(g.title)}">
            <img src="${escapeHtml(g.preview || g.url)}" alt="${escapeHtml(g.title)}" loading="lazy" />
          </div>
        `
          )
          .join("");

        grid.querySelectorAll(".nyuzi-gif-card").forEach((card) => {
          card.addEventListener("click", () => {
            const url = card.getAttribute("data-gif-url");
            const previewUrl = card.getAttribute("data-gif-preview") || url || "";
            if (url) {
              // Preload/pre-warm full image in browser cache
              try {
                const preloadImg = new Image();
                preloadImg.src = url;
              } catch {}

              attachGifToForm(toolbar, targetTextarea, url, previewUrl);
              gifPopover.style.display = "none";
            }
          });
        });
      }

      async function renderGifs(query = "") {
        if (!grid) return;
        const normalizedKey = query.toLowerCase().trim();

        // Tier 2: Instant 0ms memory cache hit
        if (gifSessionCache.has(normalizedKey)) {
          displayResults(gifSessionCache.get(normalizedKey)!, query);
          return;
        }

        grid.innerHTML = `
          <div style="grid-column: 1 / -1; padding: 1.5rem; text-align: center; color: var(--nyuzi-text-muted); font-size: 0.8125rem;">
            <span class="nyuzi-spinner" style="display: inline-block; margin-bottom: 0.35rem;"></span>
            <div>Searching...</div>
          </div>
        `;

        let list: Array<{ id: string; title: string; url: string; preview: string }> = [];
        try {
          // Attempt real API search first (served in ~5ms from Cloudflare Edge cache if query was seen)
          list = await fetchGifsApi(apiHost, query);
        } catch {
          list = [];
        }

        // If remote search had no results or host wasn't reachable, use rich curated reaction GIFs
        if (!list || list.length === 0) {
          list = normalizedKey
            ? fallbackGifs.filter(
                (g) =>
                  g.title.toLowerCase().includes(normalizedKey) ||
                  g.tags.some((t) => t.toLowerCase().includes(normalizedKey) || normalizedKey.includes(t.toLowerCase()))
              )
            : fallbackGifs;
        }

        // Save to Tier 2 session memory cache
        gifSessionCache.set(normalizedKey, list);
        displayResults(list, query);
      }

      renderGifs("");

      let searchTimeout: any = null;
      if (searchInput) {
        searchInput.addEventListener("input", () => {
          clearTimeout(searchTimeout);
          searchTimeout = setTimeout(() => {
            renderGifs(searchInput.value.trim());
          }, 350);
        });
      }
    }

    // Attach GIF Thumbnail Preview to Form with Instant Thumbnail Swap & Loading Shimmer
    function attachGifToForm(
      toolbar: HTMLElement,
      targetTextarea: HTMLTextAreaElement,
      gifUrl: string,
      previewUrl = ""
    ) {
      targetTextarea.dataset.attachedGif = gifUrl;
      const previewId = `${targetTextarea.id}-gif-preview`;
      const previewContainer = shadow.getElementById(previewId);
      if (!previewContainer) return;

      const fallbackThumb = previewUrl || gifUrl;
      previewContainer.className = "nyuzi-attached-gif-preview loading";
      previewContainer.style.display = "inline-block";

      previewContainer.innerHTML = `
        <img class="thumb-gif" src="${escapeHtml(fallbackThumb)}" alt="Preview GIF" />
        <img class="full-gif" src="${escapeHtml(gifUrl)}" alt="Attached GIF" />
        <span class="nyuzi-attached-gif-badge">
          <span class="nyuzi-spinner" style="width: 8px; height: 8px; border-width: 1.5px; border-color: rgba(255,255,255,0.3); border-top-color: #fff;"></span>
          <span>Attaching...</span>
        </span>
        <button type="button" class="nyuzi-attached-gif-remove" title="Remove GIF">✕</button>
      `;

      const fullImg = previewContainer.querySelector("img.full-gif") as HTMLImageElement | null;
      const badge = previewContainer.querySelector(".nyuzi-attached-gif-badge") as HTMLElement | null;

      function onFullGifLoaded() {
        if (!previewContainer) return;
        previewContainer.classList.remove("loading");
        previewContainer.classList.add("loaded");
        if (badge) {
          badge.style.opacity = "0";
          setTimeout(() => badge.remove(), 250);
        }
      }

      if (fullImg) {
        if (fullImg.complete && fullImg.naturalWidth > 0) {
          onFullGifLoaded();
        } else {
          fullImg.addEventListener("load", onFullGifLoaded, { once: true });
          fullImg.addEventListener("error", () => {
            if (badge) badge.remove();
            previewContainer.classList.remove("loading");
          }, { once: true });
        }
      }

      const removeBtn = previewContainer.querySelector(".nyuzi-attached-gif-remove");
      if (removeBtn) {
        removeBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          delete targetTextarea.dataset.attachedGif;
          previewContainer.className = "nyuzi-attached-gif-preview";
          previewContainer.innerHTML = "";
          previewContainer.style.display = "none";
        });
      }
    }

    // Formatting Toolbar Buttons
    shadow.querySelectorAll(".nyuzi-format-btn").forEach((btn) => {
      if (btn.getAttribute("data-action") === "emoji") {
        btn.addEventListener("mouseenter", prefetchEmojiPicker, { once: true });
      }

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const action = (e.currentTarget as HTMLElement).getAttribute("data-action");
        const toolbar = (e.currentTarget as HTMLElement).closest("[data-target]") as HTMLElement | null;
        const targetId = toolbar?.getAttribute("data-target");
        if (!action || !targetId) return;

        const targetTextarea = shadow.getElementById(targetId) as HTMLTextAreaElement | null;
        if (!targetTextarea) return;

        if (action === "emoji") {
          toggleEmojiPopover(toolbar as HTMLElement, targetTextarea);
          return;
        }

        if (action === "gif") {
          toggleGifPopover(toolbar as HTMLElement, targetTextarea);
          return;
        }

        applyFormatting(targetTextarea, action);
      });
    });

    // Predictive prefetch when user focuses any comment textarea
    shadow.querySelectorAll("textarea").forEach((textarea) => {
      textarea.addEventListener("focus", prefetchEmojiPicker, { once: true });
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

        let finalContent = contentInput ? contentInput.value.trim() : "";
        const attachedGif = contentInput?.dataset.attachedGif;
        if (attachedGif) {
          finalContent = finalContent ? `${finalContent}\n\n![GIF](${attachedGif})` : `![GIF](${attachedGif})`;
          if (contentInput) delete contentInput.dataset.attachedGif;
          const preview = shadow.getElementById("nyuzi-main-content-gif-preview");
          if (preview) {
            preview.innerHTML = "";
            preview.style.display = "none";
          }
        }

        if (!finalContent) {
          formError = "Please write a comment or attach a GIF.";
          render();
          return;
        }

        const cleanName = nameInput.value.trim();
        const cleanEmail = emailInput.value.trim() || null;
        saveAuthorInfo(cleanName, cleanEmail);

        submitComment(
          cleanName,
          cleanEmail,
          finalContent,
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

        let finalReply = replyContent ? replyContent.value.trim() : "";
        const attachedGif = replyContent?.dataset.attachedGif;
        if (attachedGif) {
          finalReply = finalReply ? `${finalReply}\n\n![GIF](${attachedGif})` : `![GIF](${attachedGif})`;
          if (replyContent) delete replyContent.dataset.attachedGif;
          const preview = shadow.getElementById(`reply-content-${parentId}-gif-preview`);
          if (preview) {
            preview.innerHTML = "";
            preview.style.display = "none";
          }
        }

        if (!finalReply) {
          alert("Please write a reply or attach a GIF.");
          return;
        }

        const cleanName = nameInput.value.trim();
        const cleanEmail = emailInput?.value.trim() || null;
        saveAuthorInfo(cleanName, cleanEmail);

        submitComment(cleanName, cleanEmail, finalReply, true, parentId);
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
        if (!textarea) return;

        let finalEdit = textarea.value.trim();
        const attachedGif = textarea.dataset.attachedGif;
        if (attachedGif) {
          finalEdit = finalEdit ? `${finalEdit}\n\n![GIF](${attachedGif})` : `![GIF](${attachedGif})`;
          delete textarea.dataset.attachedGif;
          const preview = shadow.getElementById(`edit-content-${id}-gif-preview`);
          if (preview) {
            preview.innerHTML = "";
            preview.style.display = "none";
          }
        }

        if (!finalEdit) {
          alert("Comment content cannot be empty.");
          return;
        }

        editComment(id, finalEdit);
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

  // Dynamic Host Theme Observer (#2)
  // Re-evaluates theme styles live if the host website toggles dark/light mode
  try {
    let themeDebounce: any = null;
    const handleHostThemeChange = () => {
      clearTimeout(themeDebounce);
      themeDebounce = setTimeout(() => {
        render();
      }, 50);
    };

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (
          m.type === "attributes" &&
          (m.attributeName === "class" ||
            m.attributeName === "data-theme" ||
            m.attributeName === "data-color-mode" ||
            m.attributeName === "data-bs-theme" ||
            m.attributeName === "style")
        ) {
          handleHostThemeChange();
          break;
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "data-color-mode", "data-bs-theme", "style"],
    });

    if (document.body) {
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["class", "data-theme", "data-color-mode", "data-bs-theme", "style"],
      });
    }

    if (typeof window !== "undefined" && window.matchMedia) {
      const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
      colorSchemeQuery.addEventListener("change", handleHostThemeChange);
    }
  } catch (err) {
    console.debug("[Nyuzi] Theme observer warning:", err);
  }

  // Dismiss emoji & GIF popovers on outside click or Escape
  document.addEventListener("click", (e) => {
    const path = e.composedPath();
    const isInside = path.some((el: any) =>
      el?.classList?.contains("nyuzi-emoji-popover") ||
      el?.classList?.contains("nyuzi-emoji-btn") ||
      el?.classList?.contains("nyuzi-gif-popover") ||
      el?.classList?.contains("nyuzi-gif-btn") ||
      el?.tagName?.toLowerCase() === "emoji-picker"
    );
    if (!isInside) {
      shadow.querySelectorAll(".nyuzi-emoji-popover, .nyuzi-gif-popover").forEach((p) => {
        (p as HTMLElement).style.display = "none";
      });
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      shadow.querySelectorAll(".nyuzi-emoji-popover, .nyuzi-gif-popover").forEach((p) => {
        (p as HTMLElement).style.display = "none";
      });
    }
  });

  // Initial load
  loadComments();
})();