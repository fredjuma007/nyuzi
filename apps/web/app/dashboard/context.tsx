"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { CommentItem, ThreadItem, AuthorEntry } from "./components/types";

export interface MetricsData {
  totalComments: number;
  totalThreads: number;
  totalUpvotes: number;
}

export interface DashboardContextType {
  selectedSite: string;
  setSelectedSite: (site: string) => void;
  metrics: MetricsData;
  commentsList: CommentItem[];
  setCommentsList: React.Dispatch<React.SetStateAction<CommentItem[]>>;
  threadsList: ThreadItem[];
  authors: AuthorEntry[];
  setAuthors: React.Dispatch<React.SetStateAction<AuthorEntry[]>>;
  loading: boolean;
  isRefreshing: boolean;
  apiStatus: "live" | "fallback" | "error";
  fetchLiveDashboard: () => Promise<void>;
  fetchAuthors: () => Promise<void>;
  handleAddAuthor: (name: string, email: string, status?: "active" | "discovered" | "muted") => Promise<void>;
  handleUpdateAuthor: (id: string, updates: Partial<AuthorEntry>) => Promise<void>;
  handleDeleteAuthor: (id: string) => Promise<void>;
  handleApprove: (id: string) => Promise<void>;
  handleFlagSpam: (id: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  handleEditComment: (id: string, newContent: string) => Promise<void>;
  showToast: (msg: string) => void;
  toast: string | null;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

const API_BASE = "https://nyuzi-api.fredjuma8.workers.dev";

function formatRelativeTime(dateInput: any): string {
  if (!dateInput) return "recently";
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return "recently";
    const now = new Date();
    const diffSec = Math.floor((now.getTime() - d.getTime()) / 1000);
    if (diffSec < 60) return "just now";
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    return `${Math.floor(diffSec / 86400)}d ago`;
  } catch {
    return "recently";
  }
}

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [selectedSite, setSelectedSite] = useState<string>("trc254");
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [apiStatus, setApiStatus] = useState<"live" | "fallback" | "error">("live");
  const [toast, setToast] = useState<string | null>(null);

  const [metrics, setMetrics] = useState<MetricsData>({
    totalComments: 0,
    totalThreads: 0,
    totalUpvotes: 0,
  });

  const [commentsList, setCommentsList] = useState<CommentItem[]>([]);
  const [threadsList, setThreadsList] = useState<ThreadItem[]>([]);

  const defaultAuthors: Record<string, AuthorEntry[]> = {
    trc254: [
      { id: "auth_trc_fred", name: "Fred Juma", email: "fredjuma8@gmail.com", status: "active", discussionsCount: 0 },
      { id: "auth_trc_brenda", name: "Brenda Frenjo", email: "readingcircle254@gmail.com", status: "active", discussionsCount: 0 },
      { id: "auth_trc_sumeiya", name: "Sumeiya Juma", email: "readingcircle254@gmail.com", status: "active", discussionsCount: 0 },
    ],
    demo: [
      { id: "demo-1", name: "Sarah Jenkins", email: "sarah@example.com", status: "active", discussionsCount: 0 },
      { id: "demo-2", name: "Alex Rivera", email: "alex@example.com", status: "active", discussionsCount: 0 },
    ],
  };

