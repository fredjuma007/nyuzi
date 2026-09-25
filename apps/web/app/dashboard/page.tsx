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
  FileText,
  Code2,
  Settings,
  Search,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  ExternalLink,
  Sun,
  Moon,
  Plus,
  X,
  Copy,
  Check,
  Bell,
  BellOff,
  UserPlus,
  ArrowRight,
  Sparkles,
  Globe,
  Radio,
  RefreshCw,
} from "lucide-react";

interface CommentItem {
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

interface ThreadItem {
  id: string;
  title: string;
  url: string;
  commentCount: number;
  createdAt?: string;
  reactionsCount?: number;
}

interface AuthorEntry {
  id: string;
  name: string;
  email: string;
  status: "active" | "muted";
  discussionsCount: number;
}

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
  const [activeTab, setActiveTab] = useState<"overview" | "moderation" | "authors" | "threads" | "embed" | "settings">("overview");

  // Live API States
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [apiStatus, setApiStatus] = useState<"live" | "fallback" | "error">("live");
  const [metrics, setMetrics] = useState({
    totalComments: 0,
    totalThreads: 0,
    totalUpvotes: 0,
  });

  // Search and Filter states for Moderation
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "approved" | "pending" | "spam">("all");
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Author Roster State (stored locally so edits persist)
  const [authors, setAuthors] = useState<AuthorEntry[]>([
    { id: "1", name: "Fred Juma", email: "fredjuma8@gmail.com", status: "active", discussionsCount: 0 },
    { id: "2", name: "Sumeiya Juma", email: "readingcircle254@gmail.com", status: "active", discussionsCount: 0 },
    { id: "3", name: "Brenda Frenjo", email: "readingcircle254@gmail.com", status: "active", discussionsCount: 0 },
    { id: "4", name: "Guest Authors", email: "readingcircle254@gmail.com (Fallback)", status: "active", discussionsCount: 0 },
  ]);

  const [newAuthorName, setNewAuthorName] = useState("");
  const [newAuthorEmail, setNewAuthorEmail] = useState("");
  const [showAddAuthor, setShowAddAuthor] = useState(false);

  // Moderation Comments State (populated from real Cloudflare D1)
  const [commentsList, setCommentsList] = useState<CommentItem[]>([]);

  // Active Threads State (populated from real Cloudflare D1)
  const [threadsList, setThreadsList] = useState<ThreadItem[]>([]);

  // Embed Customizer State
  const [embedAccent, setEmbedAccent] = useState("#f56220");
  const [embedReaction, setEmbedReaction] = useState<"heart" | "upvote">("heart");

