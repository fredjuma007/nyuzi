"use strict";(()=>{function et(i){if(!i||typeof i!="string"||!i.startsWith("#"))return!1;let o=i.replace("#","");if(o.length!==6&&o.length!==3)return!1;let e=parseInt(o.length===3?o[0]+o[0]:o.slice(0,2),16),s=parseInt(o.length===3?o[1]+o[1]:o.slice(2,4),16),z=parseInt(o.length===3?o[2]+o[2]:o.slice(4,6),16);return(e*299+s*587+z*114)/1e3>155}function Ie(i){let{accent:o,bg:e,cardBg:s,textColor:z,textSecondary:v,borderColor:C,inputBg:$,radius:E="0.75rem",themeMode:Z,bgMode:O,resolvedTheme:_=Z==="auto"?"dark":Z,isCardIsolated:U=!1}=i,x=_||"dark",R=et(s);return`
    :host {
      --nyuzi-accent: ${o||"#f56220"};
      --nyuzi-accent-hover: color-mix(in srgb, var(--nyuzi-accent) 80%, black);
      --nyuzi-accent-soft: color-mix(in srgb, var(--nyuzi-accent) 12%, transparent);
      --nyuzi-accent-border: color-mix(in srgb, var(--nyuzi-accent) 30%, transparent);

      --nyuzi-bg: ${U?x==="light"?"#ffffff":"#090605":e||(O==="card"?x==="dark"?"#090605":"#f8fafc":"transparent")};
      --nyuzi-card-bg: ${s||(x==="dark"?"#14100e":x==="sepia"?"#fbf3e4":"#ffffff")};
      --nyuzi-text-primary: ${z||(x==="dark"?R?"#0f172a":"#f8fafc":x==="sepia"?"#2b2118":"#0f172a")};
      --nyuzi-text-secondary: ${v||(x==="dark"?R?"#475569":"#cbd5e1":x==="sepia"?"#6a5949":"#475569")};
      --nyuzi-text-muted: ${x==="sepia"?"#968370":"#94a3b8"};
      --nyuzi-border: ${C||(x==="dark"?R?"#e2e8f0":"rgba(255, 255, 255, 0.12)":x==="sepia"?"#e2d4bc":"#e2e8f0")};
      --nyuzi-input-bg: ${$||(x==="dark"?R?"#ffffff":"#181412":x==="sepia"?"#fbf7ef":"#f8fafc")};
      --nyuzi-reaction-bg: ${x==="dark"?R?"#ffffff":"rgba(255, 255, 255, 0.05)":x==="sepia"?"#fbf7ef":"#ffffff"};
      --nyuzi-reaction-border: ${x==="dark"?R?"#e2e8f0":"rgba(255, 255, 255, 0.1)":x==="sepia"?"#e2d4bc":"#e2e8f0"};
      --nyuzi-badge-bg: ${x==="dark"?R?"#f1f5f9":"rgba(255, 255, 255, 0.08)":x==="sepia"?"#ece0cd":"#f1f5f9"};
      --nyuzi-badge-border: ${x==="dark"?R?"#e2e8f0":"rgba(255, 255, 255, 0.12)":x==="sepia"?"#e2d4bc":"#e2e8f0"};
      --nyuzi-thread-line: ${x==="dark"?R?"#e2e8f0":"rgba(255, 255, 255, 0.12)":x==="sepia"?"#e2d4bc":"#e2e8f0"};
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
      padding: ${U?"1.5rem 1.25rem":"0.75rem 0.5rem"};
      ${U?x==="light"?`
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
    ${O==="card"?`
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
  `}function T(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function tt(i){let o=i.trim().split(/\s+/);return o.length===1?o[0].slice(0,2).toUpperCase():(o[0][0]+o[o.length-1][0]).toUpperCase()}function it(i){try{let o=new Date(i),s=Math.floor((new Date().getTime()-o.getTime())/1e3);return s<60?"just now":s<3600?`${Math.floor(s/60)}m ago`:s<86400?`${Math.floor(s/3600)}h ago`:s<604800?`${Math.floor(s/86400)}d ago`:o.toLocaleDateString(void 0,{month:"short",day:"numeric"})}catch{return"recently"}}function nt(i,o){if(!i)return"";let e=T(i),s=o??["bold","italic","quote","code","link","emoji","gif"];if(s.includes("code")&&(e=e.replace(/`([^`\n]+)`/g,"<code>$1</code>")),s.includes("bold")&&(e=e.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>")),s.includes("italic")&&(e=e.replace(/(^|[^*])\*([^*]+)\*([^*]|$)/g,"$1<em>$2</em>$3")),s.includes("gif")){let E=0;e=e.replace(/!\[([^\]]*)\]\(((?:https?:\/\/)[^\s)]+(?:\.(?:gif|webp|png|jpg|jpeg)[^\s)]*|(?:giphy\.com|tenor\.com)[^\s)]*))\)/gi,(Z,O,_)=>E===0?(E++,`<div class="nyuzi-comment-gif-wrapper"><img src="${_}" alt="${O}" class="nyuzi-comment-gif" loading="lazy" /></div>`):`[GIF: ${O}]`)}s.includes("link")?e=e.replace(/\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'):e=e.replace(/\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)/g,"$1 ($2)");let z=e.split(`
`),v=[],C=!1,$=[];for(let E of z)s.includes("quote")&&(E.startsWith("&gt; ")||E==="&gt;")?(C=!0,$.push(E.replace(/^&gt; ?/,""))):(C&&(v.push(`<blockquote>${$.join("<br/>")}</blockquote>`),$=[],C=!1),v.push(E));return C&&v.push(`<blockquote>${$.join("<br/>")}</blockquote>`),v.join(`
`).replace(/(<\/blockquote>)\n+/g,"$1").replace(/\n+(<blockquote>)/g,"$1").replace(/\n/g,"<br/>")}function rt(i,o){return i==="upvote"?`<svg class="nyuzi-reaction-icon" viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" fill="${o?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`:i==="like"?`<svg class="nyuzi-reaction-icon nyuzi-like-icon" viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2" fill="${o?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12M15 10.5a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3v2.5M7 10l5-6v5h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7"/><path d="M7 10H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"/></svg>`:`<svg class="nyuzi-reaction-icon nyuzi-heart-icon" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="${o?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>`}function at(){return'<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>'}function ot(){return'<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'}function st(){return'<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>'}function lt(){return'<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>'}function ct(i,o){return i.upvotes>0?`${i.upvotes}`:o==="upvote"?"Upvote":"Like"}function dt(i,o){if(!i)return!1;let e=i.trim().toLowerCase();return o&&e===o.trim().toLowerCase()?!0:e.includes("fred juma")||e.includes("brenda frenjo")||e.includes("sumeiya juma")}function pe(i,o){let e=o&&o.length>0?o:["bold","italic","quote","code","link","emoji","gif"],s=[];return e.includes("bold")&&s.push(`
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
      </button>`),s.length===0?"":`
    <div class="nyuzi-format-toolbar" data-target="${i}">
      ${s.join("")}
    </div>
  `}function Me(i,o,e){let s=o&&o.length>0?o:["bold","italic","quote","code","link","emoji","gif"],z=[];s.includes("emoji")&&z.push(`
      <button type="button" class="nyuzi-format-btn nyuzi-emoji-btn" data-action="emoji" title="Insert Emoji">
        <span style="font-size: 0.95rem; line-height: 1; display: inline-block;">\u{1F600}</span>
      </button>`),s.includes("gif")&&z.push(`
      <button type="button" class="nyuzi-format-btn nyuzi-gif-btn" data-action="gif" title="Search & Insert GIF">
        <span style="font-size: 0.6875rem; font-weight: 800; letter-spacing: -0.02em; padding: 1px 5px; border-radius: 4px; background: var(--nyuzi-accent-soft); color: var(--nyuzi-accent);">GIF</span>
      </button>`);let v=z.length>0;return!v&&!e?"":`
    <div class="nyuzi-bottom-toolbar" data-target="${i}">
      <div class="nyuzi-media-actions">
        ${z.join("")}
        ${v?`
          <div class="nyuzi-emoji-popover" style="display: none;"></div>
          <div class="nyuzi-gif-popover" style="display: none;"></div>
        `:""}
      </div>
      ${e?`<span class="nyuzi-char-count" id="${e}">0 / 2,000</span>`:"<span></span>"}
    </div>
  `}function je(i,o="How was this discussion?",e="general",s){let C=e==="literary"?[{key:"coffee",emoji:"\u2615",label:"Thoughtful"},{key:"book",emoji:"\u{1F4D6}",label:"Engrossing"},{key:"lightbulb",emoji:"\u{1F4A1}",label:"Insight"},{key:"heart",emoji:"\u2764\uFE0F",label:"Moved"},{key:"clap",emoji:"\u{1F44F}",label:"Applause"}]:[{key:"fire",emoji:"\u{1F525}",label:"Superb"},{key:"heart",emoji:"\u2764\uFE0F",label:"Love"},{key:"lightbulb",emoji:"\u{1F4A1}",label:"Insight"},{key:"laugh",emoji:"\u{1F602}",label:"Laugh"},{key:"clap",emoji:"\u{1F44F}",label:"Applause"}];return`
    <div class="nyuzi-reactions-bar">
      <div class="nyuzi-reactions-prompt">${T(o||"How was this discussion?")}</div>
      <div class="nyuzi-reactions-grid">
        ${C.map($=>{let E=Number(s?.[$.key])||0;return`
          <div class="nyuzi-reaction-pill ${i===$.key?"active":""}" data-reaction-key="${$.key}">
            <div class="emoji-row">
              <span>${$.emoji}</span>
              ${E>0?`<span class="reaction-count">${E}</span>`:""}
            </div>
            <span class="reaction-label">${$.label}</span>
          </div>
        `}).join("")}
      </div>
    </div>
  `}function he(i,o,e){let s=o.filter(_=>_.parentId===i.id);s.sort((_,U)=>new Date(_.createdAt).getTime()-new Date(U.createdAt).getTime());let z=e.activeReplyId===i.id,v=e.editingCommentId===i.id,C=e.confirmDeleteId===i.id,$=e.collapsedComments.has(i.id),E=e.upvotedComments.has(i.id),Z=e.myComments.has(i.id),O=i.isAuthor??dt(i.authorName,e.postAuthor);return`
    <div class="nyuzi-comment" id="comment-${i.id}">
      <div class="nyuzi-avatar">${T(tt(i.authorName))}</div>
      <div class="nyuzi-body">
        <div class="nyuzi-meta">
          <span class="nyuzi-author">${T(i.authorName)}</span>
          ${O?'<span class="nyuzi-author-badge">Author</span>':""}
          <span class="nyuzi-time">${it(i.createdAt)}</span>
          ${i.isEdited?'<span class="nyuzi-edited-tag" title="Edited by reader">(edited)</span>':""}
        </div>

        ${v?`
            <div class="nyuzi-edit-box">
              ${pe(`edit-content-${i.id}`,e.allowedFormatting)}
              <textarea class="nyuzi-textarea nyuzi-edit-textarea" id="edit-content-${i.id}" rows="3" maxlength="2000">${T(i.content)}</textarea>
              <div class="nyuzi-attached-gif-preview" id="edit-content-${i.id}-gif-preview" style="display: none;"></div>
              ${Me(`edit-content-${i.id}`,e.allowedFormatting)}
              <div class="nyuzi-edit-actions">
                <button class="nyuzi-action-btn cancel-edit" data-id="${i.id}">Cancel</button>
                <button class="nyuzi-submit-btn save-edit" data-id="${i.id}" ${e.isSubmitting?"disabled":""}>
                  ${e.isSubmitting?"Saving...":"Save Changes"}
                </button>
              </div>
            </div>
          `:C?`
            <div class="nyuzi-confirm-pill">
              <span>Delete this comment?</span>
              <button class="nyuzi-confirm-delete-btn" data-id="${i.id}" ${e.isSubmitting?"disabled":""}>
                ${e.isSubmitting?"Deleting...":"Yes, Delete"}
              </button>
              <button class="nyuzi-cancel-delete-btn" data-id="${i.id}">Cancel</button>
            </div>
          `:`<div class="nyuzi-content">${nt(i.content,e.allowedFormatting)}</div>`}

        ${!v&&!C?`
          <div class="nyuzi-actions">
            <button class="nyuzi-action-btn upvote-btn ${E?"upvoted":""}" data-id="${i.id}" title="${E?"Unlike":"Like"}">
              ${rt(e.reactionType,E)}
              <span>${ct(i,e.reactionType)}</span>
            </button>
            <button class="nyuzi-action-btn reply-trigger" data-id="${i.id}">
              ${at()}
              <span>Reply</span>
            </button>
            <button class="nyuzi-action-btn copy-link-btn" data-id="${i.id}" title="Copy direct link to this comment">
              ${ot()}
              <span>Copy Link</span>
            </button>
            ${Z?`
              <button class="nyuzi-action-btn edit-trigger" data-id="${i.id}" title="Edit your comment (15m grace window)">
                ${st()}
                <span>Edit</span>
              </button>
              <button class="nyuzi-action-btn delete-trigger" data-id="${i.id}" title="Delete your comment">
                ${lt()}
                <span>Delete</span>
              </button>
            `:""}
          </div>
        `:""}

        ${z?`
            <div class="nyuzi-reply-box">
              ${pe(`reply-content-${i.id}`,e.allowedFormatting)}
              <textarea class="nyuzi-textarea" id="reply-content-${i.id}" placeholder="Reply to ${T(i.authorName)}..." maxlength="2000" required></textarea>
              <div class="nyuzi-attached-gif-preview" id="reply-content-${i.id}-gif-preview" style="display: none;"></div>
              ${Me(`reply-content-${i.id}`,e.allowedFormatting)}
              <div class="nyuzi-form-row">
                <div class="nyuzi-inputs">
                  <input type="text" class="nyuzi-input" id="reply-name-${i.id}" placeholder="Your Name *" value="${T(e.savedAuthorName)}" required />
                  <input type="email" class="nyuzi-input" id="reply-email-${i.id}" placeholder="Email (for reply alerts)" value="${T(e.savedAuthorEmail)}" />
                </div>
                <div style="display:flex; gap:0.5rem; align-items:flex-end;">
                  <button class="nyuzi-action-btn cancel-reply" style="padding: 0.5rem 0.75rem;">Cancel</button>
                  <button class="nyuzi-submit-btn submit-reply" data-parent-id="${i.id}" ${e.isSubmitting?"disabled":""}>
                    ${e.isSubmitting?"Posting...":"Reply"}
                  </button>
                </div>
              </div>
            </div>
          `:""}

        ${s.length>0?`
          <div class="nyuzi-replies-wrapper">
            <button class="nyuzi-collapse-btn" data-id="${i.id}" title="${$?"Expand replies":"Collapse replies"}">
              <svg class="nyuzi-collapse-chevron ${$?"collapsed":""}" viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              <span>${$?`Show ${s.length} ${s.length===1?"reply":"replies"}`:`Hide ${s.length} ${s.length===1?"reply":"replies"}`}</span>
            </button>
            ${$?"":`
              <div class="nyuzi-replies">
                ${s.map(_=>he(_,o,e)).join("")}
              </div>
            `}
          </div>
        `:""}
      </div>
    </div>
  `}async function be(i,o,e,s,z,v){let C=v?`&highlight=${encodeURIComponent(v)}`:"",$=`${i}/api/v1/comments?siteId=${encodeURIComponent(o)}&threadUrl=${encodeURIComponent(e)}&page=${s}&limit=${z}${C}`,E=await fetch($);if(!E.ok)throw new Error(`HTTP ${E.status}`);return E.json()}async function He(i,o){let e=await fetch(`${i}/api/v1/comments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});if(!e.ok){let s=await e.json().catch(()=>({}));throw new Error(s.error||`HTTP ${e.status}`)}return e.json()}async function Be(i,o,e){let s=await fetch(`${i}/api/v1/comments/${encodeURIComponent(o)}/upvote`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:e})});if(!s.ok)throw new Error("Vote action failed");return s.json()}async function Ne(i,o,e){let s=await fetch(`${i}/api/v1/comments/${encodeURIComponent(o)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:e})});if(!s.ok){let z=await s.json().catch(()=>({}));throw new Error(z.error||`HTTP ${s.status}`)}return s.json()}async function _e(i,o){let e=await fetch(`${i}/api/v1/comments/${encodeURIComponent(o)}`,{method:"DELETE"});if(!e.ok)throw new Error("Delete action failed");return e.json()}async function Re(i,o){let e=await fetch(`${i}/api/v1/threads/react`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});if(!e.ok)throw new Error("Thread reaction failed");return e.json()}async function Pe(i,o=""){let e=`${i}/api/v1/gifs?q=${encodeURIComponent(o)}&limit=16`,s=await fetch(e);if(!s.ok)throw new Error("Failed to load GIFs");return(await s.json()).data||[]}(function(){let i=document.currentScript,o=document.getElementById("nyuzi-comments")||document.querySelector("nyuzi-comments");if(!o){console.warn("[Nyuzi] No container found (#nyuzi-comments or <nyuzi-comments>).");return}let e=o;if(e.__nyuzi_initialized)return;e.__nyuzi_initialized=!0;let s=i?.getAttribute("data-site-id")||e.getAttribute("data-site-id")||document.querySelector("[data-nyuzi-site-id]")?.getAttribute("data-nyuzi-site-id")||"",z=i?.getAttribute("data-api")||e.getAttribute("data-api")||"https://nyuzi-api.fredjuma8.workers.dev",v=i?.getAttribute("data-mock")==="true"||e.getAttribute("data-mock")==="true",C=i?.getAttribute("data-reactions-bar")??e.getAttribute("data-reactions-bar"),$=C===null?!0:C!=="false",E=i?.getAttribute("data-reactions-prompt")||e.getAttribute("data-reactions-prompt")||"How was this discussion?",Z=i?.getAttribute("data-reactions-preset")||e.getAttribute("data-reactions-preset")||"general",_=(i?.getAttribute("data-formatting")||e.getAttribute("data-formatting")||"bold,italic,quote,code,link,emoji,gif").split(",").map(t=>t.trim().toLowerCase()).filter(Boolean),U=i?.src||"",x="https://nyuzi-yap.vercel.app";if(U)try{x=new URL(U).origin}catch{}let R=`${x}/emoji-picker.js`,ee=!1,oe=!1;function ve(){return typeof customElements<"u"&&customElements.get("emoji-picker")?(ee=!0,Promise.resolve()):ee?Promise.resolve():new Promise((t,n)=>{let c=document.querySelector('script[src*="emoji-picker.js"]');if(c){if(customElements.get("emoji-picker"))return ee=!0,t();c.addEventListener("load",()=>{ee=!0,t()}),c.addEventListener("error",n);return}oe=!0;let r=document.createElement("script");r.src=R,r.async=!0,r.onload=()=>{ee=!0,oe=!1,t()},r.onerror=u=>{oe=!1,n(u)},document.head.appendChild(r)})}function ze(){ee||oe||typeof customElements<"u"&&customElements.get("emoji-picker")||ve().catch(()=>{})}function Fe(t,n){let c=t.selectionStart??t.value.length,r=t.selectionEnd??t.value.length,u=t.value;t.value=u.substring(0,c)+n+u.substring(r);let h=c+n.length;t.focus(),t.setSelectionRange(h,h),t.dispatchEvent(new Event("input",{bubbles:!0}))}let ut=!!(i?.getAttribute("data-accent-color")||e.getAttribute("data-accent-color")),mt=!!(i?.getAttribute("data-theme")||e.getAttribute("data-theme")),pt=!!(i?.getAttribute("data-bg")||e.getAttribute("data-bg")),gt=!!(i?.getAttribute("data-bg-color")||e.getAttribute("data-bg-color")),yt=!!(i?.getAttribute("data-card-bg")||e.getAttribute("data-card-bg")),ft=!!(i?.getAttribute("data-text-color")||e.getAttribute("data-text-color")),ht=!!(i?.getAttribute("data-border-color")||e.getAttribute("data-border-color")),bt=!!(i?.getAttribute("data-radius")||e.getAttribute("data-radius")),vt=!!(i?.getAttribute("data-reaction")||e.getAttribute("data-reaction")),zt=C!=null,xt=!!(i?.getAttribute("data-reactions-prompt")||e.getAttribute("data-reactions-prompt")),wt=!!(i?.getAttribute("data-reactions-preset")||e.getAttribute("data-reactions-preset"));function qe(){try{let t=document.documentElement,n=document.body,c=t.getAttribute("data-theme")||t.getAttribute("data-color-mode")||t.getAttribute("data-bs-theme")||"",r=n?.getAttribute("data-theme")||n?.getAttribute("data-color-mode")||n?.getAttribute("data-bs-theme")||"",u=`${c} ${r}`.toLowerCase();if(u.includes("dark"))return"dark";if(u.includes("light"))return"light";if(t.classList.contains("dark")||t.classList.contains("dark-theme")||t.classList.contains("dark-mode")||t.classList.contains("theme-dark")||!!(n&&(n.classList.contains("dark")||n.classList.contains("dark-theme")||n.classList.contains("dark-mode")||n.classList.contains("theme-dark"))))return"dark";if(t.classList.contains("light")||t.classList.contains("light-theme")||t.classList.contains("light-mode")||t.classList.contains("theme-light")||!!(n&&(n.classList.contains("light")||n.classList.contains("light-theme")||n.classList.contains("light-mode")||n.classList.contains("theme-light"))))return"light";let S=e.parentElement;for(;S&&S!==document.documentElement;){let I=window.getComputedStyle(S).backgroundColor;if(I&&I!=="transparent"&&!I.startsWith("rgba(0, 0, 0, 0)")){let l=I.match(/\d+/g);if(l&&l.length>=3){let p=parseInt(l[0],10),a=parseInt(l[1],10),g=parseInt(l[2],10);if((l.length>=4?parseFloat(l[3]):1)>.1)return(p*299+a*587+g*114)/1e3<130?"dark":"light"}}S=S.parentElement}if(n){let I=window.getComputedStyle(n).backgroundColor;if(I&&I!=="transparent"&&!I.startsWith("rgba(0, 0, 0, 0)")){let l=I.match(/\d+/g);if(l&&l.length>=3){let p=parseInt(l[0],10),a=parseInt(l[1],10),g=parseInt(l[2],10);return(p*299+a*587+g*114)/1e3<130?"dark":"light"}}}}catch{}return typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}let b={accent:i?.getAttribute("data-accent-color")||e.getAttribute("data-accent-color")||"#f56220",bg:i?.getAttribute("data-bg-color")||e.getAttribute("data-bg-color")||"",cardBg:i?.getAttribute("data-card-bg")||e.getAttribute("data-card-bg")||"",textColor:i?.getAttribute("data-text-color")||e.getAttribute("data-text-color")||"",textSecondary:i?.getAttribute("data-text-secondary")||e.getAttribute("data-text-secondary")||"",borderColor:i?.getAttribute("data-border-color")||e.getAttribute("data-border-color")||"",inputBg:i?.getAttribute("data-input-bg")||e.getAttribute("data-input-bg")||"",radius:i?.getAttribute("data-radius")||e.getAttribute("data-radius")||"0.75rem",reactionType:i?.getAttribute("data-reaction")||e.getAttribute("data-reaction")||"like",themeMode:i?.getAttribute("data-theme")||e.getAttribute("data-theme")||"auto",bgMode:i?.getAttribute("data-bg")||e.getAttribute("data-bg")||"transparent",showReactionsBar:$,reactionsPrompt:E,reactionsPreset:Z,allowedFormatting:_},m=e.shadowRoot||e.attachShadow({mode:"open"});m.innerHTML="",b.themeMode&&e.setAttribute("data-theme",b.themeMode);let te=i?.getAttribute("data-thread-url")||e.getAttribute("data-thread-url")||window.location.href.split("#")[0],xe=i?.getAttribute("data-thread-title")||e.getAttribute("data-thread-title")||document.title||"Discussion",ge=i?.getAttribute("data-author-name")||e.getAttribute("data-author-name")||"",we=i?.getAttribute("data-user-name")||e.getAttribute("data-user-name")||"",Ge=i?.getAttribute("data-user-email")||e.getAttribute("data-user-email")||"",w=[],F=0,q=0,ye=1,ke=15,se=!1,ie=!1,re=!0,K=null,J=null,X=null,Y=null,H=!1,G=null,D=new Set,le=new Set,ce=!1,de=`nyuzi_react_${s}_${encodeURIComponent(te)}`,Ee=`nyuzi_counts_${s}_${encodeURIComponent(te)}`,B={...v?b.reactionsPreset==="literary"?{coffee:21,book:28,lightbulb:14,heart:19,clap:16}:{fire:18,heart:24,lightbulb:12,laugh:7,clap:15}:{}};try{let t=localStorage.getItem(de);t&&(G=t)}catch{}if(v)try{let t=localStorage.getItem(Ee);t&&(B={...B,...JSON.parse(t)})}catch{}let ae="nyuzi_reader_ownership",De=900*1e3;function Ae(t){try{let n=localStorage.getItem(ae),c=n?JSON.parse(n):{};c[t]=Date.now()+De,localStorage.setItem(ae,JSON.stringify(c))}catch{}}function $e(t){try{let n=localStorage.getItem(ae);if(n){let c=JSON.parse(n);delete c[t],localStorage.setItem(ae,JSON.stringify(c))}}catch{}}function Oe(){let t=new Set;try{let n=localStorage.getItem(ae);if(n){let c=JSON.parse(n),r=Date.now();for(let[u,h]of Object.entries(c))r<h&&t.add(u)}}catch{}return v&&t.add("mock-3"),t}let fe=s?`nyuzi_upvotes_${s}`:"nyuzi_upvotes",ue=new Set;try{let t=localStorage.getItem(fe)||localStorage.getItem("nyuzi_upvotes")||sessionStorage.getItem("nyuzi_upvotes");t&&(JSON.parse(t).forEach(n=>D.add(n)),localStorage.setItem(fe,JSON.stringify(Array.from(D))))}catch{}function Te(){try{let t=JSON.stringify(Array.from(D));localStorage.setItem(fe,t),localStorage.setItem("nyuzi_upvotes",t)}catch{}}let ne=we||"",Q=Ge||"";try{ne||(ne=localStorage.getItem("nyuzi_author_name")||""),Q||(Q=localStorage.getItem("nyuzi_author_email")||"")}catch{}function Le(t,n){t&&(ne=t),n&&(Q=n);try{t&&localStorage.setItem("nyuzi_author_name",t),n&&localStorage.setItem("nyuzi_author_email",n)}catch{}}function Ue(){return[{id:"mock-1",parentId:null,authorName:ge||"Fred Juma",authorEmail:"fredjuma8@gmail.com",content:`Welcome to our literary salon! **The Reading Circle** invites your reflections on this essay:

> "A reader lives a thousand lives before he dies. The man who never reads lives only one."

Feel free to share your thoughts, quote your favorite passages, or reply to fellow readers below.`,status:"approved",upvotes:14,createdAt:new Date(Date.now()-36e5*2).toISOString(),isAuthor:!0},{id:"mock-2",parentId:"mock-1",authorName:"Brenda Frenjo",authorEmail:"readingcircle254@gmail.com",content:`The second chapter in particular felt so poignant. The pacing and character progression really resonated with what we discussed during Sunday's book circle session!

![Mind Blown](https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif)`,status:"approved",upvotes:8,createdAt:new Date(Date.now()-36e5).toISOString(),isAuthor:!0},{id:"mock-3",parentId:null,authorName:"Amina Odhiambo",authorEmail:"amina@example.com",content:"Reading this made me pause and reflect on how we consume stories in the digital age. Check out this related discussion on [Bookish Perspectives](https://readingcircle254.com/blog)!",status:"approved",upvotes:5,createdAt:new Date(Date.now()-18e5).toISOString()}]}function Ce(){let t=window.location.hash;t&&t.startsWith("#comment-")&&setTimeout(()=>{let n=m.querySelector(t);n&&(n.scrollIntoView({behavior:"smooth",block:"center"}),n.classList.add("nyuzi-highlight"),setTimeout(()=>n.classList.remove("nyuzi-highlight"),3500))},200)}async function Ke(){if(v){w=Ue(),F=w.length,q=w.filter(t=>!t.parentId).length,re=!1,y();return}try{re=!0,ye=1,y();let t=window.location.hash,n=t&&t.startsWith("#comment-")?t.replace("#comment-",""):"",c=await be(z,s,te,1,ke,n);if(w=c.comments||[],F=c.total||(c.pagination?.totalComments??w.length),q=c.pagination?.totalTopLevel??w.filter(r=>!r.parentId).length,se=c.pagination?.hasMore??!1,v||(B=c.thread?.reactions&&typeof c.thread.reactions=="object"?{...c.thread.reactions}:{}),c.siteSettings&&typeof c.siteSettings=="object"){let r=c.siteSettings;r.accentColor&&(b.accent=r.accentColor),r.themeMode&&(b.themeMode=r.themeMode),r.bgMode&&(b.bgMode=r.bgMode),r.canvasBg!==void 0&&r.canvasBg!==""&&(b.bg=r.canvasBg),r.cardBg!==void 0&&r.cardBg!==""&&(b.cardBg=r.cardBg),r.textColor!==void 0&&r.textColor!==""&&(b.textColor=r.textColor),r.borderColor!==void 0&&r.borderColor!==""&&(b.borderColor=r.borderColor),r.radiusValue&&(b.radius=r.radiusValue),r.reactionType&&(b.reactionType=r.reactionType),r.showReactionsBar!==void 0&&(b.showReactionsBar=!!r.showReactionsBar),r.reactionsPrompt&&(b.reactionsPrompt=r.reactionsPrompt),r.reactionsPreset&&(b.reactionsPreset=r.reactionsPreset),Array.isArray(r.formattingTools)&&(b.allowedFormatting=r.formattingTools)}re=!1,y(),Ce()}catch(t){console.error("[Nyuzi] Failed to load comments:",t),re=!1,K="Unable to connect to comments server.",y()}}async function Je(){if(!(ie||!se||v))try{ie=!0,y();let t=ye+1,n=await be(z,s,te,t,ke),c=n.comments||[],r=new Set(w.map(u=>u.id));for(let u of c)r.has(u.id)||w.push(u);ye=t,se=n.pagination?.hasMore??!1,q=n.pagination?.totalTopLevel??q,F=n.pagination?.totalComments??F,ie=!1,y()}catch(t){console.error("[Nyuzi] Error loading more comments:",t),ie=!1,y()}}async function Ye(t){if(ue.has(t))return;ue.add(t);let n=D.has(t),c=n?"unvote":"upvote",r=w.find(u=>u.id===t);if(n?(D.delete(t),r&&(r.upvotes=Math.max(0,(r.upvotes||1)-1))):(D.add(t),r&&(r.upvotes=(r.upvotes||0)+1)),Te(),y(),v){ue.delete(t);return}try{let u=await Be(z,t,c);r&&typeof u.upvotes=="number"&&(r.upvotes=u.upvotes,y())}catch{n?(D.add(t),r&&(r.upvotes=(r.upvotes||0)+1)):(D.delete(t),r&&(r.upvotes=Math.max(0,(r.upvotes||1)-1))),Te(),y()}finally{ue.delete(t)}}async function Se(t,n,c,r,u=null){if(!(!t.trim()||!c.trim()))try{if(H=!0,K=null,y(),v){let A={id:`mock-${Date.now()}`,parentId:u,authorName:t.trim(),authorEmail:n,content:c.trim(),status:"approved",upvotes:0,createdAt:new Date().toISOString()};Ae(A.id),u?w.push(A):(w.unshift(A),q+=1),F+=1,J=null,H=!1,y();return}let h=await He(z,{siteId:s,threadUrl:te,threadTitle:xe,postAuthor:ge,parentId:u,authorName:t,authorEmail:n,content:c,notifyOnReply:r});h.comment&&(Ae(h.comment.id),u?w.push(h.comment):(w.unshift(h.comment),q+=1),F+=1,J=null),H=!1,y()}catch(h){K=h.message||"Failed to post comment. Please try again.",H=!1,y()}}async function We(t,n){if(n.trim())try{if(H=!0,y(),v){let r=w.find(u=>u.id===t);r&&(r.content=n.trim(),r.isEdited=!0),X=null,H=!1,y();return}await Ne(z,t,n.trim());let c=w.find(r=>r.id===t);c&&(c.content=n.trim(),c.isEdited=!0),X=null,H=!1,y()}catch(c){alert(c.message||"Failed to edit comment."),H=!1,y()}}async function Ze(t){try{if(H=!0,y(),v){w=w.filter(n=>n.id!==t&&n.parentId!==t),F=w.length,q=w.filter(n=>!n.parentId).length,$e(t),Y=null,H=!1,y();return}await _e(z,t),w=w.filter(n=>n.id!==t&&n.parentId!==t),F=w.length,q=w.filter(n=>!n.parentId).length,$e(t),Y=null,H=!1,y()}catch{alert("Failed to delete comment. Please try again."),Y=null,H=!1,y()}}function Xe(t,n){let c=t.selectionStart,r=t.selectionEnd,u=t.value,h=u.substring(c,r),A="",S=0;switch(n){case"bold":A=h?`**${h}**`:"**bold text**",S=h?A.length:2;break;case"italic":A=h?`*${h}*`:"*italic text*",S=h?A.length:1;break;case"quote":h?A=h.split(`
`).map(l=>`> ${l}`).join(`
`):A="> quote text",S=A.length;break;case"code":A=h?`\`${h}\``:"`code`",S=h?A.length:1;break;case"link":A=h?`[${h}](https://)`:"[link title](https://example.com)",S=A.length-1;break;default:return}t.value=u.substring(0,c)+A+u.substring(r),t.focus();let I=c+S;t.setSelectionRange(I,I),t.dispatchEvent(new Event("input",{bubbles:!0}))}function y(){let t=w.filter(l=>!l.parentId),n=qe(),c=b.themeMode==="auto"?n:b.themeMode||n,r=c==="light"&&n==="dark"||c==="dark"&&n==="light",u=!b.bg||b.bg==="transparent"||b.bgMode==="transparent",h=!!(r&&u&&b.themeMode!=="auto"),A={...b,resolvedTheme:c,isCardIsolated:h},S=Ie(A),I=Oe();e&&(e.setAttribute("data-theme",c),h?e.setAttribute("data-card-isolated","true"):e.removeAttribute("data-card-isolated")),m.innerHTML=`
      <style>${S}</style>
      <div class="nyuzi-container">
        ${b.showReactionsBar?je(G,b.reactionsPrompt,b.reactionsPreset,B):""}

        <!-- Header -->
        <div class="nyuzi-header">
          <h3 class="nyuzi-title">
            Discussion
            <span class="nyuzi-badge">${F}</span>
          </h3>
        </div>

        <!-- Main Form -->
        <div class="nyuzi-form">
          ${K?`<div class="nyuzi-alert">
                   <span>\u26A0\uFE0F ${T(K)}</span>
                   <button class="nyuzi-action-btn" id="dismiss-error" style="color:#b91c1c;">\u2715</button>
                 </div>`:""}

          ${pe("nyuzi-main-content",b.allowedFormatting)}
          <textarea class="nyuzi-textarea" id="nyuzi-main-content" maxlength="2000" placeholder="Share your thoughts or leave a question..." required></textarea>
          <div class="nyuzi-attached-gif-preview" id="nyuzi-main-content-gif-preview" style="display: none;"></div>
          ${we?`<div class="nyuzi-member-chip" style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:9999px;background:var(--nyuzi-accent-soft);color:var(--nyuzi-accent);font-size:0.75rem;font-weight:700;margin-bottom:8px;border:1px solid var(--nyuzi-accent-border);">
                   <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                   <span>Logged in as <strong>${T(ne)}</strong>${Q?` &bull; ${T(Q)}`:""}</span>
                 </div>`:""}

          <div class="nyuzi-form-row">
            <div class="nyuzi-inputs">
              <input type="text" class="nyuzi-input" id="nyuzi-main-name" placeholder="Name *" value="${T(ne)}" required />
              <input type="email" class="nyuzi-input" id="nyuzi-main-email" placeholder="Email (for reply alerts)" value="${T(Q)}" />
            </div>
            <button class="nyuzi-submit-btn" id="nyuzi-main-submit" ${H?"disabled":""}>
              ${H?"Posting...":"Post Comment"}
            </button>
          </div>

          <label class="nyuzi-optin" id="nyuzi-optin-wrapper">
            <input type="checkbox" id="nyuzi-main-notify" checked />
            <span>Notify me via email when someone replies</span>
          </label>
        </div>

        <!-- Comments Stream -->
        ${re?`<div class="nyuzi-skeleton">
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
                 ${t.map(l=>he(l,w,{postAuthor:ge,reactionType:b.reactionType,upvotedComments:D,activeReplyId:J,editingCommentId:X,confirmDeleteId:Y,collapsedComments:le,myComments:I,isSubmitting:H,savedAuthorName:ne,savedAuthorEmail:Q,allowedFormatting:b.allowedFormatting})).join("")}
               </div>
               ${se?`<div class="nyuzi-pagination">
                        <button class="nyuzi-load-more-btn" id="nyuzi-load-more" ${ie?"disabled":""}>
                          ${ie?'<span class="nyuzi-spinner"></span> Loading comments...':`Load more comments (${Math.max(0,q-t.length)} remaining) \u2193`}
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
    `,Qe()}function Qe(){m.querySelectorAll(".nyuzi-reaction-pill").forEach(l=>{l.addEventListener("click",async p=>{if(ce)return;let a=p.currentTarget.getAttribute("data-reaction-key");if(!a)return;ce=!0;let g=G,f;if(G===a){f="unreact",G=null,B[a]=Math.max(0,(B[a]||1)-1);try{localStorage.removeItem(de)}catch{}}else if(G){f="switch";let d=G;G=a,B[d]=Math.max(0,(B[d]||1)-1),B[a]=(B[a]||0)+1;try{localStorage.setItem(de,a)}catch{}}else{f="react",G=a,B[a]=(B[a]||0)+1;try{localStorage.setItem(de,a)}catch{}}try{localStorage.setItem(Ee,JSON.stringify(B))}catch{}if(y(),v)ce=!1;else try{let d=await Re(z,{siteId:s,threadUrl:te,threadTitle:xe,reactionKey:a,previousKey:g,action:f});d&&d.reactions&&(B={...d.reactions},y())}catch(d){console.warn("[Nyuzi] Failed to sync reaction to server:",d)}finally{ce=!1}})});async function t(l,p){let a=l.querySelector(".nyuzi-emoji-popover");if(!a)return;if(a.style.display!=="none"){a.style.display="none";return}m.querySelectorAll(".nyuzi-emoji-popover, .nyuzi-gif-popover").forEach(f=>{f.style.display="none"}),a.style.display="block";let g=a.querySelector("emoji-picker");if(g){setTimeout(()=>g.shadowRoot?.querySelector("input")?.focus(),50);return}a.innerHTML=`
        <div class="nyuzi-emoji-loading">
          <span class="nyuzi-spinner"></span>
          <span>Loading emoji library...</span>
        </div>
      `;try{if(await ve(),a.style.display==="none")return;let f=e.getAttribute("data-theme")||"dark",d=document.createElement("emoji-picker");d.className=f==="light"?"light":"dark",d.addEventListener("emoji-click",k=>{let L=k.detail?.unicode;L&&Fe(p,L)}),a.innerHTML="",a.appendChild(d),setTimeout(()=>d.shadowRoot?.querySelector("input")?.focus(),50)}catch(f){console.error("[Nyuzi] Failed to load emoji picker:",f),a.innerHTML=`
          <div class="nyuzi-emoji-loading" style="color: #ef4444;">
            <span>Failed to load emoji library.</span>
          </div>
        `}}let n=new Map;async function c(l,p){let a=l.querySelector(".nyuzi-gif-popover");if(!a)return;let g=a;if(g.style.display!=="none"){g.style.display="none";return}m.querySelectorAll(".nyuzi-emoji-popover, .nyuzi-gif-popover").forEach(j=>{j.style.display="none"}),a.style.display="block";let f=[{id:"dance_carlton",title:"Carlton Dance",tags:["dance","dancing","happy","party","celebration","groove","vibes"],url:"https://media.giphy.com/media/pa37AAGzKXoek/giphy.gif",preview:"https://media.giphy.com/media/pa37AAGzKXoek/200_d.gif"},{id:"dance_snoopy",title:"Snoopy Dance",tags:["dance","dancing","snoopy","cartoon","happy","cute","vibing"],url:"https://media.giphy.com/media/mKMGLhoD8L4yc/giphy.gif",preview:"https://media.giphy.com/media/mKMGLhoD8L4yc/200_d.gif"},{id:"dance_kid",title:"Dancing Kid",tags:["dance","dancing","kid","excited","happy","party","moves"],url:"https://media.giphy.com/media/blSTtZehjAZ8I/giphy.gif",preview:"https://media.giphy.com/media/blSTtZehjAZ8I/200_d.gif"},{id:"dance_cat",title:"Dancing Cat",tags:["dance","dancing","cat","kitten","pet","vibes","funny"],url:"https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif",preview:"https://media.giphy.com/media/JIX9t2j0ZTN9S/200_d.gif"},{id:"cheers_gatsby",title:"Gatsby Cheers",tags:["cheers","toast","drink","respect","congrats","salute","celebrate"],url:"https://media.giphy.com/media/g9582DNuQppxC/giphy.gif",preview:"https://media.giphy.com/media/g9582DNuQppxC/200_d.gif"},{id:"nod_yes",title:"Jack Nicholson Nod",tags:["yes","nod","nodding","agree","perfect","evil smile","indeed"],url:"https://media.giphy.com/media/10Jpr9KSaXLchW/giphy.gif",preview:"https://media.giphy.com/media/10Jpr9KSaXLchW/200_d.gif"},{id:"popcorn_mj",title:"Eating Popcorn",tags:["popcorn","drama","watching","waiting","reading","thriller","tea"],url:"https://media.giphy.com/media/gl0mkIZOW6Nwc/giphy.gif",preview:"https://media.giphy.com/media/gl0mkIZOW6Nwc/200_d.gif"},{id:"facepalm_picard",title:"Facepalm",tags:["facepalm","smh","disappointed","no","why","ugh","sigh"],url:"https://media.giphy.com/media/3og0INyCmHlNylks9O/giphy.gif",preview:"https://media.giphy.com/media/3og0INyCmHlNylks9O/200_d.gif"},{id:"clap_applause",title:"Clap",tags:["clap","applause","bravo","cheer","great","awesome","yes"],url:"https://media.giphy.com/media/l3q2XhfQ8oCkm1Ts4/giphy.gif",preview:"https://media.giphy.com/media/l3q2XhfQ8oCkm1Ts4/200_d.gif"},{id:"mind_blown",title:"Mind Blown",tags:["mind blown","shocked","wow","amazing","boom","galaxy","crazy"],url:"https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif",preview:"https://media.giphy.com/media/26ufdipQqU2lhNA4g/200_d.gif"},{id:"reading_book",title:"Reading Book",tags:["reading","book","read","learn","study","literature","words"],url:"https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif",preview:"https://media.giphy.com/media/3o7btPCcdNniyf0ArS/200_d.gif"},{id:"laughing_lol",title:"Laughing",tags:["laugh","laughing","lol","haha","funny","lmao","rofl"],url:"https://media.giphy.com/media/10JhviFuU2gWD6/giphy.gif",preview:"https://media.giphy.com/media/10JhviFuU2gWD6/200_d.gif"},{id:"thinking_brain",title:"Thinking",tags:["think","thinking","smart","brain","idea","clever","plan"],url:"https://media.giphy.com/media/d3mlE7uhX8KFgEmY/giphy.gif",preview:"https://media.giphy.com/media/d3mlE7uhX8KFgEmY/200_d.gif"},{id:"thumbs_up",title:"Thumbs Up",tags:["thumbs up","good","nice","ok","cool","like","approve"],url:"https://media.giphy.com/media/111ebonMs90YLu/giphy.gif",preview:"https://media.giphy.com/media/111ebonMs90YLu/200_d.gif"},{id:"love_heart",title:"Love / Heart",tags:["love","heart","wholesome","sweet","aww","lovely","care"],url:"https://media.giphy.com/media/26FLdm964upIslUZ2/giphy.gif",preview:"https://media.giphy.com/media/26FLdm964upIslUZ2/200_d.gif"},{id:"speechless_cat",title:"Speechless",tags:["speechless","confused","what","awkward","silence","stare"],url:"https://media.giphy.com/media/l0HlvtIPzPdt2usKs/giphy.gif",preview:"https://media.giphy.com/media/l0HlvtIPzPdt2usKs/200_d.gif"},{id:"celebration_party",title:"Celebration",tags:["celebration","celebrate","party","winner","victory","hurray","dance"],url:"https://media.giphy.com/media/ely3apij36BJhoZ234/giphy.gif",preview:"https://media.giphy.com/media/ely3apij36BJhoZ234/200_d.gif"},{id:"coffee_cup",title:"Coffee",tags:["coffee","tea","morning","work","cafe","warm"],url:"https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif",preview:"https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/200_d.gif"},{id:"writing_type",title:"Writing",tags:["writing","write","author","typing","keyboard","essay","draft"],url:"https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif",preview:"https://media.giphy.com/media/13HgwGsXF0aiGY/200_d.gif"},{id:"excited_jonah",title:"Excited",tags:["excited","hype","scream","omg","yes","dance","happy"],url:"https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif",preview:"https://media.giphy.com/media/5GoVLqeAOo6PK/200_d.gif"}];a.innerHTML=`
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
      `;let d=a.querySelector(".nyuzi-gif-search-input"),k=a.querySelector(".nyuzi-gif-grid");d&&setTimeout(()=>d.focus(),50);function L(j,N){if(k){if(j.length===0){k.innerHTML=`
            <div style="grid-column: 1 / -1; padding: 1.5rem; text-align: center; color: var(--nyuzi-text-muted); font-size: 0.8125rem;">
              No GIFs found for "${T(N)}"
            </div>
          `;return}k.innerHTML=j.map(M=>`
          <div class="nyuzi-gif-card" data-gif-url="${T(M.url)}" title="${T(M.title)}">
            <img src="${T(M.preview||M.url)}" alt="${T(M.title)}" loading="lazy" />
          </div>
        `).join(""),k.querySelectorAll(".nyuzi-gif-card").forEach(M=>{M.addEventListener("click",()=>{let V=M.getAttribute("data-gif-url"),me=M.getAttribute("data-gif-preview")||V||"";if(V){try{let Ve=new Image;Ve.src=V}catch{}r(l,p,V,me),g.style.display="none"}})})}}async function P(j=""){if(!k)return;let N=j.toLowerCase().trim();if(n.has(N)){L(n.get(N),j);return}k.innerHTML=`
          <div style="grid-column: 1 / -1; padding: 1.5rem; text-align: center; color: var(--nyuzi-text-muted); font-size: 0.8125rem;">
            <span class="nyuzi-spinner" style="display: inline-block; margin-bottom: 0.35rem;"></span>
            <div>Searching...</div>
          </div>
        `;let M=[];try{M=await Pe(z,j)}catch{M=[]}(!M||M.length===0)&&(M=N?f.filter(V=>V.title.toLowerCase().includes(N)||V.tags.some(me=>me.toLowerCase().includes(N)||N.includes(me.toLowerCase()))):f),n.set(N,M),L(M,j)}P("");let W=null;d&&d.addEventListener("input",()=>{clearTimeout(W),W=setTimeout(()=>{P(d.value.trim())},350)})}function r(l,p,a,g=""){p.dataset.attachedGif=a;let f=`${p.id}-gif-preview`,d=m.getElementById(f);if(!d)return;let k=g||a;d.className="nyuzi-attached-gif-preview loading",d.style.display="inline-block",d.innerHTML=`
        <img class="thumb-gif" src="${T(k)}" alt="Preview GIF" />
        <img class="full-gif" src="${T(a)}" alt="Attached GIF" />
        <span class="nyuzi-attached-gif-badge">
          <span class="nyuzi-spinner" style="width: 8px; height: 8px; border-width: 1.5px; border-color: rgba(255,255,255,0.3); border-top-color: #fff;"></span>
          <span>Attaching...</span>
        </span>
        <button type="button" class="nyuzi-attached-gif-remove" title="Remove GIF">\u2715</button>
      `;let L=d.querySelector("img.full-gif"),P=d.querySelector(".nyuzi-attached-gif-badge");function W(){d&&(d.classList.remove("loading"),d.classList.add("loaded"),P&&(P.style.opacity="0",setTimeout(()=>P.remove(),250)))}L&&(L.complete&&L.naturalWidth>0?W():(L.addEventListener("load",W,{once:!0}),L.addEventListener("error",()=>{P&&P.remove(),d.classList.remove("loading")},{once:!0})));let j=d.querySelector(".nyuzi-attached-gif-remove");j&&j.addEventListener("click",N=>{N.preventDefault(),N.stopPropagation(),delete p.dataset.attachedGif,d.className="nyuzi-attached-gif-preview",d.innerHTML="",d.style.display="none"})}m.querySelectorAll(".nyuzi-format-btn").forEach(l=>{l.getAttribute("data-action")==="emoji"&&l.addEventListener("mouseenter",ze,{once:!0}),l.addEventListener("click",p=>{p.preventDefault();let a=p.currentTarget.getAttribute("data-action"),g=p.currentTarget.closest("[data-target]"),f=g?.getAttribute("data-target");if(!a||!f)return;let d=m.getElementById(f);if(d){if(a==="emoji"){t(g,d);return}if(a==="gif"){c(g,d);return}Xe(d,a)}})}),m.querySelectorAll("textarea").forEach(l=>{l.addEventListener("focus",ze,{once:!0})});let u=m.getElementById("nyuzi-main-content"),h=m.getElementById("nyuzi-char-count");u&&h&&u.addEventListener("input",()=>{h.textContent=`${u.value.length} / 2,000`});let A=m.getElementById("dismiss-error");A&&A.addEventListener("click",()=>{K=null,y()});let S=m.getElementById("nyuzi-main-submit");S&&S.addEventListener("click",()=>{let l=m.getElementById("nyuzi-main-name"),p=m.getElementById("nyuzi-main-email"),a=m.getElementById("nyuzi-main-notify");if(!l.value.trim()){K="Please enter your name.",y();return}let g=u?u.value.trim():"",f=u?.dataset.attachedGif;if(f){g=g?`${g}

![GIF](${f})`:`![GIF](${f})`,u&&delete u.dataset.attachedGif;let L=m.getElementById("nyuzi-main-content-gif-preview");L&&(L.innerHTML="",L.style.display="none")}if(!g){K="Please write a comment or attach a GIF.",y();return}let d=l.value.trim(),k=p.value.trim()||null;Le(d,k),Se(d,k,g,a?a.checked:!0,null)});let I=m.getElementById("nyuzi-load-more");I&&I.addEventListener("click",()=>{Je()}),m.querySelectorAll(".upvote-btn").forEach(l=>{l.addEventListener("click",p=>{let a=p.currentTarget.getAttribute("data-id");a&&Ye(a)})}),m.querySelectorAll(".reply-trigger").forEach(l=>{l.addEventListener("click",p=>{let a=p.currentTarget.getAttribute("data-id");J=J===a?null:a,X=null,Y=null,y()})}),m.querySelectorAll(".cancel-reply").forEach(l=>{l.addEventListener("click",()=>{J=null,y()})}),m.querySelectorAll(".submit-reply").forEach(l=>{l.addEventListener("click",p=>{let a=p.currentTarget.getAttribute("data-parent-id");if(!a)return;let g=m.getElementById(`reply-name-${a}`),f=m.getElementById(`reply-email-${a}`),d=m.getElementById(`reply-content-${a}`);if(!g.value.trim()){alert("Please enter your name.");return}let k=d?d.value.trim():"",L=d?.dataset.attachedGif;if(L){k=k?`${k}

![GIF](${L})`:`![GIF](${L})`,d&&delete d.dataset.attachedGif;let j=m.getElementById(`reply-content-${a}-gif-preview`);j&&(j.innerHTML="",j.style.display="none")}if(!k){alert("Please write a reply or attach a GIF.");return}let P=g.value.trim(),W=f?.value.trim()||null;Le(P,W),Se(P,W,k,!0,a)})}),m.querySelectorAll(".edit-trigger").forEach(l=>{l.addEventListener("click",p=>{X=p.currentTarget.getAttribute("data-id"),J=null,Y=null,y()})}),m.querySelectorAll(".cancel-edit").forEach(l=>{l.addEventListener("click",()=>{X=null,y()})}),m.querySelectorAll(".save-edit").forEach(l=>{l.addEventListener("click",p=>{let a=p.currentTarget.getAttribute("data-id");if(!a)return;let g=m.getElementById(`edit-content-${a}`);if(!g)return;let f=g.value.trim(),d=g.dataset.attachedGif;if(d){f=f?`${f}

![GIF](${d})`:`![GIF](${d})`,delete g.dataset.attachedGif;let k=m.getElementById(`edit-content-${a}-gif-preview`);k&&(k.innerHTML="",k.style.display="none")}if(!f){alert("Comment content cannot be empty.");return}We(a,f)})}),m.querySelectorAll(".delete-trigger").forEach(l=>{l.addEventListener("click",p=>{Y=p.currentTarget.getAttribute("data-id"),J=null,X=null,y()})}),m.querySelectorAll(".nyuzi-cancel-delete-btn").forEach(l=>{l.addEventListener("click",()=>{Y=null,y()})}),m.querySelectorAll(".nyuzi-confirm-delete-btn").forEach(l=>{l.addEventListener("click",p=>{let a=p.currentTarget.getAttribute("data-id");a&&Ze(a)})}),m.querySelectorAll(".nyuzi-collapse-btn").forEach(l=>{l.addEventListener("click",p=>{let a=p.currentTarget.getAttribute("data-id");a&&(le.has(a)?le.delete(a):le.add(a),y())})}),m.querySelectorAll(".copy-link-btn").forEach(l=>{l.addEventListener("click",async p=>{let a=p.currentTarget,g=a.getAttribute("data-id");if(!g)return;let d=`${window.location.href.split("#")[0]}#comment-${g}`;try{await navigator.clipboard.writeText(d);let k=a.innerHTML;a.innerHTML="\u2713 Copied!",a.style.color="var(--nyuzi-accent)",setTimeout(()=>{a.innerHTML=k,a.style.color=""},2e3)}catch{window.location.hash=`comment-${g}`}})})}window.addEventListener("hashchange",Ce);try{let t=null,n=()=>{clearTimeout(t),t=setTimeout(()=>{y()},50)},c=new MutationObserver(r=>{for(let u of r)if(u.type==="attributes"&&(u.attributeName==="class"||u.attributeName==="data-theme"||u.attributeName==="data-color-mode"||u.attributeName==="data-bs-theme"||u.attributeName==="style")){n();break}});c.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","data-color-mode","data-bs-theme","style"]}),document.body&&c.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme","data-color-mode","data-bs-theme","style"]}),typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",n)}catch(t){console.debug("[Nyuzi] Theme observer warning:",t)}document.addEventListener("click",t=>{t.composedPath().some(r=>r?.classList?.contains("nyuzi-emoji-popover")||r?.classList?.contains("nyuzi-emoji-btn")||r?.classList?.contains("nyuzi-gif-popover")||r?.classList?.contains("nyuzi-gif-btn")||r?.tagName?.toLowerCase()==="emoji-picker")||m.querySelectorAll(".nyuzi-emoji-popover, .nyuzi-gif-popover").forEach(r=>{r.style.display="none"})}),document.addEventListener("keydown",t=>{t.key==="Escape"&&m.querySelectorAll(".nyuzi-emoji-popover, .nyuzi-gif-popover").forEach(n=>{n.style.display="none"})}),Ke()})();})();
//# sourceMappingURL=embed.js.map