"use client";

import React, { useState, useEffect } from "react";
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
  SlidersHorizontal,
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

interface AuthorEntry {
  id: string;
  name: string;
  email: string;
  status: "active" | "muted";
  articlesCount: number;
}

export default function DashboardPage() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [selectedSite, setSelectedSite] = useState<"trc254" | "demo">("trc254");
  const [activeTab, setActiveTab] = useState<"overview" | "moderation" | "authors" | "threads" | "embed" | "settings">("overview");

  // Search and Filter states for Moderation
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "approved" | "pending" | "spam">("all");
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Author Roster State
  const [authors, setAuthors] = useState<AuthorEntry[]>([
    { id: "1", name: "Fred Juma", email: "fredjuma8@gmail.com", status: "active", articlesCount: 14 },
    { id: "2", name: "Sumeiya Juma", email: "sumaiya@readingcircle254.com", status: "active", articlesCount: 9 },
    { id: "3", name: "Brenda Frenjo", email: "brenda@readingcircle254.com", status: "active", articlesCount: 8 },
    { id: "4", name: "Guest Authors", email: "fredjuma8@gmail.com (Fallback)", status: "active", articlesCount: 2 },
  ]);

  const [newAuthorName, setNewAuthorName] = useState("");
  const [newAuthorEmail, setNewAuthorEmail] = useState("");
  const [showAddAuthor, setShowAddAuthor] = useState(false);

  // Moderation Comments State (Preloaded with TRC 254 production activity)
  const [commentsList, setCommentsList] = useState<CommentItem[]>([
    {
      id: "cmt_8d39ff1677d04ac7",
      authorName: "Elena Vance",
      authorEmail: "elena.v@gmail.com",
      content: "The point about annotating margins completely changed how I read essays. Most modern comment sections feel noisy, but this layout feels like a genuine book salon.",
      threadTitle: "The Art of Thoughtful Reading",
      threadUrl: "https://www.readingcircle254.com/blog/art-of-thoughtful-reading",
      upvotes: 8,
      createdAt: "15 minutes ago",
      status: "approved",
    },
    {
      id: "cmt_982ef02a4ab548a3",
      authorName: "Fred Juma (Author)",
      authorEmail: "fredjuma8@gmail.com",
      content: "Spot on Elena! Margin notes turn a passive article into an active dialogue with the writer. Glad it resonated!",
      threadTitle: "The Art of Thoughtful Reading",
      threadUrl: "https://www.readingcircle254.com/blog/art-of-thoughtful-reading",
      upvotes: 3,
      createdAt: "12 minutes ago",
      status: "approved",
    },
    {
      id: "cmt_trc_003",
      authorName: "Kipchoge M.",
      authorEmail: "kip@readingcircle.ke",
      content: "Has anyone tried the audio version recommended in chapter 3? Curious if the narrator captures the poetic nuance.",
      threadTitle: "East African Voices in Contemporary Fiction",
      threadUrl: "https://www.readingcircle254.com/blog/east-african-voices",
      upvotes: 5,
      createdAt: "1 hour ago",
      status: "approved",
    },
    {
      id: "cmt_trc_004",
      authorName: "Wanjiru K.",
      authorEmail: "wanjiru@techke.org",
      content: "Loved the breakdown of Ngugi's language philosophy! We need more literary clubs in Nairobi discussing this.",
      threadTitle: "Decolonising Literature & Language",
      threadUrl: "https://www.readingcircle254.com/blog/decolonising-literature",
      upvotes: 11,
      createdAt: "3 hours ago",
      status: "approved",
    },
    {
      id: "cmt_trc_005",
      authorName: "CryptoBot_42",
      content: "Check out this free crypto signal link bit.ly/spam-test",
      threadTitle: "The Art of Thoughtful Reading",
      threadUrl: "https://www.readingcircle254.com/blog/art-of-thoughtful-reading",
      upvotes: 0,
      createdAt: "5 hours ago",
      status: "pending",
    },
  ]);

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
  }, []);

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

  // Moderation Actions
  const handleApprove = (id: string) => {
    setCommentsList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "approved" as const } : c))
    );
    showToast("Comment approved and live on TRC 254!");
  };

  const handleFlagSpam = (id: string) => {
    setCommentsList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "spam" as const } : c))
    );
    showToast("Comment flagged as spam and hidden.");
  };

  const handleDelete = (id: string) => {
    setCommentsList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "deleted" as const } : c))
    );
    showToast("Comment removed from thread.");
  };

  // Author Management Actions
  const handleToggleAuthor = (id: string) => {
    setAuthors((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: a.status === "active" ? "muted" : "active" } : a
      )
    );
    showToast("Author notification preferences updated.");
  };

  const handleAddAuthor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthorName.trim() || !newAuthorEmail.trim()) return;

    setAuthors((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        name: newAuthorName.trim(),
        email: newAuthorEmail.trim(),
        status: "active",
        articlesCount: 0,
      },
    ]);
    setNewAuthorName("");
    setNewAuthorEmail("");
    setShowAddAuthor(false);
    showToast(`Author ${newAuthorName} added to notification roster!`);
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
              Cloudflare Edge D1 Live
            </span>
          </div>
        </div>

        {/* Primary Metric KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 sm:p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Total Comments</span>
              <div className="w-7 h-7 rounded-lg bg-[var(--brand-orange)]/10 flex items-center justify-center text-[var(--brand-orange)]">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[var(--brand-orange)]">
              {selectedSite === "trc254" ? "79" : "3"}
            </div>
            <div className="text-[11px] text-[var(--text-muted)] mt-1">
              {selectedSite === "trc254" ? "76 migrated + 3 recent" : "Seed & test comments"}
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Active Threads</span>
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#facc15]">
              {selectedSite === "trc254" ? "33" : "1"}
            </div>
            <div className="text-[11px] text-[var(--text-muted)] mt-1">Articles with discussions</div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Reactions Given</span>
              <div className="w-7 h-7 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500">
                <Heart className="w-4 h-4 fill-rose-500/20" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-rose-500">
              {selectedSite === "trc254" ? "148" : "11"}
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
            <div className="text-2xl sm:text-3xl font-black text-emerald-500">100%</div>
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
                  {commentsList.slice(0, 4).map((comment) => (
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
                        <span className="font-medium underline truncate">{comment.threadTitle}</span>
                      </div>
                    </div>
                  ))}
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
              {filteredComments.length === 0 ? (
                <div className="p-12 text-center border border-[var(--border-card)] rounded-2xl bg-[var(--bg-card)] text-[var(--text-muted)] text-sm">
                  No comments found matching your filters.
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
                    <th className="py-3 px-4">Published Articles</th>
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
                        {author.articlesCount} articles
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
              {[
                {
                  title: "The Art of Thoughtful Reading",
                  url: "https://www.readingcircle254.com/blog/art-of-thoughtful-reading",
                  commentsCount: 28,
                  reactionsCount: 42,
                  lastActive: "12m ago",
                },
                {
                  title: "East African Voices in Contemporary Fiction",
                  url: "https://www.readingcircle254.com/blog/east-african-voices",
                  commentsCount: 19,
                  reactionsCount: 35,
                  lastActive: "1h ago",
                },
                {
                  title: "Decolonising Literature & Language",
                  url: "https://www.readingcircle254.com/blog/decolonising-literature",
                  commentsCount: 14,
                  reactionsCount: 29,
                  lastActive: "3h ago",
                },
                {
                  title: "Welcome to The Reading Circle 254",
                  url: "https://www.readingcircle254.com/blog/welcome",
                  commentsCount: 18,
                  reactionsCount: 42,
                  lastActive: "1d ago",
                },
              ].map((thread, idx) => (
                <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
                        <span>{thread.commentsCount}</span>
                      </div>
                      <div className="text-[10px] text-[var(--text-muted)]">Comments</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-rose-500 text-sm flex items-center justify-center gap-1">
                        <Heart className="w-3.5 h-3.5 fill-rose-500/20" />
                        <span>{thread.reactionsCount}</span>
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
              ))}
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
