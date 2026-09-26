"use strict";(()=>{function be(e){if(!e||typeof e!="string"||!e.startsWith("#"))return!1;let r=e.replace("#","");if(r.length!==6&&r.length!==3)return!1;let t=parseInt(r.length===3?r[0]+r[0]:r.slice(0,2),16),s=parseInt(r.length===3?r[1]+r[1]:r.slice(2,4),16),g=parseInt(r.length===3?r[2]+r[2]:r.slice(4,6),16);return(t*299+s*587+g*114)/1e3>155}function ee(e){let{accent:r,bg:t,cardBg:s,textColor:g,textSecondary:f,borderColor:h,inputBg:z,radius:c="0.75rem",themeMode:A,bgMode:w}=e,d=be(s);return`
    :host {
      --nyuzi-accent: ${r||"#f56220"};
      --nyuzi-accent-hover: color-mix(in srgb, var(--nyuzi-accent) 80%, black);
      --nyuzi-accent-soft: color-mix(in srgb, var(--nyuzi-accent) 12%, transparent);
      --nyuzi-accent-border: color-mix(in srgb, var(--nyuzi-accent) 30%, transparent);

      --nyuzi-bg: ${t||(w==="card"?"#f8fafc":"transparent")};
      --nyuzi-card-bg: ${s||"#ffffff"};
      --nyuzi-text-primary: ${g||"#0f172a"};
      --nyuzi-text-secondary: ${f||"#475569"};
      --nyuzi-text-muted: #94a3b8;
      --nyuzi-border: ${h||"#e2e8f0"};
      --nyuzi-input-bg: ${z||"#f8fafc"};
      --nyuzi-reaction-bg: #ffffff;
      --nyuzi-reaction-border: #e2e8f0;
      --nyuzi-badge-bg: #f1f5f9;
      --nyuzi-badge-border: #e2e8f0;
      --nyuzi-thread-line: #e2e8f0;
      --nyuzi-avatar-bg: var(--nyuzi-accent-soft);
      --nyuzi-avatar-text: var(--nyuzi-accent);
      --nyuzi-radius: ${c};

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

    ${A==="sepia"?`
      :host {
        --nyuzi-bg: ${t||(w==="card"?"#f4ead8":"transparent")};
        --nyuzi-card-bg: ${s||"#fbf3e4"};
        --nyuzi-text-primary: ${g||"#2b2118"};
        --nyuzi-text-secondary: ${f||"#6a5949"};
        --nyuzi-text-muted: #968370;
        --nyuzi-border: ${h||"#e2d4bc"};
        --nyuzi-input-bg: ${z||"#fbf7ef"};
        --nyuzi-reaction-bg: #fbf7ef;
        --nyuzi-reaction-border: #e2d4bc;
        --nyuzi-badge-bg: #ece0cd;
        --nyuzi-badge-border: #e2d4bc;
        --nyuzi-thread-line: #e2d4bc;
        --nyuzi-avatar-bg: var(--nyuzi-accent-soft);
        --nyuzi-avatar-text: var(--nyuzi-accent);
      }
    `:""}

    ${A==="dark"?`
      :host {
        --nyuzi-bg: ${t||(w==="card"?"#090605":"transparent")};
        --nyuzi-card-bg: ${s||"#14100e"};
        --nyuzi-text-primary: ${g||(d?"#0f172a":"#f8fafc")};
        --nyuzi-text-secondary: ${f||(d?"#475569":"#cbd5e1")};
        --nyuzi-text-muted: #94a3b8;
        --nyuzi-border: ${h||(d?"#e2e8f0":"rgba(255, 255, 255, 0.12)")};
        --nyuzi-input-bg: ${z||(d?"#ffffff":"#181412")};
        --nyuzi-reaction-bg: ${d?"#ffffff":"rgba(255, 255, 255, 0.05)"};
        --nyuzi-reaction-border: ${d?"#e2e8f0":"rgba(255, 255, 255, 0.1)"};
        --nyuzi-badge-bg: ${d?"#f1f5f9":"rgba(255, 255, 255, 0.08)"};
        --nyuzi-badge-border: ${d?"#e2e8f0":"rgba(255, 255, 255, 0.12)"};
        --nyuzi-thread-line: ${d?"#e2e8f0":"rgba(255, 255, 255, 0.12)"};
        --nyuzi-avatar-bg: var(--nyuzi-accent-soft);
        --nyuzi-avatar-text: var(--nyuzi-accent);
      }
    `:""}

    ${A==="auto"?`
      @media (prefers-color-scheme: dark) {
        :host {
          --nyuzi-bg: ${t||(w==="card"?"#090605":"transparent")};
          --nyuzi-card-bg: ${s||"#14100e"};
          --nyuzi-text-primary: ${g||(d?"#0f172a":"#f8fafc")};
          --nyuzi-text-secondary: ${f||(d?"#475569":"#cbd5e1")};
          --nyuzi-text-muted: #94a3b8;
          --nyuzi-border: ${h||(d?"#e2e8f0":"rgba(255, 255, 255, 0.12)")};
          --nyuzi-input-bg: ${z||(d?"#ffffff":"#181412")};
          --nyuzi-reaction-bg: ${d?"#ffffff":"rgba(255, 255, 255, 0.05)"};
          --nyuzi-reaction-border: ${d?"#e2e8f0":"rgba(255, 255, 255, 0.1)"};
          --nyuzi-badge-bg: ${d?"#f1f5f9":"rgba(255, 255, 255, 0.08)"};
          --nyuzi-badge-border: ${d?"#e2e8f0":"rgba(255, 255, 255, 0.12)"};
          --nyuzi-thread-line: ${d?"#e2e8f0":"rgba(255, 255, 255, 0.12)"};
          --nyuzi-avatar-bg: var(--nyuzi-accent-soft);
          --nyuzi-avatar-text: var(--nyuzi-accent);
        }
      }
      :host-context(.dark), :host([data-theme="dark"]) {
        --nyuzi-bg: ${t||(w==="card"?"#090605":"transparent")};
        --nyuzi-card-bg: ${s||"#14100e"};
        --nyuzi-text-primary: ${g||(d?"#0f172a":"#f8fafc")};
        --nyuzi-text-secondary: ${f||(d?"#475569":"#cbd5e1")};
        --nyuzi-text-muted: #94a3b8;
        --nyuzi-border: ${h||(d?"#e2e8f0":"rgba(255, 255, 255, 0.12)")};
        --nyuzi-input-bg: ${z||(d?"#ffffff":"#181412")};
        --nyuzi-reaction-bg: ${d?"#ffffff":"rgba(255, 255, 255, 0.05)"};
        --nyuzi-reaction-border: ${d?"#e2e8f0":"rgba(255, 255, 255, 0.1)"};
        --nyuzi-badge-bg: ${d?"#f1f5f9":"rgba(255, 255, 255, 0.08)"};
        --nyuzi-badge-border: ${d?"#e2e8f0":"rgba(255, 255, 255, 0.12)"};
        --nyuzi-thread-line: ${d?"#e2e8f0":"rgba(255, 255, 255, 0.12)"};
        --nyuzi-avatar-bg: var(--nyuzi-accent-soft);
        --nyuzi-avatar-text: var(--nyuzi-accent);
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
    ${w==="card"?`
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
  `}function k(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function fe(e){let r=e.trim().split(/\s+/);return r.length===1?r[0].slice(0,2).toUpperCase():(r[0][0]+r[r.length-1][0]).toUpperCase()}function ze(e){try{let r=new Date(e),s=Math.floor((new Date().getTime()-r.getTime())/1e3);return s<60?"just now":s<3600?`${Math.floor(s/60)}m ago`:s<86400?`${Math.floor(s/3600)}h ago`:s<604800?`${Math.floor(s/86400)}d ago`:r.toLocaleDateString(void 0,{month:"short",day:"numeric"})}catch{return"recently"}}function he(e){if(!e)return"";let r=k(e);r=r.replace(/`([^`\n]+)`/g,"<code>$1</code>"),r=r.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>"),r=r.replace(/(^|[^*])\*([^*]+)\*([^*]|$)/g,"$1<em>$2</em>$3"),r=r.replace(/\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');let t=r.split(`
`),s=[],g=!1,f=[];for(let h of t)h.startsWith("&gt; ")||h==="&gt;"?(g=!0,f.push(h.replace(/^&gt; ?/,""))):(g&&(s.push(`<blockquote>${f.join("<br/>")}</blockquote>`),f=[],g=!1),s.push(h));return g&&s.push(`<blockquote>${f.join("<br/>")}</blockquote>`),s.join(`
`).replace(/(<\/blockquote>)\n+/g,"$1").replace(/\n+(<blockquote>)/g,"$1").replace(/\n/g,"<br/>")}function ve(e,r){return e==="upvote"?`<svg class="nyuzi-reaction-icon" viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" fill="${r?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`:e==="like"?`<svg class="nyuzi-reaction-icon nyuzi-like-icon" viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2" fill="${r?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12M15 10.5a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3v2.5M7 10l5-6v5h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7"/><path d="M7 10H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"/></svg>`:`<svg class="nyuzi-reaction-icon nyuzi-heart-icon" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="${r?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>`}function xe(){return'<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>'}function ke(){return'<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'}function we(){return'<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>'}function $e(){return'<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>'}function Ae(e,r){return e.upvotes>0?`${e.upvotes}`:r==="upvote"?"Upvote":"Like"}function Ee(e,r){if(!e)return!1;let t=e.trim().toLowerCase();return r&&t===r.trim().toLowerCase()?!0:t.includes("fred juma")||t.includes("brenda frenjo")||t.includes("sumeiya juma")}function U(e){return`
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
  `}function te(e){return`
    <div class="nyuzi-reactions-bar">
      <div class="nyuzi-reactions-prompt">How was this discussion?</div>
      <div class="nyuzi-reactions-grid">
        ${[{key:"fire",emoji:"\u{1F525}",label:"Superb",count:18},{key:"heart",emoji:"\u2764\uFE0F",label:"Love",count:24},{key:"lightbulb",emoji:"\u{1F4A1}",label:"Insight",count:12},{key:"laugh",emoji:"\u{1F602}",label:"Laugh",count:7},{key:"clap",emoji:"\u{1F44F}",label:"Applause",count:15}].map(t=>`
          <div class="nyuzi-reaction-pill ${e===t.key?"active":""}" data-reaction-key="${t.key}">
            <div class="emoji-row">
              <span>${t.emoji}</span>
              <span class="reaction-count">${t.count+(e===t.key?1:0)}</span>
            </div>
            <span class="reaction-label">${t.label}</span>
          </div>
        `).join("")}
      </div>
    </div>
  `}function J(e,r,t){let s=r.filter(d=>d.parentId===e.id);s.sort((d,p)=>new Date(d.createdAt).getTime()-new Date(p.createdAt).getTime());let g=t.activeReplyId===e.id,f=t.editingCommentId===e.id,h=t.confirmDeleteId===e.id,z=t.collapsedComments.has(e.id),c=t.upvotedComments.has(e.id),A=t.myComments.has(e.id),w=e.isAuthor??Ee(e.authorName,t.postAuthor);return`
    <div class="nyuzi-comment" id="comment-${e.id}">
      <div class="nyuzi-avatar">${k(fe(e.authorName))}</div>
      <div class="nyuzi-body">
        <div class="nyuzi-meta">
          <span class="nyuzi-author">${k(e.authorName)}</span>
          ${w?'<span class="nyuzi-author-badge">Author</span>':""}
          <span class="nyuzi-time">${ze(e.createdAt)}</span>
          ${e.isEdited?'<span class="nyuzi-edited-tag" title="Edited by reader">(edited)</span>':""}
        </div>

        ${f?`
            <div class="nyuzi-edit-box">
              ${U(`edit-content-${e.id}`)}
              <textarea class="nyuzi-textarea nyuzi-edit-textarea" id="edit-content-${e.id}" rows="3" maxlength="2000">${k(e.content)}</textarea>
              <div class="nyuzi-edit-actions">
                <button class="nyuzi-action-btn cancel-edit" data-id="${e.id}">Cancel</button>
                <button class="nyuzi-submit-btn save-edit" data-id="${e.id}" ${t.isSubmitting?"disabled":""}>
                  ${t.isSubmitting?"Saving...":"Save Changes"}
                </button>
              </div>
            </div>
          `:h?`
            <div class="nyuzi-confirm-pill">
              <span>Delete this comment?</span>
              <button class="nyuzi-confirm-delete-btn" data-id="${e.id}" ${t.isSubmitting?"disabled":""}>
                ${t.isSubmitting?"Deleting...":"Yes, Delete"}
              </button>
              <button class="nyuzi-cancel-delete-btn" data-id="${e.id}">Cancel</button>
            </div>
          `:`<div class="nyuzi-content">${he(e.content)}</div>`}

        ${!f&&!h?`
          <div class="nyuzi-actions">
            <button class="nyuzi-action-btn upvote-btn ${c?"upvoted":""}" data-id="${e.id}" title="${c?"Unlike":"Like"}">
              ${ve(t.reactionType,c)}
              <span>${Ae(e,t.reactionType)}</span>
            </button>
            <button class="nyuzi-action-btn reply-trigger" data-id="${e.id}">
              ${xe()}
              <span>Reply</span>
            </button>
            <button class="nyuzi-action-btn copy-link-btn" data-id="${e.id}" title="Copy direct link to this comment">
              ${ke()}
              <span>Copy Link</span>
            </button>
            ${A?`
              <button class="nyuzi-action-btn edit-trigger" data-id="${e.id}" title="Edit your comment (15m grace window)">
                ${we()}
                <span>Edit</span>
              </button>
              <button class="nyuzi-action-btn delete-trigger" data-id="${e.id}" title="Delete your comment">
                ${$e()}
                <span>Delete</span>
              </button>
            `:""}
          </div>
        `:""}

        ${g?`
            <div class="nyuzi-reply-box">
              ${U(`reply-content-${e.id}`)}
              <textarea class="nyuzi-textarea" id="reply-content-${e.id}" placeholder="Reply to ${k(e.authorName)}..." maxlength="2000" required></textarea>
              <div class="nyuzi-form-row">
                <div class="nyuzi-inputs">
                  <input type="text" class="nyuzi-input" id="reply-name-${e.id}" placeholder="Your Name *" value="${k(t.savedAuthorName)}" required />
                  <input type="email" class="nyuzi-input" id="reply-email-${e.id}" placeholder="Email (for reply alerts)" value="${k(t.savedAuthorEmail)}" />
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

        ${s.length>0?`
          <div class="nyuzi-replies-wrapper">
            <button class="nyuzi-collapse-btn" data-id="${e.id}" title="${z?"Expand replies":"Collapse replies"}">
              <svg class="nyuzi-collapse-chevron ${z?"collapsed":""}" viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              <span>${z?`Show ${s.length} ${s.length===1?"reply":"replies"}`:`Hide ${s.length} ${s.length===1?"reply":"replies"}`}</span>
            </button>
            ${z?"":`
              <div class="nyuzi-replies">
                ${s.map(d=>J(d,r,t)).join("")}
              </div>
            `}
          </div>
        `:""}
      </div>
    </div>
  `}async function Y(e,r,t,s,g,f){let h=f?`&highlight=${encodeURIComponent(f)}`:"",z=`${e}/api/v1/comments?siteId=${encodeURIComponent(r)}&threadUrl=${encodeURIComponent(t)}&page=${s}&limit=${g}${h}`,c=await fetch(z);if(!c.ok)throw new Error(`HTTP ${c.status}`);return c.json()}async function ne(e,r){let t=await fetch(`${e}/api/v1/comments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!t.ok){let s=await t.json().catch(()=>({}));throw new Error(s.error||`HTTP ${t.status}`)}return t.json()}async function re(e,r,t){let s=await fetch(`${e}/api/v1/comments/${encodeURIComponent(r)}/upvote`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:t})});if(!s.ok)throw new Error("Vote action failed");return s.json()}async function ie(e,r,t){let s=await fetch(`${e}/api/v1/comments/${encodeURIComponent(r)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:t})});if(!s.ok){let g=await s.json().catch(()=>({}));throw new Error(g.error||`HTTP ${s.status}`)}return s.json()}async function ae(e,r){let t=await fetch(`${e}/api/v1/comments/${encodeURIComponent(r)}`,{method:"DELETE"});if(!t.ok)throw new Error("Delete action failed");return t.json()}(function(){let e=document.currentScript,r=document.getElementById("nyuzi-comments")||document.querySelector("nyuzi-comments");if(!r){console.warn("[Nyuzi] No container found (#nyuzi-comments or <nyuzi-comments>).");return}let t=r,s=e?.getAttribute("data-site-id")||t.getAttribute("data-site-id")||document.querySelector("[data-nyuzi-site-id]")?.getAttribute("data-nyuzi-site-id")||"",g=e?.getAttribute("data-api")||t.getAttribute("data-api")||"https://nyuzi-api.fredjuma8.workers.dev",f=e?.getAttribute("data-mock")==="true"||t.getAttribute("data-mock")==="true",h=e?.getAttribute("data-reactions-bar")==="true"||t.getAttribute("data-reactions-bar")==="true",z={accent:e?.getAttribute("data-accent-color")||t.getAttribute("data-accent-color")||"#f56220",bg:e?.getAttribute("data-bg-color")||t.getAttribute("data-bg-color")||"",cardBg:e?.getAttribute("data-card-bg")||t.getAttribute("data-card-bg")||"",textColor:e?.getAttribute("data-text-color")||t.getAttribute("data-text-color")||"",textSecondary:e?.getAttribute("data-text-secondary")||t.getAttribute("data-text-secondary")||"",borderColor:e?.getAttribute("data-border-color")||t.getAttribute("data-border-color")||"",inputBg:e?.getAttribute("data-input-bg")||t.getAttribute("data-input-bg")||"",radius:e?.getAttribute("data-radius")||t.getAttribute("data-radius")||"0.75rem",reactionType:e?.getAttribute("data-reaction")||t.getAttribute("data-reaction")||"like",themeMode:e?.getAttribute("data-theme")||t.getAttribute("data-theme")||"auto",bgMode:e?.getAttribute("data-bg")||t.getAttribute("data-bg")||"transparent",showReactionsBar:h},c=t.shadowRoot||t.attachShadow({mode:"open"});c.innerHTML="",z.themeMode&&t.setAttribute("data-theme",z.themeMode);let A=e?.getAttribute("data-thread-url")||t.getAttribute("data-thread-url")||window.location.href.split("#")[0],w=e?.getAttribute("data-thread-title")||t.getAttribute("data-thread-title")||document.title||"Discussion",d=e?.getAttribute("data-author-name")||t.getAttribute("data-author-name")||"",p=[],E=0,C=0,F=1,W=15,B=!1,H=!1,N=!0,T=null,S=null,j=null,M=null,x=!1,_=null,I=new Set,q=new Set,R="nyuzi_reader_ownership",oe=900*1e3;function V(n){try{let i=localStorage.getItem(R),m=i?JSON.parse(i):{};m[n]=Date.now()+oe,localStorage.setItem(R,JSON.stringify(m))}catch{}}function G(n){try{let i=localStorage.getItem(R);if(i){let m=JSON.parse(i);delete m[n],localStorage.setItem(R,JSON.stringify(m))}}catch{}}function se(){let n=new Set;try{let i=localStorage.getItem(R);if(i){let m=JSON.parse(i),u=Date.now();for(let[b,a]of Object.entries(m))u<a&&n.add(b)}}catch{}return f&&n.add("mock-3"),n}try{let n=sessionStorage.getItem("nyuzi_upvotes");n&&JSON.parse(n).forEach(i=>I.add(i))}catch{}let D="",P="";try{D=localStorage.getItem("nyuzi_author_name")||"",P=localStorage.getItem("nyuzi_author_email")||""}catch{}function Q(n,i){n&&(D=n),i&&(P=i);try{n&&localStorage.setItem("nyuzi_author_name",n),i&&localStorage.setItem("nyuzi_author_email",i)}catch{}}function le(){return[{id:"mock-1",parentId:null,authorName:d||"Fred Juma",authorEmail:"fredjuma8@gmail.com",content:`Welcome to our literary salon! **The Reading Circle** invites your reflections on this essay:

> "A reader lives a thousand lives before he dies. The man who never reads lives only one."

Feel free to share your thoughts, quote your favorite passages, or reply to fellow readers below.`,status:"approved",upvotes:14,createdAt:new Date(Date.now()-36e5*2).toISOString(),isAuthor:!0},{id:"mock-2",parentId:"mock-1",authorName:"Brenda Frenjo",authorEmail:"readingcircle254@gmail.com",content:"The second chapter in particular felt so poignant. The pacing and character progression really resonated with what we discussed during Sunday's book circle session!",status:"approved",upvotes:8,createdAt:new Date(Date.now()-36e5).toISOString(),isAuthor:!0},{id:"mock-3",parentId:null,authorName:"Amina Odhiambo",authorEmail:"amina@example.com",content:"Reading this made me pause and reflect on how we consume stories in the digital age. Check out this related discussion on [Bookish Perspectives](https://readingcircle254.com/blog)!",status:"approved",upvotes:5,createdAt:new Date(Date.now()-18e5).toISOString()}]}function Z(){let n=window.location.hash;n&&n.startsWith("#comment-")&&setTimeout(()=>{let i=c.querySelector(n);i&&(i.scrollIntoView({behavior:"smooth",block:"center"}),i.classList.add("nyuzi-highlight"),setTimeout(()=>i.classList.remove("nyuzi-highlight"),3500))},200)}async function ce(){if(f){p=le(),E=p.length,C=p.filter(n=>!n.parentId).length,N=!1,y();return}try{N=!0,F=1,y();let n=window.location.hash,i=n&&n.startsWith("#comment-")?n.replace("#comment-",""):"",m=await Y(g,s,A,1,W,i);p=m.comments||[],E=m.total||(m.pagination?.totalComments??p.length),C=m.pagination?.totalTopLevel??p.filter(u=>!u.parentId).length,B=m.pagination?.hasMore??!1,N=!1,y(),Z()}catch(n){console.error("[Nyuzi] Failed to load comments:",n),N=!1,T="Unable to connect to comments server.",y()}}async function ue(){if(!(H||!B||f))try{H=!0,y();let n=F+1,i=await Y(g,s,A,n,W),m=i.comments||[],u=new Set(p.map(b=>b.id));for(let b of m)u.has(b.id)||p.push(b);F=n,B=i.pagination?.hasMore??!1,C=i.pagination?.totalTopLevel??C,E=i.pagination?.totalComments??E,H=!1,y()}catch(n){console.error("[Nyuzi] Error loading more comments:",n),H=!1,y()}}async function de(n){let i=I.has(n),m=i?"unvote":"upvote",u=p.find(b=>b.id===n);i?(I.delete(n),u&&(u.upvotes=Math.max(0,(u.upvotes||1)-1))):(I.add(n),u&&(u.upvotes=(u.upvotes||0)+1));try{sessionStorage.setItem("nyuzi_upvotes",JSON.stringify(Array.from(I)))}catch{}if(y(),!f)try{let b=await re(g,n,m);u&&typeof b.upvotes=="number"&&(u.upvotes=b.upvotes,y())}catch{i?(I.add(n),u&&(u.upvotes=(u.upvotes||0)+1)):(I.delete(n),u&&(u.upvotes=Math.max(0,(u.upvotes||1)-1))),y()}}async function K(n,i,m,u,b=null){if(!(!n.trim()||!m.trim()))try{if(x=!0,T=null,y(),f){let l={id:`mock-${Date.now()}`,parentId:b,authorName:n.trim(),authorEmail:i,content:m.trim(),status:"approved",upvotes:0,createdAt:new Date().toISOString()};V(l.id),b?p.push(l):(p.unshift(l),C+=1),E+=1,S=null,x=!1,y();return}let a=await ne(g,{siteId:s,threadUrl:A,threadTitle:w,postAuthor:d,parentId:b,authorName:n,authorEmail:i,content:m,notifyOnReply:u});a.comment&&(V(a.comment.id),b?p.push(a.comment):(p.unshift(a.comment),C+=1),E+=1,S=null),x=!1,y()}catch(a){T=a.message||"Failed to post comment. Please try again.",x=!1,y()}}async function me(n,i){if(i.trim())try{if(x=!0,y(),f){let u=p.find(b=>b.id===n);u&&(u.content=i.trim(),u.isEdited=!0),j=null,x=!1,y();return}await ie(g,n,i.trim());let m=p.find(u=>u.id===n);m&&(m.content=i.trim(),m.isEdited=!0),j=null,x=!1,y()}catch(m){alert(m.message||"Failed to edit comment."),x=!1,y()}}async function ye(n){try{if(x=!0,y(),f){p=p.filter(i=>i.id!==n&&i.parentId!==n),E=p.length,C=p.filter(i=>!i.parentId).length,G(n),M=null,x=!1,y();return}await ae(g,n),p=p.filter(i=>i.id!==n&&i.parentId!==n),E=p.length,C=p.filter(i=>!i.parentId).length,G(n),M=null,x=!1,y()}catch{alert("Failed to delete comment. Please try again."),M=null,x=!1,y()}}function pe(n,i){let m=n.selectionStart,u=n.selectionEnd,b=n.value,a=b.substring(m,u),l="",o=0;switch(i){case"bold":l=a?`**${a}**`:"**bold text**",o=a?l.length:2;break;case"italic":l=a?`*${a}*`:"*italic text*",o=a?l.length:1;break;case"quote":a?l=a.split(`
`).map($=>`> ${$}`).join(`
`):l="> quote text",o=l.length;break;case"code":l=a?`\`${a}\``:"`code`",o=a?l.length:1;break;case"link":l=a?`[${a}](https://)`:"[link title](https://example.com)",o=l.length-1;break;default:return}n.value=b.substring(0,m)+l+b.substring(u),n.focus();let v=m+o;n.setSelectionRange(v,v),n.dispatchEvent(new Event("input",{bubbles:!0}))}function y(){let n=p.filter(u=>!u.parentId),i=ee(z),m=se();z.themeMode&&t&&t.setAttribute("data-theme",z.themeMode),c.innerHTML=`
      <style>${i}</style>
      <div class="nyuzi-container">
        ${z.showReactionsBar?te(_):""}

        <!-- Header -->
        <div class="nyuzi-header">
          <h3 class="nyuzi-title">
            Discussion
            <span class="nyuzi-badge">${E}</span>
          </h3>
        </div>

        <!-- Main Form -->
        <div class="nyuzi-form">
          ${T?`<div class="nyuzi-alert">
                   <span>\u26A0\uFE0F ${k(T)}</span>
                   <button class="nyuzi-action-btn" id="dismiss-error" style="color:#b91c1c;">\u2715</button>
                 </div>`:""}

          ${U("nyuzi-main-content")}
          <textarea class="nyuzi-textarea" id="nyuzi-main-content" maxlength="2000" placeholder="Share your thoughts or leave a question..." required></textarea>
          <div class="nyuzi-counter-row">
            <span id="nyuzi-char-count">0 / 2,000</span>
          </div>

          <div class="nyuzi-form-row">
            <div class="nyuzi-inputs">
              <input type="text" class="nyuzi-input" id="nyuzi-main-name" placeholder="Name *" value="${k(D)}" required />
              <input type="email" class="nyuzi-input" id="nyuzi-main-email" placeholder="Email (for reply alerts)" value="${k(P)}" />
            </div>
            <button class="nyuzi-submit-btn" id="nyuzi-main-submit" ${x?"disabled":""}>
              ${x?"Posting...":"Post Comment"}
            </button>
          </div>

          <label class="nyuzi-optin" id="nyuzi-optin-wrapper">
            <input type="checkbox" id="nyuzi-main-notify" checked />
            <span>Notify me via email when someone replies</span>
          </label>
        </div>

        <!-- Comments Stream -->
        ${N?`<div class="nyuzi-skeleton">
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
                 ${n.map(u=>J(u,p,{postAuthor:d,reactionType:z.reactionType,upvotedComments:I,activeReplyId:S,editingCommentId:j,confirmDeleteId:M,collapsedComments:q,myComments:m,isSubmitting:x,savedAuthorName:D,savedAuthorEmail:P})).join("")}
               </div>
               ${B?`<div class="nyuzi-pagination">
                        <button class="nyuzi-load-more-btn" id="nyuzi-load-more" ${H?"disabled":""}>
                          ${H?'<span class="nyuzi-spinner"></span> Loading comments...':`Load more comments (${Math.max(0,C-n.length)} remaining) \u2193`}
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
    `,ge()}function ge(){c.querySelectorAll(".nyuzi-reaction-pill").forEach(a=>{a.addEventListener("click",l=>{let o=l.currentTarget.getAttribute("data-reaction-key");_=_===o?null:o,y()})}),c.querySelectorAll(".nyuzi-format-btn").forEach(a=>{a.addEventListener("click",l=>{l.preventDefault();let o=l.currentTarget.getAttribute("data-action"),$=l.currentTarget.closest(".nyuzi-format-toolbar")?.getAttribute("data-target");if(!o||!$)return;let L=c.getElementById($);L&&pe(L,o)})});let n=c.getElementById("nyuzi-main-content"),i=c.getElementById("nyuzi-char-count");n&&i&&n.addEventListener("input",()=>{i.textContent=`${n.value.length} / 2,000`});let m=c.getElementById("dismiss-error");m&&m.addEventListener("click",()=>{T=null,y()});let u=c.getElementById("nyuzi-main-submit");u&&u.addEventListener("click",()=>{let a=c.getElementById("nyuzi-main-name"),l=c.getElementById("nyuzi-main-email"),o=c.getElementById("nyuzi-main-notify");if(!a.value.trim()){T="Please enter your name.",y();return}if(!n||!n.value.trim()){T="Comment content cannot be empty.",y();return}let v=a.value.trim(),$=l.value.trim()||null;Q(v,$),K(v,$,n.value.trim(),o?o.checked:!0,null)});let b=c.getElementById("nyuzi-load-more");b&&b.addEventListener("click",()=>{ue()}),c.querySelectorAll(".upvote-btn").forEach(a=>{a.addEventListener("click",l=>{let o=l.currentTarget.getAttribute("data-id");o&&de(o)})}),c.querySelectorAll(".reply-trigger").forEach(a=>{a.addEventListener("click",l=>{let o=l.currentTarget.getAttribute("data-id");S=S===o?null:o,j=null,M=null,y()})}),c.querySelectorAll(".cancel-reply").forEach(a=>{a.addEventListener("click",()=>{S=null,y()})}),c.querySelectorAll(".submit-reply").forEach(a=>{a.addEventListener("click",l=>{let o=l.currentTarget.getAttribute("data-parent-id");if(!o)return;let v=c.getElementById(`reply-name-${o}`),$=c.getElementById(`reply-email-${o}`),L=c.getElementById(`reply-content-${o}`);if(!v.value.trim()){alert("Please enter your name.");return}if(!L||!L.value.trim()){alert("Reply content cannot be empty.");return}let O=v.value.trim(),X=$?.value.trim()||null;Q(O,X),K(O,X,L.value.trim(),!0,o)})}),c.querySelectorAll(".edit-trigger").forEach(a=>{a.addEventListener("click",l=>{j=l.currentTarget.getAttribute("data-id"),S=null,M=null,y()})}),c.querySelectorAll(".cancel-edit").forEach(a=>{a.addEventListener("click",()=>{j=null,y()})}),c.querySelectorAll(".save-edit").forEach(a=>{a.addEventListener("click",l=>{let o=l.currentTarget.getAttribute("data-id");if(!o)return;let v=c.getElementById(`edit-content-${o}`);if(!v||!v.value.trim()){alert("Comment content cannot be empty.");return}me(o,v.value.trim())})}),c.querySelectorAll(".delete-trigger").forEach(a=>{a.addEventListener("click",l=>{M=l.currentTarget.getAttribute("data-id"),S=null,j=null,y()})}),c.querySelectorAll(".nyuzi-cancel-delete-btn").forEach(a=>{a.addEventListener("click",()=>{M=null,y()})}),c.querySelectorAll(".nyuzi-confirm-delete-btn").forEach(a=>{a.addEventListener("click",l=>{let o=l.currentTarget.getAttribute("data-id");o&&ye(o)})}),c.querySelectorAll(".nyuzi-collapse-btn").forEach(a=>{a.addEventListener("click",l=>{let o=l.currentTarget.getAttribute("data-id");o&&(q.has(o)?q.delete(o):q.add(o),y())})}),c.querySelectorAll(".copy-link-btn").forEach(a=>{a.addEventListener("click",async l=>{let o=l.currentTarget,v=o.getAttribute("data-id");if(!v)return;let L=`${window.location.href.split("#")[0]}#comment-${v}`;try{await navigator.clipboard.writeText(L);let O=o.innerHTML;o.innerHTML="\u2713 Copied!",o.style.color="var(--nyuzi-accent)",setTimeout(()=>{o.innerHTML=O,o.style.color=""},2e3)}catch{window.location.hash=`comment-${v}`}})})}window.addEventListener("hashchange",Z),ce()})();})();
//# sourceMappingURL=embed.js.map