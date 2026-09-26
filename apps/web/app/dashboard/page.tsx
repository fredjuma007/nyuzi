"use client";

import React from "react";
import Link from "next/link";
import {
  MessageSquare,
  BookOpen,
  Heart,
  Zap,
  Code2,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import { useDashboard } from "./context";
import { OverviewTab } from "./components/OverviewTab";

export default function DashboardOverviewPage() {
  const { loading, commentsList, selectedSite, metrics } = useDashboard();

  return (
    <div className="space-y-6">
      {/* TRC254 Inspired Hero Greeting Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[var(--border-card)]">
        <div>
          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold tracking-tight">
            Good Morning,{" "}
            <span className="text-[var(--brand-orange)]">
              {selectedSite === "trc254" ? "Fred Juma" : "Publisher"}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
            {selectedSite === "trc254"
              ? "Here's what's happening around The Reading Circle book discussions and reader engagement."
              : "Here's your live edge commenting metrics across this sandbox publication."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/dashboard/studio"
            className="px-4 py-2 rounded-xl bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-bold text-xs shadow transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Widget Studio</span>
          </Link>
          <Link
            href="/dashboard/moderation"
            className="px-4 py-2 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)] hover:border-[var(--brand-orange)]/40 text-[var(--text-secondary)] hover:text-[var(--text-main)] font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
            <span>Moderation Queue</span>
          </Link>
        </div>
      </div>

      {/* Top 4 KPI Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Discussions */}
        <div className="p-4 sm:p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-[var(--text-muted)] text-xs">
            <span className="font-medium">Total Discussions</span>
            <div className="w-7 h-7 rounded-lg bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] flex items-center justify-center">
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[var(--text-main)] font-serif-title">
            {loading ? "..." : metrics.totalComments}
          </div>
          <div className="text-[11px] text-emerald-500 font-medium flex items-center gap-1">
            <span>●</span>
            <span>Recorded in D1</span>
          </div>
        </div>

        {/* Active Threads */}
        <div className="p-4 sm:p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-[var(--text-muted)] text-xs">
            <span className="font-medium">Active Threads</span>
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[var(--text-main)] font-serif-title">
            {loading ? "..." : metrics.totalThreads}
          </div>
          <div className="text-[11px] text-[var(--text-muted)]">
            {selectedSite === "trc254" ? "Across TRC articles" : "In demo environment"}
          </div>
        </div>

        {/* Reader Reactions */}
        <div className="p-4 sm:p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-[var(--text-muted)] text-xs">
            <span className="font-medium">Reader Reactions</span>
            <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <Heart className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[var(--text-main)] font-serif-title">
            {loading ? "..." : metrics.totalUpvotes}
          </div>
          <div className="text-[11px] text-rose-500 font-medium">
            <span>♥</span> Likes & upvotes
          </div>
        </div>

        {/* Edge API Latency */}
        <div className="p-4 sm:p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-[var(--text-muted)] text-xs">
            <span className="font-medium">Global Edge Speed</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[var(--text-main)] font-serif-title">
            ~14ms
          </div>
          <div className="text-[11px] text-emerald-500 font-medium">
            Cloudflare D1 Worker
          </div>
        </div>
      </div>

      {/* Main Overview Body */}
      <OverviewTab
        loading={loading}
        commentsList={commentsList}
        selectedSite={selectedSite}
      />
    </div>
  );
}
