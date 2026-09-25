function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export interface SendReplyEmailParams {
  apiKey: string;
  toEmail: string;
  parentAuthorName: string;
  replierName: string;
  replyContent: string;
  threadTitle: string;
  threadUrl: string;
  replyCommentId: string;
  siteName?: string;
  siteId?: string;
}

export async function sendReplyNotificationEmail(params: SendReplyEmailParams): Promise<{ success: boolean; id?: string; error?: string }> {
  const {
    apiKey,
    toEmail,
    parentAuthorName,
    replierName,
    replyContent,
    threadTitle,
    threadUrl,
    replyCommentId,
    siteName = "The Reading Circle",
    siteId,
  } = params;

  if (!apiKey || !toEmail || !toEmail.includes("@")) {
    return { success: false, error: "Missing required API key or recipient email" };
  }

  // Build clean target URL with hash anchor
  const baseUrl = threadUrl.split("#")[0];
  const jumpUrl = `${baseUrl}#comment-${replyCommentId}`;

  const safeParent = escapeHtml(parentAuthorName || "fellow reader");
  const safeReplier = escapeHtml(replierName || "Someone");
  const safeTitle = escapeHtml(threadTitle || "the article");
  const safeSnippet = escapeHtml(
    replyContent.length > 350 ? replyContent.slice(0, 350) + "..." : replyContent
  ).replace(/\n/g, "<br/>");

  const fromSender =
    siteId === "trc254"
      ? "The Reading Circle <notifications@notifications.readingcircle254.com>"
      : `${siteName} <notifications@notifications.readingcircle254.com>`;

  const subject = `${safeReplier} replied to your comment on "${safeTitle}"`;

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1e293b;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 40px 16px;">
    <tr>
      <td align="center">
        <!-- Main Container Card -->
        <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="max-width: 540px; width: 100%; background: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06); border: 1px solid #e2e8f0;">
          
          <!-- Top Accent Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #f56220 0%, #ea580c 100%); height: 5px;"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 28px 32px 18px 32px; border-bottom: 1px solid #f1f5f9;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="font-size: 17px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em;">
                      ${escapeHtml(siteName)}
                    </span>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; font-size: 11px; font-weight: 700; color: #f56220; background: #fff7ed; border: 1px solid #ffedd5; padding: 3px 8px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em;">
                      New Reply
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 28px 32px 32px 32px;">
              <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #334155;">
                Hi <strong>${safeParent}</strong>,
              </p>
              <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: #334155;">
                <strong style="color: #0f172a;">${safeReplier}</strong> just replied to your comment on <em style="color: #475569;">"${safeTitle}"</em>:
              </p>

              <!-- Quote Box -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 0 0 28px 0;">
                <tr>
                  <td style="background: #f8fafc; border-left: 3px solid #f56220; border-radius: 4px 8px 8px 4px; padding: 16px 20px;">
                    <div style="font-size: 14px; line-height: 1.6; color: #1e293b; font-style: italic;">
                      "${safeSnippet}"
                    </div>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto 12px auto;">
                <tr>
                  <td align="center" style="border-radius: 8px; background: #f56220;">
                    <a href="${jumpUrl}" target="_blank" style="display: inline-block; padding: 13px 28px; font-size: 14px; font-weight: 700; color: #ffffff; text-decoration: none; border-radius: 8px; box-shadow: 0 2px 6px rgba(245, 98, 32, 0.35);">
                      View Reply in Discussion &rarr;
                    </a>
                  </td>
                </tr>
              </table>
              <p style="text-align: center; margin: 0; font-size: 12px; color: #94a3b8;">
                Clicking opens the post and directly highlights this reply.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; background: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 12px; line-height: 1.5; color: #64748b;">
                You received this email because you opted in to reply notifications on ${escapeHtml(siteName)}.
              </p>
              <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                Powered by <strong style="color: #f56220;">NyuziYap ⚡</strong> &bull; Lightweight, Edge-Powered Comments
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const plainText = `Hi ${safeParent},

${safeReplier} just replied to your comment on "${safeTitle}":

"${replyContent}"

View the reply here:
${jumpUrl}

---
You received this email because you opted in to reply notifications on ${siteName}.
Powered by NyuziYap ⚡
  `.trim();

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromSender,
        to: [toEmail],
        subject,
        html: htmlBody,
        text: plainText,
      }),
    });

    const data: any = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error("[Nyuzi Email] Resend API error:", res.status, data);
      return { success: false, error: data.message || `HTTP ${res.status}` };
    }

    console.log("[Nyuzi Email] Notification sent successfully:", data.id);
    return { success: true, id: data.id };
  } catch (err: any) {
    console.error("[Nyuzi Email] Dispatch exception:", err);
    return { success: false, error: err.message };
  }
}

