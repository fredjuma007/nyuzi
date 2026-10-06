"use client";

import React from "react";
import { Heart, MessageSquare, CornerDownRight, Sparkles, Zap, Flame } from "lucide-react";

export function HeroIllustration() {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none select-none">
      {/* Background Dot Matrix Grid (Hyvor Style) */}
      <div className="absolute inset-0 -m-4 rounded-3xl bg-radial-glow opacity-60 pointer-events-none" />
      <div
        className="relative rounded-3xl border border-[var(--border-card)] bg-[var(--bg-card)]/50 backdrop-blur-xs p-5 sm:p-7 shadow-xl overflow-hidden"
        style={{
          backgroundImage: `radial-gradient(var(--border-card) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      >
        {/* Soft Warm Ambient Glow */}
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[var(--brand-orange)]/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        {/* Mascot Character & Conversation Scene */}
        <div className="relative space-y-4">
          {/* Floating Pill: Live Notification Chime */}
          <div className="flex items-center justify-between text-xs pb-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[11px] font-bold shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Real-time Sync</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--brand-orange)]/10 border border-[var(--brand-orange)]/25 text-[var(--brand-orange)] text-[11px] font-bold">
              <Zap className="w-3 h-3" />
              <span>Author Alerted</span>
            </div>
          </div>

          {/* Card 1: Reader Comment (Floating Top) */}
          <div className="p-3.5 sm:p-4 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-md space-y-2 relative transition-transform hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-[var(--brand-orange)] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  B
                </div>
                <div>
                  <span className="font-bold text-xs text-[var(--text-main)]">Brenda Frenjo</span>
                  <span className="text-[10px] text-[var(--text-muted)] ml-1.5">&bull; 2m ago</span>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-rose-500 flex items-center gap-1 bg-rose-500/10 px-2 py-0.5 rounded-full">
                <Heart className="w-3 h-3 fill-rose-500" />
                <span>14</span>
              </span>
            </div>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              This chapter broke my heart in the best way possible! That plot twist on page 142 was sheer literary magic.
            </p>

            {/* Mini GIF Card Preview */}
            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[var(--bg-card-subtle)] border border-[var(--border-card)] text-[10px] text-[var(--text-muted)] font-medium">
              <span className="px-1 py-0.2 rounded bg-black/70 text-white font-extrabold text-[8px] uppercase tracking-wider">
                GIF
              </span>
              <span>mind-blown.gif</span>
            </div>
          </div>

          {/* Connecting Curved Thread & Character Centerpiece */}
          <div className="relative pl-6 sm:pl-8 py-1">
            {/* The SVG Thread line (Nyuzi in Swahili) */}
            <svg
              className="absolute left-3.5 top-0 w-6 h-full text-[var(--brand-orange)] pointer-events-none"
              viewBox="0 0 24 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M 6 0 V 30 C 6 45 18 45 22 45" />
            </svg>

            {/* Card 2: Nested Author Reply with Verified Badge */}
            <div className="p-3 sm:p-3.5 rounded-xl border border-[var(--brand-orange)]/35 bg-[var(--bg-card-subtle)] shadow-sm space-y-1.5 relative transition-transform hover:-translate-y-0.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[var(--text-main)] text-[var(--bg-page)] font-bold text-[10px] flex items-center justify-center">
                    N
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-[var(--text-main)]">Nekesa</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[var(--brand-orange)]/15 text-[var(--brand-orange)] border border-[var(--brand-orange)]/25">
                      Author
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full">
                  <Flame className="w-3 h-3 fill-amber-500" />
                  <span>8</span>
                </div>
              </div>

              <p className="text-[11px] sm:text-xs text-[var(--text-secondary)] leading-relaxed">
                Thank you Brenda! That section took three full drafts to balance. So glad it resonated with you.
              </p>
            </div>
          </div>

          {/* Hyvor-Style Friendly Mascot Character Floating Beside / Bottom */}
          <div className="pt-2 flex items-center justify-between border-t border-[var(--border-card)]/70">
            {/* Mascot Avatar & Greeting */}
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 shrink-0">
                {/* Mascot Body SVG */}
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                  {/* Outer glow */}
                  <circle cx="50" cy="50" r="46" fill="#f56220" opacity="0.12" />
                  {/* Bean / Pill Character Body */}
                  <rect
                    x="24"
                    y="18"
                    width="52"
                    height="64"
                    rx="26"
                    fill="url(#mascot-gradient)"
                  />
                  {/* Soft Belly Highlight */}
                  <ellipse cx="50" cy="55" rx="18" ry="20" fill="#fff" opacity="0.25" />
                  {/* Happy Closed Eyes ( ^  ^ ) */}
                  <path
                    d="M 38 42 Q 43 36 48 42"
                    stroke="#261b17"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M 52 42 Q 57 36 62 42"
                    stroke="#261b17"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Cute Rosy Cheeks */}
                  <circle cx="34" cy="48" r="4" fill="#fb7185" opacity="0.7" />
                  <circle cx="66" cy="48" r="4" fill="#fb7185" opacity="0.7" />
                  {/* Cheerful Smile */}
                  <path
                    d="M 44 51 Q 50 58 56 51"
                    stroke="#261b17"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Tiny Yarn/Thread Ball in Hand */}
                  <circle cx="74" cy="62" r="9" fill="#f56220" />
                  <path
                    d="M 69 60 Q 74 65 79 60"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />

                  <defs>
                    <linearGradient id="mascot-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fde68a" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div>
                <span className="block text-xs font-bold text-[var(--text-main)]">
                  The Nyuzi Thread
                </span>
                <span className="block text-[11px] text-[var(--text-muted)]">
                  Connecting readers & writers directly
                </span>
              </div>
            </div>

            {/* Quick Interactive Reaction Badges */}
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[var(--border-card)] bg-[var(--bg-card)] text-xs shadow-2xs hover:scale-105 transition-transform cursor-pointer">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
                <span className="text-[10px] font-bold text-[var(--text-secondary)]">24</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[var(--border-card)] bg-[var(--bg-card)] text-xs shadow-2xs hover:scale-105 transition-transform cursor-pointer">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
                <span className="text-[10px] font-bold text-[var(--text-secondary)]">9</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