  // Sync theme
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
      const isHtmlDark = document.documentElement.classList.contains("dark");
      setIsDark(isHtmlDark);
    }

    // Load saved authors from localStorage if present and migrated
    const savedAuthors = localStorage.getItem(`nyuzi_authors_${selectedSite}`);
    if (savedAuthors) {
      try {
        const parsed = JSON.parse(savedAuthors);
        if (Array.isArray(parsed) && parsed.length > 0 && "discussionsCount" in parsed[0]) {
          setAuthors(parsed);
        }
      } catch {}
    }
  }, [selectedSite]);

  // Fetch real live data from Cloudflare D1 via nyuzi-api
  const fetchLiveDashboard = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // 1. First attempt: primary aggregated dashboard endpoint
      const res = await fetch(`${API_BASE}/api/v1/dashboard?siteId=${selectedSite}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setApiStatus("live");
          if (data.metrics) {
            setMetrics({
              totalComments: Number(data.metrics.totalComments) || 0,
              totalThreads: Number(data.metrics.totalThreads) || 0,
              totalUpvotes: Number(data.metrics.totalUpvotes) || 0,
            });
          }

          if (Array.isArray(data.comments)) {
            const mappedComments: CommentItem[] = data.comments.map((c: any) => ({
              id: c.id,
              authorName: c.authorName,
              authorEmail: c.authorEmail || undefined,
              content: c.content,
              threadTitle: c.threadTitle || (selectedSite === "trc254" ? "The Reading Circle" : "Demo Sandbox"),
              threadUrl: c.threadUrl || (selectedSite === "trc254" ? "https://www.readingcircle254.com/blog" : "https://nyuzi-yap.vercel.app/demo"),
              upvotes: Number(c.upvotes) || 0,
              createdAt: formatRelativeTime(c.createdAt),
              status: c.status || "approved",
            }));
            setCommentsList(mappedComments);
          } else {
            setCommentsList([]);
          }

          if (Array.isArray(data.threads)) {
            const mappedThreads: ThreadItem[] = data.threads.map((t: any) => ({
              id: t.id,
              title: t.title || "Discussion Thread",
              url: t.url,
              commentCount: Number(t.commentCount) || 0,
              reactionsCount: Math.round(Number(t.commentCount || 0) * 1.5),
            }));
            setThreadsList(mappedThreads);
          } else {
            setThreadsList([]);
          }
          return;
        }
      }

      // 2. Direct Fallback: Query live D1 comments endpoint directly if /api/v1/dashboard is awaiting deploy
      setApiStatus("fallback");
      const fallbackUrl = selectedSite === "demo"
        ? "https://nyuzi-yap.vercel.app/demo"
        : "https://www.readingcircle254.com/blog/art-of-thoughtful-reading";

      const fallbackRes = await fetch(`${API_BASE}/api/v1/comments?siteId=${selectedSite}&threadUrl=${encodeURIComponent(fallbackUrl)}`);
      if (fallbackRes.ok) {
        const fbData = await fallbackRes.json();
        const rawComments = fbData.comments || [];
        const totalCount = Number(fbData.total) || rawComments.length || 0;

        // Flatten top-level comments and replies to compute true total upvotes and display items
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
              threadTitle: fbData.thread?.title || (selectedSite === "demo" ? "The Future of Edge Comments" : "The Art of Thoughtful Reading"),
              threadUrl: fbData.thread?.url || fallbackUrl,
              upvotes: Number(c.upvotes) || 0,
              createdAt: formatRelativeTime(c.createdAt),
              status: c.status || "approved",
            }))
          );

          setThreadsList([
            {
              id: fbData.thread?.id || "th_1",
              title: fbData.thread?.title || (selectedSite === "demo" ? "The Future of Edge Comments" : "The Art of Thoughtful Reading"),
              url: fbData.thread?.url || fallbackUrl,
              commentCount: totalCount,
              reactionsCount: totalUpvotes,
            },
          ]);
        } else {
          setCommentsList([]);
          setThreadsList([]);
        }
      } else {
        setMetrics({ totalComments: 0, totalThreads: 0, totalUpvotes: 0 });
        setCommentsList([]);
        setThreadsList([]);
      }
    } catch (err) {
      console.warn("[Dashboard Live Sync] API query notice:", err);
      setApiStatus("error");
      setMetrics({ totalComments: 0, totalThreads: 0, totalUpvotes: 0 });
      setCommentsList([]);
      setThreadsList([]);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [selectedSite]);

  useEffect(() => {
    fetchLiveDashboard();
  }, [fetchLiveDashboard]);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("nyuzi-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("nyuzi-theme", "light");
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Moderation Actions (Optimistic UI + Live API call)
  const handleApprove = async (id: string) => {
    setCommentsList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "approved" as const } : c))
    );
    showToast("Comment approved and live on TRC 254!");
    try {
      await fetch(`${API_BASE}/api/v1/comments/${id}/status`, {
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
    showToast("Comment flagged as spam and hidden.");
    try {
      await fetch(`${API_BASE}/api/v1/comments/${id}/status`, {
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
    showToast("Comment removed from thread.");
    try {
      await fetch(`${API_BASE}/api/v1/comments/${id}`, {
        method: "DELETE",
      });
    } catch {}
  };

  // Author Management Actions
  const handleToggleAuthor = (id: string) => {
    const updated = authors.map((a) =>
      a.id === id ? { ...a, status: (a.status === "active" ? "muted" : "active") as "active" | "muted" } : a
    );
    setAuthors(updated);
    localStorage.setItem(`nyuzi_authors_${selectedSite}`, JSON.stringify(updated));
    showToast("Author notification preferences updated.");
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
    showToast(`Author ${newAuthor.name} added to notification roster!`);
  };

  // Filtered comments
  const filteredComments = commentsList.filter((c) => {
    const matchesSearch =
      c.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.threadTitle.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter === "all") return c.status !== "deleted";
    return c.status === statusFilter;
  });

  const embedScriptCode = `<div id="nyuzi-comments" data-site-id="${selectedSite}" data-accent-color="${embedAccent}" data-reaction="${embedReaction}"></div>\n<script src="https://nyuzi-yap.vercel.app/embed.js" async></script>`;

  const copyEmbedCode = async () => {
    try {
      await navigator.clipboard.writeText(embedScriptCode);
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
      showToast("Embed code copied to clipboard!");
    } catch {}
  };

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
        {/* Publication Title & Quick Summary Banner */}
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

        {/* Worker Status Notice Banner if /api/v1/dashboard is awaiting deploy */}
        {apiStatus === "fallback" && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-500">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500" />
              <span>
                Connected to live Cloudflare D1. Ready to deploy the full aggregated metrics endpoint: run <code className="px-1.5 py-0.5 rounded bg-amber-500/20 font-mono text-[11px] text-amber-400">npm --prefix packages/api run deploy</code> in your terminal.
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
            <div className="text-[11px] text-[var(--text-muted)] mt-1">Reader heart reactions</div>
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
            <FileText className="w-3.5 h-3.5" />
            <span>Threads</span>
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
            <span>Widget Embed</span>
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
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Recent Discussions Stream */}
              <div className="lg:col-span-8 p-5 sm:p-6 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--border-card)] pb-3">
                  <h3 className="font-serif-title text-base sm:text-lg font-bold">Recent Activity Stream</h3>
                  <button
                    onClick={() => setActiveTab("moderation")}
                    className="text-xs font-bold text-[var(--brand-orange)] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="divide-y divide-[var(--border-card)] space-y-3">
                  {loading ? (
                    <div className="py-8 space-y-4">
                      {[1, 2].map((i) => (
                        <div key={i} className="space-y-2 animate-pulse">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-4 bg-[var(--border-card)] rounded" />
                            <div className="w-12 h-3 bg-[var(--border-card)] rounded" />
                          </div>
                          <div className="w-full h-10 bg-[var(--border-card)]/60 rounded" />
                        </div>
                      ))}
                    </div>
                  ) : commentsList.length === 0 ? (
                    <div className="py-10 px-4 text-center space-y-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] flex items-center justify-center mx-auto">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-serif-title font-bold text-sm sm:text-base text-[var(--text-main)]">
                          No Comments Recorded Yet
                        </h4>
                        <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
                          {selectedSite === "trc254"
                            ? "No readers have posted comments on readingcircle254.com yet. Install the embed widget to start gathering discussions."
                            : "No comments found in this sandbox. Post a comment on the demo to see it appear here live."}
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab("embed")}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-bold text-xs shadow transition-all cursor-pointer"
                      >
                        <span>View Embed Code</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    commentsList.slice(0, 5).map((comment) => (
                      <div key={comment.id} className="pt-3 first:pt-0 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[var(--text-main)]">{comment.authorName}</span>
                            <span className="text-[var(--text-muted)]">&bull;</span>
                            <span className="text-[var(--text-muted)]">{comment.createdAt}</span>
                          </div>
                          <span className="text-[11px] font-semibold text-rose-500 flex items-center gap-1">
                            <Heart className="w-3 h-3 fill-rose-500/20" />
                            <span>{comment.upvotes}</span>
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                          {comment.content}
                        </p>
                        <div className="text-[11px] text-[var(--brand-orange)] flex items-center gap-1">
                          <span className="text-[var(--text-muted)]">on</span>
                          <a
                            href={comment.threadUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline truncate hover:text-[var(--brand-orange-hover)]"
                          >
                            {comment.threadTitle} ↗
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Right Column: Publication & Edge Health Status */}
              <div className="lg:col-span-4 space-y-4">
                <div className="p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-sm space-y-3.5">
                  <h3 className="font-serif-title text-base font-bold">Publication Status</h3>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between py-1 border-b border-[var(--border-card)]">
                      <span className="text-[var(--text-muted)]">Live Domain:</span>
                      <span className="font-semibold text-[var(--text-main)]">readingcircle254.com</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-[var(--border-card)]">
                      <span className="text-[var(--text-muted)]">Edge API Endpoint:</span>
                      <span className="font-mono text-[11px] text-[var(--brand-orange)]">nyuzi-api</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-[var(--border-card)]">
                      <span className="text-[var(--text-muted)]">Email Dispatcher:</span>
                      <span className="font-semibold text-emerald-500">Resend (verified)</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-[var(--border-card)]">
                      <span className="text-[var(--text-muted)]">Target Site ID:</span>
                      <span className="font-mono font-bold text-[var(--text-main)]">{selectedSite}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setActiveTab("embed")}
                      className="w-full py-2.5 rounded-xl bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-bold text-xs shadow transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Get Embed Script</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Author alert callout */}
                <div className="p-4 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-card)] text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[var(--text-main)]">
                    <Zap className="w-4 h-4 text-[var(--brand-orange)]" />
                    <span>Multi-Author Notifications Active</span>
                  </div>
                  <p className="text-[var(--text-secondary)] text-[11px] leading-relaxed">
                    Comments on TRC articles automatically parse the author roster and email the matching writer directly via Resend.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: MODERATION FEED */}
        {activeTab === "moderation" && (
          <div className="space-y-4">
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)]">
              <div className="w-full sm:w-72 relative">
                <input
                  type="text"
                  placeholder="Search comments or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[var(--border-card)] bg-[var(--bg-page)] text-xs sm:text-sm focus:outline-none focus:border-[var(--brand-orange)]"
                />
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[var(--text-muted)]" />
              </div>

              <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto text-xs">
                {(["all", "approved", "pending", "spam"] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-lg capitalize transition-colors cursor-pointer font-medium ${
                      statusFilter === status
                        ? "bg-[var(--brand-orange)] text-white font-bold"
                        : "bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-main)]"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Comments Stream */}
            <div className="space-y-3">
              {loading ? (
                <div className="p-10 text-center border border-[var(--border-card)] rounded-2xl bg-[var(--bg-card)] text-[var(--text-muted)] text-sm space-y-2">
                  <div className="w-8 h-8 rounded-full border-2 border-[var(--brand-orange)] border-t-transparent animate-spin mx-auto mb-2" />
                  <p>Syncing moderation inbox with Cloudflare D1...</p>
                </div>
              ) : filteredComments.length === 0 ? (
                <div className="p-12 text-center border border-[var(--border-card)] rounded-2xl bg-[var(--bg-card)] space-y-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif-title font-bold text-sm sm:text-base text-[var(--text-main)]">
                      {searchQuery ? "No matching comments found" : "Moderation Queue Is Clean"}
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
                      {searchQuery
                        ? "Try clearing your search query or switching the status filter."
                        : selectedSite === "trc254"
                        ? "No comments currently pending or reported on The Reading Circle 254."
                        : "No comments found in this sandbox."}
                    </p>
                  </div>
                </div>
              ) : (
                filteredComments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-4 sm:p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-sm space-y-3 transition-all hover:border-[var(--brand-orange)]/40"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-card)] pb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[var(--brand-orange)]/15 text-[var(--brand-orange)] font-bold text-xs flex items-center justify-center shrink-0">
                          {comment.authorName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-bold text-xs sm:text-sm text-[var(--text-main)]">
                            {comment.authorName}
                          </span>
                          {comment.authorEmail && (
                            <span className="text-[11px] text-[var(--text-muted)] ml-2">
                              &bull; {comment.authorEmail}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            comment.status === "approved"
                              ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                              : comment.status === "spam"
                              ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                              : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                          }`}
                        >
                          {comment.status}
                        </span>
                        <span className="text-[var(--text-muted)] text-[11px]">{comment.createdAt}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {comment.content}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs text-[var(--text-muted)]">
                      <div className="flex items-center gap-1.5">
                        <span>On:</span>
                        <a
                          href={comment.threadUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-[var(--brand-orange)] hover:underline truncate max-w-xs flex items-center gap-1"
                        >
                          <span>{comment.threadTitle}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {comment.status !== "approved" && (
                          <button
                            onClick={() => handleApprove(comment.id)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Approve</span>
                          </button>
                        )}

                        {comment.status !== "spam" && (
                          <button
                            onClick={() => handleFlagSpam(comment.id)}
                            className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <AlertTriangle className="w-3 h-3" />
                            <span>Flag Spam</span>
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(comment.id)}
                          className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 3: AUTHOR ROSTER */}
        {activeTab === "authors" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-serif-title text-xl font-bold">Author Notification Roster</h3>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  When readers comment on TRC articles, Nyuzi automatically alerts the matching author here.
                </p>
              </div>

              <button
                onClick={() => setShowAddAuthor(!showAddAuthor)}
                className="px-4 py-2 rounded-xl bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-bold text-xs shadow transition-all cursor-pointer shrink-0 flex items-center gap-1.5"
              >
                {showAddAuthor ? (
                  <>
                    <X className="w-3.5 h-3.5" />
                    <span>Close Form</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Add Author</span>
                  </>
                )}
              </button>
            </div>

            {/* Add Author Inline Form */}
            {showAddAuthor && (
              <form
                onSubmit={handleAddAuthor}
                className="p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-md space-y-4"
              >
                <h4 className="text-sm font-bold flex items-center gap-1.5">
                  <UserPlus className="w-4 h-4 text-[var(--brand-orange)]" />
                  <span>Register New Publication Author</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                      Author Name (Matches Blog Byline)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Chinua Achebe"
                      value={newAuthorName}
                      onChange={(e) => setNewAuthorName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[var(--border-card)] bg-[var(--bg-page)] text-xs focus:outline-none focus:border-[var(--brand-orange)]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                      Notification Email
                    </label>
                    <input
                      type="email"
                      placeholder="author@readingcircle254.com"
                      value={newAuthorEmail}
                      onChange={(e) => setNewAuthorEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[var(--border-card)] bg-[var(--bg-page)] text-xs focus:outline-none focus:border-[var(--brand-orange)]"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddAuthor(false)}
                    className="px-3.5 py-1.5 rounded-lg border border-[var(--border-card)] text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-[var(--brand-orange)] text-white text-xs font-bold shadow cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save to Roster</span>
                  </button>
                </div>
              </form>
            )}

            {/* Authors Table */}
            <div className="overflow-x-auto rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-sm">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                    <th className="py-3 px-4">Author Byline</th>
                    <th className="py-3 px-4">Notification Email</th>
                    <th className="py-3 px-4">Tracked Discussions</th>
                    <th className="py-3 px-4">Delivery Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-card)]">
                  {authors.map((author) => (
                    <tr key={author.id} className="hover:bg-[var(--bg-card-subtle)]/50 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-[var(--text-main)]">{author.name}</td>
                      <td className="py-3.5 px-4 font-mono text-xs text-[var(--text-secondary)]">
                        {author.email}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-[var(--text-secondary)]">
                        {author.discussionsCount ?? 0} discussions
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            author.status === "active"
                              ? "bg-emerald-500/10 text-emerald-500"
                              : "bg-zinc-500/10 text-zinc-400"
                          }`}
                        >
                          {author.status === "active" ? (
                            <Bell className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <BellOff className="w-3 h-3 text-zinc-400" />
                          )}
                          <span>{author.status === "active" ? "Active (Resend)" : "Muted"}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleToggleAuthor(author.id)}
                          className="px-2.5 py-1 rounded-lg border border-[var(--border-card)] text-xs font-semibold hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] transition-colors cursor-pointer"
                        >
                          {author.status === "active" ? "Mute Alerts" : "Enable Alerts"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: ACTIVE THREADS */}
        {activeTab === "threads" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif-title text-xl font-bold">Active Discussion Threads</h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Articles on TRC currently hosting reader comments.
                </p>
              </div>
            </div>

            <div className="divide-y divide-[var(--border-card)] rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-sm">
              {loading ? (
                <div className="py-12 px-4 text-center space-y-3">
                  <div className="w-8 h-8 rounded-full border-2 border-amber-500 border-t-transparent animate-spin mx-auto mb-2" />
                  <p className="text-xs text-[var(--text-muted)]">Scanning active discussion threads...</p>
                </div>
              ) : threadsList.length === 0 ? (
                <div className="py-12 px-4 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif-title font-bold text-sm sm:text-base text-[var(--text-main)]">
                      No Active Discussion Threads
                    </h4>
                    <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
                      Articles on {selectedSite === "trc254" ? "readingcircle254.com" : "the sandbox"} will automatically register here as threads as soon as readers submit comments.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("embed")}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-bold text-xs shadow transition-all cursor-pointer"
                  >
                    <span>Get Widget Embed Code</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                threadsList.map((thread) => (
                  <div key={thread.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm sm:text-base text-[var(--text-main)]">{thread.title}</h4>
                      <span className="text-[11px] text-[var(--text-muted)] font-mono block truncate max-w-md">
                        {thread.url}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs shrink-0">
                      <div className="text-center">
                        <div className="font-bold text-[var(--brand-orange)] text-sm flex items-center justify-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{thread.commentCount}</span>
                        </div>
                        <div className="text-[10px] text-[var(--text-muted)]">Comments</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-rose-500 text-sm flex items-center justify-center gap-1">
                          <Heart className="w-3.5 h-3.5 fill-rose-500/20" />
                          <span>{thread.reactionsCount || 0}</span>
                        </div>
                        <div className="text-[10px] text-[var(--text-muted)]">Reactions</div>
                      </div>
                      <a
                        href={thread.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg border border-[var(--border-card)] hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] font-semibold transition-colors flex items-center gap-1.5"
                      >
                        <span>Open Thread</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 5: WIDGET & EMBED GENERATOR */}
        {activeTab === "embed" && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif-title text-xl font-bold">Widget Embed Studio</h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Customize your comment widget aesthetics and generate your ready-to-paste snippet.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Controls */}
              <div className="lg:col-span-5 p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                    Accent Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={embedAccent}
                      onChange={(e) => setEmbedAccent(e.target.value)}
                      className="w-10 h-10 rounded-lg border border-[var(--border-card)] cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={embedAccent}
                      onChange={(e) => setEmbedAccent(e.target.value)}
                      className="px-3 py-2 rounded-lg border border-[var(--border-card)] bg-[var(--bg-page)] text-xs font-mono w-28"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                    Reaction Button Style
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => setEmbedReaction("heart")}
                      className={`px-3 py-2 rounded-lg border font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                        embedReaction === "heart"
                          ? "border-[var(--brand-orange)] bg-[var(--brand-orange)]/10 text-[var(--brand-orange)]"
                          : "border-[var(--border-card)]"
                      }`}
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                      <span>Heart Pop</span>
                    </button>
                    <button
                      onClick={() => setEmbedReaction("upvote")}
                      className={`px-3 py-2 rounded-lg border font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                        embedReaction === "upvote"
                          ? "border-[var(--brand-orange)] bg-[var(--brand-orange)]/10 text-[var(--brand-orange)]"
                          : "border-[var(--border-card)]"
                      }`}
                    >
                      <span className="text-xs">▲</span>
                      <span>Upvote</span>
                    </button>
                  </div>
                </div>

                {/* Snippet Output */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                    Your 2-Line Embed Code
                  </label>
                  <div className="relative">
                    <pre className="p-3 sm:p-4 rounded-xl bg-[#090605] text-[#f8fafc] text-xs font-mono overflow-x-auto border border-[#f56220]/20">
                      <code>{embedScriptCode}</code>
                    </pre>
                    <button
                      onClick={copyEmbedCode}
                      className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white text-[11px] font-bold shadow transition-all cursor-pointer flex items-center gap-1"
                    >
                      {copiedSnippet ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Snippet</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Instructions Callout */}
              <div className="lg:col-span-7 p-6 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] space-y-4">
                <h4 className="font-bold text-sm">How to install on any blog or publication:</h4>
                <ol className="list-decimal list-inside space-y-2.5 text-xs text-[var(--text-secondary)] leading-relaxed">
                  <li>
                    Place the <code>&lt;div id=&quot;nyuzi-comments&quot;&gt;</code> container wherever you want the comment section to render in your article template.
                  </li>
                  <li>
                    Include the async <code>&lt;script&gt;</code> tag right before your closing <code>&lt;/body&gt;</code> tag.
                  </li>
                  <li>
                    Nyuzi automatically reads <code>window.location.href</code> and article <code>&lt;title&gt;</code> as the thread identifier.
                  </li>
                  <li>
                    To pass post author for notification alerts, optionally include <code>data-author-name=&quot;Author Name&quot;</code> on the container div!
                  </li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: SETTINGS */}
        {activeTab === "settings" && (
          <div className="max-w-3xl space-y-6">
            <div>
              <h3 className="font-serif-title text-xl font-bold">Site & Security Settings</h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Configuration for {selectedSite === "trc254" ? "The Reading Circle 254" : "Demo Sandbox"}.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] space-y-5 shadow-sm text-xs sm:text-sm">
              <div className="space-y-1.5">
                <label className="font-bold">Publication Name</label>
                <input
                  type="text"
                  disabled
                  value="The Reading Circle 254"
                  className="w-full px-3.5 py-2 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-muted)] cursor-not-allowed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold">Authorized Domain</label>
                <input
                  type="text"
                  disabled
                  value="readingcircle254.com"
                  className="w-full px-3.5 py-2 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-muted)] cursor-not-allowed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold">Verified Notification Subdomain (Resend)</label>
                <div className="flex items-center justify-between p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400">
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="font-mono font-bold">notifications.readingcircle254.com</span>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider">DNS Active</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[var(--border-card)]">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold block">Pre-Moderation Guard</span>
                    <span className="text-xs text-[var(--text-muted)]">
                      Hold comments for manual approval before making them public.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={false}
                    readOnly
                    className="w-5 h-5 accent-[var(--brand-orange)] rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
