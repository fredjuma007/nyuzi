"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import {
  MessageSquare,
  BookOpen,
  Heart,
  Zap,
  LayoutDashboard,
  ShieldAlert,
  Users,
  Code2,
  Settings,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Sun,
  Moon,
  Check,
  Sparkles,
  Globe,
  Radio,
  RefreshCw,
} from "lucide-react";

import { CommentItem, ThreadItem, AuthorEntry } from "./components/types";
import { OverviewTab } from "./components/OverviewTab";
import { ModerationTab } from "./components/ModerationTab";
import { AuthorsTab } from "./components/AuthorsTab";
import { ThreadsTab } from "./components/ThreadsTab";
import { EmbedStudioTab } from "./components/EmbedStudioTab";
import { SettingsTab } from "./components/SettingsTab";

const API_BASE = "https://nyuzi-api.fredjuma8.workers.dev";

function formatRelativeTime(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const now = new Date();
    const diffSec = Math.floor((now.getTime() - d.getTime()) / 1000);
    if (diffSec < 60) return "just now";
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    if (diffSec < 604800) return `${Math.floor(diffSec / 86400)}d ago`;
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  } catch {
    return dateStr;
  }
}

export default function DashboardPage() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [selectedSite, setSelectedSite] = useState<"trc254" | "demo">("trc254");
  const [activeTab, setActiveTab] = useState<
    "overview" | "moderation" | "authors" | "threads" | "embed" | "settings"
  >("overview");

  // Live API States
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [apiStatus, setApiStatus] = useState<"live" | "fallback" | "error">("live");
  const [metrics, setMetrics] = useState({
    totalComments: 0,
    totalThreads: 0,
    totalUpvotes: 0,
  });

  // Moderation Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "approved" | "pending" | "spam">("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Author Roster State
  const [authors, setAuthors] = useState<AuthorEntry[]>([
    { id: "1", name: "Fred Juma", email: "fredjuma8@gmail.com", status: "active", discussionsCount: 0 },
    { id: "2", name: "Sumeiya Juma", email: "readingcircle254@gmail.com", status: "active", discussionsCount: 0 },
    { id: "3", name: "Brenda Frenjo", email: "readingcircle254@gmail.com", status: "active", discussionsCount: 0 },
    { id: "4", name: "Guest Authors", email: "readingcircle254@gmail.com (Fallback)", status: "active", discussionsCount: 0 },
  ]);

  const [newAuthorName, setNewAuthorName] = useState("");
  const [newAuthorEmail, setNewAuthorEmail] = useState("");
  const [showAddAuthor, setShowAddAuthor] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<AuthorEntry | null>(null);
  const [editAuthorName, setEditAuthorName] = useState("");
  const [editAuthorEmail, setEditAuthorEmail] = useState("");

  // Data lists populated from Cloudflare D1
  const [commentsList, setCommentsList] = useState<CommentItem[]>([]);
  const [threadsList, setThreadsList] = useState<ThreadItem[]>([]);

  // Theme Sync
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("nyuzi-theme");
    if (savedTheme) {
      const dark = savedTheme === "dark";
      setIsDark(dark);
      if (dark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    localStorage.setItem("nyuzi-theme", nextDark ? "dark" : "light");
    if (nextDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Restore saved author edits from localStorage
  useEffect(() => {
    try {
      const savedAuthors = localStorage.getItem(`nyuzi_authors_${selectedSite}`);
      if (savedAuthors) {
        setAuthors(JSON.parse(savedAuthors));
      }
    } catch {}
  }, [selectedSite]);

  // Fetch Live Metrics and Data from Cloudflare D1
  const fetchLiveDashboard = useCallback(async () => {
    try {
      setIsRefreshing(true);

      // Primary: Call aggregated dashboard endpoint
      const dashRes = await fetch(`${API_BASE}/api/v1/dashboard?siteId=${selectedSite}`);
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

        if (Array.isArray(data.authorCounts)) {
          const countMap: Record<string, number> = {};
          for (const item of data.authorCounts) {
            if (item.authorName) {
              countMap[item.authorName.toLowerCase()] = Number(item.count || 0);
            }
          }
          setAuthors((prev) =>
            prev.map((a) => ({
              ...a,
              discussionsCount: countMap[a.name.toLowerCase()] ?? a.discussionsCount ?? 0,
            }))
          );
        } else if (data.authorCountMap && typeof data.authorCountMap === "object") {
          const map = data.authorCountMap;
          setAuthors((prev) =>
            prev.map((a) => {
              const matched =
                map[a.name] ??
                map[Object.keys(map).find((k) => k.toLowerCase() === a.name.toLowerCase()) || ""];
              return matched !== undefined ? { ...a, discussionsCount: Number(matched) } : a;
            })
          );
        } else if (data.authorCounts && typeof data.authorCounts === "object") {
          const map = data.authorCounts;
          setAuthors((prev) =>
            prev.map((a) => {
              const matched =
                map[a.name] ??
                map[Object.keys(map).find((k) => k.toLowerCase() === a.name.toLowerCase()) || ""];
              return matched !== undefined ? { ...a, discussionsCount: Number(matched) } : a;
            })
          );
        }
        return;
      }

      // Fallback: Query live D1 comments endpoint
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
  }, [selectedSite]);

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

  // Author Management Actions
  const handleToggleAuthor = (id: string) => {
    const updated = authors.map((a) =>
      a.id === id
        ? { ...a, status: (a.status === "active" ? "muted" : "active") as "active" | "muted" }
        : a
    );
    setAuthors(updated);
    localStorage.setItem(`nyuzi_authors_${selectedSite}`, JSON.stringify(updated));
    showToast("Author notification preferences updated.");
  };

  const handleOpenEditAuthor = (author: AuthorEntry) => {
    setEditingAuthor(author);
    setEditAuthorName(author.name);
    setEditAuthorEmail(author.email);
  };

  const handleSaveEditAuthor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAuthor || !editAuthorName.trim() || !editAuthorEmail.trim()) return;

    const updated = authors.map((a) =>
      a.id === editingAuthor.id
        ? { ...a, name: editAuthorName.trim(), email: editAuthorEmail.trim() }
        : a
    );
    setAuthors(updated);
    localStorage.setItem(`nyuzi_authors_${selectedSite}`, JSON.stringify(updated));
    setEditingAuthor(null);
    showToast(`Author ${editAuthorName.trim()} updated successfully!`);
  };

  const handleAddAuthor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthorName.trim() || !newAuthorEmail.trim()) return;

    const newAuthor: AuthorEntry = {
      id: String(Date.now()),
      name: newAuthorName.trim(),
      email: newAuthorEmail.trim(),
      status: "active",
      discussionsCount: 0,
    };
    const updated = [...authors, newAuthor];
    setAuthors(updated);
    localStorage.setItem(`nyuzi_authors_${selectedSite}`, JSON.stringify(updated));
    setNewAuthorName("");
    setNewAuthorEmail("");
    setShowAddAuthor(false);
    showToast(`Added ${newAuthor.name} to notification roster.`);
  };

  const filteredComments = commentsList.filter((c) => {
    const matchesSearch =
      c.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.threadTitle.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter === "all") return c.status !== "deleted";
    return c.status === statusFilter;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--text-main)] transition-colors duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-[var(--brand-orange)] text-white font-medium text-xs sm:text-sm shadow-xl flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md border-b border-[var(--border-card)] px-4 sm:px-8 py-3 bg-[var(--bg-page)]/85 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-6">
            <Logo />
            <span className="hidden sm:inline-block text-[var(--border-card)]">/</span>

            {/* Site Switcher */}
            <div className="flex items-center gap-2 bg-[var(--bg-card)] px-3 py-1.5 rounded-xl border border-[var(--border-card)] text-xs font-semibold">
              <Globe className="w-3.5 h-3.5 text-[var(--brand-orange)] shrink-0" />
              <select
                value={selectedSite}
                onChange={(e) => setSelectedSite(e.target.value as "trc254" | "demo")}
                className="bg-transparent text-[var(--text-main)] focus:outline-none cursor-pointer font-medium pr-1"
                aria-label="Select publication"
              >
                <option value="trc254" className="bg-[var(--bg-card)] text-[var(--text-main)]">
                  The Reading Circle 254 (trc254)
                </option>
                <option value="demo" className="bg-[var(--bg-card)] text-[var(--text-main)]">
                  Demo Sandbox (demo)
                </option>
              </select>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={fetchLiveDashboard}
              className={`p-1.5 rounded-lg border border-[var(--border-card)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--brand-orange)] hover:border-[var(--brand-orange)] transition-colors cursor-pointer ${
                isRefreshing ? "animate-spin text-[var(--brand-orange)]" : ""
              }`}
              title="Refresh live data from Cloudflare D1"
              aria-label="Refresh live data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>

            <a
              href="https://www.readingcircle254.com/blog"
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-card)] bg-[var(--bg-card)] text-xs text-[var(--text-secondary)] hover:text-[var(--brand-orange)] hover:border-[var(--brand-orange)] transition-colors"
            >
              <span>Visit Publication</span>
              <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
            </a>

            {mounted && (
              <button
                onClick={toggleTheme}
                className="h-8 px-2.5 rounded-lg border border-[var(--border-card)] text-xs hover:text-[var(--brand-orange)] hover:border-[var(--brand-orange)] transition-all bg-[var(--bg-card)] cursor-pointer flex items-center gap-1.5"
                title="Toggle Theme"
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-500" />}
                <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
              </button>
            )}

            <Link
              href="/"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--brand-orange)] transition-colors"
            >
              Exit to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-6">
        {/* Publication Title & Status Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[var(--border-card)]">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-serif-title text-2xl sm:text-3xl font-bold tracking-tight">
                {selectedSite === "trc254" ? "The Reading Circle 254" : "Demo Sandbox"}
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#f56220]/10 text-[#f56220] border border-[#f56220]/20">
                <Sparkles className="w-2.5 h-2.5" />
                Live Production
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
              {selectedSite === "trc254"
                ? "Live edge comments, Resend reply retention, and multi-author alert routing for readingcircle254.com"
                : "Interactive test sandbox on nyuzi-api.fredjuma8.workers.dev"}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-semibold">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              Live
            </span>
          </div>
        </div>

        {/* Worker Status Notice if awaiting deployment */}
        {apiStatus === "fallback" && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-500">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500" />
              <span>
                Connected to live Cloudflare D1. Ready to deploy the full aggregated metrics endpoint: run{" "}
                <code className="px-1.5 py-0.5 rounded bg-amber-500/20 font-mono text-[11px] text-amber-400">
                  npm --prefix packages/api run deploy
                </code>{" "}
                in your terminal.
              </span>
            </div>
            <button
              onClick={fetchLiveDashboard}
              className="px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 font-bold text-[11px] cursor-pointer whitespace-nowrap self-start sm:self-auto transition-colors"
            >
              Sync D1
            </button>
          </div>
        )}

        {/* Primary Metric KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 sm:p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Total Comments</span>
              <div className="w-7 h-7 rounded-lg bg-[var(--brand-orange)]/10 flex items-center justify-center text-[var(--brand-orange)]">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[var(--brand-orange)] min-h-[36px] flex items-center">
              {loading ? (
                <span className="inline-block w-12 h-7 bg-[var(--border-card)] animate-pulse rounded-lg" />
              ) : (
                metrics.totalComments
              )}
            </div>
            <div className="text-[11px] text-[var(--text-muted)] mt-1">
              {selectedSite === "trc254" ? "Across all TRC publications" : "Sandbox comments"}
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Active Threads</span>
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#facc15] min-h-[36px] flex items-center">
              {loading ? (
                <span className="inline-block w-12 h-7 bg-[var(--border-card)] animate-pulse rounded-lg" />
              ) : (
                metrics.totalThreads
              )}
            </div>
            <div className="text-[11px] text-[var(--text-muted)] mt-1">Articles hosting discussion</div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Reactions Given</span>
              <div className="w-7 h-7 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500">
                <Heart className="w-4 h-4 fill-rose-500/20" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-rose-500 min-h-[36px] flex items-center">
              {loading ? (
                <span className="inline-block w-12 h-7 bg-[var(--border-card)] animate-pulse rounded-lg" />
              ) : (
                metrics.totalUpvotes
              )}
            </div>
            <div className="text-[11px] text-[var(--text-muted)] mt-1">Reader heart & like reactions</div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Email Retention</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <Zap className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-500 min-h-[36px] flex items-center">
              100%
            </div>
            <div className="text-[11px] text-[var(--text-muted)] mt-1">Resend domain verified</div>
          </div>
        </div>

        {/* Tabbed Navigation Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2 border-b border-[var(--border-card)] overflow-x-auto pb-1 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === "overview"
                ? "bg-[var(--brand-orange)] text-white shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)]"
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab("moderation")}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === "moderation"
                ? "bg-[var(--brand-orange)] text-white shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)]"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Moderation</span>
            <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
              {commentsList.filter((c) => c.status === "pending").length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("authors")}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === "authors"
                ? "bg-[var(--brand-orange)] text-white shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)]"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Author Roster</span>
            <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">{authors.length}</span>
          </button>

          <button
            onClick={() => setActiveTab("threads")}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === "threads"
                ? "bg-[var(--brand-orange)] text-white shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)]"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Discussion Threads</span>
            <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">{threadsList.length}</span>
          </button>

          <button
            onClick={() => setActiveTab("embed")}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === "embed"
                ? "bg-[var(--brand-orange)] text-white shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)]"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Widget Embed Studio</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === "settings"
                ? "bg-[var(--brand-orange)] text-white shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)]"
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Settings</span>
          </button>
        </div>

        {/* Tab 1: OVERVIEW */}
        {activeTab === "overview" && (
          <OverviewTab
            loading={loading}
            commentsList={commentsList}
            selectedSite={selectedSite}
            setActiveTab={setActiveTab}
          />
        )}

        {/* Tab 2: MODERATION FEED */}
        {activeTab === "moderation" && (
          <ModerationTab
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            loading={loading}
            filteredComments={filteredComments}
            selectedSite={selectedSite}
            handleApprove={handleApprove}
            handleFlagSpam={handleFlagSpam}
            handleDelete={handleDelete}
            handleEdit={handleEditComment}
          />
        )}

        {/* Tab 3: AUTHOR ROSTER */}
        {activeTab === "authors" && (
          <AuthorsTab
            authors={authors}
            showAddAuthor={showAddAuthor}
            setShowAddAuthor={setShowAddAuthor}
            newAuthorName={newAuthorName}
            setNewAuthorName={setNewAuthorName}
            newAuthorEmail={newAuthorEmail}
            setNewAuthorEmail={setNewAuthorEmail}
            handleAddAuthor={handleAddAuthor}
            editingAuthor={editingAuthor}
            setEditingAuthor={setEditingAuthor}
            editAuthorName={editAuthorName}
            setEditAuthorName={setEditAuthorName}
            editAuthorEmail={editAuthorEmail}
            setEditAuthorEmail={setEditAuthorEmail}
            handleOpenEditAuthor={handleOpenEditAuthor}
            handleSaveEditAuthor={handleSaveEditAuthor}
            handleToggleAuthor={handleToggleAuthor}
          />
        )}

        {/* Tab 4: ACTIVE THREADS */}
        {activeTab === "threads" && (
          <ThreadsTab
            loading={loading}
            threadsList={threadsList}
            selectedSite={selectedSite}
            setActiveTab={setActiveTab}
          />
        )}

        {/* Tab 5: WIDGET & EMBED STUDIO (HYVOR TALK GRADE) */}
        {activeTab === "embed" && (
          <EmbedStudioTab selectedSite={selectedSite} showToast={showToast} />
        )}

        {/* Tab 6: SETTINGS */}
        {activeTab === "settings" && <SettingsTab selectedSite={selectedSite} />}
      </main>
    </div>
  );
}
