"use strict";(()=>{(function(){let b=document.currentScript,k=b?.getAttribute("data-site-id")||document.querySelector("[data-nyuzi-site-id]")?.getAttribute("data-nyuzi-site-id")||"",x=b?.getAttribute("data-api")||"https://nyuzi-api.fredjuma8.workers.dev",L=b?.getAttribute("data-accent-color")||"#6366f1",z=document.getElementById("nyuzi-comments");if(z||(z=document.querySelector("nyuzi-comments")),!z){console.warn("[Nyuzi] No container found (#nyuzi-comments or <nyuzi-comments>).");return}let a=z.attachShadow({mode:"open"}),$=b?.getAttribute("data-thread-url")||z.getAttribute("data-thread-url")||window.location.href.split("#")[0],S=document.title||"Discussion",m=[],w=0,v=!0,d=null,g=null,y=!1,c=new Set;try{let e=sessionStorage.getItem("nyuzi_upvotes");e&&JSON.parse(e).forEach(t=>c.add(t))}catch{}function f(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function I(e){let t=e.trim().split(/\s+/);return t.length===1?t[0].slice(0,2).toUpperCase():(t[0][0]+t[t.length-1][0]).toUpperCase()}function N(e){try{let t=new Date(e),n=Math.floor((new Date().getTime()-t.getTime())/1e3);return n<60?"just now":n<3600?`${Math.floor(n/60)}m ago`:n<86400?`${Math.floor(n/3600)}h ago`:n<604800?`${Math.floor(n/86400)}d ago`:t.toLocaleDateString(void 0,{month:"short",day:"numeric"})}catch{return"recently"}}let A=`
    :host {
      --nyuzi-accent: ${L};
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
    .nyuzi-action-btn.upvoted {
      color: var(--nyuzi-accent);
      font-weight: 700;
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
  `;function E(){let e=window.location.hash;e&&e.startsWith("#comment-")&&setTimeout(()=>{let t=a.querySelector(e);t&&(t.scrollIntoView({behavior:"smooth",block:"center"}),t.classList.add("nyuzi-highlight"),setTimeout(()=>t.classList.remove("nyuzi-highlight"),3e3))},200)}async function H(){try{v=!0,o();let e=`${x}/api/v1/comments?siteId=${encodeURIComponent(k)}&threadUrl=${encodeURIComponent($)}`,t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status}`);let s=await t.json();m=s.comments||[],w=s.total||m.length,v=!1,o(),E()}catch(e){console.error("[Nyuzi] Failed to load comments:",e),v=!1,d="Unable to connect to comments server.",o()}}async function M(e){let t=c.has(e),s=t?"unvote":"upvote",n=m.find(u=>u.id===e);t?(c.delete(e),n&&(n.upvotes=Math.max(0,(n.upvotes||1)-1))):(c.add(e),n&&(n.upvotes=(n.upvotes||0)+1));try{sessionStorage.setItem("nyuzi_upvotes",JSON.stringify(Array.from(c)))}catch{}o();try{let u=await fetch(`${x}/api/v1/comments/${encodeURIComponent(e)}/upvote`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:s})});if(!u.ok)throw new Error("Vote action failed");let i=await u.json();n&&typeof i.upvotes=="number"&&(n.upvotes=i.upvotes,o())}catch{t?(c.add(e),n&&(n.upvotes=(n.upvotes||0)+1)):(c.delete(e),n&&(n.upvotes=Math.max(0,(n.upvotes||1)-1)));try{sessionStorage.setItem("nyuzi_upvotes",JSON.stringify(Array.from(c)))}catch{}o()}}async function T(e,t,s,n,u=null){if(!(!e.trim()||!s.trim()))try{y=!0,d=null,o();let i=await fetch(`${x}/api/v1/comments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({siteId:k,threadUrl:$,threadTitle:S,parentId:u,authorName:e,authorEmail:t,content:s,notifyOnReply:n})});if(!i.ok){let r=await i.json().catch(()=>({}));throw new Error(r.error||`HTTP ${i.status}`)}let l=await i.json();l.comment&&(m.push(l.comment),w+=1,g=null),y=!1,o()}catch(i){d=i.message||"Failed to post comment. Please try again.",y=!1,o()}}function C(e){let t=m.filter(u=>u.parentId===e.id),s=g===e.id,n=c.has(e.id);return`
      <div class="nyuzi-comment" id="comment-${e.id}">
        <div class="nyuzi-avatar">${f(I(e.authorName))}</div>
        <div class="nyuzi-body">
          <div class="nyuzi-meta">
            <span class="nyuzi-author">${f(e.authorName)}</span>
            <span class="nyuzi-time">${N(e.createdAt)}</span>
          </div>
          <div class="nyuzi-content">${f(e.content)}</div>
          <div class="nyuzi-actions">
            <button class="nyuzi-action-btn upvote-btn ${n?"upvoted":""}" data-id="${e.id}">
              \u25B2 ${e.upvotes>0?e.upvotes:"Upvote"}
            </button>
            <button class="nyuzi-action-btn reply-trigger" data-id="${e.id}">
              \u{1F4AC} Reply
            </button>
            <button class="nyuzi-action-btn copy-link-btn" data-id="${e.id}" title="Copy direct link to this comment">
              \u{1F517} Copy Link
            </button>
          </div>

          ${s?`
              <div class="nyuzi-reply-box">
                <textarea class="nyuzi-textarea" id="reply-content-${e.id}" placeholder="Reply to ${f(e.authorName)}..." required></textarea>
                <div class="nyuzi-form-row">
                  <div class="nyuzi-inputs">
                    <input type="text" class="nyuzi-input" id="reply-name-${e.id}" placeholder="Your Name *" required />
                  </div>
                  <div style="display:flex; gap:0.5rem;">
                    <button class="nyuzi-action-btn cancel-reply" style="padding: 0.5rem 0.75rem;">Cancel</button>
                    <button class="nyuzi-submit-btn submit-reply" data-parent-id="${e.id}" ${y?"disabled":""}>
                      ${y?"Posting...":"Reply"}
                    </button>
                  </div>
                </div>
              </div>
            `:""}

          ${t.length>0?`
            <div class="nyuzi-replies">
              ${t.map(u=>C(u)).join("")}
            </div>
          `:""}
        </div>
      </div>
    `}function o(){let e=m.filter(i=>!i.parentId);a.innerHTML=`
      <style>${A}</style>
      <div class="nyuzi-container">
        <!-- Header -->
        <div class="nyuzi-header">
          <h3 class="nyuzi-title">
            Discussion
            <span class="nyuzi-badge">${w}</span>
          </h3>
        </div>

        <!-- Main Comment Form -->
        <div class="nyuzi-form">
          ${d?`<div class="nyuzi-alert">
                   <span>\xE2\u0161\xA0\xEF\xB8\x8F ${f(d)}</span>
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
            <button class="nyuzi-submit-btn" id="nyuzi-main-submit" ${y?"disabled":""}>
              ${y?"Posting...":"Post Comment"}
            </button>
          </div>

          <label class="nyuzi-optin" id="nyuzi-optin-wrapper">
            <input type="checkbox" id="nyuzi-main-notify" checked />
            <span>Notify me via email when someone replies</span>
          </label>
        </div>

        <!-- Comments List -->
        ${v?`<div class="nyuzi-skeleton">
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
                 ${e.map(i=>C(i)).join("")}
               </div>`}

        <!-- Footer -->
        <div class="nyuzi-footer">
          <a href="https://github.com/fredjuma007/nyuzi" target="_blank" rel="noreferrer" class="nyuzi-brand">
            Powered by <strong>Nyuzi</strong>
          </a>
        </div>
      </div>
    `;let t=a.getElementById("nyuzi-main-content"),s=a.getElementById("nyuzi-char-count");t&&s&&t.addEventListener("input",()=>{s.textContent=`${t.value.length} / 2,000`});let n=a.getElementById("dismiss-error");n&&n.addEventListener("click",()=>{d=null,o()});let u=a.getElementById("nyuzi-main-submit");u&&u.addEventListener("click",()=>{let i=a.getElementById("nyuzi-main-name"),l=a.getElementById("nyuzi-main-email"),r=a.getElementById("nyuzi-main-notify");if(!i.value.trim()){d="Please enter your name.",o();return}if(!t||!t.value.trim()){d="Comment content cannot be empty.",o();return}T(i.value.trim(),l.value.trim()||null,t.value.trim(),r?r.checked:!0,null)}),a.querySelectorAll(".upvote-btn").forEach(i=>{i.addEventListener("click",l=>{let r=l.currentTarget.getAttribute("data-id");r&&M(r)})}),a.querySelectorAll(".reply-trigger").forEach(i=>{i.addEventListener("click",l=>{let r=l.currentTarget.getAttribute("data-id");g=g===r?null:r,o()})}),a.querySelectorAll(".cancel-reply").forEach(i=>{i.addEventListener("click",()=>{g=null,o()})}),a.querySelectorAll(".submit-reply").forEach(i=>{i.addEventListener("click",l=>{let r=l.currentTarget.getAttribute("data-parent-id");if(!r)return;let p=a.getElementById(`reply-name-${r}`),h=a.getElementById(`reply-content-${r}`);if(!p.value.trim()){alert("Please enter your name.");return}if(!h||!h.value.trim()){alert("Reply content cannot be empty.");return}T(p.value.trim(),null,h.value.trim(),!0,r)})}),a.querySelectorAll(".copy-link-btn").forEach(i=>{i.addEventListener("click",async l=>{let r=l.currentTarget,p=r.getAttribute("data-id");if(!p)return;let j=`${window.location.href.split("#")[0]}#comment-${p}`;try{await navigator.clipboard.writeText(j);let U=r.innerHTML;r.innerHTML="\u2713 Copied!",r.style.color="var(--nyuzi-accent)",setTimeout(()=>{r.innerHTML=U,r.style.color=""},2e3)}catch{window.location.hash=`comment-${p}`}})})}window.addEventListener("hashchange",E),H()})();})();
//# sourceMappingURL=embed.js.map