export interface SendAuthorNotificationEmailParams {
  apiKey: string;
  toEmail: string;
  authorName: string;
  commenterName: string;
  commentContent: string;
  threadTitle: string;
  threadUrl: string;
  commentId: string;
  siteName?: string;
  siteId?: string;
  isReply?: boolean;
}

export async function sendAuthorNotificationEmail(params: SendAuthorNotificationEmailParams): Promise<{ success: boolean; id?: string; error?: string }> {
  const {
    apiKey,
    toEmail,
    authorName,
    commenterName,
    commentContent,
    threadTitle,
    threadUrl,
    commentId,
    siteName = "The Reading Circle",
    siteId,
    isReply = false,
  } = params;

  if (!apiKey || !toEmail || !toEmail.includes("@")) {
    return { success: false, error: "Missing required API key or recipient email" };
  }

  const baseUrl = threadUrl.split("#")[0];
  const jumpUrl = `${baseUrl}#comment-${commentId}`;

  const safeAuthor = escapeHtml(authorName || "Author");
  const safeCommenter = escapeHtml(commenterName || "A reader");
  const safeTitle = escapeHtml(threadTitle || "your article");
  const safeSnippet = escapeHtml(
    commentContent.length > 350 ? commentContent.slice(0, 350) + "..." : commentContent
  ).replace(/\n/g, "<br/>");

  const fromSender =
    siteId === "trc254"
      ? "The Reading Circle <notifications@notifications.readingcircle254.com>"
      : `${siteName} <notifications@notifications.readingcircle254.com>`;

  const subject = isReply
    ? `New reply in discussion on "${safeTitle}"`
    : `New comment on your article "${safeTitle}"`;

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1e293b;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="max-width: 540px; width: 100%; background: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06); border: 1px solid #e2e8f0;">
          
          <!-- Top Accent Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #15803d 0%, #166534 100%); height: 5px;"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 28px 32px 18px 32px; border-bottom: 1px solid #f1f5f9;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="font-size: 17px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em;">
                      ${escapeHtml(siteName)}
                    </span>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; font-size: 11px; font-weight: 700; color: #15803d; background: #f0fdf4; border: 1px solid #dcfce7; padding: 3px 8px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em;">
                      Author Alert
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 28px 32px 32px 32px;">
              <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #334155;">
                Hi <strong>${safeAuthor}</strong>,
              </p>
              <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: #334155;">
                <strong style="color: #0f172a;">${safeCommenter}</strong> just shared a thought on your article <em style="color: #475569;">"${safeTitle}"</em>:
              </p>

              <!-- Quote Box -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 0 0 28px 0;">
                <tr>
                  <td style="background: #f8fafc; border-left: 3px solid #15803d; border-radius: 4px 8px 8px 4px; padding: 16px 20px;">
                    <div style="font-size: 14px; line-height: 1.6; color: #1e293b; font-style: italic;">
                      "${safeSnippet}"
                    </div>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto 12px auto;">
                <tr>
                  <td align="center" style="border-radius: 8px; background: #15803d;">
                    <a href="${jumpUrl}" target="_blank" style="display: inline-block; padding: 13px 28px; font-size: 14px; font-weight: 700; color: #ffffff; text-decoration: none; border-radius: 8px; box-shadow: 0 2px 6px rgba(21, 128, 61, 0.35);">
                      Read & Reply on The Reading Circle &rarr;
                    </a>
                  </td>
                </tr>
              </table>
              <p style="text-align: center; margin: 0; font-size: 12px; color: #94a3b8;">
                Clicking opens your article and highlights this comment.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; background: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 12px; line-height: 1.5; color: #64748b;">
                You received this email because you are listed as an author on ${escapeHtml(siteName)}.
              </p>
              <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                Powered by <strong style="color: #f56220;">NyuziYap ⚡</strong> &bull; Lightweight, Edge-Powered Comments
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const plainText = `Hi ${safeAuthor},

${safeCommenter} just commented on your article "${safeTitle}":

"${commentContent}"

Read and reply here:
${jumpUrl}

---
You received this email because you are an author on ${siteName}.
Powered by NyuziYap ⚡
  `.trim();

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromSender,
        to: [toEmail],
        subject,
        html: htmlBody,
        text: plainText,
      }),
    });

    const data: any = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error("[Nyuzi Author Email] Resend API error:", res.status, data);
      return { success: false, error: data.message || `HTTP ${res.status}` };
    }

    console.log("[Nyuzi Author Email] Alert sent successfully:", data.id);
    return { success: true, id: data.id };
  } catch (err: any) {
    console.error("[Nyuzi Author Email] Dispatch exception:", err);
    return { success: false, error: err.message };
  }
}

