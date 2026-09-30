"use strict";(()=>{function He(n){if(!n||typeof n!="string"||!n.startsWith("#"))return!1;let a=n.replace("#","");if(a.length!==6&&a.length!==3)return!1;let t=parseInt(a.length===3?a[0]+a[0]:a.slice(0,2),16),l=parseInt(a.length===3?a[1]+a[1]:a.slice(2,4),16),w=parseInt(a.length===3?a[2]+a[2]:a.slice(4,6),16);return(t*299+l*587+w*114)/1e3>155}function fe(n){let{accent:a,bg:t,cardBg:l,textColor:w,textSecondary:v,borderColor:A,inputBg:k,radius:E="0.75rem",themeMode:O,bgMode:Y,resolvedTheme:M=O==="auto"?"dark":O,isCardIsolated:R=!1}=n,f=M||"dark",S=He(l);return`
    :host {
      --nyuzi-accent: ${a||"#f56220"};
      --nyuzi-accent-hover: color-mix(in srgb, var(--nyuzi-accent) 80%, black);
      --nyuzi-accent-soft: color-mix(in srgb, var(--nyuzi-accent) 12%, transparent);
      --nyuzi-accent-border: color-mix(in srgb, var(--nyuzi-accent) 30%, transparent);

      --nyuzi-bg: ${R?f==="light"?"#ffffff":"#090605":t||(Y==="card"?f==="dark"?"#090605":"#f8fafc":"transparent")};
      --nyuzi-card-bg: ${l||(f==="dark"?"#14100e":f==="sepia"?"#fbf3e4":"#ffffff")};
      --nyuzi-text-primary: ${w||(f==="dark"?S?"#0f172a":"#f8fafc":f==="sepia"?"#2b2118":"#0f172a")};
      --nyuzi-text-secondary: ${v||(f==="dark"?S?"#475569":"#cbd5e1":f==="sepia"?"#6a5949":"#475569")};
      --nyuzi-text-muted: ${f==="sepia"?"#968370":"#94a3b8"};
      --nyuzi-border: ${A||(f==="dark"?S?"#e2e8f0":"rgba(255, 255, 255, 0.12)":f==="sepia"?"#e2d4bc":"#e2e8f0")};
      --nyuzi-input-bg: ${k||(f==="dark"?S?"#ffffff":"#181412":f==="sepia"?"#fbf7ef":"#f8fafc")};
      --nyuzi-reaction-bg: ${f==="dark"?S?"#ffffff":"rgba(255, 255, 255, 0.05)":f==="sepia"?"#fbf7ef":"#ffffff"};
      --nyuzi-reaction-border: ${f==="dark"?S?"#e2e8f0":"rgba(255, 255, 255, 0.1)":f==="sepia"?"#e2d4bc":"#e2e8f0"};
      --nyuzi-badge-bg: ${f==="dark"?S?"#f1f5f9":"rgba(255, 255, 255, 0.08)":f==="sepia"?"#ece0cd":"#f1f5f9"};
      --nyuzi-badge-border: ${f==="dark"?S?"#e2e8f0":"rgba(255, 255, 255, 0.12)":f==="sepia"?"#e2d4bc":"#e2e8f0"};
      --nyuzi-thread-line: ${f==="dark"?S?"#e2e8f0":"rgba(255, 255, 255, 0.12)":f==="sepia"?"#e2d4bc":"#e2e8f0"};
      --nyuzi-avatar-bg: var(--nyuzi-accent-soft);
      --nyuzi-avatar-text: var(--nyuzi-accent);
      --nyuzi-radius: ${E};

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
      padding: ${R?"1.5rem 1.25rem":"0.75rem 0.5rem"};
      ${R?f==="light"?`
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
    .nyuzi-format-toolbar {
      position: relative;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      margin-bottom: 0.4rem;
    }
    .nyuzi-format-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      border-radius: 0.375rem;
      border: 1px solid transparent;
      background: transparent;
      color: var(--nyuzi-text-secondary);
      font-size: 0.8125rem;
      cursor: pointer;
      transition: all 0.15s;
      user-select: none;
      padding: 0;
    }
    .nyuzi-format-btn:hover {
      background: var(--nyuzi-reaction-bg);
      border-color: var(--nyuzi-border);
      color: var(--nyuzi-text-primary);
    }
    .nyuzi-emoji-popover {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      z-index: 1000;
      border-radius: var(--nyuzi-radius);
      box-shadow: 0 16px 40px -6px rgba(0, 0, 0, 0.45), 0 4px 12px rgba(0, 0, 0, 0.2);
      border: 1px solid var(--nyuzi-border);
      background: var(--nyuzi-card-bg);
      overflow: hidden;
      max-width: 340px;
      width: calc(100vw - 2.5rem);
      animation: nyuziFadeDown 0.15s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes nyuziFadeDown {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .nyuzi-emoji-loading {
      padding: 2.5rem 1rem;
      text-align: center;
      font-size: 0.8125rem;
      color: var(--nyuzi-text-secondary);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }
    emoji-picker {
      width: 100%;
      height: 330px;
      --background: var(--nyuzi-card-bg);
      --border-color: var(--nyuzi-border);
      --input-border-color: var(--nyuzi-border);
      --input-placeholder-color: var(--nyuzi-text-muted);
      --outline-color: var(--nyuzi-accent);
      --indicator-color: var(--nyuzi-accent);
      --category-emoji-size: 1.15rem;
      font-family: inherit;
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
    ${Y==="card"?`
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
  `}function T(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function Ne(n){let a=n.trim().split(/\s+/);return a.length===1?a[0].slice(0,2).toUpperCase():(a[0][0]+a[a.length-1][0]).toUpperCase()}function Pe(n){try{let a=new Date(n),l=Math.floor((new Date().getTime()-a.getTime())/1e3);return l<60?"just now":l<3600?`${Math.floor(l/60)}m ago`:l<86400?`${Math.floor(l/3600)}h ago`:l<604800?`${Math.floor(l/86400)}d ago`:a.toLocaleDateString(void 0,{month:"short",day:"numeric"})}catch{return"recently"}}function qe(n,a){if(!n)return"";let t=T(n),l=a??["bold","italic","quote","code","link"];l.includes("code")&&(t=t.replace(/`([^`\n]+)`/g,"<code>$1</code>")),l.includes("bold")&&(t=t.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>")),l.includes("italic")&&(t=t.replace(/(^|[^*])\*([^*]+)\*([^*]|$)/g,"$1<em>$2</em>$3")),l.includes("link")?t=t.replace(/\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'):t=t.replace(/\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)/g,"$1 ($2)");let w=t.split(`
`),v=[],A=!1,k=[];for(let E of w)l.includes("quote")&&(E.startsWith("&gt; ")||E==="&gt;")?(A=!0,k.push(E.replace(/^&gt; ?/,""))):(A&&(v.push(`<blockquote>${k.join("<br/>")}</blockquote>`),k=[],A=!1),v.push(E));return A&&v.push(`<blockquote>${k.join("<br/>")}</blockquote>`),v.join(`
`).replace(/(<\/blockquote>)\n+/g,"$1").replace(/\n+(<blockquote>)/g,"$1").replace(/\n/g,"<br/>")}function Fe(n,a){return n==="upvote"?`<svg class="nyuzi-reaction-icon" viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" fill="${a?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`:n==="like"?`<svg class="nyuzi-reaction-icon nyuzi-like-icon" viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2" fill="${a?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12M15 10.5a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3v2.5M7 10l5-6v5h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7"/><path d="M7 10H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"/></svg>`:`<svg class="nyuzi-reaction-icon nyuzi-heart-icon" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="${a?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>`}function De(){return'<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>'}function Oe(){return'<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'}function _e(){return'<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>'}function Ue(){return'<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>'}function Je(n,a){return n.upvotes>0?`${n.upvotes}`:a==="upvote"?"Upvote":"Like"}function Ye(n,a){if(!n)return!1;let t=n.trim().toLowerCase();return a&&t===a.trim().toLowerCase()?!0:t.includes("fred juma")||t.includes("brenda frenjo")||t.includes("sumeiya juma")}function ne(n,a){let t=a&&a.length>0?a:["bold","italic","quote","code","link","emoji"],l=[];return t.includes("bold")&&l.push(`
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
      </button>`),t.includes("emoji")&&l.push(`
      <button type="button" class="nyuzi-format-btn nyuzi-emoji-btn" data-action="emoji" title="Insert Emoji">
        <span style="font-size: 0.95rem; line-height: 1; display: inline-block;">\u{1F600}</span>
      </button>`),l.length===0?"":`
    <div class="nyuzi-format-toolbar" data-target="${n}">
      ${l.join("")}
      <div class="nyuzi-emoji-popover" style="display: none;"></div>
    </div>
  `}function he(n,a="How was this discussion?",t="general",l){let A=t==="literary"?[{key:"coffee",emoji:"\u2615",label:"Thoughtful"},{key:"book",emoji:"\u{1F4D6}",label:"Engrossing"},{key:"lightbulb",emoji:"\u{1F4A1}",label:"Insight"},{key:"heart",emoji:"\u2764\uFE0F",label:"Moved"},{key:"clap",emoji:"\u{1F44F}",label:"Applause"}]:[{key:"fire",emoji:"\u{1F525}",label:"Superb"},{key:"heart",emoji:"\u2764\uFE0F",label:"Love"},{key:"lightbulb",emoji:"\u{1F4A1}",label:"Insight"},{key:"laugh",emoji:"\u{1F602}",label:"Laugh"},{key:"clap",emoji:"\u{1F44F}",label:"Applause"}];return`
    <div class="nyuzi-reactions-bar">
      <div class="nyuzi-reactions-prompt">${T(a||"How was this discussion?")}</div>
      <div class="nyuzi-reactions-grid">
        ${A.map(k=>{let E=Number(l?.[k.key])||0;return`
          <div class="nyuzi-reaction-pill ${n===k.key?"active":""}" data-reaction-key="${k.key}">
            <div class="emoji-row">
              <span>${k.emoji}</span>
              ${E>0?`<span class="reaction-count">${E}</span>`:""}
            </div>
            <span class="reaction-label">${k.label}</span>
          </div>
        `}).join("")}
      </div>
    </div>
  `}function oe(n,a,t){let l=a.filter(M=>M.parentId===n.id);l.sort((M,R)=>new Date(M.createdAt).getTime()-new Date(R.createdAt).getTime());let w=t.activeReplyId===n.id,v=t.editingCommentId===n.id,A=t.confirmDeleteId===n.id,k=t.collapsedComments.has(n.id),E=t.upvotedComments.has(n.id),O=t.myComments.has(n.id),Y=n.isAuthor??Ye(n.authorName,t.postAuthor);return`
    <div class="nyuzi-comment" id="comment-${n.id}">
      <div class="nyuzi-avatar">${T(Ne(n.authorName))}</div>
      <div class="nyuzi-body">
        <div class="nyuzi-meta">
          <span class="nyuzi-author">${T(n.authorName)}</span>
          ${Y?'<span class="nyuzi-author-badge">Author</span>':""}
          <span class="nyuzi-time">${Pe(n.createdAt)}</span>
          ${n.isEdited?'<span class="nyuzi-edited-tag" title="Edited by reader">(edited)</span>':""}
        </div>

        ${v?`
            <div class="nyuzi-edit-box">
              ${ne(`edit-content-${n.id}`,t.allowedFormatting)}
              <textarea class="nyuzi-textarea nyuzi-edit-textarea" id="edit-content-${n.id}" rows="3" maxlength="2000">${T(n.content)}</textarea>
              <div class="nyuzi-edit-actions">
                <button class="nyuzi-action-btn cancel-edit" data-id="${n.id}">Cancel</button>
                <button class="nyuzi-submit-btn save-edit" data-id="${n.id}" ${t.isSubmitting?"disabled":""}>
                  ${t.isSubmitting?"Saving...":"Save Changes"}
                </button>
              </div>
            </div>
          `:A?`
            <div class="nyuzi-confirm-pill">
              <span>Delete this comment?</span>
              <button class="nyuzi-confirm-delete-btn" data-id="${n.id}" ${t.isSubmitting?"disabled":""}>
                ${t.isSubmitting?"Deleting...":"Yes, Delete"}
              </button>
              <button class="nyuzi-cancel-delete-btn" data-id="${n.id}">Cancel</button>
            </div>
          `:`<div class="nyuzi-content">${qe(n.content,t.allowedFormatting)}</div>`}

        ${!v&&!A?`
          <div class="nyuzi-actions">
            <button class="nyuzi-action-btn upvote-btn ${E?"upvoted":""}" data-id="${n.id}" title="${E?"Unlike":"Like"}">
              ${Fe(t.reactionType,E)}
              <span>${Je(n,t.reactionType)}</span>
            </button>
            <button class="nyuzi-action-btn reply-trigger" data-id="${n.id}">
              ${De()}
              <span>Reply</span>
            </button>
            <button class="nyuzi-action-btn copy-link-btn" data-id="${n.id}" title="Copy direct link to this comment">
              ${Oe()}
              <span>Copy Link</span>
            </button>
            ${O?`
              <button class="nyuzi-action-btn edit-trigger" data-id="${n.id}" title="Edit your comment (15m grace window)">
                ${_e()}
                <span>Edit</span>
              </button>
              <button class="nyuzi-action-btn delete-trigger" data-id="${n.id}" title="Delete your comment">
                ${Ue()}
                <span>Delete</span>
              </button>
            `:""}
          </div>
        `:""}

        ${w?`
            <div class="nyuzi-reply-box">
              ${ne(`reply-content-${n.id}`,t.allowedFormatting)}
              <textarea class="nyuzi-textarea" id="reply-content-${n.id}" placeholder="Reply to ${T(n.authorName)}..." maxlength="2000" required></textarea>
              <div class="nyuzi-form-row">
                <div class="nyuzi-inputs">
                  <input type="text" class="nyuzi-input" id="reply-name-${n.id}" placeholder="Your Name *" value="${T(t.savedAuthorName)}" required />
                  <input type="email" class="nyuzi-input" id="reply-email-${n.id}" placeholder="Email (for reply alerts)" value="${T(t.savedAuthorEmail)}" />
                </div>
                <div style="display:flex; gap:0.5rem; align-items:flex-end;">
                  <button class="nyuzi-action-btn cancel-reply" style="padding: 0.5rem 0.75rem;">Cancel</button>
                  <button class="nyuzi-submit-btn submit-reply" data-parent-id="${n.id}" ${t.isSubmitting?"disabled":""}>
                    ${t.isSubmitting?"Posting...":"Reply"}
                  </button>
                </div>
              </div>
            </div>
          `:""}

        ${l.length>0?`
          <div class="nyuzi-replies-wrapper">
            <button class="nyuzi-collapse-btn" data-id="${n.id}" title="${k?"Expand replies":"Collapse replies"}">
              <svg class="nyuzi-collapse-chevron ${k?"collapsed":""}" viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              <span>${k?`Show ${l.length} ${l.length===1?"reply":"replies"}`:`Hide ${l.length} ${l.length===1?"reply":"replies"}`}</span>
            </button>
            ${k?"":`
              <div class="nyuzi-replies">
                ${l.map(M=>oe(M,a,t)).join("")}
              </div>
            `}
          </div>
        `:""}
      </div>
    </div>
  `}async function ae(n,a,t,l,w,v){let A=v?`&highlight=${encodeURIComponent(v)}`:"",k=`${n}/api/v1/comments?siteId=${encodeURIComponent(a)}&threadUrl=${encodeURIComponent(t)}&page=${l}&limit=${w}${A}`,E=await fetch(k);if(!E.ok)throw new Error(`HTTP ${E.status}`);return E.json()}async function ve(n,a){let t=await fetch(`${n}/api/v1/comments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(!t.ok){let l=await t.json().catch(()=>({}));throw new Error(l.error||`HTTP ${t.status}`)}return t.json()}async function ze(n,a,t){let l=await fetch(`${n}/api/v1/comments/${encodeURIComponent(a)}/upvote`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:t})});if(!l.ok)throw new Error("Vote action failed");return l.json()}async function xe(n,a,t){let l=await fetch(`${n}/api/v1/comments/${encodeURIComponent(a)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:t})});if(!l.ok){let w=await l.json().catch(()=>({}));throw new Error(w.error||`HTTP ${l.status}`)}return l.json()}async function ke(n,a){let t=await fetch(`${n}/api/v1/comments/${encodeURIComponent(a)}`,{method:"DELETE"});if(!t.ok)throw new Error("Delete action failed");return t.json()}async function we(n,a){let t=await fetch(`${n}/api/v1/threads/react`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(!t.ok)throw new Error("Thread reaction failed");return t.json()}(function(){let n=document.currentScript,a=document.getElementById("nyuzi-comments")||document.querySelector("nyuzi-comments");if(!a){console.warn("[Nyuzi] No container found (#nyuzi-comments or <nyuzi-comments>).");return}let t=a;if(t.__nyuzi_initialized)return;t.__nyuzi_initialized=!0;let l=n?.getAttribute("data-site-id")||t.getAttribute("data-site-id")||document.querySelector("[data-nyuzi-site-id]")?.getAttribute("data-nyuzi-site-id")||"",w=n?.getAttribute("data-api")||t.getAttribute("data-api")||"https://nyuzi-api.fredjuma8.workers.dev",v=n?.getAttribute("data-mock")==="true"||t.getAttribute("data-mock")==="true",A=n?.getAttribute("data-reactions-bar")??t.getAttribute("data-reactions-bar"),k=A===null?!0:A!=="false",E=n?.getAttribute("data-reactions-prompt")||t.getAttribute("data-reactions-prompt")||"How was this discussion?",O=n?.getAttribute("data-reactions-preset")||t.getAttribute("data-reactions-preset")||"general",M=(n?.getAttribute("data-formatting")||t.getAttribute("data-formatting")||"bold,italic,quote,code,link,emoji").split(",").map(e=>e.trim().toLowerCase()).filter(Boolean),R=n?.src||"",f="https://nyuzi-yap.vercel.app";if(R)try{f=new URL(R).origin}catch{}let S=`${f}/emoji-picker.js`,_=!1,V=!1;function se(){return typeof customElements<"u"&&customElements.get("emoji-picker")?(_=!0,Promise.resolve()):_?Promise.resolve():new Promise((e,r)=>{let s=document.querySelector('script[src*="emoji-picker.js"]');if(s){if(customElements.get("emoji-picker"))return _=!0,e();s.addEventListener("load",()=>{_=!0,e()}),s.addEventListener("error",r);return}V=!0;let i=document.createElement("script");i.src=S,i.async=!0,i.onload=()=>{_=!0,V=!1,e()},i.onerror=d=>{V=!1,r(d)},document.head.appendChild(i)})}function le(){_||V||typeof customElements<"u"&&customElements.get("emoji-picker")||se().catch(()=>{})}function Ee(e,r){let s=e.selectionStart??e.value.length,i=e.selectionEnd??e.value.length,d=e.value;e.value=d.substring(0,s)+r+d.substring(i);let y=s+r.length;e.focus(),e.setSelectionRange(y,y),e.dispatchEvent(new Event("input",{bubbles:!0}))}let Ke=!!(n?.getAttribute("data-accent-color")||t.getAttribute("data-accent-color")),We=!!(n?.getAttribute("data-theme")||t.getAttribute("data-theme")),Ve=!!(n?.getAttribute("data-bg")||t.getAttribute("data-bg")),Ge=!!(n?.getAttribute("data-bg-color")||t.getAttribute("data-bg-color")),Qe=!!(n?.getAttribute("data-card-bg")||t.getAttribute("data-card-bg")),Ze=!!(n?.getAttribute("data-text-color")||t.getAttribute("data-text-color")),Xe=!!(n?.getAttribute("data-border-color")||t.getAttribute("data-border-color")),et=!!(n?.getAttribute("data-radius")||t.getAttribute("data-radius")),tt=!!(n?.getAttribute("data-reaction")||t.getAttribute("data-reaction")),nt=A!=null,rt=!!(n?.getAttribute("data-reactions-prompt")||t.getAttribute("data-reactions-prompt")),it=!!(n?.getAttribute("data-reactions-preset")||t.getAttribute("data-reactions-preset"));function Ae(){try{let e=document.documentElement,r=document.body,s=e.getAttribute("data-theme")||e.getAttribute("data-color-mode")||e.getAttribute("data-bs-theme")||"",i=r?.getAttribute("data-theme")||r?.getAttribute("data-color-mode")||r?.getAttribute("data-bs-theme")||"",d=`${s} ${i}`.toLowerCase();if(d.includes("dark"))return"dark";if(d.includes("light"))return"light";if(e.classList.contains("dark")||e.classList.contains("dark-theme")||e.classList.contains("dark-mode")||e.classList.contains("theme-dark")||!!(r&&(r.classList.contains("dark")||r.classList.contains("dark-theme")||r.classList.contains("dark-mode")||r.classList.contains("theme-dark"))))return"dark";if(e.classList.contains("light")||e.classList.contains("light-theme")||e.classList.contains("light-mode")||e.classList.contains("theme-light")||!!(r&&(r.classList.contains("light")||r.classList.contains("light-theme")||r.classList.contains("light-mode")||r.classList.contains("theme-light"))))return"light";let u=t.parentElement;for(;u&&u!==document.documentElement;){let o=window.getComputedStyle(u).backgroundColor;if(o&&o!=="transparent"&&!o.startsWith("rgba(0, 0, 0, 0)")){let m=o.match(/\d+/g);if(m&&m.length>=3){let x=parseInt(m[0],10),h=parseInt(m[1],10),L=parseInt(m[2],10);if((m.length>=4?parseFloat(m[3]):1)>.1)return(x*299+h*587+L*114)/1e3<130?"dark":"light"}}u=u.parentElement}if(r){let o=window.getComputedStyle(r).backgroundColor;if(o&&o!=="transparent"&&!o.startsWith("rgba(0, 0, 0, 0)")){let m=o.match(/\d+/g);if(m&&m.length>=3){let x=parseInt(m[0],10),h=parseInt(m[1],10),L=parseInt(m[2],10);return(x*299+h*587+L*114)/1e3<130?"dark":"light"}}}}catch{}return typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}let b={accent:n?.getAttribute("data-accent-color")||t.getAttribute("data-accent-color")||"#f56220",bg:n?.getAttribute("data-bg-color")||t.getAttribute("data-bg-color")||"",cardBg:n?.getAttribute("data-card-bg")||t.getAttribute("data-card-bg")||"",textColor:n?.getAttribute("data-text-color")||t.getAttribute("data-text-color")||"",textSecondary:n?.getAttribute("data-text-secondary")||t.getAttribute("data-text-secondary")||"",borderColor:n?.getAttribute("data-border-color")||t.getAttribute("data-border-color")||"",inputBg:n?.getAttribute("data-input-bg")||t.getAttribute("data-input-bg")||"",radius:n?.getAttribute("data-radius")||t.getAttribute("data-radius")||"0.75rem",reactionType:n?.getAttribute("data-reaction")||t.getAttribute("data-reaction")||"like",themeMode:n?.getAttribute("data-theme")||t.getAttribute("data-theme")||"auto",bgMode:n?.getAttribute("data-bg")||t.getAttribute("data-bg")||"transparent",showReactionsBar:k,reactionsPrompt:E,reactionsPreset:O,allowedFormatting:M},g=t.shadowRoot||t.attachShadow({mode:"open"});g.innerHTML="",b.themeMode&&t.setAttribute("data-theme",b.themeMode);let U=n?.getAttribute("data-thread-url")||t.getAttribute("data-thread-url")||window.location.href.split("#")[0],ce=n?.getAttribute("data-thread-title")||t.getAttribute("data-thread-title")||document.title||"Discussion",re=n?.getAttribute("data-author-name")||t.getAttribute("data-author-name")||"",z=[],j=0,I=0,ie=1,de=15,G=!1,J=!1,K=!0,H=null,N=null,F=null,P=null,$=!1,B=null,q=new Set,Q=new Set,Z=!1,X=`nyuzi_react_${l}_${encodeURIComponent(U)}`,ue=`nyuzi_counts_${l}_${encodeURIComponent(U)}`,C={...v?b.reactionsPreset==="literary"?{coffee:21,book:28,lightbulb:14,heart:19,clap:16}:{fire:18,heart:24,lightbulb:12,laugh:7,clap:15}:{}};try{let e=localStorage.getItem(X);e&&(B=e)}catch{}if(v)try{let e=localStorage.getItem(ue);e&&(C={...C,...JSON.parse(e)})}catch{}let W="nyuzi_reader_ownership",$e=900*1e3;function me(e){try{let r=localStorage.getItem(W),s=r?JSON.parse(r):{};s[e]=Date.now()+$e,localStorage.setItem(W,JSON.stringify(s))}catch{}}function pe(e){try{let r=localStorage.getItem(W);if(r){let s=JSON.parse(r);delete s[e],localStorage.setItem(W,JSON.stringify(s))}}catch{}}function Ce(){let e=new Set;try{let r=localStorage.getItem(W);if(r){let s=JSON.parse(r),i=Date.now();for(let[d,y]of Object.entries(s))i<y&&e.add(d)}}catch{}return v&&e.add("mock-3"),e}try{let e=sessionStorage.getItem("nyuzi_upvotes");e&&JSON.parse(e).forEach(r=>q.add(r))}catch{}let ee="",te="";try{ee=localStorage.getItem("nyuzi_author_name")||"",te=localStorage.getItem("nyuzi_author_email")||""}catch{}function ge(e,r){e&&(ee=e),r&&(te=r);try{e&&localStorage.setItem("nyuzi_author_name",e),r&&localStorage.setItem("nyuzi_author_email",r)}catch{}}function Te(){return[{id:"mock-1",parentId:null,authorName:re||"Fred Juma",authorEmail:"fredjuma8@gmail.com",content:`Welcome to our literary salon! **The Reading Circle** invites your reflections on this essay:

> "A reader lives a thousand lives before he dies. The man who never reads lives only one."

Feel free to share your thoughts, quote your favorite passages, or reply to fellow readers below.`,status:"approved",upvotes:14,createdAt:new Date(Date.now()-36e5*2).toISOString(),isAuthor:!0},{id:"mock-2",parentId:"mock-1",authorName:"Brenda Frenjo",authorEmail:"readingcircle254@gmail.com",content:"The second chapter in particular felt so poignant. The pacing and character progression really resonated with what we discussed during Sunday's book circle session!",status:"approved",upvotes:8,createdAt:new Date(Date.now()-36e5).toISOString(),isAuthor:!0},{id:"mock-3",parentId:null,authorName:"Amina Odhiambo",authorEmail:"amina@example.com",content:"Reading this made me pause and reflect on how we consume stories in the digital age. Check out this related discussion on [Bookish Perspectives](https://readingcircle254.com/blog)!",status:"approved",upvotes:5,createdAt:new Date(Date.now()-18e5).toISOString()}]}function ye(){let e=window.location.hash;e&&e.startsWith("#comment-")&&setTimeout(()=>{let r=g.querySelector(e);r&&(r.scrollIntoView({behavior:"smooth",block:"center"}),r.classList.add("nyuzi-highlight"),setTimeout(()=>r.classList.remove("nyuzi-highlight"),3500))},200)}async function Se(){if(v){z=Te(),j=z.length,I=z.filter(e=>!e.parentId).length,K=!1,p();return}try{K=!0,ie=1,p();let e=window.location.hash,r=e&&e.startsWith("#comment-")?e.replace("#comment-",""):"",s=await ae(w,l,U,1,de,r);if(z=s.comments||[],j=s.total||(s.pagination?.totalComments??z.length),I=s.pagination?.totalTopLevel??z.filter(i=>!i.parentId).length,G=s.pagination?.hasMore??!1,v||(C=s.thread?.reactions&&typeof s.thread.reactions=="object"?{...s.thread.reactions}:{}),s.siteSettings&&typeof s.siteSettings=="object"){let i=s.siteSettings;i.accentColor&&(b.accent=i.accentColor),i.themeMode&&(b.themeMode=i.themeMode),i.bgMode&&(b.bgMode=i.bgMode),i.canvasBg!==void 0&&i.canvasBg!==""&&(b.bg=i.canvasBg),i.cardBg!==void 0&&i.cardBg!==""&&(b.cardBg=i.cardBg),i.textColor!==void 0&&i.textColor!==""&&(b.textColor=i.textColor),i.borderColor!==void 0&&i.borderColor!==""&&(b.borderColor=i.borderColor),i.radiusValue&&(b.radius=i.radiusValue),i.reactionType&&(b.reactionType=i.reactionType),i.showReactionsBar!==void 0&&(b.showReactionsBar=!!i.showReactionsBar),i.reactionsPrompt&&(b.reactionsPrompt=i.reactionsPrompt),i.reactionsPreset&&(b.reactionsPreset=i.reactionsPreset),Array.isArray(i.formattingTools)&&(b.allowedFormatting=i.formattingTools)}K=!1,p(),ye()}catch(e){console.error("[Nyuzi] Failed to load comments:",e),K=!1,H="Unable to connect to comments server.",p()}}async function Le(){if(!(J||!G||v))try{J=!0,p();let e=ie+1,r=await ae(w,l,U,e,de),s=r.comments||[],i=new Set(z.map(d=>d.id));for(let d of s)i.has(d.id)||z.push(d);ie=e,G=r.pagination?.hasMore??!1,I=r.pagination?.totalTopLevel??I,j=r.pagination?.totalComments??j,J=!1,p()}catch(e){console.error("[Nyuzi] Error loading more comments:",e),J=!1,p()}}async function Me(e){let r=q.has(e),s=r?"unvote":"upvote",i=z.find(d=>d.id===e);r?(q.delete(e),i&&(i.upvotes=Math.max(0,(i.upvotes||1)-1))):(q.add(e),i&&(i.upvotes=(i.upvotes||0)+1));try{sessionStorage.setItem("nyuzi_upvotes",JSON.stringify(Array.from(q)))}catch{}if(p(),!v)try{let d=await ze(w,e,s);i&&typeof d.upvotes=="number"&&(i.upvotes=d.upvotes,p())}catch{r?(q.add(e),i&&(i.upvotes=(i.upvotes||0)+1)):(q.delete(e),i&&(i.upvotes=Math.max(0,(i.upvotes||1)-1))),p()}}async function be(e,r,s,i,d=null){if(!(!e.trim()||!s.trim()))try{if($=!0,H=null,p(),v){let c={id:`mock-${Date.now()}`,parentId:d,authorName:e.trim(),authorEmail:r,content:s.trim(),status:"approved",upvotes:0,createdAt:new Date().toISOString()};me(c.id),d?z.push(c):(z.unshift(c),I+=1),j+=1,N=null,$=!1,p();return}let y=await ve(w,{siteId:l,threadUrl:U,threadTitle:ce,postAuthor:re,parentId:d,authorName:e,authorEmail:r,content:s,notifyOnReply:i});y.comment&&(me(y.comment.id),d?z.push(y.comment):(z.unshift(y.comment),I+=1),j+=1,N=null),$=!1,p()}catch(y){H=y.message||"Failed to post comment. Please try again.",$=!1,p()}}async function je(e,r){if(r.trim())try{if($=!0,p(),v){let i=z.find(d=>d.id===e);i&&(i.content=r.trim(),i.isEdited=!0),F=null,$=!1,p();return}await xe(w,e,r.trim());let s=z.find(i=>i.id===e);s&&(s.content=r.trim(),s.isEdited=!0),F=null,$=!1,p()}catch(s){alert(s.message||"Failed to edit comment."),$=!1,p()}}async function Ie(e){try{if($=!0,p(),v){z=z.filter(r=>r.id!==e&&r.parentId!==e),j=z.length,I=z.filter(r=>!r.parentId).length,pe(e),P=null,$=!1,p();return}await ke(w,e),z=z.filter(r=>r.id!==e&&r.parentId!==e),j=z.length,I=z.filter(r=>!r.parentId).length,pe(e),P=null,$=!1,p()}catch{alert("Failed to delete comment. Please try again."),P=null,$=!1,p()}}function Be(e,r){let s=e.selectionStart,i=e.selectionEnd,d=e.value,y=d.substring(s,i),c="",u=0;switch(r){case"bold":c=y?`**${y}**`:"**bold text**",u=y?c.length:2;break;case"italic":c=y?`*${y}*`:"*italic text*",u=y?c.length:1;break;case"quote":y?c=y.split(`
`).map(m=>`> ${m}`).join(`
`):c="> quote text",u=c.length;break;case"code":c=y?`\`${y}\``:"`code`",u=y?c.length:1;break;case"link":c=y?`[${y}](https://)`:"[link title](https://example.com)",u=c.length-1;break;default:return}e.value=d.substring(0,s)+c+d.substring(i),e.focus();let o=s+u;e.setSelectionRange(o,o),e.dispatchEvent(new Event("input",{bubbles:!0}))}function p(){let e=z.filter(m=>!m.parentId),r=Ae(),s=b.themeMode==="auto"?r:b.themeMode||r,i=s==="light"&&r==="dark"||s==="dark"&&r==="light",d=!b.bg||b.bg==="transparent"||b.bgMode==="transparent",y=!!(i&&d&&b.themeMode!=="auto"),c={...b,resolvedTheme:s,isCardIsolated:y},u=fe(c),o=Ce();t&&(t.setAttribute("data-theme",s),y?t.setAttribute("data-card-isolated","true"):t.removeAttribute("data-card-isolated")),g.innerHTML=`
      <style>${u}</style>
      <div class="nyuzi-container">
        ${b.showReactionsBar?he(B,b.reactionsPrompt,b.reactionsPreset,C):""}

        <!-- Header -->
        <div class="nyuzi-header">
          <h3 class="nyuzi-title">
            Discussion
            <span class="nyuzi-badge">${j}</span>
          </h3>
        </div>

        <!-- Main Form -->
        <div class="nyuzi-form">
          ${H?`<div class="nyuzi-alert">
                   <span>\u26A0\uFE0F ${T(H)}</span>
                   <button class="nyuzi-action-btn" id="dismiss-error" style="color:#b91c1c;">\u2715</button>
                 </div>`:""}

          ${ne("nyuzi-main-content",b.allowedFormatting)}
          <textarea class="nyuzi-textarea" id="nyuzi-main-content" maxlength="2000" placeholder="Share your thoughts or leave a question..." required></textarea>
          <div class="nyuzi-counter-row">
            <span id="nyuzi-char-count">0 / 2,000</span>
          </div>

          <div class="nyuzi-form-row">
            <div class="nyuzi-inputs">
              <input type="text" class="nyuzi-input" id="nyuzi-main-name" placeholder="Name *" value="${T(ee)}" required />
              <input type="email" class="nyuzi-input" id="nyuzi-main-email" placeholder="Email (for reply alerts)" value="${T(te)}" />
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
        ${K?`<div class="nyuzi-skeleton">
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
               </div>`:e.length===0?`<div class="nyuzi-empty">
                 <p style="font-size:1.1rem; margin:0 0 0.25rem 0; font-weight:600; color:var(--nyuzi-text-primary);">No comments yet</p>
                 <p style="margin:0; font-size:0.875rem;">Be the first to share your thoughts!</p>
               </div>`:`<div class="nyuzi-list">
                 ${e.map(m=>oe(m,z,{postAuthor:re,reactionType:b.reactionType,upvotedComments:q,activeReplyId:N,editingCommentId:F,confirmDeleteId:P,collapsedComments:Q,myComments:o,isSubmitting:$,savedAuthorName:ee,savedAuthorEmail:te,allowedFormatting:b.allowedFormatting})).join("")}
               </div>
               ${G?`<div class="nyuzi-pagination">
                        <button class="nyuzi-load-more-btn" id="nyuzi-load-more" ${J?"disabled":""}>
                          ${J?'<span class="nyuzi-spinner"></span> Loading comments...':`Load more comments (${Math.max(0,I-e.length)} remaining) \u2193`}
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
    `,Re()}function Re(){g.querySelectorAll(".nyuzi-reaction-pill").forEach(c=>{c.addEventListener("click",async u=>{if(Z)return;let o=u.currentTarget.getAttribute("data-reaction-key");if(!o)return;Z=!0;let m=B,x;if(B===o){x="unreact",B=null,C[o]=Math.max(0,(C[o]||1)-1);try{localStorage.removeItem(X)}catch{}}else if(B){x="switch";let h=B;B=o,C[h]=Math.max(0,(C[h]||1)-1),C[o]=(C[o]||0)+1;try{localStorage.setItem(X,o)}catch{}}else{x="react",B=o,C[o]=(C[o]||0)+1;try{localStorage.setItem(X,o)}catch{}}try{localStorage.setItem(ue,JSON.stringify(C))}catch{}if(p(),v)Z=!1;else try{let h=await we(w,{siteId:l,threadUrl:U,threadTitle:ce,reactionKey:o,previousKey:m,action:x});h&&h.reactions&&(C={...h.reactions},p())}catch(h){console.warn("[Nyuzi] Failed to sync reaction to server:",h)}finally{Z=!1}})});async function e(c,u){let o=c.querySelector(".nyuzi-emoji-popover");if(!o)return;if(o.style.display!=="none"){o.style.display="none";return}g.querySelectorAll(".nyuzi-emoji-popover").forEach(x=>{x.style.display="none"}),o.style.display="block";let m=o.querySelector("emoji-picker");if(m){setTimeout(()=>m.shadowRoot?.querySelector("input")?.focus(),50);return}o.innerHTML=`
        <div class="nyuzi-emoji-loading">
          <span class="nyuzi-spinner"></span>
          <span>Loading emoji library...</span>
        </div>
      `;try{if(await se(),o.style.display==="none")return;let x=t.getAttribute("data-theme")||"dark",h=document.createElement("emoji-picker");h.className=x==="light"?"light":"dark",h.addEventListener("emoji-click",L=>{let D=L.detail?.unicode;D&&Ee(u,D)}),o.innerHTML="",o.appendChild(h),setTimeout(()=>h.shadowRoot?.querySelector("input")?.focus(),50)}catch(x){console.error("[Nyuzi] Failed to load emoji picker:",x),o.innerHTML=`
          <div class="nyuzi-emoji-loading" style="color: #ef4444;">
            <span>Failed to load emoji library.</span>
          </div>
        `}}g.querySelectorAll(".nyuzi-format-btn").forEach(c=>{c.getAttribute("data-action")==="emoji"&&c.addEventListener("mouseenter",le,{once:!0}),c.addEventListener("click",u=>{u.preventDefault();let o=u.currentTarget.getAttribute("data-action"),m=u.currentTarget.closest(".nyuzi-format-toolbar"),x=m?.getAttribute("data-target");if(!o||!x)return;let h=g.getElementById(x);if(h){if(o==="emoji"){e(m,h);return}Be(h,o)}})}),g.querySelectorAll("textarea").forEach(c=>{c.addEventListener("focus",le,{once:!0})});let r=g.getElementById("nyuzi-main-content"),s=g.getElementById("nyuzi-char-count");r&&s&&r.addEventListener("input",()=>{s.textContent=`${r.value.length} / 2,000`});let i=g.getElementById("dismiss-error");i&&i.addEventListener("click",()=>{H=null,p()});let d=g.getElementById("nyuzi-main-submit");d&&d.addEventListener("click",()=>{let c=g.getElementById("nyuzi-main-name"),u=g.getElementById("nyuzi-main-email"),o=g.getElementById("nyuzi-main-notify");if(!c.value.trim()){H="Please enter your name.",p();return}if(!r||!r.value.trim()){H="Comment content cannot be empty.",p();return}let m=c.value.trim(),x=u.value.trim()||null;ge(m,x),be(m,x,r.value.trim(),o?o.checked:!0,null)});let y=g.getElementById("nyuzi-load-more");y&&y.addEventListener("click",()=>{Le()}),g.querySelectorAll(".upvote-btn").forEach(c=>{c.addEventListener("click",u=>{let o=u.currentTarget.getAttribute("data-id");o&&Me(o)})}),g.querySelectorAll(".reply-trigger").forEach(c=>{c.addEventListener("click",u=>{let o=u.currentTarget.getAttribute("data-id");N=N===o?null:o,F=null,P=null,p()})}),g.querySelectorAll(".cancel-reply").forEach(c=>{c.addEventListener("click",()=>{N=null,p()})}),g.querySelectorAll(".submit-reply").forEach(c=>{c.addEventListener("click",u=>{let o=u.currentTarget.getAttribute("data-parent-id");if(!o)return;let m=g.getElementById(`reply-name-${o}`),x=g.getElementById(`reply-email-${o}`),h=g.getElementById(`reply-content-${o}`);if(!m.value.trim()){alert("Please enter your name.");return}if(!h||!h.value.trim()){alert("Reply content cannot be empty.");return}let L=m.value.trim(),D=x?.value.trim()||null;ge(L,D),be(L,D,h.value.trim(),!0,o)})}),g.querySelectorAll(".edit-trigger").forEach(c=>{c.addEventListener("click",u=>{F=u.currentTarget.getAttribute("data-id"),N=null,P=null,p()})}),g.querySelectorAll(".cancel-edit").forEach(c=>{c.addEventListener("click",()=>{F=null,p()})}),g.querySelectorAll(".save-edit").forEach(c=>{c.addEventListener("click",u=>{let o=u.currentTarget.getAttribute("data-id");if(!o)return;let m=g.getElementById(`edit-content-${o}`);if(!m||!m.value.trim()){alert("Comment content cannot be empty.");return}je(o,m.value.trim())})}),g.querySelectorAll(".delete-trigger").forEach(c=>{c.addEventListener("click",u=>{P=u.currentTarget.getAttribute("data-id"),N=null,F=null,p()})}),g.querySelectorAll(".nyuzi-cancel-delete-btn").forEach(c=>{c.addEventListener("click",()=>{P=null,p()})}),g.querySelectorAll(".nyuzi-confirm-delete-btn").forEach(c=>{c.addEventListener("click",u=>{let o=u.currentTarget.getAttribute("data-id");o&&Ie(o)})}),g.querySelectorAll(".nyuzi-collapse-btn").forEach(c=>{c.addEventListener("click",u=>{let o=u.currentTarget.getAttribute("data-id");o&&(Q.has(o)?Q.delete(o):Q.add(o),p())})}),g.querySelectorAll(".copy-link-btn").forEach(c=>{c.addEventListener("click",async u=>{let o=u.currentTarget,m=o.getAttribute("data-id");if(!m)return;let h=`${window.location.href.split("#")[0]}#comment-${m}`;try{await navigator.clipboard.writeText(h);let L=o.innerHTML;o.innerHTML="\u2713 Copied!",o.style.color="var(--nyuzi-accent)",setTimeout(()=>{o.innerHTML=L,o.style.color=""},2e3)}catch{window.location.hash=`comment-${m}`}})})}window.addEventListener("hashchange",ye);try{let e=null,r=()=>{clearTimeout(e),e=setTimeout(()=>{p()},50)},s=new MutationObserver(i=>{for(let d of i)if(d.type==="attributes"&&(d.attributeName==="class"||d.attributeName==="data-theme"||d.attributeName==="data-color-mode"||d.attributeName==="data-bs-theme"||d.attributeName==="style")){r();break}});s.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","data-color-mode","data-bs-theme","style"]}),document.body&&s.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme","data-color-mode","data-bs-theme","style"]}),typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",r)}catch(e){console.debug("[Nyuzi] Theme observer warning:",e)}document.addEventListener("click",e=>{e.composedPath().some(i=>i?.classList?.contains("nyuzi-emoji-popover")||i?.classList?.contains("nyuzi-emoji-btn")||i?.tagName?.toLowerCase()==="emoji-picker")||g.querySelectorAll(".nyuzi-emoji-popover").forEach(i=>{i.style.display="none"})}),document.addEventListener("keydown",e=>{e.key==="Escape"&&g.querySelectorAll(".nyuzi-emoji-popover").forEach(r=>{r.style.display="none"})}),Se()})();})();
//# sourceMappingURL=embed.js.map