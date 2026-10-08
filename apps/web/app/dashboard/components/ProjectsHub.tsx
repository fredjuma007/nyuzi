"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  LayoutGrid,
  List,
  Star,
  ExternalLink,
  MessageSquare,
  ShieldAlert,
  Code2,
  Settings,
  Zap,
  Globe,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  Layers,
} from "lucide-react";
import { useDashboard, SiteItem } from "../context";
import { useSession } from "@/lib/auth-client";

interface ProjectsHubProps {
  onSelectSite: (siteId: string) => void;
}

export function ProjectsHub({ onSelectSite }: ProjectsHubProps) {
  const {
    sites,
    setIsCreateSiteModalOpen,
    commentsList,
    threadsList,
    metrics,
  } = useDashboard();
  const { data: session } = useSession();

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [starredSites, setStarredSites] = useState<Record<string, boolean>>({
    trc254: true,
  });

  const toggleStar = (e: React.MouseEvent, siteId: string) => {
    e.stopPropagation();
    setStarredSites((prev) => ({
      ...prev,
      [siteId]: !prev[siteId],
    }));
  };

  // Filter sites by query
  const filteredSites = useMemo(() => {
    if (!searchQuery.trim()) return sites;
    const q = searchQuery.toLowerCase();
    return sites.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.domain.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q)
    );
  }, [sites, searchQuery]);

  // Pending moderation count
  const pendingCount = commentsList.filter(
    (c) => c.status === "pending" || c.status === "spam"
  ).length;

  return (
    <div className="space-y-6">
      {/* Search & Actions Toolbar (Vercel Style) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-2">
        {/* Search bar with keyboard shortcut */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Publications..."
            className="w-full pl-10 pr-12 py-2 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)] text-[var(--text-main)] text-xs focus:outline-none focus:border-[var(--brand-orange)] transition-all placeholder:text-[var(--text-muted)]/50 font-medium"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
            <kbd className="px-1.5 py-0.5 rounded border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[10px] text-[var(--text-muted)] font-mono">
              /
            </kbd>
          </div>
        </div>

        {/* View Mode & Add New Action */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)]">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === "grid"
                  ? "bg-[var(--bg-card-subtle)] text-[var(--brand-orange)] font-bold shadow-2xs"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === "list"
                  ? "bg-[var(--bg-card-subtle)] text-[var(--brand-orange)] font-bold shadow-2xs"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Add New Publication Button */}
          <button
            onClick={() => setIsCreateSiteModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-bold text-xs shadow-md shadow-[#f56220]/20 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout (Vercel Style) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Account Usage & Edge Alerts (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Usage Card (Last 30 Days) */}
          <div className="p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif-title font-bold text-sm text-[var(--text-main)]">
                  Usage
                </h3>
                <span className="text-[11px] text-[var(--text-muted)]">
                  Last 30 days
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border border-[var(--brand-orange)]/30 bg-[var(--brand-orange)]/10 text-[var(--brand-orange)]">
                Pro Edge
              </span>
            </div>

            {/* Usage Progress Metrics */}
            <div className="space-y-3.5 pt-1 text-xs">
              {/* Metric 1 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[var(--text-secondary)] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[var(--brand-orange)]" />
                    Comment Edge Writes
                  </span>
                  <span className="font-mono font-semibold text-[var(--text-main)]">
                    {metrics.totalComments} / 10,000
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[var(--bg-card-subtle)] overflow-hidden">
                  <div
                    className="h-full bg-[var(--brand-orange)] rounded-full transition-all"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(5, (metrics.totalComments / 10000) * 100)
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* Metric 2 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[var(--text-secondary)] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    Active Discussion Threads
                  </span>
                  <span className="font-mono font-semibold text-[var(--text-main)]">
                    {metrics.totalThreads} / 500
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[var(--bg-card-subtle)] overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 rounded-full transition-all"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(5, (metrics.totalThreads / 500) * 100)
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* Metric 3 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[var(--text-secondary)] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Edge Cache Hit Ratio
                  </span>
                  <span className="font-mono font-semibold text-[var(--text-main)]">
                    99.4%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[var(--bg-card-subtle)] overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full w-[99.4%]" />
                </div>
              </div>

              {/* Metric 4 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[var(--text-secondary)] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    Fast Origin Transfer
                  </span>
                  <span className="font-mono font-semibold text-[var(--text-main)]">
                    2.45 MB / 10 GB
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[var(--bg-card-subtle)] overflow-hidden">
                  <div className="h-full bg-purple-400 rounded-full w-[2.5%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Anomaly & Moderation Shield Card */}
          <div className="p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-title font-bold text-sm text-[var(--text-main)] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Automated Shield</span>
              </h3>
              <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active
              </span>
            </div>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Real-time heuristic & Turnstile edge protection is active across your live reader discussions.
            </p>

            <div className="pt-1 flex items-center justify-between text-[11px] text-[var(--text-muted)] border-t border-[var(--border-card)] pt-2.5">
              <span>Unmoderated Flags</span>
              <span className="font-bold text-[var(--text-main)]">
                {pendingCount > 0 ? (
                  <span className="text-rose-500">{pendingCount} Pending</span>
                ) : (
                  <span className="text-emerald-400">0 Flags Clean</span>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Projects / Publications Grid (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-serif-title font-bold text-lg text-[var(--text-main)]">
                Publications
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--bg-card-subtle)] text-[var(--text-muted)] border border-[var(--border-card)]">
                {filteredSites.length}
              </span>
            </div>
          </div>

          {/* If No Publications Found */}
          {filteredSites.length === 0 ? (
            <div className="p-10 rounded-2xl border border-dashed border-[var(--border-card)] bg-[var(--bg-card)]/50 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] flex items-center justify-center mx-auto">
                <Globe className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif-title font-bold text-base text-[var(--text-main)]">
                  {searchQuery ? "No matching publications" : "No publications configured yet"}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
                  {searchQuery
                    ? "Try adjusting your search query or add a new publication."
                    : "Connect your blog, magazine, or digital salon to get your live embed snippet and start collecting edge comments."}
                </p>
              </div>
              <button
                onClick={() => setIsCreateSiteModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-bold text-xs transition-all shadow-md cursor-pointer inline-flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Publication</span>
              </button>
            </div>
          ) : (
            /* Publications Grid (Vercel Style Card Layout) */
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                  : "space-y-3"
              }
            >
              {filteredSites.map((site) => {
                const isStarred = Boolean(starredSites[site.id]);
                const isTrc = site.id === "trc254";

                return (
                  <div
                    key={site.id}
                    onClick={() => onSelectSite(site.id)}
                    className="group relative p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] hover:border-[var(--brand-orange)]/40 hover:bg-[var(--bg-card-subtle)]/70 transition-all duration-200 cursor-pointer shadow-xs flex flex-col justify-between space-y-4"
                  >
                    {/* Top Row: Name, Star, Live Status Pill */}
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-serif-title font-bold text-base text-[var(--text-main)] group-hover:text-[var(--brand-orange)] transition-colors truncate">
                              {site.name}
                            </h3>
                            <button
                              type="button"
                              onClick={(e) => toggleStar(e, site.id)}
                              className="text-[var(--text-muted)] hover:text-amber-400 transition-colors shrink-0"
                              title={isStarred ? "Unstar" : "Star publication"}
                            >
                              <Star
                                className={`w-3.5 h-3.5 ${
                                  isStarred
                                    ? "text-amber-400 fill-amber-400"
                                    : "text-[var(--text-muted)]"
                                }`}
                              />
                            </button>
                          </div>

                          {/* Domain */}
                          <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] mt-1 font-mono text-[11px]">
                            <Globe className="w-3 h-3 text-[var(--text-muted)] shrink-0" />
                            <span className="truncate">{site.domain}</span>
                            <span className="text-[10px] text-[var(--text-muted)]">↗</span>
                          </div>
                        </div>

                        {/* Edge Status Indicator */}
                        <div className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Live Edge</span>
                        </div>
                      </div>

                      {/* Recent Activity / Discussion summary */}
                      <div className="mt-4 pt-3 border-t border-[var(--border-card)]/60 text-xs text-[var(--text-muted)] flex items-center justify-between">
                        <div className="flex items-center gap-1.5 truncate">
                          <MessageSquare className="w-3.5 h-3.5 text-[var(--brand-orange)] shrink-0" />
                          <span className="truncate">
                            {isTrc
                              ? "The Psychology of Money discussion"
                              : "Ready for live reader discussions"}
                          </span>
                        </div>
                        <span className="text-[10px] text-[var(--text-muted)] shrink-0 ml-2">
                          Active
                        </span>
                      </div>
                    </div>

                    {/* Quick Action Buttons on Hover */}
                    <div className="pt-2 flex items-center justify-between border-t border-[var(--border-card)] text-xs">
                      <div className="flex items-center gap-1">
                        <Link
                          href="/dashboard/moderation"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectSite(site.id);
                          }}
                          className="px-2.5 py-1 rounded-lg border border-[var(--border-card)] bg-[var(--bg-card)] hover:border-[var(--brand-orange)]/40 hover:text-[var(--brand-orange)] text-[var(--text-secondary)] text-[11px] font-semibold transition-colors flex items-center gap-1"
                          title="Moderation Queue"
                        >
                          <ShieldAlert className="w-3 h-3" />
                          <span>Moderate</span>
                        </Link>

                        <Link
                          href="/dashboard/studio"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectSite(site.id);
                          }}
                          className="px-2.5 py-1 rounded-lg border border-[var(--border-card)] bg-[var(--bg-card)] hover:border-[var(--brand-orange)]/40 hover:text-[var(--brand-orange)] text-[var(--text-secondary)] text-[11px] font-semibold transition-colors flex items-center gap-1"
                          title="Widget Studio"
                        >
                          <Code2 className="w-3 h-3" />
                          <span>Studio</span>
                        </Link>
                      </div>

                      <div className="text-[var(--text-muted)] group-hover:text-[var(--brand-orange)] group-hover:translate-x-0.5 transition-all text-xs font-semibold flex items-center gap-1">
                        <span>Workspace</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Dashed Add New Publication Card */}
              {viewMode === "grid" && (
                <button
                  type="button"
                  onClick={() => setIsCreateSiteModalOpen(true)}
                  className="p-6 rounded-2xl border border-dashed border-[var(--border-card)] hover:border-[var(--brand-orange)]/50 bg-[var(--bg-card)]/40 hover:bg-[var(--bg-card-subtle)] transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-2 group min-h-[170px]"
                >
                  <div className="w-9 h-9 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)] group-hover:border-[var(--brand-orange)] text-[var(--text-muted)] group-hover:text-[var(--brand-orange)] flex items-center justify-center transition-colors">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[var(--text-main)] group-hover:text-[var(--brand-orange)] transition-colors">
                      Add Publication
                    </span>
                    <span className="block text-[11px] text-[var(--text-muted)]">
                      Connect a new website or blog
                    </span>
                  </div>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
