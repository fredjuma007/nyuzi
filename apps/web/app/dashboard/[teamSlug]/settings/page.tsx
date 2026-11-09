"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Building2,
  Save,
  Trash2,
  AlertTriangle,
  Loader2,
  Copy,
  Check,
  Layers,
} from "lucide-react";
import { useDashboard } from "../../context";

export default function TeamSettingsPage() {
  const params = useParams<{ teamSlug: string }>();
  const router = useRouter();
  const teamSlug = params?.teamSlug || "";

  const {
    teams,
    activeTeam,
    activeTeamSlug,
    setActiveTeamSlug,
    sites,
    updateTeam,
    deleteTeam,
  } = useDashboard();

  const currentTeam = teams.find((t) => t.slug === teamSlug) || activeTeam;

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [saving, setSaving] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmSlug, setDeleteConfirmSlug] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (teamSlug && teamSlug !== activeTeamSlug) {
      setActiveTeamSlug(teamSlug);
    }
  }, [teamSlug, activeTeamSlug, setActiveTeamSlug]);

  useEffect(() => {
    if (currentTeam) {
      setName(currentTeam.name || "");
      setSlug(currentTeam.slug || "");
    }
  }, [currentTeam]);

  const handleCopyId = () => {
    if (!currentTeam?.id) return;
    navigator.clipboard.writeText(currentTeam.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleSaveTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamSlug) return;
    setSaving(true);
    try {
      const updated = await updateTeam(teamSlug, {
        name: name.trim(),
        slug: slug.trim(),
      });
      if (updated && updated.slug && updated.slug !== teamSlug) {
        router.replace(`/dashboard/${updated.slug}/settings`);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmDeleteTeam = async () => {
    if (deleteConfirmSlug !== teamSlug) return;
    setDeleting(true);
    try {
      const remainingTeams = teams.filter((t) => t.slug !== teamSlug);
      const ok = await deleteTeam(teamSlug);
      if (ok) {
        setShowDeleteModal(false);
        if (remainingTeams.length > 0) {
          router.replace(`/dashboard/${remainingTeams[0].slug}`);
        } else {
          router.replace("/onboarding");
        }
      }
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-8 pb-12">
      {/* Header */}
      <div>
        <h3 className="font-serif-title text-xl font-bold text-[var(--text-main)]">
          Workspace Settings
        </h3>
        <p className="text-xs text-[var(--text-secondary)]">
          Manage your team workspace identity, URL slug, and lifecycle for{" "}
          <span className="font-semibold text-[var(--text-main)]">
            {currentTeam?.name || teamSlug}
          </span>
          .
        </p>
      </div>

      {/* General Workspace Settings */}
      <form
        onSubmit={handleSaveTeam}
        className="p-6 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] space-y-5 shadow-sm text-xs sm:text-sm"
      >
        <div className="flex items-center justify-between border-b border-[var(--border-card)] pb-4">
          <div>
            <h4 className="font-bold text-sm text-[var(--text-main)] flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[var(--brand-orange)]" />
              <span>Workspace Identity</span>
            </h4>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Customize your workspace display name and dashboard URL namespace.
            </p>
          </div>

          {currentTeam?.id && (
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[var(--text-muted)]">Team ID:</span>
              <button
                type="button"
                onClick={handleCopyId}
                className="px-2.5 py-1 rounded-lg border border-[var(--border-card)] bg-[var(--bg-card-subtle)] hover:border-[var(--brand-orange)]/40 font-mono text-xs text-[var(--text-main)] flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Copy Workspace ID"
              >
                <span>{currentTeam.id}</span>
                {copiedId ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                )}
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-bold text-xs text-[var(--text-main)] block">
              Workspace Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Fred's Projects"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] text-xs sm:text-sm focus:outline-none focus:border-[var(--brand-orange)] transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-xs text-[var(--text-main)] block">
              Workspace URL Slug
            </label>
            <div className="flex items-center rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] focus-within:border-[var(--brand-orange)] overflow-hidden">
              <span className="pl-3 pr-1 text-xs text-[var(--text-muted)] font-mono select-none">
                /dashboard/
              </span>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) =>
                  setSlug(
                    e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9-]/g, "-")
                  )
                }
                placeholder="freds-projects"
                className="w-full pr-3.5 py-2.5 bg-transparent text-[var(--text-main)] font-mono text-xs sm:text-sm focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <Layers className="w-3.5 h-3.5 text-[var(--brand-orange)]" />
            <span>
              Contains <strong className="text-[var(--text-main)]">{sites.length}</strong>{" "}
              {sites.length === 1 ? "publication" : "publications"}
            </span>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>Save Workspace</span>
          </button>
        </div>
      </form>

      {/* Danger Zone */}
      <div className="p-6 rounded-2xl border border-rose-500/30 bg-rose-500/5 space-y-4 shadow-sm text-xs sm:text-sm">
        <div>
          <h4 className="font-bold text-sm text-rose-500 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Danger Zone</span>
          </h4>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Deleting a workspace permanently removes all publications, threads, and comments inside it.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-rose-500/25 bg-[var(--bg-card)]">
          <div>
            <span className="font-bold text-xs sm:text-sm block text-[var(--text-main)]">
              Delete Workspace
            </span>
            <span className="text-xs text-[var(--text-muted)]">
              Permanently delete <strong className="text-[var(--text-main)]">{currentTeam?.name || teamSlug}</strong> and its{" "}
              {sites.length} {sites.length === 1 ? "publication" : "publications"}.
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setDeleteConfirmSlug("");
              setShowDeleteModal(true);
            }}
            className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 shadow-sm"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Workspace</span>
          </button>
        </div>
      </div>

      {/* Delete Workspace Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-rose-500/30 bg-[var(--bg-card)] p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2.5 text-rose-500">
              <Trash2 className="w-5 h-5 shrink-0" />
              <h4 className="font-serif-title font-bold text-base text-[var(--text-main)]">
                Delete Workspace Permanently?
              </h4>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              This will permanently delete the{" "}
              <strong className="text-[var(--text-main)]">{currentTeam?.name || teamSlug}</strong>{" "}
              workspace along with all publications, reader comments, and team memberships inside it. Type{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--bg-card-subtle)] font-mono text-rose-500">{teamSlug}</code>{" "}
              to confirm.
            </p>
            <input
              type="text"
              value={deleteConfirmSlug}
              onChange={(e) => setDeleteConfirmSlug(e.target.value)}
              placeholder={teamSlug}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] font-mono text-xs focus:outline-none focus:border-rose-500"
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-xl border border-[var(--border-card)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-main)] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleteConfirmSlug !== teamSlug || deleting}
                onClick={handleConfirmDeleteTeam}
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
              >
                {deleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Delete Workspace</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

