/**
 * Core Data Models & Theme Contracts for Nyuzi Commenting Widget
 */

export interface NyuziComment {
  id: string;
  parentId: string | null;
  authorName: string;
  authorEmail?: string | null;
  content: string;
  status: string;
  upvotes: number;
  createdAt: string;
  replies?: NyuziComment[];
  isAuthor?: boolean;
  isEdited?: boolean;
}

export interface NyuziThread {
  id: string;
  url: string;
  title: string | null;
  commentCount: number;
  reactions?: Record<string, number>;
}

export interface NyuziPagination {
  page: number;
  limit: number;
  totalTopLevel: number;
  totalComments: number;
  hasMore: boolean;
}

export interface NyuziResponse {
  siteSettings?: Record<string, any>;
  thread: NyuziThread | null;
  comments: NyuziComment[];
  pagination?: NyuziPagination;
  total: number;
}

export interface ThemeConfig {
  accent: string;
  bg: string;
  cardBg?: string;
  textColor?: string;
  textSecondary?: string;
  textMuted?: string;
  borderColor?: string;
  inputBg?: string;
  radius?: string;
  reactionType: "like" | "heart" | "upvote" | "multi";
  themeMode: "auto" | "light" | "dark" | "sepia";
  bgMode: "transparent" | "card";
  showReactionsBar?: boolean;
  reactionsPrompt?: string;
  reactionsPreset?: "general" | "literary";
  allowedFormatting?: string[];
}