  const [authors, setAuthors] = useState<AuthorEntry[]>(defaultAuthors.trc254);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Fetch Authors dynamically from Cloudflare D1
  const fetchAuthors = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/v1/authors?siteId=${selectedSite}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.authors) && data.authors.length > 0) {
          setAuthors(data.authors);
          return;
        }
      }
    } catch (err) {
      console.warn("[Authors Sync] Failed to fetch authors from API:", err);
    }
    // Fallback to defaults if no authors yet in D1
    setAuthors(defaultAuthors[selectedSite] || defaultAuthors.trc254);
  }, [selectedSite]);

  const handleAddAuthor = async (
    name: string,
    email: string,
    status: "active" | "discovered" | "muted" = "active"
  ) => {
    try {
      const res = await fetch(`${API_BASE}/api/v1/authors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId: selectedSite, name, email, status }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.author) {
          setAuthors((prev) => [
            { ...data.author, discussionsCount: 0 },
            ...prev.filter((a) => a.id !== data.author.id),
          ]);
        }
        showToast(`Added ${name} to verified author roster`);
      } else {
        showToast("Error adding author to database");
      }
    } catch {
      showToast("Error connecting to author server");
    }
  };

  const handleUpdateAuthor = async (id: string, updates: Partial<AuthorEntry>) => {
    setAuthors((prev) => prev.map((a) => (a.id === id ? { ...a, ...updates } : a)));
    try {
      const res = await fetch(`${API_BASE}/api/v1/authors/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        showToast("Author preferences updated in D1 database");
      }
    } catch {
      showToast("Failed to sync author update with database");
    }
  };

  const handleDeleteAuthor = async (id: string) => {
    setAuthors((prev) => prev.filter((a) => a.id !== id));
    try {
      await fetch(`${API_BASE}/api/v1/authors/${id}`, {
        method: "DELETE",
      });
      showToast("Author removed from roster");
    } catch {
      showToast("Failed to remove author from database");
    }
  };

  const fetchLiveDashboard = useCallback(async () => {
    setLoading(true);
    setIsRefreshing(true);
    try {
      // Parallel fetch: dashboard summary & dynamic D1 authors
      const [dashRes] = await Promise.all([
        fetch(`${API_BASE}/api/v1/dashboard?siteId=${selectedSite}`),
        fetchAuthors(),
      ]);

      if (dashRes.ok) {
        const data = await dashRes.json();
        setApiStatus("live");
        setMetrics({
          totalComments: data.metrics?.totalComments || 0,
          totalThreads: data.metrics?.totalThreads || 0,
          totalUpvotes: data.metrics?.totalUpvotes || 0,
        });

        const rawComments = Array.isArray(data.comments)
          ? data.comments
          : Array.isArray(data.recentComments)
          ? data.recentComments
          : [];

        setCommentsList(
          rawComments.map((c: any) => ({
            id: c.id,
            authorName: c.authorName,
            authorEmail: c.authorEmail || undefined,
            content: c.content,
            threadTitle: c.threadTitle || "The Art of Thoughtful Reading",
            threadUrl: c.threadUrl || "https://www.readingcircle254.com/blog/art-of-thoughtful-reading",
            upvotes: Number(c.upvotes) || 0,
            createdAt: formatRelativeTime(c.createdAt),
            status: c.status || "approved",
          }))
        );

        if (Array.isArray(data.threads)) {
          setThreadsList(
            data.threads.map((t: any) => ({
              id: t.id,
              title: t.title || "The Art of Thoughtful Reading",
              url: t.url,
              commentCount: t.commentCount || 0,
              reactionsCount: t.reactionsCount || 0,
            }))
          );
        }
        return;
      }

      // Fallback query if dashboard summary route is unavailable
      setApiStatus("fallback");
      const fallbackUrl =
        selectedSite === "demo"
          ? "https://nyuzi-yap.vercel.app/demo"
          : "https://www.readingcircle254.com/blog/art-of-thoughtful-reading";

      const fallbackRes = await fetch(
        `${API_BASE}/api/v1/comments?siteId=${selectedSite}&threadUrl=${encodeURIComponent(fallbackUrl)}`
      );
      if (fallbackRes.ok) {
        const fbData = await fallbackRes.json();
        const rawComments = fbData.comments || [];
        const totalCount = Number(fbData.total) || rawComments.length || 0;

        const allComments: any[] = [];
        let totalUpvotes = 0;
        for (const c of rawComments) {
          allComments.push(c);
          totalUpvotes += Number(c.upvotes || 0);
          if (Array.isArray(c.replies)) {
            for (const r of c.replies) {
              allComments.push(r);
              totalUpvotes += Number(r.upvotes || 0);
            }
          }
        }

        setMetrics({
          totalComments: totalCount,
          totalThreads: totalCount > 0 ? 1 : 0,
          totalUpvotes: totalUpvotes,
        });

        if (allComments.length > 0) {
          setCommentsList(
            allComments.map((c) => ({
              id: c.id,
              authorName: c.authorName,
              authorEmail: c.authorEmail || undefined,
              content: c.content,
              threadTitle:
                fbData.thread?.title ||
                (selectedSite === "demo"
                  ? "The Future of Edge Comments"
                  : "The Art of Thoughtful Reading"),
              threadUrl: fbData.thread?.url || fallbackUrl,
              upvotes: Number(c.upvotes) || 0,
              createdAt: formatRelativeTime(c.createdAt),
              status: c.status || "approved",
            }))
          );

          setThreadsList([
            {
              id: fbData.thread?.id || "th_1",
              title:
                fbData.thread?.title ||
                (selectedSite === "demo"
                  ? "The Future of Edge Comments"
                  : "The Art of Thoughtful Reading"),
              url: fbData.thread?.url || fallbackUrl,
              commentCount: totalCount,
              reactionsCount: totalUpvotes,
            },
          ]);
        }
      }
    } catch (err) {
      console.warn("[Dashboard Live Sync] API query notice:", err);
      setApiStatus("error");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [selectedSite, fetchAuthors]);

  useEffect(() => {
    fetchLiveDashboard();
  }, [fetchLiveDashboard]);

  // Moderation Actions
  const handleApprove = async (id: string) => {
    setCommentsList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "approved" as const } : c))
    );
    showToast("Comment approved & published.");
    try {
      await fetch(`${API_BASE}/api/v1/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved" }),
      });
    } catch {}
  };

  const handleFlagSpam = async (id: string) => {
    setCommentsList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "spam" as const } : c))
    );
    showToast("Comment quarantined as spam.");
    try {
      await fetch(`${API_BASE}/api/v1/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "spam" }),
      });
    } catch {}
  };

  const handleDelete = async (id: string) => {
    setCommentsList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "deleted" as const } : c))
    );
    setMetrics((prev) => ({
      ...prev,
      totalComments: Math.max(0, prev.totalComments - 1),
    }));
    showToast("Comment removed from thread.");
    try {
      await fetch(`${API_BASE}/api/v1/comments/${id}`, {
        method: "DELETE",
      });
    } catch {}
  };

  const handleEditComment = async (id: string, newContent: string) => {
    setCommentsList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, content: newContent } : c))
    );
    showToast("Comment content updated.");
    try {
      await fetch(`${API_BASE}/api/v1/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newContent }),
      });
    } catch (err) {
      console.error("Failed to edit comment:", err);
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        selectedSite,
        setSelectedSite,
        metrics,
        commentsList,
        setCommentsList,
        threadsList,
        authors,
        setAuthors,
        loading,
        isRefreshing,
        apiStatus,
        fetchLiveDashboard,
        fetchAuthors,
        handleAddAuthor,
        handleUpdateAuthor,
        handleDeleteAuthor,
        handleApprove,
        handleFlagSpam,
        handleDelete,
        handleEditComment,
        showToast,
        toast,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
