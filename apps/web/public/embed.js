"use strict";(()=>{function It(e){if(!e||typeof e!="string"||!e.startsWith("#"))return!1;let o=e.replace("#","");if(o.length!==6&&o.length!==3)return!1;let t=parseInt(o.length===3?o[0]+o[0]:o.slice(0,2),16),l=parseInt(o.length===3?o[1]+o[1]:o.slice(2,4),16),k=parseInt(o.length===3?o[2]+o[2]:o.slice(4,6),16);return(t*299+l*587+k*114)/1e3>155}function mt(e){let{accent:o,bg:t,cardBg:l,textColor:k,textSecondary:f,borderColor:A,inputBg:z,radius:w="0.75rem",themeMode:q,bgMode:U,resolvedTheme:S=q==="auto"?"dark":q,isCardIsolated:D=!1}=e,h=S||"dark",T=It(l);return`
    :host {
      --nyuzi-accent: ${o||"#f56220"};
      --nyuzi-accent-hover: color-mix(in srgb, var(--nyuzi-accent) 80%, black);
      --nyuzi-accent-soft: color-mix(in srgb, var(--nyuzi-accent) 12%, transparent);
      --nyuzi-accent-border: color-mix(in srgb, var(--nyuzi-accent) 30%, transparent);

      --nyuzi-bg: ${D?h==="light"?"#ffffff":"#090605":t||(U==="card"?h==="dark"?"#090605":"#f8fafc":"transparent")};
      --nyuzi-card-bg: ${l||(h==="dark"?"#14100e":h==="sepia"?"#fbf3e4":"#ffffff")};
      --nyuzi-text-primary: ${k||(h==="dark"?T?"#0f172a":"#f8fafc":h==="sepia"?"#2b2118":"#0f172a")};
      --nyuzi-text-secondary: ${f||(h==="dark"?T?"#475569":"#cbd5e1":h==="sepia"?"#6a5949":"#475569")};
      --nyuzi-text-muted: ${h==="sepia"?"#968370":"#94a3b8"};
      --nyuzi-border: ${A||(h==="dark"?T?"#e2e8f0":"rgba(255, 255, 255, 0.12)":h==="sepia"?"#e2d4bc":"#e2e8f0")};
      --nyuzi-input-bg: ${z||(h==="dark"?T?"#ffffff":"#181412":h==="sepia"?"#fbf7ef":"#f8fafc")};
      --nyuzi-reaction-bg: ${h==="dark"?T?"#ffffff":"rgba(255, 255, 255, 0.05)":h==="sepia"?"#fbf7ef":"#ffffff"};
      --nyuzi-reaction-border: ${h==="dark"?T?"#e2e8f0":"rgba(255, 255, 255, 0.1)":h==="sepia"?"#e2d4bc":"#e2e8f0"};
      --nyuzi-badge-bg: ${h==="dark"?T?"#f1f5f9":"rgba(255, 255, 255, 0.08)":h==="sepia"?"#ece0cd":"#f1f5f9"};
      --nyuzi-badge-border: ${h==="dark"?T?"#e2e8f0":"rgba(255, 255, 255, 0.12)":h==="sepia"?"#e2d4bc":"#e2e8f0"};
      --nyuzi-thread-line: ${h==="dark"?T?"#e2e8f0":"rgba(255, 255, 255, 0.12)":h==="sepia"?"#e2d4bc":"#e2e8f0"};
      --nyuzi-avatar-bg: var(--nyuzi-accent-soft);
      --nyuzi-avatar-text: var(--nyuzi-accent);
      --nyuzi-radius: ${w};

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



    *, *::before, *::after {
      box-sizing: inherit;
    }

    .nyuzi-container {
      padding: ${D?"1.5rem 1.25rem":"0.75rem 0.5rem"};
      ${D?h==="light"?`
        background: var(--nyuzi-bg);
        border: 1px solid #e2e8f0;
        border-radius: var(--nyuzi-radius);
        box-shadow: 0 14px 38px -6px rgba(0, 0, 0, 0.35), 0 4px 12px rgba(0, 0, 0, 0.2);
      `:`
        background: var(--nyuzi-bg);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: var(--nyuzi-radius);
        box-shadow: 0 14px 38px -6px rgba(0, 0, 0, 0.25), 0 4px 12px rgba(0, 0, 0, 0.1);
      `:""}
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
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }
    .nyuzi-reactions-prompt {
      font-size: 0.9375rem;
      font-weight: 700;
      color: var(--nyuzi-text-primary);
      margin-bottom: 0.85rem;
      letter-spacing: -0.01em;
    }
    .nyuzi-reactions-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      justify-content: center;
    }
    .nyuzi-reaction-pill {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      background: var(--nyuzi-reaction-bg);
      border: 1px solid var(--nyuzi-reaction-border);
      border-radius: 0.75rem;
      padding: 0.5rem 0.85rem;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      min-width: 66px;
      user-select: none;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }
    .nyuzi-reaction-pill:hover {
      transform: translateY(-2px);
      border-color: var(--nyuzi-accent);
      background: var(--nyuzi-accent-soft);
      box-shadow: 0 4px 14px var(--nyuzi-accent-soft);
    }
    .nyuzi-reaction-pill.active {
      border-color: var(--nyuzi-accent);
      background: var(--nyuzi-accent-soft);
      box-shadow: 0 0 12px var(--nyuzi-accent-soft);
      transform: translateY(-1px);
    }
    .nyuzi-reaction-pill .emoji-row {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 1.15rem;
      line-height: 1;
    }
    .nyuzi-reaction-pill .reaction-count {
      font-size: 0.8125rem;
      font-weight: 700;
      color: var(--nyuzi-text-primary);
    }
    .nyuzi-reaction-pill .reaction-label {
      font-size: 0.6875rem;
      font-weight: 600;
      text-transform: capitalize;
      color: var(--nyuzi-text-secondary);
      margin-top: 0.25rem;
      letter-spacing: 0.01em;
    }
    .nyuzi-reaction-pill.active .reaction-label {
      color: var(--nyuzi-accent);
      font-weight: 700;
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
      letter-spacing: -0.01em;
    }
    .nyuzi-badge {
      font-size: 0.8125rem;
      font-weight: 700;
      background: var(--nyuzi-badge-bg);
      color: var(--nyuzi-text-secondary);
      padding: 0.15rem 0.6rem;
      border-radius: 9999px;
      border: 1px solid var(--nyuzi-badge-border);
    }

    /* Main Comment Form */
    .nyuzi-form {
      background: var(--nyuzi-card-bg);
      border: 1px solid var(--nyuzi-border);
      border-radius: var(--nyuzi-radius);
      padding: 1.15rem;
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
      min-height: 90px;
      padding: 0.75rem 0.85rem;
      border: 1px solid var(--nyuzi-border);
      border-radius: 0.5rem;
      background: var(--nyuzi-input-bg);
      color: var(--nyuzi-text-primary);
      font-family: inherit;
      font-size: 0.9375rem;
      resize: vertical;
      outline: none;
      transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
      box-sizing: border-box;
    }
    .nyuzi-textarea::placeholder {
      color: var(--nyuzi-text-muted);
    }
    .nyuzi-textarea:focus {
      border-color: var(--nyuzi-accent);
      background: var(--nyuzi-card-bg);
      box-shadow: 0 0 0 2px var(--nyuzi-accent-soft);
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
      padding: 0.55rem 0.85rem;
      border: 1px solid var(--nyuzi-border);
      border-radius: 0.5rem;
      background: var(--nyuzi-input-bg);
      color: var(--nyuzi-text-primary);
      font-size: 0.875rem;
      outline: none;
      transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
      box-sizing: border-box;
    }
    .nyuzi-input::placeholder {
      color: var(--nyuzi-text-muted);
    }
    .nyuzi-input:focus {
      border-color: var(--nyuzi-accent);
      background: var(--nyuzi-card-bg);
      box-shadow: 0 0 0 2px var(--nyuzi-accent-soft);
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
      background: var(--nyuzi-accent) !important;
      color: #ffffff !important;
      border: none;
      padding: 0.6rem 1.4rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      box-shadow: 0 2px 8px color-mix(in srgb, var(--nyuzi-accent) 30%, transparent);
      transition: background 0.15s, opacity 0.15s, transform 0.1s, box-shadow 0.15s;
    }
    .nyuzi-submit-btn:hover:not(:disabled) {
      background: var(--nyuzi-accent-hover) !important;
      box-shadow: 0 4px 14px color-mix(in srgb, var(--nyuzi-accent) 50%, transparent);
      transform: translateY(-1px);
    }
    .nyuzi-submit-btn:active:not(:disabled) {
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
      background: color-mix(in srgb, #ef4444 14%, var(--nyuzi-card-bg));
      border: 1px solid color-mix(in srgb, #ef4444 35%, transparent);
      color: #f87171;
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
    ${U==="card"?`
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
      line-height: 1.6;
    }
    .nyuzi-content blockquote {
      border-left: 3px solid var(--nyuzi-accent);
      padding: 0.35rem 0.85rem;
      margin: 0.55rem 0;
      color: var(--nyuzi-text-primary);
      background: var(--nyuzi-accent-soft);
      border-radius: 0 6px 6px 0;
      font-style: italic;
      line-height: 1.6;
    }
    .nyuzi-content code {
      background: var(--nyuzi-badge-bg);
      border: 1px solid var(--nyuzi-border);
      padding: 0.15rem 0.4rem;
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
      background: var(--nyuzi-card-bg);
      border: 1px solid var(--nyuzi-border);
      border-radius: 0.5rem;
      padding: 0.75rem;
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
      background: color-mix(in srgb, #ef4444 14%, var(--nyuzi-card-bg));
      border: 1px solid color-mix(in srgb, #ef4444 35%, transparent);
      color: #fca5a5;
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
      color: var(--nyuzi-text-muted);
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
      background: var(--nyuzi-card-bg);
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
  `}function E(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function Mt(e){let o=e.trim().split(/\s+/);return o.length===1?o[0].slice(0,2).toUpperCase():(o[0][0]+o[o.length-1][0]).toUpperCase()}function Bt(e){try{let o=new Date(e),l=Math.floor((new Date().getTime()-o.getTime())/1e3);return l<60?"just now":l<3600?`${Math.floor(l/60)}m ago`:l<86400?`${Math.floor(l/3600)}h ago`:l<604800?`${Math.floor(l/86400)}d ago`:o.toLocaleDateString(void 0,{month:"short",day:"numeric"})}catch{return"recently"}}function Rt(e,o){if(!e)return"";let t=E(e),l=o??["bold","italic","quote","code","link"];l.includes("code")&&(t=t.replace(/`([^`\n]+)`/g,"<code>$1</code>")),l.includes("bold")&&(t=t.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>")),l.includes("italic")&&(t=t.replace(/(^|[^*])\*([^*]+)\*([^*]|$)/g,"$1<em>$2</em>$3")),l.includes("link")?t=t.replace(/\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'):t=t.replace(/\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)/g,"$1 ($2)");let k=t.split(`
`),f=[],A=!1,z=[];for(let w of k)l.includes("quote")&&(w.startsWith("&gt; ")||w==="&gt;")?(A=!0,z.push(w.replace(/^&gt; ?/,""))):(A&&(f.push(`<blockquote>${z.join("<br/>")}</blockquote>`),z=[],A=!1),f.push(w));return A&&f.push(`<blockquote>${z.join("<br/>")}</blockquote>`),f.join(`
`).replace(/(<\/blockquote>)\n+/g,"$1").replace(/\n+(<blockquote>)/g,"$1").replace(/\n/g,"<br/>")}function jt(e,o){return e==="upvote"?`<svg class="nyuzi-reaction-icon" viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" fill="${o?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`:e==="like"?`<svg class="nyuzi-reaction-icon nyuzi-like-icon" viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2" fill="${o?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12M15 10.5a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3v2.5M7 10l5-6v5h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7"/><path d="M7 10H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"/></svg>`:`<svg class="nyuzi-reaction-icon nyuzi-heart-icon" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="${o?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>`}function Nt(){return'<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>'}function Ht(){return'<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'}function Pt(){return'<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>'}function qt(){return'<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>'}function Dt(e,o){return e.upvotes>0?`${e.upvotes}`:o==="upvote"?"Upvote":"Like"}function Ft(e,o){if(!e)return!1;let t=e.trim().toLowerCase();return o&&t===o.trim().toLowerCase()?!0:t.includes("fred juma")||t.includes("brenda frenjo")||t.includes("sumeiya juma")}function X(e,o){let t=o&&o.length>0?o:["bold","italic","quote","code","link"],l=[];return t.includes("bold")&&l.push(`
      <button type="button" class="nyuzi-format-btn" data-action="bold" title="Bold (**text**)">
        <strong>B</strong>
      </button>`),t.includes("italic")&&l.push(`
      <button type="button" class="nyuzi-format-btn" data-action="italic" title="Italic (*text*)">
        <em>I</em>
      </button>`),t.includes("quote")&&l.push(`
      <button type="button" class="nyuzi-format-btn" data-action="quote" title="Quote (> text)">
        &ldquo;
      </button>`),t.includes("code")&&l.push(`
      <button type="button" class="nyuzi-format-btn" data-action="code" title="Inline Code (\`code\`)">
        &lt;/&gt;
      </button>`),t.includes("link")&&l.push(`
      <button type="button" class="nyuzi-format-btn" data-action="link" title="Link ([text](url))">
        <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
      </button>`),l.length===0?"":`
    <div class="nyuzi-format-toolbar" data-target="${e}">
      ${l.join("")}
    </div>
  `}function gt(e,o="How was this discussion?",t="general",l){let A=t==="literary"?[{key:"coffee",emoji:"\u2615",label:"Thoughtful"},{key:"book",emoji:"\u{1F4D6}",label:"Engrossing"},{key:"lightbulb",emoji:"\u{1F4A1}",label:"Insight"},{key:"heart",emoji:"\u2764\uFE0F",label:"Moved"},{key:"clap",emoji:"\u{1F44F}",label:"Applause"}]:[{key:"fire",emoji:"\u{1F525}",label:"Superb"},{key:"heart",emoji:"\u2764\uFE0F",label:"Love"},{key:"lightbulb",emoji:"\u{1F4A1}",label:"Insight"},{key:"laugh",emoji:"\u{1F602}",label:"Laugh"},{key:"clap",emoji:"\u{1F44F}",label:"Applause"}];return`
    <div class="nyuzi-reactions-bar">
      <div class="nyuzi-reactions-prompt">${E(o||"How was this discussion?")}</div>
      <div class="nyuzi-reactions-grid">
        ${A.map(z=>{let w=Number(l?.[z.key])||0;return`
          <div class="nyuzi-reaction-pill ${e===z.key?"active":""}" data-reaction-key="${z.key}">
            <div class="emoji-row">
              <span>${z.emoji}</span>
              ${w>0?`<span class="reaction-count">${w}</span>`:""}
            </div>
            <span class="reaction-label">${z.label}</span>
          </div>
        `}).join("")}
      </div>
    </div>
  `}function nt(e,o,t){let l=o.filter(S=>S.parentId===e.id);l.sort((S,D)=>new Date(S.createdAt).getTime()-new Date(D.createdAt).getTime());let k=t.activeReplyId===e.id,f=t.editingCommentId===e.id,A=t.confirmDeleteId===e.id,z=t.collapsedComments.has(e.id),w=t.upvotedComments.has(e.id),q=t.myComments.has(e.id),U=e.isAuthor??Ft(e.authorName,t.postAuthor);return`
    <div class="nyuzi-comment" id="comment-${e.id}">
      <div class="nyuzi-avatar">${E(Mt(e.authorName))}</div>
      <div class="nyuzi-body">
        <div class="nyuzi-meta">
          <span class="nyuzi-author">${E(e.authorName)}</span>
          ${U?'<span class="nyuzi-author-badge">Author</span>':""}
          <span class="nyuzi-time">${Bt(e.createdAt)}</span>
          ${e.isEdited?'<span class="nyuzi-edited-tag" title="Edited by reader">(edited)</span>':""}
        </div>

        ${f?`
            <div class="nyuzi-edit-box">
              ${X(`edit-content-${e.id}`,t.allowedFormatting)}
              <textarea class="nyuzi-textarea nyuzi-edit-textarea" id="edit-content-${e.id}" rows="3" maxlength="2000">${E(e.content)}</textarea>
              <div class="nyuzi-edit-actions">
                <button class="nyuzi-action-btn cancel-edit" data-id="${e.id}">Cancel</button>
                <button class="nyuzi-submit-btn save-edit" data-id="${e.id}" ${t.isSubmitting?"disabled":""}>
                  ${t.isSubmitting?"Saving...":"Save Changes"}
                </button>
              </div>
            </div>
          `:A?`
            <div class="nyuzi-confirm-pill">
              <span>Delete this comment?</span>
              <button class="nyuzi-confirm-delete-btn" data-id="${e.id}" ${t.isSubmitting?"disabled":""}>
                ${t.isSubmitting?"Deleting...":"Yes, Delete"}
              </button>
              <button class="nyuzi-cancel-delete-btn" data-id="${e.id}">Cancel</button>
            </div>
          `:`<div class="nyuzi-content">${Rt(e.content,t.allowedFormatting)}</div>`}

        ${!f&&!A?`
          <div class="nyuzi-actions">
            <button class="nyuzi-action-btn upvote-btn ${w?"upvoted":""}" data-id="${e.id}" title="${w?"Unlike":"Like"}">
              ${jt(t.reactionType,w)}
              <span>${Dt(e,t.reactionType)}</span>
            </button>
            <button class="nyuzi-action-btn reply-trigger" data-id="${e.id}">
              ${Nt()}
              <span>Reply</span>
            </button>
            <button class="nyuzi-action-btn copy-link-btn" data-id="${e.id}" title="Copy direct link to this comment">
              ${Ht()}
              <span>Copy Link</span>
            </button>
            ${q?`
              <button class="nyuzi-action-btn edit-trigger" data-id="${e.id}" title="Edit your comment (15m grace window)">
                ${Pt()}
                <span>Edit</span>
              </button>
              <button class="nyuzi-action-btn delete-trigger" data-id="${e.id}" title="Delete your comment">
                ${qt()}
                <span>Delete</span>
              </button>
            `:""}
          </div>
        `:""}

        ${k?`
            <div class="nyuzi-reply-box">
              ${X(`reply-content-${e.id}`,t.allowedFormatting)}
              <textarea class="nyuzi-textarea" id="reply-content-${e.id}" placeholder="Reply to ${E(e.authorName)}..." maxlength="2000" required></textarea>
              <div class="nyuzi-form-row">
                <div class="nyuzi-inputs">
                  <input type="text" class="nyuzi-input" id="reply-name-${e.id}" placeholder="Your Name *" value="${E(t.savedAuthorName)}" required />
                  <input type="email" class="nyuzi-input" id="reply-email-${e.id}" placeholder="Email (for reply alerts)" value="${E(t.savedAuthorEmail)}" />
                </div>
                <div style="display:flex; gap:0.5rem; align-items:flex-end;">
                  <button class="nyuzi-action-btn cancel-reply" style="padding: 0.5rem 0.75rem;">Cancel</button>
                  <button class="nyuzi-submit-btn submit-reply" data-parent-id="${e.id}" ${t.isSubmitting?"disabled":""}>
                    ${t.isSubmitting?"Posting...":"Reply"}
                  </button>
                </div>
              </div>
            </div>
          `:""}

        ${l.length>0?`
          <div class="nyuzi-replies-wrapper">
            <button class="nyuzi-collapse-btn" data-id="${e.id}" title="${z?"Expand replies":"Collapse replies"}">
              <svg class="nyuzi-collapse-chevron ${z?"collapsed":""}" viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              <span>${z?`Show ${l.length} ${l.length===1?"reply":"replies"}`:`Hide ${l.length} ${l.length===1?"reply":"replies"}`}</span>
            </button>
            ${z?"":`
              <div class="nyuzi-replies">
                ${l.map(S=>nt(S,o,t)).join("")}
              </div>
            `}
          </div>
        `:""}
      </div>
    </div>
  `}async function rt(e,o,t,l,k,f){let A=f?`&highlight=${encodeURIComponent(f)}`:"",z=`${e}/api/v1/comments?siteId=${encodeURIComponent(o)}&threadUrl=${encodeURIComponent(t)}&page=${l}&limit=${k}${A}`,w=await fetch(z);if(!w.ok)throw new Error(`HTTP ${w.status}`);return w.json()}async function pt(e,o){let t=await fetch(`${e}/api/v1/comments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});if(!t.ok){let l=await t.json().catch(()=>({}));throw new Error(l.error||`HTTP ${t.status}`)}return t.json()}async function yt(e,o,t){let l=await fetch(`${e}/api/v1/comments/${encodeURIComponent(o)}/upvote`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:t})});if(!l.ok)throw new Error("Vote action failed");return l.json()}async function bt(e,o,t){let l=await fetch(`${e}/api/v1/comments/${encodeURIComponent(o)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:t})});if(!l.ok){let k=await l.json().catch(()=>({}));throw new Error(k.error||`HTTP ${l.status}`)}return l.json()}async function ft(e,o){let t=await fetch(`${e}/api/v1/comments/${encodeURIComponent(o)}`,{method:"DELETE"});if(!t.ok)throw new Error("Delete action failed");return t.json()}async function ht(e,o){let t=await fetch(`${e}/api/v1/threads/react`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});if(!t.ok)throw new Error("Thread reaction failed");return t.json()}(function(){let e=document.currentScript,o=document.getElementById("nyuzi-comments")||document.querySelector("nyuzi-comments");if(!o){console.warn("[Nyuzi] No container found (#nyuzi-comments or <nyuzi-comments>).");return}let t=o;if(t.__nyuzi_initialized)return;t.__nyuzi_initialized=!0;let l=e?.getAttribute("data-site-id")||t.getAttribute("data-site-id")||document.querySelector("[data-nyuzi-site-id]")?.getAttribute("data-nyuzi-site-id")||"",k=e?.getAttribute("data-api")||t.getAttribute("data-api")||"https://nyuzi-api.fredjuma8.workers.dev",f=e?.getAttribute("data-mock")==="true"||t.getAttribute("data-mock")==="true",A=e?.getAttribute("data-reactions-bar")??t.getAttribute("data-reactions-bar"),z=A===null?!0:A!=="false",w=e?.getAttribute("data-reactions-prompt")||t.getAttribute("data-reactions-prompt")||"How was this discussion?",q=e?.getAttribute("data-reactions-preset")||t.getAttribute("data-reactions-preset")||"general",S=(e?.getAttribute("data-formatting")||t.getAttribute("data-formatting")||"bold,italic,quote,code,link").split(",").map(n=>n.trim().toLowerCase()).filter(Boolean),D=!!(e?.getAttribute("data-accent-color")||t.getAttribute("data-accent-color")),h=!!(e?.getAttribute("data-theme")||t.getAttribute("data-theme")),T=!!(e?.getAttribute("data-bg")||t.getAttribute("data-bg")),Ot=!!(e?.getAttribute("data-bg-color")||t.getAttribute("data-bg-color")),_t=!!(e?.getAttribute("data-card-bg")||t.getAttribute("data-card-bg")),Ut=!!(e?.getAttribute("data-text-color")||t.getAttribute("data-text-color")),Jt=!!(e?.getAttribute("data-border-color")||t.getAttribute("data-border-color")),Yt=!!(e?.getAttribute("data-radius")||t.getAttribute("data-radius")),Kt=!!(e?.getAttribute("data-reaction")||t.getAttribute("data-reaction")),Wt=A!=null,Vt=!!(e?.getAttribute("data-reactions-prompt")||t.getAttribute("data-reactions-prompt")),Gt=!!(e?.getAttribute("data-reactions-preset")||t.getAttribute("data-reactions-preset"));function vt(){try{let n=document.documentElement,r=document.body,c=n.getAttribute("data-theme")||n.getAttribute("data-color-mode")||n.getAttribute("data-bs-theme")||"",i=r?.getAttribute("data-theme")||r?.getAttribute("data-color-mode")||r?.getAttribute("data-bs-theme")||"",u=`${c} ${i}`.toLowerCase();if(u.includes("dark"))return"dark";if(u.includes("light"))return"light";if(n.classList.contains("dark")||n.classList.contains("dark-theme")||n.classList.contains("dark-mode")||n.classList.contains("theme-dark")||!!(r&&(r.classList.contains("dark")||r.classList.contains("dark-theme")||r.classList.contains("dark-mode")||r.classList.contains("theme-dark"))))return"dark";if(n.classList.contains("light")||n.classList.contains("light-theme")||n.classList.contains("light-mode")||n.classList.contains("theme-light")||!!(r&&(r.classList.contains("light")||r.classList.contains("light-theme")||r.classList.contains("light-mode")||r.classList.contains("theme-light"))))return"light";let a=t.parentElement;for(;a&&a!==document.documentElement;){let p=window.getComputedStyle(a).backgroundColor;if(p&&p!=="transparent"&&!p.startsWith("rgba(0, 0, 0, 0)")){let g=p.match(/\d+/g);if(g&&g.length>=3){let x=parseInt(g[0],10),H=parseInt(g[1],10),_=parseInt(g[2],10);if((g.length>=4?parseFloat(g[3]):1)>.1)return(x*299+H*587+_*114)/1e3<130?"dark":"light"}}a=a.parentElement}if(r){let p=window.getComputedStyle(r).backgroundColor;if(p&&p!=="transparent"&&!p.startsWith("rgba(0, 0, 0, 0)")){let g=p.match(/\d+/g);if(g&&g.length>=3){let x=parseInt(g[0],10),H=parseInt(g[1],10),_=parseInt(g[2],10);return(x*299+H*587+_*114)/1e3<130?"dark":"light"}}}}catch{}return typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}let b={accent:e?.getAttribute("data-accent-color")||t.getAttribute("data-accent-color")||"#f56220",bg:e?.getAttribute("data-bg-color")||t.getAttribute("data-bg-color")||"",cardBg:e?.getAttribute("data-card-bg")||t.getAttribute("data-card-bg")||"",textColor:e?.getAttribute("data-text-color")||t.getAttribute("data-text-color")||"",textSecondary:e?.getAttribute("data-text-secondary")||t.getAttribute("data-text-secondary")||"",borderColor:e?.getAttribute("data-border-color")||t.getAttribute("data-border-color")||"",inputBg:e?.getAttribute("data-input-bg")||t.getAttribute("data-input-bg")||"",radius:e?.getAttribute("data-radius")||t.getAttribute("data-radius")||"0.75rem",reactionType:e?.getAttribute("data-reaction")||t.getAttribute("data-reaction")||"like",themeMode:e?.getAttribute("data-theme")||t.getAttribute("data-theme")||"auto",bgMode:e?.getAttribute("data-bg")||t.getAttribute("data-bg")||"transparent",showReactionsBar:z,reactionsPrompt:w,reactionsPreset:q,allowedFormatting:S},y=t.shadowRoot||t.attachShadow({mode:"open"});y.innerHTML="",b.themeMode&&t.setAttribute("data-theme",b.themeMode);let F=e?.getAttribute("data-thread-url")||t.getAttribute("data-thread-url")||window.location.href.split("#")[0],it=e?.getAttribute("data-thread-title")||t.getAttribute("data-thread-title")||document.title||"Discussion",tt=e?.getAttribute("data-author-name")||t.getAttribute("data-author-name")||"",v=[],L=0,I=0,et=1,at=15,K=!1,O=!1,J=!0,B=null,R=null,P=null,j=null,$=!1,M=null,N=new Set,W=new Set,V=!1,G=`nyuzi_react_${l}_${encodeURIComponent(F)}`,ot=`nyuzi_counts_${l}_${encodeURIComponent(F)}`,C={...f?b.reactionsPreset==="literary"?{coffee:21,book:28,lightbulb:14,heart:19,clap:16}:{fire:18,heart:24,lightbulb:12,laugh:7,clap:15}:{}};try{let n=localStorage.getItem(G);n&&(M=n)}catch{}if(f)try{let n=localStorage.getItem(ot);n&&(C={...C,...JSON.parse(n)})}catch{}let Y="nyuzi_reader_ownership",zt=900*1e3;function st(n){try{let r=localStorage.getItem(Y),c=r?JSON.parse(r):{};c[n]=Date.now()+zt,localStorage.setItem(Y,JSON.stringify(c))}catch{}}function lt(n){try{let r=localStorage.getItem(Y);if(r){let c=JSON.parse(r);delete c[n],localStorage.setItem(Y,JSON.stringify(c))}}catch{}}function xt(){let n=new Set;try{let r=localStorage.getItem(Y);if(r){let c=JSON.parse(r),i=Date.now();for(let[u,s]of Object.entries(c))i<s&&n.add(u)}}catch{}return f&&n.add("mock-3"),n}try{let n=sessionStorage.getItem("nyuzi_upvotes");n&&JSON.parse(n).forEach(r=>N.add(r))}catch{}let Q="",Z="";try{Q=localStorage.getItem("nyuzi_author_name")||"",Z=localStorage.getItem("nyuzi_author_email")||""}catch{}function ct(n,r){n&&(Q=n),r&&(Z=r);try{n&&localStorage.setItem("nyuzi_author_name",n),r&&localStorage.setItem("nyuzi_author_email",r)}catch{}}function kt(){return[{id:"mock-1",parentId:null,authorName:tt||"Fred Juma",authorEmail:"fredjuma8@gmail.com",content:`Welcome to our literary salon! **The Reading Circle** invites your reflections on this essay:

> "A reader lives a thousand lives before he dies. The man who never reads lives only one."

Feel free to share your thoughts, quote your favorite passages, or reply to fellow readers below.`,status:"approved",upvotes:14,createdAt:new Date(Date.now()-36e5*2).toISOString(),isAuthor:!0},{id:"mock-2",parentId:"mock-1",authorName:"Brenda Frenjo",authorEmail:"readingcircle254@gmail.com",content:"The second chapter in particular felt so poignant. The pacing and character progression really resonated with what we discussed during Sunday's book circle session!",status:"approved",upvotes:8,createdAt:new Date(Date.now()-36e5).toISOString(),isAuthor:!0},{id:"mock-3",parentId:null,authorName:"Amina Odhiambo",authorEmail:"amina@example.com",content:"Reading this made me pause and reflect on how we consume stories in the digital age. Check out this related discussion on [Bookish Perspectives](https://readingcircle254.com/blog)!",status:"approved",upvotes:5,createdAt:new Date(Date.now()-18e5).toISOString()}]}function dt(){let n=window.location.hash;n&&n.startsWith("#comment-")&&setTimeout(()=>{let r=y.querySelector(n);r&&(r.scrollIntoView({behavior:"smooth",block:"center"}),r.classList.add("nyuzi-highlight"),setTimeout(()=>r.classList.remove("nyuzi-highlight"),3500))},200)}async function wt(){if(f){v=kt(),L=v.length,I=v.filter(n=>!n.parentId).length,J=!1,m();return}try{J=!0,et=1,m();let n=window.location.hash,r=n&&n.startsWith("#comment-")?n.replace("#comment-",""):"",c=await rt(k,l,F,1,at,r);if(v=c.comments||[],L=c.total||(c.pagination?.totalComments??v.length),I=c.pagination?.totalTopLevel??v.filter(i=>!i.parentId).length,K=c.pagination?.hasMore??!1,f||(C=c.thread?.reactions&&typeof c.thread.reactions=="object"?{...c.thread.reactions}:{}),c.siteSettings&&typeof c.siteSettings=="object"){let i=c.siteSettings;i.accentColor&&(b.accent=i.accentColor),i.themeMode&&(b.themeMode=i.themeMode),i.bgMode&&(b.bgMode=i.bgMode),i.canvasBg!==void 0&&i.canvasBg!==""&&(b.bg=i.canvasBg),i.cardBg!==void 0&&i.cardBg!==""&&(b.cardBg=i.cardBg),i.textColor!==void 0&&i.textColor!==""&&(b.textColor=i.textColor),i.borderColor!==void 0&&i.borderColor!==""&&(b.borderColor=i.borderColor),i.radiusValue&&(b.radius=i.radiusValue),i.reactionType&&(b.reactionType=i.reactionType),i.showReactionsBar!==void 0&&(b.showReactionsBar=!!i.showReactionsBar),i.reactionsPrompt&&(b.reactionsPrompt=i.reactionsPrompt),i.reactionsPreset&&(b.reactionsPreset=i.reactionsPreset),Array.isArray(i.formattingTools)&&(b.allowedFormatting=i.formattingTools)}J=!1,m(),dt()}catch(n){console.error("[Nyuzi] Failed to load comments:",n),J=!1,B="Unable to connect to comments server.",m()}}async function At(){if(!(O||!K||f))try{O=!0,m();let n=et+1,r=await rt(k,l,F,n,at),c=r.comments||[],i=new Set(v.map(u=>u.id));for(let u of c)i.has(u.id)||v.push(u);et=n,K=r.pagination?.hasMore??!1,I=r.pagination?.totalTopLevel??I,L=r.pagination?.totalComments??L,O=!1,m()}catch(n){console.error("[Nyuzi] Error loading more comments:",n),O=!1,m()}}async function $t(n){let r=N.has(n),c=r?"unvote":"upvote",i=v.find(u=>u.id===n);r?(N.delete(n),i&&(i.upvotes=Math.max(0,(i.upvotes||1)-1))):(N.add(n),i&&(i.upvotes=(i.upvotes||0)+1));try{sessionStorage.setItem("nyuzi_upvotes",JSON.stringify(Array.from(N)))}catch{}if(m(),!f)try{let u=await yt(k,n,c);i&&typeof u.upvotes=="number"&&(i.upvotes=u.upvotes,m())}catch{r?(N.add(n),i&&(i.upvotes=(i.upvotes||0)+1)):(N.delete(n),i&&(i.upvotes=Math.max(0,(i.upvotes||1)-1))),m()}}async function ut(n,r,c,i,u=null){if(!(!n.trim()||!c.trim()))try{if($=!0,B=null,m(),f){let d={id:`mock-${Date.now()}`,parentId:u,authorName:n.trim(),authorEmail:r,content:c.trim(),status:"approved",upvotes:0,createdAt:new Date().toISOString()};st(d.id),u?v.push(d):(v.unshift(d),I+=1),L+=1,R=null,$=!1,m();return}let s=await pt(k,{siteId:l,threadUrl:F,threadTitle:it,postAuthor:tt,parentId:u,authorName:n,authorEmail:r,content:c,notifyOnReply:i});s.comment&&(st(s.comment.id),u?v.push(s.comment):(v.unshift(s.comment),I+=1),L+=1,R=null),$=!1,m()}catch(s){B=s.message||"Failed to post comment. Please try again.",$=!1,m()}}async function Ct(n,r){if(r.trim())try{if($=!0,m(),f){let i=v.find(u=>u.id===n);i&&(i.content=r.trim(),i.isEdited=!0),P=null,$=!1,m();return}await bt(k,n,r.trim());let c=v.find(i=>i.id===n);c&&(c.content=r.trim(),c.isEdited=!0),P=null,$=!1,m()}catch(c){alert(c.message||"Failed to edit comment."),$=!1,m()}}async function Et(n){try{if($=!0,m(),f){v=v.filter(r=>r.id!==n&&r.parentId!==n),L=v.length,I=v.filter(r=>!r.parentId).length,lt(n),j=null,$=!1,m();return}await ft(k,n),v=v.filter(r=>r.id!==n&&r.parentId!==n),L=v.length,I=v.filter(r=>!r.parentId).length,lt(n),j=null,$=!1,m()}catch{alert("Failed to delete comment. Please try again."),j=null,$=!1,m()}}function Tt(n,r){let c=n.selectionStart,i=n.selectionEnd,u=n.value,s=u.substring(c,i),d="",a=0;switch(r){case"bold":d=s?`**${s}**`:"**bold text**",a=s?d.length:2;break;case"italic":d=s?`*${s}*`:"*italic text*",a=s?d.length:1;break;case"quote":s?d=s.split(`
`).map(g=>`> ${g}`).join(`
`):d="> quote text",a=d.length;break;case"code":d=s?`\`${s}\``:"`code`",a=s?d.length:1;break;case"link":d=s?`[${s}](https://)`:"[link title](https://example.com)",a=d.length-1;break;default:return}n.value=u.substring(0,c)+d+u.substring(i),n.focus();let p=c+a;n.setSelectionRange(p,p),n.dispatchEvent(new Event("input",{bubbles:!0}))}function m(){let n=v.filter(g=>!g.parentId),r=vt(),c=b.themeMode==="auto"?r:b.themeMode||r,i=c==="light"&&r==="dark"||c==="dark"&&r==="light",u=!b.bg||b.bg==="transparent"||b.bgMode==="transparent",s=!!(i&&u&&b.themeMode!=="auto"),d={...b,resolvedTheme:c,isCardIsolated:s},a=mt(d),p=xt();t&&(t.setAttribute("data-theme",c),s?t.setAttribute("data-card-isolated","true"):t.removeAttribute("data-card-isolated")),y.innerHTML=`
      <style>${a}</style>
      <div class="nyuzi-container">
        ${b.showReactionsBar?gt(M,b.reactionsPrompt,b.reactionsPreset,C):""}

        <!-- Header -->
        <div class="nyuzi-header">
          <h3 class="nyuzi-title">
            Discussion
            <span class="nyuzi-badge">${L}</span>
          </h3>
        </div>

        <!-- Main Form -->
        <div class="nyuzi-form">
          ${B?`<div class="nyuzi-alert">
                   <span>\u26A0\uFE0F ${E(B)}</span>
                   <button class="nyuzi-action-btn" id="dismiss-error" style="color:#b91c1c;">\u2715</button>
                 </div>`:""}

          ${X("nyuzi-main-content",b.allowedFormatting)}
          <textarea class="nyuzi-textarea" id="nyuzi-main-content" maxlength="2000" placeholder="Share your thoughts or leave a question..." required></textarea>
          <div class="nyuzi-counter-row">
            <span id="nyuzi-char-count">0 / 2,000</span>
          </div>

          <div class="nyuzi-form-row">
            <div class="nyuzi-inputs">
              <input type="text" class="nyuzi-input" id="nyuzi-main-name" placeholder="Name *" value="${E(Q)}" required />
              <input type="email" class="nyuzi-input" id="nyuzi-main-email" placeholder="Email (for reply alerts)" value="${E(Z)}" />
            </div>
            <button class="nyuzi-submit-btn" id="nyuzi-main-submit" ${$?"disabled":""}>
              ${$?"Posting...":"Post Comment"}
            </button>
          </div>

          <label class="nyuzi-optin" id="nyuzi-optin-wrapper">
            <input type="checkbox" id="nyuzi-main-notify" checked />
            <span>Notify me via email when someone replies</span>
          </label>
        </div>

        <!-- Comments Stream -->
        ${J?`<div class="nyuzi-skeleton">
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
               </div>`:n.length===0?`<div class="nyuzi-empty">
                 <p style="font-size:1.1rem; margin:0 0 0.25rem 0; font-weight:600; color:var(--nyuzi-text-primary);">No comments yet</p>
                 <p style="margin:0; font-size:0.875rem;">Be the first to share your thoughts!</p>
               </div>`:`<div class="nyuzi-list">
                 ${n.map(g=>nt(g,v,{postAuthor:tt,reactionType:b.reactionType,upvotedComments:N,activeReplyId:R,editingCommentId:P,confirmDeleteId:j,collapsedComments:W,myComments:p,isSubmitting:$,savedAuthorName:Q,savedAuthorEmail:Z,allowedFormatting:b.allowedFormatting})).join("")}
               </div>
               ${K?`<div class="nyuzi-pagination">
                        <button class="nyuzi-load-more-btn" id="nyuzi-load-more" ${O?"disabled":""}>
                          ${O?'<span class="nyuzi-spinner"></span> Loading comments...':`Load more comments (${Math.max(0,I-n.length)} remaining) \u2193`}
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
    `,St()}function St(){y.querySelectorAll(".nyuzi-reaction-pill").forEach(s=>{s.addEventListener("click",async d=>{if(V)return;let a=d.currentTarget.getAttribute("data-reaction-key");if(!a)return;V=!0;let p=M,g;if(M===a){g="unreact",M=null,C[a]=Math.max(0,(C[a]||1)-1);try{localStorage.removeItem(G)}catch{}}else if(M){g="switch";let x=M;M=a,C[x]=Math.max(0,(C[x]||1)-1),C[a]=(C[a]||0)+1;try{localStorage.setItem(G,a)}catch{}}else{g="react",M=a,C[a]=(C[a]||0)+1;try{localStorage.setItem(G,a)}catch{}}try{localStorage.setItem(ot,JSON.stringify(C))}catch{}if(m(),f)V=!1;else try{let x=await ht(k,{siteId:l,threadUrl:F,threadTitle:it,reactionKey:a,previousKey:p,action:g});x&&x.reactions&&(C={...x.reactions},m())}catch(x){console.warn("[Nyuzi] Failed to sync reaction to server:",x)}finally{V=!1}})}),y.querySelectorAll(".nyuzi-format-btn").forEach(s=>{s.addEventListener("click",d=>{d.preventDefault();let a=d.currentTarget.getAttribute("data-action"),g=d.currentTarget.closest(".nyuzi-format-toolbar")?.getAttribute("data-target");if(!a||!g)return;let x=y.getElementById(g);x&&Tt(x,a)})});let n=y.getElementById("nyuzi-main-content"),r=y.getElementById("nyuzi-char-count");n&&r&&n.addEventListener("input",()=>{r.textContent=`${n.value.length} / 2,000`});let c=y.getElementById("dismiss-error");c&&c.addEventListener("click",()=>{B=null,m()});let i=y.getElementById("nyuzi-main-submit");i&&i.addEventListener("click",()=>{let s=y.getElementById("nyuzi-main-name"),d=y.getElementById("nyuzi-main-email"),a=y.getElementById("nyuzi-main-notify");if(!s.value.trim()){B="Please enter your name.",m();return}if(!n||!n.value.trim()){B="Comment content cannot be empty.",m();return}let p=s.value.trim(),g=d.value.trim()||null;ct(p,g),ut(p,g,n.value.trim(),a?a.checked:!0,null)});let u=y.getElementById("nyuzi-load-more");u&&u.addEventListener("click",()=>{At()}),y.querySelectorAll(".upvote-btn").forEach(s=>{s.addEventListener("click",d=>{let a=d.currentTarget.getAttribute("data-id");a&&$t(a)})}),y.querySelectorAll(".reply-trigger").forEach(s=>{s.addEventListener("click",d=>{let a=d.currentTarget.getAttribute("data-id");R=R===a?null:a,P=null,j=null,m()})}),y.querySelectorAll(".cancel-reply").forEach(s=>{s.addEventListener("click",()=>{R=null,m()})}),y.querySelectorAll(".submit-reply").forEach(s=>{s.addEventListener("click",d=>{let a=d.currentTarget.getAttribute("data-parent-id");if(!a)return;let p=y.getElementById(`reply-name-${a}`),g=y.getElementById(`reply-email-${a}`),x=y.getElementById(`reply-content-${a}`);if(!p.value.trim()){alert("Please enter your name.");return}if(!x||!x.value.trim()){alert("Reply content cannot be empty.");return}let H=p.value.trim(),_=g?.value.trim()||null;ct(H,_),ut(H,_,x.value.trim(),!0,a)})}),y.querySelectorAll(".edit-trigger").forEach(s=>{s.addEventListener("click",d=>{P=d.currentTarget.getAttribute("data-id"),R=null,j=null,m()})}),y.querySelectorAll(".cancel-edit").forEach(s=>{s.addEventListener("click",()=>{P=null,m()})}),y.querySelectorAll(".save-edit").forEach(s=>{s.addEventListener("click",d=>{let a=d.currentTarget.getAttribute("data-id");if(!a)return;let p=y.getElementById(`edit-content-${a}`);if(!p||!p.value.trim()){alert("Comment content cannot be empty.");return}Ct(a,p.value.trim())})}),y.querySelectorAll(".delete-trigger").forEach(s=>{s.addEventListener("click",d=>{j=d.currentTarget.getAttribute("data-id"),R=null,P=null,m()})}),y.querySelectorAll(".nyuzi-cancel-delete-btn").forEach(s=>{s.addEventListener("click",()=>{j=null,m()})}),y.querySelectorAll(".nyuzi-confirm-delete-btn").forEach(s=>{s.addEventListener("click",d=>{let a=d.currentTarget.getAttribute("data-id");a&&Et(a)})}),y.querySelectorAll(".nyuzi-collapse-btn").forEach(s=>{s.addEventListener("click",d=>{let a=d.currentTarget.getAttribute("data-id");a&&(W.has(a)?W.delete(a):W.add(a),m())})}),y.querySelectorAll(".copy-link-btn").forEach(s=>{s.addEventListener("click",async d=>{let a=d.currentTarget,p=a.getAttribute("data-id");if(!p)return;let x=`${window.location.href.split("#")[0]}#comment-${p}`;try{await navigator.clipboard.writeText(x);let H=a.innerHTML;a.innerHTML="\u2713 Copied!",a.style.color="var(--nyuzi-accent)",setTimeout(()=>{a.innerHTML=H,a.style.color=""},2e3)}catch{window.location.hash=`comment-${p}`}})})}window.addEventListener("hashchange",dt);try{let n=null,r=()=>{clearTimeout(n),n=setTimeout(()=>{m()},50)},c=new MutationObserver(i=>{for(let u of i)if(u.type==="attributes"&&(u.attributeName==="class"||u.attributeName==="data-theme"||u.attributeName==="data-color-mode"||u.attributeName==="data-bs-theme"||u.attributeName==="style")){r();break}});c.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","data-color-mode","data-bs-theme","style"]}),document.body&&c.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme","data-color-mode","data-bs-theme","style"]}),typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",r)}catch(n){console.debug("[Nyuzi] Theme observer warning:",n)}wt()})();})();
//# sourceMappingURL=embed.js.map