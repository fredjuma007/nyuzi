"use strict";(()=>{function xe(e){if(!e||typeof e!="string"||!e.startsWith("#"))return!1;let r=e.replace("#","");if(r.length!==6&&r.length!==3)return!1;let t=parseInt(r.length===3?r[0]+r[0]:r.slice(0,2),16),a=parseInt(r.length===3?r[1]+r[1]:r.slice(2,4),16),z=parseInt(r.length===3?r[2]+r[2]:r.slice(4,6),16);return(t*299+a*587+z*114)/1e3>155}function ie(e){let{accent:r,bg:t,cardBg:a,textColor:z,textSecondary:g,borderColor:p,inputBg:h,radius:x="0.75rem",themeMode:H,bgMode:E}=e,d=xe(a);return`
    :host {
      --nyuzi-accent: ${r||"#f56220"};
      --nyuzi-accent-hover: color-mix(in srgb, var(--nyuzi-accent) 80%, black);
      --nyuzi-accent-soft: color-mix(in srgb, var(--nyuzi-accent) 12%, transparent);
      --nyuzi-accent-border: color-mix(in srgb, var(--nyuzi-accent) 30%, transparent);

      --nyuzi-bg: ${t||(E==="card"?"#f8fafc":"transparent")};
      --nyuzi-card-bg: ${a||"#ffffff"};
      --nyuzi-text-primary: ${z||"#0f172a"};
      --nyuzi-text-secondary: ${g||"#475569"};
      --nyuzi-text-muted: #94a3b8;
      --nyuzi-border: ${p||"#e2e8f0"};
      --nyuzi-input-bg: ${h||"#f8fafc"};
      --nyuzi-reaction-bg: #ffffff;
      --nyuzi-reaction-border: #e2e8f0;
      --nyuzi-badge-bg: #f1f5f9;
      --nyuzi-badge-border: #e2e8f0;
      --nyuzi-thread-line: #e2e8f0;
      --nyuzi-avatar-bg: var(--nyuzi-accent-soft);
      --nyuzi-avatar-text: var(--nyuzi-accent);
      --nyuzi-radius: ${x};

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

    ${H==="sepia"?`
      :host {
        --nyuzi-bg: ${t||(E==="card"?"#f4ead8":"transparent")};
        --nyuzi-card-bg: ${a||"#fbf3e4"};
        --nyuzi-text-primary: ${z||"#2b2118"};
        --nyuzi-text-secondary: ${g||"#6a5949"};
        --nyuzi-text-muted: #968370;
        --nyuzi-border: ${p||"#e2d4bc"};
        --nyuzi-input-bg: ${h||"#fbf7ef"};
        --nyuzi-reaction-bg: #fbf7ef;
        --nyuzi-reaction-border: #e2d4bc;
        --nyuzi-badge-bg: #ece0cd;
        --nyuzi-badge-border: #e2d4bc;
        --nyuzi-thread-line: #e2d4bc;
        --nyuzi-avatar-bg: var(--nyuzi-accent-soft);
        --nyuzi-avatar-text: var(--nyuzi-accent);
      }
    `:""}

    ${H==="dark"?`
      :host {
        --nyuzi-bg: ${t||(E==="card"?"#090605":"transparent")};
        --nyuzi-card-bg: ${a||"#14100e"};
        --nyuzi-text-primary: ${z||(d?"#0f172a":"#f8fafc")};
        --nyuzi-text-secondary: ${g||(d?"#475569":"#cbd5e1")};
        --nyuzi-text-muted: #94a3b8;
        --nyuzi-border: ${p||(d?"#e2e8f0":"rgba(255, 255, 255, 0.12)")};
        --nyuzi-input-bg: ${h||(d?"#ffffff":"#181412")};
        --nyuzi-reaction-bg: ${d?"#ffffff":"rgba(255, 255, 255, 0.05)"};
        --nyuzi-reaction-border: ${d?"#e2e8f0":"rgba(255, 255, 255, 0.1)"};
        --nyuzi-badge-bg: ${d?"#f1f5f9":"rgba(255, 255, 255, 0.08)"};
        --nyuzi-badge-border: ${d?"#e2e8f0":"rgba(255, 255, 255, 0.12)"};
        --nyuzi-thread-line: ${d?"#e2e8f0":"rgba(255, 255, 255, 0.12)"};
        --nyuzi-avatar-bg: var(--nyuzi-accent-soft);
        --nyuzi-avatar-text: var(--nyuzi-accent);
      }
    `:""}

    ${H==="auto"?`
      @media (prefers-color-scheme: dark) {
        :host {
          --nyuzi-bg: ${t||(E==="card"?"#090605":"transparent")};
          --nyuzi-card-bg: ${a||"#14100e"};
          --nyuzi-text-primary: ${z||(d?"#0f172a":"#f8fafc")};
          --nyuzi-text-secondary: ${g||(d?"#475569":"#cbd5e1")};
          --nyuzi-text-muted: #94a3b8;
          --nyuzi-border: ${p||(d?"#e2e8f0":"rgba(255, 255, 255, 0.12)")};
          --nyuzi-input-bg: ${h||(d?"#ffffff":"#181412")};
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
        --nyuzi-bg: ${t||(E==="card"?"#090605":"transparent")};
        --nyuzi-card-bg: ${a||"#14100e"};
        --nyuzi-text-primary: ${z||(d?"#0f172a":"#f8fafc")};
        --nyuzi-text-secondary: ${g||(d?"#475569":"#cbd5e1")};
        --nyuzi-text-muted: #94a3b8;
        --nyuzi-border: ${p||(d?"#e2e8f0":"rgba(255, 255, 255, 0.12)")};
        --nyuzi-input-bg: ${h||(d?"#ffffff":"#181412")};
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
    ${E==="card"?`
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
  `}function $(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function we(e){let r=e.trim().split(/\s+/);return r.length===1?r[0].slice(0,2).toUpperCase():(r[0][0]+r[r.length-1][0]).toUpperCase()}function ke(e){try{let r=new Date(e),a=Math.floor((new Date().getTime()-r.getTime())/1e3);return a<60?"just now":a<3600?`${Math.floor(a/60)}m ago`:a<86400?`${Math.floor(a/3600)}h ago`:a<604800?`${Math.floor(a/86400)}d ago`:r.toLocaleDateString(void 0,{month:"short",day:"numeric"})}catch{return"recently"}}function $e(e,r){if(!e)return"";let t=$(e),a=r??["bold","italic","quote","code","link"];a.includes("code")&&(t=t.replace(/`([^`\n]+)`/g,"<code>$1</code>")),a.includes("bold")&&(t=t.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>")),a.includes("italic")&&(t=t.replace(/(^|[^*])\*([^*]+)\*([^*]|$)/g,"$1<em>$2</em>$3")),a.includes("link")?t=t.replace(/\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'):t=t.replace(/\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)/g,"$1 ($2)");let z=t.split(`
`),g=[],p=!1,h=[];for(let x of z)a.includes("quote")&&(x.startsWith("&gt; ")||x==="&gt;")?(p=!0,h.push(x.replace(/^&gt; ?/,""))):(p&&(g.push(`<blockquote>${h.join("<br/>")}</blockquote>`),h=[],p=!1),g.push(x));return p&&g.push(`<blockquote>${h.join("<br/>")}</blockquote>`),g.join(`
`).replace(/(<\/blockquote>)\n+/g,"$1").replace(/\n+(<blockquote>)/g,"$1").replace(/\n/g,"<br/>")}function Ae(e,r){return e==="upvote"?`<svg class="nyuzi-reaction-icon" viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" fill="${r?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`:e==="like"?`<svg class="nyuzi-reaction-icon nyuzi-like-icon" viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2" fill="${r?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12M15 10.5a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3v2.5M7 10l5-6v5h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7"/><path d="M7 10H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"/></svg>`:`<svg class="nyuzi-reaction-icon nyuzi-heart-icon" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="${r?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>`}function Ee(){return'<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>'}function Ce(){return'<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'}function Te(){return'<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>'}function Se(){return'<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>'}function Me(e,r){return e.upvotes>0?`${e.upvotes}`:r==="upvote"?"Upvote":"Like"}function Ie(e,r){if(!e)return!1;let t=e.trim().toLowerCase();return r&&t===r.trim().toLowerCase()?!0:t.includes("fred juma")||t.includes("brenda frenjo")||t.includes("sumeiya juma")}function _(e,r){let t=r&&r.length>0?r:["bold","italic","quote","code","link"],a=[];return t.includes("bold")&&a.push(`
      <button type="button" class="nyuzi-format-btn" data-action="bold" title="Bold (**text**)">
        <strong>B</strong>
      </button>`),t.includes("italic")&&a.push(`
      <button type="button" class="nyuzi-format-btn" data-action="italic" title="Italic (*text*)">
        <em>I</em>
      </button>`),t.includes("quote")&&a.push(`
      <button type="button" class="nyuzi-format-btn" data-action="quote" title="Quote (> text)">
        &ldquo;
      </button>`),t.includes("code")&&a.push(`
      <button type="button" class="nyuzi-format-btn" data-action="code" title="Inline Code (\`code\`)">
        &lt;/&gt;
      </button>`),t.includes("link")&&a.push(`
      <button type="button" class="nyuzi-format-btn" data-action="link" title="Link ([text](url))">
        <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
      </button>`),a.length===0?"":`
    <div class="nyuzi-format-toolbar" data-target="${e}">
      ${a.join("")}
    </div>
  `}function ae(e,r="How was this discussion?",t="general"){let g=t==="literary"?[{key:"coffee",emoji:"\u2615",label:"Thoughtful",count:21},{key:"book",emoji:"\u{1F4D6}",label:"Engrossing",count:28},{key:"lightbulb",emoji:"\u{1F4A1}",label:"Insight",count:14},{key:"heart",emoji:"\u2764\uFE0F",label:"Moved",count:19},{key:"clap",emoji:"\u{1F44F}",label:"Applause",count:16}]:[{key:"fire",emoji:"\u{1F525}",label:"Superb",count:18},{key:"heart",emoji:"\u2764\uFE0F",label:"Love",count:24},{key:"lightbulb",emoji:"\u{1F4A1}",label:"Insight",count:12},{key:"laugh",emoji:"\u{1F602}",label:"Laugh",count:7},{key:"clap",emoji:"\u{1F44F}",label:"Applause",count:15}];return`
    <div class="nyuzi-reactions-bar">
      <div class="nyuzi-reactions-prompt">${$(r||"How was this discussion?")}</div>
      <div class="nyuzi-reactions-grid">
        ${g.map(p=>`
          <div class="nyuzi-reaction-pill ${e===p.key?"active":""}" data-reaction-key="${p.key}">
            <div class="emoji-row">
              <span>${p.emoji}</span>
              <span class="reaction-count">${p.count+(e===p.key?1:0)}</span>
            </div>
            <span class="reaction-label">${p.label}</span>
          </div>
        `).join("")}
      </div>
    </div>
  `}function G(e,r,t){let a=r.filter(d=>d.parentId===e.id);a.sort((d,k)=>new Date(d.createdAt).getTime()-new Date(k.createdAt).getTime());let z=t.activeReplyId===e.id,g=t.editingCommentId===e.id,p=t.confirmDeleteId===e.id,h=t.collapsedComments.has(e.id),x=t.upvotedComments.has(e.id),H=t.myComments.has(e.id),E=e.isAuthor??Ie(e.authorName,t.postAuthor);return`
    <div class="nyuzi-comment" id="comment-${e.id}">
      <div class="nyuzi-avatar">${$(we(e.authorName))}</div>
      <div class="nyuzi-body">
        <div class="nyuzi-meta">
          <span class="nyuzi-author">${$(e.authorName)}</span>
          ${E?'<span class="nyuzi-author-badge">Author</span>':""}
          <span class="nyuzi-time">${ke(e.createdAt)}</span>
          ${e.isEdited?'<span class="nyuzi-edited-tag" title="Edited by reader">(edited)</span>':""}
        </div>

        ${g?`
            <div class="nyuzi-edit-box">
              ${_(`edit-content-${e.id}`,t.allowedFormatting)}
              <textarea class="nyuzi-textarea nyuzi-edit-textarea" id="edit-content-${e.id}" rows="3" maxlength="2000">${$(e.content)}</textarea>
              <div class="nyuzi-edit-actions">
                <button class="nyuzi-action-btn cancel-edit" data-id="${e.id}">Cancel</button>
                <button class="nyuzi-submit-btn save-edit" data-id="${e.id}" ${t.isSubmitting?"disabled":""}>
                  ${t.isSubmitting?"Saving...":"Save Changes"}
                </button>
              </div>
            </div>
          `:p?`
            <div class="nyuzi-confirm-pill">
              <span>Delete this comment?</span>
              <button class="nyuzi-confirm-delete-btn" data-id="${e.id}" ${t.isSubmitting?"disabled":""}>
                ${t.isSubmitting?"Deleting...":"Yes, Delete"}
              </button>
              <button class="nyuzi-cancel-delete-btn" data-id="${e.id}">Cancel</button>
            </div>
          `:`<div class="nyuzi-content">${$e(e.content,t.allowedFormatting)}</div>`}

        ${!g&&!p?`
          <div class="nyuzi-actions">
            <button class="nyuzi-action-btn upvote-btn ${x?"upvoted":""}" data-id="${e.id}" title="${x?"Unlike":"Like"}">
              ${Ae(t.reactionType,x)}
              <span>${Me(e,t.reactionType)}</span>
            </button>
            <button class="nyuzi-action-btn reply-trigger" data-id="${e.id}">
              ${Ee()}
              <span>Reply</span>
            </button>
            <button class="nyuzi-action-btn copy-link-btn" data-id="${e.id}" title="Copy direct link to this comment">
              ${Ce()}
              <span>Copy Link</span>
            </button>
            ${H?`
              <button class="nyuzi-action-btn edit-trigger" data-id="${e.id}" title="Edit your comment (15m grace window)">
                ${Te()}
                <span>Edit</span>
              </button>
              <button class="nyuzi-action-btn delete-trigger" data-id="${e.id}" title="Delete your comment">
                ${Se()}
                <span>Delete</span>
              </button>
            `:""}
          </div>
        `:""}

        ${z?`
            <div class="nyuzi-reply-box">
              ${_(`reply-content-${e.id}`,t.allowedFormatting)}
              <textarea class="nyuzi-textarea" id="reply-content-${e.id}" placeholder="Reply to ${$(e.authorName)}..." maxlength="2000" required></textarea>
              <div class="nyuzi-form-row">
                <div class="nyuzi-inputs">
                  <input type="text" class="nyuzi-input" id="reply-name-${e.id}" placeholder="Your Name *" value="${$(t.savedAuthorName)}" required />
                  <input type="email" class="nyuzi-input" id="reply-email-${e.id}" placeholder="Email (for reply alerts)" value="${$(t.savedAuthorEmail)}" />
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

        ${a.length>0?`
          <div class="nyuzi-replies-wrapper">
            <button class="nyuzi-collapse-btn" data-id="${e.id}" title="${h?"Expand replies":"Collapse replies"}">
              <svg class="nyuzi-collapse-chevron ${h?"collapsed":""}" viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              <span>${h?`Show ${a.length} ${a.length===1?"reply":"replies"}`:`Hide ${a.length} ${a.length===1?"reply":"replies"}`}</span>
            </button>
            ${h?"":`
              <div class="nyuzi-replies">
                ${a.map(d=>G(d,r,t)).join("")}
              </div>
            `}
          </div>
        `:""}
      </div>
    </div>
  `}async function Q(e,r,t,a,z,g){let p=g?`&highlight=${encodeURIComponent(g)}`:"",h=`${e}/api/v1/comments?siteId=${encodeURIComponent(r)}&threadUrl=${encodeURIComponent(t)}&page=${a}&limit=${z}${p}`,x=await fetch(h);if(!x.ok)throw new Error(`HTTP ${x.status}`);return x.json()}async function oe(e,r){let t=await fetch(`${e}/api/v1/comments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!t.ok){let a=await t.json().catch(()=>({}));throw new Error(a.error||`HTTP ${t.status}`)}return t.json()}async function se(e,r,t){let a=await fetch(`${e}/api/v1/comments/${encodeURIComponent(r)}/upvote`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:t})});if(!a.ok)throw new Error("Vote action failed");return a.json()}async function le(e,r,t){let a=await fetch(`${e}/api/v1/comments/${encodeURIComponent(r)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:t})});if(!a.ok){let z=await a.json().catch(()=>({}));throw new Error(z.error||`HTTP ${a.status}`)}return a.json()}async function ce(e,r){let t=await fetch(`${e}/api/v1/comments/${encodeURIComponent(r)}`,{method:"DELETE"});if(!t.ok)throw new Error("Delete action failed");return t.json()}(function(){let e=document.currentScript,r=document.getElementById("nyuzi-comments")||document.querySelector("nyuzi-comments");if(!r){console.warn("[Nyuzi] No container found (#nyuzi-comments or <nyuzi-comments>).");return}let t=r,a=e?.getAttribute("data-site-id")||t.getAttribute("data-site-id")||document.querySelector("[data-nyuzi-site-id]")?.getAttribute("data-nyuzi-site-id")||"",z=e?.getAttribute("data-api")||t.getAttribute("data-api")||"https://nyuzi-api.fredjuma8.workers.dev",g=e?.getAttribute("data-mock")==="true"||t.getAttribute("data-mock")==="true",p=e?.getAttribute("data-reactions-bar")??t.getAttribute("data-reactions-bar"),h=p===null?!0:p!=="false",x=e?.getAttribute("data-reactions-prompt")||t.getAttribute("data-reactions-prompt")||"How was this discussion?",H=e?.getAttribute("data-reactions-preset")||t.getAttribute("data-reactions-preset")||"general",d=(e?.getAttribute("data-formatting")||t.getAttribute("data-formatting")||"bold,italic,quote,code,link").split(",").map(n=>n.trim().toLowerCase()).filter(Boolean),k={accent:e?.getAttribute("data-accent-color")||t.getAttribute("data-accent-color")||"#f56220",bg:e?.getAttribute("data-bg-color")||t.getAttribute("data-bg-color")||"",cardBg:e?.getAttribute("data-card-bg")||t.getAttribute("data-card-bg")||"",textColor:e?.getAttribute("data-text-color")||t.getAttribute("data-text-color")||"",textSecondary:e?.getAttribute("data-text-secondary")||t.getAttribute("data-text-secondary")||"",borderColor:e?.getAttribute("data-border-color")||t.getAttribute("data-border-color")||"",inputBg:e?.getAttribute("data-input-bg")||t.getAttribute("data-input-bg")||"",radius:e?.getAttribute("data-radius")||t.getAttribute("data-radius")||"0.75rem",reactionType:e?.getAttribute("data-reaction")||t.getAttribute("data-reaction")||"like",themeMode:e?.getAttribute("data-theme")||t.getAttribute("data-theme")||"auto",bgMode:e?.getAttribute("data-bg")||t.getAttribute("data-bg")||"transparent",showReactionsBar:h,reactionsPrompt:x,reactionsPreset:H,allowedFormatting:d},y=t.shadowRoot||t.attachShadow({mode:"open"});y.innerHTML="",k.themeMode&&t.setAttribute("data-theme",k.themeMode);let J=e?.getAttribute("data-thread-url")||t.getAttribute("data-thread-url")||window.location.href.split("#")[0],ue=e?.getAttribute("data-thread-title")||t.getAttribute("data-thread-title")||document.title||"Discussion",Y=e?.getAttribute("data-author-name")||t.getAttribute("data-author-name")||"",b=[],C=0,T=0,W=1,Z=15,P=!1,N=!1,B=!0,S=null,M=null,R=null,I=null,w=!1,V=null,L=new Set,D=new Set,q="nyuzi_reader_ownership",de=900*1e3;function K(n){try{let i=localStorage.getItem(q),u=i?JSON.parse(i):{};u[n]=Date.now()+de,localStorage.setItem(q,JSON.stringify(u))}catch{}}function X(n){try{let i=localStorage.getItem(q);if(i){let u=JSON.parse(i);delete u[n],localStorage.setItem(q,JSON.stringify(u))}}catch{}}function me(){let n=new Set;try{let i=localStorage.getItem(q);if(i){let u=JSON.parse(i),c=Date.now();for(let[f,o]of Object.entries(u))c<o&&n.add(f)}}catch{}return g&&n.add("mock-3"),n}try{let n=sessionStorage.getItem("nyuzi_upvotes");n&&JSON.parse(n).forEach(i=>L.add(i))}catch{}let F="",O="";try{F=localStorage.getItem("nyuzi_author_name")||"",O=localStorage.getItem("nyuzi_author_email")||""}catch{}function ee(n,i){n&&(F=n),i&&(O=i);try{n&&localStorage.setItem("nyuzi_author_name",n),i&&localStorage.setItem("nyuzi_author_email",i)}catch{}}function ye(){return[{id:"mock-1",parentId:null,authorName:Y||"Fred Juma",authorEmail:"fredjuma8@gmail.com",content:`Welcome to our literary salon! **The Reading Circle** invites your reflections on this essay:

> "A reader lives a thousand lives before he dies. The man who never reads lives only one."

Feel free to share your thoughts, quote your favorite passages, or reply to fellow readers below.`,status:"approved",upvotes:14,createdAt:new Date(Date.now()-36e5*2).toISOString(),isAuthor:!0},{id:"mock-2",parentId:"mock-1",authorName:"Brenda Frenjo",authorEmail:"readingcircle254@gmail.com",content:"The second chapter in particular felt so poignant. The pacing and character progression really resonated with what we discussed during Sunday's book circle session!",status:"approved",upvotes:8,createdAt:new Date(Date.now()-36e5).toISOString(),isAuthor:!0},{id:"mock-3",parentId:null,authorName:"Amina Odhiambo",authorEmail:"amina@example.com",content:"Reading this made me pause and reflect on how we consume stories in the digital age. Check out this related discussion on [Bookish Perspectives](https://readingcircle254.com/blog)!",status:"approved",upvotes:5,createdAt:new Date(Date.now()-18e5).toISOString()}]}function te(){let n=window.location.hash;n&&n.startsWith("#comment-")&&setTimeout(()=>{let i=y.querySelector(n);i&&(i.scrollIntoView({behavior:"smooth",block:"center"}),i.classList.add("nyuzi-highlight"),setTimeout(()=>i.classList.remove("nyuzi-highlight"),3500))},200)}async function ge(){if(g){b=ye(),C=b.length,T=b.filter(n=>!n.parentId).length,B=!1,m();return}try{B=!0,W=1,m();let n=window.location.hash,i=n&&n.startsWith("#comment-")?n.replace("#comment-",""):"",u=await Q(z,a,J,1,Z,i);b=u.comments||[],C=u.total||(u.pagination?.totalComments??b.length),T=u.pagination?.totalTopLevel??b.filter(c=>!c.parentId).length,P=u.pagination?.hasMore??!1,B=!1,m(),te()}catch(n){console.error("[Nyuzi] Failed to load comments:",n),B=!1,S="Unable to connect to comments server.",m()}}async function pe(){if(!(N||!P||g))try{N=!0,m();let n=W+1,i=await Q(z,a,J,n,Z),u=i.comments||[],c=new Set(b.map(f=>f.id));for(let f of u)c.has(f.id)||b.push(f);W=n,P=i.pagination?.hasMore??!1,T=i.pagination?.totalTopLevel??T,C=i.pagination?.totalComments??C,N=!1,m()}catch(n){console.error("[Nyuzi] Error loading more comments:",n),N=!1,m()}}async function be(n){let i=L.has(n),u=i?"unvote":"upvote",c=b.find(f=>f.id===n);i?(L.delete(n),c&&(c.upvotes=Math.max(0,(c.upvotes||1)-1))):(L.add(n),c&&(c.upvotes=(c.upvotes||0)+1));try{sessionStorage.setItem("nyuzi_upvotes",JSON.stringify(Array.from(L)))}catch{}if(m(),!g)try{let f=await se(z,n,u);c&&typeof f.upvotes=="number"&&(c.upvotes=f.upvotes,m())}catch{i?(L.add(n),c&&(c.upvotes=(c.upvotes||0)+1)):(L.delete(n),c&&(c.upvotes=Math.max(0,(c.upvotes||1)-1))),m()}}async function ne(n,i,u,c,f=null){if(!(!n.trim()||!u.trim()))try{if(w=!0,S=null,m(),g){let l={id:`mock-${Date.now()}`,parentId:f,authorName:n.trim(),authorEmail:i,content:u.trim(),status:"approved",upvotes:0,createdAt:new Date().toISOString()};K(l.id),f?b.push(l):(b.unshift(l),T+=1),C+=1,M=null,w=!1,m();return}let o=await oe(z,{siteId:a,threadUrl:J,threadTitle:ue,postAuthor:Y,parentId:f,authorName:n,authorEmail:i,content:u,notifyOnReply:c});o.comment&&(K(o.comment.id),f?b.push(o.comment):(b.unshift(o.comment),T+=1),C+=1,M=null),w=!1,m()}catch(o){S=o.message||"Failed to post comment. Please try again.",w=!1,m()}}async function fe(n,i){if(i.trim())try{if(w=!0,m(),g){let c=b.find(f=>f.id===n);c&&(c.content=i.trim(),c.isEdited=!0),R=null,w=!1,m();return}await le(z,n,i.trim());let u=b.find(c=>c.id===n);u&&(u.content=i.trim(),u.isEdited=!0),R=null,w=!1,m()}catch(u){alert(u.message||"Failed to edit comment."),w=!1,m()}}async function ze(n){try{if(w=!0,m(),g){b=b.filter(i=>i.id!==n&&i.parentId!==n),C=b.length,T=b.filter(i=>!i.parentId).length,X(n),I=null,w=!1,m();return}await ce(z,n),b=b.filter(i=>i.id!==n&&i.parentId!==n),C=b.length,T=b.filter(i=>!i.parentId).length,X(n),I=null,w=!1,m()}catch{alert("Failed to delete comment. Please try again."),I=null,w=!1,m()}}function he(n,i){let u=n.selectionStart,c=n.selectionEnd,f=n.value,o=f.substring(u,c),l="",s=0;switch(i){case"bold":l=o?`**${o}**`:"**bold text**",s=o?l.length:2;break;case"italic":l=o?`*${o}*`:"*italic text*",s=o?l.length:1;break;case"quote":o?l=o.split(`
`).map(A=>`> ${A}`).join(`
`):l="> quote text",s=l.length;break;case"code":l=o?`\`${o}\``:"`code`",s=o?l.length:1;break;case"link":l=o?`[${o}](https://)`:"[link title](https://example.com)",s=l.length-1;break;default:return}n.value=f.substring(0,u)+l+f.substring(c),n.focus();let v=u+s;n.setSelectionRange(v,v),n.dispatchEvent(new Event("input",{bubbles:!0}))}function m(){let n=b.filter(c=>!c.parentId),i=ie(k),u=me();k.themeMode&&t&&t.setAttribute("data-theme",k.themeMode),y.innerHTML=`
      <style>${i}</style>
      <div class="nyuzi-container">
        ${k.showReactionsBar?ae(V,k.reactionsPrompt,k.reactionsPreset):""}

        <!-- Header -->
        <div class="nyuzi-header">
          <h3 class="nyuzi-title">
            Discussion
            <span class="nyuzi-badge">${C}</span>
          </h3>
        </div>

        <!-- Main Form -->
        <div class="nyuzi-form">
          ${S?`<div class="nyuzi-alert">
                   <span>\u26A0\uFE0F ${$(S)}</span>
                   <button class="nyuzi-action-btn" id="dismiss-error" style="color:#b91c1c;">\u2715</button>
                 </div>`:""}

          ${_("nyuzi-main-content",k.allowedFormatting)}
          <textarea class="nyuzi-textarea" id="nyuzi-main-content" maxlength="2000" placeholder="Share your thoughts or leave a question..." required></textarea>
          <div class="nyuzi-counter-row">
            <span id="nyuzi-char-count">0 / 2,000</span>
          </div>

          <div class="nyuzi-form-row">
            <div class="nyuzi-inputs">
              <input type="text" class="nyuzi-input" id="nyuzi-main-name" placeholder="Name *" value="${$(F)}" required />
              <input type="email" class="nyuzi-input" id="nyuzi-main-email" placeholder="Email (for reply alerts)" value="${$(O)}" />
            </div>
            <button class="nyuzi-submit-btn" id="nyuzi-main-submit" ${w?"disabled":""}>
              ${w?"Posting...":"Post Comment"}
            </button>
          </div>

          <label class="nyuzi-optin" id="nyuzi-optin-wrapper">
            <input type="checkbox" id="nyuzi-main-notify" checked />
            <span>Notify me via email when someone replies</span>
          </label>
        </div>

        <!-- Comments Stream -->
        ${B?`<div class="nyuzi-skeleton">
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
                 ${n.map(c=>G(c,b,{postAuthor:Y,reactionType:k.reactionType,upvotedComments:L,activeReplyId:M,editingCommentId:R,confirmDeleteId:I,collapsedComments:D,myComments:u,isSubmitting:w,savedAuthorName:F,savedAuthorEmail:O,allowedFormatting:k.allowedFormatting})).join("")}
               </div>
               ${P?`<div class="nyuzi-pagination">
                        <button class="nyuzi-load-more-btn" id="nyuzi-load-more" ${N?"disabled":""}>
                          ${N?'<span class="nyuzi-spinner"></span> Loading comments...':`Load more comments (${Math.max(0,T-n.length)} remaining) \u2193`}
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
    `,ve()}function ve(){y.querySelectorAll(".nyuzi-reaction-pill").forEach(o=>{o.addEventListener("click",l=>{let s=l.currentTarget.getAttribute("data-reaction-key");V=V===s?null:s,m()})}),y.querySelectorAll(".nyuzi-format-btn").forEach(o=>{o.addEventListener("click",l=>{l.preventDefault();let s=l.currentTarget.getAttribute("data-action"),A=l.currentTarget.closest(".nyuzi-format-toolbar")?.getAttribute("data-target");if(!s||!A)return;let j=y.getElementById(A);j&&he(j,s)})});let n=y.getElementById("nyuzi-main-content"),i=y.getElementById("nyuzi-char-count");n&&i&&n.addEventListener("input",()=>{i.textContent=`${n.value.length} / 2,000`});let u=y.getElementById("dismiss-error");u&&u.addEventListener("click",()=>{S=null,m()});let c=y.getElementById("nyuzi-main-submit");c&&c.addEventListener("click",()=>{let o=y.getElementById("nyuzi-main-name"),l=y.getElementById("nyuzi-main-email"),s=y.getElementById("nyuzi-main-notify");if(!o.value.trim()){S="Please enter your name.",m();return}if(!n||!n.value.trim()){S="Comment content cannot be empty.",m();return}let v=o.value.trim(),A=l.value.trim()||null;ee(v,A),ne(v,A,n.value.trim(),s?s.checked:!0,null)});let f=y.getElementById("nyuzi-load-more");f&&f.addEventListener("click",()=>{pe()}),y.querySelectorAll(".upvote-btn").forEach(o=>{o.addEventListener("click",l=>{let s=l.currentTarget.getAttribute("data-id");s&&be(s)})}),y.querySelectorAll(".reply-trigger").forEach(o=>{o.addEventListener("click",l=>{let s=l.currentTarget.getAttribute("data-id");M=M===s?null:s,R=null,I=null,m()})}),y.querySelectorAll(".cancel-reply").forEach(o=>{o.addEventListener("click",()=>{M=null,m()})}),y.querySelectorAll(".submit-reply").forEach(o=>{o.addEventListener("click",l=>{let s=l.currentTarget.getAttribute("data-parent-id");if(!s)return;let v=y.getElementById(`reply-name-${s}`),A=y.getElementById(`reply-email-${s}`),j=y.getElementById(`reply-content-${s}`);if(!v.value.trim()){alert("Please enter your name.");return}if(!j||!j.value.trim()){alert("Reply content cannot be empty.");return}let U=v.value.trim(),re=A?.value.trim()||null;ee(U,re),ne(U,re,j.value.trim(),!0,s)})}),y.querySelectorAll(".edit-trigger").forEach(o=>{o.addEventListener("click",l=>{R=l.currentTarget.getAttribute("data-id"),M=null,I=null,m()})}),y.querySelectorAll(".cancel-edit").forEach(o=>{o.addEventListener("click",()=>{R=null,m()})}),y.querySelectorAll(".save-edit").forEach(o=>{o.addEventListener("click",l=>{let s=l.currentTarget.getAttribute("data-id");if(!s)return;let v=y.getElementById(`edit-content-${s}`);if(!v||!v.value.trim()){alert("Comment content cannot be empty.");return}fe(s,v.value.trim())})}),y.querySelectorAll(".delete-trigger").forEach(o=>{o.addEventListener("click",l=>{I=l.currentTarget.getAttribute("data-id"),M=null,R=null,m()})}),y.querySelectorAll(".nyuzi-cancel-delete-btn").forEach(o=>{o.addEventListener("click",()=>{I=null,m()})}),y.querySelectorAll(".nyuzi-confirm-delete-btn").forEach(o=>{o.addEventListener("click",l=>{let s=l.currentTarget.getAttribute("data-id");s&&ze(s)})}),y.querySelectorAll(".nyuzi-collapse-btn").forEach(o=>{o.addEventListener("click",l=>{let s=l.currentTarget.getAttribute("data-id");s&&(D.has(s)?D.delete(s):D.add(s),m())})}),y.querySelectorAll(".copy-link-btn").forEach(o=>{o.addEventListener("click",async l=>{let s=l.currentTarget,v=s.getAttribute("data-id");if(!v)return;let j=`${window.location.href.split("#")[0]}#comment-${v}`;try{await navigator.clipboard.writeText(j);let U=s.innerHTML;s.innerHTML="\u2713 Copied!",s.style.color="var(--nyuzi-accent)",setTimeout(()=>{s.innerHTML=U,s.style.color=""},2e3)}catch{window.location.hash=`comment-${v}`}})})}window.addEventListener("hashchange",te),ge()})();})();
//# sourceMappingURL=embed.js.map