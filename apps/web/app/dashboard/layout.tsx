"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useParams } from "next/navigation";
import {
  LayoutDashboard,
  ShieldAlert,
  MessageSquare,
  Users,
  Palette,
  Settings,
  ExternalLink,
  Sun,
  Moon,
  RotateCw,
  Zap,
  Menu,
  X,
  Code2,
  ChevronDown,
  Sparkles,
  LogOut,
  Layers,
  Plus,
  ArrowLeft,
  UserCog,
  UserPlus,
  Globe,
} from "lucide-react";
import { DashboardProvider, useDashboard } from "./context";
import { useSession, signOut } from "@/lib/auth-client";
import { CreatePublicationModal } from "./components/CreatePublicationModal";
import { CreateTeamModal } from "./components/CreateTeamModal";

function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams<{ teamSlug?: string; siteId?: string }>();
  const routeTeamSlug = params?.teamSlug;
  const routeSiteId = params?.siteId;

  const { data: session, isPending: sessionPending } = useSession();
  const {
    teams,
    activeTeam,
    activeTeamSlug,
    setActiveTeamSlug,
    isCreateTeamModalOpen,
    setIsCreateTeamModalOpen,
    sites,
    selectedSite,
    setSelectedSite,
    selectedSiteData,
    setIsCreateSiteModalOpen,
    commentsList,
    authors,
    teamsLoading,
    loading,
    isRefreshing,
    apiStatus,
    fetchLiveDashboard,
    toast,
  } = useDashboard();

  // Auth Protection: If session resolves and there is no user, redirect to homepage
  useEffect(() => {
    if (!sessionPending && !session?.user) {
      router.replace("/");
    }
  }, [session, sessionPending, router]);

  // Tenant Workspace Guard: If user belongs to teams but tries to access an unauthorized team slug
  useEffect(() => {
    if (sessionPending || teamsLoading) return;

    if (routeTeamSlug && teams.length > 0 && !teams.some((t) => t.slug === routeTeamSlug)) {
      router.replace(`/dashboard/${teams[0].slug}`);
    }
  }, [sessionPending, teamsLoading, teams, routeTeamSlug, router]);

  const currentTeamSlug = routeTeamSlug || activeTeamSlug || (teams.length > 0 ? teams[0].slug : "");
  const currentSiteId = routeSiteId || selectedSite || (sites.length > 0 ? sites[0].id : "");

  // Sync route teamSlug with context
  useEffect(() => {
    if (routeTeamSlug && routeTeamSlug !== activeTeamSlug) {
      setActiveTeamSlug(routeTeamSlug);
    }
  }, [routeTeamSlug, activeTeamSlug, setActiveTeamSlug]);

  // Sync route param with selected site in context
  useEffect(() => {
    if (routeSiteId && routeSiteId !== selectedSite) {
      setSelectedSite(routeSiteId);
    }
  }, [routeSiteId, selectedSite, setSelectedSite]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Sync theme mode
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  };

  const pendingCommentsCount = commentsList.filter(
    (c) => c.status === "pending" || c.status === "spam"
  ).length;

  const pendingDiscoveredCount = authors.filter(
    (a) => a.status === "discovered" || (!a.email && a.status !== "muted")
  ).length;

  const teamBase = currentTeamSlug ? `/dashboard/${currentTeamSlug}` : "/dashboard";
  const siteBase = currentTeamSlug && currentSiteId ? `/dashboard/${currentTeamSlug}/${currentSiteId}` : teamBase;
  const isPublicationView = Boolean(routeSiteId);

  const workspaceNavItems = [
    {
      group: "WORKSPACE",
      items: [
        {
          label: "All Publications",
          href: teamBase,
          icon: Layers,
          badge: sites.length > 0 ? `${sites.length}` : null,
          exact: true,
        },
        ...(activeTeam?.role !== "collaborator"
          ? [
              {
                label: "Workspace Settings",
                href: `${teamBase}/settings`,
                icon: Settings,
                badge: null,
                exact: false,
              },
            ]
          : []),
      ],
    },
    {
      group: "PERSONAL",
      items: [
        {
          label: "Account Settings",
          href: "/dashboard/account",
          icon: UserCog,
          badge: null,
          exact: true,
        },
      ],
    },
  ];

  const publicationNavItems = [
    {
      group: "ACTIVE PUBLICATION",
      items: [
        {
          label: "Overview",
          href: siteBase,
          icon: LayoutDashboard,
          badge: null,
          exact: true,
        },
        {
          label: "Moderation",
          href: `${siteBase}/moderation`,
          icon: ShieldAlert,
          badge: pendingCommentsCount > 0 ? `${pendingCommentsCount} Alert` : null,
          exact: false,
        },
        {
          label: "Discussions",
          href: `${siteBase}/threads`,
          icon: MessageSquare,
          badge: null,
          exact: false,
        },
        {
          label: "Author Roster",
          href: `${siteBase}/authors`,
          icon: Users,
          badge: pendingDiscoveredCount > 0 ? `${pendingDiscoveredCount} New` : null,
          exact: false,
        },
        {
          label: "Collaborators",
          href: `${siteBase}/collaborators`,
          icon: UserPlus,
          badge: null,
          exact: false,
        },
      ],
    },
    {
      group: "DEVELOPER & DESIGN",
      items: [
        {
          label: "Widget Studio",
          href: `${siteBase}/studio`,
          icon: Palette,
          badge: "Customizer",
          exact: false,
        },
        {
          label: "Publication Settings",
          href: `${siteBase}/settings`,
          icon: Settings,
          badge: null,
          exact: false,
        },
      ],
    },
  ];

  const navItems = isPublicationView ? publicationNavItems : workspaceNavItems;

  const getPageTitle = () => {
    if (pathname === "/dashboard/account") return "Account Settings";
    if (pathname.endsWith("/members")) return "Team Members";
    if (!isPublicationView && pathname.endsWith("/settings")) return "Workspace Settings";
    if (pathname.includes("/moderation")) return "Moderation Queue";
    if (pathname.includes("/studio")) return "Widget Embed Studio";
    if (pathname.includes("/threads")) return "Active Discussions";
    if (pathname.includes("/authors")) return "Author Roster";
    if (pathname.includes("/collaborators")) return "Collaborators";
    if (pathname.includes("/settings")) return "Publication Settings";
    if (routeSiteId) return "Overview";
    return "Publications";
  };

  return (
    <div className="h-screen w-full bg-[var(--bg-page)] text-[var(--text-main)] flex overflow-hidden">
      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Persistent Left Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-full w-64 border-r border-[var(--border-card)] bg-[var(--bg-card)] flex flex-col justify-between transition-transform duration-200 ease-in-out shrink-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-5 space-y-6 overflow-y-auto flex-1 min-h-0">
          {/* Logo & Brand Header */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-[var(--brand-orange)] to-amber-400 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <div>
                <span className="font-serif-title font-bold text-lg tracking-tight text-[var(--text-main)]">
                  Nyuzi<span className="text-[var(--brand-orange)]">Yap</span>
                </span>
                <span className="block text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)] -mt-1">
                  Discussion Engine
                </span>
              </div>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Context-Aware Scope Switcher */}
          {!isPublicationView ? (
            /* WORKSPACE MODE: Show Team Switcher Only */
            <div className="p-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)] block">
                  Workspace / Team
                </label>
                <button
                  type="button"
                  onClick={() => setIsCreateTeamModalOpen(true)}
                  className="text-[10px] font-bold text-[var(--brand-orange)] hover:underline flex items-center gap-0.5 cursor-pointer"
                  title="Create new team workspace"
                >
                  <Plus className="w-3 h-3" />
                  <span>New Team</span>
                </button>
              </div>
              <div className="relative">
                <select
                  value={currentTeamSlug}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "__NEW_TEAM__") {
                      setIsCreateTeamModalOpen(true);
                    } else {
                      setActiveTeamSlug(val);
                      router.push(`/dashboard/${val}`);
                    }
                  }}
                  className="w-full appearance-none bg-transparent font-semibold text-xs text-[var(--text-main)] focus:outline-none cursor-pointer pr-6 truncate"
                >
                  {teams.length > 0 ? (
                    teams.map((t) => (
                      <option key={t.id} value={t.slug} className="bg-[var(--bg-card)] text-[var(--text-main)]">
                        {t.name}
                      </option>
                    ))
                  ) : (
                    <option value={currentTeamSlug} className="bg-[var(--bg-card)] text-[var(--text-main)]">
                      {session?.user?.name ? `${session.user.name}'s Projects` : "Fred's Projects"}
                    </option>
                  )}
                  <option value="__NEW_TEAM__" className="bg-[var(--bg-card)] text-[var(--brand-orange)] font-bold">
                    + Create New Team...
                  </option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-0 top-0.5 text-[var(--text-muted)] pointer-events-none" />
              </div>
            </div>
          ) : (
            /* PUBLICATION MODE: Back to Hub + Active Publication Switcher */
            <div className="space-y-2.5">
              <Link
                href={teamBase}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] hover:border-[var(--brand-orange)]/40 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors group"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[var(--brand-orange)] group-hover:-translate-x-0.5 transition-transform" />
                <span className="truncate">All Publications ({activeTeam?.name || "Team"})</span>
              </Link>

              <div className="p-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)] block">
                    Active Publication
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCreateSiteModalOpen(true)}
                    className="text-[10px] font-bold text-[var(--brand-orange)] hover:underline flex items-center gap-0.5 cursor-pointer"
                    title="Add new publication"
                  >
                    <Plus className="w-3 h-3" />
                    <span>New</span>
                  </button>
                </div>
                <div className="relative">
                  <select
                    value={currentSiteId}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "__NEW__") {
                        setIsCreateSiteModalOpen(true);
                      } else {
                        setSelectedSite(val);
                        if (routeSiteId) {
                          const subPath = pathname.split(`/${routeSiteId}`)[1] || "";
                          router.push(`/dashboard/${currentTeamSlug}/${val}${subPath}`);
                        } else {
                          router.push(`/dashboard/${currentTeamSlug}/${val}`);
                        }
                      }
                    }}
                    className="w-full appearance-none bg-transparent font-semibold text-xs text-[var(--text-main)] focus:outline-none cursor-pointer pr-6 truncate"
                  >
                    {sites.length > 0 ? (
                      sites.map((s) => (
                        <option key={s.id} value={s.id} className="bg-[var(--bg-card)] text-[var(--text-main)]">
                          {s.name} ({s.id})
                        </option>
                      ))
                    ) : (
                      <option value="" disabled className="bg-[var(--bg-card)] text-[var(--text-muted)]">
                        No publications yet
                      </option>
                    )}
                    <option value="__NEW__" className="bg-[var(--bg-card)] text-[var(--brand-orange)] font-bold">
                      + Add New Publication...
                    </option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 absolute right-0 top-0.5 text-[var(--text-muted)] pointer-events-none" />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="space-y-5">
            {navItems.map((group) => (
              <div key={group.group} className="space-y-1.5">
                <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                  {group.group}
                </span>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = item.exact
                      ? pathname === item.href
                      : pathname.startsWith(item.href);
                    const Icon = item.icon;

                    return (
                      <Link
                        key={`${group.group}-${item.label}`}
                        href={item.href}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold border transition-colors focus:outline-none group ${
                          isActive
                            ? "bg-[var(--brand-orange-soft)] text-[var(--brand-orange)] font-bold shadow-xs border-[var(--brand-orange)]/25"
                            : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon
                            className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                              isActive
                                ? "text-[var(--brand-orange)]"
                                : "text-[var(--text-muted)] group-hover:text-[var(--text-main)]"
                            }`}
                          />
                          <span>{item.label}</span>
                        </div>

                        {item.badge && (
                          <span
                            className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                              item.badge.includes("Alert")
                                ? "bg-rose-500/15 text-rose-500 border border-rose-500/20"
                                : item.badge.includes("New")
                                ? "bg-amber-500/15 text-amber-500 border border-amber-500/20"
                                : "bg-[var(--brand-orange)]/15 text-[var(--brand-orange)]"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Quick-Jump Publications List in Workspace Mode */}
            {!isPublicationView && currentTeamSlug && (
              <div className="space-y-1.5">
                <div className="px-2 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    PUBLICATIONS
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsCreateSiteModalOpen(true)}
                    className="text-[10px] font-bold text-[var(--brand-orange)] hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add</span>
                  </button>
                </div>
                <div className="space-y-1">
                  {sites.length > 0 ? (
                    sites.map((site) => (
                      <Link
                        key={site.id}
                        href={`/dashboard/${currentTeamSlug}/${site.id}`}
                        onClick={() => setSelectedSite(site.id)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium border border-transparent text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)] transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                          <span className="truncate">{site.name}</span>
                        </div>
                        <span className="text-[10px] text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </Link>
                    ))
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsCreateSiteModalOpen(true)}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs text-[var(--text-muted)] hover:text-[var(--brand-orange)] hover:bg-[var(--bg-card-subtle)] transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>+ Connect first publication</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-4 border-t border-[var(--border-card)] space-y-3 bg-[var(--bg-card)]">
          {/* Back to Live Website Link (Only when inside a publication) */}
          {isPublicationView && (
            <a
              href={
                currentSiteId === "trc254"
                  ? "https://www.readingcircle254.com/blog"
                  : selectedSiteData?.domain
                  ? selectedSiteData.domain.startsWith("http")
                    ? selectedSiteData.domain
                    : `https://${selectedSiteData.domain}`
                  : "/demo"
              }
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] hover:border-[var(--brand-orange)]/40 text-[var(--text-secondary)] hover:text-[var(--text-main)] text-xs font-medium transition-colors"
            >
              <div className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-[var(--brand-orange)]" />
                <span>Back to Publication</span>
              </div>
              <span className="text-[10px] text-[var(--text-muted)]">↗</span>
            </a>
          )}

          {/* Theme & User Profile Bar */}
          <div className="flex items-center justify-between pt-1">
            <Link
              href="/dashboard/account"
              className="flex items-center gap-2 min-w-0 group hover:opacity-90 transition-opacity"
              title="Account Settings"
            >
              <div className="w-7 h-7 rounded-full bg-[var(--brand-orange)]/15 text-[var(--brand-orange)] font-bold text-xs flex items-center justify-center shrink-0">
                {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="leading-tight truncate">
                <span className="block text-xs font-bold text-[var(--text-main)] group-hover:text-[var(--brand-orange)] transition-colors truncate">
                  {session?.user?.name || "Publisher"}
                </span>
                <span className="block text-[10px] text-[var(--text-muted)] truncate">
                  {session?.user?.email || "Admin"}
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-lg border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors cursor-pointer"
                title="Toggle Dark / Light theme"
              >
                {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => signOut()}
                className="p-1.5 rounded-lg border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-rose-500 hover:border-rose-500/30 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Top Header Bar */}
        <header className="shrink-0 h-16 border-b border-[var(--border-card)] bg-[var(--bg-page)]/85 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg border border-[var(--border-card)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb Path */}
            <div className="flex items-center gap-2 text-xs">
              <Link
                href={teamBase}
                className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
              >
                Dashboard
              </Link>
              {pathname === "/dashboard/account" ? (
                <>
                  <span className="text-[var(--text-muted)]">/</span>
                  <span className="font-bold text-[var(--text-main)]">Account Settings</span>
                </>
              ) : (
                <>
                  {currentTeamSlug && (
                    <>
                      <span className="text-[var(--text-muted)]">/</span>
                      <Link
                        href={teamBase}
                        className="text-[var(--text-secondary)] hover:text-[var(--brand-orange)] transition-colors font-medium"
                      >
                        {activeTeam?.name || currentTeamSlug}
                      </Link>
                    </>
                  )}
                  {!isPublicationView && pathname !== teamBase && (
                    <>
                      <span className="text-[var(--text-muted)]">/</span>
                      <span className="font-bold text-[var(--text-main)]">{getPageTitle()}</span>
                    </>
                  )}
                  {routeSiteId && currentSiteId && (
                    <>
                      <span className="text-[var(--text-muted)]">/</span>
                      <Link
                        href={siteBase}
                        className="text-[var(--text-secondary)] hover:text-[var(--brand-orange)] transition-colors font-medium"
                      >
                        {selectedSiteData?.name || (currentSiteId === "trc254" ? "The Reading Circle" : currentSiteId)}
                      </Link>
                    </>
                  )}
                  {routeSiteId && currentSiteId && pathname.includes(`/${currentSiteId}/`) && (
                    <>
                      <span className="text-[var(--text-muted)]">/</span>
                      <span className="font-bold text-[var(--text-main)]">{getPageTitle()}</span>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* System Status Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>System Operational</span>
            </div>

            {isPublicationView ? (
              <>
                {/* Refresh Button */}
                <button
                  onClick={fetchLiveDashboard}
                  disabled={isRefreshing}
                  className="p-2 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)] hover:border-[var(--brand-orange)]/40 text-[var(--text-secondary)] hover:text-[var(--text-main)] text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                  title="Sync latest discussions"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-[var(--brand-orange)]" : ""}`} />
                  <span className="hidden md:inline">Sync</span>
                </button>

                {/* Direct Studio CTA */}
                {!pathname.includes("/studio") && (
                  <Link
                    href={`/dashboard/${currentTeamSlug}/${currentSiteId}/studio`}
                    className="px-3.5 py-1.5 rounded-xl bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white text-xs font-bold shadow transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Embed Studio</span>
                  </Link>
                )}
              </>
            ) : (
              /* Workspace Level Header CTA */
              <button
                type="button"
                onClick={() => setIsCreateSiteModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white text-xs font-bold shadow transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">New Publication</span>
              </button>
            )}
          </div>
        </header>

        {/* Viewport Content */}
        <main
          className={`flex-1 w-full mx-auto min-w-0 overflow-y-auto ${
            pathname.includes("/studio")
              ? "p-3 sm:p-5 max-w-[1600px] flex flex-col min-h-0"
              : "p-4 sm:p-8 max-w-7xl space-y-6"
          }`}
        >
          {children}
        </main>
      </div>

      {/* Create Publication & Team Modals */}
      <CreatePublicationModal />
      <CreateTeamModal />

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#090605] text-[#f8fafc] text-xs font-semibold shadow-2xl border border-[var(--brand-orange)]/40 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Sparkles className="w-3.5 h-3.5 text-[var(--brand-orange)]" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <DashboardShell>{children}</DashboardShell>
    </DashboardProvider>
  );
}
