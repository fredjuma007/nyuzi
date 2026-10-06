"use client";

import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  CornerDownRight,
  Heart,
  Palette,
  Link2,
  ShieldCheck,
  Zap,
  PenTool,
  Lock,
  ChevronDown,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroIllustration } from "@/components/HeroIllustration";
import { PlaygroundStudio } from "@/components/PlaygroundStudio";

export default function LandingPage() {
  const [isStudioModalOpen, setIsStudioModalOpen] = useState(false);
  const [snippetAccent, setSnippetAccent] = useState("#f56220");
  const [snippetReaction, setSnippetReaction] = useState<"like" | "heart" | "upvote">("heart");
  const [snippetSiteId, setSnippetSiteId] = useState("my-publication");
  const [copied, setCopied] = useState(false);

  const embedCode = `<div id="nyuzi-comments" data-site-id="${snippetSiteId}" data-accent-color="${snippetAccent}" data-reaction="${snippetReaction}"></div>\n<script src="https://nyuzi-yap.vercel.app/embed.js" async></script>`;

  const copySnippet = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-[#f56220] selection:text-white w-full max-w-full overflow-x-hidden">
      {/* Background Atmospheric Stage Glow (100% Full-Bleed with No Side Cuts) */}
      <div className="absolute top-0 inset-x-0 w-full h-[650px] sm:h-[800px] bg-radial-glow pointer-events-none opacity-85 z-0" />
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-[#f56220]/5 via-transparent to-transparent pointer-events-none z-0" />

      {/* Top Reusable Fixed Navbar */}
      <Navbar />

      {/* Main Content with top padding to offset the fixed navbar */}
      <main className="flex-1 w-full max-w-full pt-16 sm:pt-20">
        {/* Hero Section */}
        <section className="pt-6 sm:pt-10 lg:pt-14 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center text-center lg:text-left mb-8 sm:mb-12">
            {/* Left Content Column */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-5 sm:space-y-6">
              {/* Feature Kicker (Hyvor Style: Comments • Replies • Reactions) */}
              <div className="inline-flex items-center gap-2 sm:gap-3 px-3.5 py-1.5 rounded-full border border-[var(--border-card)] bg-[var(--bg-card)]/80 backdrop-blur-xs text-xs sm:text-sm font-serif-title text-[var(--text-secondary)] shadow-xs mx-auto lg:mx-0">
                <span className="flex items-center gap-1.5 font-medium text-[var(--text-main)]">
                  <MessageSquare className="w-3.5 h-3.5 text-[var(--brand-orange)]" />
                  <span>Comments</span>
                </span>
                <span className="text-[var(--text-muted)]">&bull;</span>
                <span className="flex items-center gap-1.5 font-medium text-[var(--text-main)]">
                  <CornerDownRight className="w-3.5 h-3.5 text-amber-500" />
                  <span>Replies</span>
                </span>
                <span className="text-[var(--text-muted)]">&bull;</span>
                <span className="flex items-center gap-1.5 font-medium text-[var(--text-main)]">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
                  <span>Reactions</span>
                </span>
              </div>

              {/* Main Headline with Editorial Marker Highlight */}
              <h1 className="font-serif-title text-3xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold tracking-tight leading-[1.12] text-[var(--text-main)]">
                Turn reader attention into{" "}
                <span className="relative inline-block text-[var(--brand-orange)] whitespace-nowrap">
                  <span className="relative z-10 italic">a thriving community!</span>
                  <span className="absolute left-0 bottom-1 sm:bottom-2 w-full h-3 sm:h-4 bg-amber-400/25 dark:bg-amber-500/20 rounded-sm -rotate-1 z-0 pointer-events-none" />
                </span>
              </h1>

              {/* Killer Line */}
              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-lg mx-auto lg:mx-0 font-normal">
                Fast, privacy-first discussions built for modern publications.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1 w-full max-w-xs sm:max-w-none mx-auto lg:mx-0">
                <button
                  onClick={() => setIsStudioModalOpen(true)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#f56220]/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Try Live Playground</span>
                  <span>&rarr;</span>
                </button>
                <a
                  href="#snippet"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl border ember-border bg-[var(--bg-card)] hover:border-[var(--brand-orange)] text-[var(--text-main)] font-semibold text-sm sm:text-base transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get 2-Line Embed</span>
                  <span>&rarr;</span>
                </a>
              </div>
            </div>

            {/* Right Illustration Column */}
            <div className="lg:col-span-5 xl:col-span-5 w-full">
              <HeroIllustration />
            </div>
          </div>

          {/* Hyvor-Style Centered Scroll Indicator */}
          <div className="pt-2 sm:pt-4 flex justify-center">
            <a
              href="#metrics"
              className="inline-flex flex-col items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--brand-orange)] transition-colors cursor-pointer group select-none"
              aria-label="Scroll to capabilities"
            >
              {/* Minimalist Mouse Pill */}
              <div className="w-5 h-8 rounded-full border-2 border-[var(--border-card)] group-hover:border-[var(--brand-orange)] flex items-start justify-center p-1 transition-colors">
                <span className="w-1 h-2 rounded-full bg-[var(--brand-orange)] animate-bounce" />
              </div>
              {/* Subtle Animated Chevron */}
              <ChevronDown className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--brand-orange)] transition-colors animate-pulse" />
            </a>
          </div>
        </section>

        {/* Dedicated Full-Width Architectural Metrics Ribbon */}
        <section
          id="metrics"
          className="border-y border-[var(--border-card)] bg-[var(--bg-card)]/30 backdrop-blur-xs py-10 sm:py-14 w-full scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
              <div className="p-5 sm:p-6 rounded-2xl border ember-border bg-[var(--bg-card)] text-left shadow-sm transition-all hover:border-[var(--brand-orange)]/50 hover:-translate-y-1">
                <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-[var(--brand-orange)] mb-1.5">
                  &lt; 15 KB
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                  Featherweight
                </div>
                <div className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Ultra-lightweight script bundle that downloads in milliseconds.
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl border ember-border bg-[var(--bg-card)] text-left shadow-sm transition-all hover:border-[var(--brand-orange)]/50 hover:-translate-y-1">
                <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-[#facc15] mb-1.5">
                  Instant
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                  Zero Lag
                </div>
                <div className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Loads asynchronously without blocking your publication&apos;s rendering.
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl border ember-border bg-[var(--bg-card)] text-left shadow-sm transition-all hover:border-[var(--brand-orange)]/50 hover:-translate-y-1">
                <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-[var(--brand-orange)] mb-1.5">
                  100%
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                  Privacy First
                </div>
                <div className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Zero ad cookies, zero cross-site tracking, 100% reader respectful.
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl border ember-border bg-[var(--bg-card)] text-left shadow-sm transition-all hover:border-[var(--brand-orange)]/50 hover:-translate-y-1">
                <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-[#facc15] mb-1.5">
                  Smart
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                  Notifications
                </div>
                <div className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Instant branded alerts that bring readers and writers back into the loop.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Studio Sandbox Section */}
        <section id="playground" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 xl:px-12 border-t ember-border bg-[var(--bg-card-subtle)] w-full">
          <div className="max-w-7xl mx-auto w-full">
            <PlaygroundStudio
              isModalOpen={isStudioModalOpen}
              onOpenModal={() => setIsStudioModalOpen(true)}
              onCloseModal={() => setIsStudioModalOpen(false)}
            />
          </div>
        </section>

        {/* Feature Grid Section */}
        <section id="features" className="py-14 sm:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl mx-auto w-full">
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
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Automated Reply Loops</h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                When readers reply to each other, instant branded email notifications bring them back to the exact comment. Seamless re-engagement without spamming.
              </p>
            </div>

            <div className="p-5 sm:p-8 rounded-xl sm:rounded-2xl border ember-border bg-[var(--bg-card)] hover:border-[var(--brand-orange)] transition-all group shadow-sm">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform">
                <PenTool className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Author Notifications</h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Co-authored articles or guest writers? Nyuzi automatically routes comments to the right author so writers can join the discussion immediately.
              </p>
            </div>

            <div className="p-5 sm:p-8 rounded-xl sm:rounded-2xl border ember-border bg-[var(--bg-card)] hover:border-[var(--brand-orange)] transition-all group shadow-sm">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform">
                <Lock className="w-5 h-5 sm:w-6 sm:h-6" />
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
                    value={snippetAccent}
                    onChange={(e) => setSnippetAccent(e.target.value)}
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
        <section id="showcase" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 xl:px-12 border-t ember-border w-full">
          <div className="max-w-7xl mx-auto p-5 sm:p-8 rounded-xl sm:rounded-2xl border ember-border bg-gradient-to-r from-[var(--bg-card)] to-[var(--bg-card-subtle)] flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 shadow-sm w-full">
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
