"use strict";(()=>{function Pt(e){if(!e||typeof e!="string"||!e.startsWith("#"))return!1;let i=e.replace("#","");if(i.length!==6&&i.length!==3)return!1;let t=parseInt(i.length===3?i[0]+i[0]:i.slice(0,2),16),a=parseInt(i.length===3?i[1]+i[1]:i.slice(2,4),16),z=parseInt(i.length===3?i[2]+i[2]:i.slice(4,6),16);return(t*299+a*587+z*114)/1e3>155}function ct(e){let{accent:i,bg:t,cardBg:a,textColor:z,textSecondary:p,borderColor:v,inputBg:y,radius:w="0.75rem",themeMode:H,bgMode:T}=e,d=Pt(a);return`
    :host {
      --nyuzi-accent: ${i||"#f56220"};
      --nyuzi-accent-hover: color-mix(in srgb, var(--nyuzi-accent) 80%, black);
      --nyuzi-accent-soft: color-mix(in srgb, var(--nyuzi-accent) 12%, transparent);
      --nyuzi-accent-border: color-mix(in srgb, var(--nyuzi-accent) 30%, transparent);

      --nyuzi-bg: ${t||(T==="card"?"#f8fafc":"transparent")};
      --nyuzi-card-bg: ${a||"#ffffff"};
      --nyuzi-text-primary: ${z||"#0f172a"};
      --nyuzi-text-secondary: ${p||"#475569"};
      --nyuzi-text-muted: #94a3b8;
      --nyuzi-border: ${v||"#e2e8f0"};
      --nyuzi-input-bg: ${y||"#f8fafc"};
      --nyuzi-reaction-bg: #ffffff;
      --nyuzi-reaction-border: #e2e8f0;
      --nyuzi-badge-bg: #f1f5f9;
      --nyuzi-badge-border: #e2e8f0;
      --nyuzi-thread-line: #e2e8f0;
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

    ${H==="sepia"?`
      :host {
        --nyuzi-bg: ${t||(T==="card"?"#f4ead8":"transparent")};
        --nyuzi-card-bg: ${a||"#fbf3e4"};
        --nyuzi-text-primary: ${z||"#2b2118"};
        --nyuzi-text-secondary: ${p||"#6a5949"};
        --nyuzi-text-muted: #968370;
        --nyuzi-border: ${v||"#e2d4bc"};
        --nyuzi-input-bg: ${y||"#fbf7ef"};
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
        --nyuzi-bg: ${t||(T==="card"?"#090605":"transparent")};
        --nyuzi-card-bg: ${a||"#14100e"};
        --nyuzi-text-primary: ${z||(d?"#0f172a":"#f8fafc")};
        --nyuzi-text-secondary: ${p||(d?"#475569":"#cbd5e1")};
        --nyuzi-text-muted: #94a3b8;
        --nyuzi-border: ${v||(d?"#e2e8f0":"rgba(255, 255, 255, 0.12)")};
        --nyuzi-input-bg: ${y||(d?"#ffffff":"#181412")};
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
          --nyuzi-bg: ${t||(T==="card"?"#090605":"transparent")};
          --nyuzi-card-bg: ${a||"#14100e"};
          --nyuzi-text-primary: ${z||(d?"#0f172a":"#f8fafc")};
          --nyuzi-text-secondary: ${p||(d?"#475569":"#cbd5e1")};
          --nyuzi-text-muted: #94a3b8;
          --nyuzi-border: ${v||(d?"#e2e8f0":"rgba(255, 255, 255, 0.12)")};
          --nyuzi-input-bg: ${y||(d?"#ffffff":"#181412")};
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
        --nyuzi-bg: ${t||(T==="card"?"#090605":"transparent")};
        --nyuzi-card-bg: ${a||"#14100e"};
        --nyuzi-text-primary: ${z||(d?"#0f172a":"#f8fafc")};
        --nyuzi-text-secondary: ${p||(d?"#475569":"#cbd5e1")};
        --nyuzi-text-muted: #94a3b8;
        --nyuzi-border: ${v||(d?"#e2e8f0":"rgba(255, 255, 255, 0.12)")};
        --nyuzi-input-bg: ${y||(d?"#ffffff":"#181412")};
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
    ${T==="card"?`
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
  `}function E(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function qt(e){let i=e.trim().split(/\s+/);return i.length===1?i[0].slice(0,2).toUpperCase():(i[0][0]+i[i.length-1][0]).toUpperCase()}function Ot(e){try{let i=new Date(e),a=Math.floor((new Date().getTime()-i.getTime())/1e3);return a<60?"just now":a<3600?`${Math.floor(a/60)}m ago`:a<86400?`${Math.floor(a/3600)}h ago`:a<604800?`${Math.floor(a/86400)}d ago`:i.toLocaleDateString(void 0,{month:"short",day:"numeric"})}catch{return"recently"}}function Dt(e,i){if(!e)return"";let t=E(e),a=i??["bold","italic","quote","code","link"];a.includes("code")&&(t=t.replace(/`([^`\n]+)`/g,"<code>$1</code>")),a.includes("bold")&&(t=t.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>")),a.includes("italic")&&(t=t.replace(/(^|[^*])\*([^*]+)\*([^*]|$)/g,"$1<em>$2</em>$3")),a.includes("link")?t=t.replace(/\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'):t=t.replace(/\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)/g,"$1 ($2)");let z=t.split(`
`),p=[],v=!1,y=[];for(let w of z)a.includes("quote")&&(w.startsWith("&gt; ")||w==="&gt;")?(v=!0,y.push(w.replace(/^&gt; ?/,""))):(v&&(p.push(`<blockquote>${y.join("<br/>")}</blockquote>`),y=[],v=!1),p.push(w));return v&&p.push(`<blockquote>${y.join("<br/>")}</blockquote>`),p.join(`
`).replace(/(<\/blockquote>)\n+/g,"$1").replace(/\n+(<blockquote>)/g,"$1").replace(/\n/g,"<br/>")}function Ft(e,i){return e==="upvote"?`<svg class="nyuzi-reaction-icon" viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" fill="${i?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`:e==="like"?`<svg class="nyuzi-reaction-icon nyuzi-like-icon" viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2" fill="${i?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12M15 10.5a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3v2.5M7 10l5-6v5h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7"/><path d="M7 10H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"/></svg>`:`<svg class="nyuzi-reaction-icon nyuzi-heart-icon" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="${i?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>`}function _t(){return'<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>'}function Ut(){return'<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'}function Jt(){return'<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>'}function Yt(){return'<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>'}function Kt(e,i){return e.upvotes>0?`${e.upvotes}`:i==="upvote"?"Upvote":"Like"}function Vt(e,i){if(!e)return!1;let t=e.trim().toLowerCase();return i&&t===i.trim().toLowerCase()?!0:t.includes("fred juma")||t.includes("brenda frenjo")||t.includes("sumeiya juma")}function V(e,i){let t=i&&i.length>0?i:["bold","italic","quote","code","link"],a=[];return t.includes("bold")&&a.push(`
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
  `}function ut(e,i="How was this discussion?",t="general",a){let v=t==="literary"?[{key:"coffee",emoji:"\u2615",label:"Thoughtful",defaultCount:21},{key:"book",emoji:"\u{1F4D6}",label:"Engrossing",defaultCount:28},{key:"lightbulb",emoji:"\u{1F4A1}",label:"Insight",defaultCount:14},{key:"heart",emoji:"\u2764\uFE0F",label:"Moved",defaultCount:19},{key:"clap",emoji:"\u{1F44F}",label:"Applause",defaultCount:16}]:[{key:"fire",emoji:"\u{1F525}",label:"Superb",defaultCount:18},{key:"heart",emoji:"\u2764\uFE0F",label:"Love",defaultCount:24},{key:"lightbulb",emoji:"\u{1F4A1}",label:"Insight",defaultCount:12},{key:"laugh",emoji:"\u{1F602}",label:"Laugh",defaultCount:7},{key:"clap",emoji:"\u{1F44F}",label:"Applause",defaultCount:15}];return`
    <div class="nyuzi-reactions-bar">
      <div class="nyuzi-reactions-prompt">${E(i||"How was this discussion?")}</div>
      <div class="nyuzi-reactions-grid">
        ${v.map(y=>{let w=a?.[y.key]!==void 0?a[y.key]:y.defaultCount;return`
          <div class="nyuzi-reaction-pill ${e===y.key?"active":""}" data-reaction-key="${y.key}">
            <div class="emoji-row">
              <span>${y.emoji}</span>
              <span class="reaction-count">${w}</span>
            </div>
            <span class="reaction-label">${y.label}</span>
          </div>
        `}).join("")}
      </div>
    </div>
  `}function Z(e,i,t){let a=i.filter(d=>d.parentId===e.id);a.sort((d,W)=>new Date(d.createdAt).getTime()-new Date(W.createdAt).getTime());let z=t.activeReplyId===e.id,p=t.editingCommentId===e.id,v=t.confirmDeleteId===e.id,y=t.collapsedComments.has(e.id),w=t.upvotedComments.has(e.id),H=t.myComments.has(e.id),T=e.isAuthor??Vt(e.authorName,t.postAuthor);return`
    <div class="nyuzi-comment" id="comment-${e.id}">
      <div class="nyuzi-avatar">${E(qt(e.authorName))}</div>
      <div class="nyuzi-body">
        <div class="nyuzi-meta">
          <span class="nyuzi-author">${E(e.authorName)}</span>
          ${T?'<span class="nyuzi-author-badge">Author</span>':""}
          <span class="nyuzi-time">${Ot(e.createdAt)}</span>
          ${e.isEdited?'<span class="nyuzi-edited-tag" title="Edited by reader">(edited)</span>':""}
        </div>

        ${p?`
            <div class="nyuzi-edit-box">
              ${V(`edit-content-${e.id}`,t.allowedFormatting)}
              <textarea class="nyuzi-textarea nyuzi-edit-textarea" id="edit-content-${e.id}" rows="3" maxlength="2000">${E(e.content)}</textarea>
              <div class="nyuzi-edit-actions">
                <button class="nyuzi-action-btn cancel-edit" data-id="${e.id}">Cancel</button>
                <button class="nyuzi-submit-btn save-edit" data-id="${e.id}" ${t.isSubmitting?"disabled":""}>
                  ${t.isSubmitting?"Saving...":"Save Changes"}
                </button>
              </div>
            </div>
          `:v?`
            <div class="nyuzi-confirm-pill">
              <span>Delete this comment?</span>
              <button class="nyuzi-confirm-delete-btn" data-id="${e.id}" ${t.isSubmitting?"disabled":""}>
                ${t.isSubmitting?"Deleting...":"Yes, Delete"}
              </button>
              <button class="nyuzi-cancel-delete-btn" data-id="${e.id}">Cancel</button>
            </div>
          `:`<div class="nyuzi-content">${Dt(e.content,t.allowedFormatting)}</div>`}

        ${!p&&!v?`
          <div class="nyuzi-actions">
            <button class="nyuzi-action-btn upvote-btn ${w?"upvoted":""}" data-id="${e.id}" title="${w?"Unlike":"Like"}">
              ${Ft(t.reactionType,w)}
              <span>${Kt(e,t.reactionType)}</span>
            </button>
            <button class="nyuzi-action-btn reply-trigger" data-id="${e.id}">
              ${_t()}
              <span>Reply</span>
            </button>
            <button class="nyuzi-action-btn copy-link-btn" data-id="${e.id}" title="Copy direct link to this comment">
              ${Ut()}
              <span>Copy Link</span>
            </button>
            ${H?`
              <button class="nyuzi-action-btn edit-trigger" data-id="${e.id}" title="Edit your comment (15m grace window)">
                ${Jt()}
                <span>Edit</span>
              </button>
              <button class="nyuzi-action-btn delete-trigger" data-id="${e.id}" title="Delete your comment">
                ${Yt()}
                <span>Delete</span>
              </button>
            `:""}
          </div>
        `:""}

        ${z?`
            <div class="nyuzi-reply-box">
              ${V(`reply-content-${e.id}`,t.allowedFormatting)}
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

        ${a.length>0?`
          <div class="nyuzi-replies-wrapper">
            <button class="nyuzi-collapse-btn" data-id="${e.id}" title="${y?"Expand replies":"Collapse replies"}">
              <svg class="nyuzi-collapse-chevron ${y?"collapsed":""}" viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              <span>${y?`Show ${a.length} ${a.length===1?"reply":"replies"}`:`Hide ${a.length} ${a.length===1?"reply":"replies"}`}</span>
            </button>
            ${y?"":`
              <div class="nyuzi-replies">
                ${a.map(d=>Z(d,i,t)).join("")}
              </div>
            `}
          </div>
        `:""}
      </div>
    </div>
  `}async function X(e,i,t,a,z,p){let v=p?`&highlight=${encodeURIComponent(p)}`:"",y=`${e}/api/v1/comments?siteId=${encodeURIComponent(i)}&threadUrl=${encodeURIComponent(t)}&page=${a}&limit=${z}${v}`,w=await fetch(y);if(!w.ok)throw new Error(`HTTP ${w.status}`);return w.json()}async function dt(e,i){let t=await fetch(`${e}/api/v1/comments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(!t.ok){let a=await t.json().catch(()=>({}));throw new Error(a.error||`HTTP ${t.status}`)}return t.json()}async function mt(e,i,t){let a=await fetch(`${e}/api/v1/comments/${encodeURIComponent(i)}/upvote`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:t})});if(!a.ok)throw new Error("Vote action failed");return a.json()}async function gt(e,i,t){let a=await fetch(`${e}/api/v1/comments/${encodeURIComponent(i)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:t})});if(!a.ok){let z=await a.json().catch(()=>({}));throw new Error(z.error||`HTTP ${a.status}`)}return a.json()}async function yt(e,i){let t=await fetch(`${e}/api/v1/comments/${encodeURIComponent(i)}`,{method:"DELETE"});if(!t.ok)throw new Error("Delete action failed");return t.json()}async function pt(e,i){let t=await fetch(`${e}/api/v1/threads/react`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(!t.ok)throw new Error("Thread reaction failed");return t.json()}(function(){let e=document.currentScript,i=document.getElementById("nyuzi-comments")||document.querySelector("nyuzi-comments");if(!i){console.warn("[Nyuzi] No container found (#nyuzi-comments or <nyuzi-comments>).");return}let t=i,a=e?.getAttribute("data-site-id")||t.getAttribute("data-site-id")||document.querySelector("[data-nyuzi-site-id]")?.getAttribute("data-nyuzi-site-id")||"",z=e?.getAttribute("data-api")||t.getAttribute("data-api")||"https://nyuzi-api.fredjuma8.workers.dev",p=e?.getAttribute("data-mock")==="true"||t.getAttribute("data-mock")==="true",v=e?.getAttribute("data-reactions-bar")??t.getAttribute("data-reactions-bar"),y=v===null?!0:v!=="false",w=e?.getAttribute("data-reactions-prompt")||t.getAttribute("data-reactions-prompt")||"How was this discussion?",H=e?.getAttribute("data-reactions-preset")||t.getAttribute("data-reactions-preset")||"general",d=(e?.getAttribute("data-formatting")||t.getAttribute("data-formatting")||"bold,italic,quote,code,link").split(",").map(n=>n.trim().toLowerCase()).filter(Boolean),W=!!(e?.getAttribute("data-accent-color")||t.getAttribute("data-accent-color")),ft=!!(e?.getAttribute("data-theme")||t.getAttribute("data-theme")),bt=!!(e?.getAttribute("data-bg")||t.getAttribute("data-bg")),ht=!!(e?.getAttribute("data-bg-color")||t.getAttribute("data-bg-color")),zt=!!(e?.getAttribute("data-card-bg")||t.getAttribute("data-card-bg")),vt=!!(e?.getAttribute("data-text-color")||t.getAttribute("data-text-color")),xt=!!(e?.getAttribute("data-border-color")||t.getAttribute("data-border-color")),wt=!!(e?.getAttribute("data-radius")||t.getAttribute("data-radius")),kt=!!(e?.getAttribute("data-reaction")||t.getAttribute("data-reaction")),$t=v!=null,At=!!(e?.getAttribute("data-reactions-prompt")||t.getAttribute("data-reactions-prompt")),Ct=!!(e?.getAttribute("data-reactions-preset")||t.getAttribute("data-reactions-preset")),Et=!!(e?.getAttribute("data-formatting")||t.getAttribute("data-formatting")),f={accent:e?.getAttribute("data-accent-color")||t.getAttribute("data-accent-color")||"#f56220",bg:e?.getAttribute("data-bg-color")||t.getAttribute("data-bg-color")||"",cardBg:e?.getAttribute("data-card-bg")||t.getAttribute("data-card-bg")||"",textColor:e?.getAttribute("data-text-color")||t.getAttribute("data-text-color")||"",textSecondary:e?.getAttribute("data-text-secondary")||t.getAttribute("data-text-secondary")||"",borderColor:e?.getAttribute("data-border-color")||t.getAttribute("data-border-color")||"",inputBg:e?.getAttribute("data-input-bg")||t.getAttribute("data-input-bg")||"",radius:e?.getAttribute("data-radius")||t.getAttribute("data-radius")||"0.75rem",reactionType:e?.getAttribute("data-reaction")||t.getAttribute("data-reaction")||"like",themeMode:e?.getAttribute("data-theme")||t.getAttribute("data-theme")||"auto",bgMode:e?.getAttribute("data-bg")||t.getAttribute("data-bg")||"transparent",showReactionsBar:y,reactionsPrompt:w,reactionsPreset:H,allowedFormatting:d},g=t.shadowRoot||t.attachShadow({mode:"open"});g.innerHTML="",f.themeMode&&t.setAttribute("data-theme",f.themeMode);let P=e?.getAttribute("data-thread-url")||t.getAttribute("data-thread-url")||window.location.href.split("#")[0],tt=e?.getAttribute("data-thread-title")||t.getAttribute("data-thread-title")||document.title||"Discussion",G=e?.getAttribute("data-author-name")||t.getAttribute("data-author-name")||"",b=[],S=0,I=0,Q=1,et=15,F=!1,q=!1,O=!0,L=null,B=null,N=null,R=null,A=!1,M=null,j=new Set,_=new Set,U=`nyuzi_react_${a}_${encodeURIComponent(P)}`,nt=`nyuzi_counts_${a}_${encodeURIComponent(P)}`,$={...f.reactionsPreset==="literary"?{coffee:21,book:28,lightbulb:14,heart:19,clap:16}:{fire:18,heart:24,lightbulb:12,laugh:7,clap:15}};try{let n=localStorage.getItem(U);n&&(M=n)}catch{}try{let n=localStorage.getItem(nt);n&&($={...$,...JSON.parse(n)})}catch{}let D="nyuzi_reader_ownership",Tt=900*1e3;function rt(n){try{let s=localStorage.getItem(D),c=s?JSON.parse(s):{};c[n]=Date.now()+Tt,localStorage.setItem(D,JSON.stringify(c))}catch{}}function it(n){try{let s=localStorage.getItem(D);if(s){let c=JSON.parse(s);delete c[n],localStorage.setItem(D,JSON.stringify(c))}}catch{}}function St(){let n=new Set;try{let s=localStorage.getItem(D);if(s){let c=JSON.parse(s),r=Date.now();for(let[h,l]of Object.entries(c))r<l&&n.add(h)}}catch{}return p&&n.add("mock-3"),n}try{let n=sessionStorage.getItem("nyuzi_upvotes");n&&JSON.parse(n).forEach(s=>j.add(s))}catch{}let J="",Y="";try{J=localStorage.getItem("nyuzi_author_name")||"",Y=localStorage.getItem("nyuzi_author_email")||""}catch{}function at(n,s){n&&(J=n),s&&(Y=s);try{n&&localStorage.setItem("nyuzi_author_name",n),s&&localStorage.setItem("nyuzi_author_email",s)}catch{}}function It(){return[{id:"mock-1",parentId:null,authorName:G||"Fred Juma",authorEmail:"fredjuma8@gmail.com",content:`Welcome to our literary salon! **The Reading Circle** invites your reflections on this essay:

> "A reader lives a thousand lives before he dies. The man who never reads lives only one."

Feel free to share your thoughts, quote your favorite passages, or reply to fellow readers below.`,status:"approved",upvotes:14,createdAt:new Date(Date.now()-36e5*2).toISOString(),isAuthor:!0},{id:"mock-2",parentId:"mock-1",authorName:"Brenda Frenjo",authorEmail:"readingcircle254@gmail.com",content:"The second chapter in particular felt so poignant. The pacing and character progression really resonated with what we discussed during Sunday's book circle session!",status:"approved",upvotes:8,createdAt:new Date(Date.now()-36e5).toISOString(),isAuthor:!0},{id:"mock-3",parentId:null,authorName:"Amina Odhiambo",authorEmail:"amina@example.com",content:"Reading this made me pause and reflect on how we consume stories in the digital age. Check out this related discussion on [Bookish Perspectives](https://readingcircle254.com/blog)!",status:"approved",upvotes:5,createdAt:new Date(Date.now()-18e5).toISOString()}]}function ot(){let n=window.location.hash;n&&n.startsWith("#comment-")&&setTimeout(()=>{let s=g.querySelector(n);s&&(s.scrollIntoView({behavior:"smooth",block:"center"}),s.classList.add("nyuzi-highlight"),setTimeout(()=>s.classList.remove("nyuzi-highlight"),3500))},200)}async function Mt(){if(p){b=It(),S=b.length,I=b.filter(n=>!n.parentId).length,O=!1,m();return}try{O=!0,Q=1,m();let n=window.location.hash,s=n&&n.startsWith("#comment-")?n.replace("#comment-",""):"",c=await X(z,a,P,1,et,s);if(b=c.comments||[],S=c.total||(c.pagination?.totalComments??b.length),I=c.pagination?.totalTopLevel??b.filter(r=>!r.parentId).length,F=c.pagination?.hasMore??!1,c.thread?.reactions&&Object.keys(c.thread.reactions).length>0&&($={...$,...c.thread.reactions}),c.siteSettings&&typeof c.siteSettings=="object"){let r=c.siteSettings;!W&&r.accentColor&&(f.accent=r.accentColor),!ft&&r.themeMode&&(f.themeMode=r.themeMode),!bt&&r.bgMode&&(f.bgMode=r.bgMode),!ht&&r.canvasBg!==void 0&&(f.bg=r.canvasBg),!zt&&r.cardBg!==void 0&&(f.cardBg=r.cardBg),!vt&&r.textColor!==void 0&&(f.textColor=r.textColor),!xt&&r.borderColor!==void 0&&(f.borderColor=r.borderColor),!wt&&r.radiusValue&&(f.radius=r.radiusValue),!kt&&r.reactionType&&(f.reactionType=r.reactionType),!$t&&r.showReactionsBar!==void 0&&(f.showReactionsBar=!!r.showReactionsBar),!At&&r.reactionsPrompt&&(f.reactionsPrompt=r.reactionsPrompt),!Ct&&r.reactionsPreset&&(f.reactionsPreset=r.reactionsPreset),!Et&&Array.isArray(r.formattingTools)&&(f.allowedFormatting=r.formattingTools)}O=!1,m(),ot()}catch(n){console.error("[Nyuzi] Failed to load comments:",n),O=!1,L="Unable to connect to comments server.",m()}}async function Lt(){if(!(q||!F||p))try{q=!0,m();let n=Q+1,s=await X(z,a,P,n,et),c=s.comments||[],r=new Set(b.map(h=>h.id));for(let h of c)r.has(h.id)||b.push(h);Q=n,F=s.pagination?.hasMore??!1,I=s.pagination?.totalTopLevel??I,S=s.pagination?.totalComments??S,q=!1,m()}catch(n){console.error("[Nyuzi] Error loading more comments:",n),q=!1,m()}}async function Bt(n){let s=j.has(n),c=s?"unvote":"upvote",r=b.find(h=>h.id===n);s?(j.delete(n),r&&(r.upvotes=Math.max(0,(r.upvotes||1)-1))):(j.add(n),r&&(r.upvotes=(r.upvotes||0)+1));try{sessionStorage.setItem("nyuzi_upvotes",JSON.stringify(Array.from(j)))}catch{}if(m(),!p)try{let h=await mt(z,n,c);r&&typeof h.upvotes=="number"&&(r.upvotes=h.upvotes,m())}catch{s?(j.add(n),r&&(r.upvotes=(r.upvotes||0)+1)):(j.delete(n),r&&(r.upvotes=Math.max(0,(r.upvotes||1)-1))),m()}}async function st(n,s,c,r,h=null){if(!(!n.trim()||!c.trim()))try{if(A=!0,L=null,m(),p){let u={id:`mock-${Date.now()}`,parentId:h,authorName:n.trim(),authorEmail:s,content:c.trim(),status:"approved",upvotes:0,createdAt:new Date().toISOString()};rt(u.id),h?b.push(u):(b.unshift(u),I+=1),S+=1,B=null,A=!1,m();return}let l=await dt(z,{siteId:a,threadUrl:P,threadTitle:tt,postAuthor:G,parentId:h,authorName:n,authorEmail:s,content:c,notifyOnReply:r});l.comment&&(rt(l.comment.id),h?b.push(l.comment):(b.unshift(l.comment),I+=1),S+=1,B=null),A=!1,m()}catch(l){L=l.message||"Failed to post comment. Please try again.",A=!1,m()}}async function Rt(n,s){if(s.trim())try{if(A=!0,m(),p){let r=b.find(h=>h.id===n);r&&(r.content=s.trim(),r.isEdited=!0),N=null,A=!1,m();return}await gt(z,n,s.trim());let c=b.find(r=>r.id===n);c&&(c.content=s.trim(),c.isEdited=!0),N=null,A=!1,m()}catch(c){alert(c.message||"Failed to edit comment."),A=!1,m()}}async function jt(n){try{if(A=!0,m(),p){b=b.filter(s=>s.id!==n&&s.parentId!==n),S=b.length,I=b.filter(s=>!s.parentId).length,it(n),R=null,A=!1,m();return}await yt(z,n),b=b.filter(s=>s.id!==n&&s.parentId!==n),S=b.length,I=b.filter(s=>!s.parentId).length,it(n),R=null,A=!1,m()}catch{alert("Failed to delete comment. Please try again."),R=null,A=!1,m()}}function Ht(n,s){let c=n.selectionStart,r=n.selectionEnd,h=n.value,l=h.substring(c,r),u="",o=0;switch(s){case"bold":u=l?`**${l}**`:"**bold text**",o=l?u.length:2;break;case"italic":u=l?`*${l}*`:"*italic text*",o=l?u.length:1;break;case"quote":l?u=l.split(`
`).map(C=>`> ${C}`).join(`
`):u="> quote text",o=u.length;break;case"code":u=l?`\`${l}\``:"`code`",o=l?u.length:1;break;case"link":u=l?`[${l}](https://)`:"[link title](https://example.com)",o=u.length-1;break;default:return}n.value=h.substring(0,c)+u+h.substring(r),n.focus();let x=c+o;n.setSelectionRange(x,x),n.dispatchEvent(new Event("input",{bubbles:!0}))}function m(){let n=b.filter(r=>!r.parentId),s=ct(f),c=St();f.themeMode&&t&&t.setAttribute("data-theme",f.themeMode),g.innerHTML=`
      <style>${s}</style>
      <div class="nyuzi-container">
        ${f.showReactionsBar?ut(M,f.reactionsPrompt,f.reactionsPreset,$):""}

        <!-- Header -->
        <div class="nyuzi-header">
          <h3 class="nyuzi-title">
            Discussion
            <span class="nyuzi-badge">${S}</span>
          </h3>
        </div>

        <!-- Main Form -->
        <div class="nyuzi-form">
          ${L?`<div class="nyuzi-alert">
                   <span>\u26A0\uFE0F ${E(L)}</span>
                   <button class="nyuzi-action-btn" id="dismiss-error" style="color:#b91c1c;">\u2715</button>
                 </div>`:""}

          ${V("nyuzi-main-content",f.allowedFormatting)}
          <textarea class="nyuzi-textarea" id="nyuzi-main-content" maxlength="2000" placeholder="Share your thoughts or leave a question..." required></textarea>
          <div class="nyuzi-counter-row">
            <span id="nyuzi-char-count">0 / 2,000</span>
          </div>

          <div class="nyuzi-form-row">
            <div class="nyuzi-inputs">
              <input type="text" class="nyuzi-input" id="nyuzi-main-name" placeholder="Name *" value="${E(J)}" required />
              <input type="email" class="nyuzi-input" id="nyuzi-main-email" placeholder="Email (for reply alerts)" value="${E(Y)}" />
            </div>
            <button class="nyuzi-submit-btn" id="nyuzi-main-submit" ${A?"disabled":""}>
              ${A?"Posting...":"Post Comment"}
            </button>
          </div>

          <label class="nyuzi-optin" id="nyuzi-optin-wrapper">
            <input type="checkbox" id="nyuzi-main-notify" checked />
            <span>Notify me via email when someone replies</span>
          </label>
        </div>

        <!-- Comments Stream -->
        ${O?`<div class="nyuzi-skeleton">
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
                 ${n.map(r=>Z(r,b,{postAuthor:G,reactionType:f.reactionType,upvotedComments:j,activeReplyId:B,editingCommentId:N,confirmDeleteId:R,collapsedComments:_,myComments:c,isSubmitting:A,savedAuthorName:J,savedAuthorEmail:Y,allowedFormatting:f.allowedFormatting})).join("")}
               </div>
               ${F?`<div class="nyuzi-pagination">
                        <button class="nyuzi-load-more-btn" id="nyuzi-load-more" ${q?"disabled":""}>
                          ${q?'<span class="nyuzi-spinner"></span> Loading comments...':`Load more comments (${Math.max(0,I-n.length)} remaining) \u2193`}
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
    `,Nt()}function Nt(){g.querySelectorAll(".nyuzi-reaction-pill").forEach(l=>{l.addEventListener("click",async u=>{let o=u.currentTarget.getAttribute("data-reaction-key");if(!o)return;let x=M,C;if(M===o){C="unreact",M=null,$[o]=Math.max(0,($[o]||1)-1);try{localStorage.removeItem(U)}catch{}}else if(M){C="switch";let k=M;M=o,$[k]=Math.max(0,($[k]||1)-1),$[o]=($[o]||0)+1;try{localStorage.setItem(U,o)}catch{}}else{C="react",M=o,$[o]=($[o]||0)+1;try{localStorage.setItem(U,o)}catch{}}try{localStorage.setItem(nt,JSON.stringify($))}catch{}if(m(),!p)try{let k=await pt(z,{siteId:a,threadUrl:P,threadTitle:tt,reactionKey:o,previousKey:x,action:C});k&&k.reactions&&($={...$,...k.reactions},m())}catch(k){console.warn("[Nyuzi] Failed to sync reaction to server:",k)}})}),g.querySelectorAll(".nyuzi-format-btn").forEach(l=>{l.addEventListener("click",u=>{u.preventDefault();let o=u.currentTarget.getAttribute("data-action"),C=u.currentTarget.closest(".nyuzi-format-toolbar")?.getAttribute("data-target");if(!o||!C)return;let k=g.getElementById(C);k&&Ht(k,o)})});let n=g.getElementById("nyuzi-main-content"),s=g.getElementById("nyuzi-char-count");n&&s&&n.addEventListener("input",()=>{s.textContent=`${n.value.length} / 2,000`});let c=g.getElementById("dismiss-error");c&&c.addEventListener("click",()=>{L=null,m()});let r=g.getElementById("nyuzi-main-submit");r&&r.addEventListener("click",()=>{let l=g.getElementById("nyuzi-main-name"),u=g.getElementById("nyuzi-main-email"),o=g.getElementById("nyuzi-main-notify");if(!l.value.trim()){L="Please enter your name.",m();return}if(!n||!n.value.trim()){L="Comment content cannot be empty.",m();return}let x=l.value.trim(),C=u.value.trim()||null;at(x,C),st(x,C,n.value.trim(),o?o.checked:!0,null)});let h=g.getElementById("nyuzi-load-more");h&&h.addEventListener("click",()=>{Lt()}),g.querySelectorAll(".upvote-btn").forEach(l=>{l.addEventListener("click",u=>{let o=u.currentTarget.getAttribute("data-id");o&&Bt(o)})}),g.querySelectorAll(".reply-trigger").forEach(l=>{l.addEventListener("click",u=>{let o=u.currentTarget.getAttribute("data-id");B=B===o?null:o,N=null,R=null,m()})}),g.querySelectorAll(".cancel-reply").forEach(l=>{l.addEventListener("click",()=>{B=null,m()})}),g.querySelectorAll(".submit-reply").forEach(l=>{l.addEventListener("click",u=>{let o=u.currentTarget.getAttribute("data-parent-id");if(!o)return;let x=g.getElementById(`reply-name-${o}`),C=g.getElementById(`reply-email-${o}`),k=g.getElementById(`reply-content-${o}`);if(!x.value.trim()){alert("Please enter your name.");return}if(!k||!k.value.trim()){alert("Reply content cannot be empty.");return}let K=x.value.trim(),lt=C?.value.trim()||null;at(K,lt),st(K,lt,k.value.trim(),!0,o)})}),g.querySelectorAll(".edit-trigger").forEach(l=>{l.addEventListener("click",u=>{N=u.currentTarget.getAttribute("data-id"),B=null,R=null,m()})}),g.querySelectorAll(".cancel-edit").forEach(l=>{l.addEventListener("click",()=>{N=null,m()})}),g.querySelectorAll(".save-edit").forEach(l=>{l.addEventListener("click",u=>{let o=u.currentTarget.getAttribute("data-id");if(!o)return;let x=g.getElementById(`edit-content-${o}`);if(!x||!x.value.trim()){alert("Comment content cannot be empty.");return}Rt(o,x.value.trim())})}),g.querySelectorAll(".delete-trigger").forEach(l=>{l.addEventListener("click",u=>{R=u.currentTarget.getAttribute("data-id"),B=null,N=null,m()})}),g.querySelectorAll(".nyuzi-cancel-delete-btn").forEach(l=>{l.addEventListener("click",()=>{R=null,m()})}),g.querySelectorAll(".nyuzi-confirm-delete-btn").forEach(l=>{l.addEventListener("click",u=>{let o=u.currentTarget.getAttribute("data-id");o&&jt(o)})}),g.querySelectorAll(".nyuzi-collapse-btn").forEach(l=>{l.addEventListener("click",u=>{let o=u.currentTarget.getAttribute("data-id");o&&(_.has(o)?_.delete(o):_.add(o),m())})}),g.querySelectorAll(".copy-link-btn").forEach(l=>{l.addEventListener("click",async u=>{let o=u.currentTarget,x=o.getAttribute("data-id");if(!x)return;let k=`${window.location.href.split("#")[0]}#comment-${x}`;try{await navigator.clipboard.writeText(k);let K=o.innerHTML;o.innerHTML="\u2713 Copied!",o.style.color="var(--nyuzi-accent)",setTimeout(()=>{o.innerHTML=K,o.style.color=""},2e3)}catch{window.location.hash=`comment-${x}`}})})}window.addEventListener("hashchange",ot),Mt()})();})();
//# sourceMappingURL=embed.js.map