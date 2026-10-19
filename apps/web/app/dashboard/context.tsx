"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { CommentItem, ThreadItem, AuthorEntry } from "./components/types";

export interface MetricsData {
  totalComments: number;
  totalThreads: number;
  totalUpvotes: number;
}

export interface SiteItem {
  id: string;
  name: string;
  domain: string;
  ownerId?: string | null;
  ownerEmail?: string | null;
  turnstileEnabled?: boolean | null;
  moderationRequired?: boolean | null;
  settings?: string | null;
  createdAt?: string | Date;
}

export interface TeamItem {
  id: string;
  name: string;
  slug: string;
  logo?: string | null;
  role?: string;
  createdAt?: string | Date;
}

export interface DashboardContextType {
  teams: TeamItem[];
  setTeams: React.Dispatch<React.SetStateAction<TeamItem[]>>;
  activeTeam: TeamItem | undefined;
  activeTeamSlug: string;
  setActiveTeamSlug: (slug: string) => void;
  fetchTeams: () => Promise<void>;
  isCreateTeamModalOpen: boolean;
  setIsCreateTeamModalOpen: (open: boolean) => void;
  createNewTeam: (name: string) => Promise<TeamItem | null>;
  sites: SiteItem[];
  setSites: React.Dispatch<React.SetStateAction<SiteItem[]>>;
  selectedSite: string;
  setSelectedSite: (site: string) => void;
  selectedSiteData: SiteItem | undefined;
  fetchUserSites: (teamSlug?: string) => Promise<void>;
  isCreateSiteModalOpen: boolean;
  setIsCreateSiteModalOpen: (open: boolean) => void;
  createNewSite: (name: string, domain: string, accentColor?: string) => Promise<SiteItem | null>;
  metrics: MetricsData;
  commentsList: CommentItem[];
  setCommentsList: React.Dispatch<React.SetStateAction<CommentItem[]>>;
  threadsList: ThreadItem[];
  authors: AuthorEntry[];
  setAuthors: React.Dispatch<React.SetStateAction<AuthorEntry[]>>;
  teamsLoading: boolean;
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
  const [teams, setTeams] = useState<TeamItem[]>([]);
  const [teamsLoading, setTeamsLoading] = useState(true);
  const [activeTeamSlug, setActiveTeamSlugState] = useState<string>("");
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Sync saved team/site from localStorage only after client mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTeam = localStorage.getItem("nyuzi-active-team");
      if (storedTeam) setActiveTeamSlugState(storedTeam);
      const storedSite = localStorage.getItem("nyuzi-selected-site");
      if (storedSite) setSelectedSiteState(storedSite);
    }
  }, []);

  const setActiveTeamSlug = (slug: string) => {
    setActiveTeamSlugState(slug);
    if (typeof window !== "undefined") {
      localStorage.setItem("nyuzi-active-team", slug);
    }
  };

  const activeTeam = teams.find((t) => t.slug === activeTeamSlug) || teams[0];

  const fetchTeams = useCallback(async () => {
    setTeamsLoading(true);
    try {
      const res = await fetch("/api/teams");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.teams)) {
          setTeams(data.teams);
          if (data.teams.length > 0) {
            setActiveTeamSlugState((prev) => {
              const exists = data.teams.some((t: TeamItem) => t.slug === prev);
              if (!exists || !prev) {
                const firstSlug = data.teams[0].slug;
                if (typeof window !== "undefined") {
                  localStorage.setItem("nyuzi-active-team", firstSlug);
                }
                return firstSlug;
              }
              return prev;
            });
          } else {
            setActiveTeamSlugState("");
          }
        }
      }
    } catch (err) {
      console.warn("Failed to fetch teams:", err);
    } finally {
      setTeamsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const [sites, setSites] = useState<SiteItem[]>([]);
  const [selectedSite, setSelectedSiteState] = useState<string>("");
  const [isCreateSiteModalOpen, setIsCreateSiteModalOpen] = useState(false);

  const setSelectedSite = (siteId: string) => {
    setSelectedSiteState(siteId);
    if (typeof window !== "undefined") {
      localStorage.setItem("nyuzi-selected-site", siteId);
    }
  };

  const selectedSiteData = sites.find((s) => s.id === selectedSite);

  const fetchUserSites = useCallback(async (teamSlug?: string) => {
    const slug = teamSlug || activeTeamSlug;
    if (!slug) {
      setSites([]);
      return;
    }
    try {
      const res = await fetch(`/api/sites?teamSlug=${slug}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.sites)) {
          setSites(data.sites);
          if (data.sites.length > 0) {
            setSelectedSiteState((prev) => {
              const exists = data.sites.some((s: SiteItem) => s.id === prev);
              if (!exists || !prev) {
                const firstId = data.sites[0].id;
                if (typeof window !== "undefined") {
                  localStorage.setItem("nyuzi-selected-site", firstId);
                }
                return firstId;
              }
              return prev;
            });
          } else {
            setSelectedSiteState("");
          }
        }
      } else if (res.status === 403 || res.status === 401) {
        setSites([]);
        setSelectedSiteState("");
      }
    } catch (err) {
      console.warn("Failed to fetch user sites:", err);
    }
  }, [activeTeamSlug]);

  useEffect(() => {
    if (activeTeamSlug) {
      fetchUserSites();
    }
  }, [fetchUserSites, activeTeamSlug]);

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
      { id: "auth_trc_bramwel_kemoli", name: "Bramwel Kemoli", email: "readingcircle254@gmail.com", status: "active", discussionsCount: 0 },
      { id: "auth_trc_brenda", name: "Brenda Frenjo", email: "brendafrenjo@gmail.com", status: "active", discussionsCount: 0 },
      { id: "auth_trc_chege", name: "Chege", email: "readingcircle254@gmail.com", status: "active", discussionsCount: 0 },
      { id: "auth_trc_christine_karori", name: "Christine Karori", email: "readingcircle254@gmail.com", status: "active", discussionsCount: 0 },
      { id: "auth_trc_edwin_khakali", name: "Edwin Khakali", email: "readingcircle254@gmail.com", status: "active", discussionsCount: 0 },
      { id: "auth_trc_emmanuel_njeru", name: "Emmanuel Njeru", email: "readingcircle254@gmail.com", status: "active", discussionsCount: 0 },
      { id: "auth_trc_esther_mboche", name: "Esther Mboche", email: "readingcircle254@gmail.com", status: "active", discussionsCount: 0 },
      { id: "auth_trc_esther_ndunge", name: "Esther Ndunge", email: "readingcircle254@gmail.com", status: "active", discussionsCount: 0 },
      { id: "auth_trc_faith_waweru", name: "Faith Waweru", email: "readingcircle254@gmail.com", status: "active", discussionsCount: 0 },
      { id: "auth_trc_fred", name: "Fred Juma", email: "fredjuma8@gmail.com", status: "active", discussionsCount: 0 },
      { id: "auth_trc_john_maingi", name: "John Maingi", email: "readingcircle254@gmail.com", status: "active", discussionsCount: 0 },
      { id: "auth_trc_kibichi", name: "Kibichi", email: "readingcircle254@gmail.com", status: "active", discussionsCount: 0 },
      { id: "auth_trc_lillian_kwamboka", name: "Lillian Kwamboka", email: "readingcircle254@gmail.com", status: "active", discussionsCount: 0 },
      { id: "auth_trc_lorret_trizah_mongina", name: "Lorret Trizah Mong'ina", email: "readingcircle254@gmail.com", status: "active", discussionsCount: 0 },
      { id: "auth_trc_nekesa", name: "Nekesa", email: "readingcircle254@gmail.com", status: "active", discussionsCount: 0 },
      { id: "auth_trc_pith", name: "Pith", email: "readingcircle254@gmail.com", status: "active", discussionsCount: 0 },
      { id: "auth_trc_prudence_mukiri", name: "Prudence Mukiri", email: "readingcircle254@gmail.com", status: "active", discussionsCount: 0 },
      { id: "auth_trc_purity_migwi", name: "Purity Migwi", email: "readingcircle254@gmail.com", status: "active", discussionsCount: 0 },
      { id: "auth_trc_roney_mwavua", name: "Roney Mwavua", email: "readingcircle254@gmail.com", status: "active", discussionsCount: 0 },
      { id: "auth_trc_silent_eyes", name: "Silent Eyes", email: "readingcircle254@gmail.com", status: "active", discussionsCount: 0 },
      { id: "auth_trc_sumeiya", name: "Sumeiya Juma", email: "readingcircle254@gmail.com", status: "active", discussionsCount: 0 },
      { id: "auth_trc_wences_omondi", name: "Wences Omondi", email: "readingcircle254@gmail.com", status: "active", discussionsCount: 0 },
    ],
    demo: [
      { id: "demo-1", name: "Sarah Jenkins", email: "sarah@example.com", status: "active", discussionsCount: 0 },
      { id: "demo-2", name: "Alex Rivera", email: "alex@example.com", status: "active", discussionsCount: 0 },
    ],
  };

  const [authors, setAuthors] = useState<AuthorEntry[]>([]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Fetch Authors dynamically from Cloudflare D1
  const fetchAuthors = useCallback(async () => {
    if (!selectedSite) {
      setAuthors([]);
      return;
    }
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
    // Fallback to defaults only if defined for this specific site
    setAuthors(defaultAuthors[selectedSite] || []);
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
        showToast("Author preferences updated successfully");
      }
    } catch {
      showToast("Failed to save author update");
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
    if (!selectedSite) {
      setMetrics({
        totalComments: 0,
        totalThreads: 0,
        totalUpvotes: 0,
      });
      setCommentsList([]);
      setThreadsList([]);
      setAuthors([]);
      setLoading(false);
      setIsRefreshing(false);
      return;
    }

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
            threadTitle: c.threadTitle || "Blog Discussion",
            threadUrl:
              c.threadUrl ||
              (selectedSite === "trc254"
                ? "https://www.readingcircle254.com/blog"
                : "/demo"),
            upvotes: Number(c.upvotes) || 0,
            createdAt: formatRelativeTime(c.createdAt),
            status: c.status || "approved",
          }))
        );

        if (Array.isArray(data.threads)) {
          setThreadsList(
            data.threads.map((t: any) => ({
              id: t.id,
              title: t.title || "Blog Discussion",
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
          : "https://www.readingcircle254.com/blog";

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

  const createNewSite = async (
    name: string,
    domain: string,
    accentColor?: string
  ): Promise<SiteItem | null> => {
    try {
      const res = await fetch("/api/sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, domain, accentColor, teamSlug: activeTeamSlug }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create publication");
      }
      const newSite: SiteItem = data.site;
      setSites((prev) => [newSite, ...prev]);
      setSelectedSite(newSite.id);
      showToast(`Publication "${name}" created successfully!`);
      return newSite;
    } catch (err: any) {
      showToast(err.message || "Failed to create publication");
      return null;
    }
  };

  const createNewTeam = async (name: string): Promise<TeamItem | null> => {
    try {
      const res = await fetch("/api/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create team");
      }
      const newTeam: TeamItem = data.team;
      setTeams((prev) => [...prev, newTeam]);
      setActiveTeamSlug(newTeam.slug);
      showToast(`Team "${name}" created successfully!`);
      return newTeam;
    } catch (err: any) {
      showToast(err.message || "Failed to create team");
      return null;
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        teams,
        setTeams,
        activeTeam,
        activeTeamSlug,
        setActiveTeamSlug,
        fetchTeams,
        isCreateTeamModalOpen,
        setIsCreateTeamModalOpen,
        createNewTeam,
        sites,
        setSites,
        selectedSite,
        setSelectedSite,
        selectedSiteData,
        fetchUserSites,
        isCreateSiteModalOpen,
        setIsCreateSiteModalOpen,
        createNewSite,
        metrics,
        commentsList,
        setCommentsList,
        threadsList,
        authors,
        setAuthors,
        teamsLoading,
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
