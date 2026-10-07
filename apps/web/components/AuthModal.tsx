"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Sparkles, Loader2, ArrowRight } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: "signin" | "signup";
}

export function AuthModal({ isOpen, onClose, defaultMode = "signin" }: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">(defaultMode);
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMode(defaultMode);
  }, [defaultMode]);

  // ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSocialSignIn = async (provider: "github" | "google") => {
    setError(null);
    setLoading(true);
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/onboarding",
      });
    } catch (err: any) {
      setError(err?.message || `Failed to sign in with ${provider}`);
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === "signup") {
        const res = await authClient.signUp.email({
          name: name.trim(),
          email: email.trim(),
          password,
          callbackURL: "/onboarding",
        });
        if (res.error) {
          setError(res.error.message || "Failed to create account");
          setLoading(false);
          return;
        }
      } else {
        const res = await authClient.signIn.email({
          email: email.trim(),
          password,
          callbackURL: "/dashboard",
        });
        if (res.error) {
          setError(res.error.message || "Invalid email or password");
          setLoading(false);
          return;
        }
      }
      onClose();
      router.push("/onboarding");
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted || !isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-md rounded-2xl sm:rounded-3xl border border-[var(--border-card)] bg-[var(--bg-card)] p-6 sm:p-8 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Soft Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[var(--brand-orange)]/20 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] hover:bg-rose-500 hover:text-white text-[var(--text-muted)] hover:border-rose-500 transition-colors cursor-pointer"
          title="Close (ESC)"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-[var(--brand-orange)] text-white flex items-center justify-center font-black text-sm shadow-xs">
            Ny
          </div>
          <div>
            <h2 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
              <span>{mode === "signin" ? "Welcome back" : "Create your account"}</span>
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              {mode === "signin"
                ? "Sign in to manage your publications & discussions"
                : "Get started with Nyuzi for your publication"}
            </p>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="space-y-2.5 mb-5">
          <button
            type="button"
            onClick={() => handleSocialSignIn("github")}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] hover:border-[var(--brand-orange)]/60 text-[var(--text-main)] text-sm font-semibold transition-all cursor-pointer shadow-xs disabled:opacity-50"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>Continue with GitHub</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignIn("google")}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] hover:border-[var(--brand-orange)]/60 text-[var(--text-main)] text-sm font-semibold transition-all cursor-pointer shadow-xs disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.54 0 2.9.54 3.98 1.43l2.98-2.98C17.16 1.83 14.77 1 12 1 7.42 1 3.51 3.63 1.63 7.43l3.66 2.84C6.16 7.46 8.84 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.69 2.86c2.16-1.99 3.73-4.94 3.73-8.68z"
              />
              <path
                fill="#FBBC05"
                d="M5.29 14.59c-.25-.74-.39-1.53-.39-2.34s.14-1.6.39-2.34L1.63 7.07C.59 9.15 0 11.51 0 14s.59 4.85 1.63 6.93l3.66-2.84z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.24 0 5.95-1.08 7.93-2.91l-3.69-2.86c-1.08.72-2.45 1.16-4.24 1.16-3.16 0-5.84-2.46-6.71-5.77L1.63 15.46C3.51 20.37 7.42 23 12 23z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-[var(--border-card)] w-full" />
          <span className="bg-[var(--bg-card)] px-3 text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium absolute">
            or with email
          </span>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Email Form */}
        <form onSubmit={handleEmailAuth} className="space-y-3.5">
          {mode === "signup" && (
            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nekesa Maina"
                className="w-full px-3.5 py-2 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] text-sm focus:outline-none focus:border-[var(--brand-orange)] transition-colors placeholder:text-[var(--text-muted)]/60"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
              Work / Author Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="editor@publication.com"
              className="w-full px-3.5 py-2 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] text-sm focus:outline-none focus:border-[var(--brand-orange)] transition-colors placeholder:text-[var(--text-muted)]/60"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
              Password
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] text-sm focus:outline-none focus:border-[var(--brand-orange)] transition-colors placeholder:text-[var(--text-muted)]/60"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 rounded-xl bg-[var(--brand-orange)] hover:opacity-90 text-white text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>{mode === "signin" ? "Sign In" : "Create Account"}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Toggle Mode Footer */}
        <div className="mt-5 text-center text-xs text-[var(--text-muted)]">
          {mode === "signin" ? (
            <p>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setMode("signup");
                }}
                className="font-bold text-[var(--brand-orange)] hover:underline cursor-pointer"
              >
                Sign up free
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setMode("signin");
                }}
                className="font-bold text-[var(--brand-orange)] hover:underline cursor-pointer"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
