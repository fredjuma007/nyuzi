"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sun, Moon, LogOut, User as UserIcon } from "lucide-react";
import { Logo } from "./Logo";
import { useSession, signOut } from "@/lib/auth-client";
import { AuthModal } from "./AuthModal";

export function Navbar() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const { data: session } = useSession();

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
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-[var(--border-card)] px-4 sm:px-6 lg:px-12 py-3 sm:py-3.5 transition-colors duration-200 bg-[var(--bg-page)]/80">
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
                className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)] hover:border-[var(--brand-orange)]/40 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors cursor-pointer flex items-center justify-center shadow-xs"
                title={isDark ? "Switch to Light mode" : "Switch to Dark mode"}
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-[var(--text-secondary)]" />
                )}
              </button>
            )}

            {/* Auth Dependent Controls */}
            {mounted && session?.user ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-semibold text-xs sm:text-sm shadow-md shadow-[#f56220]/20 transition-all hover:scale-[1.02] flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                    {session.user.name?.charAt(0) || "U"}
                  </span>
                  <span>Dashboard</span>
                  <span>&rarr;</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="p-2 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)] hover:border-rose-500 hover:text-rose-500 text-[var(--text-muted)] transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => {
                    setAuthMode("signin");
                    setIsAuthOpen(true);
                  }}
                  className="px-3.5 py-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setAuthMode("signup");
                    setIsAuthOpen(true);
                  }}
                  className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-semibold text-xs sm:text-sm shadow-md shadow-[#f56220]/20 transition-all hover:scale-[1.02] flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                >
                  <span>Get Started</span>
                  <span>&rarr;</span>
                </button>
              </div>
            )}

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
          <div className="md:hidden pt-3 pb-3 border-t border-[var(--border-card)] mt-3 space-y-1.5 flex flex-col text-sm font-medium text-[var(--text-secondary)]">
            {session?.user ? (
              <div className="space-y-1.5 mb-2">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-2.5 rounded-lg bg-[var(--brand-orange)] text-white font-bold flex items-center justify-between shadow-sm"
                >
                  <span>Open Dashboard</span>
                  <span>&rarr;</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut();
                  }}
                  className="w-full text-left px-3.5 py-2 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors font-medium text-xs flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out ({session.user.email})</span>
                </button>
              </div>
            ) : (
              <div className="flex gap-2 mb-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthMode("signin");
                    setIsAuthOpen(true);
                  }}
                  className="flex-1 px-3 py-2 rounded-lg border border-[var(--border-card)] bg-[var(--bg-card)] text-center font-semibold text-xs"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthMode("signup");
                    setIsAuthOpen(true);
                  }}
                  className="flex-1 px-3 py-2 rounded-lg bg-[var(--brand-orange)] text-white text-center font-bold text-xs"
                >
                  Get Started Free
                </button>
              </div>
            )}

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

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        defaultMode={authMode}
      />
    </>
  );
}
