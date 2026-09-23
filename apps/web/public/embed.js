"use strict";(()=>{(function(){let z=document.currentScript,g=z?.getAttribute("data-site-id")||document.querySelector("[data-nyuzi-site-id]")?.getAttribute("data-nyuzi-site-id")||"",v=z?.getAttribute("data-api")||"http://127.0.0.1:8787",$=z?.getAttribute("data-accent-color")||"#6366f1",m=document.getElementById("nyuzi-comments");if(m||(m=document.querySelector("nyuzi-comments")),!m){console.warn("[Nyuzi] No container found (#nyuzi-comments or <nyuzi-comments>).");return}g||console.warn("[Nyuzi] Missing siteId. Set data-site-id='...' on script tag.");let a=m.attachShadow({mode:"open"}),h=window.location.href.split("#")[0],E=document.title||"Discussion",l=[],f=0,y=!0,b=null,d=null,s=!1;function p(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function I(e){let n=e.trim().split(/\s+/);return n.length===1?n[0].slice(0,2).toUpperCase():(n[0][0]+n[n.length-1][0]).toUpperCase()}function T(e){try{let n=new Date(e),i=Math.floor((new Date().getTime()-n.getTime())/1e3);return i<60?"just now":i<3600?`${Math.floor(i/60)}m ago`:i<86400?`${Math.floor(i/3600)}h ago`:i<604800?`${Math.floor(i/86400)}d ago`:n.toLocaleDateString(void 0,{month:"short",day:"numeric"})}catch{return"recently"}}let k=`
    :host {
      --nyuzi-accent: ${$};
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
      padding: 1rem 0;
    }

    /* Header */
    .nyuzi-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
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
      padding: 0.15rem 0.5rem;
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
      transition: border-color 0.2s;
    }
    .nyuzi-form:focus-within {
      border-color: var(--nyuzi-accent);
    }
    .nyuzi-textarea {
      width: 100%;
      min-height: 80px;
      padding: 0.75rem;
      border: 1px solid var(--nyuzi-border);
      border-radius: 0.5rem;
      background: var(--nyuzi-input-bg);
      color: var(--nyuzi-text-primary);
      font-family: inherit;
      font-size: 0.9375rem;
      resize: vertical;
      outline: none;
      transition: border-color 0.15s;
    }
    .nyuzi-textarea:focus {
      border-color: var(--nyuzi-accent);
      background: var(--nyuzi-card-bg);
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
      min-width: 250px;
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
    .nyuzi-submit-btn {
      background: var(--nyuzi-accent);
      color: #ffffff;
      border: none;
      padding: 0.55rem 1.25rem;
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
    .nyuzi-submit-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
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
      gap: 0.75rem;
      margin-top: 0.4rem;
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
      gap: 0.25rem;
      transition: color 0.15s;
    }
    .nyuzi-action-btn:hover {
      color: var(--nyuzi-accent);
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
      padding: 0.75rem;
      background: var(--nyuzi-input-bg);
      border: 1px solid var(--nyuzi-border);
      border-radius: 0.5rem;
    }

    /* Empty state */
    .nyuzi-empty {
      text-align: center;
      padding: 2.5rem 1rem;
      color: var(--nyuzi-text-muted);
    }

    /* Loading state */
    .nyuzi-loading {
      text-align: center;
      padding: 2rem 0;
      color: var(--nyuzi-text-muted);
      font-size: 0.875rem;
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
      gap: 0.25rem;
      transition: color 0.15s;
    }
    .nyuzi-brand:hover {
      color: var(--nyuzi-accent);
    }
    .nyuzi-brand strong {
      font-weight: 600;
      color: var(--nyuzi-text-secondary);
    }
    .nyuzi-brand:hover strong {
      color: var(--nyuzi-accent);
    }
  `;async function N(){try{y=!0,o();let e=`${v}/api/v1/comments?siteId=${encodeURIComponent(g)}&threadUrl=${encodeURIComponent(h)}`,n=await fetch(e);if(!n.ok)throw new Error(`HTTP ${n.status}`);let t=await n.json();l=t.comments||[],f=t.total||l.length,y=!1,o()}catch(e){console.error("[Nyuzi] Failed to load comments:",e),y=!1,b="Unable to load comments. Please check your connection.",o()}}async function x(e,n,t,i=null){if(!(!e.trim()||!t.trim()))try{s=!0,o();let r=await fetch(`${v}/api/v1/comments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({siteId:g,threadUrl:h,threadTitle:E,parentId:i,authorName:e,authorEmail:n,content:t})});if(!r.ok){let c=await r.json().catch(()=>({}));throw new Error(c.error||`HTTP ${r.status}`)}let u=await r.json();u.comment&&(l.push(u.comment),f+=1,d=null),s=!1,o()}catch(r){alert("Error posting comment: "+(r.message||"Please try again")),s=!1,o()}}function w(e){let n=l.filter(i=>i.parentId===e.id),t=d===e.id;return`
      <div class="nyuzi-comment" id="comment-${e.id}">
        <div class="nyuzi-avatar">${p(I(e.authorName))}</div>
        <div class="nyuzi-body">
          <div class="nyuzi-meta">
            <span class="nyuzi-author">${p(e.authorName)}</span>
            <span class="nyuzi-time">${T(e.createdAt)}</span>
          </div>
          <div class="nyuzi-content">${p(e.content)}</div>
          <div class="nyuzi-actions">
            <button class="nyuzi-action-btn reply-trigger" data-id="${e.id}">
              \xF0\u0178\u2019\xAC Reply
            </button>
          </div>

          ${t?`
              <div class="nyuzi-reply-box">
                <textarea class="nyuzi-textarea" id="reply-content-${e.id}" placeholder="Reply to ${p(e.authorName)}..." required></textarea>
                <div class="nyuzi-form-row">
                  <div class="nyuzi-inputs">
                    <input type="text" class="nyuzi-input" id="reply-name-${e.id}" placeholder="Your Name" required />
                  </div>
                  <div style="display:flex; gap:0.5rem;">
                    <button class="nyuzi-action-btn cancel-reply" style="padding: 0.5rem 0.75rem;">Cancel</button>
                    <button class="nyuzi-submit-btn submit-reply" data-parent-id="${e.id}" ${s?"disabled":""}>
                      ${s?"Posting...":"Reply"}
                    </button>
                  </div>
                </div>
              </div>
            `:""}

          ${n.length>0?`
            <div class="nyuzi-replies">
              ${n.map(i=>w(i)).join("")}
            </div>
          `:""}
        </div>
      </div>
    `}function o(){let e=l.filter(t=>!t.parentId);a.innerHTML=`
      <style>${k}</style>
      <div class="nyuzi-container">
        <!-- Header -->
        <div class="nyuzi-header">
          <h3 class="nyuzi-title">
            Discussion
            <span class="nyuzi-badge">${f}</span>
          </h3>
        </div>

        <!-- Main Comment Form -->
        <div class="nyuzi-form">
          <textarea class="nyuzi-textarea" id="nyuzi-main-content" placeholder="Share your thoughts or leave a question..." required></textarea>
          <div class="nyuzi-form-row">
            <div class="nyuzi-inputs">
              <input type="text" class="nyuzi-input" id="nyuzi-main-name" placeholder="Name *" required />
              <input type="email" class="nyuzi-input" id="nyuzi-main-email" placeholder="Email (private)" />
            </div>
            <button class="nyuzi-submit-btn" id="nyuzi-main-submit" ${s?"disabled":""}>
              ${s?"Posting...":"Post Comment"}
            </button>
          </div>
        </div>

        <!-- Comments List -->
        ${y?'<div class="nyuzi-loading">Loading discussion...</div>':b?`<div class="nyuzi-empty" style="color:#ef4444;">${b}</div>`:e.length===0?`<div class="nyuzi-empty">
                 <p style="font-size:1.1rem; margin:0 0 0.25rem 0; font-weight:600; color:var(--nyuzi-text-primary);">No comments yet</p>
                 <p style="margin:0; font-size:0.875rem;">Be the first to share your thoughts!</p>
               </div>`:`<div class="nyuzi-list">
                 ${e.map(t=>w(t)).join("")}
               </div>`}

        <!-- Footer -->
        <div class="nyuzi-footer">
          <a href="https://github.com/fredjuma007/nyuzi" target="_blank" rel="noreferrer" class="nyuzi-brand">
            Powered by <strong>Nyuzi</strong>
          </a>
        </div>
      </div>
    `;let n=a.getElementById("nyuzi-main-submit");n&&n.addEventListener("click",()=>{let t=a.getElementById("nyuzi-main-name"),i=a.getElementById("nyuzi-main-email"),r=a.getElementById("nyuzi-main-content");if(!t.value.trim()){t.focus();return}if(!r.value.trim()){r.focus();return}x(t.value.trim(),i.value.trim()||null,r.value.trim(),null)}),a.querySelectorAll(".reply-trigger").forEach(t=>{t.addEventListener("click",i=>{let r=i.currentTarget.getAttribute("data-id");d=d===r?null:r,o()})}),a.querySelectorAll(".cancel-reply").forEach(t=>{t.addEventListener("click",()=>{d=null,o()})}),a.querySelectorAll(".submit-reply").forEach(t=>{t.addEventListener("click",i=>{let r=i.currentTarget.getAttribute("data-parent-id");if(!r)return;let u=a.getElementById(`reply-name-${r}`),c=a.getElementById(`reply-content-${r}`);if(!u.value.trim()){u.focus();return}if(!c.value.trim()){c.focus();return}x(u.value.trim(),null,c.value.trim(),r)})})}N()})();})();
//# sourceMappingURL=embed.js.map