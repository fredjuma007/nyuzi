"use strict";(()=>{(function(){let f=document.currentScript,c=document.getElementById("nyuzi-comments");if(c||(c=document.querySelector("nyuzi-comments")),!c){console.warn("[Nyuzi] No container found (#nyuzi-comments or <nyuzi-comments>).");return}let w=f?.getAttribute("data-site-id")||c.getAttribute("data-site-id")||document.querySelector("[data-nyuzi-site-id]")?.getAttribute("data-nyuzi-site-id")||"",x=f?.getAttribute("data-api")||c.getAttribute("data-api")||"https://nyuzi-api.fredjuma8.workers.dev",A=f?.getAttribute("data-accent-color")||c.getAttribute("data-accent-color")||"#6366f1",$=f?.getAttribute("data-reaction")||c.getAttribute("data-reaction")||"heart",o=c.shadowRoot||c.attachShadow({mode:"open"});o.innerHTML="";let E=f?.getAttribute("data-thread-url")||c.getAttribute("data-thread-url")||window.location.href.split("#")[0],I=document.title||"Discussion",p=[],k=0,b=!0,y=null,z=null,m=!1,d=new Set;try{let e=sessionStorage.getItem("nyuzi_upvotes");e&&JSON.parse(e).forEach(t=>d.add(t))}catch{}function v(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function S(e){let t=e.trim().split(/\s+/);return t.length===1?t[0].slice(0,2).toUpperCase():(t[0][0]+t[t.length-1][0]).toUpperCase()}function M(e){try{let t=new Date(e),n=Math.floor((new Date().getTime()-t.getTime())/1e3);return n<60?"just now":n<3600?`${Math.floor(n/60)}m ago`:n<86400?`${Math.floor(n/3600)}h ago`:n<604800?`${Math.floor(n/86400)}d ago`:t.toLocaleDateString(void 0,{month:"short",day:"numeric"})}catch{return"recently"}}function H(e){return $==="upvote"?'<span style="font-size:0.75rem;">\u25B2</span>':`<svg class="nyuzi-heart-icon" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="${e?"currentColor":"none"}" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>`}function N(){return'<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>'}function j(){return'<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'}let R=`
    :host {
      --nyuzi-accent: ${A};
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
  `;function T(){let e=window.location.hash;e&&e.startsWith("#comment-")&&setTimeout(()=>{let t=o.querySelector(e);t&&(t.scrollIntoView({behavior:"smooth",block:"center"}),t.classList.add("nyuzi-highlight"),setTimeout(()=>t.classList.remove("nyuzi-highlight"),3e3))},200)}async function U(){try{b=!0,a();let e=`${x}/api/v1/comments?siteId=${encodeURIComponent(w)}&threadUrl=${encodeURIComponent(E)}`,t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status}`);let s=await t.json();p=s.comments||[],k=s.total||p.length,b=!1,a(),T()}catch(e){console.error("[Nyuzi] Failed to load comments:",e),b=!1,y="Unable to connect to comments server.",a()}}async function B(e){let t=d.has(e),s=t?"unvote":"upvote",n=p.find(l=>l.id===e);t?(d.delete(e),n&&(n.upvotes=Math.max(0,(n.upvotes||1)-1))):(d.add(e),n&&(n.upvotes=(n.upvotes||0)+1));try{sessionStorage.setItem("nyuzi_upvotes",JSON.stringify(Array.from(d)))}catch{}a();try{let l=await fetch(`${x}/api/v1/comments/${encodeURIComponent(e)}/upvote`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:s})});if(!l.ok)throw new Error("Vote action failed");let i=await l.json();n&&typeof i.upvotes=="number"&&(n.upvotes=i.upvotes,a())}catch{t?(d.add(e),n&&(n.upvotes=(n.upvotes||0)+1)):(d.delete(e),n&&(n.upvotes=Math.max(0,(n.upvotes||1)-1)));try{sessionStorage.setItem("nyuzi_upvotes",JSON.stringify(Array.from(d)))}catch{}a()}}async function C(e,t,s,n,l=null){if(!(!e.trim()||!s.trim()))try{m=!0,y=null,a();let i=await fetch(`${x}/api/v1/comments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({siteId:w,threadUrl:E,threadTitle:I,parentId:l,authorName:e,authorEmail:t,content:s,notifyOnReply:n})});if(!i.ok){let r=await i.json().catch(()=>({}));throw new Error(r.error||`HTTP ${i.status}`)}let u=await i.json();u.comment&&(p.push(u.comment),k+=1,z=null),m=!1,a()}catch(i){y=i.message||"Failed to post comment. Please try again.",m=!1,a()}}function L(e){let t=p.filter(l=>l.parentId===e.id),s=z===e.id,n=d.has(e.id);return`
      <div class="nyuzi-comment" id="comment-${e.id}">
        <div class="nyuzi-avatar">${v(S(e.authorName))}</div>
        <div class="nyuzi-body">
          <div class="nyuzi-meta">
            <span class="nyuzi-author">${v(e.authorName)}</span>
            <span class="nyuzi-time">${M(e.createdAt)}</span>
          </div>
          <div class="nyuzi-content">${v(e.content)}</div>
          <div class="nyuzi-actions">
            <button class="nyuzi-action-btn upvote-btn ${n?"upvoted":""}" data-id="${e.id}" title="${n?"Unlike":"Like"}">
              ${H(n)}
              <span>${e.upvotes>0?e.upvotes:$==="heart"?"Like":"Upvote"}</span>
            </button>
            <button class="nyuzi-action-btn reply-trigger" data-id="${e.id}">
              ${N()}
              <span>Reply</span>
            </button>
            <button class="nyuzi-action-btn copy-link-btn" data-id="${e.id}" title="Copy direct link to this comment">
              ${j()}
              <span>Copy Link</span>
            </button>
          </div>

          ${s?`
              <div class="nyuzi-reply-box">
                <textarea class="nyuzi-textarea" id="reply-content-${e.id}" placeholder="Reply to ${v(e.authorName)}..." required></textarea>
                <div class="nyuzi-form-row">
                  <div class="nyuzi-inputs">
                    <input type="text" class="nyuzi-input" id="reply-name-${e.id}" placeholder="Your Name *" required />
                  </div>
                  <div style="display:flex; gap:0.5rem;">
                    <button class="nyuzi-action-btn cancel-reply" style="padding: 0.5rem 0.75rem;">Cancel</button>
                    <button class="nyuzi-submit-btn submit-reply" data-parent-id="${e.id}" ${m?"disabled":""}>
                      ${m?"Posting...":"Reply"}
                    </button>
                  </div>
                </div>
              </div>
            `:""}

          ${t.length>0?`
            <div class="nyuzi-replies">
              ${t.map(l=>L(l)).join("")}
            </div>
          `:""}
        </div>
      </div>
    `}function a(){let e=p.filter(i=>!i.parentId);o.innerHTML=`
      <style>${R}</style>
      <div class="nyuzi-container">
        <!-- Header -->
        <div class="nyuzi-header">
          <h3 class="nyuzi-title">
            Discussion
            <span class="nyuzi-badge">${k}</span>
          </h3>
        </div>

        <!-- Main Comment Form -->
        <div class="nyuzi-form">
          ${y?`<div class="nyuzi-alert">
                   <span>\xE2\u0161\xA0\xEF\xB8\x8F ${v(y)}</span>
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
            <button class="nyuzi-submit-btn" id="nyuzi-main-submit" ${m?"disabled":""}>
              ${m?"Posting...":"Post Comment"}
            </button>
          </div>

          <label class="nyuzi-optin" id="nyuzi-optin-wrapper">
            <input type="checkbox" id="nyuzi-main-notify" checked />
            <span>Notify me via email when someone replies</span>
          </label>
        </div>

        <!-- Comments List -->
        ${b?`<div class="nyuzi-skeleton">
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
                 ${e.map(i=>L(i)).join("")}
               </div>`}

        <!-- Footer -->
        <div class="nyuzi-footer">
          <a href="https://github.com/fredjuma007/nyuzi" target="_blank" rel="noreferrer" class="nyuzi-brand">
            Powered by <strong>Nyuzi</strong>
          </a>
        </div>
      </div>
    `;let t=o.getElementById("nyuzi-main-content"),s=o.getElementById("nyuzi-char-count");t&&s&&t.addEventListener("input",()=>{s.textContent=`${t.value.length} / 2,000`});let n=o.getElementById("dismiss-error");n&&n.addEventListener("click",()=>{y=null,a()});let l=o.getElementById("nyuzi-main-submit");l&&l.addEventListener("click",()=>{let i=o.getElementById("nyuzi-main-name"),u=o.getElementById("nyuzi-main-email"),r=o.getElementById("nyuzi-main-notify");if(!i.value.trim()){y="Please enter your name.",a();return}if(!t||!t.value.trim()){y="Comment content cannot be empty.",a();return}C(i.value.trim(),u.value.trim()||null,t.value.trim(),r?r.checked:!0,null)}),o.querySelectorAll(".upvote-btn").forEach(i=>{i.addEventListener("click",u=>{let r=u.currentTarget.getAttribute("data-id");r&&B(r)})}),o.querySelectorAll(".reply-trigger").forEach(i=>{i.addEventListener("click",u=>{let r=u.currentTarget.getAttribute("data-id");z=z===r?null:r,a()})}),o.querySelectorAll(".cancel-reply").forEach(i=>{i.addEventListener("click",()=>{z=null,a()})}),o.querySelectorAll(".submit-reply").forEach(i=>{i.addEventListener("click",u=>{let r=u.currentTarget.getAttribute("data-parent-id");if(!r)return;let g=o.getElementById(`reply-name-${r}`),h=o.getElementById(`reply-content-${r}`);if(!g.value.trim()){alert("Please enter your name.");return}if(!h||!h.value.trim()){alert("Reply content cannot be empty.");return}C(g.value.trim(),null,h.value.trim(),!0,r)})}),o.querySelectorAll(".copy-link-btn").forEach(i=>{i.addEventListener("click",async u=>{let r=u.currentTarget,g=r.getAttribute("data-id");if(!g)return;let q=`${window.location.href.split("#")[0]}#comment-${g}`;try{await navigator.clipboard.writeText(q);let P=r.innerHTML;r.innerHTML="\u2713 Copied!",r.style.color="var(--nyuzi-accent)",setTimeout(()=>{r.innerHTML=P,r.style.color=""},2e3)}catch{window.location.hash=`comment-${g}`}})})}window.addEventListener("hashchange",T),U()})();})();
//# sourceMappingURL=embed.js.map