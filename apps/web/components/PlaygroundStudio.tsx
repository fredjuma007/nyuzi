"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Maximize2,
  X,
  Sun,
  Moon,
  Heart,
  ThumbsUp,
  ArrowBigUp,
  Copy,
  Check,
  Sparkles,
  MessageSquare,
  Code2,
  Zap,
} from "lucide-react";

interface PlaygroundStudioProps {
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
}

const ACCENT_COLORS = [
  { name: "Nyuzi Flame", hex: "#f56220" },
  { name: "Amber Gold", hex: "#facc15" },
  { name: "Emerald", hex: "#10b981" },
  { name: "Electric Indigo", hex: "#6366f1" },
  { name: "Midnight Cyan", hex: "#06b6d4" },
  { name: "Ruby Rose", hex: "#f43f5e" },
];

export function PlaygroundStudio({
  isModalOpen,
  onOpenModal,
  onCloseModal,
}: PlaygroundStudioProps) {
  const [mounted, setMounted] = useState(false);
  const [accentColor, setAccentColor] = useState("#f56220");
  const [previewTheme, setPreviewTheme] = useState<"dark" | "light">("dark");
  const [embedMode, setEmbedMode] = useState<"comments_reactions" | "comments_only">(
    "comments_reactions"
  );
  const [showReactionsBar, setShowReactionsBar] = useState(true);
  const [reactionsPreset, setReactionsPreset] = useState<"literary" | "general">("literary");
  const [reactionStyle, setReactionStyle] = useState<"heart" | "like" | "upvote">("heart");
  const [copied, setCopied] = useState(false);

  // Handle hydration mounting for SSR-safe portal rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync mode with reactions bar visibility
  const handleModeChange = (mode: "comments_reactions" | "comments_only") => {
    setEmbedMode(mode);
    setShowReactionsBar(mode === "comments_reactions");
  };

  // Keyboard shortcut listener for ESC to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        onCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, onCloseModal]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // Dynamically load /embed.js into #nyuzi-comments ONLY when modal is active
  useEffect(() => {
    if (!isModalOpen) {
      const existing = document.getElementById("nyuzi-playground-script");
      if (existing) existing.remove();
      return;
    }

    // 1. Remove previous script tag
    const existing = document.getElementById("nyuzi-playground-script");
    if (existing) existing.remove();

    // 2. Clear previous widget container contents and reset initialized flag
    const container = document.getElementById("nyuzi-comments");
    if (container) {
      delete (container as any).__nyuzi_initialized;
      container.innerHTML = "";
    }

    // 3. Mount fresh script tag with dynamic dataset attributes
    const script = document.createElement("script");
    script.id = "nyuzi-playground-script";
    script.src = "/embed.js";
    script.async = true;
    script.setAttribute("data-site-id", "demo");
    script.setAttribute("data-thread-url", "https://nyuzi-yap.vercel.app/demo");
    script.setAttribute("data-thread-title", "The Art of Thoughtful Reading");
    script.setAttribute("data-accent-color", accentColor);
    script.setAttribute("data-reaction", reactionStyle);
    script.setAttribute("data-theme", previewTheme);
    script.setAttribute("data-reactions-bar", showReactionsBar ? "true" : "false");
    script.setAttribute(
      "data-reactions-prompt",
      reactionsPreset === "literary" ? "How was this chapter?" : "How was this article?"
    );
    script.setAttribute("data-reactions-preset", reactionsPreset);

    // Timeout ensures modal DOM container has rendered in React before script appends
    const timer = setTimeout(() => {
      document.body.appendChild(script);
    }, 50);

    return () => {
      clearTimeout(timer);
      const active = document.getElementById("nyuzi-playground-script");
      if (active) active.remove();
    };
  }, [
    accentColor,
    reactionStyle,
    previewTheme,
    showReactionsBar,
    reactionsPreset,
    isModalOpen,
  ]);

  const embedSnippet = `<div id="nyuzi-comments"\n  data-site-id="my-publication"\n  data-accent-color="${accentColor}"\n  data-theme="${previewTheme}"\n  data-reaction="${reactionStyle}"${
    showReactionsBar
      ? `\n  data-reactions-bar="true"\n  data-reactions-preset="${reactionsPreset}"`
      : `\n  data-reactions-bar="false"`
  }\n></div>\n<script src="https://nyuzi-yap.vercel.app/embed.js" async></script>`;

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(embedSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <>
      {/* 1. INLINE STUDIO TEASER CARD (Zero Scroll Hijacking / Clean Smooth Scroll) */}
      <div className="relative w-full max-w-5xl mx-auto rounded-3xl border border-[var(--border-card)] bg-gradient-to-b from-[var(--bg-card)] to-[var(--bg-card-subtle)] p-6 sm:p-10 lg:p-12 shadow-xl overflow-hidden text-center group">
        {/* Soft Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[var(--brand-orange)]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4 sm:space-y-6">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--brand-orange)]/10 border border-[var(--brand-orange)]/25 text-[var(--brand-orange)] text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dedicated Sandbox Studio</span>
          </div>

          <h3 className="font-serif-title text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-main)]">
            Experience Nyuzi live in your browser.
          </h3>

          <p className="text-xs sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto">
            Test real-time commenting, toggle light & dark themes, try sentiment reactions, and generate your custom embed code in a focused, distraction-free pop-up studio.
          </p>

          {/* Feature Highlights Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-[var(--text-muted)]">
            <span className="px-3 py-1 rounded-lg border border-[var(--border-card)] bg-[var(--bg-card)]/80 flex items-center gap-1.5 font-medium">
              <Sun className="w-3 h-3 text-amber-500" />
              <span>Instant Light & Dark Switch</span>
            </span>
            <span className="px-3 py-1 rounded-lg border border-[var(--border-card)] bg-[var(--bg-card)]/80 flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3 h-3 text-[var(--brand-orange)]" />
              <span>Sentiment Reaction Bars</span>
            </span>
            <span className="px-3 py-1 rounded-lg border border-[var(--border-card)] bg-[var(--bg-card)]/80 flex items-center gap-1.5 font-medium">
              <Code2 className="w-3 h-3 text-emerald-500" />
              <span>Live Dynamic 2-Line Embed</span>
            </span>
          </div>

          {/* Primary Launch CTA */}
          <div className="pt-2 sm:pt-4 flex justify-center">
            <button
              onClick={onOpenModal}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-bold text-sm sm:text-base shadow-xl shadow-[#f56220]/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Launch Interactive Studio</span>
              <Maximize2 className="w-3.5 h-3.5 ml-1 opacity-80" />
            </button>
          </div>
        </div>

        {/* Decorative App Window Teaser Mockup (Clickable, Zero Scroll Bars) */}
        <div
          onClick={onOpenModal}
          className="mt-8 sm:mt-10 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] p-3.5 sm:p-5 shadow-lg cursor-pointer transition-all hover:border-[var(--brand-orange)]/60 hover:shadow-xl relative overflow-hidden select-none"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-card)]/70 text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[11px] font-mono ml-2">nyuzi-studio-sandbox.app</span>
            </div>
            <span className="text-[11px] font-bold text-[var(--brand-orange)] flex items-center gap-1 group-hover:underline">
              <span>Click anywhere to open Studio</span>
              <Maximize2 className="w-3 h-3" />
            </span>
          </div>

          <div className="pt-4 grid grid-cols-1 md:grid-cols-12 gap-4 text-left pointer-events-none opacity-85">
            <div className="md:col-span-4 p-3.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-card)] space-y-2.5">
              <div className="h-4 w-28 bg-[var(--text-muted)]/20 rounded" />
              <div className="h-7 w-full bg-[var(--text-muted)]/10 rounded-lg" />
              <div className="h-4 w-24 bg-[var(--text-muted)]/20 rounded mt-3" />
              <div className="flex gap-2">
                <span className="w-6 h-6 rounded-full bg-[var(--brand-orange)] shadow-xs" />
                <span className="w-6 h-6 rounded-full bg-amber-400 opacity-70" />
                <span className="w-6 h-6 rounded-full bg-emerald-500 opacity-70" />
                <span className="w-6 h-6 rounded-full bg-indigo-500 opacity-70" />
              </div>
            </div>
            <div className="md:col-span-8 p-3.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-card)] space-y-2.5">
              <div className="h-5 w-48 bg-[var(--text-muted)]/20 rounded" />
              <div className="h-3 w-full bg-[var(--text-muted)]/10 rounded" />
              <div className="h-3 w-3/4 bg-[var(--text-muted)]/10 rounded" />
              <div className="h-10 w-full rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)] mt-2 flex items-center px-3 text-[11px] text-[var(--text-muted)]">
                Write a comment...
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FULLSCREEN POP-UP STUDIO MODAL (Mounted via Portal directly to body to clear navbar stacking context) */}
      {mounted && isModalOpen && typeof document !== "undefined"
        ? createPortal(
            <div
              onClick={(e) => {
                if (e.target === e.currentTarget) onCloseModal();
              }}
              className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-in fade-in duration-200"
            >
              {/* Floating quick-exit button in the top-right corner of the viewport */}
              <button
                onClick={onCloseModal}
                className="fixed top-3 right-3 sm:top-5 sm:right-5 z-[10000] p-2.5 rounded-full bg-neutral-900/90 hover:bg-rose-600 text-white border border-white/20 hover:border-rose-500 shadow-2xl flex items-center justify-center transition-all cursor-pointer group"
                aria-label="Close Studio"
                title="Close Studio (ESC)"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
              </button>

              <div className="w-full max-w-7xl h-[96vh] sm:h-[94vh] bg-[var(--bg-card)] rounded-2xl border border-[var(--border-card)] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Modal Header Bar (Strictly Above Everything) */}
                <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[var(--border-card)] bg-[var(--bg-card)] select-none">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[var(--brand-orange)] text-white flex items-center justify-center font-black text-sm shadow-xs">
                  Ny
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-[var(--text-main)] flex items-center gap-2">
                    <span>Nyuzi Sandbox Studio</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      Edge Synced
                    </span>
                  </h2>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    Interactive sandbox • Customize themes and test real discussions without page drag
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onCloseModal}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] hover:bg-rose-500 hover:text-white hover:border-rose-500 text-[var(--text-main)] text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  <X className="w-4 h-4" />
                  <span>Close Studio</span>
                  <span className="text-[10px] opacity-70 bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded ml-0.5">
                    ESC
                  </span>
                </button>
              </div>
            </div>

            {/* Modal 2-Pane Body */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Left Configurator Sidebar */}
              <div className="w-full md:w-80 lg:w-[330px] shrink-0 border-b md:border-b-0 md:border-r border-[var(--border-card)] bg-[var(--bg-card)] p-4 sm:p-5 space-y-5 overflow-y-auto overscroll-contain h-full">
                {/* 1. Embed Mode Switch */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                    Embed Layout
                  </label>
                  <div className="grid grid-cols-2 p-1 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-card)] gap-1">
                    <button
                      onClick={() => handleModeChange("comments_reactions")}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        embedMode === "comments_reactions"
                          ? "bg-[var(--text-main)] text-[var(--bg-page)] shadow-xs"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-main)]"
                      }`}
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Comments + Sentiments</span>
                    </button>
                    <button
                      onClick={() => handleModeChange("comments_only")}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        embedMode === "comments_only"
                          ? "bg-[var(--text-main)] text-[var(--bg-page)] shadow-xs"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-main)]"
                      }`}
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>Comments Only</span>
                    </button>
                  </div>
                </div>

                {/* 2. Theme Toggle (Light / Dark) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                      Widget Theme
                    </label>
                    <span className="text-[10px] text-[var(--text-muted)]">Live preview</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPreviewTheme("dark")}
                      className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        previewTheme === "dark"
                          ? "border-[var(--brand-orange)] bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] font-bold shadow-xs"
                          : "border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:border-[var(--brand-orange)]/50"
                      }`}
                    >
                      <Moon className="w-3.5 h-3.5" />
                      <span>Dark</span>
                    </button>
                    <button
                      onClick={() => setPreviewTheme("light")}
                      className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        previewTheme === "light"
                          ? "border-[var(--brand-orange)] bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] font-bold shadow-xs"
                          : "border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:border-[var(--brand-orange)]/50"
                      }`}
                    >
                      <Sun className="w-3.5 h-3.5" />
                      <span>Light</span>
                    </button>
                  </div>
                </div>

                {/* 3. Accent Color Swatches */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                      Accent Color
                    </label>
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">{accentColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2.5">
                    {ACCENT_COLORS.map((color) => (
                      <button
                        key={color.hex}
                        onClick={() => setAccentColor(color.hex)}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                          accentColor.toLowerCase() === color.hex.toLowerCase()
                            ? "ring-2 ring-offset-2 ring-[var(--brand-orange)] scale-110 shadow-sm"
                            : "opacity-80 hover:opacity-100 hover:scale-105"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {accentColor.toLowerCase() === color.hex.toLowerCase() && (
                          <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-lg shrink-0 border border-[var(--border-card)] shadow-2xs"
                      style={{ backgroundColor: accentColor }}
                    />
                    <input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      placeholder="#f56220"
                      className="flex-1 px-3 py-1.5 rounded-lg border border-[var(--border-card)] bg-[var(--bg-input)] text-xs font-mono font-medium focus:outline-none focus:border-[var(--brand-orange)]"
                    />
                  </div>
                </div>

                {/* 4. Top Reactions Bar Settings */}
                {showReactionsBar && (
                  <div className="p-3 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-card)] space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[var(--text-main)] flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-[var(--brand-orange)]" />
                        Sentiment Sentiments
                      </span>
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        Active
                      </span>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-[var(--text-secondary)]">Preset</label>
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          onClick={() => setReactionsPreset("literary")}
                          className={`px-2 py-1.5 rounded-lg text-[11px] font-medium border text-left cursor-pointer transition-all ${
                            reactionsPreset === "literary"
                              ? "border-[var(--brand-orange)] bg-[var(--bg-card)] text-[var(--brand-orange)] font-bold shadow-2xs"
                              : "border-[var(--border-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-card)]"
                          }`}
                        >
                          Literary
                        </button>
                        <button
                          onClick={() => setReactionsPreset("general")}
                          className={`px-2 py-1.5 rounded-lg text-[11px] font-medium border text-left cursor-pointer transition-all ${
                            reactionsPreset === "general"
                              ? "border-[var(--brand-orange)] bg-[var(--brand-orange)] text-[var(--brand-orange)] font-bold shadow-2xs"
                              : "border-[var(--border-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-card)]"
                          }`}
                        >
                          General
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. Comment Reaction Style */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                    Comment Reaction Icon
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setReactionStyle("heart")}
                      className={`px-2 py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        reactionStyle === "heart"
                          ? "border-[var(--brand-orange)] bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] font-bold shadow-xs"
                          : "border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:border-[var(--brand-orange)]/50"
                      }`}
                    >
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
                      <span>Heart</span>
                    </button>
                    <button
                      onClick={() => setReactionStyle("like")}
                      className={`px-2 py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        reactionStyle === "like"
                          ? "border-[var(--brand-orange)] bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] font-bold shadow-xs"
                          : "border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:border-[var(--brand-orange)]/50"
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-blue-500" />
                      <span>Like</span>
                    </button>
                    <button
                      onClick={() => setReactionStyle("upvote")}
                      className={`px-2 py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        reactionStyle === "upvote"
                          ? "border-[var(--brand-orange)] bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] font-bold shadow-xs"
                          : "border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:border-[var(--brand-orange)]/50"
                      }`}
                    >
                      <ArrowBigUp className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Upvote</span>
                    </button>
                  </div>
                </div>

                {/* 6. Live Generated Embed Snippet */}
                <div className="pt-2 border-t border-[var(--border-card)]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1">
                      <Code2 className="w-3.5 h-3.5 text-[var(--brand-orange)]" />
                      Embed Snippet
                    </span>
                    <button
                      onClick={copyCode}
                      className="text-[11px] font-bold text-[var(--brand-orange)] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span className="text-emerald-500">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-2.5 rounded-xl bg-[#090605] text-[#f8fafc] text-[10px] font-mono leading-relaxed overflow-x-auto border border-white/5">
                    <code>{embedSnippet}</code>
                  </pre>
                </div>
              </div>

              {/* Right Isolated Preview Stage */}
              <div
                className={`flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 lg:p-8 h-full transition-colors duration-200 ${
                  previewTheme === "light"
                    ? "bg-slate-100 text-slate-900"
                    : "bg-[var(--bg-page)]/80 text-[var(--text-main)]"
                }`}
              >
                <div className="max-w-3xl mx-auto space-y-6">
                  {/* Sample Article Context Card */}
                  <div
                    className={`p-4 sm:p-6 rounded-2xl border transition-colors duration-200 shadow-sm ${
                      previewTheme === "light"
                        ? "bg-white border-slate-200"
                        : "bg-[var(--bg-card)] border-[var(--border-card)]"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${accentColor}18`,
                          color: accentColor,
                        }}
                      >
                        Literary Essay
                      </span>
                      <span className="text-xs text-[var(--text-muted)]">&bull;</span>
                      <span className="text-[11px] text-[var(--text-muted)]">4 min read</span>
                    </div>

                    <h3 className="font-serif-title text-xl sm:text-2xl font-bold mb-2">
                      The Art of Thoughtful Reading
                    </h3>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                        previewTheme === "light" ? "text-slate-600" : "text-[var(--text-secondary)]"
                      }`}
                    >
                      In an age of relentless notification pings and algorithmic feeds, deep literary immersion
                      is a quiet act of rebellion. What does it take to truly dwell inside an author&apos;s
                      sentences?
                    </p>

                    <div
                      className={`pt-3 border-t flex items-center justify-between text-[11px] ${
                        previewTheme === "light"
                          ? "border-slate-100 text-slate-500"
                          : "border-[var(--border-card)]/60 text-[var(--text-muted)]"
                      }`}
                    >
                      <span>By Nekesa M. & Brenda F.</span>
                      <span>Live Interactive Demo</span>
                    </div>
                  </div>

                  {/* Target Nyuzi Comment Widget Mount Point */}
                  <div
                    className={`rounded-2xl border p-4 sm:p-6 shadow-md transition-colors duration-200 ${
                      previewTheme === "light"
                        ? "bg-white border-slate-200"
                        : "bg-[var(--bg-card)] border-[var(--border-card)]"
                    }`}
                  >
                    <div
                      id="nyuzi-comments"
                      data-site-id="demo"
                      data-thread-url="https://nyuzi-yap.vercel.app/demo"
                      data-thread-title="The Art of Thoughtful Reading"
                      data-accent-color={accentColor}
                      data-reaction={reactionStyle}
                      data-theme={previewTheme}
                      data-reactions-bar={showReactionsBar ? "true" : "false"}
                      data-reactions-prompt={
                        reactionsPreset === "literary" ? "How was this chapter?" : "How was this article?"
                      }
                      data-reactions-preset={reactionsPreset}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      ) : null}
    </>
  );
}
