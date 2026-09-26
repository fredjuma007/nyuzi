import { NyuziResponse } from "./types";

/**
 * Edge API Client for Nyuzi Commenting Widget
 */

export async function fetchCommentsApi(
  apiHost: string,
  siteId: string,
  threadUrl: string,
  page: number,
  pageSize: number,
  highlight?: string
): Promise<NyuziResponse> {
  const highlightParam = highlight ? `&highlight=${encodeURIComponent(highlight)}` : "";
  const url = `${apiHost}/api/v1/comments?siteId=${encodeURIComponent(siteId)}&threadUrl=${encodeURIComponent(threadUrl)}&page=${page}&limit=${pageSize}${highlightParam}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function submitCommentApi(
  apiHost: string,
  payload: {
    siteId: string;
    threadUrl: string;
    threadTitle: string;
    postAuthor: string;
    parentId: string | null;
    authorName: string;
    authorEmail: string | null;
    content: string;
    notifyOnReply: boolean;
  }
): Promise<any> {
  const res = await fetch(`${apiHost}/api/v1/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errJson = await res.json().catch(() => ({}));
    throw new Error(errJson.error || `HTTP ${res.status}`);
  }

  return res.json();
}

export async function toggleUpvoteApi(
  apiHost: string,
  commentId: string,
  action: "upvote" | "unvote"
): Promise<{ upvotes: number }> {
  const res = await fetch(`${apiHost}/api/v1/comments/${encodeURIComponent(commentId)}/upvote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action }),
  });

  if (!res.ok) throw new Error("Vote action failed");
  return res.json();
}

export async function editCommentApi(
  apiHost: string,
  commentId: string,
  content: string
): Promise<{ success: boolean; commentId: string; content: string }> {
  const res = await fetch(`${apiHost}/api/v1/comments/${encodeURIComponent(commentId)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    const errJson = await res.json().catch(() => ({}));
    throw new Error(errJson.error || `HTTP ${res.status}`);
  }

  return res.json();
}

export async function deleteCommentApi(
  apiHost: string,
  commentId: string
): Promise<{ success: boolean; commentId: string }> {
  const res = await fetch(`${apiHost}/api/v1/comments/${encodeURIComponent(commentId)}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Delete action failed");
  return res.json();
}
