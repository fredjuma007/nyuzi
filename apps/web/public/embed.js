"use strict";(()=>{function Ae(t){if(!t||typeof t!="string"||!t.startsWith("#"))return!1;let r=t.replace("#","");if(r.length!==6&&r.length!==3)return!1;let e=parseInt(r.length===3?r[0]+r[0]:r.slice(0,2),16),i=parseInt(r.length===3?r[1]+r[1]:r.slice(2,4),16),h=parseInt(r.length===3?r[2]+r[2]:r.slice(4,6),16);return(e*299+i*587+h*114)/1e3>155}function le(t){let{accent:r,bg:e,cardBg:i,textColor:h,textSecondary:p,borderColor:z,inputBg:g,radius:x="0.75rem",themeMode:N,bgMode:T}=t,d=Ae(i);return`
    :host {
      --nyuzi-accent: ${r||"#f56220"};
      --nyuzi-accent-hover: color-mix(in srgb, var(--nyuzi-accent) 80%, black);
      --nyuzi-accent-soft: color-mix(in srgb, var(--nyuzi-accent) 12%, transparent);
      --nyuzi-accent-border: color-mix(in srgb, var(--nyuzi-accent) 30%, transparent);

      --nyuzi-bg: ${e||(T==="card"?"#f8fafc":"transparent")};
      --nyuzi-card-bg: ${i||"#ffffff"};
      --nyuzi-text-primary: ${h||"#0f172a"};
      --nyuzi-text-secondary: ${p||"#475569"};
      --nyuzi-text-muted: #94a3b8;
      --nyuzi-border: ${z||"#e2e8f0"};
      --nyuzi-input-bg: ${g||"#f8fafc"};
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

    ${N==="sepia"?`
      :host {
        --nyuzi-bg: ${e||(T==="card"?"#f4ead8":"transparent")};
        --nyuzi-card-bg: ${i||"#fbf3e4"};
        --nyuzi-text-primary: ${h||"#2b2118"};
        --nyuzi-text-secondary: ${p||"#6a5949"};
        --nyuzi-text-muted: #968370;
        --nyuzi-border: ${z||"#e2d4bc"};
        --nyuzi-input-bg: ${g||"#fbf7ef"};
        --nyuzi-reaction-bg: #fbf7ef;
        --nyuzi-reaction-border: #e2d4bc;
        --nyuzi-badge-bg: #ece0cd;
        --nyuzi-badge-border: #e2d4bc;
        --nyuzi-thread-line: #e2d4bc;
        --nyuzi-avatar-bg: var(--nyuzi-accent-soft);
        --nyuzi-avatar-text: var(--nyuzi-accent);
      }
    `:""}

    ${N==="dark"?`
      :host {
        --nyuzi-bg: ${e||(T==="card"?"#090605":"transparent")};
        --nyuzi-card-bg: ${i||"#14100e"};
        --nyuzi-text-primary: ${h||(d?"#0f172a":"#f8fafc")};
        --nyuzi-text-secondary: ${p||(d?"#475569":"#cbd5e1")};
        --nyuzi-text-muted: #94a3b8;
        --nyuzi-border: ${z||(d?"#e2e8f0":"rgba(255, 255, 255, 0.12)")};
        --nyuzi-input-bg: ${g||(d?"#ffffff":"#181412")};
        --nyuzi-reaction-bg: ${d?"#ffffff":"rgba(255, 255, 255, 0.05)"};
        --nyuzi-reaction-border: ${d?"#e2e8f0":"rgba(255, 255, 255, 0.1)"};
        --nyuzi-badge-bg: ${d?"#f1f5f9":"rgba(255, 255, 255, 0.08)"};
        --nyuzi-badge-border: ${d?"#e2e8f0":"rgba(255, 255, 255, 0.12)"};
        --nyuzi-thread-line: ${d?"#e2e8f0":"rgba(255, 255, 255, 0.12)"};
        --nyuzi-avatar-bg: var(--nyuzi-accent-soft);
        --nyuzi-avatar-text: var(--nyuzi-accent);
      }
    `:""}

    ${N==="auto"?`
      @media (prefers-color-scheme: dark) {
        :host {
          --nyuzi-bg: ${e||(T==="card"?"#090605":"transparent")};
          --nyuzi-card-bg: ${i||"#14100e"};
          --nyuzi-text-primary: ${h||(d?"#0f172a":"#f8fafc")};
          --nyuzi-text-secondary: ${p||(d?"#475569":"#cbd5e1")};
          --nyuzi-text-muted: #94a3b8;
          --nyuzi-border: ${z||(d?"#e2e8f0":"rgba(255, 255, 255, 0.12)")};
          --nyuzi-input-bg: ${g||(d?"#ffffff":"#181412")};
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
        --nyuzi-bg: ${e||(T==="card"?"#090605":"transparent")};
        --nyuzi-card-bg: ${i||"#14100e"};
        --nyuzi-text-primary: ${h||(d?"#0f172a":"#f8fafc")};
        --nyuzi-text-secondary: ${p||(d?"#475569":"#cbd5e1")};
        --nyuzi-text-muted: #94a3b8;
        --nyuzi-border: ${z||(d?"#e2e8f0":"rgba(255, 255, 255, 0.12)")};
        --nyuzi-input-bg: ${g||(d?"#ffffff":"#181412")};
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
  `}function E(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function Ce(t){let r=t.trim().split(/\s+/);return r.length===1?r[0].slice(0,2).toUpperCase():(r[0][0]+r[r.length-1][0]).toUpperCase()}function Ee(t){try{let r=new Date(t),i=Math.floor((new Date().getTime()-r.getTime())/1e3);return i<60?"just now":i<3600?`${Math.floor(i/60)}m ago`:i<86400?`${Math.floor(i/3600)}h ago`:i<604800?`${Math.floor(i/86400)}d ago`:r.toLocaleDateString(void 0,{month:"short",day:"numeric"})}catch{return"recently"}}function Te(t,r){if(!t)return"";let e=E(t),i=r??["bold","italic","quote","code","link"];i.includes("code")&&(e=e.replace(/`([^`\n]+)`/g,"<code>$1</code>")),i.includes("bold")&&(e=e.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>")),i.includes("italic")&&(e=e.replace(/(^|[^*])\*([^*]+)\*([^*]|$)/g,"$1<em>$2</em>$3")),i.includes("link")?e=e.replace(/\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'):e=e.replace(/\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)/g,"$1 ($2)");let h=e.split(`
`),p=[],z=!1,g=[];for(let x of h)i.includes("quote")&&(x.startsWith("&gt; ")||x==="&gt;")?(z=!0,g.push(x.replace(/^&gt; ?/,""))):(z&&(p.push(`<blockquote>${g.join("<br/>")}</blockquote>`),g=[],z=!1),p.push(x));return z&&p.push(`<blockquote>${g.join("<br/>")}</blockquote>`),p.join(`
`).replace(/(<\/blockquote>)\n+/g,"$1").replace(/\n+(<blockquote>)/g,"$1").replace(/\n/g,"<br/>")}function Se(t,r){return t==="upvote"?`<svg class="nyuzi-reaction-icon" viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" fill="${r?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`:t==="like"?`<svg class="nyuzi-reaction-icon nyuzi-like-icon" viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2" fill="${r?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12M15 10.5a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3v2.5M7 10l5-6v5h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7"/><path d="M7 10H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"/></svg>`:`<svg class="nyuzi-reaction-icon nyuzi-heart-icon" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="${r?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>`}function Ie(){return'<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>'}function Me(){return'<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'}function Le(){return'<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>'}function Re(){return'<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>'}function je(t,r){return t.upvotes>0?`${t.upvotes}`:r==="upvote"?"Upvote":"Like"}function He(t,r){if(!t)return!1;let e=t.trim().toLowerCase();return r&&e===r.trim().toLowerCase()?!0:e.includes("fred juma")||e.includes("brenda frenjo")||e.includes("sumeiya juma")}function W(t,r){let e=r&&r.length>0?r:["bold","italic","quote","code","link"],i=[];return e.includes("bold")&&i.push(`
      <button type="button" class="nyuzi-format-btn" data-action="bold" title="Bold (**text**)">
        <strong>B</strong>
      </button>`),e.includes("italic")&&i.push(`
      <button type="button" class="nyuzi-format-btn" data-action="italic" title="Italic (*text*)">
        <em>I</em>
      </button>`),e.includes("quote")&&i.push(`
      <button type="button" class="nyuzi-format-btn" data-action="quote" title="Quote (> text)">
        &ldquo;
      </button>`),e.includes("code")&&i.push(`
      <button type="button" class="nyuzi-format-btn" data-action="code" title="Inline Code (\`code\`)">
        &lt;/&gt;
      </button>`),e.includes("link")&&i.push(`
      <button type="button" class="nyuzi-format-btn" data-action="link" title="Link ([text](url))">
        <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
      </button>`),i.length===0?"":`
    <div class="nyuzi-format-toolbar" data-target="${t}">
      ${i.join("")}
    </div>
  `}function ce(t,r="How was this discussion?",e="general",i){let z=e==="literary"?[{key:"coffee",emoji:"\u2615",label:"Thoughtful",defaultCount:21},{key:"book",emoji:"\u{1F4D6}",label:"Engrossing",defaultCount:28},{key:"lightbulb",emoji:"\u{1F4A1}",label:"Insight",defaultCount:14},{key:"heart",emoji:"\u2764\uFE0F",label:"Moved",defaultCount:19},{key:"clap",emoji:"\u{1F44F}",label:"Applause",defaultCount:16}]:[{key:"fire",emoji:"\u{1F525}",label:"Superb",defaultCount:18},{key:"heart",emoji:"\u2764\uFE0F",label:"Love",defaultCount:24},{key:"lightbulb",emoji:"\u{1F4A1}",label:"Insight",defaultCount:12},{key:"laugh",emoji:"\u{1F602}",label:"Laugh",defaultCount:7},{key:"clap",emoji:"\u{1F44F}",label:"Applause",defaultCount:15}];return`
    <div class="nyuzi-reactions-bar">
      <div class="nyuzi-reactions-prompt">${E(r||"How was this discussion?")}</div>
      <div class="nyuzi-reactions-grid">
        ${z.map(g=>{let x=i?.[g.key]!==void 0?i[g.key]:g.defaultCount;return`
          <div class="nyuzi-reaction-pill ${t===g.key?"active":""}" data-reaction-key="${g.key}">
            <div class="emoji-row">
              <span>${g.emoji}</span>
              <span class="reaction-count">${x}</span>
            </div>
            <span class="reaction-label">${g.label}</span>
          </div>
        `}).join("")}
      </div>
    </div>
  `}function Q(t,r,e){let i=r.filter(d=>d.parentId===t.id);i.sort((d,C)=>new Date(d.createdAt).getTime()-new Date(C.createdAt).getTime());let h=e.activeReplyId===t.id,p=e.editingCommentId===t.id,z=e.confirmDeleteId===t.id,g=e.collapsedComments.has(t.id),x=e.upvotedComments.has(t.id),N=e.myComments.has(t.id),T=t.isAuthor??He(t.authorName,e.postAuthor);return`
    <div class="nyuzi-comment" id="comment-${t.id}">
      <div class="nyuzi-avatar">${E(Ce(t.authorName))}</div>
      <div class="nyuzi-body">
        <div class="nyuzi-meta">
          <span class="nyuzi-author">${E(t.authorName)}</span>
          ${T?'<span class="nyuzi-author-badge">Author</span>':""}
          <span class="nyuzi-time">${Ee(t.createdAt)}</span>
          ${t.isEdited?'<span class="nyuzi-edited-tag" title="Edited by reader">(edited)</span>':""}
        </div>

        ${p?`
            <div class="nyuzi-edit-box">
              ${W(`edit-content-${t.id}`,e.allowedFormatting)}
              <textarea class="nyuzi-textarea nyuzi-edit-textarea" id="edit-content-${t.id}" rows="3" maxlength="2000">${E(t.content)}</textarea>
              <div class="nyuzi-edit-actions">
                <button class="nyuzi-action-btn cancel-edit" data-id="${t.id}">Cancel</button>
                <button class="nyuzi-submit-btn save-edit" data-id="${t.id}" ${e.isSubmitting?"disabled":""}>
                  ${e.isSubmitting?"Saving...":"Save Changes"}
                </button>
              </div>
            </div>
          `:z?`
            <div class="nyuzi-confirm-pill">
              <span>Delete this comment?</span>
              <button class="nyuzi-confirm-delete-btn" data-id="${t.id}" ${e.isSubmitting?"disabled":""}>
                ${e.isSubmitting?"Deleting...":"Yes, Delete"}
              </button>
              <button class="nyuzi-cancel-delete-btn" data-id="${t.id}">Cancel</button>
            </div>
          `:`<div class="nyuzi-content">${Te(t.content,e.allowedFormatting)}</div>`}

        ${!p&&!z?`
          <div class="nyuzi-actions">
            <button class="nyuzi-action-btn upvote-btn ${x?"upvoted":""}" data-id="${t.id}" title="${x?"Unlike":"Like"}">
              ${Se(e.reactionType,x)}
              <span>${je(t,e.reactionType)}</span>
            </button>
            <button class="nyuzi-action-btn reply-trigger" data-id="${t.id}">
              ${Ie()}
              <span>Reply</span>
            </button>
            <button class="nyuzi-action-btn copy-link-btn" data-id="${t.id}" title="Copy direct link to this comment">
              ${Me()}
              <span>Copy Link</span>
            </button>
            ${N?`
              <button class="nyuzi-action-btn edit-trigger" data-id="${t.id}" title="Edit your comment (15m grace window)">
                ${Le()}
                <span>Edit</span>
              </button>
              <button class="nyuzi-action-btn delete-trigger" data-id="${t.id}" title="Delete your comment">
                ${Re()}
                <span>Delete</span>
              </button>
            `:""}
          </div>
        `:""}

        ${h?`
            <div class="nyuzi-reply-box">
              ${W(`reply-content-${t.id}`,e.allowedFormatting)}
              <textarea class="nyuzi-textarea" id="reply-content-${t.id}" placeholder="Reply to ${E(t.authorName)}..." maxlength="2000" required></textarea>
              <div class="nyuzi-form-row">
                <div class="nyuzi-inputs">
                  <input type="text" class="nyuzi-input" id="reply-name-${t.id}" placeholder="Your Name *" value="${E(e.savedAuthorName)}" required />
                  <input type="email" class="nyuzi-input" id="reply-email-${t.id}" placeholder="Email (for reply alerts)" value="${E(e.savedAuthorEmail)}" />
                </div>
                <div style="display:flex; gap:0.5rem; align-items:flex-end;">
                  <button class="nyuzi-action-btn cancel-reply" style="padding: 0.5rem 0.75rem;">Cancel</button>
                  <button class="nyuzi-submit-btn submit-reply" data-parent-id="${t.id}" ${e.isSubmitting?"disabled":""}>
                    ${e.isSubmitting?"Posting...":"Reply"}
                  </button>
                </div>
              </div>
            </div>
          `:""}

        ${i.length>0?`
          <div class="nyuzi-replies-wrapper">
            <button class="nyuzi-collapse-btn" data-id="${t.id}" title="${g?"Expand replies":"Collapse replies"}">
              <svg class="nyuzi-collapse-chevron ${g?"collapsed":""}" viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              <span>${g?`Show ${i.length} ${i.length===1?"reply":"replies"}`:`Hide ${i.length} ${i.length===1?"reply":"replies"}`}</span>
            </button>
            ${g?"":`
              <div class="nyuzi-replies">
                ${i.map(d=>Q(d,r,e)).join("")}
              </div>
            `}
          </div>
        `:""}
      </div>
    </div>
  `}async function Z(t,r,e,i,h,p){let z=p?`&highlight=${encodeURIComponent(p)}`:"",g=`${t}/api/v1/comments?siteId=${encodeURIComponent(r)}&threadUrl=${encodeURIComponent(e)}&page=${i}&limit=${h}${z}`,x=await fetch(g);if(!x.ok)throw new Error(`HTTP ${x.status}`);return x.json()}async function ue(t,r){let e=await fetch(`${t}/api/v1/comments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!e.ok){let i=await e.json().catch(()=>({}));throw new Error(i.error||`HTTP ${e.status}`)}return e.json()}async function de(t,r,e){let i=await fetch(`${t}/api/v1/comments/${encodeURIComponent(r)}/upvote`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:e})});if(!i.ok)throw new Error("Vote action failed");return i.json()}async function me(t,r,e){let i=await fetch(`${t}/api/v1/comments/${encodeURIComponent(r)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:e})});if(!i.ok){let h=await i.json().catch(()=>({}));throw new Error(h.error||`HTTP ${i.status}`)}return i.json()}async function ye(t,r){let e=await fetch(`${t}/api/v1/comments/${encodeURIComponent(r)}`,{method:"DELETE"});if(!e.ok)throw new Error("Delete action failed");return e.json()}async function ge(t,r){let e=await fetch(`${t}/api/v1/threads/react`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!e.ok)throw new Error("Thread reaction failed");return e.json()}(function(){let t=document.currentScript,r=document.getElementById("nyuzi-comments")||document.querySelector("nyuzi-comments");if(!r){console.warn("[Nyuzi] No container found (#nyuzi-comments or <nyuzi-comments>).");return}let e=r,i=t?.getAttribute("data-site-id")||e.getAttribute("data-site-id")||document.querySelector("[data-nyuzi-site-id]")?.getAttribute("data-nyuzi-site-id")||"",h=t?.getAttribute("data-api")||e.getAttribute("data-api")||"https://nyuzi-api.fredjuma8.workers.dev",p=t?.getAttribute("data-mock")==="true"||e.getAttribute("data-mock")==="true",z=t?.getAttribute("data-reactions-bar")??e.getAttribute("data-reactions-bar"),g=z===null?!0:z!=="false",x=t?.getAttribute("data-reactions-prompt")||e.getAttribute("data-reactions-prompt")||"How was this discussion?",N=t?.getAttribute("data-reactions-preset")||e.getAttribute("data-reactions-preset")||"general",d=(t?.getAttribute("data-formatting")||e.getAttribute("data-formatting")||"bold,italic,quote,code,link").split(",").map(n=>n.trim().toLowerCase()).filter(Boolean),C={accent:t?.getAttribute("data-accent-color")||e.getAttribute("data-accent-color")||"#f56220",bg:t?.getAttribute("data-bg-color")||e.getAttribute("data-bg-color")||"",cardBg:t?.getAttribute("data-card-bg")||e.getAttribute("data-card-bg")||"",textColor:t?.getAttribute("data-text-color")||e.getAttribute("data-text-color")||"",textSecondary:t?.getAttribute("data-text-secondary")||e.getAttribute("data-text-secondary")||"",borderColor:t?.getAttribute("data-border-color")||e.getAttribute("data-border-color")||"",inputBg:t?.getAttribute("data-input-bg")||e.getAttribute("data-input-bg")||"",radius:t?.getAttribute("data-radius")||e.getAttribute("data-radius")||"0.75rem",reactionType:t?.getAttribute("data-reaction")||e.getAttribute("data-reaction")||"like",themeMode:t?.getAttribute("data-theme")||e.getAttribute("data-theme")||"auto",bgMode:t?.getAttribute("data-bg")||e.getAttribute("data-bg")||"transparent",showReactionsBar:g,reactionsPrompt:x,reactionsPreset:N,allowedFormatting:d},y=e.shadowRoot||e.attachShadow({mode:"open"});y.innerHTML="",C.themeMode&&e.setAttribute("data-theme",C.themeMode);let q=t?.getAttribute("data-thread-url")||e.getAttribute("data-thread-url")||window.location.href.split("#")[0],X=t?.getAttribute("data-thread-title")||e.getAttribute("data-thread-title")||document.title||"Discussion",G=t?.getAttribute("data-author-name")||e.getAttribute("data-author-name")||"",f=[],S=0,I=0,V=1,ee=15,F=!1,P=!1,O=!0,L=null,R=null,B=null,j=null,$=!1,M=null,H=new Set,_=new Set,U=`nyuzi_react_${i}_${encodeURIComponent(q)}`,te=`nyuzi_counts_${i}_${encodeURIComponent(q)}`,k={...C.reactionsPreset==="literary"?{coffee:21,book:28,lightbulb:14,heart:19,clap:16}:{fire:18,heart:24,lightbulb:12,laugh:7,clap:15}};try{let n=localStorage.getItem(U);n&&(M=n)}catch{}try{let n=localStorage.getItem(te);n&&(k={...k,...JSON.parse(n)})}catch{}let D="nyuzi_reader_ownership",pe=900*1e3;function ne(n){try{let o=localStorage.getItem(D),c=o?JSON.parse(o):{};c[n]=Date.now()+pe,localStorage.setItem(D,JSON.stringify(c))}catch{}}function re(n){try{let o=localStorage.getItem(D);if(o){let c=JSON.parse(o);delete c[n],localStorage.setItem(D,JSON.stringify(c))}}catch{}}function fe(){let n=new Set;try{let o=localStorage.getItem(D);if(o){let c=JSON.parse(o),u=Date.now();for(let[b,s]of Object.entries(c))u<s&&n.add(b)}}catch{}return p&&n.add("mock-3"),n}try{let n=sessionStorage.getItem("nyuzi_upvotes");n&&JSON.parse(n).forEach(o=>H.add(o))}catch{}let J="",Y="";try{J=localStorage.getItem("nyuzi_author_name")||"",Y=localStorage.getItem("nyuzi_author_email")||""}catch{}function ie(n,o){n&&(J=n),o&&(Y=o);try{n&&localStorage.setItem("nyuzi_author_name",n),o&&localStorage.setItem("nyuzi_author_email",o)}catch{}}function be(){return[{id:"mock-1",parentId:null,authorName:G||"Fred Juma",authorEmail:"fredjuma8@gmail.com",content:`Welcome to our literary salon! **The Reading Circle** invites your reflections on this essay:

> "A reader lives a thousand lives before he dies. The man who never reads lives only one."

Feel free to share your thoughts, quote your favorite passages, or reply to fellow readers below.`,status:"approved",upvotes:14,createdAt:new Date(Date.now()-36e5*2).toISOString(),isAuthor:!0},{id:"mock-2",parentId:"mock-1",authorName:"Brenda Frenjo",authorEmail:"readingcircle254@gmail.com",content:"The second chapter in particular felt so poignant. The pacing and character progression really resonated with what we discussed during Sunday's book circle session!",status:"approved",upvotes:8,createdAt:new Date(Date.now()-36e5).toISOString(),isAuthor:!0},{id:"mock-3",parentId:null,authorName:"Amina Odhiambo",authorEmail:"amina@example.com",content:"Reading this made me pause and reflect on how we consume stories in the digital age. Check out this related discussion on [Bookish Perspectives](https://readingcircle254.com/blog)!",status:"approved",upvotes:5,createdAt:new Date(Date.now()-18e5).toISOString()}]}function ae(){let n=window.location.hash;n&&n.startsWith("#comment-")&&setTimeout(()=>{let o=y.querySelector(n);o&&(o.scrollIntoView({behavior:"smooth",block:"center"}),o.classList.add("nyuzi-highlight"),setTimeout(()=>o.classList.remove("nyuzi-highlight"),3500))},200)}async function he(){if(p){f=be(),S=f.length,I=f.filter(n=>!n.parentId).length,O=!1,m();return}try{O=!0,V=1,m();let n=window.location.hash,o=n&&n.startsWith("#comment-")?n.replace("#comment-",""):"",c=await Z(h,i,q,1,ee,o);f=c.comments||[],S=c.total||(c.pagination?.totalComments??f.length),I=c.pagination?.totalTopLevel??f.filter(u=>!u.parentId).length,F=c.pagination?.hasMore??!1,c.thread?.reactions&&Object.keys(c.thread.reactions).length>0&&(k={...k,...c.thread.reactions}),O=!1,m(),ae()}catch(n){console.error("[Nyuzi] Failed to load comments:",n),O=!1,L="Unable to connect to comments server.",m()}}async function ze(){if(!(P||!F||p))try{P=!0,m();let n=V+1,o=await Z(h,i,q,n,ee),c=o.comments||[],u=new Set(f.map(b=>b.id));for(let b of c)u.has(b.id)||f.push(b);V=n,F=o.pagination?.hasMore??!1,I=o.pagination?.totalTopLevel??I,S=o.pagination?.totalComments??S,P=!1,m()}catch(n){console.error("[Nyuzi] Error loading more comments:",n),P=!1,m()}}async function ve(n){let o=H.has(n),c=o?"unvote":"upvote",u=f.find(b=>b.id===n);o?(H.delete(n),u&&(u.upvotes=Math.max(0,(u.upvotes||1)-1))):(H.add(n),u&&(u.upvotes=(u.upvotes||0)+1));try{sessionStorage.setItem("nyuzi_upvotes",JSON.stringify(Array.from(H)))}catch{}if(m(),!p)try{let b=await de(h,n,c);u&&typeof b.upvotes=="number"&&(u.upvotes=b.upvotes,m())}catch{o?(H.add(n),u&&(u.upvotes=(u.upvotes||0)+1)):(H.delete(n),u&&(u.upvotes=Math.max(0,(u.upvotes||1)-1))),m()}}async function oe(n,o,c,u,b=null){if(!(!n.trim()||!c.trim()))try{if($=!0,L=null,m(),p){let l={id:`mock-${Date.now()}`,parentId:b,authorName:n.trim(),authorEmail:o,content:c.trim(),status:"approved",upvotes:0,createdAt:new Date().toISOString()};ne(l.id),b?f.push(l):(f.unshift(l),I+=1),S+=1,R=null,$=!1,m();return}let s=await ue(h,{siteId:i,threadUrl:q,threadTitle:X,postAuthor:G,parentId:b,authorName:n,authorEmail:o,content:c,notifyOnReply:u});s.comment&&(ne(s.comment.id),b?f.push(s.comment):(f.unshift(s.comment),I+=1),S+=1,R=null),$=!1,m()}catch(s){L=s.message||"Failed to post comment. Please try again.",$=!1,m()}}async function xe(n,o){if(o.trim())try{if($=!0,m(),p){let u=f.find(b=>b.id===n);u&&(u.content=o.trim(),u.isEdited=!0),B=null,$=!1,m();return}await me(h,n,o.trim());let c=f.find(u=>u.id===n);c&&(c.content=o.trim(),c.isEdited=!0),B=null,$=!1,m()}catch(c){alert(c.message||"Failed to edit comment."),$=!1,m()}}async function we(n){try{if($=!0,m(),p){f=f.filter(o=>o.id!==n&&o.parentId!==n),S=f.length,I=f.filter(o=>!o.parentId).length,re(n),j=null,$=!1,m();return}await ye(h,n),f=f.filter(o=>o.id!==n&&o.parentId!==n),S=f.length,I=f.filter(o=>!o.parentId).length,re(n),j=null,$=!1,m()}catch{alert("Failed to delete comment. Please try again."),j=null,$=!1,m()}}function ke(n,o){let c=n.selectionStart,u=n.selectionEnd,b=n.value,s=b.substring(c,u),l="",a=0;switch(o){case"bold":l=s?`**${s}**`:"**bold text**",a=s?l.length:2;break;case"italic":l=s?`*${s}*`:"*italic text*",a=s?l.length:1;break;case"quote":s?l=s.split(`
`).map(A=>`> ${A}`).join(`
`):l="> quote text",a=l.length;break;case"code":l=s?`\`${s}\``:"`code`",a=s?l.length:1;break;case"link":l=s?`[${s}](https://)`:"[link title](https://example.com)",a=l.length-1;break;default:return}n.value=b.substring(0,c)+l+b.substring(u),n.focus();let v=c+a;n.setSelectionRange(v,v),n.dispatchEvent(new Event("input",{bubbles:!0}))}function m(){let n=f.filter(u=>!u.parentId),o=le(C),c=fe();C.themeMode&&e&&e.setAttribute("data-theme",C.themeMode),y.innerHTML=`
      <style>${o}</style>
      <div class="nyuzi-container">
        ${C.showReactionsBar?ce(M,C.reactionsPrompt,C.reactionsPreset,k):""}

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

          ${W("nyuzi-main-content",C.allowedFormatting)}
          <textarea class="nyuzi-textarea" id="nyuzi-main-content" maxlength="2000" placeholder="Share your thoughts or leave a question..." required></textarea>
          <div class="nyuzi-counter-row">
            <span id="nyuzi-char-count">0 / 2,000</span>
          </div>

          <div class="nyuzi-form-row">
            <div class="nyuzi-inputs">
              <input type="text" class="nyuzi-input" id="nyuzi-main-name" placeholder="Name *" value="${E(J)}" required />
              <input type="email" class="nyuzi-input" id="nyuzi-main-email" placeholder="Email (for reply alerts)" value="${E(Y)}" />
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
                 ${n.map(u=>Q(u,f,{postAuthor:G,reactionType:C.reactionType,upvotedComments:H,activeReplyId:R,editingCommentId:B,confirmDeleteId:j,collapsedComments:_,myComments:c,isSubmitting:$,savedAuthorName:J,savedAuthorEmail:Y,allowedFormatting:C.allowedFormatting})).join("")}
               </div>
               ${F?`<div class="nyuzi-pagination">
                        <button class="nyuzi-load-more-btn" id="nyuzi-load-more" ${P?"disabled":""}>
                          ${P?'<span class="nyuzi-spinner"></span> Loading comments...':`Load more comments (${Math.max(0,I-n.length)} remaining) \u2193`}
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
    `,$e()}function $e(){y.querySelectorAll(".nyuzi-reaction-pill").forEach(s=>{s.addEventListener("click",async l=>{let a=l.currentTarget.getAttribute("data-reaction-key");if(!a)return;let v=M,A;if(M===a){A="unreact",M=null,k[a]=Math.max(0,(k[a]||1)-1);try{localStorage.removeItem(U)}catch{}}else if(M){A="switch";let w=M;M=a,k[w]=Math.max(0,(k[w]||1)-1),k[a]=(k[a]||0)+1;try{localStorage.setItem(U,a)}catch{}}else{A="react",M=a,k[a]=(k[a]||0)+1;try{localStorage.setItem(U,a)}catch{}}try{localStorage.setItem(te,JSON.stringify(k))}catch{}if(m(),!p)try{let w=await ge(h,{siteId:i,threadUrl:q,threadTitle:X,reactionKey:a,previousKey:v,action:A});w&&w.reactions&&(k={...k,...w.reactions},m())}catch(w){console.warn("[Nyuzi] Failed to sync reaction to server:",w)}})}),y.querySelectorAll(".nyuzi-format-btn").forEach(s=>{s.addEventListener("click",l=>{l.preventDefault();let a=l.currentTarget.getAttribute("data-action"),A=l.currentTarget.closest(".nyuzi-format-toolbar")?.getAttribute("data-target");if(!a||!A)return;let w=y.getElementById(A);w&&ke(w,a)})});let n=y.getElementById("nyuzi-main-content"),o=y.getElementById("nyuzi-char-count");n&&o&&n.addEventListener("input",()=>{o.textContent=`${n.value.length} / 2,000`});let c=y.getElementById("dismiss-error");c&&c.addEventListener("click",()=>{L=null,m()});let u=y.getElementById("nyuzi-main-submit");u&&u.addEventListener("click",()=>{let s=y.getElementById("nyuzi-main-name"),l=y.getElementById("nyuzi-main-email"),a=y.getElementById("nyuzi-main-notify");if(!s.value.trim()){L="Please enter your name.",m();return}if(!n||!n.value.trim()){L="Comment content cannot be empty.",m();return}let v=s.value.trim(),A=l.value.trim()||null;ie(v,A),oe(v,A,n.value.trim(),a?a.checked:!0,null)});let b=y.getElementById("nyuzi-load-more");b&&b.addEventListener("click",()=>{ze()}),y.querySelectorAll(".upvote-btn").forEach(s=>{s.addEventListener("click",l=>{let a=l.currentTarget.getAttribute("data-id");a&&ve(a)})}),y.querySelectorAll(".reply-trigger").forEach(s=>{s.addEventListener("click",l=>{let a=l.currentTarget.getAttribute("data-id");R=R===a?null:a,B=null,j=null,m()})}),y.querySelectorAll(".cancel-reply").forEach(s=>{s.addEventListener("click",()=>{R=null,m()})}),y.querySelectorAll(".submit-reply").forEach(s=>{s.addEventListener("click",l=>{let a=l.currentTarget.getAttribute("data-parent-id");if(!a)return;let v=y.getElementById(`reply-name-${a}`),A=y.getElementById(`reply-email-${a}`),w=y.getElementById(`reply-content-${a}`);if(!v.value.trim()){alert("Please enter your name.");return}if(!w||!w.value.trim()){alert("Reply content cannot be empty.");return}let K=v.value.trim(),se=A?.value.trim()||null;ie(K,se),oe(K,se,w.value.trim(),!0,a)})}),y.querySelectorAll(".edit-trigger").forEach(s=>{s.addEventListener("click",l=>{B=l.currentTarget.getAttribute("data-id"),R=null,j=null,m()})}),y.querySelectorAll(".cancel-edit").forEach(s=>{s.addEventListener("click",()=>{B=null,m()})}),y.querySelectorAll(".save-edit").forEach(s=>{s.addEventListener("click",l=>{let a=l.currentTarget.getAttribute("data-id");if(!a)return;let v=y.getElementById(`edit-content-${a}`);if(!v||!v.value.trim()){alert("Comment content cannot be empty.");return}xe(a,v.value.trim())})}),y.querySelectorAll(".delete-trigger").forEach(s=>{s.addEventListener("click",l=>{j=l.currentTarget.getAttribute("data-id"),R=null,B=null,m()})}),y.querySelectorAll(".nyuzi-cancel-delete-btn").forEach(s=>{s.addEventListener("click",()=>{j=null,m()})}),y.querySelectorAll(".nyuzi-confirm-delete-btn").forEach(s=>{s.addEventListener("click",l=>{let a=l.currentTarget.getAttribute("data-id");a&&we(a)})}),y.querySelectorAll(".nyuzi-collapse-btn").forEach(s=>{s.addEventListener("click",l=>{let a=l.currentTarget.getAttribute("data-id");a&&(_.has(a)?_.delete(a):_.add(a),m())})}),y.querySelectorAll(".copy-link-btn").forEach(s=>{s.addEventListener("click",async l=>{let a=l.currentTarget,v=a.getAttribute("data-id");if(!v)return;let w=`${window.location.href.split("#")[0]}#comment-${v}`;try{await navigator.clipboard.writeText(w);let K=a.innerHTML;a.innerHTML="\u2713 Copied!",a.style.color="var(--nyuzi-accent)",setTimeout(()=>{a.innerHTML=K,a.style.color=""},2e3)}catch{window.location.hash=`comment-${v}`}})})}window.addEventListener("hashchange",ae),he()})();})();
//# sourceMappingURL=embed.js.map