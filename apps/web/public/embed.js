"use strict";(()=>{function Oe(t){if(!t||typeof t!="string"||!t.startsWith("#"))return!1;let a=t.replace("#","");if(a.length!==6&&a.length!==3)return!1;let e=parseInt(a.length===3?a[0]+a[0]:a.slice(0,2),16),s=parseInt(a.length===3?a[1]+a[1]:a.slice(2,4),16),k=parseInt(a.length===3?a[2]+a[2]:a.slice(4,6),16);return(e*299+s*587+k*114)/1e3>155}function Ee(t){let{accent:a,bg:e,cardBg:s,textColor:k,textSecondary:z,borderColor:T,inputBg:$,radius:E="0.75rem",themeMode:J,bgMode:_,resolvedTheme:R=J==="auto"?"dark":J,isCardIsolated:D=!1}=t,v=R||"dark",P=Oe(s);return`
    :host {
      --nyuzi-accent: ${a||"#f56220"};
      --nyuzi-accent-hover: color-mix(in srgb, var(--nyuzi-accent) 80%, black);
      --nyuzi-accent-soft: color-mix(in srgb, var(--nyuzi-accent) 12%, transparent);
      --nyuzi-accent-border: color-mix(in srgb, var(--nyuzi-accent) 30%, transparent);

      --nyuzi-bg: ${D?v==="light"?"#ffffff":"#090605":e||(_==="card"?v==="dark"?"#090605":"#f8fafc":"transparent")};
      --nyuzi-card-bg: ${s||(v==="dark"?"#14100e":v==="sepia"?"#fbf3e4":"#ffffff")};
      --nyuzi-text-primary: ${k||(v==="dark"?P?"#0f172a":"#f8fafc":v==="sepia"?"#2b2118":"#0f172a")};
      --nyuzi-text-secondary: ${z||(v==="dark"?P?"#475569":"#cbd5e1":v==="sepia"?"#6a5949":"#475569")};
      --nyuzi-text-muted: ${v==="sepia"?"#968370":"#94a3b8"};
      --nyuzi-border: ${T||(v==="dark"?P?"#e2e8f0":"rgba(255, 255, 255, 0.12)":v==="sepia"?"#e2d4bc":"#e2e8f0")};
      --nyuzi-input-bg: ${$||(v==="dark"?P?"#ffffff":"#181412":v==="sepia"?"#fbf7ef":"#f8fafc")};
      --nyuzi-reaction-bg: ${v==="dark"?P?"#ffffff":"rgba(255, 255, 255, 0.05)":v==="sepia"?"#fbf7ef":"#ffffff"};
      --nyuzi-reaction-border: ${v==="dark"?P?"#e2e8f0":"rgba(255, 255, 255, 0.1)":v==="sepia"?"#e2d4bc":"#e2e8f0"};
      --nyuzi-badge-bg: ${v==="dark"?P?"#f1f5f9":"rgba(255, 255, 255, 0.08)":v==="sepia"?"#ece0cd":"#f1f5f9"};
      --nyuzi-badge-border: ${v==="dark"?P?"#e2e8f0":"rgba(255, 255, 255, 0.12)":v==="sepia"?"#e2d4bc":"#e2e8f0"};
      --nyuzi-thread-line: ${v==="dark"?P?"#e2e8f0":"rgba(255, 255, 255, 0.12)":v==="sepia"?"#e2d4bc":"#e2e8f0"};
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
      padding: ${D?"1.5rem 1.25rem":"0.75rem 0.5rem"};
      ${D?v==="light"?`
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
    .nyuzi-gif-popover {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      z-index: 1000;
      border-radius: var(--nyuzi-radius);
      box-shadow: 0 16px 40px -6px rgba(0, 0, 0, 0.45), 0 4px 12px rgba(0, 0, 0, 0.2);
      border: 1px solid var(--nyuzi-border);
      background: var(--nyuzi-card-bg);
      overflow: hidden;
      width: 320px;
      max-width: calc(100vw - 2.5rem);
      animation: nyuziFadeDown 0.15s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .nyuzi-gif-header {
      padding: 0.5rem;
      border-bottom: 1px solid var(--nyuzi-border);
      background: var(--nyuzi-input-bg);
    }
    .nyuzi-gif-search-input {
      width: 100%;
      padding: 0.45rem 0.65rem;
      border-radius: 0.375rem;
      border: 1px solid var(--nyuzi-border);
      background: var(--nyuzi-card-bg);
      color: var(--nyuzi-text-primary);
      font-size: 0.8125rem;
      outline: none;
      box-sizing: border-box;
      transition: border-color 0.15s;
    }
    .nyuzi-gif-search-input:focus {
      border-color: var(--nyuzi-accent);
    }
    .nyuzi-gif-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.35rem;
      padding: 0.5rem;
      max-height: 250px;
      overflow-y: auto;
    }
    .nyuzi-gif-card {
      position: relative;
      border-radius: 0.375rem;
      overflow: hidden;
      cursor: pointer;
      background: var(--nyuzi-reaction-bg);
      height: 90px;
      transition: transform 0.15s, box-shadow 0.15s;
    }
    .nyuzi-gif-card:hover {
      transform: scale(1.02);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
    .nyuzi-gif-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .nyuzi-gif-footer {
      padding: 0.3rem 0.5rem;
      text-align: right;
      font-size: 0.625rem;
      font-weight: 700;
      color: var(--nyuzi-text-muted);
      border-top: 1px solid var(--nyuzi-border);
      background: var(--nyuzi-input-bg);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .nyuzi-attached-gif-preview {
      position: relative;
      display: inline-block;
      margin-top: 0.5rem;
      border-radius: var(--nyuzi-radius);
      overflow: hidden;
      border: 1px solid var(--nyuzi-border);
      max-width: 180px;
      max-height: 120px;
    }
    .nyuzi-attached-gif-preview img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .nyuzi-attached-gif-remove {
      position: absolute;
      top: 4px;
      right: 4px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.65);
      color: white;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      line-height: 1;
      transition: background 0.15s;
    }
    .nyuzi-attached-gif-remove:hover {
      background: #ef4444;
    }
    .nyuzi-comment-gif-wrapper {
      margin-top: 0.65rem;
      max-width: 320px;
      border-radius: var(--nyuzi-radius);
      overflow: hidden;
      border: 1px solid var(--nyuzi-border);
      background: var(--nyuzi-card-bg);
    }
    .nyuzi-comment-gif {
      display: block;
      width: 100%;
      max-height: 220px;
      object-fit: cover;
      border-radius: var(--nyuzi-radius);
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
    ${_==="card"?`
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
  `}function C(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function Ue(t){let a=t.trim().split(/\s+/);return a.length===1?a[0].slice(0,2).toUpperCase():(a[0][0]+a[a.length-1][0]).toUpperCase()}function Ye(t){try{let a=new Date(t),s=Math.floor((new Date().getTime()-a.getTime())/1e3);return s<60?"just now":s<3600?`${Math.floor(s/60)}m ago`:s<86400?`${Math.floor(s/3600)}h ago`:s<604800?`${Math.floor(s/86400)}d ago`:a.toLocaleDateString(void 0,{month:"short",day:"numeric"})}catch{return"recently"}}function Je(t,a){if(!t)return"";let e=C(t),s=a??["bold","italic","quote","code","link","emoji","gif"];if(s.includes("code")&&(e=e.replace(/`([^`\n]+)`/g,"<code>$1</code>")),s.includes("bold")&&(e=e.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>")),s.includes("italic")&&(e=e.replace(/(^|[^*])\*([^*]+)\*([^*]|$)/g,"$1<em>$2</em>$3")),s.includes("gif")){let E=0;e=e.replace(/!\[([^\]]*)\]\(((?:https?:\/\/)[^\s)]+(?:\.(?:gif|webp|png|jpg|jpeg)[^\s)]*|(?:giphy\.com|tenor\.com)[^\s)]*))\)/gi,(J,_,R)=>E===0?(E++,`<div class="nyuzi-comment-gif-wrapper"><img src="${R}" alt="${_}" class="nyuzi-comment-gif" loading="lazy" /></div>`):`[GIF: ${_}]`)}s.includes("link")?e=e.replace(/\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'):e=e.replace(/\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)/g,"$1 ($2)");let k=e.split(`
`),z=[],T=!1,$=[];for(let E of k)s.includes("quote")&&(E.startsWith("&gt; ")||E==="&gt;")?(T=!0,$.push(E.replace(/^&gt; ?/,""))):(T&&(z.push(`<blockquote>${$.join("<br/>")}</blockquote>`),$=[],T=!1),z.push(E));return T&&z.push(`<blockquote>${$.join("<br/>")}</blockquote>`),z.join(`
`).replace(/(<\/blockquote>)\n+/g,"$1").replace(/\n+(<blockquote>)/g,"$1").replace(/\n/g,"<br/>")}function Ke(t,a){return t==="upvote"?`<svg class="nyuzi-reaction-icon" viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" fill="${a?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`:t==="like"?`<svg class="nyuzi-reaction-icon nyuzi-like-icon" viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2" fill="${a?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12M15 10.5a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3v2.5M7 10l5-6v5h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7"/><path d="M7 10H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"/></svg>`:`<svg class="nyuzi-reaction-icon nyuzi-heart-icon" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="${a?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>`}function We(){return'<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>'}function Ve(){return'<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'}function Qe(){return'<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>'}function Xe(){return'<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>'}function Ze(t,a){return t.upvotes>0?`${t.upvotes}`:a==="upvote"?"Upvote":"Like"}function et(t,a){if(!t)return!1;let e=t.trim().toLowerCase();return a&&e===a.trim().toLowerCase()?!0:e.includes("fred juma")||e.includes("brenda frenjo")||e.includes("sumeiya juma")}function le(t,a){let e=a&&a.length>0?a:["bold","italic","quote","code","link","emoji","gif"],s=[];return e.includes("bold")&&s.push(`
      <button type="button" class="nyuzi-format-btn" data-action="bold" title="Bold (**text**)">
        <strong>B</strong>
      </button>`),e.includes("italic")&&s.push(`
      <button type="button" class="nyuzi-format-btn" data-action="italic" title="Italic (*text*)">
        <em>I</em>
      </button>`),e.includes("quote")&&s.push(`
      <button type="button" class="nyuzi-format-btn" data-action="quote" title="Quote (> text)">
        &ldquo;
      </button>`),e.includes("code")&&s.push(`
      <button type="button" class="nyuzi-format-btn" data-action="code" title="Inline Code (\`code\`)">
        &lt;/&gt;
      </button>`),e.includes("link")&&s.push(`
      <button type="button" class="nyuzi-format-btn" data-action="link" title="Link ([text](url))">
        <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
      </button>`),e.includes("emoji")&&s.push(`
      <button type="button" class="nyuzi-format-btn nyuzi-emoji-btn" data-action="emoji" title="Insert Emoji">
        <span style="font-size: 0.95rem; line-height: 1; display: inline-block;">\u{1F600}</span>
      </button>`),e.includes("gif")&&s.push(`
      <button type="button" class="nyuzi-format-btn nyuzi-gif-btn" data-action="gif" title="Search & Insert GIF">
        <span style="font-size: 0.6875rem; font-weight: 800; letter-spacing: -0.02em; padding: 1px 4px; border-radius: 4px; background: var(--nyuzi-accent-soft); color: var(--nyuzi-accent);">GIF</span>
      </button>`),s.length===0?"":`
    <div class="nyuzi-format-toolbar" data-target="${t}">
      ${s.join("")}
      <div class="nyuzi-emoji-popover" style="display: none;"></div>
      <div class="nyuzi-gif-popover" style="display: none;"></div>
    </div>
  `}function Ae(t,a="How was this discussion?",e="general",s){let T=e==="literary"?[{key:"coffee",emoji:"\u2615",label:"Thoughtful"},{key:"book",emoji:"\u{1F4D6}",label:"Engrossing"},{key:"lightbulb",emoji:"\u{1F4A1}",label:"Insight"},{key:"heart",emoji:"\u2764\uFE0F",label:"Moved"},{key:"clap",emoji:"\u{1F44F}",label:"Applause"}]:[{key:"fire",emoji:"\u{1F525}",label:"Superb"},{key:"heart",emoji:"\u2764\uFE0F",label:"Love"},{key:"lightbulb",emoji:"\u{1F4A1}",label:"Insight"},{key:"laugh",emoji:"\u{1F602}",label:"Laugh"},{key:"clap",emoji:"\u{1F44F}",label:"Applause"}];return`
    <div class="nyuzi-reactions-bar">
      <div class="nyuzi-reactions-prompt">${C(a||"How was this discussion?")}</div>
      <div class="nyuzi-reactions-grid">
        ${T.map($=>{let E=Number(s?.[$.key])||0;return`
          <div class="nyuzi-reaction-pill ${t===$.key?"active":""}" data-reaction-key="${$.key}">
            <div class="emoji-row">
              <span>${$.emoji}</span>
              ${E>0?`<span class="reaction-count">${E}</span>`:""}
            </div>
            <span class="reaction-label">${$.label}</span>
          </div>
        `}).join("")}
      </div>
    </div>
  `}function ue(t,a,e){let s=a.filter(R=>R.parentId===t.id);s.sort((R,D)=>new Date(R.createdAt).getTime()-new Date(D.createdAt).getTime());let k=e.activeReplyId===t.id,z=e.editingCommentId===t.id,T=e.confirmDeleteId===t.id,$=e.collapsedComments.has(t.id),E=e.upvotedComments.has(t.id),J=e.myComments.has(t.id),_=t.isAuthor??et(t.authorName,e.postAuthor);return`
    <div class="nyuzi-comment" id="comment-${t.id}">
      <div class="nyuzi-avatar">${C(Ue(t.authorName))}</div>
      <div class="nyuzi-body">
        <div class="nyuzi-meta">
          <span class="nyuzi-author">${C(t.authorName)}</span>
          ${_?'<span class="nyuzi-author-badge">Author</span>':""}
          <span class="nyuzi-time">${Ye(t.createdAt)}</span>
          ${t.isEdited?'<span class="nyuzi-edited-tag" title="Edited by reader">(edited)</span>':""}
        </div>

        ${z?`
            <div class="nyuzi-edit-box">
              ${le(`edit-content-${t.id}`,e.allowedFormatting)}
              <textarea class="nyuzi-textarea nyuzi-edit-textarea" id="edit-content-${t.id}" rows="3" maxlength="2000">${C(t.content)}</textarea>
              <div class="nyuzi-attached-gif-preview" id="edit-content-${t.id}-gif-preview" style="display: none;"></div>
              <div class="nyuzi-edit-actions">
                <button class="nyuzi-action-btn cancel-edit" data-id="${t.id}">Cancel</button>
                <button class="nyuzi-submit-btn save-edit" data-id="${t.id}" ${e.isSubmitting?"disabled":""}>
                  ${e.isSubmitting?"Saving...":"Save Changes"}
                </button>
              </div>
            </div>
          `:T?`
            <div class="nyuzi-confirm-pill">
              <span>Delete this comment?</span>
              <button class="nyuzi-confirm-delete-btn" data-id="${t.id}" ${e.isSubmitting?"disabled":""}>
                ${e.isSubmitting?"Deleting...":"Yes, Delete"}
              </button>
              <button class="nyuzi-cancel-delete-btn" data-id="${t.id}">Cancel</button>
            </div>
          `:`<div class="nyuzi-content">${Je(t.content,e.allowedFormatting)}</div>`}

        ${!z&&!T?`
          <div class="nyuzi-actions">
            <button class="nyuzi-action-btn upvote-btn ${E?"upvoted":""}" data-id="${t.id}" title="${E?"Unlike":"Like"}">
              ${Ke(e.reactionType,E)}
              <span>${Ze(t,e.reactionType)}</span>
            </button>
            <button class="nyuzi-action-btn reply-trigger" data-id="${t.id}">
              ${We()}
              <span>Reply</span>
            </button>
            <button class="nyuzi-action-btn copy-link-btn" data-id="${t.id}" title="Copy direct link to this comment">
              ${Ve()}
              <span>Copy Link</span>
            </button>
            ${J?`
              <button class="nyuzi-action-btn edit-trigger" data-id="${t.id}" title="Edit your comment (15m grace window)">
                ${Qe()}
                <span>Edit</span>
              </button>
              <button class="nyuzi-action-btn delete-trigger" data-id="${t.id}" title="Delete your comment">
                ${Xe()}
                <span>Delete</span>
              </button>
            `:""}
          </div>
        `:""}

        ${k?`
            <div class="nyuzi-reply-box">
              ${le(`reply-content-${t.id}`,e.allowedFormatting)}
              <textarea class="nyuzi-textarea" id="reply-content-${t.id}" placeholder="Reply to ${C(t.authorName)}..." maxlength="2000" required></textarea>
              <div class="nyuzi-attached-gif-preview" id="reply-content-${t.id}-gif-preview" style="display: none;"></div>
              <div class="nyuzi-form-row">
                <div class="nyuzi-inputs">
                  <input type="text" class="nyuzi-input" id="reply-name-${t.id}" placeholder="Your Name *" value="${C(e.savedAuthorName)}" required />
                  <input type="email" class="nyuzi-input" id="reply-email-${t.id}" placeholder="Email (for reply alerts)" value="${C(e.savedAuthorEmail)}" />
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

        ${s.length>0?`
          <div class="nyuzi-replies-wrapper">
            <button class="nyuzi-collapse-btn" data-id="${t.id}" title="${$?"Expand replies":"Collapse replies"}">
              <svg class="nyuzi-collapse-chevron ${$?"collapsed":""}" viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              <span>${$?`Show ${s.length} ${s.length===1?"reply":"replies"}`:`Hide ${s.length} ${s.length===1?"reply":"replies"}`}</span>
            </button>
            ${$?"":`
              <div class="nyuzi-replies">
                ${s.map(R=>ue(R,a,e)).join("")}
              </div>
            `}
          </div>
        `:""}
      </div>
    </div>
  `}async function me(t,a,e,s,k,z){let T=z?`&highlight=${encodeURIComponent(z)}`:"",$=`${t}/api/v1/comments?siteId=${encodeURIComponent(a)}&threadUrl=${encodeURIComponent(e)}&page=${s}&limit=${k}${T}`,E=await fetch($);if(!E.ok)throw new Error(`HTTP ${E.status}`);return E.json()}async function $e(t,a){let e=await fetch(`${t}/api/v1/comments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(!e.ok){let s=await e.json().catch(()=>({}));throw new Error(s.error||`HTTP ${e.status}`)}return e.json()}async function Te(t,a,e){let s=await fetch(`${t}/api/v1/comments/${encodeURIComponent(a)}/upvote`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:e})});if(!s.ok)throw new Error("Vote action failed");return s.json()}async function Ce(t,a,e){let s=await fetch(`${t}/api/v1/comments/${encodeURIComponent(a)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:e})});if(!s.ok){let k=await s.json().catch(()=>({}));throw new Error(k.error||`HTTP ${s.status}`)}return s.json()}async function Le(t,a){let e=await fetch(`${t}/api/v1/comments/${encodeURIComponent(a)}`,{method:"DELETE"});if(!e.ok)throw new Error("Delete action failed");return e.json()}async function Se(t,a){let e=await fetch(`${t}/api/v1/threads/react`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(!e.ok)throw new Error("Thread reaction failed");return e.json()}async function Me(t,a=""){let e=`${t}/api/v1/gifs?q=${encodeURIComponent(a)}&limit=16`,s=await fetch(e);if(!s.ok)throw new Error("Failed to load GIFs");return(await s.json()).data||[]}(function(){let t=document.currentScript,a=document.getElementById("nyuzi-comments")||document.querySelector("nyuzi-comments");if(!a){console.warn("[Nyuzi] No container found (#nyuzi-comments or <nyuzi-comments>).");return}let e=a;if(e.__nyuzi_initialized)return;e.__nyuzi_initialized=!0;let s=t?.getAttribute("data-site-id")||e.getAttribute("data-site-id")||document.querySelector("[data-nyuzi-site-id]")?.getAttribute("data-nyuzi-site-id")||"",k=t?.getAttribute("data-api")||e.getAttribute("data-api")||"https://nyuzi-api.fredjuma8.workers.dev",z=t?.getAttribute("data-mock")==="true"||e.getAttribute("data-mock")==="true",T=t?.getAttribute("data-reactions-bar")??e.getAttribute("data-reactions-bar"),$=T===null?!0:T!=="false",E=t?.getAttribute("data-reactions-prompt")||e.getAttribute("data-reactions-prompt")||"How was this discussion?",J=t?.getAttribute("data-reactions-preset")||e.getAttribute("data-reactions-preset")||"general",R=(t?.getAttribute("data-formatting")||e.getAttribute("data-formatting")||"bold,italic,quote,code,link,emoji,gif").split(",").map(i=>i.trim().toLowerCase()).filter(Boolean),D=t?.src||"",v="https://nyuzi-yap.vercel.app";if(D)try{v=new URL(D).origin}catch{}let P=`${v}/emoji-picker.js`,W=!1,te=!1;function pe(){return typeof customElements<"u"&&customElements.get("emoji-picker")?(W=!0,Promise.resolve()):W?Promise.resolve():new Promise((i,r)=>{let l=document.querySelector('script[src*="emoji-picker.js"]');if(l){if(customElements.get("emoji-picker"))return W=!0,i();l.addEventListener("load",()=>{W=!0,i()}),l.addEventListener("error",r);return}te=!0;let n=document.createElement("script");n.src=P,n.async=!0,n.onload=()=>{W=!0,te=!1,i()},n.onerror=m=>{te=!1,r(m)},document.head.appendChild(n)})}function ge(){W||te||typeof customElements<"u"&&customElements.get("emoji-picker")||pe().catch(()=>{})}function Ie(i,r){let l=i.selectionStart??i.value.length,n=i.selectionEnd??i.value.length,m=i.value;i.value=m.substring(0,l)+r+m.substring(n);let b=l+r.length;i.focus(),i.setSelectionRange(b,b),i.dispatchEvent(new Event("input",{bubbles:!0}))}let tt=!!(t?.getAttribute("data-accent-color")||e.getAttribute("data-accent-color")),it=!!(t?.getAttribute("data-theme")||e.getAttribute("data-theme")),nt=!!(t?.getAttribute("data-bg")||e.getAttribute("data-bg")),rt=!!(t?.getAttribute("data-bg-color")||e.getAttribute("data-bg-color")),ot=!!(t?.getAttribute("data-card-bg")||e.getAttribute("data-card-bg")),at=!!(t?.getAttribute("data-text-color")||e.getAttribute("data-text-color")),st=!!(t?.getAttribute("data-border-color")||e.getAttribute("data-border-color")),lt=!!(t?.getAttribute("data-radius")||e.getAttribute("data-radius")),ct=!!(t?.getAttribute("data-reaction")||e.getAttribute("data-reaction")),dt=T!=null,ut=!!(t?.getAttribute("data-reactions-prompt")||e.getAttribute("data-reactions-prompt")),mt=!!(t?.getAttribute("data-reactions-preset")||e.getAttribute("data-reactions-preset"));function je(){try{let i=document.documentElement,r=document.body,l=i.getAttribute("data-theme")||i.getAttribute("data-color-mode")||i.getAttribute("data-bs-theme")||"",n=r?.getAttribute("data-theme")||r?.getAttribute("data-color-mode")||r?.getAttribute("data-bs-theme")||"",m=`${l} ${n}`.toLowerCase();if(m.includes("dark"))return"dark";if(m.includes("light"))return"light";if(i.classList.contains("dark")||i.classList.contains("dark-theme")||i.classList.contains("dark-mode")||i.classList.contains("theme-dark")||!!(r&&(r.classList.contains("dark")||r.classList.contains("dark-theme")||r.classList.contains("dark-mode")||r.classList.contains("theme-dark"))))return"dark";if(i.classList.contains("light")||i.classList.contains("light-theme")||i.classList.contains("light-mode")||i.classList.contains("theme-light")||!!(r&&(r.classList.contains("light")||r.classList.contains("light-theme")||r.classList.contains("light-mode")||r.classList.contains("theme-light"))))return"light";let L=e.parentElement;for(;L&&L!==document.documentElement;){let c=window.getComputedStyle(L).backgroundColor;if(c&&c!=="transparent"&&!c.startsWith("rgba(0, 0, 0, 0)")){let d=c.match(/\d+/g);if(d&&d.length>=3){let o=parseInt(d[0],10),f=parseInt(d[1],10),p=parseInt(d[2],10);if((d.length>=4?parseFloat(d[3]):1)>.1)return(o*299+f*587+p*114)/1e3<130?"dark":"light"}}L=L.parentElement}if(r){let c=window.getComputedStyle(r).backgroundColor;if(c&&c!=="transparent"&&!c.startsWith("rgba(0, 0, 0, 0)")){let d=c.match(/\d+/g);if(d&&d.length>=3){let o=parseInt(d[0],10),f=parseInt(d[1],10),p=parseInt(d[2],10);return(o*299+f*587+p*114)/1e3<130?"dark":"light"}}}}catch{}return typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}let h={accent:t?.getAttribute("data-accent-color")||e.getAttribute("data-accent-color")||"#f56220",bg:t?.getAttribute("data-bg-color")||e.getAttribute("data-bg-color")||"",cardBg:t?.getAttribute("data-card-bg")||e.getAttribute("data-card-bg")||"",textColor:t?.getAttribute("data-text-color")||e.getAttribute("data-text-color")||"",textSecondary:t?.getAttribute("data-text-secondary")||e.getAttribute("data-text-secondary")||"",borderColor:t?.getAttribute("data-border-color")||e.getAttribute("data-border-color")||"",inputBg:t?.getAttribute("data-input-bg")||e.getAttribute("data-input-bg")||"",radius:t?.getAttribute("data-radius")||e.getAttribute("data-radius")||"0.75rem",reactionType:t?.getAttribute("data-reaction")||e.getAttribute("data-reaction")||"like",themeMode:t?.getAttribute("data-theme")||e.getAttribute("data-theme")||"auto",bgMode:t?.getAttribute("data-bg")||e.getAttribute("data-bg")||"transparent",showReactionsBar:$,reactionsPrompt:E,reactionsPreset:J,allowedFormatting:R},g=e.shadowRoot||e.attachShadow({mode:"open"});g.innerHTML="",h.themeMode&&e.setAttribute("data-theme",h.themeMode);let V=t?.getAttribute("data-thread-url")||e.getAttribute("data-thread-url")||window.location.href.split("#")[0],ye=t?.getAttribute("data-thread-title")||e.getAttribute("data-thread-title")||document.title||"Discussion",ce=t?.getAttribute("data-author-name")||e.getAttribute("data-author-name")||"",x=[],N=0,F=0,de=1,fe=15,ie=!1,Q=!1,X=!0,G=null,O=null,K=null,U=null,S=!1,q=null,Y=new Set,ne=new Set,re=!1,oe=`nyuzi_react_${s}_${encodeURIComponent(V)}`,be=`nyuzi_counts_${s}_${encodeURIComponent(V)}`,M={...z?h.reactionsPreset==="literary"?{coffee:21,book:28,lightbulb:14,heart:19,clap:16}:{fire:18,heart:24,lightbulb:12,laugh:7,clap:15}:{}};try{let i=localStorage.getItem(oe);i&&(q=i)}catch{}if(z)try{let i=localStorage.getItem(be);i&&(M={...M,...JSON.parse(i)})}catch{}let Z="nyuzi_reader_ownership",He=900*1e3;function he(i){try{let r=localStorage.getItem(Z),l=r?JSON.parse(r):{};l[i]=Date.now()+He,localStorage.setItem(Z,JSON.stringify(l))}catch{}}function ve(i){try{let r=localStorage.getItem(Z);if(r){let l=JSON.parse(r);delete l[i],localStorage.setItem(Z,JSON.stringify(l))}}catch{}}function Be(){let i=new Set;try{let r=localStorage.getItem(Z);if(r){let l=JSON.parse(r),n=Date.now();for(let[m,b]of Object.entries(l))n<b&&i.add(m)}}catch{}return z&&i.add("mock-3"),i}try{let i=sessionStorage.getItem("nyuzi_upvotes");i&&JSON.parse(i).forEach(r=>Y.add(r))}catch{}let ae="",se="";try{ae=localStorage.getItem("nyuzi_author_name")||"",se=localStorage.getItem("nyuzi_author_email")||""}catch{}function ze(i,r){i&&(ae=i),r&&(se=r);try{i&&localStorage.setItem("nyuzi_author_name",i),r&&localStorage.setItem("nyuzi_author_email",r)}catch{}}function Re(){return[{id:"mock-1",parentId:null,authorName:ce||"Fred Juma",authorEmail:"fredjuma8@gmail.com",content:`Welcome to our literary salon! **The Reading Circle** invites your reflections on this essay:

> "A reader lives a thousand lives before he dies. The man who never reads lives only one."

Feel free to share your thoughts, quote your favorite passages, or reply to fellow readers below.`,status:"approved",upvotes:14,createdAt:new Date(Date.now()-36e5*2).toISOString(),isAuthor:!0},{id:"mock-2",parentId:"mock-1",authorName:"Brenda Frenjo",authorEmail:"readingcircle254@gmail.com",content:`The second chapter in particular felt so poignant. The pacing and character progression really resonated with what we discussed during Sunday's book circle session!

![Mind Blown](https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif)`,status:"approved",upvotes:8,createdAt:new Date(Date.now()-36e5).toISOString(),isAuthor:!0},{id:"mock-3",parentId:null,authorName:"Amina Odhiambo",authorEmail:"amina@example.com",content:"Reading this made me pause and reflect on how we consume stories in the digital age. Check out this related discussion on [Bookish Perspectives](https://readingcircle254.com/blog)!",status:"approved",upvotes:5,createdAt:new Date(Date.now()-18e5).toISOString()}]}function xe(){let i=window.location.hash;i&&i.startsWith("#comment-")&&setTimeout(()=>{let r=g.querySelector(i);r&&(r.scrollIntoView({behavior:"smooth",block:"center"}),r.classList.add("nyuzi-highlight"),setTimeout(()=>r.classList.remove("nyuzi-highlight"),3500))},200)}async function Pe(){if(z){x=Re(),N=x.length,F=x.filter(i=>!i.parentId).length,X=!1,y();return}try{X=!0,de=1,y();let i=window.location.hash,r=i&&i.startsWith("#comment-")?i.replace("#comment-",""):"",l=await me(k,s,V,1,fe,r);if(x=l.comments||[],N=l.total||(l.pagination?.totalComments??x.length),F=l.pagination?.totalTopLevel??x.filter(n=>!n.parentId).length,ie=l.pagination?.hasMore??!1,z||(M=l.thread?.reactions&&typeof l.thread.reactions=="object"?{...l.thread.reactions}:{}),l.siteSettings&&typeof l.siteSettings=="object"){let n=l.siteSettings;n.accentColor&&(h.accent=n.accentColor),n.themeMode&&(h.themeMode=n.themeMode),n.bgMode&&(h.bgMode=n.bgMode),n.canvasBg!==void 0&&n.canvasBg!==""&&(h.bg=n.canvasBg),n.cardBg!==void 0&&n.cardBg!==""&&(h.cardBg=n.cardBg),n.textColor!==void 0&&n.textColor!==""&&(h.textColor=n.textColor),n.borderColor!==void 0&&n.borderColor!==""&&(h.borderColor=n.borderColor),n.radiusValue&&(h.radius=n.radiusValue),n.reactionType&&(h.reactionType=n.reactionType),n.showReactionsBar!==void 0&&(h.showReactionsBar=!!n.showReactionsBar),n.reactionsPrompt&&(h.reactionsPrompt=n.reactionsPrompt),n.reactionsPreset&&(h.reactionsPreset=n.reactionsPreset),Array.isArray(n.formattingTools)&&(h.allowedFormatting=n.formattingTools)}X=!1,y(),xe()}catch(i){console.error("[Nyuzi] Failed to load comments:",i),X=!1,G="Unable to connect to comments server.",y()}}async function Ne(){if(!(Q||!ie||z))try{Q=!0,y();let i=de+1,r=await me(k,s,V,i,fe),l=r.comments||[],n=new Set(x.map(m=>m.id));for(let m of l)n.has(m.id)||x.push(m);de=i,ie=r.pagination?.hasMore??!1,F=r.pagination?.totalTopLevel??F,N=r.pagination?.totalComments??N,Q=!1,y()}catch(i){console.error("[Nyuzi] Error loading more comments:",i),Q=!1,y()}}async function Fe(i){let r=Y.has(i),l=r?"unvote":"upvote",n=x.find(m=>m.id===i);r?(Y.delete(i),n&&(n.upvotes=Math.max(0,(n.upvotes||1)-1))):(Y.add(i),n&&(n.upvotes=(n.upvotes||0)+1));try{sessionStorage.setItem("nyuzi_upvotes",JSON.stringify(Array.from(Y)))}catch{}if(y(),!z)try{let m=await Te(k,i,l);n&&typeof m.upvotes=="number"&&(n.upvotes=m.upvotes,y())}catch{r?(Y.add(i),n&&(n.upvotes=(n.upvotes||0)+1)):(Y.delete(i),n&&(n.upvotes=Math.max(0,(n.upvotes||1)-1))),y()}}async function we(i,r,l,n,m=null){if(!(!i.trim()||!l.trim()))try{if(S=!0,G=null,y(),z){let A={id:`mock-${Date.now()}`,parentId:m,authorName:i.trim(),authorEmail:r,content:l.trim(),status:"approved",upvotes:0,createdAt:new Date().toISOString()};he(A.id),m?x.push(A):(x.unshift(A),F+=1),N+=1,O=null,S=!1,y();return}let b=await $e(k,{siteId:s,threadUrl:V,threadTitle:ye,postAuthor:ce,parentId:m,authorName:i,authorEmail:r,content:l,notifyOnReply:n});b.comment&&(he(b.comment.id),m?x.push(b.comment):(x.unshift(b.comment),F+=1),N+=1,O=null),S=!1,y()}catch(b){G=b.message||"Failed to post comment. Please try again.",S=!1,y()}}async function qe(i,r){if(r.trim())try{if(S=!0,y(),z){let n=x.find(m=>m.id===i);n&&(n.content=r.trim(),n.isEdited=!0),K=null,S=!1,y();return}await Ce(k,i,r.trim());let l=x.find(n=>n.id===i);l&&(l.content=r.trim(),l.isEdited=!0),K=null,S=!1,y()}catch(l){alert(l.message||"Failed to edit comment."),S=!1,y()}}async function _e(i){try{if(S=!0,y(),z){x=x.filter(r=>r.id!==i&&r.parentId!==i),N=x.length,F=x.filter(r=>!r.parentId).length,ve(i),U=null,S=!1,y();return}await Le(k,i),x=x.filter(r=>r.id!==i&&r.parentId!==i),N=x.length,F=x.filter(r=>!r.parentId).length,ve(i),U=null,S=!1,y()}catch{alert("Failed to delete comment. Please try again."),U=null,S=!1,y()}}function De(i,r){let l=i.selectionStart,n=i.selectionEnd,m=i.value,b=m.substring(l,n),A="",L=0;switch(r){case"bold":A=b?`**${b}**`:"**bold text**",L=b?A.length:2;break;case"italic":A=b?`*${b}*`:"*italic text*",L=b?A.length:1;break;case"quote":b?A=b.split(`
`).map(d=>`> ${d}`).join(`
`):A="> quote text",L=A.length;break;case"code":A=b?`\`${b}\``:"`code`",L=b?A.length:1;break;case"link":A=b?`[${b}](https://)`:"[link title](https://example.com)",L=A.length-1;break;default:return}i.value=m.substring(0,l)+A+m.substring(n),i.focus();let c=l+L;i.setSelectionRange(c,c),i.dispatchEvent(new Event("input",{bubbles:!0}))}function y(){let i=x.filter(d=>!d.parentId),r=je(),l=h.themeMode==="auto"?r:h.themeMode||r,n=l==="light"&&r==="dark"||l==="dark"&&r==="light",m=!h.bg||h.bg==="transparent"||h.bgMode==="transparent",b=!!(n&&m&&h.themeMode!=="auto"),A={...h,resolvedTheme:l,isCardIsolated:b},L=Ee(A),c=Be();e&&(e.setAttribute("data-theme",l),b?e.setAttribute("data-card-isolated","true"):e.removeAttribute("data-card-isolated")),g.innerHTML=`
      <style>${L}</style>
      <div class="nyuzi-container">
        ${h.showReactionsBar?Ae(q,h.reactionsPrompt,h.reactionsPreset,M):""}

        <!-- Header -->
        <div class="nyuzi-header">
          <h3 class="nyuzi-title">
            Discussion
            <span class="nyuzi-badge">${N}</span>
          </h3>
        </div>

        <!-- Main Form -->
        <div class="nyuzi-form">
          ${G?`<div class="nyuzi-alert">
                   <span>\u26A0\uFE0F ${C(G)}</span>
                   <button class="nyuzi-action-btn" id="dismiss-error" style="color:#b91c1c;">\u2715</button>
                 </div>`:""}

          ${le("nyuzi-main-content",h.allowedFormatting)}
          <textarea class="nyuzi-textarea" id="nyuzi-main-content" maxlength="2000" placeholder="Share your thoughts or leave a question..." required></textarea>
          <div class="nyuzi-attached-gif-preview" id="nyuzi-main-content-gif-preview" style="display: none;"></div>
          <div class="nyuzi-counter-row">
            <span id="nyuzi-char-count">0 / 2,000</span>
          </div>

          <div class="nyuzi-form-row">
            <div class="nyuzi-inputs">
              <input type="text" class="nyuzi-input" id="nyuzi-main-name" placeholder="Name *" value="${C(ae)}" required />
              <input type="email" class="nyuzi-input" id="nyuzi-main-email" placeholder="Email (for reply alerts)" value="${C(se)}" />
            </div>
            <button class="nyuzi-submit-btn" id="nyuzi-main-submit" ${S?"disabled":""}>
              ${S?"Posting...":"Post Comment"}
            </button>
          </div>

          <label class="nyuzi-optin" id="nyuzi-optin-wrapper">
            <input type="checkbox" id="nyuzi-main-notify" checked />
            <span>Notify me via email when someone replies</span>
          </label>
        </div>

        <!-- Comments Stream -->
        ${X?`<div class="nyuzi-skeleton">
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
               </div>`:i.length===0?`<div class="nyuzi-empty">
                 <p style="font-size:1.1rem; margin:0 0 0.25rem 0; font-weight:600; color:var(--nyuzi-text-primary);">No comments yet</p>
                 <p style="margin:0; font-size:0.875rem;">Be the first to share your thoughts!</p>
               </div>`:`<div class="nyuzi-list">
                 ${i.map(d=>ue(d,x,{postAuthor:ce,reactionType:h.reactionType,upvotedComments:Y,activeReplyId:O,editingCommentId:K,confirmDeleteId:U,collapsedComments:ne,myComments:c,isSubmitting:S,savedAuthorName:ae,savedAuthorEmail:se,allowedFormatting:h.allowedFormatting})).join("")}
               </div>
               ${ie?`<div class="nyuzi-pagination">
                        <button class="nyuzi-load-more-btn" id="nyuzi-load-more" ${Q?"disabled":""}>
                          ${Q?'<span class="nyuzi-spinner"></span> Loading comments...':`Load more comments (${Math.max(0,F-i.length)} remaining) \u2193`}
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
    `,Ge()}function Ge(){g.querySelectorAll(".nyuzi-reaction-pill").forEach(c=>{c.addEventListener("click",async d=>{if(re)return;let o=d.currentTarget.getAttribute("data-reaction-key");if(!o)return;re=!0;let f=q,p;if(q===o){p="unreact",q=null,M[o]=Math.max(0,(M[o]||1)-1);try{localStorage.removeItem(oe)}catch{}}else if(q){p="switch";let u=q;q=o,M[u]=Math.max(0,(M[u]||1)-1),M[o]=(M[o]||0)+1;try{localStorage.setItem(oe,o)}catch{}}else{p="react",q=o,M[o]=(M[o]||0)+1;try{localStorage.setItem(oe,o)}catch{}}try{localStorage.setItem(be,JSON.stringify(M))}catch{}if(y(),z)re=!1;else try{let u=await Se(k,{siteId:s,threadUrl:V,threadTitle:ye,reactionKey:o,previousKey:f,action:p});u&&u.reactions&&(M={...u.reactions},y())}catch(u){console.warn("[Nyuzi] Failed to sync reaction to server:",u)}finally{re=!1}})});async function i(c,d){let o=c.querySelector(".nyuzi-emoji-popover");if(!o)return;if(o.style.display!=="none"){o.style.display="none";return}g.querySelectorAll(".nyuzi-emoji-popover, .nyuzi-gif-popover").forEach(p=>{p.style.display="none"}),o.style.display="block";let f=o.querySelector("emoji-picker");if(f){setTimeout(()=>f.shadowRoot?.querySelector("input")?.focus(),50);return}o.innerHTML=`
        <div class="nyuzi-emoji-loading">
          <span class="nyuzi-spinner"></span>
          <span>Loading emoji library...</span>
        </div>
      `;try{if(await pe(),o.style.display==="none")return;let p=e.getAttribute("data-theme")||"dark",u=document.createElement("emoji-picker");u.className=p==="light"?"light":"dark",u.addEventListener("emoji-click",w=>{let H=w.detail?.unicode;H&&Ie(d,H)}),o.innerHTML="",o.appendChild(u),setTimeout(()=>u.shadowRoot?.querySelector("input")?.focus(),50)}catch(p){console.error("[Nyuzi] Failed to load emoji picker:",p),o.innerHTML=`
          <div class="nyuzi-emoji-loading" style="color: #ef4444;">
            <span>Failed to load emoji library.</span>
          </div>
        `}}async function r(c,d){let o=c.querySelector(".nyuzi-gif-popover");if(!o)return;let f=o;if(f.style.display!=="none"){f.style.display="none";return}g.querySelectorAll(".nyuzi-emoji-popover, .nyuzi-gif-popover").forEach(j=>{j.style.display="none"}),o.style.display="block";let p=[{id:"1",title:"Clap",url:"https://media.giphy.com/media/l3q2XhfQ8oCkm1Ts4/giphy.gif",preview:"https://media.giphy.com/media/l3q2XhfQ8oCkm1Ts4/200_d.gif"},{id:"2",title:"Mind Blown",url:"https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif",preview:"https://media.giphy.com/media/26ufdipQqU2lhNA4g/200_d.gif"},{id:"3",title:"Reading Book",url:"https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif",preview:"https://media.giphy.com/media/3o7btPCcdNniyf0ArS/200_d.gif"},{id:"4",title:"Laughing",url:"https://media.giphy.com/media/10JhviFuU2gWD6/giphy.gif",preview:"https://media.giphy.com/media/10JhviFuU2gWD6/200_d.gif"},{id:"5",title:"Thinking",url:"https://media.giphy.com/media/d3mlE7uhX8KFgEmY/giphy.gif",preview:"https://media.giphy.com/media/d3mlE7uhX8KFgEmY/200_d.gif"},{id:"6",title:"Thumbs Up",url:"https://media.giphy.com/media/111ebonMs90YLu/giphy.gif",preview:"https://media.giphy.com/media/111ebonMs90YLu/200_d.gif"},{id:"7",title:"Love / Heart",url:"https://media.giphy.com/media/26FLdm964upIslUZ2/giphy.gif",preview:"https://media.giphy.com/media/26FLdm964upIslUZ2/200_d.gif"},{id:"8",title:"Speechless",url:"https://media.giphy.com/media/l0HlvtIPzPdt2usKs/giphy.gif",preview:"https://media.giphy.com/media/l0HlvtIPzPdt2usKs/200_d.gif"},{id:"9",title:"Celebration",url:"https://media.giphy.com/media/ely3apij36BJhoZ234/giphy.gif",preview:"https://media.giphy.com/media/ely3apij36BJhoZ234/200_d.gif"},{id:"10",title:"Coffee",url:"https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif",preview:"https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/200_d.gif"},{id:"11",title:"Writing",url:"https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif",preview:"https://media.giphy.com/media/13HgwGsXF0aiGY/200_d.gif"},{id:"12",title:"Excited",url:"https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif",preview:"https://media.giphy.com/media/5GoVLqeAOo6PK/200_d.gif"}];o.innerHTML=`
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
      `;let u=o.querySelector(".nyuzi-gif-search-input"),w=o.querySelector(".nyuzi-gif-grid");u&&setTimeout(()=>u.focus(),50);async function H(j=""){if(!w)return;w.innerHTML=`
          <div style="grid-column: 1 / -1; padding: 1.5rem; text-align: center; color: var(--nyuzi-text-muted); font-size: 0.8125rem;">
            <span class="nyuzi-spinner" style="display: inline-block; margin-bottom: 0.35rem;"></span>
            <div>Searching...</div>
          </div>
        `;let B=[];try{z?B=j?p.filter(I=>I.title.toLowerCase().includes(j.toLowerCase())):p:(B=await Me(k,j),(!B||B.length===0)&&(B=j?p.filter(I=>I.title.toLowerCase().includes(j.toLowerCase())):p))}catch{B=j?p.filter(I=>I.title.toLowerCase().includes(j.toLowerCase())):p}if(B.length===0){w.innerHTML=`
            <div style="grid-column: 1 / -1; padding: 1.5rem; text-align: center; color: var(--nyuzi-text-muted); font-size: 0.8125rem;">
              No GIFs found for "${C(j)}"
            </div>
          `;return}w.innerHTML=B.map(I=>`
          <div class="nyuzi-gif-card" data-gif-url="${C(I.url)}" title="${C(I.title)}">
            <img src="${C(I.preview||I.url)}" alt="${C(I.title)}" loading="lazy" />
          </div>
        `).join(""),w.querySelectorAll(".nyuzi-gif-card").forEach(I=>{I.addEventListener("click",()=>{let ke=I.getAttribute("data-gif-url");ke&&(l(c,d,ke),f.style.display="none")})})}H("");let ee=null;u&&u.addEventListener("input",()=>{clearTimeout(ee),ee=setTimeout(()=>{H(u.value.trim())},350)})}function l(c,d,o){d.dataset.attachedGif=o;let f=`${d.id}-gif-preview`,p=g.getElementById(f);if(!p)return;p.innerHTML=`
        <img src="${C(o)}" alt="Attached GIF" />
        <button type="button" class="nyuzi-attached-gif-remove" title="Remove GIF">\u2715</button>
      `,p.style.display="inline-block";let u=p.querySelector(".nyuzi-attached-gif-remove");u&&u.addEventListener("click",w=>{w.preventDefault(),w.stopPropagation(),delete d.dataset.attachedGif,p.innerHTML="",p.style.display="none"})}g.querySelectorAll(".nyuzi-format-btn").forEach(c=>{c.getAttribute("data-action")==="emoji"&&c.addEventListener("mouseenter",ge,{once:!0}),c.addEventListener("click",d=>{d.preventDefault();let o=d.currentTarget.getAttribute("data-action"),f=d.currentTarget.closest(".nyuzi-format-toolbar"),p=f?.getAttribute("data-target");if(!o||!p)return;let u=g.getElementById(p);if(u){if(o==="emoji"){i(f,u);return}if(o==="gif"){r(f,u);return}De(u,o)}})}),g.querySelectorAll("textarea").forEach(c=>{c.addEventListener("focus",ge,{once:!0})});let n=g.getElementById("nyuzi-main-content"),m=g.getElementById("nyuzi-char-count");n&&m&&n.addEventListener("input",()=>{m.textContent=`${n.value.length} / 2,000`});let b=g.getElementById("dismiss-error");b&&b.addEventListener("click",()=>{G=null,y()});let A=g.getElementById("nyuzi-main-submit");A&&A.addEventListener("click",()=>{let c=g.getElementById("nyuzi-main-name"),d=g.getElementById("nyuzi-main-email"),o=g.getElementById("nyuzi-main-notify");if(!c.value.trim()){G="Please enter your name.",y();return}if(!n||!n.value.trim()){G="Comment content cannot be empty.",y();return}let f=c.value.trim(),p=d.value.trim()||null;ze(f,p);let u=n.value.trim(),w=n.dataset.attachedGif;if(w){u+=`

![GIF](${w})`,delete n.dataset.attachedGif;let H=g.getElementById("nyuzi-main-content-gif-preview");H&&(H.innerHTML="",H.style.display="none")}we(f,p,u,o?o.checked:!0,null)});let L=g.getElementById("nyuzi-load-more");L&&L.addEventListener("click",()=>{Ne()}),g.querySelectorAll(".upvote-btn").forEach(c=>{c.addEventListener("click",d=>{let o=d.currentTarget.getAttribute("data-id");o&&Fe(o)})}),g.querySelectorAll(".reply-trigger").forEach(c=>{c.addEventListener("click",d=>{let o=d.currentTarget.getAttribute("data-id");O=O===o?null:o,K=null,U=null,y()})}),g.querySelectorAll(".cancel-reply").forEach(c=>{c.addEventListener("click",()=>{O=null,y()})}),g.querySelectorAll(".submit-reply").forEach(c=>{c.addEventListener("click",d=>{let o=d.currentTarget.getAttribute("data-parent-id");if(!o)return;let f=g.getElementById(`reply-name-${o}`),p=g.getElementById(`reply-email-${o}`),u=g.getElementById(`reply-content-${o}`);if(!f.value.trim()){alert("Please enter your name.");return}if(!u||!u.value.trim()){alert("Reply content cannot be empty.");return}let w=f.value.trim(),H=p?.value.trim()||null;ze(w,H);let ee=u.value.trim(),j=u.dataset.attachedGif;if(j){ee+=`

![GIF](${j})`,delete u.dataset.attachedGif;let B=g.getElementById(`reply-content-${o}-gif-preview`);B&&(B.innerHTML="",B.style.display="none")}we(w,H,ee,!0,o)})}),g.querySelectorAll(".edit-trigger").forEach(c=>{c.addEventListener("click",d=>{K=d.currentTarget.getAttribute("data-id"),O=null,U=null,y()})}),g.querySelectorAll(".cancel-edit").forEach(c=>{c.addEventListener("click",()=>{K=null,y()})}),g.querySelectorAll(".save-edit").forEach(c=>{c.addEventListener("click",d=>{let o=d.currentTarget.getAttribute("data-id");if(!o)return;let f=g.getElementById(`edit-content-${o}`);if(!f||!f.value.trim()){alert("Comment content cannot be empty.");return}let p=f.value.trim(),u=f.dataset.attachedGif;if(u){p+=`

![GIF](${u})`,delete f.dataset.attachedGif;let w=g.getElementById(`edit-content-${o}-gif-preview`);w&&(w.innerHTML="",w.style.display="none")}qe(o,p)})}),g.querySelectorAll(".delete-trigger").forEach(c=>{c.addEventListener("click",d=>{U=d.currentTarget.getAttribute("data-id"),O=null,K=null,y()})}),g.querySelectorAll(".nyuzi-cancel-delete-btn").forEach(c=>{c.addEventListener("click",()=>{U=null,y()})}),g.querySelectorAll(".nyuzi-confirm-delete-btn").forEach(c=>{c.addEventListener("click",d=>{let o=d.currentTarget.getAttribute("data-id");o&&_e(o)})}),g.querySelectorAll(".nyuzi-collapse-btn").forEach(c=>{c.addEventListener("click",d=>{let o=d.currentTarget.getAttribute("data-id");o&&(ne.has(o)?ne.delete(o):ne.add(o),y())})}),g.querySelectorAll(".copy-link-btn").forEach(c=>{c.addEventListener("click",async d=>{let o=d.currentTarget,f=o.getAttribute("data-id");if(!f)return;let u=`${window.location.href.split("#")[0]}#comment-${f}`;try{await navigator.clipboard.writeText(u);let w=o.innerHTML;o.innerHTML="\u2713 Copied!",o.style.color="var(--nyuzi-accent)",setTimeout(()=>{o.innerHTML=w,o.style.color=""},2e3)}catch{window.location.hash=`comment-${f}`}})})}window.addEventListener("hashchange",xe);try{let i=null,r=()=>{clearTimeout(i),i=setTimeout(()=>{y()},50)},l=new MutationObserver(n=>{for(let m of n)if(m.type==="attributes"&&(m.attributeName==="class"||m.attributeName==="data-theme"||m.attributeName==="data-color-mode"||m.attributeName==="data-bs-theme"||m.attributeName==="style")){r();break}});l.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","data-color-mode","data-bs-theme","style"]}),document.body&&l.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme","data-color-mode","data-bs-theme","style"]}),typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",r)}catch(i){console.debug("[Nyuzi] Theme observer warning:",i)}document.addEventListener("click",i=>{i.composedPath().some(n=>n?.classList?.contains("nyuzi-emoji-popover")||n?.classList?.contains("nyuzi-emoji-btn")||n?.classList?.contains("nyuzi-gif-popover")||n?.classList?.contains("nyuzi-gif-btn")||n?.tagName?.toLowerCase()==="emoji-picker")||g.querySelectorAll(".nyuzi-emoji-popover, .nyuzi-gif-popover").forEach(n=>{n.style.display="none"})}),document.addEventListener("keydown",i=>{i.key==="Escape"&&g.querySelectorAll(".nyuzi-emoji-popover, .nyuzi-gif-popover").forEach(r=>{r.style.display="none"})}),Pe()})();})();
//# sourceMappingURL=embed.js.map