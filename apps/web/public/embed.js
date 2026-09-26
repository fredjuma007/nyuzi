"use strict";(()=>{function X(e){let{accent:n,bg:i,cardBg:s,textColor:g,textSecondary:f,borderColor:b,inputBg:l,radius:v="0.75rem",themeMode:I,bgMode:x}=e;return`
    :host {
      --nyuzi-accent: ${n||"#f56220"};
      --nyuzi-accent-hover: color-mix(in srgb, var(--nyuzi-accent) 80%, black);
      --nyuzi-accent-soft: color-mix(in srgb, var(--nyuzi-accent) 12%, transparent);
      --nyuzi-accent-border: color-mix(in srgb, var(--nyuzi-accent) 30%, transparent);

      --nyuzi-bg: ${i||(x==="card"?"#f8fafc":"transparent")};
      --nyuzi-card-bg: ${s||"#ffffff"};
      --nyuzi-text-primary: ${g||"#0f172a"};
      --nyuzi-text-secondary: ${f||"#64748b"};
      --nyuzi-text-muted: #94a3b8;
      --nyuzi-border: ${b||"#e2e8f0"};
      --nyuzi-input-bg: ${l||"#f8fafc"};
      --nyuzi-thread-line: var(--nyuzi-border);
      --nyuzi-avatar-bg: var(--nyuzi-accent-soft);
      --nyuzi-avatar-text: var(--nyuzi-accent);
      --nyuzi-radius: ${v};

      display: block;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 15px;
      line-height: 1.5;
      color: var(--nyuzi-text-primary);
      background-color: var(--nyuzi-bg);
      box-sizing: border-box;
      max-width: 100%;
      border-radius: var(--nyuzi-radius);
    }

    ${I==="sepia"?`
      :host {
        --nyuzi-bg: ${i||(x==="card"?"#f4ead8":"transparent")};
        --nyuzi-card-bg: ${s||"#fbf3e4"};
        --nyuzi-text-primary: ${g||"#2b2118"};
        --nyuzi-text-secondary: ${f||"#6a5949"};
        --nyuzi-text-muted: #968370;
        --nyuzi-border: ${b||"#e2d4bc"};
        --nyuzi-input-bg: ${l||"#fbf7ef"};
        --nyuzi-thread-line: #e2d4bc;
        --nyuzi-avatar-bg: var(--nyuzi-accent-soft);
        --nyuzi-avatar-text: var(--nyuzi-accent);
      }
    `:""}

    ${I==="dark"?`
      :host {
        --nyuzi-bg: ${i||(x==="card"?"#090605":"transparent")};
        --nyuzi-card-bg: ${s||"#14100e"};
        --nyuzi-text-primary: ${g||"#f8fafc"};
        --nyuzi-text-secondary: ${f||"#94a3b8"};
        --nyuzi-text-muted: #64748b;
        --nyuzi-border: ${b||"#26201c"};
        --nyuzi-input-bg: ${l||"#1b1513"};
        --nyuzi-thread-line: #2e2621;
        --nyuzi-avatar-bg: var(--nyuzi-accent-soft);
        --nyuzi-avatar-text: var(--nyuzi-accent);
      }
    `:""}

    ${I==="auto"?`
      @media (prefers-color-scheme: dark) {
        :host {
          --nyuzi-bg: ${i||(x==="card"?"#090605":"transparent")};
          --nyuzi-card-bg: ${s||"#14100e"};
          --nyuzi-text-primary: ${g||"#f8fafc"};
          --nyuzi-text-secondary: ${f||"#94a3b8"};
          --nyuzi-text-muted: #64748b;
          --nyuzi-border: ${b||"#26201c"};
          --nyuzi-input-bg: ${l||"#1b1513"};
          --nyuzi-thread-line: #2e2621;
          --nyuzi-avatar-bg: var(--nyuzi-accent-soft);
          --nyuzi-avatar-text: var(--nyuzi-accent);
        }
      }
    `:""}

    *, *::before, *::after {
      box-sizing: inherit;
    }

    .nyuzi-container {
      padding: 0.75rem 0.5rem;
    }

    /* Top Expressive Reactions Bar (Hyvor Talk Style) */
    .nyuzi-reactions-bar {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1.25rem 1rem;
      margin-bottom: 1.5rem;
      background: var(--nyuzi-card-bg);
      border: 1px solid var(--nyuzi-border);
      border-radius: var(--nyuzi-radius);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
    }
    .nyuzi-reactions-prompt {
      font-size: 0.875rem;
      font-weight: 700;
      color: var(--nyuzi-text-primary);
      margin-bottom: 0.85rem;
    }
    .nyuzi-reactions-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.65rem;
      justify-content: center;
    }
    .nyuzi-reaction-pill {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      background: var(--nyuzi-input-bg);
      border: 1px solid var(--nyuzi-border);
      border-radius: 0.65rem;
      padding: 0.45rem 0.75rem;
      cursor: pointer;
      transition: all 0.15s ease;
      min-width: 62px;
      user-select: none;
    }
    .nyuzi-reaction-pill:hover {
      transform: translateY(-2px);
      border-color: var(--nyuzi-accent);
      background: var(--nyuzi-accent-soft);
      box-shadow: 0 3px 8px var(--nyuzi-accent-soft);
    }
    .nyuzi-reaction-pill.active {
      border-color: var(--nyuzi-accent);
      background: var(--nyuzi-accent-soft);
      box-shadow: 0 2px 6px var(--nyuzi-accent-soft);
    }
    .nyuzi-reaction-pill .emoji-row {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      font-size: 1rem;
    }
    .nyuzi-reaction-pill .reaction-count {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--nyuzi-text-primary);
    }
    .nyuzi-reaction-pill .reaction-label {
      font-size: 0.6875rem;
      font-weight: 600;
      text-transform: capitalize;
      color: var(--nyuzi-text-secondary);
      margin-top: 0.15rem;
    }

    /* Discussion Header */
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

    /* Main Comment Form */
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
      box-shadow: 0 0 0 3px var(--nyuzi-accent-soft);
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
      transition: border-color 0.15s;
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
      transition: background 0.15s, opacity 0.15s, transform 0.1s;
    }
    .nyuzi-submit-btn:hover {
      background: var(--nyuzi-accent-hover);
    }
    .nyuzi-submit-btn:active {
      transform: scale(0.98);
    }
    .nyuzi-submit-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    @media (max-width: 580px) {
      .nyuzi-form-row {
        flex-direction: column;
        align-items: stretch;
        gap: 0.65rem;
      }
      .nyuzi-inputs {
        flex-direction: column;
        width: 100%;
        min-width: 0;
        gap: 0.5rem;
      }
      .nyuzi-input {
        width: 100%;
      }
      .nyuzi-submit-btn {
        width: 100%;
        justify-content: center;
      }
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

    /* Card Mode Option (Boxed comments like Hyvor Talk) */
    ${x==="card"?`
      .nyuzi-comment {
        background: var(--nyuzi-card-bg);
        border: 1px solid var(--nyuzi-border);
        border-radius: var(--nyuzi-radius);
        padding: 1rem 1.15rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
      }
    `:""}

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
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.35rem;
    }
    .nyuzi-author {
      font-weight: 600;
      color: var(--nyuzi-text-primary);
      font-size: 0.9375rem;
    }
    .nyuzi-author-badge {
      display: inline-flex;
      align-items: center;
      font-size: 0.6875rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      background: var(--nyuzi-accent-soft);
      color: var(--nyuzi-accent);
      padding: 0.1rem 0.45rem;
      border-radius: 9999px;
      border: 1px solid var(--nyuzi-accent-border);
      line-height: 1.3;
    }
    .nyuzi-time {
      font-size: 0.75rem;
      color: var(--nyuzi-text-muted);
    }
    .nyuzi-content {
      color: var(--nyuzi-text-primary);
      font-size: 0.9375rem;
      word-break: break-word;
      line-height: 1.55;
    }
    .nyuzi-content blockquote {
      border-left: 3px solid var(--nyuzi-accent);
      padding: 0.25rem 0.75rem;
      margin: 0.45rem 0;
      color: var(--nyuzi-text-secondary);
      background: var(--nyuzi-accent-soft);
      border-radius: 0 4px 4px 0;
      font-style: italic;
    }
    .nyuzi-content code {
      background: var(--nyuzi-input-bg);
      border: 1px solid var(--nyuzi-border);
      padding: 0.1rem 0.35rem;
      border-radius: 4px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 0.85em;
      color: var(--nyuzi-text-primary);
    }
    .nyuzi-content a {
      color: var(--nyuzi-accent);
      text-decoration: underline;
      text-underline-offset: 2px;
      font-weight: 500;
    }
    .nyuzi-content a:hover {
      color: var(--nyuzi-accent-hover);
    }
    .nyuzi-content strong {
      font-weight: 700;
      color: var(--nyuzi-text-primary);
    }
    .nyuzi-content em {
      font-style: italic;
    }
    .nyuzi-edited-tag {
      font-size: 0.6875rem;
      color: var(--nyuzi-text-muted);
      font-style: italic;
      margin-left: 0.25rem;
      user-select: none;
    }

    /* Formatting Toolbar */
    .nyuzi-format-toolbar {
      display: flex;
      gap: 0.25rem;
      margin-bottom: 0.35rem;
      align-items: center;
    }
    .nyuzi-format-btn {
      background: none;
      border: 1px solid transparent;
      color: var(--nyuzi-text-secondary);
      width: 24px;
      height: 24px;
      border-radius: 4px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 0.8125rem;
      font-family: inherit;
      transition: all 0.15s ease;
      user-select: none;
    }
    .nyuzi-format-btn:hover {
      background: var(--nyuzi-accent-soft);
      color: var(--nyuzi-accent);
      border-color: var(--nyuzi-accent-border);
    }

    /* Inline Edit Form */
    .nyuzi-edit-box {
      margin-top: 0.35rem;
      background: var(--nyuzi-input-bg);
      border: 1px solid var(--nyuzi-border);
      border-radius: 0.5rem;
      padding: 0.65rem;
    }
    .nyuzi-edit-textarea {
      min-height: 65px;
      margin-top: 0.25rem;
    }
    .nyuzi-edit-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      margin-top: 0.5rem;
      align-items: center;
    }

    /* Delete Confirmation Pill */
    .nyuzi-confirm-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #991b1b;
      padding: 0.35rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.8125rem;
      margin-top: 0.35rem;
    }
    .nyuzi-confirm-delete-btn {
      background: #dc2626;
      color: #ffffff;
      border: none;
      padding: 0.2rem 0.65rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.15s;
    }
    .nyuzi-confirm-delete-btn:hover {
      background: #b91c1c;
    }
    .nyuzi-cancel-delete-btn {
      background: none;
      border: none;
      color: #4b5563;
      font-size: 0.75rem;
      cursor: pointer;
      text-decoration: underline;
    }

    /* Collapsible Replies */
    .nyuzi-replies-wrapper {
      margin-top: 0.75rem;
    }
    .nyuzi-collapse-btn {
      background: none;
      border: none;
      color: var(--nyuzi-text-secondary);
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.2rem 0.45rem;
      border-radius: 4px;
      transition: color 0.15s, background 0.15s;
      user-select: none;
      margin-bottom: 0.5rem;
    }
    .nyuzi-collapse-btn:hover {
      color: var(--nyuzi-accent);
      background: var(--nyuzi-accent-soft);
    }
    .nyuzi-collapse-chevron {
      transition: transform 0.2s ease;
    }
    .nyuzi-collapse-chevron.collapsed {
      transform: rotate(-90deg);
    }

    /* Actions */
    .nyuzi-actions {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      align-items: center;
      margin-top: 0.5rem;
    }
    .nyuzi-action-btn {
      background: none;
      border: 1px solid transparent;
      color: var(--nyuzi-text-secondary);
      font-size: 0.8125rem;
      font-weight: 500;
      cursor: pointer;
      padding: 0.2rem 0.55rem;
      border-radius: 9999px;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      transition: all 0.15s ease;
    }
    .nyuzi-action-btn:hover {
      color: var(--nyuzi-accent);
      background: var(--nyuzi-accent-soft);
    }
    .nyuzi-action-btn svg {
      flex-shrink: 0;
      transition: transform 0.15s, stroke 0.15s, fill 0.15s;
    }
    .nyuzi-action-btn:hover svg {
      transform: scale(1.15);
      stroke: var(--nyuzi-accent);
    }
    .nyuzi-action-btn.upvoted {
      color: var(--nyuzi-accent);
      font-weight: 700;
      background: var(--nyuzi-accent-soft);
      border-color: var(--nyuzi-accent-border);
    }
    .nyuzi-action-btn.upvoted svg {
      fill: var(--nyuzi-accent);
      stroke: var(--nyuzi-accent);
      animation: nyuzi-pop 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    @keyframes nyuzi-pop {
      0% { transform: scale(1); }
      40% { transform: scale(1.35); }
      100% { transform: scale(1); }
    }
    .nyuzi-highlight {
      animation: nyuzi-pulse-glow 1.5s ease-out 2;
      border-left: 3px solid var(--nyuzi-accent) !important;
      border-radius: var(--nyuzi-radius);
      padding: 0.25rem 0.5rem;
    }
    @keyframes nyuzi-pulse-glow {
      0% { box-shadow: 0 0 0 0 var(--nyuzi-accent); }
      50% { box-shadow: 0 0 0 8px var(--nyuzi-accent-soft); }
      100% { box-shadow: 0 0 0 0 transparent; }
    }

    /* Nested Replies */
    .nyuzi-replies {
      margin-top: 0.5rem;
      padding-left: 1.25rem;
      border-left: 2px solid var(--nyuzi-thread-line);
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    /* Reply Form Box */
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

    /* Pagination */
    .nyuzi-pagination {
      margin-top: 1.5rem;
      display: flex;
      justify-content: center;
    }
    .nyuzi-load-more-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      background: var(--nyuzi-card-bg);
      border: 1px solid var(--nyuzi-border);
      color: var(--nyuzi-text-primary);
      padding: 0.65rem 1.35rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      transition: all 0.15s ease;
    }
    .nyuzi-load-more-btn:hover:not(:disabled) {
      border-color: var(--nyuzi-accent);
      color: var(--nyuzi-accent);
      background: var(--nyuzi-accent-soft);
      transform: translateY(-1px);
      box-shadow: 0 3px 8px var(--nyuzi-accent-soft);
    }
    .nyuzi-load-more-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .nyuzi-spinner {
      width: 14px;
      height: 14px;
      border: 2px solid var(--nyuzi-border);
      border-top-color: var(--nyuzi-accent);
      border-radius: 50%;
      animation: nyuzi-spin 0.6s linear infinite;
    }
    @keyframes nyuzi-spin {
      to { transform: rotate(360deg); }
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
    .nyuzi-bolt-icon {
      width: 13px;
      height: 13px;
      flex-shrink: 0;
      filter: drop-shadow(0 0 4px rgba(250, 204, 21, 0.45));
      transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.2s;
    }
    .nyuzi-brand:hover .nyuzi-bolt-icon {
      transform: scale(1.3) rotate(-8deg);
      filter: drop-shadow(0 0 8px rgba(250, 204, 21, 0.9));
    }
  `}function w(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function ge(e){let n=e.trim().split(/\s+/);return n.length===1?n[0].slice(0,2).toUpperCase():(n[0][0]+n[n.length-1][0]).toUpperCase()}function be(e){try{let n=new Date(e),s=Math.floor((new Date().getTime()-n.getTime())/1e3);return s<60?"just now":s<3600?`${Math.floor(s/60)}m ago`:s<86400?`${Math.floor(s/3600)}h ago`:s<604800?`${Math.floor(s/86400)}d ago`:n.toLocaleDateString(void 0,{month:"short",day:"numeric"})}catch{return"recently"}}function fe(e){if(!e)return"";let n=w(e);n=n.replace(/`([^`\n]+)`/g,"<code>$1</code>"),n=n.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>"),n=n.replace(/(^|[^*])\*([^*]+)\*([^*]|$)/g,"$1<em>$2</em>$3"),n=n.replace(/\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');let i=n.split(`
`),s=[],g=!1,f=[];for(let b of i)b.startsWith("&gt; ")||b==="&gt;"?(g=!0,f.push(b.replace(/^&gt; ?/,""))):(g&&(s.push(`<blockquote>${f.join("<br/>")}</blockquote>`),f=[],g=!1),s.push(b));return g&&s.push(`<blockquote>${f.join("<br/>")}</blockquote>`),s.join(`
`).replace(/(<\/blockquote>)\n+/g,"$1").replace(/\n+(<blockquote>)/g,"$1").replace(/\n/g,"<br/>")}function ze(e,n){return e==="upvote"?`<svg class="nyuzi-reaction-icon" viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" fill="${n?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`:e==="like"?`<svg class="nyuzi-reaction-icon nyuzi-like-icon" viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2" fill="${n?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12M15 10.5a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3v2.5M7 10l5-6v5h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7"/><path d="M7 10H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"/></svg>`:`<svg class="nyuzi-reaction-icon nyuzi-heart-icon" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="${n?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>`}function he(){return'<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>'}function ve(){return'<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'}function xe(){return'<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>'}function ke(){return'<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>'}function we(e,n){return e.upvotes>0?`${e.upvotes}`:n==="upvote"?"Upvote":"Like"}function $e(e,n){if(!e)return!1;let i=e.trim().toLowerCase();return n&&i===n.trim().toLowerCase()?!0:i.includes("fred juma")||i.includes("brenda frenjo")||i.includes("sumeiya juma")}function O(e){return`
    <div class="nyuzi-format-toolbar" data-target="${e}">
      <button type="button" class="nyuzi-format-btn" data-action="bold" title="Bold (**text**)">
        <strong>B</strong>
      </button>
      <button type="button" class="nyuzi-format-btn" data-action="italic" title="Italic (*text*)">
        <em>I</em>
      </button>
      <button type="button" class="nyuzi-format-btn" data-action="quote" title="Quote (> text)">
        &ldquo;
      </button>
      <button type="button" class="nyuzi-format-btn" data-action="code" title="Inline Code (\`code\`)">
        &lt;/&gt;
      </button>
      <button type="button" class="nyuzi-format-btn" data-action="link" title="Link ([text](url))">
        <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
      </button>
    </div>
  `}function ee(e){return`
    <div class="nyuzi-reactions-bar">
      <div class="nyuzi-reactions-prompt">How was this discussion?</div>
      <div class="nyuzi-reactions-grid">
        ${[{key:"fire",emoji:"\u{1F525}",label:"Superb",count:18},{key:"heart",emoji:"\u2764\uFE0F",label:"Love",count:24},{key:"lightbulb",emoji:"\u{1F4A1}",label:"Insight",count:12},{key:"laugh",emoji:"\u{1F602}",label:"Laugh",count:7},{key:"clap",emoji:"\u{1F44F}",label:"Applause",count:15}].map(i=>`
          <div class="nyuzi-reaction-pill ${e===i.key?"active":""}" data-reaction-key="${i.key}">
            <div class="emoji-row">
              <span>${i.emoji}</span>
              <span class="reaction-count">${i.count+(e===i.key?1:0)}</span>
            </div>
            <span class="reaction-label">${i.label}</span>
          </div>
        `).join("")}
      </div>
    </div>
  `}function _(e,n,i){let s=n.filter(y=>y.parentId===e.id);s.sort((y,k)=>new Date(y.createdAt).getTime()-new Date(k.createdAt).getTime());let g=i.activeReplyId===e.id,f=i.editingCommentId===e.id,b=i.confirmDeleteId===e.id,l=i.collapsedComments.has(e.id),v=i.upvotedComments.has(e.id),I=i.myComments.has(e.id),x=e.isAuthor??$e(e.authorName,i.postAuthor);return`
    <div class="nyuzi-comment" id="comment-${e.id}">
      <div class="nyuzi-avatar">${w(ge(e.authorName))}</div>
      <div class="nyuzi-body">
        <div class="nyuzi-meta">
          <span class="nyuzi-author">${w(e.authorName)}</span>
          ${x?'<span class="nyuzi-author-badge">Author</span>':""}
          <span class="nyuzi-time">${be(e.createdAt)}</span>
          ${e.isEdited?'<span class="nyuzi-edited-tag" title="Edited by reader">(edited)</span>':""}
        </div>

        ${f?`
            <div class="nyuzi-edit-box">
              ${O(`edit-content-${e.id}`)}
              <textarea class="nyuzi-textarea nyuzi-edit-textarea" id="edit-content-${e.id}" rows="3" maxlength="2000">${w(e.content)}</textarea>
              <div class="nyuzi-edit-actions">
                <button class="nyuzi-action-btn cancel-edit" data-id="${e.id}">Cancel</button>
                <button class="nyuzi-submit-btn save-edit" data-id="${e.id}" ${i.isSubmitting?"disabled":""}>
                  ${i.isSubmitting?"Saving...":"Save Changes"}
                </button>
              </div>
            </div>
          `:b?`
            <div class="nyuzi-confirm-pill">
              <span>Delete this comment?</span>
              <button class="nyuzi-confirm-delete-btn" data-id="${e.id}" ${i.isSubmitting?"disabled":""}>
                ${i.isSubmitting?"Deleting...":"Yes, Delete"}
              </button>
              <button class="nyuzi-cancel-delete-btn" data-id="${e.id}">Cancel</button>
            </div>
          `:`<div class="nyuzi-content">${fe(e.content)}</div>`}

        ${!f&&!b?`
          <div class="nyuzi-actions">
            <button class="nyuzi-action-btn upvote-btn ${v?"upvoted":""}" data-id="${e.id}" title="${v?"Unlike":"Like"}">
              ${ze(i.reactionType,v)}
              <span>${we(e,i.reactionType)}</span>
            </button>
            <button class="nyuzi-action-btn reply-trigger" data-id="${e.id}">
              ${he()}
              <span>Reply</span>
            </button>
            <button class="nyuzi-action-btn copy-link-btn" data-id="${e.id}" title="Copy direct link to this comment">
              ${ve()}
              <span>Copy Link</span>
            </button>
            ${I?`
              <button class="nyuzi-action-btn edit-trigger" data-id="${e.id}" title="Edit your comment (15m grace window)">
                ${xe()}
                <span>Edit</span>
              </button>
              <button class="nyuzi-action-btn delete-trigger" data-id="${e.id}" title="Delete your comment">
                ${ke()}
                <span>Delete</span>
              </button>
            `:""}
          </div>
        `:""}

        ${g?`
            <div class="nyuzi-reply-box">
              ${O(`reply-content-${e.id}`)}
              <textarea class="nyuzi-textarea" id="reply-content-${e.id}" placeholder="Reply to ${w(e.authorName)}..." maxlength="2000" required></textarea>
              <div class="nyuzi-form-row">
                <div class="nyuzi-inputs">
                  <input type="text" class="nyuzi-input" id="reply-name-${e.id}" placeholder="Your Name *" value="${w(i.savedAuthorName)}" required />
                  <input type="email" class="nyuzi-input" id="reply-email-${e.id}" placeholder="Email (for reply alerts)" value="${w(i.savedAuthorEmail)}" />
                </div>
                <div style="display:flex; gap:0.5rem; align-items:flex-end;">
                  <button class="nyuzi-action-btn cancel-reply" style="padding: 0.5rem 0.75rem;">Cancel</button>
                  <button class="nyuzi-submit-btn submit-reply" data-parent-id="${e.id}" ${i.isSubmitting?"disabled":""}>
                    ${i.isSubmitting?"Posting...":"Reply"}
                  </button>
                </div>
              </div>
            </div>
          `:""}

        ${s.length>0?`
          <div class="nyuzi-replies-wrapper">
            <button class="nyuzi-collapse-btn" data-id="${e.id}" title="${l?"Expand replies":"Collapse replies"}">
              <svg class="nyuzi-collapse-chevron ${l?"collapsed":""}" viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              <span>${l?`Show ${s.length} ${s.length===1?"reply":"replies"}`:`Hide ${s.length} ${s.length===1?"reply":"replies"}`}</span>
            </button>
            ${l?"":`
              <div class="nyuzi-replies">
                ${s.map(y=>_(y,n,i)).join("")}
              </div>
            `}
          </div>
        `:""}
      </div>
    </div>
  `}async function J(e,n,i,s,g,f){let b=f?`&highlight=${encodeURIComponent(f)}`:"",l=`${e}/api/v1/comments?siteId=${encodeURIComponent(n)}&threadUrl=${encodeURIComponent(i)}&page=${s}&limit=${g}${b}`,v=await fetch(l);if(!v.ok)throw new Error(`HTTP ${v.status}`);return v.json()}async function te(e,n){let i=await fetch(`${e}/api/v1/comments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});if(!i.ok){let s=await i.json().catch(()=>({}));throw new Error(s.error||`HTTP ${i.status}`)}return i.json()}async function ne(e,n,i){let s=await fetch(`${e}/api/v1/comments/${encodeURIComponent(n)}/upvote`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:i})});if(!s.ok)throw new Error("Vote action failed");return s.json()}async function re(e,n,i){let s=await fetch(`${e}/api/v1/comments/${encodeURIComponent(n)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:i})});if(!s.ok){let g=await s.json().catch(()=>({}));throw new Error(g.error||`HTTP ${s.status}`)}return s.json()}async function ie(e,n){let i=await fetch(`${e}/api/v1/comments/${encodeURIComponent(n)}`,{method:"DELETE"});if(!i.ok)throw new Error("Delete action failed");return i.json()}(function(){let e=document.currentScript,n=document.getElementById("nyuzi-comments");if(n||(n=document.querySelector("nyuzi-comments")),!n){console.warn("[Nyuzi] No container found (#nyuzi-comments or <nyuzi-comments>).");return}let i=e?.getAttribute("data-site-id")||n.getAttribute("data-site-id")||document.querySelector("[data-nyuzi-site-id]")?.getAttribute("data-nyuzi-site-id")||"",s=e?.getAttribute("data-api")||n.getAttribute("data-api")||"https://nyuzi-api.fredjuma8.workers.dev",g=e?.getAttribute("data-mock")==="true"||n.getAttribute("data-mock")==="true",f=e?.getAttribute("data-reactions-bar")==="true"||n.getAttribute("data-reactions-bar")==="true",b={accent:e?.getAttribute("data-accent-color")||n.getAttribute("data-accent-color")||"#f56220",bg:e?.getAttribute("data-bg-color")||n.getAttribute("data-bg-color")||"",cardBg:e?.getAttribute("data-card-bg")||n.getAttribute("data-card-bg")||"",textColor:e?.getAttribute("data-text-color")||n.getAttribute("data-text-color")||"",textSecondary:e?.getAttribute("data-text-secondary")||n.getAttribute("data-text-secondary")||"",borderColor:e?.getAttribute("data-border-color")||n.getAttribute("data-border-color")||"",inputBg:e?.getAttribute("data-input-bg")||n.getAttribute("data-input-bg")||"",radius:e?.getAttribute("data-radius")||n.getAttribute("data-radius")||"0.75rem",reactionType:e?.getAttribute("data-reaction")||n.getAttribute("data-reaction")||"like",themeMode:e?.getAttribute("data-theme")||n.getAttribute("data-theme")||"auto",bgMode:e?.getAttribute("data-bg")||n.getAttribute("data-bg")||"transparent",showReactionsBar:f},l=n.shadowRoot||n.attachShadow({mode:"open"});l.innerHTML="";let v=e?.getAttribute("data-thread-url")||n.getAttribute("data-thread-url")||window.location.href.split("#")[0],I=e?.getAttribute("data-thread-title")||n.getAttribute("data-thread-title")||document.title||"Discussion",x=e?.getAttribute("data-author-name")||n.getAttribute("data-author-name")||"",y=[],k=0,A=0,U=1,Y=15,R=!1,j=!1,H=!0,E=null,C=null,M=null,T=null,h=!1,F=null,S=new Set,B=new Set,N="nyuzi_reader_ownership",oe=900*1e3;function W(t){try{let r=localStorage.getItem(N),d=r?JSON.parse(r):{};d[t]=Date.now()+oe,localStorage.setItem(N,JSON.stringify(d))}catch{}}function V(t){try{let r=localStorage.getItem(N);if(r){let d=JSON.parse(r);delete d[t],localStorage.setItem(N,JSON.stringify(d))}}catch{}}function ae(){let t=new Set;try{let r=localStorage.getItem(N);if(r){let d=JSON.parse(r),u=Date.now();for(let[p,o]of Object.entries(d))u<o&&t.add(p)}}catch{}return g&&t.add("mock-3"),t}try{let t=sessionStorage.getItem("nyuzi_upvotes");t&&JSON.parse(t).forEach(r=>S.add(r))}catch{}let q="",D="";try{q=localStorage.getItem("nyuzi_author_name")||"",D=localStorage.getItem("nyuzi_author_email")||""}catch{}function G(t,r){t&&(q=t),r&&(D=r);try{t&&localStorage.setItem("nyuzi_author_name",t),r&&localStorage.setItem("nyuzi_author_email",r)}catch{}}function se(){return[{id:"mock-1",parentId:null,authorName:x||"Fred Juma",authorEmail:"fredjuma8@gmail.com",content:`Welcome to our literary salon! **The Reading Circle** invites your reflections on this essay:

> "A reader lives a thousand lives before he dies. The man who never reads lives only one."

Feel free to share your thoughts, quote your favorite passages, or reply to fellow readers below.`,status:"approved",upvotes:14,createdAt:new Date(Date.now()-36e5*2).toISOString(),isAuthor:!0},{id:"mock-2",parentId:"mock-1",authorName:"Brenda Frenjo",authorEmail:"readingcircle254@gmail.com",content:"The second chapter in particular felt so poignant. The pacing and character progression really resonated with what we discussed during Sunday's book circle session!",status:"approved",upvotes:8,createdAt:new Date(Date.now()-36e5).toISOString(),isAuthor:!0},{id:"mock-3",parentId:null,authorName:"Amina Odhiambo",authorEmail:"amina@example.com",content:"Reading this made me pause and reflect on how we consume stories in the digital age. Check out this related discussion on [Bookish Perspectives](https://readingcircle254.com/blog)!",status:"approved",upvotes:5,createdAt:new Date(Date.now()-18e5).toISOString()}]}function Q(){let t=window.location.hash;t&&t.startsWith("#comment-")&&setTimeout(()=>{let r=l.querySelector(t);r&&(r.scrollIntoView({behavior:"smooth",block:"center"}),r.classList.add("nyuzi-highlight"),setTimeout(()=>r.classList.remove("nyuzi-highlight"),3500))},200)}async function le(){if(g){y=se(),k=y.length,A=y.filter(t=>!t.parentId).length,H=!1,m();return}try{H=!0,U=1,m();let t=window.location.hash,r=t&&t.startsWith("#comment-")?t.replace("#comment-",""):"",d=await J(s,i,v,1,Y,r);y=d.comments||[],k=d.total||(d.pagination?.totalComments??y.length),A=d.pagination?.totalTopLevel??y.filter(u=>!u.parentId).length,R=d.pagination?.hasMore??!1,H=!1,m(),Q()}catch(t){console.error("[Nyuzi] Failed to load comments:",t),H=!1,E="Unable to connect to comments server.",m()}}async function ce(){if(!(j||!R||g))try{j=!0,m();let t=U+1,r=await J(s,i,v,t,Y),d=r.comments||[],u=new Set(y.map(p=>p.id));for(let p of d)u.has(p.id)||y.push(p);U=t,R=r.pagination?.hasMore??!1,A=r.pagination?.totalTopLevel??A,k=r.pagination?.totalComments??k,j=!1,m()}catch(t){console.error("[Nyuzi] Error loading more comments:",t),j=!1,m()}}async function ue(t){let r=S.has(t),d=r?"unvote":"upvote",u=y.find(p=>p.id===t);r?(S.delete(t),u&&(u.upvotes=Math.max(0,(u.upvotes||1)-1))):(S.add(t),u&&(u.upvotes=(u.upvotes||0)+1));try{sessionStorage.setItem("nyuzi_upvotes",JSON.stringify(Array.from(S)))}catch{}if(m(),!g)try{let p=await ne(s,t,d);u&&typeof p.upvotes=="number"&&(u.upvotes=p.upvotes,m())}catch{r?(S.add(t),u&&(u.upvotes=(u.upvotes||0)+1)):(S.delete(t),u&&(u.upvotes=Math.max(0,(u.upvotes||1)-1))),m()}}async function Z(t,r,d,u,p=null){if(!(!t.trim()||!d.trim()))try{if(h=!0,E=null,m(),g){let c={id:`mock-${Date.now()}`,parentId:p,authorName:t.trim(),authorEmail:r,content:d.trim(),status:"approved",upvotes:0,createdAt:new Date().toISOString()};W(c.id),p?y.push(c):(y.unshift(c),A+=1),k+=1,C=null,h=!1,m();return}let o=await te(s,{siteId:i,threadUrl:v,threadTitle:I,postAuthor:x,parentId:p,authorName:t,authorEmail:r,content:d,notifyOnReply:u});o.comment&&(W(o.comment.id),p?y.push(o.comment):(y.unshift(o.comment),A+=1),k+=1,C=null),h=!1,m()}catch(o){E=o.message||"Failed to post comment. Please try again.",h=!1,m()}}async function de(t,r){if(r.trim())try{if(h=!0,m(),g){let u=y.find(p=>p.id===t);u&&(u.content=r.trim(),u.isEdited=!0),M=null,h=!1,m();return}await re(s,t,r.trim());let d=y.find(u=>u.id===t);d&&(d.content=r.trim(),d.isEdited=!0),M=null,h=!1,m()}catch(d){alert(d.message||"Failed to edit comment."),h=!1,m()}}async function me(t){try{if(h=!0,m(),g){y=y.filter(r=>r.id!==t&&r.parentId!==t),k=y.length,A=y.filter(r=>!r.parentId).length,V(t),T=null,h=!1,m();return}await ie(s,t),y=y.filter(r=>r.id!==t&&r.parentId!==t),k=y.length,A=y.filter(r=>!r.parentId).length,V(t),T=null,h=!1,m()}catch{alert("Failed to delete comment. Please try again."),T=null,h=!1,m()}}function ye(t,r){let d=t.selectionStart,u=t.selectionEnd,p=t.value,o=p.substring(d,u),c="",a=0;switch(r){case"bold":c=o?`**${o}**`:"**bold text**",a=o?c.length:2;break;case"italic":c=o?`*${o}*`:"*italic text*",a=o?c.length:1;break;case"quote":o?c=o.split(`
`).map($=>`> ${$}`).join(`
`):c="> quote text",a=c.length;break;case"code":c=o?`\`${o}\``:"`code`",a=o?c.length:1;break;case"link":c=o?`[${o}](https://)`:"[link title](https://example.com)",a=c.length-1;break;default:return}t.value=p.substring(0,d)+c+p.substring(u),t.focus();let z=d+a;t.setSelectionRange(z,z),t.dispatchEvent(new Event("input",{bubbles:!0}))}function m(){let t=y.filter(u=>!u.parentId),r=X(b),d=ae();l.innerHTML=`
      <style>${r}</style>
      <div class="nyuzi-container">
        ${b.showReactionsBar?ee(F):""}

        <!-- Header -->
        <div class="nyuzi-header">
          <h3 class="nyuzi-title">
            Discussion
            <span class="nyuzi-badge">${k}</span>
          </h3>
        </div>

        <!-- Main Form -->
        <div class="nyuzi-form">
          ${E?`<div class="nyuzi-alert">
                   <span>\u26A0\uFE0F ${w(E)}</span>
                   <button class="nyuzi-action-btn" id="dismiss-error" style="color:#b91c1c;">\u2715</button>
                 </div>`:""}

          ${O("nyuzi-main-content")}
          <textarea class="nyuzi-textarea" id="nyuzi-main-content" maxlength="2000" placeholder="Share your thoughts or leave a question..." required></textarea>
          <div class="nyuzi-counter-row">
            <span id="nyuzi-char-count">0 / 2,000</span>
          </div>

          <div class="nyuzi-form-row">
            <div class="nyuzi-inputs">
              <input type="text" class="nyuzi-input" id="nyuzi-main-name" placeholder="Name *" value="${w(q)}" required />
              <input type="email" class="nyuzi-input" id="nyuzi-main-email" placeholder="Email (for reply alerts)" value="${w(D)}" />
            </div>
            <button class="nyuzi-submit-btn" id="nyuzi-main-submit" ${h?"disabled":""}>
              ${h?"Posting...":"Post Comment"}
            </button>
          </div>

          <label class="nyuzi-optin" id="nyuzi-optin-wrapper">
            <input type="checkbox" id="nyuzi-main-notify" checked />
            <span>Notify me via email when someone replies</span>
          </label>
        </div>

        <!-- Comments Stream -->
        ${H?`<div class="nyuzi-skeleton">
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
               </div>`:t.length===0?`<div class="nyuzi-empty">
                 <p style="font-size:1.1rem; margin:0 0 0.25rem 0; font-weight:600; color:var(--nyuzi-text-primary);">No comments yet</p>
                 <p style="margin:0; font-size:0.875rem;">Be the first to share your thoughts!</p>
               </div>`:`<div class="nyuzi-list">
                 ${t.map(u=>_(u,y,{postAuthor:x,reactionType:b.reactionType,upvotedComments:S,activeReplyId:C,editingCommentId:M,confirmDeleteId:T,collapsedComments:B,myComments:d,isSubmitting:h,savedAuthorName:q,savedAuthorEmail:D})).join("")}
               </div>
               ${R?`<div class="nyuzi-pagination">
                        <button class="nyuzi-load-more-btn" id="nyuzi-load-more" ${j?"disabled":""}>
                          ${j?'<span class="nyuzi-spinner"></span> Loading comments...':`Load more comments (${Math.max(0,A-t.length)} remaining) \u2193`}
                        </button>
                      </div>`:""}`}

        <!-- Footer -->
        <div class="nyuzi-footer">
          <a href="https://nyuzi-yap.vercel.app/" target="_blank" rel="noreferrer" class="nyuzi-brand" title="NyuziYap \u2014 Privacy-first, edge-powered comments">
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
    `,pe()}function pe(){l.querySelectorAll(".nyuzi-reaction-pill").forEach(o=>{o.addEventListener("click",c=>{let a=c.currentTarget.getAttribute("data-reaction-key");F=F===a?null:a,m()})}),l.querySelectorAll(".nyuzi-format-btn").forEach(o=>{o.addEventListener("click",c=>{c.preventDefault();let a=c.currentTarget.getAttribute("data-action"),$=c.currentTarget.closest(".nyuzi-format-toolbar")?.getAttribute("data-target");if(!a||!$)return;let L=l.getElementById($);L&&ye(L,a)})});let t=l.getElementById("nyuzi-main-content"),r=l.getElementById("nyuzi-char-count");t&&r&&t.addEventListener("input",()=>{r.textContent=`${t.value.length} / 2,000`});let d=l.getElementById("dismiss-error");d&&d.addEventListener("click",()=>{E=null,m()});let u=l.getElementById("nyuzi-main-submit");u&&u.addEventListener("click",()=>{let o=l.getElementById("nyuzi-main-name"),c=l.getElementById("nyuzi-main-email"),a=l.getElementById("nyuzi-main-notify");if(!o.value.trim()){E="Please enter your name.",m();return}if(!t||!t.value.trim()){E="Comment content cannot be empty.",m();return}let z=o.value.trim(),$=c.value.trim()||null;G(z,$),Z(z,$,t.value.trim(),a?a.checked:!0,null)});let p=l.getElementById("nyuzi-load-more");p&&p.addEventListener("click",()=>{ce()}),l.querySelectorAll(".upvote-btn").forEach(o=>{o.addEventListener("click",c=>{let a=c.currentTarget.getAttribute("data-id");a&&ue(a)})}),l.querySelectorAll(".reply-trigger").forEach(o=>{o.addEventListener("click",c=>{let a=c.currentTarget.getAttribute("data-id");C=C===a?null:a,M=null,T=null,m()})}),l.querySelectorAll(".cancel-reply").forEach(o=>{o.addEventListener("click",()=>{C=null,m()})}),l.querySelectorAll(".submit-reply").forEach(o=>{o.addEventListener("click",c=>{let a=c.currentTarget.getAttribute("data-parent-id");if(!a)return;let z=l.getElementById(`reply-name-${a}`),$=l.getElementById(`reply-email-${a}`),L=l.getElementById(`reply-content-${a}`);if(!z.value.trim()){alert("Please enter your name.");return}if(!L||!L.value.trim()){alert("Reply content cannot be empty.");return}let P=z.value.trim(),K=$?.value.trim()||null;G(P,K),Z(P,K,L.value.trim(),!0,a)})}),l.querySelectorAll(".edit-trigger").forEach(o=>{o.addEventListener("click",c=>{M=c.currentTarget.getAttribute("data-id"),C=null,T=null,m()})}),l.querySelectorAll(".cancel-edit").forEach(o=>{o.addEventListener("click",()=>{M=null,m()})}),l.querySelectorAll(".save-edit").forEach(o=>{o.addEventListener("click",c=>{let a=c.currentTarget.getAttribute("data-id");if(!a)return;let z=l.getElementById(`edit-content-${a}`);if(!z||!z.value.trim()){alert("Comment content cannot be empty.");return}de(a,z.value.trim())})}),l.querySelectorAll(".delete-trigger").forEach(o=>{o.addEventListener("click",c=>{T=c.currentTarget.getAttribute("data-id"),C=null,M=null,m()})}),l.querySelectorAll(".nyuzi-cancel-delete-btn").forEach(o=>{o.addEventListener("click",()=>{T=null,m()})}),l.querySelectorAll(".nyuzi-confirm-delete-btn").forEach(o=>{o.addEventListener("click",c=>{let a=c.currentTarget.getAttribute("data-id");a&&me(a)})}),l.querySelectorAll(".nyuzi-collapse-btn").forEach(o=>{o.addEventListener("click",c=>{let a=c.currentTarget.getAttribute("data-id");a&&(B.has(a)?B.delete(a):B.add(a),m())})}),l.querySelectorAll(".copy-link-btn").forEach(o=>{o.addEventListener("click",async c=>{let a=c.currentTarget,z=a.getAttribute("data-id");if(!z)return;let L=`${window.location.href.split("#")[0]}#comment-${z}`;try{await navigator.clipboard.writeText(L);let P=a.innerHTML;a.innerHTML="\u2713 Copied!",a.style.color="var(--nyuzi-accent)",setTimeout(()=>{a.innerHTML=P,a.style.color=""},2e3)}catch{window.location.hash=`comment-${z}`}})})}window.addEventListener("hashchange",Q),le()})();})();
//# sourceMappingURL=embed.js.map