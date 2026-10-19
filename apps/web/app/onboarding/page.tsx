"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Sparkles, Globe, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const ACCENT_COLORS = [
  { name: "Nyuzi Flame", hex: "#f56220" },
  { name: "Amber Gold", hex: "#facc15" },
  { name: "Emerald", hex: "#10b981" },
  { name: "Electric Indigo", hex: "#6366f1" },
  { name: "Midnight Cyan", hex: "#06b6d4" },
  { name: "Ruby Rose", hex: "#f43f5e" },
];

export default function OnboardingPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [accentColor, setAccentColor] = useState("#f56220");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If session finishes loading and there is no user, redirect to homepage
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/");
    }
  }, [session, isPending, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !domain.trim()) {
      setError("Please fill out both publication name and domain.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          domain: domain.trim(),
          accentColor,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create publication");
      }

      // Store newly created site and team in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("nyuzi-selected-site", data.site.id);
        if (data.teamSlug) {
          localStorage.setItem("nyuzi-active-team", data.teamSlug);
        }
      }

      // Hard redirect to clear any in-memory cached state and load the workspace cleanly
      const targetUrl = data.teamSlug
        ? `/dashboard/${data.teamSlug}/${data.site.id}`
        : "/dashboard";
      window.location.href = targetUrl;
    } catch (err: any) {
      setError(err?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-[var(--bg-page)] flex items-center justify-center text-[var(--text-muted)]">
        <Loader2 className="w-6 h-6 animate-spin text-[var(--brand-orange)]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[var(--brand-orange)]/15 blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg relative z-10">
        {/* Top Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--brand-orange)]/25 bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome to Nyuzi</span>
          </div>

          <h1 className="font-serif-title text-3xl sm:text-4xl font-bold text-[var(--text-main)]">
            Create your first publication
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-sm mx-auto">
            Hi {session?.user?.name || "there"}! Let&apos;s set up your site so we can generate your live comment snippet.
          </p>
        </div>

        {/* Card Box */}
        <div className="rounded-3xl border border-[var(--border-card)] bg-[var(--bg-card)] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Publication Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                Publication or Blog Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. The Reserved Circle"
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] text-sm focus:outline-none focus:border-[var(--brand-orange)] transition-colors placeholder:text-[var(--text-muted)]/50 font-medium"
              />
            </div>

            {/* Allowed Domain */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5 flex items-center justify-between">
                <span>Website Domain</span>
                <span className="text-[10px] text-[var(--text-muted)] normal-case font-normal">
                  (Or localhost for dev testing)
                </span>
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="e.g. thereservedcircle.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] text-sm focus:outline-none focus:border-[var(--brand-orange)] transition-colors placeholder:text-[var(--text-muted)]/50 font-mono text-xs"
                />
              </div>
            </div>

            {/* Accent Color Picker */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                Brand Accent Color
              </label>
              <div className="flex items-center gap-2.5 flex-wrap">
                {ACCENT_COLORS.map((c) => {
                  const isSelected = accentColor === c.hex;
                  return (
                    <button
                      type="button"
                      key={c.hex}
                      onClick={() => setAccentColor(c.hex)}
                      className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? "border-[var(--brand-orange)] bg-[var(--brand-orange)]/10 text-[var(--text-main)] shadow-xs"
                          : "border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full shrink-0 shadow-2xs"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-xl bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#f56220]/25 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Create Publication & Launch Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Skip option */}
          <div className="mt-5 pt-4 border-t border-[var(--border-card)] flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span>Already have sites configured?</span>
            <button
              type="button"
              onClick={async () => {
                setLoading(true);
                try {
                  const res = await fetch("/api/teams");
                  if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data.teams) && data.teams.length > 0) {
                      window.location.href = `/dashboard/${data.teams[0].slug}`;
                      return;
                    }
                  }
                  setError("No existing publications found. Please create your first publication to continue.");
                } catch {
                  setError("Unable to verify publications. Please try again.");
                } finally {
                  setLoading(false);
                }
              }}
              className="font-bold text-[var(--text-secondary)] hover:text-[var(--brand-orange)] transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              Skip to Dashboard &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
