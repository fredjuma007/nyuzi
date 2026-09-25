import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t ember-border py-8 sm:py-10 px-4 sm:px-6 lg:px-12 bg-[var(--bg-card)] text-xs text-[var(--text-muted)] transition-colors duration-200 w-full max-w-full">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
        {/* Left: Navigation Links & Copyright */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-xs sm:text-sm">
          <span className="text-[11px] sm:text-xs text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} NyuziYap. All rights reserved
          </span>
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
          
        </div>

        {/* Right: Fred Juma Branding */}
        <div className="flex items-center justify-center sm:justify-end">
          <a
            href="https://fredjuma-dev.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
          >
            <span>Developed by</span>
            <span className="font-black tracking-tight inline-flex items-center text-xs sm:text-sm group-hover:scale-105 transition-transform uppercase">
              <span className="text-[#3b82f6]">FRED</span>
              <span className="text-[#f59e0b] ml-1">JUMA</span>
            </span>
            <span className="text-[10px] text-[var(--text-muted)] group-hover:text-[#f59e0b] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
              ↗
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
