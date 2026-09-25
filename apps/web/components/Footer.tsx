import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t ember-border py-8 sm:py-10 px-4 sm:px-6 lg:px-12 bg-[var(--bg-card)] text-xs text-[var(--text-muted)] transition-colors duration-200 w-full max-w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          <Logo showIcon={false} />
          <span className="hidden sm:inline-block text-[var(--border-subtle)]">&bull;</span>
          <span className="text-[11px] sm:text-xs">Fast, private comments for modern publications</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
          <Link href="/dashboard" className="hover:text-[var(--brand-orange)] transition-colors">
            Dashboard
          </Link>
          <a
            href="https://github.com/fredjuma007/nyuzi"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--brand-orange)] transition-colors flex items-center gap-1"
          >
            <span>GitHub</span>
            <span className="text-xs">&rarr;</span>
          </a>
          <span className="text-[11px] sm:text-xs text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} Nyuzi.
          </span>
        </div>
      </div>
    </footer>
  );
}
