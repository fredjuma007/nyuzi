"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Lock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  Eye,
  EyeOff,
  KeyRound,
} from "lucide-react";
import Link from "next/link";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const urlError = searchParams.get("error");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    urlError === "INVALID_TOKEN"
      ? "This password reset link is invalid or has expired."
      : null
  );
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("No reset token was provided. Please request a new reset link.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please verify both fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await authClient.resetPassword({
        newPassword: password,
        token,
      });

      if (res?.error) {
        setError(res.error.message || "Failed to reset password. The link may have expired.");
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred while resetting your password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative rounded-2xl sm:rounded-3xl border border-[var(--border-card)] bg-[var(--bg-card)] p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Soft Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[var(--brand-orange)]/15 blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[var(--brand-orange)] text-white flex items-center justify-center font-black text-base shadow-sm">
            Ny
          </div>
          <div>
            <h1 className="text-xl font-bold text-[var(--text-main)]">
              {success ? "Password Updated" : "Reset Password"}
            </h1>
            <p className="text-xs text-[var(--text-muted)]">
              {success
                ? "Your credentials have been securely changed"
                : "Choose a new strong password for your Nyuzi account"}
            </p>
          </div>
        </div>

        {/* Invalid or Missing Token State */}
        {!token && !success && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Missing or Invalid Reset Token</p>
                <p className="text-amber-600/80 dark:text-amber-400/80 leading-relaxed">
                  We could not find a valid password recovery token in the URL. Reset links are single-use and expire quickly for your security.
                </p>
              </div>
            </div>
            <Link
              href="/"
              className="w-full py-2.5 rounded-xl bg-[var(--brand-orange)] hover:opacity-90 text-white text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <span>Return to Nyuzi</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Success State */}
        {success && (
          <div className="py-4 text-center space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[var(--text-main)] mb-1">
                All set!
              </h2>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Your password has been successfully updated. You can now sign in using your new credentials.
              </p>
            </div>
            <Link
              href="/"
              className="w-full py-2.5 rounded-xl bg-[var(--brand-orange)] hover:opacity-90 text-white text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <span>Sign In to Your Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Active Reset Form */}
        {token && !success && (
          <>
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-medium flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] text-sm focus:outline-none focus:border-[var(--brand-orange)] transition-colors placeholder:text-[var(--text-muted)]/60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
                  Confirm New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your new password"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] text-sm focus:outline-none focus:border-[var(--brand-orange)] transition-colors placeholder:text-[var(--text-muted)]/60"
                />
              </div>

              {/* Password strength tip */}
              <div className="p-3 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-card)] text-[11px] text-[var(--text-muted)] space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-[var(--text-secondary)]">
                  <KeyRound className="w-3.5 h-3.5 text-[var(--brand-orange)]" />
                  <span>Security Tip</span>
                </div>
                <p>Use at least 8 characters with a mix of letters, numbers, and symbols.</p>
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
                    <span>Set New Password</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <Link
                  href="/"
                  className="text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                >
                  Cancel and return home
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg-base)]">
      <Suspense
        fallback={
          <div className="w-full max-w-md mx-auto p-8 rounded-3xl border border-[var(--border-card)] bg-[var(--bg-card)] flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-[var(--brand-orange)]" />
            <p className="text-xs text-[var(--text-muted)]">Loading reset verification...</p>
          </div>
        }
      >
        <ResetPasswordContent />
      </Suspense>
    </main>
  );
}
