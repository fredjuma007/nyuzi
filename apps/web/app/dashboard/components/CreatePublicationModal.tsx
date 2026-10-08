"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Sparkles, Globe, Loader2, ArrowRight } from "lucide-react";
import { useDashboard } from "../context";

const ACCENT_COLORS = [
  { name: "Nyuzi Flame", hex: "#f56220" },
  { name: "Amber Gold", hex: "#facc15" },
  { name: "Emerald", hex: "#10b981" },
  { name: "Electric Indigo", hex: "#6366f1" },
  { name: "Midnight Cyan", hex: "#06b6d4" },
  { name: "Ruby Rose", hex: "#f43f5e" },
];

export function CreatePublicationModal() {
  const { isCreateSiteModalOpen, setIsCreateSiteModalOpen, createNewSite } = useDashboard();
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [accentColor, setAccentColor] = useState("#f56220");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCreateSiteModalOpen) {
        setIsCreateSiteModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCreateSiteModalOpen, setIsCreateSiteModalOpen]);

  // Lock scroll
  useEffect(() => {
    if (isCreateSiteModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCreateSiteModalOpen]);

  if (!mounted || !isCreateSiteModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !domain.trim()) {
      setError("Both publication name and website domain are required.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const site = await createNewSite(name.trim(), domain.trim(), accentColor);
      if (site) {
        setName("");
        setDomain("");
        setAccentColor("#f56220");
        setIsCreateSiteModalOpen(false);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to create publication");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => !loading && setIsCreateSiteModalOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg rounded-3xl border border-[var(--border-card)] bg-[var(--bg-card)] p-6 sm:p-8 shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--brand-orange)]/10 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setIsCreateSiteModalOpen(false)}
          disabled={loading}
          className="absolute top-5 right-5 p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[var(--brand-orange)]/30 bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] text-[11px] font-bold">
            <Sparkles className="w-3 h-3" />
            <span>New Publication</span>
          </div>
          <h2 className="font-serif-title text-2xl font-bold text-[var(--text-main)]">
            Connect a Publication
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Add your blog, magazine, or digital salon to generate your live edge commenting snippet.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Publication Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
              Publication Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. The Reading Circle"
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] text-sm focus:outline-none focus:border-[var(--brand-orange)] transition-colors placeholder:text-[var(--text-muted)]/50 font-medium"
            />
          </div>

          {/* Website Domain */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5 flex items-center justify-between">
              <span>Website Domain</span>
              <span className="text-[10px] text-[var(--text-muted)] normal-case font-normal">
                (allowed origin, e.g. mysite.com or localhost)
              </span>
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="e.g. readingcircle254.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] text-sm focus:outline-none focus:border-[var(--brand-orange)] transition-colors placeholder:text-[var(--text-muted)]/50 font-mono text-xs"
              />
            </div>
          </div>

          {/* Brand Accent Color */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
              Brand Accent Color
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {ACCENT_COLORS.map((c) => {
                const isSelected = accentColor === c.hex;
                return (
                  <button
                    type="button"
                    key={c.hex}
                    onClick={() => setAccentColor(c.hex)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? "border-[var(--brand-orange)] bg-[var(--brand-orange)]/10 text-[var(--text-main)]"
                        : "border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="text-[11px]">{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit CTA */}
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
                  <span>Create Publication</span>
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
