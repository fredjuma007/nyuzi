"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";
import { DashboardProvider, useDashboard } from "./context";

function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const {
    selectedSite,
    setSelectedSite,
    commentsList,
    authors,
    isRefreshing,
    apiStatus,
    fetchLiveDashboard,
    toast,
  } = useDashboard();

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

  const navItems = [
    {
      group: "SALON MANAGEMENT",
      items: [
        {
          label: "Overview",
          href: "/dashboard",
          icon: LayoutDashboard,
          badge: null,
          exact: true,
        },
        {
          label: "Moderation",
          href: "/dashboard/moderation",
          icon: ShieldAlert,
          badge: pendingCommentsCount > 0 ? `${pendingCommentsCount} Alert` : null,
          exact: false,
        },
        {
          label: "Discussions",
          href: "/dashboard/threads",
          icon: MessageSquare,
          badge: null,
          exact: false,
        },
        {
          label: "Author Roster",
          href: "/dashboard/authors",
          icon: Users,
          badge: pendingDiscoveredCount > 0 ? `${pendingDiscoveredCount} New` : null,
          exact: false,
        },
      ],
    },
    {
      group: "DEVELOPER & DESIGN",
      items: [
        {
          label: "Widget Studio",
          href: "/dashboard/studio",
          icon: Palette,
          badge: "Customizer",
          exact: false,
        },
        {
          label: "Site Settings",
          href: "/dashboard/settings",
          icon: Settings,
          badge: null,
          exact: false,
        },
      ],
    },
  ];

  const getPageTitle = () => {
    if (pathname === "/dashboard/moderation") return "Moderation Queue";
    if (pathname === "/dashboard/studio") return "Widget Embed Studio";
    if (pathname === "/dashboard/threads") return "Active Discussions";
    if (pathname === "/dashboard/authors") return "Author Roster";
    if (pathname === "/dashboard/settings") return "Site Settings";
    return "Overview";
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] flex">
      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Persistent Left Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 border-r border-[var(--border-card)] bg-[var(--bg-card)] flex flex-col justify-between transition-transform duration-200 ease-in-out shrink-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-5 space-y-6 overflow-y-auto">
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
                  Edge Comments
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

          {/* Publication Selector Dropdown */}
          <div className="p-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] space-y-1">
            <label className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)] block">
              Active Publication
            </label>
            <div className="relative">
              <select
                value={selectedSite}
                onChange={(e) => setSelectedSite(e.target.value)}
                className="w-full appearance-none bg-transparent font-semibold text-xs text-[var(--text-main)] focus:outline-none cursor-pointer pr-6 truncate"
              >
                <option value="trc254" className="bg-[var(--bg-card)] text-[var(--text-main)]">
                  The Reading Circle (trc254)
                </option>
                <option value="demo" className="bg-[var(--bg-card)] text-[var(--text-main)]">
                  Demo Sandbox (demo)
                </option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-0 top-0.5 text-[var(--text-muted)] pointer-events-none" />
            </div>
          </div>

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
                        key={item.href}
                        href={item.href}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                          isActive
                            ? "bg-[var(--brand-orange-soft)] text-[var(--brand-orange)] font-bold shadow-xs border border-[var(--brand-orange)]/25"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)]"
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
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-4 border-t border-[var(--border-card)] space-y-3 bg-[var(--bg-card)]">
          {/* Back to Live Website Link */}
          <a
            href={
              selectedSite === "trc254"
                ? "https://www.readingcircle254.com/blog/art-of-thoughtful-reading"
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

          {/* Theme & User Profile Bar */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[var(--brand-orange)]/15 text-[var(--brand-orange)] font-bold text-xs flex items-center justify-center">
                FJ
              </div>
              <div className="leading-tight">
                <span className="block text-xs font-bold text-[var(--text-main)]">Fred Juma</span>
                <span className="block text-[10px] text-[var(--text-muted)]">Admin / Publisher</span>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors cursor-pointer"
              title="Toggle Dark / Light theme"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 h-16 border-b border-[var(--border-card)] bg-[var(--bg-page)]/85 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg border border-[var(--border-card)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb Path */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[var(--text-muted)]">Dashboard</span>
              <span className="text-[var(--text-muted)]">/</span>
              <span className="font-bold text-[var(--text-main)]">{getPageTitle()}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Edge Health Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Edge API Live</span>
            </div>

            {/* Refresh Button */}
            <button
              onClick={fetchLiveDashboard}
              disabled={isRefreshing}
              className="p-2 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)] hover:border-[var(--brand-orange)]/40 text-[var(--text-secondary)] hover:text-[var(--text-main)] text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
              title="Sync latest comments from Cloudflare D1"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-[var(--brand-orange)]" : ""}`} />
              <span className="hidden md:inline">Sync</span>
            </button>

            {/* Direct Studio CTA */}
            {pathname !== "/dashboard/studio" && (
              <Link
                href="/dashboard/studio"
                className="px-3.5 py-1.5 rounded-xl bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white text-xs font-bold shadow transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Embed Studio</span>
              </Link>
            )}
          </div>
        </header>

        {/* Viewport Content */}
        <main
          className={`flex-1 w-full mx-auto ${
            pathname === "/dashboard/studio"
              ? "p-3 sm:p-5 max-w-[1600px] overflow-y-auto lg:overflow-hidden flex flex-col min-h-0"
              : "p-4 sm:p-8 max-w-7xl space-y-6"
          }`}
        >
          {children}
        </main>
      </div>

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
