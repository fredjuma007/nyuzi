"use strict";(()=>{(function(){let b=document.currentScript,c=document.getElementById("nyuzi-comments");if(c||(c=document.querySelector("nyuzi-comments")),!c){console.warn("[Nyuzi] No container found (#nyuzi-comments or <nyuzi-comments>).");return}let C=b?.getAttribute("data-site-id")||c.getAttribute("data-site-id")||document.querySelector("[data-nyuzi-site-id]")?.getAttribute("data-nyuzi-site-id")||"",k=b?.getAttribute("data-api")||c.getAttribute("data-api")||"https://nyuzi-api.fredjuma8.workers.dev",j=b?.getAttribute("data-accent-color")||c.getAttribute("data-accent-color")||"#6366f1",M=b?.getAttribute("data-reaction")||c.getAttribute("data-reaction")||"heart",s=c.shadowRoot||c.attachShadow({mode:"open"});s.innerHTML="";let L=b?.getAttribute("data-thread-url")||c.getAttribute("data-thread-url")||window.location.href.split("#")[0],R=document.title||"Discussion",m=[],h=0,v=0,I=1,A=15,$=!1,f=!1,E=!0,p=null,x=null,g=!1,y=new Set;try{let e=sessionStorage.getItem("nyuzi_upvotes");e&&JSON.parse(e).forEach(n=>y.add(n))}catch{}function w(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function U(e){let n=e.trim().split(/\s+/);return n.length===1?n[0].slice(0,2).toUpperCase():(n[0][0]+n[n.length-1][0]).toUpperCase()}function B(e){try{let n=new Date(e),t=Math.floor((new Date().getTime()-n.getTime())/1e3);return t<60?"just now":t<3600?`${Math.floor(t/60)}m ago`:t<86400?`${Math.floor(t/3600)}h ago`:t<604800?`${Math.floor(t/86400)}d ago`:n.toLocaleDateString(void 0,{month:"short",day:"numeric"})}catch{return"recently"}}function P(e){return M==="upvote"?'<span style="font-size:0.75rem;">\u25B2</span>':`<svg class="nyuzi-heart-icon" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="${e?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>`}function q(){return'<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>'}function F(){return'<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'}let D=`
    :host {
      --nyuzi-accent: ${j};
      --nyuzi-accent-hover: #4f46e5;
      --nyuzi-bg: transparent;
      --nyuzi-card-bg: #ffffff;
      --nyuzi-text-primary: #0f172a;
      --nyuzi-text-secondary: #64748b;
      --nyuzi-text-muted: #94a3b8;
      --nyuzi-border: #e2e8f0;
      --nyuzi-input-bg: #f8fafc;
      --nyuzi-thread-line: #e2e8f0;
      --nyuzi-avatar-bg: #e0e7ff;
      --nyuzi-avatar-text: #4338ca;
      --nyuzi-radius: 0.75rem;

      display: block;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 15px;
      line-height: 1.5;
      color: var(--nyuzi-text-primary);
      box-sizing: border-box;
      max-width: 100%;
    }

    @media (prefers-color-scheme: dark) {
      :host {
        --nyuzi-card-bg: #0f172a;
        --nyuzi-text-primary: #f8fafc;
        --nyuzi-text-secondary: #94a3b8;
        --nyuzi-text-muted: #64748b;
        --nyuzi-border: #1e293b;
        --nyuzi-input-bg: #1e293b;
        --nyuzi-thread-line: #334155;
        --nyuzi-avatar-bg: #312e81;
        --nyuzi-avatar-text: #c7d2fe;
      }
    }

    *, *::before, *::after {
      box-sizing: inherit;
    }

    .nyuzi-container {
      padding: 0.5rem 0;
    }

    /* Header */
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

    /* Form */
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
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
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
      transition: opacity 0.2s, transform 0.1s;
    }
    .nyuzi-submit-btn:hover {
      opacity: 0.92;
    }
    .nyuzi-submit-btn:active {
      transform: scale(0.98);
    }
    .nyuzi-submit-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Mobile Responsive Form (Stack Email below Name on phones) */
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
      align-items: baseline;
      gap: 0.5rem;
      margin-bottom: 0.25rem;
    }
    .nyuzi-author {
      font-weight: 600;
      color: var(--nyuzi-text-primary);
      font-size: 0.9375rem;
    }
    .nyuzi-time {
      font-size: 0.75rem;
      color: var(--nyuzi-text-muted);
    }
    .nyuzi-content {
      color: var(--nyuzi-text-primary);
      font-size: 0.9375rem;
      white-space: pre-wrap;
      word-break: break-word;
      line-height: 1.55;
    }
    .nyuzi-actions {
      display: flex;
      gap: 1rem;
      margin-top: 0.45rem;
    }
    .nyuzi-action-btn {
      background: none;
      border: none;
      color: var(--nyuzi-text-secondary);
      font-size: 0.8125rem;
      font-weight: 500;
      cursor: pointer;
      padding: 0;
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      transition: color 0.15s, transform 0.1s;
    }
    .nyuzi-action-btn:hover {
      color: var(--nyuzi-accent);
    }
    .nyuzi-action-btn svg {
      flex-shrink: 0;
      transition: transform 0.15s, stroke 0.15s, fill 0.15s;
    }
    .nyuzi-action-btn:hover svg.nyuzi-heart-icon {
      stroke: #e11d48;
      transform: scale(1.15);
    }
    .nyuzi-action-btn.upvoted {
      color: #e11d48;
      font-weight: 600;
    }
    .nyuzi-action-btn.upvoted svg.nyuzi-heart-icon {
      fill: #e11d48;
      stroke: #e11d48;
      animation: nyuzi-pop 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    @keyframes nyuzi-pop {
      0% { transform: scale(1); }
      40% { transform: scale(1.35); }
      100% { transform: scale(1); }
    }
    .nyuzi-highlight {
      animation: nyuzi-flash 2.5s ease-out;
      border-radius: var(--nyuzi-radius);
      padding: 0.25rem 0.5rem;
    }
    @keyframes nyuzi-flash {
      0%, 25% { background: rgba(99, 102, 241, 0.16); }
      100% { background: transparent; }
    }

    /* Nested Replies */
    .nyuzi-replies {
      margin-top: 1rem;
      padding-left: 1.25rem;
      border-left: 2px solid var(--nyuzi-thread-line);
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    /* Reply Form */
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
      border-color: #f56220;
      color: #f56220;
      background: var(--nyuzi-input-bg);
      transform: translateY(-1px);
      box-shadow: 0 3px 8px rgba(245, 98, 32, 0.15);
    }
    .nyuzi-load-more-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .nyuzi-spinner {
      width: 14px;
      height: 14px;
      border: 2px solid var(--nyuzi-border);
      border-top-color: #f56220;
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
  `;function S(){let e=window.location.hash;e&&e.startsWith("#comment-")&&setTimeout(()=>{let n=s.querySelector(e);n&&(n.scrollIntoView({behavior:"smooth",block:"center"}),n.classList.add("nyuzi-highlight"),setTimeout(()=>n.classList.remove("nyuzi-highlight"),3e3))},200)}async function O(){try{E=!0,I=1,l();let e=window.location.hash,n=e&&e.startsWith("#comment-")?e.replace("#comment-",""):"",u=n?`&highlight=${encodeURIComponent(n)}`:"",t=`${k}/api/v1/comments?siteId=${encodeURIComponent(C)}&threadUrl=${encodeURIComponent(L)}&page=1&limit=${A}${u}`,r=await fetch(t);if(!r.ok)throw new Error(`HTTP ${r.status}`);let o=await r.json();m=o.comments||[],h=o.total||(o.pagination?.totalComments??m.length),v=o.pagination?.totalTopLevel??m.filter(i=>!i.parentId).length,$=o.pagination?.hasMore??!1,E=!1,l(),S()}catch(e){console.error("[Nyuzi] Failed to load comments:",e),E=!1,p="Unable to connect to comments server.",l()}}async function J(){if(!(f||!$))try{f=!0,l();let e=I+1,n=`${k}/api/v1/comments?siteId=${encodeURIComponent(C)}&threadUrl=${encodeURIComponent(L)}&page=${e}&limit=${A}`,u=await fetch(n);if(!u.ok)throw new Error("Failed to load more comments");let t=await u.json(),r=t.comments||[],o=new Set(m.map(i=>i.id));for(let i of r)o.has(i.id)||m.push(i);I=e,$=t.pagination?.hasMore??!1,v=t.pagination?.totalTopLevel??v,h=t.pagination?.totalComments??h,f=!1,l()}catch(e){console.error("[Nyuzi] Error loading more comments:",e),f=!1,l()}}async function Y(e){let n=y.has(e),u=n?"unvote":"upvote",t=m.find(r=>r.id===e);n?(y.delete(e),t&&(t.upvotes=Math.max(0,(t.upvotes||1)-1))):(y.add(e),t&&(t.upvotes=(t.upvotes||0)+1));try{sessionStorage.setItem("nyuzi_upvotes",JSON.stringify(Array.from(y)))}catch{}l();try{let r=await fetch(`${k}/api/v1/comments/${encodeURIComponent(e)}/upvote`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:u})});if(!r.ok)throw new Error("Vote action failed");let o=await r.json();t&&typeof o.upvotes=="number"&&(t.upvotes=o.upvotes,l())}catch{n?(y.add(e),t&&(t.upvotes=(t.upvotes||0)+1)):(y.delete(e),t&&(t.upvotes=Math.max(0,(t.upvotes||1)-1)));try{sessionStorage.setItem("nyuzi_upvotes",JSON.stringify(Array.from(y)))}catch{}l()}}async function N(e,n,u,t,r=null){if(!(!e.trim()||!u.trim()))try{g=!0,p=null,l();let o=await fetch(`${k}/api/v1/comments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({siteId:C,threadUrl:L,threadTitle:R,parentId:r,authorName:e,authorEmail:n,content:u,notifyOnReply:t})});if(!o.ok){let d=await o.json().catch(()=>({}));throw new Error(d.error||`HTTP ${o.status}`)}let i=await o.json();i.comment&&(r?m.push(i.comment):(m.unshift(i.comment),v+=1),h+=1,x=null),g=!1,l()}catch(o){p=o.message||"Failed to post comment. Please try again.",g=!1,l()}}function H(e){let n=m.filter(r=>r.parentId===e.id);n.sort((r,o)=>new Date(r.createdAt).getTime()-new Date(o.createdAt).getTime());let u=x===e.id,t=y.has(e.id);return`
      <div class="nyuzi-comment" id="comment-${e.id}">
        <div class="nyuzi-avatar">${w(U(e.authorName))}</div>
        <div class="nyuzi-body">
          <div class="nyuzi-meta">
            <span class="nyuzi-author">${w(e.authorName)}</span>
            <span class="nyuzi-time">${B(e.createdAt)}</span>
          </div>
          <div class="nyuzi-content">${w(e.content)}</div>
          <div class="nyuzi-actions">
            <button class="nyuzi-action-btn upvote-btn ${t?"upvoted":""}" data-id="${e.id}" title="${t?"Unlike":"Like"}">
              ${P(t)}
              <span>${e.upvotes>0?e.upvotes:M==="heart"?"Like":"Upvote"}</span>
            </button>
            <button class="nyuzi-action-btn reply-trigger" data-id="${e.id}">
              ${q()}
              <span>Reply</span>
            </button>
            <button class="nyuzi-action-btn copy-link-btn" data-id="${e.id}" title="Copy direct link to this comment">
              ${F()}
              <span>Copy Link</span>
            </button>
          </div>

          ${u?`
              <div class="nyuzi-reply-box">
                <textarea class="nyuzi-textarea" id="reply-content-${e.id}" placeholder="Reply to ${w(e.authorName)}..." required></textarea>
                <div class="nyuzi-form-row">
                  <div class="nyuzi-inputs">
                    <input type="text" class="nyuzi-input" id="reply-name-${e.id}" placeholder="Your Name *" required />
                  </div>
                  <div style="display:flex; gap:0.5rem;">
                    <button class="nyuzi-action-btn cancel-reply" style="padding: 0.5rem 0.75rem;">Cancel</button>
                    <button class="nyuzi-submit-btn submit-reply" data-parent-id="${e.id}" ${g?"disabled":""}>
                      ${g?"Posting...":"Reply"}
                    </button>
                  </div>
                </div>
              </div>
            `:""}

          ${n.length>0?`
            <div class="nyuzi-replies">
              ${n.map(r=>H(r)).join("")}
            </div>
          `:""}
        </div>
      </div>
    `}function l(){let e=m.filter(i=>!i.parentId);s.innerHTML=`
      <style>${D}</style>
      <div class="nyuzi-container">
        <!-- Header -->
        <div class="nyuzi-header">
          <h3 class="nyuzi-title">
            Discussion
            <span class="nyuzi-badge">${h}</span>
          </h3>
        </div>

        <!-- Main Comment Form -->
        <div class="nyuzi-form">
          ${p?`<div class="nyuzi-alert">
                   <span>\xE2\u0161\xA0\xEF\xB8\x8F ${w(p)}</span>
                   <button class="nyuzi-action-btn" id="dismiss-error" style="color:#b91c1c;">\xE2\u0153\u2022</button>
                 </div>`:""}
          <textarea class="nyuzi-textarea" id="nyuzi-main-content" maxlength="2000" placeholder="Share your thoughts or leave a question..." required></textarea>
          <div class="nyuzi-counter-row">
            <span id="nyuzi-char-count">0 / 2,000</span>
          </div>

          <div class="nyuzi-form-row">
            <div class="nyuzi-inputs">
              <input type="text" class="nyuzi-input" id="nyuzi-main-name" placeholder="Name *" required />
              <input type="email" class="nyuzi-input" id="nyuzi-main-email" placeholder="Email (for reply alerts)" />
            </div>
            <button class="nyuzi-submit-btn" id="nyuzi-main-submit" ${g?"disabled":""}>
              ${g?"Posting...":"Post Comment"}
            </button>
          </div>

          <label class="nyuzi-optin" id="nyuzi-optin-wrapper">
            <input type="checkbox" id="nyuzi-main-notify" checked />
            <span>Notify me via email when someone replies</span>
          </label>
        </div>

        <!-- Comments List -->
        ${E?`<div class="nyuzi-skeleton">
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
                 ${e.map(i=>H(i)).join("")}
               </div>
               ${$?`<div class="nyuzi-pagination">
                        <button class="nyuzi-load-more-btn" id="nyuzi-load-more" ${f?"disabled":""}>
                          ${f?'<span class="nyuzi-spinner"></span> Loading comments...':`Load more comments (${Math.max(0,v-e.length)} remaining) \u2193`}
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
    `;let n=s.getElementById("nyuzi-main-content"),u=s.getElementById("nyuzi-char-count");n&&u&&n.addEventListener("input",()=>{u.textContent=`${n.value.length} / 2,000`});let t=s.getElementById("dismiss-error");t&&t.addEventListener("click",()=>{p=null,l()});let r=s.getElementById("nyuzi-main-submit");r&&r.addEventListener("click",()=>{let i=s.getElementById("nyuzi-main-name"),d=s.getElementById("nyuzi-main-email"),a=s.getElementById("nyuzi-main-notify");if(!i.value.trim()){p="Please enter your name.",l();return}if(!n||!n.value.trim()){p="Comment content cannot be empty.",l();return}N(i.value.trim(),d.value.trim()||null,n.value.trim(),a?a.checked:!0,null)});let o=s.getElementById("nyuzi-load-more");o&&o.addEventListener("click",()=>{J()}),s.querySelectorAll(".upvote-btn").forEach(i=>{i.addEventListener("click",d=>{let a=d.currentTarget.getAttribute("data-id");a&&Y(a)})}),s.querySelectorAll(".reply-trigger").forEach(i=>{i.addEventListener("click",d=>{let a=d.currentTarget.getAttribute("data-id");x=x===a?null:a,l()})}),s.querySelectorAll(".cancel-reply").forEach(i=>{i.addEventListener("click",()=>{x=null,l()})}),s.querySelectorAll(".submit-reply").forEach(i=>{i.addEventListener("click",d=>{let a=d.currentTarget.getAttribute("data-parent-id");if(!a)return;let z=s.getElementById(`reply-name-${a}`),T=s.getElementById(`reply-content-${a}`);if(!z.value.trim()){alert("Please enter your name.");return}if(!T||!T.value.trim()){alert("Reply content cannot be empty.");return}N(z.value.trim(),null,T.value.trim(),!0,a)})}),s.querySelectorAll(".copy-link-btn").forEach(i=>{i.addEventListener("click",async d=>{let a=d.currentTarget,z=a.getAttribute("data-id");if(!z)return;let _=`${window.location.href.split("#")[0]}#comment-${z}`;try{await navigator.clipboard.writeText(_);let G=a.innerHTML;a.innerHTML="\u2713 Copied!",a.style.color="var(--nyuzi-accent)",setTimeout(()=>{a.innerHTML=G,a.style.color=""},2e3)}catch{window.location.hash=`comment-${z}`}})})}window.addEventListener("hashchange",S),O()})();})();
//# sourceMappingURL=embed.js.map