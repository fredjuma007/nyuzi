"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function LandingPage() {
  const [playgroundAccent, setPlaygroundAccent] = useState("#f56220");
  const [playgroundReaction, setPlaygroundReaction] = useState<"heart" | "upvote">("heart");
  const [snippetSiteId, setSnippetSiteId] = useState("my-publication");
  const [copied, setCopied] = useState(false);

  // Load the live Nyuzi embed script into the playground container
  useEffect(() => {
    const existing = document.getElementById("nyuzi-playground-script");
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.id = "nyuzi-playground-script";
    script.src = "/embed.js";
    script.async = true;
    script.setAttribute("data-site-id", "demo");
    script.setAttribute("data-thread-url", "https://nyuzi-yap.vercel.app/demo");
    script.setAttribute("data-accent-color", playgroundAccent);
    script.setAttribute("data-reaction", playgroundReaction);
    document.body.appendChild(script);

    return () => {
      const active = document.getElementById("nyuzi-playground-script");
      if (active) active.remove();
    };
  }, [playgroundAccent, playgroundReaction]);

  const embedCode = `<div id="nyuzi-comments" data-site-id="${snippetSiteId}" data-accent-color="${playgroundAccent}" data-reaction="${playgroundReaction}"></div>\n<script src="https://nyuzi-yap.vercel.app/embed.js" async></script>`;

  const copySnippet = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  const accentColors = [
    { name: "Nyuzi Orange", hex: "#f56220" },
    { name: "Forest Green", hex: "#15803d" },
    { name: "Electric Indigo", hex: "#6366f1" },
    { name: "Midnight Cyan", hex: "#06b6d4" },
    { name: "Ruby Rose", hex: "#f43f5e" },
  ];

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-[#f56220] selection:text-white w-full max-w-full overflow-x-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[450px] sm:h-[600px] bg-radial-glow pointer-events-none opacity-80 z-0 overflow-hidden" />

      {/* Top Reusable Fixed Navbar */}
      <Navbar />

      {/* Main Content with top padding to offset the fixed navbar */}
      <main className="flex-1 z-10 w-full max-w-full pt-16 sm:pt-20">
        {/* Hero Section */}
        <section className="pt-8 sm:pt-16 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-12 text-center max-w-5xl mx-auto w-full">
          {/* Main Headline */}
          <h1 className="font-serif-title text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.15] mb-4 sm:mb-6 break-words px-1">
            Turn reader attention into{" "}
            <span className="text-gradient-orange italic block sm:inline">a thriving community.</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-sm sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-8 sm:mb-10 px-2 sm:px-0">
            A fast, beautiful comment system designed for independent publications and blogs. Delight your readers with instant discussions and automatic reply alerts—without tracking cookies or bloated scripts.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10 sm:mb-16 w-full max-w-xs sm:max-w-none mx-auto">
            <a
              href="#playground"
              className="w-full sm:w-auto px-6 py-3 sm:px-7 sm:py-3.5 rounded-xl bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#f56220]/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span>Try Live Playground</span>
              <span>&darr;</span>
            </a>
            <a
              href="#snippet"
              className="w-full sm:w-auto px-6 py-3 sm:px-7 sm:py-3.5 rounded-xl border ember-border bg-[var(--bg-card)] hover:border-[var(--brand-orange)] text-[var(--text-main)] font-semibold text-sm sm:text-base transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span>Get 2-Line Embed</span>
              <span>&rarr;</span>
            </a>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 max-w-4xl mx-auto w-full">
            <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border ember-border bg-[var(--bg-card)] text-left shadow-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-[var(--brand-orange)] mb-0.5 sm:mb-1">&lt; 15 KB</div>
              <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-0.5">Featherweight</div>
              <div className="text-[10px] sm:text-xs text-[var(--text-muted)] leading-tight">Minimal footprint on your site</div>
            </div>

            <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border ember-border bg-[var(--bg-card)] text-left shadow-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#facc15] mb-0.5 sm:mb-1">Instant</div>
              <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-0.5">Zero Lag</div>
              <div className="text-[10px] sm:text-xs text-[var(--text-muted)] leading-tight">Loads immediately without slowing down your site</div>
            </div>

            <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border ember-border bg-[var(--bg-card)] text-left shadow-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-[var(--brand-orange)] mb-0.5 sm:mb-1">100%</div>
              <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-0.5">Privacy First</div>
              <div className="text-[10px] sm:text-xs text-[var(--text-muted)] leading-tight">Zero ad cookies, zero cross-site trackers</div>
            </div>

            <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border ember-border bg-[var(--bg-card)] text-left shadow-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#facc15] mb-0.5 sm:mb-1">Smart ⚡</div>
              <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-0.5">Notifications</div>
              <div className="text-[10px] sm:text-xs text-[var(--text-muted)] leading-tight">Automatic email updates that bring readers back</div>
            </div>
          </div>
        </section>

        {/* Live Playground Studio Section */}
        <section id="playground" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-12 border-t ember-border bg-[var(--bg-card-subtle)] w-full">
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[var(--brand-orange)]">Interactive Sandbox</span>
              <h2 className="font-serif-title text-2xl sm:text-4xl font-bold mt-1.5 sm:mt-2 mb-2 sm:mb-3">
                Experience the widget live
              </h2>
              <p className="text-xs sm:text-base text-[var(--text-secondary)] px-2">
                Customize colors and reactions below, then leave a test comment right inside the preview.
              </p>
            </div>

            {/* Playground Box */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start w-full">
              {/* Left Controls Column */}
              <div className="lg:col-span-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl border ember-border bg-[var(--bg-card)] space-y-5 shadow-sm w-full">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2.5">
                    Accent Color
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {accentColors.map((color) => (
                      <button
                        key={color.hex}
                        onClick={() => setPlaygroundAccent(color.hex)}
                        className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                          playgroundAccent === color.hex
                            ? "ring-2 ring-offset-2 ring-[var(--brand-orange)] scale-110 shadow-md"
                            : "opacity-80 hover:opacity-100 hover:scale-105"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {playgroundAccent === color.hex && (
                          <span className="text-white text-[10px] sm:text-xs font-bold">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                  <span className="text-[11px] sm:text-xs text-[var(--text-muted)] mt-2 block">
                    Selected: <strong style={{ color: playgroundAccent }}>{playgroundAccent}</strong>
                  </span>
                </div>

                <div>
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2.5">
                    Reaction Style
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPlaygroundReaction("heart")}
                      className={`px-2.5 py-2 sm:px-3.5 sm:py-2.5 rounded-lg sm:rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        playgroundReaction === "heart"
                          ? "border-[var(--brand-orange)] bg-[var(--brand-orange-soft)] text-[var(--brand-orange)] font-bold"
                          : "ember-border bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:border-[var(--brand-orange)]"
                      }`}
                    >
                      <span>❤️</span>
                      <span>Heart Pop</span>
                    </button>
                    <button
                      onClick={() => setPlaygroundReaction("upvote")}
                      className={`px-2.5 py-2 sm:px-3.5 sm:py-2.5 rounded-lg sm:rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        playgroundReaction === "upvote"
                          ? "border-[var(--brand-orange)] bg-[var(--brand-orange-soft)] text-[var(--brand-orange)] font-bold"
                          : "ember-border bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:border-[var(--brand-orange)]"
                      }`}
                    >
                      <span>▲</span>
                      <span>Upvote</span>
                    </button>
                  </div>
                </div>

                {/* Feature highlights */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-[var(--bg-card-subtle)] border ember-border text-[11px] sm:text-xs space-y-2">
                  <div className="flex items-start gap-2 text-[var(--text-secondary)]">
                    <span className="text-sm">🎨</span>
                    <span><strong>Theme Adaptive:</strong> Seamlessly matches your light and dark styling.</span>
                  </div>
                  <div className="flex items-start gap-2 text-[var(--text-secondary)]">
                    <span className="text-sm">🔗</span>
                    <span><strong>Deep Linking:</strong> Direct URL anchors for sharing specific comments.</span>
                  </div>
                  <div className="flex items-start gap-2 text-[var(--text-secondary)]">
                    <span className="text-sm">🛡️</span>
                    <span><strong>Spam Protected:</strong> Built-in rate limiting and honeypot guards.</span>
                  </div>
                </div>
              </div>

              {/* Right Preview Column */}
              <div className="lg:col-span-8 p-3.5 sm:p-8 rounded-xl sm:rounded-2xl border ember-border bg-[var(--bg-card)] shadow-lg w-full overflow-hidden">
                {/* Clean Demo Article Heading */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 sm:pb-4 mb-4 sm:mb-6 border-b border-[var(--border-card)] gap-2 sm:gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[var(--brand-orange)]">
                        Sample Article
                      </span>
                      <span className="text-[var(--text-muted)] text-xs">&bull;</span>
                      <span className="text-[10px] sm:text-xs text-[var(--text-muted)]">4 min read</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-[var(--text-main)] truncate">
                      The Art of Thoughtful Reading
                    </h4>
                  </div>
                  <div className="self-start sm:self-center shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Demo
                    </span>
                  </div>
                </div>

                {/* Target widget mount point */}
                <div
                  id="nyuzi-comments"
                  data-site-id="demo"
                  data-thread-url="https://nyuzi-yap.vercel.app/demo"
                  data-thread-title="The Art of Thoughtful Reading"
                  data-accent-color={playgroundAccent}
                  data-reaction={playgroundReaction}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid Section */}
        <section id="features" className="py-14 sm:py-24 px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto w-full">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[var(--brand-orange)]">Built For Publications</span>
            <h2 className="font-serif-title text-2xl sm:text-4xl lg:text-5xl font-bold mt-1.5 sm:mt-2 mb-3 sm:mb-4">
              Everything your readers love. Nothing they don&apos;t.
            </h2>
            <p className="text-[var(--text-secondary)] text-xs sm:text-base">
              Designed from first principles to be fast, elegant, and deeply engaging for your readers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 w-full">
            <div className="p-5 sm:p-8 rounded-xl sm:rounded-2xl border ember-border bg-[var(--bg-card)] hover:border-[var(--brand-orange)] transition-all group shadow-sm">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-5 group-hover:scale-110 transition-transform">
                ⚡
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Automated Reply Loops</h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                When readers reply to each other, instant branded email notifications bring them back to the exact comment. Seamless re-engagement without spamming.
              </p>
            </div>

            <div className="p-5 sm:p-8 rounded-xl sm:rounded-2xl border ember-border bg-[var(--bg-card)] hover:border-[var(--brand-orange)] transition-all group shadow-sm">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-5 group-hover:scale-110 transition-transform">
                ✍️
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Author Notifications</h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Co-authored articles or guest writers? Nyuzi automatically routes comments to the right author so writers can join the discussion immediately.
              </p>
            </div>

            <div className="p-5 sm:p-8 rounded-xl sm:rounded-2xl border ember-border bg-[var(--bg-card)] hover:border-[var(--brand-orange)] transition-all group shadow-sm">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-5 group-hover:scale-110 transition-transform">
                🔒
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">100% Private & Ad-Free</h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                No invasive third-party ad networks, no tracking beacons, and no bloated scripts. Just clean, respectful conversation for your community.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Embed Snippet Generator */}
        <section id="snippet" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-12 border-t ember-border bg-[var(--bg-card-subtle)] w-full">
          <div className="max-w-4xl mx-auto w-full">
            <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[var(--brand-orange)]">Quick Start</span>
              <h2 className="font-serif-title text-2xl sm:text-4xl font-bold mt-1.5 sm:mt-2 mb-2 sm:mb-3">
                Embed in 2 minutes
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                Copy and paste this snippet anywhere on your website or publication template.
              </p>
            </div>

            <div className="p-4 sm:p-8 rounded-xl sm:rounded-2xl border ember-border bg-[var(--bg-card)] shadow-md space-y-4 sm:space-y-6 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                    Your Site / Publication ID
                  </label>
                  <input
                    type="text"
                    value={snippetSiteId}
                    onChange={(e) => setSnippetSiteId(e.target.value.trim() || "my-publication")}
                    className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-lg sm:rounded-xl border ember-border bg-[var(--bg-input)] text-xs sm:text-sm font-medium focus:outline-none focus:border-[var(--brand-orange)]"
                    placeholder="e.g. my-tech-blog"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                    Accent Color
                  </label>
                  <input
                    type="text"
                    value={playgroundAccent}
                    onChange={(e) => setPlaygroundAccent(e.target.value)}
                    className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-lg sm:rounded-xl border ember-border bg-[var(--bg-input)] text-xs sm:text-sm font-medium focus:outline-none focus:border-[var(--brand-orange)] font-mono"
                    placeholder="#f56220"
                  />
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="relative w-full overflow-hidden rounded-xl border border-[#f56220]/20">
                <pre className="p-3 sm:p-5 bg-[#090605] text-[#f8fafc] text-[11px] sm:text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed max-w-full">
                  <code>{embedCode}</code>
                </pre>
                <button
                  onClick={copySnippet}
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white text-[11px] sm:text-xs font-bold transition-all cursor-pointer shadow"
                >
                  {copied ? "✓ Copied!" : "Copy Snippet"}
                </button>
              </div>

              <div className="text-center text-[10px] sm:text-xs text-[var(--text-muted)]">
                Works seamlessly with Next.js, Remix, Astro, Ghost, WordPress, or plain HTML.
              </div>
            </div>
          </div>
        </section>

        {/* Real-World Showcase Banner */}
        <section id="showcase" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12 border-t ember-border w-full">
          <div className="max-w-4xl mx-auto p-5 sm:p-8 rounded-xl sm:rounded-2xl border ember-border bg-gradient-to-r from-[var(--bg-card)] to-[var(--bg-card-subtle)] flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 shadow-sm w-full">
            <div className="space-y-1.5 sm:space-y-2 text-center md:text-left">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[var(--brand-orange)]">Production Showcase</span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif-title text-[var(--text-main)]">
                Powering The Reading Circle 254
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl">
                Active discussion threads, author notifications, and instant load speeds powering Kenya&apos;s premier literary community.
              </p>
            </div>
            <a
              href="https://www.readingcircle254.com/blog"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto text-center px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl border border-[var(--brand-orange)] text-[var(--brand-orange)] hover:bg-[var(--brand-orange)] hover:text-white font-bold text-xs sm:text-sm transition-all whitespace-nowrap"
            >
              View Live on TRC &rarr;
            </a>
          </div>
        </section>
      </main>

      {/* Bottom Reusable Footer */}
      <Footer />
    </div>
  );
}
