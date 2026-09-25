"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function LandingPage() {
  const [isDark, setIsDark] = useState(true);
  const [playgroundAccent, setPlaygroundAccent] = useState("#f56220");
  const [playgroundReaction, setPlaygroundReaction] = useState<"heart" | "upvote">("heart");
  const [snippetSiteId, setSnippetSiteId] = useState("my-publication");
  const [copied, setCopied] = useState(false);

  // Sync dark class with document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

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
    <div className="min-h-screen flex flex-col relative selection:bg-[#f56220] selection:text-white">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-radial-glow pointer-events-none opacity-80 z-0" />

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b ember-border px-6 lg:px-12 py-3.5 transition-colors duration-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#facc15] to-[#f56220] flex items-center justify-center shadow-md shadow-[#f56220]/25 group-hover:scale-105 transition-transform duration-200">
              <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <span className="font-bold text-lg tracking-tight flex items-center gap-1">
              <span>Nyuzi</span>
              <span className="text-[#f56220]">Yap</span>
            </span>
            <span className="ml-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f56220]/10 text-[#f56220] border border-[#f56220]/20 hidden sm:inline-block">
              Edge Engine
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--text-secondary)]">
            <a href="#playground" className="hover:text-[var(--brand-orange)] transition-colors">
              Live Playground
            </a>
            <a href="#features" className="hover:text-[var(--brand-orange)] transition-colors">
              Why Nyuzi
            </a>
            <a href="#snippet" className="hover:text-[var(--brand-orange)] transition-colors">
              Quick Embed
            </a>
            <a
              href="https://www.readingcircle254.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-[var(--brand-orange)] transition-colors"
            >
              <span>Customer #0</span>
              <span className="text-xs">↗</span>
            </a>
          </nav>

          {/* Right Controls: Theme Toggle & Dashboard CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg border ember-border text-sm hover:text-[var(--brand-orange)] hover:border-[var(--brand-orange)] transition-all bg-[var(--bg-card)] cursor-pointer"
              title="Toggle Light / Dark mode"
              aria-label="Toggle theme"
            >
              {isDark ? "☀️ Light" : "🌙 Dark"}
            </button>

            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-lg bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-semibold text-sm shadow-md shadow-[#f56220]/20 transition-all hover:scale-[1.02] flex items-center gap-1.5"
            >
              <span>Open Dashboard</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 z-10">
        <section className="pt-16 pb-20 px-6 lg:px-12 text-center max-w-5xl mx-auto">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border ember-border bg-[var(--bg-card-subtle)] text-xs font-semibold mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#f56220] animate-pulse" />
            <span className="text-[var(--text-secondary)]">Sub-20ms Global Latency &bull; Cloudflare Edge D1</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif-title text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Turn reader attention into{" "}
            <span className="text-gradient-orange italic">a thriving community.</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed mb-10">
            The ultra-lightweight (<strong>&lt;15KB</strong>), privacy-first comment engine with automated email retention loops. Zero bloated ads. Zero ad tracking. Instant edge speed.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#playground"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-bold text-base shadow-lg shadow-[#f56220]/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span>Try Live Playground</span>
              <span>&darr;</span>
            </a>
            <a
              href="#snippet"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl border ember-border bg-[var(--bg-card)] hover:border-[var(--brand-orange)] text-[var(--text-main)] font-semibold text-base transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span>Get 2-Line Embed</span>
              <span>&rarr;</span>
            </a>
          </div>

          {/* Metric Cards (Inspired by inspirations) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-5 rounded-2xl border ember-border bg-[var(--bg-card)] text-left shadow-sm">
              <div className="text-3xl font-extrabold text-[var(--brand-orange)] mb-1">&lt; 15 KB</div>
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1">Featherweight</div>
              <div className="text-xs text-[var(--text-muted)]">99% lighter than Disqus or heavy plugins</div>
            </div>

            <div className="p-5 rounded-2xl border ember-border bg-[var(--bg-card)] text-left shadow-sm">
              <div className="text-3xl font-extrabold text-[#facc15] mb-1">~12 ms</div>
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1">Edge Latency</div>
              <div className="text-xs text-[var(--text-muted)]">Powered globally by Cloudflare Workers & D1</div>
            </div>

            <div className="p-5 rounded-2xl border ember-border bg-[var(--bg-card)] text-left shadow-sm">
              <div className="text-3xl font-extrabold text-[var(--brand-orange)] mb-1">100%</div>
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1">Privacy First</div>
              <div className="text-xs text-[var(--text-muted)]">Zero ad cookies, zero cross-site trackers</div>
            </div>

            <div className="p-5 rounded-2xl border ember-border bg-[var(--bg-card)] text-left shadow-sm">
              <div className="text-3xl font-extrabold text-[#facc15] mb-1">Auto ⚡</div>
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1">Retention Loops</div>
              <div className="text-xs text-[var(--text-muted)]">Instant Resend reply & author email alerts</div>
            </div>
          </div>
        </section>

        {/* Live Playground Studio Section */}
        <section id="playground" className="py-20 px-6 lg:px-12 border-t ember-border bg-[var(--bg-card-subtle)]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--brand-orange)]">Interactive Sandbox</span>
              <h2 className="font-serif-title text-3xl sm:text-4xl font-bold mt-2 mb-3">
                Experience the widget live
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)]">
                Customize colors and reactions below, then leave a test comment right inside the preview. Powered by our live edge worker.
              </p>
            </div>

            {/* Playground Box */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Controls Column */}
              <div className="lg:col-span-4 p-6 rounded-2xl border ember-border bg-[var(--bg-card)] space-y-6 shadow-sm">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
                    Accent Color
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {accentColors.map((color) => (
                      <button
                        key={color.hex}
                        onClick={() => setPlaygroundAccent(color.hex)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                          playgroundAccent === color.hex
                            ? "ring-2 ring-offset-2 ring-[var(--brand-orange)] scale-110 shadow-md"
                            : "opacity-80 hover:opacity-100 hover:scale-105"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {playgroundAccent === color.hex && (
                          <span className="text-white text-xs font-bold">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                  <span className="text-xs text-[var(--text-muted)] mt-2 block">
                    Selected: <strong style={{ color: playgroundAccent }}>{playgroundAccent}</strong>
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
                    Reaction Style
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPlaygroundReaction("heart")}
                      className={`px-3.5 py-2.5 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
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
                      className={`px-3.5 py-2.5 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
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

                <div className="p-4 rounded-xl bg-[var(--bg-card-subtle)] border ember-border text-xs space-y-2">
                  <div className="flex items-center justify-between text-[var(--text-secondary)]">
                    <span>Edge Worker:</span>
                    <span className="text-emerald-500 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      Live (Global)
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[var(--text-secondary)]">
                    <span>Email Dispatcher:</span>
                    <span className="font-semibold text-[var(--brand-orange)]">Resend (Verified)</span>
                  </div>
                  <div className="flex items-center justify-between text-[var(--text-secondary)]">
                    <span>Database:</span>
                    <span className="font-semibold text-[var(--text-main)]">Cloudflare D1</span>
                  </div>
                </div>
              </div>

              {/* Right Preview Column */}
              <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl border ember-border bg-[var(--bg-card)] shadow-lg">
                <div className="flex items-center justify-between border-b ember-border pb-4 mb-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest font-bold text-[var(--text-muted)]">Live Embed Preview</span>
                    <h4 className="text-base font-bold text-[var(--text-main)]">The Future of Edge Comments</h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    Live Demo
                  </span>
                </div>

                {/* Target widget mount point */}
                <div
                  id="nyuzi-comments"
                  data-site-id="demo"
                  data-thread-url="https://nyuzi-yap.vercel.app/demo"
                  data-thread-title="The Future of Edge Comments"
                  data-accent-color={playgroundAccent}
                  data-reaction={playgroundReaction}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid Section */}
        <section id="features" className="py-24 px-6 lg:px-12 max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--brand-orange)]">Built For Publishers</span>
            <h2 className="font-serif-title text-3xl sm:text-5xl font-bold mt-2 mb-4">
              Everything modern blogs need. Nothing they don&apos;t.
            </h2>
            <p className="text-[var(--text-secondary)] text-base">
              Engineered from first principles to be fast, beautiful, and deeply engaging for your readers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border ember-border bg-[var(--bg-card)] hover:border-[var(--brand-orange)] transition-all group shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                ⚡
              </div>
              <h3 className="text-xl font-bold mb-2">Automated Retention Loops</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                When readers reply to each other, instant branded email notifications bring them back to the exact comment. Unbroken viral re-engagement without spamming.
              </p>
            </div>

            <div className="p-8 rounded-2xl border ember-border bg-[var(--bg-card)] hover:border-[var(--brand-orange)] transition-all group shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                ✍️
              </div>
              <h3 className="text-xl font-bold mb-2">Multi-Author Roster</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Co-authored articles or guest writers? Nyuzi automatically parses co-authors and alerts the right writer when readers comment on their work.
              </p>
            </div>

            <div className="p-8 rounded-2xl border ember-border bg-[var(--bg-card)] hover:border-[var(--brand-orange)] transition-all group shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                🔒
              </div>
              <h3 className="text-xl font-bold mb-2">100% Privacy & Zero Ads</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Unlike Disqus, which loads megabytes of third-party ad trackers and sells user data, Nyuzi is 100% private, GDPR-compliant, and cookie-free.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Embed Snippet Generator */}
        <section id="snippet" className="py-20 px-6 lg:px-12 border-t ember-border bg-[var(--bg-card-subtle)]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--brand-orange)]">Quick Start</span>
              <h2 className="font-serif-title text-3xl sm:text-4xl font-bold mt-2 mb-3">
                Embed in 2 minutes
              </h2>
              <p className="text-sm text-[var(--text-secondary)]">
                Copy and paste this snippet anywhere on your website or blog template.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border ember-border bg-[var(--bg-card)] shadow-md space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                    Your Site / Publication ID
                  </label>
                  <input
                    type="text"
                    value={snippetSiteId}
                    onChange={(e) => setSnippetSiteId(e.target.value.trim() || "my-publication")}
                    className="w-full px-3.5 py-2.5 rounded-xl border ember-border bg-[var(--bg-input)] text-sm font-medium focus:outline-none focus:border-[var(--brand-orange)]"
                    placeholder="e.g. my-tech-blog"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                    Accent Color
                  </label>
                  <input
                    type="text"
                    value={playgroundAccent}
                    onChange={(e) => setPlaygroundAccent(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border ember-border bg-[var(--bg-input)] text-sm font-medium focus:outline-none focus:border-[var(--brand-orange)] font-mono"
                    placeholder="#f56220"
                  />
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="relative">
                <pre className="p-4 sm:p-5 rounded-xl bg-[#090605] text-[#f8fafc] text-xs sm:text-sm font-mono overflow-x-auto border border-[#f56220]/20 leading-relaxed">
                  <code>{embedCode}</code>
                </pre>
                <button
                  onClick={copySnippet}
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white text-xs font-bold transition-all cursor-pointer shadow"
                >
                  {copied ? "✓ Copied!" : "Copy Snippet"}
                </button>
              </div>

              <div className="text-center text-xs text-[var(--text-muted)]">
                Works seamlessly with Next.js, Remix, Astro, Ghost, WordPress, or plain HTML.
              </div>
            </div>
          </div>
        </section>

        {/* Customer #0 Case Study Banner */}
        <section className="py-16 px-6 lg:px-12 border-t ember-border">
          <div className="max-w-4xl mx-auto p-8 rounded-2xl border ember-border bg-gradient-to-r from-[var(--bg-card)] to-[var(--bg-card-subtle)] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#15803d]">Customer #0 Success Story</span>
              <h3 className="text-2xl font-bold font-serif-title text-[var(--text-main)]">
                Powering The Reading Circle
              </h3>
              <p className="text-sm text-[var(--text-secondary)] max-w-xl">
                76 historical comments migrated, 32 articles live, multi-author notifications, and sub-15ms edge speed for Kenya&apos;s leading literary club.
              </p>
            </div>
            <a
              href="https://www.readingcircle254.com/blog"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl border border-[#15803d] text-[#15803d] hover:bg-[#15803d] hover:text-white font-bold text-sm transition-all whitespace-nowrap"
            >
              View Live on TRC &rarr;
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t ember-border py-8 px-6 lg:px-12 bg-[var(--bg-card)] text-xs text-[var(--text-muted)]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-[var(--text-main)]">NyuziYap ⚡</span>
            <span>&bull;</span>
            <span>Edge-Powered Comments Infrastructure</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="hover:text-[var(--brand-orange)] transition-colors">
              Site Dashboard
            </Link>
            <a href="https://github.com/fredjuma007/Nyuzi" target="_blank" rel="noreferrer" className="hover:text-[var(--brand-orange)] transition-colors">
              GitHub
            </a>
            <span>&copy; {new Date().getFullYear()} Nyuzi. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
