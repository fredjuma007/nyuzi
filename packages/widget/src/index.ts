/**
 * Nyuzi Embed Widget Loader
 * Ultra-lightweight comment embed script (<15KB)
 */
(function () {
  console.log("[Nyuzi] Embed widget initialized");
  
  const scriptTag = document.currentScript as HTMLScriptElement | null;
  const siteId = scriptTag?.getAttribute("data-site-id") || "";
  
  // Find container
  const container = document.getElementById("nyuzi-comments");
  if (container) {
    container.innerHTML = `
      <div style="font-family: system-ui, -apple-system, sans-serif; padding: 1.5rem; border: 1px solid #e2e8f0; border-radius: 0.75rem; text-align: center; color: #64748b;">
        <p style="margin: 0; font-weight: 600; color: #1e293b;">Nyuzi Comments</p>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem;">Site ID: ${siteId || "Not specified"}</p>
      </div>
    `;
  }
})();
