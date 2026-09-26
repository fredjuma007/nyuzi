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
  Type,
  Smile,
  ShieldCheck,
  UploadCloud,
  Globe,
} from "lucide-react";

interface EmbedStudioTabProps {
  selectedSite: string;
  showToast: (msg: string) => void;
}

export function EmbedStudioTab({ selectedSite, showToast }: EmbedStudioTabProps) {
  // Mode Tab: Light vs Dark
  const [studioColorMode, setStudioColorMode] = useState<"light" | "dark">(
    selectedSite === "trc254" ? "dark" : "light"
  );
  const [isSettingsLoaded, setIsSettingsLoaded] = useState(false);

  // Tokens State
  const [accentColor, setAccentColor] = useState(selectedSite === "trc254" ? "#10b981" : "#f56220");
  const [canvasBg, setCanvasBg] = useState("");
  const [cardBg, setCardBg] = useState("");
  const [textColor, setTextColor] = useState("");
  const [borderColor, setBorderColor] = useState("");
  const [radiusValue, setRadiusValue] = useState("0.75rem");
  const [reactionType, setReactionType] = useState<"like" | "heart" | "upvote">("like");
  const [themeMode, setThemeMode] = useState<"auto" | "light" | "dark" | "sepia">("auto");
  const [bgMode, setBgMode] = useState<"transparent" | "card">("transparent");
  const [showReactionsBar, setShowReactionsBar] = useState(true);
  const [reactionsPrompt, setReactionsPrompt] = useState(
    selectedSite === "trc254" ? "What did you think of this piece?" : "How was this discussion?"
  );
  const [reactionsPreset, setReactionsPreset] = useState<"general" | "literary">(
    selectedSite === "trc254" ? "literary" : "general"
  );
  const [formattingTools, setFormattingTools] = useState<string[]>(
    selectedSite === "trc254" ? ["bold", "italic", "quote"] : ["bold", "italic", "quote", "code", "link"]
  );
  const [copied, setCopied] = useState(false);
  const [mobileTab, setMobileTab] = useState<"controls" | "preview">("controls");
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [snippetMode, setSnippetMode] = useState<"auto" | "static">("auto");

  // Load saved site settings from edge API on mount or site switch
  useEffect(() => {
    let isMounted = true;
    setIsSettingsLoaded(false);
    async function fetchSiteSettings() {
      try {
        const res = await fetch(`https://nyuzi-api.fredjuma8.workers.dev/api/v1/sites/${selectedSite}/settings`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.settings && Object.keys(data.settings).length > 0) {
            const s = data.settings;
            if (s.accentColor) setAccentColor(s.accentColor);
            if (s.themeMode) {
              setThemeMode(s.themeMode);
              if (s.themeMode === "dark" || s.themeMode === "light") {
                setStudioColorMode(s.themeMode);
              }
            }
            if (s.bgMode) setBgMode(s.bgMode);
            if (s.canvasBg !== undefined) setCanvasBg(s.canvasBg);
            if (s.cardBg !== undefined) setCardBg(s.cardBg);
            if (s.textColor !== undefined) setTextColor(s.textColor);
            if (s.borderColor !== undefined) setBorderColor(s.borderColor);
            if (s.radiusValue) setRadiusValue(s.radiusValue);
            if (s.reactionType) setReactionType(s.reactionType);
            if (s.showReactionsBar !== undefined) setShowReactionsBar(Boolean(s.showReactionsBar));
            if (s.reactionsPrompt) setReactionsPrompt(s.reactionsPrompt);
            if (s.reactionsPreset) setReactionsPreset(s.reactionsPreset);
            if (Array.isArray(s.formattingTools)) setFormattingTools(s.formattingTools);
          }
        }
      } catch {
      } finally {
        if (isMounted) setIsSettingsLoaded(true);
      }
    }
    fetchSiteSettings();
    return () => {
      isMounted = false;
    };
  }, [selectedSite]);

  // Save / Publish settings to Edge DB
  const handlePublishSettings = async () => {
    setIsSavingSettings(true);
    try {
      const payload = {
        settings: {
          accentColor,
          themeMode,
          bgMode,
          canvasBg,
          cardBg,
          textColor,
          borderColor,
          radiusValue,
          reactionType,
          showReactionsBar,
          reactionsPrompt,
          reactionsPreset,
          formattingTools,
        },
      };

      const res = await fetch(
        `https://nyuzi-api.fredjuma8.workers.dev/api/v1/sites/${selectedSite}/settings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        showToast(
          `Published live settings to ${
            selectedSite === "trc254" ? "readingcircle254.com" : selectedSite
          }!`
        );
      } else {
        showToast("Failed to save settings to server.");
      }
    } catch {
      showToast("Could not reach edge server.");
    } finally {
      setIsSavingSettings(false);
    }
  };

  const toggleFormattingTool = (tool: string) => {
    setFormattingTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  };

  // Hyvor-style Quick Color Presets (Intelligently adapts to active Studio theme mode)
  const curatedPalettes = [
    {
      name: "TRC Literary Emerald",
      accent: studioColorMode === "dark" ? "#10b981" : "#15803d",
      bg: "transparent",
      theme: "auto",
      reactionsPreset: "literary" as const,
      reactionsPrompt: "What did you think of this piece?",
      formattingTools: ["bold", "italic", "quote"],
    },
    {
      name: "Nyuzi Amber Glow",
      accent: "#f56220",
      bg: "transparent",
      theme: "auto",
      reactionsPreset: "general" as const,
      reactionsPrompt: "How was this discussion?",
      formattingTools: ["bold", "italic", "quote", "code", "link"],
    },
    {
      name: "Sepia Book Parchment",
      accent: studioColorMode === "dark" ? "#d97706" : "#854d0e",
      bg: studioColorMode === "dark" ? "#14100d" : "#f4ead8",
      cardBg: studioColorMode === "dark" ? "#1e1713" : "#fbf3e4",
      textColor: studioColorMode === "dark" ? "#f5ede4" : "#2b2118",
      borderColor: studioColorMode === "dark" ? "#3d3027" : "#e2d4bc",
      theme: studioColorMode === "dark" ? "dark" : "sepia",
      reactionsPreset: "literary" as const,
      reactionsPrompt: "Reader Impressions",
      formattingTools: ["bold", "italic", "quote"],
    },
    {
      name: "Obsidian Electric",
      accent: "#6366f1",
      bg: "#090605",
      cardBg: "#14100e",
      textColor: "#f8fafc",
      borderColor: "#26201c",
      theme: "dark",
      reactionsPreset: "general" as const,
      reactionsPrompt: "How was this discussion?",
      formattingTools: ["bold", "italic", "quote", "code", "link"],
    },
    {
      name: "Minimalist Mono",
      accent: studioColorMode === "dark" ? "#f8fafc" : "#0f172a",
      bg: studioColorMode === "dark" ? "#090605" : "#ffffff",
      cardBg: studioColorMode === "dark" ? "#14100e" : "#f8fafc",
      textColor: studioColorMode === "dark" ? "#f8fafc" : "#0f172a",
      borderColor: studioColorMode === "dark" ? "#26201c" : "#e2e8f0",
      theme: studioColorMode === "dark" ? "dark" : "light",
      reactionsPreset: "general" as const,
      reactionsPrompt: "How was this discussion?",
      formattingTools: ["bold", "italic", "quote", "link"],
    },
    {
      name: "Gorgeous 12",
      accent: studioColorMode === "dark" ? "#fb7185" : "#be123c",
      bg: "transparent",
      theme: "auto",
      reactionsPreset: "general" as const,
      reactionsPrompt: "How was this discussion?",
      formattingTools: ["bold", "italic", "quote", "code", "link"],
    },
  ];

  // Apply a curated palette
  const applyPalette = (p: (typeof curatedPalettes)[0]) => {
    setAccentColor(p.accent);
    setCanvasBg(p.bg || "");
    setCardBg(p.cardBg || "");
    setTextColor(p.textColor || "");
    setBorderColor(p.borderColor || "");
    if (p.reactionsPreset) setReactionsPreset(p.reactionsPreset);
    if (p.reactionsPrompt) setReactionsPrompt(p.reactionsPrompt);
    if (p.formattingTools) setFormattingTools(p.formattingTools);
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

    // 1. Detect if Sepia Book is currently active
    const isSepiaActive =
      canvasBg === "#f4ead8" ||
      cardBg === "#fbf3e4" ||
      canvasBg === "#14100d" ||
      cardBg === "#1e1713" ||
      accentColor === "#854d0e" ||
      accentColor === "#d97706" ||
      themeMode === "sepia";

    if (isSepiaActive) {
      if (mode === "dark") {
        setAccentColor("#d97706");
        setCanvasBg("#14100d");
        setCardBg("#1e1713");
        setTextColor("#f5ede4");
        setBorderColor("#3d3027");
        setThemeMode("dark");
      } else {
        setAccentColor("#854d0e");
        setCanvasBg("#f4ead8");
        setCardBg("#fbf3e4");
        setTextColor("#2b2118");
        setBorderColor("#e2d4bc");
        setThemeMode("sepia");
      }
      return;
    }

    setThemeMode(mode);

    // 2. If using TRC Emerald, adjust accent vibrancy for dark/light contrast
    if (accentColor === "#15803d" && mode === "dark") {
      setAccentColor("#10b981");
    } else if (accentColor === "#10b981" && mode === "light") {
      setAccentColor("#15803d");
    }

    // 3. Clear conflicting overrides if switching modes
    if (mode === "dark") {
      if (textColor === "#0f172a" || textColor === "#2b2118") setTextColor("");
      if (cardBg === "#ffffff" || cardBg === "#f8fafc" || cardBg === "#fbf3e4") setCardBg("");
      if (canvasBg === "#ffffff" || canvasBg === "#f4ead8") setCanvasBg("");
      if (borderColor === "#e2e8f0" || borderColor === "#e2d4bc") setBorderColor("");
    } else if (mode === "light") {
      if (textColor === "#f8fafc" || textColor === "#f5ede4") setTextColor("");
      if (cardBg === "#14100e" || cardBg === "#1e1713") setCardBg("");
      if (canvasBg === "#090605" || canvasBg === "#14100d") setCanvasBg("");
      if (borderColor === "#26201c" || borderColor === "#3d3027") setBorderColor("");
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
    setReactionsPrompt(selectedSite === "trc254" ? "What did you think of this piece?" : "How was this discussion?");
    setReactionsPreset(selectedSite === "trc254" ? "literary" : "general");
    setFormattingTools(selectedSite === "trc254" ? ["bold", "italic", "quote"] : ["bold", "italic", "quote", "code", "link"]);
    showToast("Reset studio styles to default");
  };

  const isDefaultFormatting =
    formattingTools.length === 5 &&
    formattingTools.includes("bold") &&
    formattingTools.includes("italic") &&
    formattingTools.includes("quote") &&
    formattingTools.includes("code") &&
    formattingTools.includes("link");

  // Generated Embed Snippets
  const autoSyncSnippetCode = `<div id="nyuzi-comments"
  data-site-id="${selectedSite}"
  data-author-name="{post.author.name}">
</div>
<script src="https://nyuzi-yap.vercel.app/embed.js" async></script>`;

  const embedScriptCode = `<div id="nyuzi-comments"
  data-site-id="${selectedSite}"
  data-accent-color="${accentColor}"
  data-reaction="${reactionType}"${themeMode !== "auto" ? `\n  data-theme="${themeMode}"` : ""}${bgMode !== "transparent" ? `\n  data-bg="${bgMode}"` : ""}${canvasBg ? `\n  data-bg-color="${canvasBg}"` : ""}${cardBg ? `\n  data-card-bg="${cardBg}"` : ""}${textColor ? `\n  data-text-color="${textColor}"` : ""}${borderColor ? `\n  data-border-color="${borderColor}"` : ""}${radiusValue !== "0.75rem" ? `\n  data-radius="${radiusValue}"` : ""}${!showReactionsBar ? `\n  data-reactions-bar="false"` : ""}${showReactionsBar && reactionsPrompt !== "How was this discussion?" ? `\n  data-reactions-prompt="${reactionsPrompt}"` : ""}${showReactionsBar && reactionsPreset !== "general" ? `\n  data-reactions-preset="${reactionsPreset}"` : ""}${!isDefaultFormatting ? `\n  data-formatting="${formattingTools.join(",")}"` : ""}>
</div>
<script src="https://nyuzi-yap.vercel.app/embed.js" async></script>`;

  const activeSnippetCode = snippetMode === "auto" ? autoSyncSnippetCode : embedScriptCode;

  const copyEmbedCode = async () => {
    try {
      await navigator.clipboard.writeText(activeSnippetCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      showToast("Embed code copied to clipboard!");
    } catch {}
  };

  // Dynamically Mount Sandbox with Mock Discussion
  useEffect(() => {
    if (!isSettingsLoaded) return;

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
          data-reactions-prompt="${reactionsPrompt}"
          data-reactions-preset="${reactionsPreset}"
          data-formatting="${formattingTools.join(",")}"
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
    isSettingsLoaded,
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
    reactionsPrompt,
    reactionsPreset,
    formattingTools,
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
            type="button"
            onClick={handlePublishSettings}
            disabled={isSavingSettings}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
            title="Save and publish these styles & rules to the live site database"
          >
            {isSavingSettings ? (
              <span>Saving...</span>
            ) : (
              <>
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Publish to Live Site</span>
              </>
            )}
          </button>

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
                  (themeMode === "light" || (themeMode === "auto" && studioColorMode === "light"))
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
                  (themeMode === "dark" || (themeMode === "auto" && studioColorMode === "dark"))
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
            {/* Curated Presets Suite */}
            <div className="p-4 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)]/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--brand-orange)]" />
                  <span>Curated Style Presets</span>
                </span>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">6 Themes</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {curatedPalettes.map((p) => {
                  const isSelected = accentColor === p.accent;
                  return (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => applyPalette(p)}
                      className={`px-3 py-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 relative group ${
                        isSelected
                          ? "border-[var(--brand-orange)] bg-[var(--brand-orange-soft)] shadow-xs"
                          : "border-[var(--border-card)] hover:border-[var(--brand-orange)]/40 bg-[var(--bg-page)]"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-3 h-3 rounded-full shrink-0 border border-white/20 shadow-xs"
                          style={{ backgroundColor: p.accent }}
                        />
                        <span className="font-bold text-xs text-[var(--text-main)] truncate">
                          {p.name}
                        </span>
                      </div>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-orange)] shrink-0" />
                      )}
                    </button>
                  );
                })}
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

            {/* Reactions & Interactivity Suite */}
            <div className="p-4 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)]/50 space-y-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
                <Smile className="w-3.5 h-3.5 text-[var(--brand-orange)]" />
                <span>Reactions & Feedback</span>
              </span>

              {/* Comment Reaction Style */}
              <div>
                <label className="block text-[11px] font-semibold text-[var(--text-secondary)] mb-1.5">
                  Comment Reaction Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setReactionType("like")}
                    className={`p-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                      reactionType === "like"
                        ? "border-[var(--brand-orange)] bg-[var(--brand-orange-soft)] text-[var(--brand-orange)] font-bold shadow-xs"
                        : "border-[var(--border-card)] hover:border-[var(--brand-orange)]/40 text-[var(--text-secondary)]"
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5 fill-current" />
                    <span>Like</span>
                  </button>

                  <button
                    onClick={() => setReactionType("heart")}
                    className={`p-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                      reactionType === "heart"
                        ? "border-[var(--brand-orange)] bg-[var(--brand-orange-soft)] text-[var(--brand-orange)] font-bold shadow-xs"
                        : "border-[var(--border-card)] hover:border-[var(--brand-orange)]/40 text-[var(--text-secondary)]"
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>Heart</span>
                  </button>

                  <button
                    onClick={() => setReactionType("upvote")}
                    className={`p-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                      reactionType === "upvote"
                        ? "border-[var(--brand-orange)] bg-[var(--brand-orange-soft)] text-[var(--brand-orange)] font-bold shadow-xs"
                        : "border-[var(--border-card)] hover:border-[var(--brand-orange)]/40 text-[var(--text-secondary)]"
                    }`}
                  >
                    <span className="text-xs font-bold">▲</span>
                    <span>Upvote</span>
                  </button>
                </div>
              </div>

              {/* Expressive Article Rating Tray (Master Toggle) */}
              <div className="pt-3 border-t border-[var(--border-card)]/60 space-y-3">
                <label className="flex items-center justify-between cursor-pointer select-none">
                  <div>
                    <span className="font-semibold text-xs text-[var(--text-main)] block">
                      Article Rating Tray
                    </span>
                    <span className="text-[11px] text-[var(--text-muted)]">
                      Top rating tray above comments (🔥 Superb, ☕ Thoughtful...)
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={showReactionsBar}
                    onChange={(e) => setShowReactionsBar(e.target.checked)}
                    className="w-4 h-4 accent-[var(--brand-orange)] rounded cursor-pointer"
                  />
                </label>

                {showReactionsBar && (
                  <div className="p-3 rounded-lg bg-[var(--bg-page)]/80 border border-[var(--border-card)]/60 space-y-3">
                    {/* Emoji Preset Selection */}
                    <div>
                      <label className="block text-[11px] font-semibold text-[var(--text-secondary)] mb-1.5">
                        Emoji Mood Preset
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setReactionsPreset("literary")}
                          className={`p-2 rounded-lg border text-left cursor-pointer transition-all ${
                            reactionsPreset === "literary"
                              ? "border-[var(--brand-orange)] bg-[var(--brand-orange-soft)] text-[var(--brand-orange)] font-bold shadow-xs"
                              : "border-[var(--border-card)] hover:border-[var(--brand-orange)]/40 text-[var(--text-secondary)]"
                          }`}
                        >
                          <div className="text-xs font-bold">Literary (TRC)</div>
                          <div className="text-[10px] text-[var(--text-muted)] mt-0.5">☕ 📖 💡 ❤️ 👏</div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setReactionsPreset("general")}
                          className={`p-2 rounded-lg border text-left cursor-pointer transition-all ${
                            reactionsPreset === "general"
                              ? "border-[var(--brand-orange)] bg-[var(--brand-orange-soft)] text-[var(--brand-orange)] font-bold shadow-xs"
                              : "border-[var(--border-card)] hover:border-[var(--brand-orange)]/40 text-[var(--text-secondary)]"
                          }`}
                        >
                          <div className="text-xs font-bold">General Social</div>
                          <div className="text-[10px] text-[var(--text-muted)] mt-0.5">🔥 ❤️ 💡 😂 👏</div>
                        </button>
                      </div>
                    </div>

                    {/* Custom Heading / Prompt */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-semibold text-[var(--text-secondary)]">
                          Tray Heading Prompt
                        </label>
                        <span className="text-[10px] font-mono text-[var(--text-muted)]">Customizable</span>
                      </div>
                      <input
                        type="text"
                        value={reactionsPrompt}
                        onChange={(e) => setReactionsPrompt(e.target.value)}
                        placeholder="How was this discussion?"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[var(--border-card)] bg-[var(--bg-page)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--brand-orange)]"
                      />
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {[
                          "What did you think of this piece?",
                          "How was this discussion?",
                          "Reader Impressions",
                        ].map((quick) => (
                          <button
                            key={quick}
                            type="button"
                            onClick={() => setReactionsPrompt(quick)}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--bg-card-subtle)] border border-[var(--border-card)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--brand-orange)]/40 cursor-pointer"
                          >
                            {quick}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Comment Editor Toolbar Suite */}
            <div className="p-4 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)]/50 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-[var(--brand-orange)]" />
                  <span>Comment Editor Toolbar</span>
                </span>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">
                  {formattingTools.length} enabled
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] leading-snug">
                Control which formatting buttons readers can access when composing or editing thoughts.
              </p>

              {/* Formatting Chips */}
              <div className="grid grid-cols-5 gap-1.5">
                {[
                  { id: "bold", label: "Bold", icon: "B", tip: "**text**" },
                  { id: "italic", label: "Italic", icon: "I", tip: "*text*" },
                  { id: "quote", label: "Quote", icon: '"', tip: "> quote" },
                  { id: "code", label: "Code", icon: "</>", tip: "`code`" },
                  { id: "link", label: "Link", icon: "🔗", tip: "[url]" },
                ].map((tool) => {
                  const isActive = formattingTools.includes(tool.id);
                  return (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => toggleFormattingTool(tool.id)}
                      className={`py-2 px-1 rounded-xl border text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-0.5 ${
                        isActive
                          ? "border-[var(--brand-orange)] bg-[var(--brand-orange-soft)] text-[var(--brand-orange)] font-bold shadow-xs"
                          : "border-[var(--border-card)] text-[var(--text-muted)] hover:border-[var(--border-card)]/80 bg-[var(--bg-page)] opacity-60"
                      }`}
                      title={`${tool.label} (${tool.tip})`}
                    >
                      <span className="text-xs font-mono font-bold">{tool.icon}</span>
                      <span className="text-[10px] leading-none">{tool.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Preset Shortcuts */}
              <div className="flex items-center justify-between gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setFormattingTools(["bold", "italic", "quote"])}
                  className="text-[10px] px-2 py-1 rounded-md bg-[var(--bg-page)] border border-[var(--border-card)] text-[var(--text-secondary)] hover:text-[var(--brand-orange)] hover:border-[var(--brand-orange)]/40 cursor-pointer font-medium"
                >
                  TRC Clean Prose (B, I, &ldquo;)
                </button>
                <button
                  type="button"
                  onClick={() => setFormattingTools(["bold", "italic", "quote", "code", "link"])}
                  className="text-[10px] px-2 py-1 rounded-md bg-[var(--bg-page)] border border-[var(--border-card)] text-[var(--text-secondary)] hover:text-[var(--brand-orange)] hover:border-[var(--brand-orange)]/40 cursor-pointer font-medium"
                >
                  Full Suite (All 5)
                </button>
              </div>

              {/* Helpful spam / literary notice */}
              <div className="space-y-1">
                {!formattingTools.includes("link") && (
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="w-3 h-3 shrink-0" />
                    <span>Links disabled: 100% spam-protected from promo bots</span>
                  </div>
                )}
                {!formattingTools.includes("code") && (
                  <div className="text-[10px] text-[var(--text-muted)]">
                    📖 Code tags disabled for clean literary readability
                  </div>
                )}
              </div>
            </div>

            {/* Generated Ready-to-Paste Snippet */}
            <div className="p-4 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)]/50 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                  Embed Snippet
                </label>
                <div className="flex items-center gap-1 bg-[var(--bg-page)] p-0.5 rounded-lg border border-[var(--border-card)]">
                  <button
                    type="button"
                    onClick={() => setSnippetMode("auto")}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                      snippetMode === "auto"
                        ? "bg-[var(--brand-orange)] text-white shadow-xs"
                        : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                    }`}
                  >
                    Auto-Sync (Clean)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSnippetMode("static")}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                      snippetMode === "static"
                        ? "bg-[var(--brand-orange)] text-white shadow-xs"
                        : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                    }`}
                  >
                    Manual Override
                  </button>
                </div>
              </div>

              {snippetMode === "auto" ? (
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400">
                  ✨ <strong>Auto-Sync:</strong> Remote-controlled by this dashboard. Any changes you publish in Studio apply to your blog automatically without editing code!
                </p>
              ) : (
                <p className="text-[10px] text-[var(--text-muted)]">
                  Static inline HTML overrides for specific pages that need unique colors or rules.
                </p>
              )}

              <div className="relative">
                <pre className="p-3 rounded-xl bg-[#090605] text-[#f8fafc] text-xs font-mono overflow-x-auto border border-[#f56220]/25 leading-relaxed">
                  <code>{activeSnippetCode}</code>
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
                    (themeMode === "light" || (themeMode === "auto" && studioColorMode === "light"))
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
                    (themeMode === "dark" || (themeMode === "auto" && studioColorMode === "dark"))
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
              canvasBg && canvasBg !== "transparent"
                ? ""
                : (themeMode === "dark" || (themeMode === "auto" && studioColorMode === "dark"))
                ? "bg-[#090605] text-[#f8fafc]"
                : "bg-[#ffffff] text-[#0f172a]"
            }`}
            style={
              canvasBg && canvasBg !== "transparent"
                ? {
                    backgroundColor: canvasBg,
                    color: textColor || (themeMode === "dark" || (themeMode === "auto" && studioColorMode === "dark") ? "#f8fafc" : "#0f172a"),
                  }
                : undefined
            }
          >
            {/* Mock Article Top Header */}
            <div
              className={`pb-4 border-b ${
                borderColor
                  ? ""
                  : studioColorMode === "dark"
                  ? "border-white/10"
                  : "border-slate-200"
              }`}
              style={borderColor ? { borderColor } : undefined}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: accentColor }}
                >
                  The Reading Circle Blog
                </span>
                <span className={`${studioColorMode === "dark" ? "text-stone-500" : "text-slate-400"} text-xs`}>&bull;</span>
                <span className={`text-[10px] ${studioColorMode === "dark" ? "text-stone-400" : "text-slate-500"}`}>Live Article Simulation</span>
              </div>
              <h4
                className="text-lg font-bold font-serif-title"
                style={{ color: textColor || (studioColorMode === "dark" ? "#ffffff" : "#0f172a") }}
              >
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
