"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  ShieldCheck,
  Loader2,
  Copy,
  Check,
  Save,
  Trash2,
  AlertTriangle,
  Globe,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useDashboard } from "../context";

interface SettingsTabProps {
  selectedSite: string;
}

export function SettingsTab({ selectedSite }: SettingsTabProps) {
  const router = useRouter();
  const {
    sites,
    activeTeamSlug,
    updateSite,
    deleteSite,
    purgeSiteDiscussions,
  } = useDashboard();

  const currentSite = sites.find((s) => s.id === selectedSite);
  const userRole = currentSite?.userRole || "owner";
  const canManageSite = userRole === "owner" || userRole === "admin";
  const isSiteOwner = userRole === "owner";

  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [accentColor, setAccentColor] = useState("#f56220");
  const [moderationRequired, setModerationRequired] = useState(false);
  const [turnstileEnabled, setTurnstileEnabled] = useState(false);

  const [saving, setSaving] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  // Danger Zone Modals
  const [showPurgeModal, setShowPurgeModal] = useState(false);
  const [purgeConfirmText, setPurgeConfirmText] = useState("");
  const [purging, setPurging] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (currentSite) {
      setName(currentSite.name || "");
      setDomain(currentSite.domain || "");
      setModerationRequired(Boolean(currentSite.moderationRequired));
      setTurnstileEnabled(Boolean(currentSite.turnstileEnabled));
      try {
        const parsed = currentSite.settings ? JSON.parse(currentSite.settings) : {};
        setAccentColor(parsed.accentColor || "#f56220");
      } catch {
        setAccentColor("#f56220");
      }
    } else if (selectedSite === "trc254") {
      setName("The Reading Circle");
      setDomain("readingcircle254.com");
      setAccentColor("#f56220");
    }
  }, [currentSite, selectedSite]);

  const handleCopyId = () => {
    navigator.clipboard.writeText(selectedSite);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleSaveGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSite || !canManageSite) return;
    setSaving(true);
    try {
      await updateSite(selectedSite, {
        name: name.trim(),
        domain: domain.trim(),
        moderationRequired,
        turnstileEnabled,
        accentColor,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleToggleRule = async (
    field: "moderationRequired" | "turnstileEnabled",
    val: boolean
  ) => {
    if (!canManageSite) return;
    if (field === "moderationRequired") setModerationRequired(val);
    if (field === "turnstileEnabled") setTurnstileEnabled(val);
    if (selectedSite) {
      await updateSite(selectedSite, { [field]: val });
    }
  };

  const handleConfirmPurge = async () => {
    if (purgeConfirmText !== selectedSite) return;
    setPurging(true);
    try {
      const ok = await purgeSiteDiscussions(selectedSite);
      if (ok) {
        setShowPurgeModal(false);
        setPurgeConfirmText("");
      }
    } finally {
      setPurging(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirmText !== selectedSite) return;
    setDeleting(true);
    try {
      const ok = await deleteSite(selectedSite);
      if (ok) {
        setShowDeleteModal(false);
        router.replace(`/dashboard/${activeTeamSlug}`);
      }
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="font-serif-title text-xl font-bold text-[var(--text-main)]">
            Publication Settings
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Configure domain origins, edge moderation rules, and lifecycle controls for{" "}
            <span className="font-semibold text-[var(--text-main)]">
              {currentSite?.name || selectedSite}
            </span>
            .
          </p>
        </div>

        <span className="self-start sm:self-auto px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-[var(--brand-orange)]/30 bg-[var(--brand-orange)]/10 text-[var(--brand-orange)]">
          Role: {userRole}
        </span>
      </div>

      {/* General Publication Details */}
      <form
        onSubmit={handleSaveGeneral}
        className="p-6 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] space-y-5 shadow-sm text-xs sm:text-sm"
      >
        <div className="flex items-center justify-between border-b border-[var(--border-card)] pb-4">
          <div>
            <h4 className="font-bold text-sm text-[var(--text-main)] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[var(--brand-orange)]" />
              <span>General Configuration</span>
            </h4>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Update your publication display name, allowed domain origin, and brand color.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[var(--text-muted)]">Site ID:</span>
            <button
              type="button"
              onClick={handleCopyId}
              className="px-2.5 py-1 rounded-lg border border-[var(--border-card)] bg-[var(--bg-card-subtle)] hover:border-[var(--brand-orange)]/40 font-mono text-xs text-[var(--text-main)] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy Publication ID"
            >
              <span>{selectedSite}</span>
              {copiedId ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-bold text-xs text-[var(--text-main)] block">
              Publication Name
            </label>
            <input
              type="text"
              required
              disabled={!canManageSite}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. The Reading Circle"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] text-xs sm:text-sm focus:outline-none focus:border-[var(--brand-orange)] transition-colors disabled:opacity-60"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-xs text-[var(--text-main)] block">
              Authorized Domain Origin
            </label>
            <input
              type="text"
              required
              disabled={!canManageSite}
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="e.g. readingcircle254.com or *"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] font-mono text-xs sm:text-sm focus:outline-none focus:border-[var(--brand-orange)] transition-colors disabled:opacity-60"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="font-bold text-xs text-[var(--text-main)] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[var(--brand-orange)]" />
            <span>Default Brand Accent Color</span>
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              disabled={!canManageSite}
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="w-10 h-10 rounded-xl border border-[var(--border-card)] bg-transparent cursor-pointer p-0.5 disabled:opacity-60"
            />
            <input
              type="text"
              disabled={!canManageSite}
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="w-36 px-3.5 py-2 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] font-mono text-xs focus:outline-none focus:border-[var(--brand-orange)] disabled:opacity-60"
            />
            <span className="text-xs text-[var(--text-muted)]">
              Used as the default highlight color in the embedded discussion widget.
            </span>
          </div>
        </div>

        {canManageSite && (
          <div className="pt-2 flex justify-end">
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
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </form>

      {/* Moderation & Protection Rules */}
      <div className="p-6 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] space-y-5 shadow-sm text-xs sm:text-sm">
        <div>
          <h4 className="font-bold text-sm text-[var(--text-main)] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Moderation & Security Rules</span>
          </h4>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Control how incoming reader comments are verified and published on the edge.
          </p>
        </div>

        <div className="space-y-4 pt-1">
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)]">
            <div className="pr-4">
              <span className="font-bold text-xs sm:text-sm block text-[var(--text-main)]">
                Pre-Moderation Queue Guard
              </span>
              <span className="text-xs text-[var(--text-muted)]">
                Hold new reader comments as &ldquo;Pending&rdquo; for manual approval before making them public.
              </span>
            </div>
            <input
              type="checkbox"
              disabled={!canManageSite}
              checked={moderationRequired}
              onChange={(e) => handleToggleRule("moderationRequired", e.target.checked)}
              className="w-5 h-5 accent-[var(--brand-orange)] rounded cursor-pointer shrink-0 disabled:opacity-50"
            />
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)]">
            <div className="pr-4">
              <span className="font-bold text-xs sm:text-sm block text-[var(--text-main)]">
                Cloudflare Turnstile Bot Shield
              </span>
              <span className="text-xs text-[var(--text-muted)]">
                Require invisible Cloudflare Turnstile verification before accepting new comment writes.
              </span>
            </div>
            <input
              type="checkbox"
              disabled={!canManageSite}
              checked={turnstileEnabled}
              onChange={(e) => handleToggleRule("turnstileEnabled", e.target.checked)}
              className="w-5 h-5 accent-[var(--brand-orange)] rounded cursor-pointer shrink-0 disabled:opacity-50"
            />
          </div>

          <div className="space-y-1.5 pt-1">
            <label className="font-bold text-xs text-[var(--text-main)] block">
              Verified Notification Subdomain
            </label>
            <div className="flex items-center justify-between p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400">
              <div className="flex items-center gap-2 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="font-mono font-bold">
                  notifications.{domain && domain !== "*" ? domain : "readingcircle254.com"}
                </span>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider">Edge Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone (Owner Only) */}
      {isSiteOwner && (
        <div className="p-6 rounded-2xl border border-rose-500/30 bg-rose-500/5 space-y-5 shadow-sm text-xs sm:text-sm">
          <div>
            <h4 className="font-bold text-sm text-rose-500 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Danger Zone</span>
            </h4>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Irreversible actions that affect live discussions and data for this publication.
            </p>
          </div>

          <div className="space-y-3 pt-1">
            {/* Purge All Discussions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)]">
              <div>
                <span className="font-bold text-xs sm:text-sm block text-[var(--text-main)]">
                  Purge All Discussions & Comments
                </span>
                <span className="text-xs text-[var(--text-muted)]">
                  Permanently remove all threads and comments for this publication while keeping the site and author roster intact.
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setPurgeConfirmText("");
                  setShowPurgeModal(true);
                }}
                className="px-4 py-2 rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 text-xs font-bold transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Purge Data</span>
              </button>
            </div>

            {/* Delete Publication */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-rose-500/25 bg-[var(--bg-card)]">
              <div>
                <span className="font-bold text-xs sm:text-sm block text-[var(--text-main)]">
                  Delete Publication
                </span>
                <span className="text-xs text-[var(--text-muted)]">
                  Permanently delete <strong className="text-[var(--text-main)]">{currentSite?.name || selectedSite}</strong>, its embed configuration, collaborators, author roster, and all discussion threads.
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setDeleteConfirmText("");
                  setShowDeleteModal(true);
                }}
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 shadow-sm"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Publication</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Purge Confirmation Modal */}
      {showPurgeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2.5 text-amber-500">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <h4 className="font-serif-title font-bold text-base text-[var(--text-main)]">
                Purge All Publication Discussions?
              </h4>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              This will permanently wipe all threads and comments for{" "}
              <strong className="text-[var(--text-main)]">{currentSite?.name || selectedSite}</strong>.
              Please type <code className="px-1.5 py-0.5 rounded bg-[var(--bg-card-subtle)] font-mono text-amber-500">{selectedSite}</code> to confirm.
            </p>
            <input
              type="text"
              value={purgeConfirmText}
              onChange={(e) => setPurgeConfirmText(e.target.value)}
              placeholder={selectedSite}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] font-mono text-xs focus:outline-none focus:border-amber-500"
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowPurgeModal(false)}
                className="px-4 py-2 rounded-xl border border-[var(--border-card)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-main)] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={purgeConfirmText !== selectedSite || purging}
                onClick={handleConfirmPurge}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
              >
                {purging && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Purge All Discussions</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Publication Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-rose-500/30 bg-[var(--bg-card)] p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2.5 text-rose-500">
              <Trash2 className="w-5 h-5 shrink-0" />
              <h4 className="font-serif-title font-bold text-base text-[var(--text-main)]">
                Delete Publication Permanently?
              </h4>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              This action cannot be undone. It will permanently delete{" "}
              <strong className="text-[var(--text-main)]">{currentSite?.name || selectedSite}</strong>,
              all reader comments, discussion threads, collaborators, and verified author entries. Type{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--bg-card-subtle)] font-mono text-rose-500">{selectedSite}</code>{" "}
              below to confirm.
            </p>
            <input
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder={selectedSite}
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
                disabled={deleteConfirmText !== selectedSite || deleting}
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
              >
                {deleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Delete Publication</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
