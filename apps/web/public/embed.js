"use strict";(()=>{function it(t){if(!t||typeof t!="string"||!t.startsWith("#"))return!1;let l=t.replace("#","");if(l.length!==6&&l.length!==3)return!1;let e=parseInt(l.length===3?l[0]+l[0]:l.slice(0,2),16),o=parseInt(l.length===3?l[1]+l[1]:l.slice(2,4),16),x=parseInt(l.length===3?l[2]+l[2]:l.slice(4,6),16);return(e*299+o*587+x*114)/1e3>155}function He(t){let{accent:l,bg:e,cardBg:o,textColor:x,textSecondary:z,borderColor:C,inputBg:T,radius:A="0.75rem",themeMode:V,bgMode:U,resolvedTheme:P=V==="auto"?"dark":V,isCardIsolated:K=!1}=t,w=P||"dark",R=it(o);return`
    :host {
      --nyuzi-accent: ${l||"#f56220"};
      --nyuzi-accent-hover: color-mix(in srgb, var(--nyuzi-accent) 80%, black);
      --nyuzi-accent-soft: color-mix(in srgb, var(--nyuzi-accent) 12%, transparent);
      --nyuzi-accent-border: color-mix(in srgb, var(--nyuzi-accent) 30%, transparent);

      --nyuzi-bg: ${K?w==="light"?"#ffffff":"#090605":e||(U==="card"?w==="dark"?"#090605":"#f8fafc":"transparent")};
      --nyuzi-card-bg: ${o||(w==="dark"?"#14100e":w==="sepia"?"#fbf3e4":"#ffffff")};
      --nyuzi-text-primary: ${x||(w==="dark"?R?"#0f172a":"#f8fafc":w==="sepia"?"#2b2118":"#0f172a")};
      --nyuzi-text-secondary: ${z||(w==="dark"?R?"#475569":"#cbd5e1":w==="sepia"?"#6a5949":"#475569")};
      --nyuzi-text-muted: ${w==="sepia"?"#968370":"#94a3b8"};
      --nyuzi-border: ${C||(w==="dark"?R?"#e2e8f0":"rgba(255, 255, 255, 0.12)":w==="sepia"?"#e2d4bc":"#e2e8f0")};
      --nyuzi-input-bg: ${T||(w==="dark"?R?"#ffffff":"#181412":w==="sepia"?"#fbf7ef":"#f8fafc")};
      --nyuzi-reaction-bg: ${w==="dark"?R?"#ffffff":"rgba(255, 255, 255, 0.05)":w==="sepia"?"#fbf7ef":"#ffffff"};
      --nyuzi-reaction-border: ${w==="dark"?R?"#e2e8f0":"rgba(255, 255, 255, 0.1)":w==="sepia"?"#e2d4bc":"#e2e8f0"};
      --nyuzi-badge-bg: ${w==="dark"?R?"#f1f5f9":"rgba(255, 255, 255, 0.08)":w==="sepia"?"#ece0cd":"#f1f5f9"};
      --nyuzi-badge-border: ${w==="dark"?R?"#e2e8f0":"rgba(255, 255, 255, 0.12)":w==="sepia"?"#e2d4bc":"#e2e8f0"};
      --nyuzi-thread-line: ${w==="dark"?R?"#e2e8f0":"rgba(255, 255, 255, 0.12)":w==="sepia"?"#e2d4bc":"#e2e8f0"};
      --nyuzi-avatar-bg: var(--nyuzi-accent-soft);
      --nyuzi-avatar-text: var(--nyuzi-accent);
      --nyuzi-radius: ${A};

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
      padding: ${K?"1.5rem 1.25rem":"0.75rem 0.5rem"};
      ${K?w==="light"?`
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
      width: 160px;
      height: 100px;
      background: var(--nyuzi-input-bg);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transition: all 0.2s ease-in-out;
    }
    .nyuzi-attached-gif-preview.loading {
      background: linear-gradient(90deg, var(--nyuzi-input-bg) 25%, var(--nyuzi-border) 50%, var(--nyuzi-input-bg) 75%);
      background-size: 200% 100%;
      animation: nyuzi-shimmer 1.5s infinite;
    }
    @keyframes nyuzi-shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    .nyuzi-attached-gif-preview img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: opacity 0.25s ease-in-out;
    }
    .nyuzi-attached-gif-preview img.full-gif {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
    .nyuzi-attached-gif-preview.loaded img.full-gif {
      opacity: 1;
    }
    .nyuzi-attached-gif-badge {
      position: absolute;
      bottom: 6px;
      left: 6px;
      font-size: 9.5px;
      font-weight: 700;
      padding: 2.5px 7px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.72);
      backdrop-filter: blur(4px);
      color: #fff;
      display: flex;
      align-items: center;
      gap: 5px;
      pointer-events: none;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      transition: opacity 0.25s;
      z-index: 2;
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
      z-index: 3;
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
    .nyuzi-bottom-toolbar {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.35rem;
      min-height: 26px;
    }
    .nyuzi-media-actions {
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }
    .nyuzi-char-count {
      font-size: 0.75rem;
      color: var(--nyuzi-text-muted);
      user-select: none;
      margin-left: auto;
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
    .nyuzi-logged-in-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      margin-top: 0.6rem;
    }
    .nyuzi-member-tag {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      font-size: 0.8125rem;
      color: var(--nyuzi-text-secondary);
      user-select: none;
    }
    .nyuzi-status-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--nyuzi-accent);
      box-shadow: 0 0 6px var(--nyuzi-accent);
      flex-shrink: 0;
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
      .nyuzi-form-row:not(.nyuzi-logged-in-row) {
        flex-direction: column;
        align-items: stretch;
        gap: 0.65rem;
      }
      .nyuzi-logged-in-row {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
      .nyuzi-logged-in-row .nyuzi-submit-btn {
        width: auto;
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
      .nyuzi-form-row:not(.nyuzi-logged-in-row) .nyuzi-submit-btn {
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
    .nyuzi-show-more-replies-btn {
      align-self: flex-start;
      background: var(--nyuzi-reaction-bg);
      border: 1px solid var(--nyuzi-border);
      color: var(--nyuzi-text-secondary);
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.3rem 0.75rem;
      border-radius: 9999px;
      margin-top: 0.25rem;
      transition: all 0.15s ease;
      user-select: none;
    }
    .nyuzi-show-more-replies-btn:hover {
      background: var(--nyuzi-accent-soft);
      border-color: var(--nyuzi-accent-border);
      color: var(--nyuzi-accent);
      transform: translateY(-1px);
    }
    .nyuzi-show-more-replies-btn.expanded {
      color: var(--nyuzi-text-muted);
    }
    .nyuzi-show-more-replies-btn.expanded:hover {
      color: var(--nyuzi-accent);
    }
    .nyuzi-show-more-replies-btn svg {
      transition: transform 0.2s ease;
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
  `}function k(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function nt(t){let l=t.trim().split(/\s+/);return l.length===1?l[0].slice(0,2).toUpperCase():(l[0][0]+l[l.length-1][0]).toUpperCase()}function rt(t){try{let l=new Date(t),o=Math.floor((new Date().getTime()-l.getTime())/1e3);return o<60?"just now":o<3600?`${Math.floor(o/60)}m ago`:o<86400?`${Math.floor(o/3600)}h ago`:o<604800?`${Math.floor(o/86400)}d ago`:l.toLocaleDateString(void 0,{month:"short",day:"numeric"})}catch{return"recently"}}function at(t,l){if(!t)return"";let e=k(t),o=l??["bold","italic","quote","code","link","emoji","gif"];if(o.includes("code")&&(e=e.replace(/`([^`\n]+)`/g,"<code>$1</code>")),o.includes("bold")&&(e=e.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>")),o.includes("italic")&&(e=e.replace(/(^|[^*])\*([^*]+)\*([^*]|$)/g,"$1<em>$2</em>$3")),o.includes("gif")){let A=0;e=e.replace(/!\[([^\]]*)\]\(((?:https?:\/\/)[^\s)]+(?:\.(?:gif|webp|png|jpg|jpeg)[^\s)]*|(?:giphy\.com|tenor\.com)[^\s)]*))\)/gi,(V,U,P)=>A===0?(A++,`<div class="nyuzi-comment-gif-wrapper"><img src="${P}" alt="${U}" class="nyuzi-comment-gif" loading="lazy" /></div>`):`[GIF: ${U}]`)}o.includes("link")?e=e.replace(/\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'):e=e.replace(/\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)/g,"$1 ($2)");let x=e.split(`
`),z=[],C=!1,T=[];for(let A of x)o.includes("quote")&&(A.startsWith("&gt; ")||A==="&gt;")?(C=!0,T.push(A.replace(/^&gt; ?/,""))):(C&&(z.push(`<blockquote>${T.join("<br/>")}</blockquote>`),T=[],C=!1),z.push(A));return C&&z.push(`<blockquote>${T.join("<br/>")}</blockquote>`),z.join(`
`).replace(/(<\/blockquote>)\n+/g,"$1").replace(/\n+(<blockquote>)/g,"$1").replace(/\n/g,"<br/>")}function ot(t,l){return t==="upvote"?`<svg class="nyuzi-reaction-icon" viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" fill="${l?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`:t==="like"?`<svg class="nyuzi-reaction-icon nyuzi-like-icon" viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2" fill="${l?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12M15 10.5a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3v2.5M7 10l5-6v5h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7"/><path d="M7 10H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"/></svg>`:`<svg class="nyuzi-reaction-icon nyuzi-heart-icon" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="${l?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>`}function st(){return'<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>'}function lt(){return'<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'}function ct(){return'<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>'}function dt(){return'<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>'}function ut(t,l){return t.upvotes>0?`${t.upvotes}`:l==="upvote"?"Upvote":"Like"}function mt(t,l){if(!t)return!1;let e=t.trim().toLowerCase();return l&&e===l.trim().toLowerCase()?!0:e.includes("fred juma")||e.includes("brenda frenjo")||e.includes("sumeiya juma")}function ye(t,l){let e=l&&l.length>0?l:["bold","italic","quote","code","link","emoji","gif"],o=[];return e.includes("bold")&&o.push(`
      <button type="button" class="nyuzi-format-btn" data-action="bold" title="Bold (**text**)">
        <strong>B</strong>
      </button>`),e.includes("italic")&&o.push(`
      <button type="button" class="nyuzi-format-btn" data-action="italic" title="Italic (*text*)">
        <em>I</em>
      </button>`),e.includes("quote")&&o.push(`
      <button type="button" class="nyuzi-format-btn" data-action="quote" title="Quote (> text)">
        &ldquo;
      </button>`),e.includes("code")&&o.push(`
      <button type="button" class="nyuzi-format-btn" data-action="code" title="Inline Code (\`code\`)">
        &lt;/&gt;
      </button>`),e.includes("link")&&o.push(`
      <button type="button" class="nyuzi-format-btn" data-action="link" title="Link ([text](url))">
        <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
      </button>`),o.length===0?"":`
    <div class="nyuzi-format-toolbar" data-target="${t}">
      ${o.join("")}
    </div>
  `}function fe(t,l,e){let o=l&&l.length>0?l:["bold","italic","quote","code","link","emoji","gif"],x=[];o.includes("emoji")&&x.push(`
      <button type="button" class="nyuzi-format-btn nyuzi-emoji-btn" data-action="emoji" title="Insert Emoji">
        <span style="font-size: 0.95rem; line-height: 1; display: inline-block;">\u{1F600}</span>
      </button>`),o.includes("gif")&&x.push(`
      <button type="button" class="nyuzi-format-btn nyuzi-gif-btn" data-action="gif" title="Search & Insert GIF">
        <span style="font-size: 0.6875rem; font-weight: 800; letter-spacing: -0.02em; padding: 1px 5px; border-radius: 4px; background: var(--nyuzi-accent-soft); color: var(--nyuzi-accent);">GIF</span>
      </button>`);let z=x.length>0;return!z&&!e?"":`
    <div class="nyuzi-bottom-toolbar" data-target="${t}">
      <div class="nyuzi-media-actions">
        ${x.join("")}
        ${z?`
          <div class="nyuzi-emoji-popover" style="display: none;"></div>
          <div class="nyuzi-gif-popover" style="display: none;"></div>
        `:""}
      </div>
      ${e?`<span class="nyuzi-char-count" id="${e}">0 / 2,000</span>`:"<span></span>"}
    </div>
  `}function Be(t,l="How was this discussion?",e="general",o){let C=e==="literary"?[{key:"coffee",emoji:"\u2615",label:"Thoughtful"},{key:"book",emoji:"\u{1F4D6}",label:"Engrossing"},{key:"lightbulb",emoji:"\u{1F4A1}",label:"Insight"},{key:"heart",emoji:"\u2764\uFE0F",label:"Moved"},{key:"clap",emoji:"\u{1F44F}",label:"Applause"}]:[{key:"fire",emoji:"\u{1F525}",label:"Superb"},{key:"heart",emoji:"\u2764\uFE0F",label:"Love"},{key:"lightbulb",emoji:"\u{1F4A1}",label:"Insight"},{key:"laugh",emoji:"\u{1F602}",label:"Laugh"},{key:"clap",emoji:"\u{1F44F}",label:"Applause"}];return`
    <div class="nyuzi-reactions-bar">
      <div class="nyuzi-reactions-prompt">${k(l||"How was this discussion?")}</div>
      <div class="nyuzi-reactions-grid">
        ${C.map(T=>{let A=Number(o?.[T.key])||0;return`
          <div class="nyuzi-reaction-pill ${t===T.key?"active":""}" data-reaction-key="${T.key}">
            <div class="emoji-row">
              <span>${T.emoji}</span>
              ${A>0?`<span class="reaction-count">${A}</span>`:""}
            </div>
            <span class="reaction-label">${T.label}</span>
          </div>
        `}).join("")}
      </div>
    </div>
  `}function we(t,l,e){let o=l.filter(P=>P.parentId===t.id);o.sort((P,K)=>new Date(P.createdAt).getTime()-new Date(K.createdAt).getTime());let x=e.activeReplyId===t.id,z=e.editingCommentId===t.id,C=e.confirmDeleteId===t.id,T=e.collapsedComments.has(t.id),A=e.upvotedComments.has(t.id),V=e.myComments.has(t.id),U=t.isAuthor??mt(t.authorName,e.postAuthor);return`
    <div class="nyuzi-comment" id="comment-${t.id}">
      <div class="nyuzi-avatar">${k(nt(t.authorName))}</div>
      <div class="nyuzi-body">
        <div class="nyuzi-meta">
          <span class="nyuzi-author">${k(t.authorName)}</span>
          ${U?'<span class="nyuzi-author-badge">Author</span>':""}
          <span class="nyuzi-time">${rt(t.createdAt)}</span>
          ${t.isEdited?'<span class="nyuzi-edited-tag" title="Edited by reader">(edited)</span>':""}
        </div>

        ${z?`
            <div class="nyuzi-edit-box">
              ${ye(`edit-content-${t.id}`,e.allowedFormatting)}
              <textarea class="nyuzi-textarea nyuzi-edit-textarea" id="edit-content-${t.id}" rows="3" maxlength="2000">${k(t.content)}</textarea>
              <div class="nyuzi-attached-gif-preview" id="edit-content-${t.id}-gif-preview" style="display: none;"></div>
              ${fe(`edit-content-${t.id}`,e.allowedFormatting)}
              <div class="nyuzi-edit-actions">
                <button class="nyuzi-action-btn cancel-edit" data-id="${t.id}">Cancel</button>
                <button class="nyuzi-submit-btn save-edit" data-id="${t.id}" ${e.isSubmitting?"disabled":""}>
                  ${e.isSubmitting?"Saving...":"Save Changes"}
                </button>
              </div>
            </div>
          `:C?`
            <div class="nyuzi-confirm-pill">
              <span>Delete this comment?</span>
              <button class="nyuzi-confirm-delete-btn" data-id="${t.id}" ${e.isSubmitting?"disabled":""}>
                ${e.isSubmitting?"Deleting...":"Yes, Delete"}
              </button>
              <button class="nyuzi-cancel-delete-btn" data-id="${t.id}">Cancel</button>
            </div>
          `:`<div class="nyuzi-content">${at(t.content,e.allowedFormatting)}</div>`}

        ${!z&&!C?`
          <div class="nyuzi-actions">
            <button class="nyuzi-action-btn upvote-btn ${A?"upvoted":""}" data-id="${t.id}" title="${A?"Unlike":"Like"}">
              ${ot(e.reactionType,A)}
              <span>${ut(t,e.reactionType)}</span>
            </button>
            <button class="nyuzi-action-btn reply-trigger" data-id="${t.id}">
              ${st()}
              <span>Reply</span>
            </button>
            <button class="nyuzi-action-btn copy-link-btn" data-id="${t.id}" title="Copy direct link to this comment">
              ${lt()}
              <span>Copy Link</span>
            </button>
            ${V?`
              <button class="nyuzi-action-btn edit-trigger" data-id="${t.id}" title="Edit your comment (15m grace window)">
                ${ct()}
                <span>Edit</span>
              </button>
              <button class="nyuzi-action-btn delete-trigger" data-id="${t.id}" title="Delete your comment">
                ${dt()}
                <span>Delete</span>
              </button>
            `:""}
          </div>
        `:""}

        ${x?`
            <div class="nyuzi-reply-box">
              ${ye(`reply-content-${t.id}`,e.allowedFormatting)}
              <textarea class="nyuzi-textarea" id="reply-content-${t.id}" placeholder="Reply to ${k(t.authorName)}..." maxlength="2000" required></textarea>
              <div class="nyuzi-attached-gif-preview" id="reply-content-${t.id}-gif-preview" style="display: none;"></div>
              ${fe(`reply-content-${t.id}`,e.allowedFormatting)}
              ${e.isLoggedInMember?`
                <input type="hidden" id="reply-name-${t.id}" value="${k(e.savedAuthorName)}" />
                <input type="hidden" id="reply-email-${t.id}" value="${k(e.savedAuthorEmail)}" />
                <div class="nyuzi-form-row nyuzi-logged-in-row">
                  <div class="nyuzi-member-tag">
                    <span class="nyuzi-status-dot"></span>
                    <span>Replying as <strong style="color:var(--nyuzi-text-primary); font-weight:600;">${k(e.savedAuthorName)}</strong></span>
                  </div>
                  <div style="display:flex; gap:0.5rem; align-items:center;">
                    <button class="nyuzi-action-btn cancel-reply" style="padding: 0.5rem 0.75rem;">Cancel</button>
                    <button class="nyuzi-submit-btn submit-reply" data-parent-id="${t.id}" ${e.isSubmitting?"disabled":""}>
                      ${e.isSubmitting?"Posting...":"Post Reply"}
                    </button>
                  </div>
                </div>
              `:`
                <div class="nyuzi-form-row">
                  <div class="nyuzi-inputs">
                    <input type="text" class="nyuzi-input" id="reply-name-${t.id}" placeholder="Your Name *" value="${k(e.savedAuthorName)}" required />
                    <input type="email" class="nyuzi-input" id="reply-email-${t.id}" placeholder="Email (for reply alerts)" value="${k(e.savedAuthorEmail)}" />
                  </div>
                  <div style="display:flex; gap:0.5rem; align-items:center;">
                    <button class="nyuzi-action-btn cancel-reply" style="padding: 0.5rem 0.75rem;">Cancel</button>
                    <button class="nyuzi-submit-btn submit-reply" data-parent-id="${t.id}" ${e.isSubmitting?"disabled":""}>
                      ${e.isSubmitting?"Posting...":"Post Reply"}
                    </button>
                  </div>
                </div>
              `}
            </div>
          `:""}

        ${o.length>0?`
          <div class="nyuzi-replies-wrapper">
            <button class="nyuzi-collapse-btn" data-id="${t.id}" title="${T?"Expand replies":"Collapse replies"}">
              <svg class="nyuzi-collapse-chevron ${T?"collapsed":""}" viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              <span>${T?`Show ${o.length} ${o.length===1?"reply":"replies"}`:`Hide ${o.length} ${o.length===1?"reply":"replies"}`}</span>
            </button>
            ${T?"":`
              <div class="nyuzi-replies">
                ${(e.expandedThreads?.has(t.id)||o.length<=3?o:o.slice(0,3)).map(P=>we(P,l,e)).join("")}
                ${o.length>3?`
                  <button class="nyuzi-show-more-replies-btn ${e.expandedThreads?.has(t.id)?"expanded":""}" data-id="${t.id}">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="${e.expandedThreads?.has(t.id)?"transform: rotate(180deg);":""}"><path d="m6 9 6 6 6-6"/></svg>
                    <span>${e.expandedThreads?.has(t.id)?"Show fewer replies":`View ${o.length-3} more ${o.length-3===1?"reply":"replies"}`}</span>
                  </button>
                `:""}
              </div>
            `}
          </div>
        `:""}
      </div>
    </div>
  `}async function ke(t,l,e,o,x,z){let C=z?`&highlight=${encodeURIComponent(z)}`:"",T=`${t}/api/v1/comments?siteId=${encodeURIComponent(l)}&threadUrl=${encodeURIComponent(e)}&page=${o}&limit=${x}${C}`,A=await fetch(T);if(!A.ok)throw new Error(`HTTP ${A.status}`);return A.json()}async function Ne(t,l){let e=await fetch(`${t}/api/v1/comments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)});if(!e.ok){let o=await e.json().catch(()=>({}));throw new Error(o.error||`HTTP ${e.status}`)}return e.json()}async function Pe(t,l,e){let o=await fetch(`${t}/api/v1/comments/${encodeURIComponent(l)}/upvote`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:e})});if(!o.ok)throw new Error("Vote action failed");return o.json()}async function Re(t,l,e){let o=await fetch(`${t}/api/v1/comments/${encodeURIComponent(l)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:e})});if(!o.ok){let x=await o.json().catch(()=>({}));throw new Error(x.error||`HTTP ${o.status}`)}return o.json()}async function _e(t,l){let e=await fetch(`${t}/api/v1/comments/${encodeURIComponent(l)}`,{method:"DELETE"});if(!e.ok)throw new Error("Delete action failed");return e.json()}async function Fe(t,l){let e=await fetch(`${t}/api/v1/threads/react`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)});if(!e.ok)throw new Error("Thread reaction failed");return e.json()}async function qe(t,l=""){let e=`${t}/api/v1/gifs?q=${encodeURIComponent(l)}&limit=16`,o=await fetch(e);if(!o.ok)throw new Error("Failed to load GIFs");return(await o.json()).data||[]}(function(){let t=document.currentScript,l=document.getElementById("nyuzi-comments")||document.querySelector("nyuzi-comments");if(!l){console.warn("[Nyuzi] No container found (#nyuzi-comments or <nyuzi-comments>).");return}let e=l;if(e.__nyuzi_initialized)return;e.__nyuzi_initialized=!0;let o=t?.getAttribute("data-site-id")||e.getAttribute("data-site-id")||document.querySelector("[data-nyuzi-site-id]")?.getAttribute("data-nyuzi-site-id")||"",x=t?.getAttribute("data-api")||e.getAttribute("data-api")||"https://nyuzi-api.fredjuma8.workers.dev",z=t?.getAttribute("data-mock")==="true"||e.getAttribute("data-mock")==="true",C=t?.getAttribute("data-reactions-bar")??e.getAttribute("data-reactions-bar"),T=C===null?!0:C!=="false",A=t?.getAttribute("data-reactions-prompt")||e.getAttribute("data-reactions-prompt")||"How was this discussion?",V=t?.getAttribute("data-reactions-preset")||e.getAttribute("data-reactions-preset")||"general",P=(t?.getAttribute("data-formatting")||e.getAttribute("data-formatting")||"bold,italic,quote,code,link,emoji,gif").split(",").map(i=>i.trim().toLowerCase()).filter(Boolean),K=t?.src||"",w="https://nyuzi-yap.vercel.app";if(K)try{w=new URL(K).origin}catch{}let R=`${w}/emoji-picker.js`,ie=!1,le=!1;function Ee(){return typeof customElements<"u"&&customElements.get("emoji-picker")?(ie=!0,Promise.resolve()):ie?Promise.resolve():new Promise((i,n)=>{let s=document.querySelector('script[src*="emoji-picker.js"]');if(s){if(customElements.get("emoji-picker"))return ie=!0,i();s.addEventListener("load",()=>{ie=!0,i()}),s.addEventListener("error",n);return}le=!0;let a=document.createElement("script");a.src=R,a.async=!0,a.onload=()=>{ie=!0,le=!1,i()},a.onerror=u=>{le=!1,n(u)},document.head.appendChild(a)})}function Ae(){ie||le||typeof customElements<"u"&&customElements.get("emoji-picker")||Ee().catch(()=>{})}function De(i,n){let s=i.selectionStart??i.value.length,a=i.selectionEnd??i.value.length,u=i.value;i.value=u.substring(0,s)+n+u.substring(a);let h=s+n.length;i.focus(),i.setSelectionRange(h,h),i.dispatchEvent(new Event("input",{bubbles:!0}))}let pt=!!(t?.getAttribute("data-accent-color")||e.getAttribute("data-accent-color")),gt=!!(t?.getAttribute("data-theme")||e.getAttribute("data-theme")),yt=!!(t?.getAttribute("data-bg")||e.getAttribute("data-bg")),ft=!!(t?.getAttribute("data-bg-color")||e.getAttribute("data-bg-color")),ht=!!(t?.getAttribute("data-card-bg")||e.getAttribute("data-card-bg")),bt=!!(t?.getAttribute("data-text-color")||e.getAttribute("data-text-color")),vt=!!(t?.getAttribute("data-border-color")||e.getAttribute("data-border-color")),zt=!!(t?.getAttribute("data-radius")||e.getAttribute("data-radius")),xt=!!(t?.getAttribute("data-reaction")||e.getAttribute("data-reaction")),wt=C!=null,kt=!!(t?.getAttribute("data-reactions-prompt")||e.getAttribute("data-reactions-prompt")),Et=!!(t?.getAttribute("data-reactions-preset")||e.getAttribute("data-reactions-preset"));function Ge(){try{let i=document.documentElement,n=document.body,s=i.getAttribute("data-theme")||i.getAttribute("data-color-mode")||i.getAttribute("data-bs-theme")||"",a=n?.getAttribute("data-theme")||n?.getAttribute("data-color-mode")||n?.getAttribute("data-bs-theme")||"",u=`${s} ${a}`.toLowerCase();if(u.includes("dark"))return"dark";if(u.includes("light"))return"light";if(i.classList.contains("dark")||i.classList.contains("dark-theme")||i.classList.contains("dark-mode")||i.classList.contains("theme-dark")||!!(n&&(n.classList.contains("dark")||n.classList.contains("dark-theme")||n.classList.contains("dark-mode")||n.classList.contains("theme-dark"))))return"dark";if(i.classList.contains("light")||i.classList.contains("light-theme")||i.classList.contains("light-mode")||i.classList.contains("theme-light")||!!(n&&(n.classList.contains("light")||n.classList.contains("light-theme")||n.classList.contains("light-mode")||n.classList.contains("theme-light"))))return"light";let I=e.parentElement;for(;I&&I!==document.documentElement;){let M=window.getComputedStyle(I).backgroundColor;if(M&&M!=="transparent"&&!M.startsWith("rgba(0, 0, 0, 0)")){let c=M.match(/\d+/g);if(c&&c.length>=3){let m=parseInt(c[0],10),r=parseInt(c[1],10),y=parseInt(c[2],10);if((c.length>=4?parseFloat(c[3]):1)>.1)return(m*299+r*587+y*114)/1e3<130?"dark":"light"}}I=I.parentElement}if(n){let M=window.getComputedStyle(n).backgroundColor;if(M&&M!=="transparent"&&!M.startsWith("rgba(0, 0, 0, 0)")){let c=M.match(/\d+/g);if(c&&c.length>=3){let m=parseInt(c[0],10),r=parseInt(c[1],10),y=parseInt(c[2],10);return(m*299+r*587+y*114)/1e3<130?"dark":"light"}}}}catch{}return typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}let b={accent:t?.getAttribute("data-accent-color")||e.getAttribute("data-accent-color")||"#f56220",bg:t?.getAttribute("data-bg-color")||e.getAttribute("data-bg-color")||"",cardBg:t?.getAttribute("data-card-bg")||e.getAttribute("data-card-bg")||"",textColor:t?.getAttribute("data-text-color")||e.getAttribute("data-text-color")||"",textSecondary:t?.getAttribute("data-text-secondary")||e.getAttribute("data-text-secondary")||"",borderColor:t?.getAttribute("data-border-color")||e.getAttribute("data-border-color")||"",inputBg:t?.getAttribute("data-input-bg")||e.getAttribute("data-input-bg")||"",radius:t?.getAttribute("data-radius")||e.getAttribute("data-radius")||"0.75rem",reactionType:t?.getAttribute("data-reaction")||e.getAttribute("data-reaction")||"like",themeMode:t?.getAttribute("data-theme")||e.getAttribute("data-theme")||"auto",bgMode:t?.getAttribute("data-bg")||e.getAttribute("data-bg")||"transparent",showReactionsBar:T,reactionsPrompt:A,reactionsPreset:V,allowedFormatting:P},p=e.shadowRoot||e.attachShadow({mode:"open"});p.innerHTML="",b.themeMode&&e.setAttribute("data-theme",b.themeMode);let ne=t?.getAttribute("data-thread-url")||e.getAttribute("data-thread-url")||window.location.href.split("#")[0],$e=t?.getAttribute("data-thread-title")||e.getAttribute("data-thread-title")||document.title||"Discussion",he=t?.getAttribute("data-author-name")||e.getAttribute("data-author-name")||"",ce=t?.getAttribute("data-user-name")||e.getAttribute("data-user-name")||"",Oe=t?.getAttribute("data-user-email")||e.getAttribute("data-user-email")||"",v=[],F=0,q=0,be=1,Te=15,de=!1,re=!1,oe=!0,J=null,Y=null,X=null,W=null,S=!1,D=null,G=new Set,Q=new Set,ee=new Set,ue=!1;function ve(i){if(!i||!v||v.length===0)return;let n=v.find(s=>s.id===i);for(;n&&n.parentId;)Q.delete(n.parentId),ee.add(n.parentId),n=v.find(s=>s.id===n.parentId)}let me=`nyuzi_react_${o}_${encodeURIComponent(ne)}`,Le=`nyuzi_counts_${o}_${encodeURIComponent(ne)}`,B={...z?b.reactionsPreset==="literary"?{coffee:21,book:28,lightbulb:14,heart:19,clap:16}:{fire:18,heart:24,lightbulb:12,laugh:7,clap:15}:{}};try{let i=localStorage.getItem(me);i&&(D=i)}catch{}if(z)try{let i=localStorage.getItem(Le);i&&(B={...B,...JSON.parse(i)})}catch{}let se="nyuzi_reader_ownership",Ue=900*1e3;function Ce(i){try{let n=localStorage.getItem(se),s=n?JSON.parse(n):{};s[i]=Date.now()+Ue,localStorage.setItem(se,JSON.stringify(s))}catch{}}function Se(i){try{let n=localStorage.getItem(se);if(n){let s=JSON.parse(n);delete s[i],localStorage.setItem(se,JSON.stringify(s))}}catch{}}function Ke(){let i=new Set;try{let n=localStorage.getItem(se);if(n){let s=JSON.parse(n),a=Date.now();for(let[u,h]of Object.entries(s))a<h&&i.add(u)}}catch{}return z&&i.add("mock-3"),i}let ze=o?`nyuzi_upvotes_${o}`:"nyuzi_upvotes",pe=new Set;try{let i=localStorage.getItem(ze)||localStorage.getItem("nyuzi_upvotes")||sessionStorage.getItem("nyuzi_upvotes");i&&(JSON.parse(i).forEach(n=>G.add(n)),localStorage.setItem(ze,JSON.stringify(Array.from(G))))}catch{}function Ie(){try{let i=JSON.stringify(Array.from(G));localStorage.setItem(ze,i),localStorage.setItem("nyuzi_upvotes",i)}catch{}}let O=ce||"",ae=Oe||"";try{O||(O=localStorage.getItem("nyuzi_author_name")||""),ae||(ae=localStorage.getItem("nyuzi_author_email")||"")}catch{}function Me(i,n){i&&(O=i),n&&(ae=n);try{i&&localStorage.setItem("nyuzi_author_name",i),n&&localStorage.setItem("nyuzi_author_email",n)}catch{}}function Je(){return[{id:"mock-1",parentId:null,authorName:he||"Fred Juma",authorEmail:"fredjuma8@gmail.com",content:`Welcome to our literary salon! **The Reading Circle** invites your reflections on this essay:

> "A reader lives a thousand lives before he dies. The man who never reads lives only one."

Feel free to share your thoughts, quote your favorite passages, or reply to fellow readers below.`,status:"approved",upvotes:14,createdAt:new Date(Date.now()-36e5*2).toISOString(),isAuthor:!0},{id:"mock-2",parentId:"mock-1",authorName:"Brenda Frenjo",authorEmail:"readingcircle254@gmail.com",content:`The second chapter in particular felt so poignant. The pacing and character progression really resonated with what we discussed during Sunday's book circle session!

![Mind Blown](https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif)`,status:"approved",upvotes:8,createdAt:new Date(Date.now()-36e5).toISOString(),isAuthor:!0},{id:"mock-4",parentId:"mock-1",authorName:"Ken Mwangi",authorEmail:"ken@example.com",content:"Totally agree Brenda! The worldbuilding is exceptional.",status:"approved",upvotes:4,createdAt:new Date(Date.now()-28e5).toISOString()},{id:"mock-5",parentId:"mock-1",authorName:"Sarah Koech",authorEmail:"sarah@example.com",content:"Adding this book to our upcoming monthly reading list right away.",status:"approved",upvotes:3,createdAt:new Date(Date.now()-21e5).toISOString()},{id:"mock-6",parentId:"mock-1",authorName:"David Ochieng",authorEmail:"david@example.com",content:"The conclusion was mind-bending. Can't wait for the sequel!",status:"approved",upvotes:6,createdAt:new Date(Date.now()-12e5).toISOString()},{id:"mock-3",parentId:null,authorName:"Amina Odhiambo",authorEmail:"amina@example.com",content:"Reading this made me pause and reflect on how we consume stories in the digital age. Check out this related discussion on [Bookish Perspectives](https://readingcircle254.com/blog)!",status:"approved",upvotes:5,createdAt:new Date(Date.now()-18e5).toISOString()}]}function xe(){let i=window.location.hash;if(i&&i.startsWith("#comment-")){let n=i.replace("#comment-","");ve(n),g(),setTimeout(()=>{let s=p.querySelector(i);s&&(s.scrollIntoView({behavior:"smooth",block:"center"}),s.classList.add("nyuzi-highlight"),setTimeout(()=>s.classList.remove("nyuzi-highlight"),3500))},200)}}async function Ye(){if(z){v=Je();let i=window.location.hash,n=i&&i.startsWith("#comment-")?i.replace("#comment-",""):"";n&&ve(n),F=v.length,q=v.filter(s=>!s.parentId).length,oe=!1,g(),xe();return}try{oe=!0,be=1,g();let i=window.location.hash,n=i&&i.startsWith("#comment-")?i.replace("#comment-",""):"",s=await ke(x,o,ne,1,Te,n);if(v=s.comments||[],n&&ve(n),F=s.total||(s.pagination?.totalComments??v.length),q=s.pagination?.totalTopLevel??v.filter(a=>!a.parentId).length,de=s.pagination?.hasMore??!1,z||(B=s.thread?.reactions&&typeof s.thread.reactions=="object"?{...s.thread.reactions}:{}),s.siteSettings&&typeof s.siteSettings=="object"){let a=s.siteSettings;a.accentColor&&(b.accent=a.accentColor),a.themeMode&&(b.themeMode=a.themeMode),a.bgMode&&(b.bgMode=a.bgMode),a.canvasBg!==void 0&&a.canvasBg!==""&&(b.bg=a.canvasBg),a.cardBg!==void 0&&a.cardBg!==""&&(b.cardBg=a.cardBg),a.textColor!==void 0&&a.textColor!==""&&(b.textColor=a.textColor),a.borderColor!==void 0&&a.borderColor!==""&&(b.borderColor=a.borderColor),a.radiusValue&&(b.radius=a.radiusValue),a.reactionType&&(b.reactionType=a.reactionType),a.showReactionsBar!==void 0&&(b.showReactionsBar=!!a.showReactionsBar),a.reactionsPrompt&&(b.reactionsPrompt=a.reactionsPrompt),a.reactionsPreset&&(b.reactionsPreset=a.reactionsPreset),Array.isArray(a.formattingTools)&&(b.allowedFormatting=a.formattingTools)}oe=!1,g(),xe()}catch(i){console.error("[Nyuzi] Failed to load comments:",i),oe=!1,J="Unable to connect to comments server.",g()}}async function We(){if(!(re||!de||z))try{re=!0,g();let i=be+1,n=await ke(x,o,ne,i,Te),s=n.comments||[],a=new Set(v.map(u=>u.id));for(let u of s)a.has(u.id)||v.push(u);be=i,de=n.pagination?.hasMore??!1,q=n.pagination?.totalTopLevel??q,F=n.pagination?.totalComments??F,re=!1,g()}catch(i){console.error("[Nyuzi] Error loading more comments:",i),re=!1,g()}}async function Ze(i){if(pe.has(i))return;pe.add(i);let n=G.has(i),s=n?"unvote":"upvote",a=v.find(u=>u.id===i);if(n?(G.delete(i),a&&(a.upvotes=Math.max(0,(a.upvotes||1)-1))):(G.add(i),a&&(a.upvotes=(a.upvotes||0)+1)),Ie(),g(),z){pe.delete(i);return}try{let u=await Pe(x,i,s);a&&typeof u.upvotes=="number"&&(a.upvotes=u.upvotes,g())}catch{n?(G.add(i),a&&(a.upvotes=(a.upvotes||0)+1)):(G.delete(i),a&&(a.upvotes=Math.max(0,(a.upvotes||1)-1))),Ie(),g()}finally{pe.delete(i)}}async function je(i,n,s,a,u=null){if(!(!i.trim()||!s.trim()))try{if(S=!0,J=null,g(),z){let $={id:`mock-${Date.now()}`,parentId:u,authorName:i.trim(),authorEmail:n,content:s.trim(),status:"approved",upvotes:0,createdAt:new Date().toISOString()};Ce($.id),u?(v.push($),Q.delete(u),ee.add(u)):(v.unshift($),q+=1),F+=1,Y=null,S=!1,g();return}let h=await Ne(x,{siteId:o,threadUrl:ne,threadTitle:$e,postAuthor:he,parentId:u,authorName:i,authorEmail:n,content:s,notifyOnReply:a});h.comment&&(Ce(h.comment.id),u?(v.push(h.comment),Q.delete(u),ee.add(u)):(v.unshift(h.comment),q+=1),F+=1,Y=null),S=!1,g()}catch(h){J=h.message||"Failed to post comment. Please try again.",S=!1,g()}}async function Ve(i,n){if(n.trim())try{if(S=!0,g(),z){let a=v.find(u=>u.id===i);a&&(a.content=n.trim(),a.isEdited=!0),X=null,S=!1,g();return}await Re(x,i,n.trim());let s=v.find(a=>a.id===i);s&&(s.content=n.trim(),s.isEdited=!0),X=null,S=!1,g()}catch(s){alert(s.message||"Failed to edit comment."),S=!1,g()}}async function Xe(i){try{if(S=!0,g(),z){v=v.filter(n=>n.id!==i&&n.parentId!==i),F=v.length,q=v.filter(n=>!n.parentId).length,Se(i),W=null,S=!1,g();return}await _e(x,i),v=v.filter(n=>n.id!==i&&n.parentId!==i),F=v.length,q=v.filter(n=>!n.parentId).length,Se(i),W=null,S=!1,g()}catch{alert("Failed to delete comment. Please try again."),W=null,S=!1,g()}}function Qe(i,n){let s=i.selectionStart,a=i.selectionEnd,u=i.value,h=u.substring(s,a),$="",I=0;switch(n){case"bold":$=h?`**${h}**`:"**bold text**",I=h?$.length:2;break;case"italic":$=h?`*${h}*`:"*italic text*",I=h?$.length:1;break;case"quote":h?$=h.split(`
`).map(c=>`> ${c}`).join(`
`):$="> quote text",I=$.length;break;case"code":$=h?`\`${h}\``:"`code`",I=h?$.length:1;break;case"link":$=h?`[${h}](https://)`:"[link title](https://example.com)",I=$.length-1;break;default:return}i.value=u.substring(0,s)+$+u.substring(a),i.focus();let M=s+I;i.setSelectionRange(M,M),i.dispatchEvent(new Event("input",{bubbles:!0}))}function g(){let i=v.filter(r=>!r.parentId),n=Ge(),s=b.themeMode==="auto"?n:b.themeMode||n,a=s==="light"&&n==="dark"||s==="dark"&&n==="light",u=!b.bg||b.bg==="transparent"||b.bgMode==="transparent",h=!!(a&&u&&b.themeMode!=="auto"),$={...b,resolvedTheme:s,isCardIsolated:h},I=He($),M=Ke();e&&(e.setAttribute("data-theme",s),h?e.setAttribute("data-card-isolated","true"):e.removeAttribute("data-card-isolated"));let c=O?O.trim().split(" ")[0]:"",m=ce&&c?`Share your thoughts, ${c}...`:"Share your thoughts or leave a question...";p.innerHTML=`
      <style>${I}</style>
      <div class="nyuzi-container">
        ${b.showReactionsBar?Be(D,b.reactionsPrompt,b.reactionsPreset,B):""}

        <!-- Header -->
        <div class="nyuzi-header">
          <h3 class="nyuzi-title">
            Discussion
            <span class="nyuzi-badge">${F}</span>
          </h3>
        </div>

        <!-- Main Form -->
        <div class="nyuzi-form">
          ${J?`<div class="nyuzi-alert">
                   <span>\u26A0\uFE0F ${k(J)}</span>
                   <button class="nyuzi-action-btn" id="dismiss-error" style="color:#b91c1c;">\u2715</button>
                 </div>`:""}

          ${ye("nyuzi-main-content",b.allowedFormatting)}
          <textarea class="nyuzi-textarea" id="nyuzi-main-content" maxlength="2000" placeholder="${k(m)}" required></textarea>
          <div class="nyuzi-attached-gif-preview" id="nyuzi-main-content-gif-preview" style="display: none;"></div>
          ${fe("nyuzi-main-content",b.allowedFormatting,"nyuzi-char-count")}

          ${ce?`
              <input type="hidden" id="nyuzi-main-name" value="${k(O)}" />
              <input type="hidden" id="nyuzi-main-email" value="${k(ae)}" />
              <div class="nyuzi-form-row nyuzi-logged-in-row">
                <div class="nyuzi-member-tag">
                  <span class="nyuzi-status-dot"></span>
                  <span>Logged in as <strong style="color:var(--nyuzi-text-primary); font-weight:600;">${k(O)}</strong></span>
                </div>
                <button class="nyuzi-submit-btn" id="nyuzi-main-submit" ${S?"disabled":""}>
                  ${S?"Posting...":"Post Comment"}
                </button>
              </div>
            `:`
              <div class="nyuzi-form-row">
                <div class="nyuzi-inputs">
                  <input type="text" class="nyuzi-input" id="nyuzi-main-name" placeholder="Name *" value="${k(O)}" required />
                  <input type="email" class="nyuzi-input" id="nyuzi-main-email" placeholder="Email (for reply alerts)" value="${k(ae)}" />
                </div>
                <button class="nyuzi-submit-btn" id="nyuzi-main-submit" ${S?"disabled":""}>
                  ${S?"Posting...":"Post Comment"}
                </button>
              </div>
            `}

          <label class="nyuzi-optin" id="nyuzi-optin-wrapper">
            <input type="checkbox" id="nyuzi-main-notify" checked />
            <span>Notify me via email when someone replies</span>
          </label>
        </div>

        <!-- Comments Stream -->
        ${oe?`<div class="nyuzi-skeleton">
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
                 ${i.map(r=>we(r,v,{postAuthor:he,reactionType:b.reactionType,upvotedComments:G,activeReplyId:Y,editingCommentId:X,confirmDeleteId:W,collapsedComments:Q,myComments:M,isSubmitting:S,savedAuthorName:O,savedAuthorEmail:ae,allowedFormatting:b.allowedFormatting,isLoggedInMember:!!ce,expandedThreads:ee})).join("")}
               </div>
               ${de?`<div class="nyuzi-pagination">
                        <button class="nyuzi-load-more-btn" id="nyuzi-load-more" ${re?"disabled":""}>
                          ${re?'<span class="nyuzi-spinner"></span> Loading comments...':`Load more comments (${Math.max(0,q-i.length)} remaining) \u2193`}
                        </button>
                      </div>`:""}`}

        <!-- Footer (link commented out to protect dashboard until auth is ready) -->
        <div class="nyuzi-footer">
          <!-- <a href="https://nyuzi-yap.vercel.app/" target="_blank" rel="noreferrer" class="nyuzi-brand" title="NyuziYap \u2014 Privacy-first, edge-powered comments"> -->
          <span class="nyuzi-brand" title="NyuziYap \u2014 Privacy-first, edge-powered comments" style="cursor: default; pointer-events: none;">
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
    `,et()}function et(){p.querySelectorAll(".nyuzi-reaction-pill").forEach(c=>{c.addEventListener("click",async m=>{if(ue)return;let r=m.currentTarget.getAttribute("data-reaction-key");if(!r)return;ue=!0;let y=D,f;if(D===r){f="unreact",D=null,B[r]=Math.max(0,(B[r]||1)-1);try{localStorage.removeItem(me)}catch{}}else if(D){f="switch";let d=D;D=r,B[d]=Math.max(0,(B[d]||1)-1),B[r]=(B[r]||0)+1;try{localStorage.setItem(me,r)}catch{}}else{f="react",D=r,B[r]=(B[r]||0)+1;try{localStorage.setItem(me,r)}catch{}}try{localStorage.setItem(Le,JSON.stringify(B))}catch{}if(g(),z)ue=!1;else try{let d=await Fe(x,{siteId:o,threadUrl:ne,threadTitle:$e,reactionKey:r,previousKey:y,action:f});d&&d.reactions&&(B={...d.reactions},g())}catch(d){console.warn("[Nyuzi] Failed to sync reaction to server:",d)}finally{ue=!1}})});async function i(c,m){let r=c.querySelector(".nyuzi-emoji-popover");if(!r)return;if(r.style.display!=="none"){r.style.display="none";return}p.querySelectorAll(".nyuzi-emoji-popover, .nyuzi-gif-popover").forEach(f=>{f.style.display="none"}),r.style.display="block";let y=r.querySelector("emoji-picker");if(y){setTimeout(()=>y.shadowRoot?.querySelector("input")?.focus(),50);return}r.innerHTML=`
        <div class="nyuzi-emoji-loading">
          <span class="nyuzi-spinner"></span>
          <span>Loading emoji library...</span>
        </div>
      `;try{if(await Ee(),r.style.display==="none")return;let f=e.getAttribute("data-theme")||"dark",d=document.createElement("emoji-picker");d.className=f==="light"?"light":"dark",d.addEventListener("emoji-click",E=>{let L=E.detail?.unicode;L&&De(m,L)}),r.innerHTML="",r.appendChild(d),setTimeout(()=>d.shadowRoot?.querySelector("input")?.focus(),50)}catch(f){console.error("[Nyuzi] Failed to load emoji picker:",f),r.innerHTML=`
          <div class="nyuzi-emoji-loading" style="color: #ef4444;">
            <span>Failed to load emoji library.</span>
          </div>
        `}}let n=new Map;async function s(c,m){let r=c.querySelector(".nyuzi-gif-popover");if(!r)return;let y=r;if(y.style.display!=="none"){y.style.display="none";return}p.querySelectorAll(".nyuzi-emoji-popover, .nyuzi-gif-popover").forEach(H=>{H.style.display="none"}),r.style.display="block";let f=[{id:"dance_carlton",title:"Carlton Dance",tags:["dance","dancing","happy","party","celebration","groove","vibes"],url:"https://media.giphy.com/media/pa37AAGzKXoek/giphy.gif",preview:"https://media.giphy.com/media/pa37AAGzKXoek/200_d.gif"},{id:"dance_snoopy",title:"Snoopy Dance",tags:["dance","dancing","snoopy","cartoon","happy","cute","vibing"],url:"https://media.giphy.com/media/mKMGLhoD8L4yc/giphy.gif",preview:"https://media.giphy.com/media/mKMGLhoD8L4yc/200_d.gif"},{id:"dance_kid",title:"Dancing Kid",tags:["dance","dancing","kid","excited","happy","party","moves"],url:"https://media.giphy.com/media/blSTtZehjAZ8I/giphy.gif",preview:"https://media.giphy.com/media/blSTtZehjAZ8I/200_d.gif"},{id:"dance_cat",title:"Dancing Cat",tags:["dance","dancing","cat","kitten","pet","vibes","funny"],url:"https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif",preview:"https://media.giphy.com/media/JIX9t2j0ZTN9S/200_d.gif"},{id:"cheers_gatsby",title:"Gatsby Cheers",tags:["cheers","toast","drink","respect","congrats","salute","celebrate"],url:"https://media.giphy.com/media/g9582DNuQppxC/giphy.gif",preview:"https://media.giphy.com/media/g9582DNuQppxC/200_d.gif"},{id:"nod_yes",title:"Jack Nicholson Nod",tags:["yes","nod","nodding","agree","perfect","evil smile","indeed"],url:"https://media.giphy.com/media/10Jpr9KSaXLchW/giphy.gif",preview:"https://media.giphy.com/media/10Jpr9KSaXLchW/200_d.gif"},{id:"popcorn_mj",title:"Eating Popcorn",tags:["popcorn","drama","watching","waiting","reading","thriller","tea"],url:"https://media.giphy.com/media/gl0mkIZOW6Nwc/giphy.gif",preview:"https://media.giphy.com/media/gl0mkIZOW6Nwc/200_d.gif"},{id:"facepalm_picard",title:"Facepalm",tags:["facepalm","smh","disappointed","no","why","ugh","sigh"],url:"https://media.giphy.com/media/3og0INyCmHlNylks9O/giphy.gif",preview:"https://media.giphy.com/media/3og0INyCmHlNylks9O/200_d.gif"},{id:"clap_applause",title:"Clap",tags:["clap","applause","bravo","cheer","great","awesome","yes"],url:"https://media.giphy.com/media/l3q2XhfQ8oCkm1Ts4/giphy.gif",preview:"https://media.giphy.com/media/l3q2XhfQ8oCkm1Ts4/200_d.gif"},{id:"mind_blown",title:"Mind Blown",tags:["mind blown","shocked","wow","amazing","boom","galaxy","crazy"],url:"https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif",preview:"https://media.giphy.com/media/26ufdipQqU2lhNA4g/200_d.gif"},{id:"reading_book",title:"Reading Book",tags:["reading","book","read","learn","study","literature","words"],url:"https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif",preview:"https://media.giphy.com/media/3o7btPCcdNniyf0ArS/200_d.gif"},{id:"laughing_lol",title:"Laughing",tags:["laugh","laughing","lol","haha","funny","lmao","rofl"],url:"https://media.giphy.com/media/10JhviFuU2gWD6/giphy.gif",preview:"https://media.giphy.com/media/10JhviFuU2gWD6/200_d.gif"},{id:"thinking_brain",title:"Thinking",tags:["think","thinking","smart","brain","idea","clever","plan"],url:"https://media.giphy.com/media/d3mlE7uhX8KFgEmY/giphy.gif",preview:"https://media.giphy.com/media/d3mlE7uhX8KFgEmY/200_d.gif"},{id:"thumbs_up",title:"Thumbs Up",tags:["thumbs up","good","nice","ok","cool","like","approve"],url:"https://media.giphy.com/media/111ebonMs90YLu/giphy.gif",preview:"https://media.giphy.com/media/111ebonMs90YLu/200_d.gif"},{id:"love_heart",title:"Love / Heart",tags:["love","heart","wholesome","sweet","aww","lovely","care"],url:"https://media.giphy.com/media/26FLdm964upIslUZ2/giphy.gif",preview:"https://media.giphy.com/media/26FLdm964upIslUZ2/200_d.gif"},{id:"speechless_cat",title:"Speechless",tags:["speechless","confused","what","awkward","silence","stare"],url:"https://media.giphy.com/media/l0HlvtIPzPdt2usKs/giphy.gif",preview:"https://media.giphy.com/media/l0HlvtIPzPdt2usKs/200_d.gif"},{id:"celebration_party",title:"Celebration",tags:["celebration","celebrate","party","winner","victory","hurray","dance"],url:"https://media.giphy.com/media/ely3apij36BJhoZ234/giphy.gif",preview:"https://media.giphy.com/media/ely3apij36BJhoZ234/200_d.gif"},{id:"coffee_cup",title:"Coffee",tags:["coffee","tea","morning","work","cafe","warm"],url:"https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif",preview:"https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/200_d.gif"},{id:"writing_type",title:"Writing",tags:["writing","write","author","typing","keyboard","essay","draft"],url:"https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif",preview:"https://media.giphy.com/media/13HgwGsXF0aiGY/200_d.gif"},{id:"excited_jonah",title:"Excited",tags:["excited","hype","scream","omg","yes","dance","happy"],url:"https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif",preview:"https://media.giphy.com/media/5GoVLqeAOo6PK/200_d.gif"}];r.innerHTML=`
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
      `;let d=r.querySelector(".nyuzi-gif-search-input"),E=r.querySelector(".nyuzi-gif-grid");d&&setTimeout(()=>d.focus(),50);function L(H,N){if(E){if(H.length===0){E.innerHTML=`
            <div style="grid-column: 1 / -1; padding: 1.5rem; text-align: center; color: var(--nyuzi-text-muted); font-size: 0.8125rem;">
              No GIFs found for "${k(N)}"
            </div>
          `;return}E.innerHTML=H.map(j=>`
          <div class="nyuzi-gif-card" data-gif-url="${k(j.url)}" title="${k(j.title)}">
            <img src="${k(j.preview||j.url)}" alt="${k(j.title)}" loading="lazy" />
          </div>
        `).join(""),E.querySelectorAll(".nyuzi-gif-card").forEach(j=>{j.addEventListener("click",()=>{let te=j.getAttribute("data-gif-url"),ge=j.getAttribute("data-gif-preview")||te||"";if(te){try{let tt=new Image;tt.src=te}catch{}a(c,m,te,ge),y.style.display="none"}})})}}async function _(H=""){if(!E)return;let N=H.toLowerCase().trim();if(n.has(N)){L(n.get(N),H);return}E.innerHTML=`
          <div style="grid-column: 1 / -1; padding: 1.5rem; text-align: center; color: var(--nyuzi-text-muted); font-size: 0.8125rem;">
            <span class="nyuzi-spinner" style="display: inline-block; margin-bottom: 0.35rem;"></span>
            <div>Searching...</div>
          </div>
        `;let j=[];try{j=await qe(x,H)}catch{j=[]}(!j||j.length===0)&&(j=N?f.filter(te=>te.title.toLowerCase().includes(N)||te.tags.some(ge=>ge.toLowerCase().includes(N)||N.includes(ge.toLowerCase()))):f),n.set(N,j),L(j,H)}_("");let Z=null;d&&d.addEventListener("input",()=>{clearTimeout(Z),Z=setTimeout(()=>{_(d.value.trim())},350)})}function a(c,m,r,y=""){m.dataset.attachedGif=r;let f=`${m.id}-gif-preview`,d=p.getElementById(f);if(!d)return;let E=y||r;d.className="nyuzi-attached-gif-preview loading",d.style.display="inline-block",d.innerHTML=`
        <img class="thumb-gif" src="${k(E)}" alt="Preview GIF" />
        <img class="full-gif" src="${k(r)}" alt="Attached GIF" />
        <span class="nyuzi-attached-gif-badge">
          <span class="nyuzi-spinner" style="width: 8px; height: 8px; border-width: 1.5px; border-color: rgba(255,255,255,0.3); border-top-color: #fff;"></span>
          <span>Attaching...</span>
        </span>
        <button type="button" class="nyuzi-attached-gif-remove" title="Remove GIF">\u2715</button>
      `;let L=d.querySelector("img.full-gif"),_=d.querySelector(".nyuzi-attached-gif-badge");function Z(){d&&(d.classList.remove("loading"),d.classList.add("loaded"),_&&(_.style.opacity="0",setTimeout(()=>_.remove(),250)))}L&&(L.complete&&L.naturalWidth>0?Z():(L.addEventListener("load",Z,{once:!0}),L.addEventListener("error",()=>{_&&_.remove(),d.classList.remove("loading")},{once:!0})));let H=d.querySelector(".nyuzi-attached-gif-remove");H&&H.addEventListener("click",N=>{N.preventDefault(),N.stopPropagation(),delete m.dataset.attachedGif,d.className="nyuzi-attached-gif-preview",d.innerHTML="",d.style.display="none"})}p.querySelectorAll(".nyuzi-format-btn").forEach(c=>{c.getAttribute("data-action")==="emoji"&&c.addEventListener("mouseenter",Ae,{once:!0}),c.addEventListener("click",m=>{m.preventDefault();let r=m.currentTarget.getAttribute("data-action"),y=m.currentTarget.closest("[data-target]"),f=y?.getAttribute("data-target");if(!r||!f)return;let d=p.getElementById(f);if(d){if(r==="emoji"){i(y,d);return}if(r==="gif"){s(y,d);return}Qe(d,r)}})}),p.querySelectorAll("textarea").forEach(c=>{c.addEventListener("focus",Ae,{once:!0})});let u=p.getElementById("nyuzi-main-content"),h=p.getElementById("nyuzi-char-count");u&&h&&u.addEventListener("input",()=>{h.textContent=`${u.value.length} / 2,000`});let $=p.getElementById("dismiss-error");$&&$.addEventListener("click",()=>{J=null,g()});let I=p.getElementById("nyuzi-main-submit");I&&I.addEventListener("click",()=>{let c=p.getElementById("nyuzi-main-name"),m=p.getElementById("nyuzi-main-email"),r=p.getElementById("nyuzi-main-notify");if(!c.value.trim()){J="Please enter your name.",g();return}let y=u?u.value.trim():"",f=u?.dataset.attachedGif;if(f){y=y?`${y}

![GIF](${f})`:`![GIF](${f})`,u&&delete u.dataset.attachedGif;let L=p.getElementById("nyuzi-main-content-gif-preview");L&&(L.innerHTML="",L.style.display="none")}if(!y){J="Please write a comment or attach a GIF.",g();return}let d=c.value.trim(),E=m.value.trim()||null;Me(d,E),je(d,E,y,r?r.checked:!0,null)});let M=p.getElementById("nyuzi-load-more");M&&M.addEventListener("click",()=>{We()}),p.querySelectorAll(".upvote-btn").forEach(c=>{c.addEventListener("click",m=>{let r=m.currentTarget.getAttribute("data-id");r&&Ze(r)})}),p.querySelectorAll(".reply-trigger").forEach(c=>{c.addEventListener("click",m=>{let r=m.currentTarget.getAttribute("data-id");Y=Y===r?null:r,X=null,W=null,g()})}),p.querySelectorAll(".cancel-reply").forEach(c=>{c.addEventListener("click",()=>{Y=null,g()})}),p.querySelectorAll(".submit-reply").forEach(c=>{c.addEventListener("click",m=>{let r=m.currentTarget.getAttribute("data-parent-id");if(!r)return;let y=p.getElementById(`reply-name-${r}`),f=p.getElementById(`reply-email-${r}`),d=p.getElementById(`reply-content-${r}`);if(!y.value.trim()){alert("Please enter your name.");return}let E=d?d.value.trim():"",L=d?.dataset.attachedGif;if(L){E=E?`${E}

![GIF](${L})`:`![GIF](${L})`,d&&delete d.dataset.attachedGif;let H=p.getElementById(`reply-content-${r}-gif-preview`);H&&(H.innerHTML="",H.style.display="none")}if(!E){alert("Please write a reply or attach a GIF.");return}let _=y.value.trim(),Z=f?.value.trim()||null;Me(_,Z),je(_,Z,E,!0,r)})}),p.querySelectorAll(".edit-trigger").forEach(c=>{c.addEventListener("click",m=>{X=m.currentTarget.getAttribute("data-id"),Y=null,W=null,g()})}),p.querySelectorAll(".cancel-edit").forEach(c=>{c.addEventListener("click",()=>{X=null,g()})}),p.querySelectorAll(".save-edit").forEach(c=>{c.addEventListener("click",m=>{let r=m.currentTarget.getAttribute("data-id");if(!r)return;let y=p.getElementById(`edit-content-${r}`);if(!y)return;let f=y.value.trim(),d=y.dataset.attachedGif;if(d){f=f?`${f}

![GIF](${d})`:`![GIF](${d})`,delete y.dataset.attachedGif;let E=p.getElementById(`edit-content-${r}-gif-preview`);E&&(E.innerHTML="",E.style.display="none")}if(!f){alert("Comment content cannot be empty.");return}Ve(r,f)})}),p.querySelectorAll(".delete-trigger").forEach(c=>{c.addEventListener("click",m=>{W=m.currentTarget.getAttribute("data-id"),Y=null,X=null,g()})}),p.querySelectorAll(".nyuzi-cancel-delete-btn").forEach(c=>{c.addEventListener("click",()=>{W=null,g()})}),p.querySelectorAll(".nyuzi-confirm-delete-btn").forEach(c=>{c.addEventListener("click",m=>{let r=m.currentTarget.getAttribute("data-id");r&&Xe(r)})}),p.querySelectorAll(".nyuzi-collapse-btn").forEach(c=>{c.addEventListener("click",m=>{let r=m.currentTarget.getAttribute("data-id");r&&(Q.has(r)?Q.delete(r):Q.add(r),g())})}),p.querySelectorAll(".nyuzi-show-more-replies-btn").forEach(c=>{c.addEventListener("click",m=>{let r=m.currentTarget.getAttribute("data-id");r&&(ee.has(r)?ee.delete(r):ee.add(r),g())})}),p.querySelectorAll(".copy-link-btn").forEach(c=>{c.addEventListener("click",async m=>{let r=m.currentTarget,y=r.getAttribute("data-id");if(!y)return;let d=`${window.location.href.split("#")[0]}#comment-${y}`;try{await navigator.clipboard.writeText(d);let E=r.innerHTML;r.innerHTML="\u2713 Copied!",r.style.color="var(--nyuzi-accent)",setTimeout(()=>{r.innerHTML=E,r.style.color=""},2e3)}catch{window.location.hash=`comment-${y}`}})})}window.addEventListener("hashchange",xe);try{let i=null,n=()=>{clearTimeout(i),i=setTimeout(()=>{g()},50)},s=new MutationObserver(a=>{for(let u of a)if(u.type==="attributes"&&(u.attributeName==="class"||u.attributeName==="data-theme"||u.attributeName==="data-color-mode"||u.attributeName==="data-bs-theme"||u.attributeName==="style")){n();break}});s.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","data-color-mode","data-bs-theme","style"]}),document.body&&s.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme","data-color-mode","data-bs-theme","style"]}),typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",n)}catch(i){console.debug("[Nyuzi] Theme observer warning:",i)}document.addEventListener("click",i=>{i.composedPath().some(a=>a?.classList?.contains("nyuzi-emoji-popover")||a?.classList?.contains("nyuzi-emoji-btn")||a?.classList?.contains("nyuzi-gif-popover")||a?.classList?.contains("nyuzi-gif-btn")||a?.tagName?.toLowerCase()==="emoji-picker")||p.querySelectorAll(".nyuzi-emoji-popover, .nyuzi-gif-popover").forEach(a=>{a.style.display="none"})}),document.addEventListener("keydown",i=>{i.key==="Escape"&&p.querySelectorAll(".nyuzi-emoji-popover, .nyuzi-gif-popover").forEach(n=>{n.style.display="none"})}),Ye()})();})();
//# sourceMappingURL=embed.js.map