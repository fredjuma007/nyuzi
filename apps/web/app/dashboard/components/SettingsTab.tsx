"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

interface SettingsTabProps {
  selectedSite: string;
}

export function SettingsTab({ selectedSite }: SettingsTabProps) {
  return (
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
            value={selectedSite === "trc254" ? "The Reading Circle 254" : "Demo Sandbox Publication"}
            className="w-full px-3.5 py-2 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-muted)] cursor-not-allowed"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-bold">Authorized Domain</label>
          <input
            type="text"
            disabled
            value={selectedSite === "trc254" ? "readingcircle254.com" : "nyuzi-yap.vercel.app"}
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
  );
}
