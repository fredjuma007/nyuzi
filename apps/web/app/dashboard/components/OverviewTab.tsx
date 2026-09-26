"use client";

import React from "react";
import { MessageSquare, Heart, ArrowRight, Zap } from "lucide-react";
import { CommentItem } from "./types";

interface OverviewTabProps {
  loading: boolean;
  commentsList: CommentItem[];
  selectedSite: string;
  setActiveTab: (tab: any) => void;
}

export function OverviewTab({
  loading,
  commentsList,
  selectedSite,
  setActiveTab,
}: OverviewTabProps) {
  const visibleComments = commentsList.filter((c) => c.status !== "deleted").slice(0, 5);

  return (
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
            ) : visibleComments.length === 0 ? (
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
                  <span>Open Widget Studio</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ) : (
              visibleComments.map((comment) => (
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
                <span>Customize Widget Studio</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

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
  );
}
