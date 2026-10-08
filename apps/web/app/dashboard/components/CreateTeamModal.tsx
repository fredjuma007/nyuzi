"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { X, Users, Sparkles, Loader2, ArrowRight } from "lucide-react";
import { useDashboard } from "../context";

export function CreateTeamModal() {
  const router = useRouter();
  const {
    isCreateTeamModalOpen,
    setIsCreateTeamModalOpen,
    createNewTeam,
  } = useDashboard();

  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCreateTeamModalOpen) {
        setIsCreateTeamModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCreateTeamModalOpen, setIsCreateTeamModalOpen]);

  // Lock scroll
  useEffect(() => {
    if (isCreateTeamModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCreateTeamModalOpen]);

  if (!mounted || !isCreateTeamModalOpen) return null;

  const previewSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 24);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Team name is required.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const team = await createNewTeam(name.trim());
      if (team) {
        setName("");
        setIsCreateTeamModalOpen(false);
        router.push(`/dashboard/${team.slug}`);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to create team");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => !loading && setIsCreateTeamModalOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md rounded-3xl border border-[var(--border-card)] bg-[var(--bg-card)] p-6 sm:p-8 shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--brand-orange)]/10 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setIsCreateTeamModalOpen(false)}
          disabled={loading}
          className="absolute top-5 right-5 p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[var(--brand-orange)]/30 bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] text-[11px] font-bold">
            <Users className="w-3 h-3" />
            <span>Organization Scope</span>
          </div>
          <h2 className="font-serif-title text-2xl font-bold text-[var(--text-main)]">
            Create Team Workspace
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Collaborate on publications with co-editors, reviewers, and moderators.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
              Team or Agency Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Reserved Circle Media"
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] text-sm focus:outline-none focus:border-[var(--brand-orange)] transition-colors placeholder:text-[var(--text-muted)]/50 font-medium"
            />
          </div>

          {/* URL Slug preview */}
          {name.trim() && (
            <div className="p-3 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-xs text-[var(--text-muted)]">
              <span className="block text-[10px] uppercase font-bold tracking-wider mb-0.5 text-[var(--text-secondary)]">
                Team URL Preview
              </span>
              <code className="text-[11px] font-mono text-[var(--brand-orange)]">
                /dashboard/{previewSlug || "team-slug"}
              </code>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#f56220]/25 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Create Team Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
