"use client";

import React from "react";
import { BookOpen, MessageSquare, Heart, ExternalLink, ArrowRight } from "lucide-react";
import { ThreadItem } from "./types";

interface ThreadsTabProps {
  loading: boolean;
  threadsList: ThreadItem[];
  selectedSite: string;
  setActiveTab: (tab: any) => void;
}

export function ThreadsTab({
  loading,
  threadsList,
  selectedSite,
  setActiveTab,
}: ThreadsTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif-title text-xl font-bold">Active Discussion Threads</h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Articles on {selectedSite === "trc254" ? "The Reading Circle 254" : "Sandbox"} hosting reader comments.
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
  );
}
