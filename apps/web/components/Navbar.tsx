"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "./Logo";

export function Navbar() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("nyuzi-theme");
    if (savedTheme) {
      const dark = savedTheme === "dark";
      setIsDark(dark);
      if (dark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      const isHtmlDark = document.documentElement.classList.contains("dark");
      setIsDark(isHtmlDark);
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("nyuzi-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("nyuzi-theme", "light");
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b ember-border px-4 sm:px-6 lg:px-12 py-3 transition-colors duration-200 w-full max-w-full bg-[var(--bg-page)]/85">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <Logo />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--text-secondary)]">
          <a href="#playground" className="hover:text-[var(--brand-orange)] transition-colors">
            Playground
          </a>
          <a href="#features" className="hover:text-[var(--brand-orange)] transition-colors">
            Features
          </a>
          <a href="#snippet" className="hover:text-[var(--brand-orange)] transition-colors">
            Quick Embed
          </a>
          <a href="#showcase" className="hover:text-[var(--brand-orange)] transition-colors">
            Showcase
          </a>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="h-8 px-2 sm:h-9 sm:px-3 rounded-lg border ember-border text-xs sm:text-sm hover:text-[var(--brand-orange)] hover:border-[var(--brand-orange)] transition-all bg-[var(--bg-card)] cursor-pointer flex items-center justify-center gap-1.5"
              title={isDark ? "Switch to Light mode" : "Switch to Dark mode"}
              aria-label="Toggle theme"
            >
              <span>{isDark ? "☀️" : "🌙"}</span>
              <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
            </button>
          )}

          {/* Desktop Dashboard Button */}
          <Link
            href="/dashboard"
            className="hidden sm:flex px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-semibold text-xs sm:text-sm shadow-md shadow-[#f56220]/20 transition-all hover:scale-[1.02] items-center gap-1.5 whitespace-nowrap"
          >
            <span>Dashboard</span>
            <span>&rarr;</span>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 rounded-lg border ember-border text-[var(--text-secondary)] hover:text-[var(--brand-orange)] bg-[var(--bg-card)] cursor-pointer flex items-center justify-center shrink-0"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-3 pb-3 border-t ember-border mt-3 space-y-1.5 flex flex-col text-sm font-medium text-[var(--text-secondary)]">
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3.5 py-2.5 rounded-lg bg-[var(--brand-orange)] text-white font-bold flex items-center justify-between shadow-sm mb-2"
          >
            <span>Open Dashboard</span>
            <span>&rarr;</span>
          </Link>
          <a
            href="#playground"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3.5 py-2 rounded-lg hover:bg-[var(--brand-orange)]/10 hover:text-[var(--brand-orange)] transition-colors"
          >
            Playground
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3.5 py-2 rounded-lg hover:bg-[var(--brand-orange)]/10 hover:text-[var(--brand-orange)] transition-colors"
          >
            Features
          </a>
          <a
            href="#snippet"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3.5 py-2 rounded-lg hover:bg-[var(--brand-orange)]/10 hover:text-[var(--brand-orange)] transition-colors"
          >
            Quick Embed
          </a>
          <a
            href="#showcase"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3.5 py-2 rounded-lg hover:bg-[var(--brand-orange)]/10 hover:text-[var(--brand-orange)] transition-colors"
          >
            Showcase
          </a>
        </div>
      )}
    </header>
  );
}
