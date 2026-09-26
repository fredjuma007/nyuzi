export interface CommentItem {
  id: string;
  authorName: string;
  authorEmail?: string;
  content: string;
  threadTitle: string;
  threadUrl: string;
  upvotes: number;
  createdAt: string;
  status: "approved" | "pending" | "spam" | "deleted";
}

export interface ThreadItem {
  id: string;
  title: string;
  url: string;
  commentCount: number;
  createdAt?: string;
  reactionsCount?: number;
}

export interface AuthorEntry {
  id: string;
  name: string;
  email: string;
  status: "active" | "muted";
  discussionsCount: number;
}
