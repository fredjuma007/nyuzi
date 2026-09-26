"use client";

import React, { useState, useEffect } from "react";
import {
  Palette,
  Sun,
  Moon,
  ThumbsUp,
  Heart,
  Sliders,
  Sparkles,
  Check,
  Copy,
  Layers,
  FileText,
  RotateCcw,
} from "lucide-react";

interface EmbedStudioTabProps {
  selectedSite: string;
  showToast: (msg: string) => void;
}

export function EmbedStudioTab({ selectedSite, showToast }: EmbedStudioTabProps) {
  // Mode Tab: Light vs Dark
  const [studioColorMode, setStudioColorMode] = useState<"light" | "dark">("light");

  // Tokens State
  const [accentColor, setAccentColor] = useState(selectedSite === "trc254" ? "#15803d" : "#f56220");
  const [canvasBg, setCanvasBg] = useState("");
  const [cardBg, setCardBg] = useState("");
  const [textColor, setTextColor] = useState("");
  const [borderColor, setBorderColor] = useState("");
  const [radiusValue, setRadiusValue] = useState("0.75rem");
  const [reactionType, setReactionType] = useState<"like" | "heart" | "upvote">("like");
  const [themeMode, setThemeMode] = useState<"auto" | "light" | "dark" | "sepia">("auto");
  const [bgMode, setBgMode] = useState<"transparent" | "card">("transparent");
  const [showReactionsBar, setShowReactionsBar] = useState(true);
  const [copied, setCopied] = useState(false);
  const [mobileTab, setMobileTab] = useState<"controls" | "preview">("controls");

  // Hyvor-style Quick Color Presets (Intelligently adapts to active Studio theme mode)
  const curatedPalettes = [
    {
      name: "TRC Literary Emerald",
      accent: studioColorMode === "dark" ? "#10b981" : "#15803d",
      bg: "transparent",
      theme: "auto",
      desc: "Designed for The Reading Circle blog",
    },
    {
      name: "Nyuzi Amber Glow",
      accent: "#f56220",
      bg: "transparent",
      theme: "auto",
      desc: "Signature energetic publication tone",
    },
    {
      name: "Sepia Book Parchment",
      accent: "#854d0e",
      bg: "#f4ead8",
      cardBg: "#fbf3e4",
      textColor: "#2b2118",
      borderColor: "#e2d4bc",
      theme: "sepia",
      desc: "Warm paper tone for book lovers",
    },
    {
      name: "Obsidian Electric",
      accent: "#6366f1",
      bg: "#090605",
      cardBg: "#14100e",
      textColor: "#f8fafc",
      borderColor: "#26201c",
      theme: "dark",
      desc: "High-contrast dark mode for tech publications",
    },
    {
      name: "Minimalist Mono",
      accent: studioColorMode === "dark" ? "#f8fafc" : "#0f172a",
      bg: studioColorMode === "dark" ? "#090605" : "#ffffff",
      cardBg: studioColorMode === "dark" ? "#14100e" : "#f8fafc",
      textColor: studioColorMode === "dark" ? "#f8fafc" : "#0f172a",
      borderColor: studioColorMode === "dark" ? "#26201c" : "#e2e8f0",
      theme: studioColorMode === "dark" ? "dark" : "light",
      desc: "Editorial Substack black & white simplicity",
    },
  ];

  // Apply a curated palette
  const applyPalette = (p: (typeof curatedPalettes)[0]) => {
    setAccentColor(p.accent);
    setCanvasBg(p.bg || "");
    setCardBg(p.cardBg || "");
    setTextColor(p.textColor || "");
    setBorderColor(p.borderColor || "");
    if (p.theme === "auto" || !p.theme) {
      setThemeMode(studioColorMode);
    } else {
      setThemeMode(p.theme as any);
      if (p.theme === "dark" || p.theme === "light") {
        setStudioColorMode(p.theme);
      }
    }
    showToast(`Applied ${p.name} palette`);
  };

  // Toggle Light / Dark Studio Preview & Widget Mode
  const handleToggleColorMode = (mode: "light" | "dark") => {
    setStudioColorMode(mode);
    setThemeMode(mode);
    // If using TRC Emerald, adjust accent vibrancy for dark/light contrast
    if (accentColor === "#15803d" && mode === "dark") {
      setAccentColor("#10b981");
    } else if (accentColor === "#10b981" && mode === "light") {
      setAccentColor("#15803d");
    }
    // Clear conflicting overrides if switching modes
    if (mode === "dark" && (textColor === "#0f172a" || cardBg === "#ffffff" || cardBg === "#f8fafc" || canvasBg === "#ffffff")) {
      setTextColor("");
      setCardBg("");
      setCanvasBg("");
      setBorderColor("");
    } else if (mode === "light" && (textColor === "#f8fafc" || cardBg === "#14100e" || canvasBg === "#090605")) {
      setTextColor("");
      setCardBg("");
      setCanvasBg("");
      setBorderColor("");
    }
  };

  // Reset to default
  const handleReset = () => {
    setAccentColor(selectedSite === "trc254" ? (studioColorMode === "dark" ? "#10b981" : "#15803d") : "#f56220");
    setCanvasBg("");
    setCardBg("");
    setTextColor("");
    setBorderColor("");
    setRadiusValue("0.75rem");
    setReactionType("like");
    setThemeMode("auto");
    setBgMode("transparent");
    setShowReactionsBar(true);
    showToast("Reset studio styles to default");
  };

  // Generated Embed Snippet
  const embedScriptCode = `<div id="nyuzi-comments"
  data-site-id="${selectedSite}"
  data-accent-color="${accentColor}"
  data-reaction="${reactionType}"${themeMode !== "auto" ? `\n  data-theme="${themeMode}"` : ""}${bgMode !== "transparent" ? `\n  data-bg="${bgMode}"` : ""}${canvasBg ? `\n  data-bg-color="${canvasBg}"` : ""}${cardBg ? `\n  data-card-bg="${cardBg}"` : ""}${textColor ? `\n  data-text-color="${textColor}"` : ""}${borderColor ? `\n  data-border-color="${borderColor}"` : ""}${radiusValue !== "0.75rem" ? `\n  data-radius="${radiusValue}"` : ""}${showReactionsBar ? `\n  data-reactions-bar="true"` : ""}>
</div>
<script src="https://nyuzi-yap.vercel.app/embed.js" async></script>`;

  const copyEmbedCode = async () => {
    try {
      await navigator.clipboard.writeText(embedScriptCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      showToast("Embed code copied to clipboard!");
    } catch {}
  };

  // Dynamically Mount Sandbox with Mock Discussion
  useEffect(() => {
    const timer = setTimeout(() => {
      const containerMount = document.getElementById("nyuzi-studio-preview-mount");
      if (!containerMount) return;

      const activeTheme = themeMode === "auto" ? studioColorMode : themeMode;

      containerMount.innerHTML = `
        <div id="nyuzi-comments"
          data-site-id="${selectedSite}"
          data-thread-url="https://nyuzi-yap.vercel.app/studio-${selectedSite}"
          data-thread-title="The Art of Thoughtful Reading"
          data-author-name="Fred Juma"
          data-accent-color="${accentColor}"
          data-reaction="${reactionType}"
          data-theme="${activeTheme}"
          data-bg="${bgMode}"
          ${canvasBg ? `data-bg-color="${canvasBg}"` : ""}
          ${cardBg ? `data-card-bg="${cardBg}"` : ""}
          ${textColor ? `data-text-color="${textColor}"` : ""}
          ${borderColor ? `data-border-color="${borderColor}"` : ""}
          data-radius="${radiusValue}"
          data-reactions-bar="${showReactionsBar ? "true" : "false"}"
          data-mock="true">
        </div>
      `;

      const existingScript = document.getElementById("nyuzi-studio-script");
      if (existingScript) existingScript.remove();

      const script = document.createElement("script");
      script.id = "nyuzi-studio-script";
      script.src = `/embed.js?t=${Date.now()}`;
      script.async = true;
      document.body.appendChild(script);
    }, 50);

    return () => {
      clearTimeout(timer);
      const existingScript = document.getElementById("nyuzi-studio-script");
      if (existingScript) existingScript.remove();
    };
  }, [
    selectedSite,
    accentColor,
    canvasBg,
    cardBg,
    textColor,
    borderColor,
    radiusValue,
    reactionType,
    themeMode,
    studioColorMode,
    bgMode,
    showReactionsBar,
  ]);

  return (
    <div className="flex flex-col h-full lg:h-[calc(100vh-6.5rem)] min-h-0 space-y-3.5">
      {/* Studio Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-serif-title text-xl sm:text-2xl font-bold flex items-center gap-2 text-[var(--text-main)]">
              <Palette className="w-5 h-5 text-[var(--brand-orange)]" />
              <span>Widget Embed Studio</span>
            </h3>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[var(--brand-orange-soft)] text-[var(--brand-orange)] border border-[var(--brand-orange)]/20">
              {selectedSite === "trc254" ? "readingcircle254.com" : "Demo Sandbox"}
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Realtime dual-pane customizer. Edit styles on the left and test live discussions on the right.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-xl border border-[var(--border-card)] hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Reset to default settings"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={copyEmbedCode}
            className="px-3.5 py-1.5 rounded-xl bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white text-xs font-bold shadow transition-all cursor-pointer flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Snippet</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Mode Switcher: Studio Controls vs Live Preview */}
      <div className="lg:hidden flex items-center p-1 rounded-xl bg-[var(--bg-card)] border border-[var(--border-card)] shrink-0 shadow-xs">
        <button
          type="button"
          onClick={() => setMobileTab("controls")}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            mobileTab === "controls"
              ? "bg-[var(--brand-orange)] text-white shadow-xs"
              : "text-[var(--text-secondary)] hover:text-[var(--text-main)]"
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Studio Controls</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("preview")}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            mobileTab === "preview"
              ? "bg-[var(--brand-orange)] text-white shadow-xs"
              : "text-[var(--text-secondary)] hover:text-[var(--text-main)]"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Live Preview</span>
        </button>
      </div>

      {/* Main Studio Dual-Pane Layout */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left Column: Independently Scrollable Controls Pane */}
        <div
          className={`lg:col-span-5 flex-col min-h-0 h-[calc(100dvh-13.5rem)] lg:h-full rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-xs overflow-hidden ${
            mobileTab === "controls" ? "flex" : "hidden lg:flex"
          }`}
        >
          {/* Controls Pane Sticky Top Bar */}
          <div className="px-4 py-2.5 border-b border-[var(--border-card)] bg-[var(--bg-card-subtle)] flex items-center justify-between shrink-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[var(--brand-orange)]" />
              <span>Studio Controls</span>
            </span>

            {/* Light / Dark Mode Switcher */}
            <div className="flex items-center gap-1 bg-[var(--bg-page)] p-0.5 rounded-lg border border-[var(--border-card)]">
              <button
                type="button"
                onClick={() => handleToggleColorMode("light")}
                className={`px-2 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 text-xs font-semibold ${
                  studioColorMode === "light"
                    ? "bg-[var(--bg-card)] text-[var(--brand-orange)] shadow-xs"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                }`}
                title="Light mode styles & preview"
              >
                <Sun className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Light</span>
              </button>
              <button
                type="button"
                onClick={() => handleToggleColorMode("dark")}
                className={`px-2 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 text-xs font-semibold ${
                  studioColorMode === "dark"
                    ? "bg-[var(--bg-card)] text-[var(--brand-orange)] shadow-xs"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                }`}
                title="Dark mode styles & preview"
              >
                <Moon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Dark</span>
              </button>
            </div>
          </div>

          {/* Independently Scrollable Controls Body */}
          <div className="flex-1 min-h-0 overflow-y-auto studio-scrollbar p-4 space-y-4">
            {/* Curated Presets Bar */}
            <div className="p-4 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)]/50 space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] block">
                Curated Style Presets
              </span>
              <div className="flex flex-wrap gap-1.5">
                {curatedPalettes.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => applyPalette(p)}
                    className="px-2.5 py-1.5 rounded-lg border border-[var(--border-card)] hover:border-[var(--brand-orange)] bg-[var(--bg-page)] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: p.accent }} />
                    <span>{p.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Granular Color Picker Suite */}
            <div className="p-4 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)]/50 space-y-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-[var(--brand-orange)]" />
                <span>Color Palette Tokens</span>
              </span>

              <div className="space-y-3 text-xs">
                {/* Accent Color */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-semibold text-[11px] text-[var(--text-secondary)]">Primary Accent</label>
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">{accentColor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-8 h-8 rounded-lg border border-[var(--border-card)] cursor-pointer p-0.5 bg-transparent shrink-0"
                    />
                    <input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-[var(--border-card)] bg-[var(--bg-page)] text-xs font-mono focus:outline-none focus:border-[var(--brand-orange)]"
                    />
                  </div>
                </div>

                {/* Canvas Background */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-semibold text-[11px] text-[var(--text-secondary)]">Background Canvas</label>
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">
                      {canvasBg || "Transparent (Inherit)"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={canvasBg || (studioColorMode === "dark" ? "#0a0605" : "#fbf9f7")}
                      onChange={(e) => setCanvasBg(e.target.value)}
                      className="w-8 h-8 rounded-lg border border-[var(--border-card)] cursor-pointer p-0.5 bg-transparent shrink-0"
                    />
                    <input
                      type="text"
                      placeholder="transparent"
                      value={canvasBg}
                      onChange={(e) => setCanvasBg(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-[var(--border-card)] bg-[var(--bg-page)] text-xs font-mono focus:outline-none focus:border-[var(--brand-orange)]"
                    />
                    {canvasBg && (
                      <button
                        onClick={() => setCanvasBg("")}
                        className="px-2 py-1.5 rounded-lg border border-[var(--border-card)] text-[10px] text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer"
                        title="Clear custom background"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* Comment Box / Card Surface */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-semibold text-[11px] text-[var(--text-secondary)]">Comment Box / Card</label>
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">
                      {cardBg || "Theme Default"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={cardBg || (studioColorMode === "dark" ? "#140d0b" : "#ffffff")}
                      onChange={(e) => setCardBg(e.target.value)}
                      className="w-8 h-8 rounded-lg border border-[var(--border-card)] cursor-pointer p-0.5 bg-transparent shrink-0"
                    />
                    <input
                      type="text"
                      placeholder="theme default"
                      value={cardBg}
                      onChange={(e) => setCardBg(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-[var(--border-card)] bg-[var(--bg-page)] text-xs font-mono focus:outline-none focus:border-[var(--brand-orange)]"
                    />
                    {cardBg && (
                      <button
                        onClick={() => setCardBg("")}
                        className="px-2 py-1.5 rounded-lg border border-[var(--border-card)] text-[10px] text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer"
                        title="Clear custom card surface"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* Text Color */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-semibold text-[11px] text-[var(--text-secondary)]">Primary Text</label>
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">
                      {textColor || "Inherit from site"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={textColor || (studioColorMode === "dark" ? "#fcfcfc" : "#19120f")}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-8 h-8 rounded-lg border border-[var(--border-card)] cursor-pointer p-0.5 bg-transparent shrink-0"
                    />
                    <input
                      type="text"
                      placeholder="inherit"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-[var(--border-card)] bg-[var(--bg-page)] text-xs font-mono focus:outline-none focus:border-[var(--brand-orange)]"
                    />
                    {textColor && (
                      <button
                        onClick={() => setTextColor("")}
                        className="px-2 py-1.5 rounded-lg border border-[var(--border-card)] text-[10px] text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer"
                        title="Clear custom text color"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* Border Color */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-semibold text-[11px] text-[var(--text-secondary)]">Border & Divider</label>
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">
                      {borderColor || "Theme default"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={borderColor || (studioColorMode === "dark" ? "#26201c" : "#ece5df")}
                      onChange={(e) => setBorderColor(e.target.value)}
                      className="w-8 h-8 rounded-lg border border-[var(--border-card)] cursor-pointer p-0.5 bg-transparent shrink-0"
                    />
                    <input
                      type="text"
                      placeholder="theme default"
                      value={borderColor}
                      onChange={(e) => setBorderColor(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-[var(--border-card)] bg-[var(--bg-page)] text-xs font-mono focus:outline-none focus:border-[var(--brand-orange)]"
                    />
                    {borderColor && (
                      <button
                        onClick={() => setBorderColor("")}
                        className="px-2 py-1.5 rounded-lg border border-[var(--border-card)] text-[10px] text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer"
                        title="Clear custom border color"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* UI Geometry & Roundness */}
            <div className="p-4 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)]/50 space-y-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[var(--brand-orange)]" />
                <span>UI Geometry & Roundness</span>
              </span>

              <div className="space-y-3 text-xs">
                {/* Roundness Selection */}
                <div>
                  <label className="block text-[11px] font-semibold text-[var(--text-secondary)] mb-1.5">
                    Border Roundness
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Sharp", val: "0.25rem" },
                      { label: "Rounded", val: "0.75rem" },
                      { label: "Smooth Pill", val: "1.25rem" },
                    ].map((r) => (
                      <button
                        key={r.label}
                        onClick={() => setRadiusValue(r.val)}
                        className={`py-1.5 px-2 rounded-lg border font-semibold text-center cursor-pointer transition-all ${
                          radiusValue === r.val
                            ? "border-[var(--brand-orange)] bg-[var(--brand-orange-soft)] text-[var(--brand-orange)] font-bold shadow-xs"
                            : "border-[var(--border-card)] text-[var(--text-secondary)] hover:border-[var(--brand-orange)]/40"
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Surface Presentation */}
                <div>
                  <label className="block text-[11px] font-semibold text-[var(--text-secondary)] mb-1.5">
                    Comment Enclosure Style
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setBgMode("transparent")}
                      className={`py-2 px-3 rounded-lg border font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        bgMode === "transparent"
                          ? "border-[var(--brand-orange)] bg-[var(--brand-orange-soft)] text-[var(--brand-orange)] font-bold shadow-xs"
                          : "border-[var(--border-card)] text-[var(--text-secondary)] hover:border-[var(--brand-orange)]/40"
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Seamless Stream</span>
                    </button>
                    <button
                      onClick={() => setBgMode("card")}
                      className={`py-2 px-3 rounded-lg border font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        bgMode === "card"
                          ? "border-[var(--brand-orange)] bg-[var(--brand-orange-soft)] text-[var(--brand-orange)] font-bold shadow-xs"
                          : "border-[var(--border-card)] text-[var(--text-secondary)] hover:border-[var(--brand-orange)]/40"
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Enclosed Cards</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Reactions Suite */}
            <div className="p-4 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)]/50 space-y-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] block">
                Reactions & Interactivity
              </span>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setReactionType("like")}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                    reactionType === "like"
                      ? "border-[var(--brand-orange)] bg-[var(--brand-orange-soft)] text-[var(--brand-orange)] font-bold shadow-xs"
                      : "border-[var(--border-card)] hover:border-[var(--brand-orange)]/40 text-[var(--text-secondary)]"
                  }`}
                >
                  <ThumbsUp className="w-4 h-4 fill-current" />
                  <span>👍 Like</span>
                </button>

                <button
                  onClick={() => setReactionType("heart")}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                    reactionType === "heart"
                      ? "border-[var(--brand-orange)] bg-[var(--brand-orange-soft)] text-[var(--brand-orange)] font-bold shadow-xs"
                      : "border-[var(--border-card)] hover:border-[var(--brand-orange)]/40 text-[var(--text-secondary)]"
                  }`}
                >
                  <Heart className="w-4 h-4 fill-current" />
                  <span>❤️ Heart Pop</span>
                </button>

                <button
                  onClick={() => setReactionType("upvote")}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                    reactionType === "upvote"
                      ? "border-[var(--brand-orange)] bg-[var(--brand-orange-soft)] text-[var(--brand-orange)] font-bold shadow-xs"
                      : "border-[var(--border-card)] hover:border-[var(--brand-orange)]/40 text-[var(--text-secondary)]"
                  }`}
                >
                  <span className="text-sm font-bold">▲</span>
                  <span>▲ Upvote</span>
                </button>
              </div>

              {/* Expressive Top Reactions Bar Toggle */}
              <label className="flex items-center justify-between pt-2 border-t border-[var(--border-card)]/50 cursor-pointer select-none">
                <div>
                  <span className="font-semibold text-xs text-[var(--text-main)] block">Expressive Reactions Bar</span>
                  <span className="text-[11px] text-[var(--text-muted)]">Top rating tray (🔥 Superb, ❤️ Love, 💡 Insight)</span>
                </div>
                <input
                  type="checkbox"
                  checked={showReactionsBar}
                  onChange={(e) => setShowReactionsBar(e.target.checked)}
                  className="w-4 h-4 accent-[var(--brand-orange)] rounded cursor-pointer"
                />
              </label>
            </div>

            {/* Generated Ready-to-Paste Snippet */}
            <div className="p-4 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)]/50 space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                  Ready-to-Paste Snippet
                </label>
                <span className="text-[10px] text-emerald-500 font-mono font-bold">&lt; 15KB bundle</span>
              </div>

              <div className="relative">
                <pre className="p-3 rounded-xl bg-[#090605] text-[#f8fafc] text-xs font-mono overflow-x-auto border border-[#f56220]/25 leading-relaxed">
                  <code>{embedScriptCode}</code>
                </pre>
                <button
                  type="button"
                  onClick={copyEmbedCode}
                  className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white text-xs font-bold shadow transition-all cursor-pointer flex items-center gap-1"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Independently Scrollable Live Sandbox Preview Pane */}
        <div
          className={`lg:col-span-7 flex-col min-h-0 h-[calc(100dvh-13.5rem)] lg:h-full rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-md overflow-hidden ${
            mobileTab === "preview" ? "flex" : "hidden lg:flex"
          }`}
        >
          {/* Preview Pane Top Header Bar */}
          <div className="px-5 py-2.5 border-b border-[var(--border-card)] bg-[var(--bg-card-subtle)] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-xs uppercase tracking-wider text-[var(--text-main)]">
                Live Interactive Sandbox
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Quick Canvas Mode Switcher in Preview Header */}
              <div className="flex items-center gap-0.5 bg-[var(--bg-page)] p-0.5 rounded-lg border border-[var(--border-card)]">
                <button
                  type="button"
                  onClick={() => handleToggleColorMode("light")}
                  className={`p-1 rounded-md transition-all cursor-pointer ${
                    studioColorMode === "light"
                      ? "bg-[var(--bg-card)] text-[var(--brand-orange)] shadow-xs"
                      : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                  }`}
                  title="Switch sandbox to Light Canvas"
                >
                  <Sun className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleColorMode("dark")}
                  className={`p-1 rounded-md transition-all cursor-pointer ${
                    studioColorMode === "dark"
                      ? "bg-[var(--bg-card)] text-[var(--brand-orange)] shadow-xs"
                      : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                  }`}
                  title="Switch sandbox to Dark Canvas"
                >
                  <Moon className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <span>Synchronized</span>
              </div>
            </div>
          </div>

          {/* Independently Scrollable Preview Body */}
          <div
            className={`flex-1 min-h-0 overflow-y-auto studio-scrollbar p-4 sm:p-6 space-y-5 transition-colors duration-200 ${
              studioColorMode === "dark"
                ? "bg-[#090605] text-[#f8fafc]"
                : "bg-[#ffffff] text-[#0f172a]"
            }`}
          >
            {/* Mock Article Top Header */}
            <div className={`pb-4 border-b ${studioColorMode === "dark" ? "border-white/10" : "border-slate-200"}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-orange)]">
                  The Reading Circle Blog
                </span>
                <span className={`${studioColorMode === "dark" ? "text-stone-500" : "text-slate-400"} text-xs`}>&bull;</span>
                <span className={`text-[10px] ${studioColorMode === "dark" ? "text-stone-400" : "text-slate-500"}`}>Live Article Simulation</span>
              </div>
              <h4 className={`text-lg font-bold font-serif-title ${studioColorMode === "dark" ? "text-white" : "text-slate-900"}`}>
                {selectedSite === "trc254" ? "The Art of Thoughtful Reading" : "Sample Publication Article"}
              </h4>
              <p className={`text-xs mt-1 ${studioColorMode === "dark" ? "text-stone-400" : "text-slate-600"}`}>
                A community-centered space for literary reflections and dialogue. Readers leave thoughts below.
              </p>
            </div>

            {/* Widget Container Mount */}
            <div id="nyuzi-studio-preview-mount" className="min-h-[450px]">
              <div className="p-12 text-center text-xs text-[var(--text-muted)] animate-pulse">
                Rendering studio sandbox with pre-populated discussions...
              </div>
            </div>

            {/* Quick Integration Directions */}
            <div
              className={`p-4 rounded-xl border space-y-2 ${
                studioColorMode === "dark"
                  ? "bg-[#140d0b] border-white/10 text-stone-300"
                  : "bg-slate-50 border-slate-200 text-slate-700"
              }`}
            >
              <h5
                className={`font-bold text-xs uppercase tracking-wider flex items-center gap-2 ${
                  studioColorMode === "dark" ? "text-white" : "text-slate-900"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[var(--brand-orange)]" />
                <span>How this integrates into your website</span>
              </h5>
              <ol className="list-decimal list-inside space-y-1 text-xs leading-relaxed">
                <li>Copy the generated 2-line embed snippet from the left pane.</li>
                <li>Place the <code>&lt;div id=&quot;nyuzi-comments&quot;&gt;</code> container on your blog template.</li>
                <li>Include the lightweight <code>&lt;script&gt;</code> before <code>&lt;/body&gt;</code>.</li>
                <li>All colors, surface shapes, and reactions match your preview automatically!</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Mobile Mode Switcher Action Pill */}
      <div className="lg:hidden fixed bottom-5 right-5 z-40">
        <button
          type="button"
          onClick={() => setMobileTab(mobileTab === "controls" ? "preview" : "controls")}
          className="px-4 py-2.5 rounded-full bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white text-xs font-bold shadow-2xl flex items-center gap-2 cursor-pointer border border-white/20 active:scale-95 transition-all"
        >
          {mobileTab === "controls" ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              <span>View Preview</span>
            </>
          ) : (
            <>
              <Sliders className="w-3.5 h-3.5" />
              <span>Edit Controls</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
