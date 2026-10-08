"use client";

import React, { useState } from "react";
import { CheckCircle2, ShieldCheck, KeyRound, Loader2, AlertCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface SettingsTabProps {
  selectedSite: string;
}

export function SettingsTab({ selectedSite }: SettingsTabProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [revokeOtherSessions, setRevokeOtherSessions] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match. Please verify both fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions,
      });

      if (res?.error) {
        setError(res.error.message || "Failed to change password. Please verify your current password.");
        setLoading(false);
        return;
      }

      setSuccess("Your password was updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred while updating password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-8">
      {/* Site Configuration */}
      <div>
        <h3 className="font-serif-title text-xl font-bold">Site & Security Settings</h3>
        <p className="text-xs text-[var(--text-secondary)]">
          Configuration for {selectedSite === "trc254" ? "The Reading Circle 254" : "Demo Sandbox"}.
        </p>
      </div>

      <div className="p-6 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] space-y-5 shadow-sm text-xs sm:text-sm">
        <div className="space-y-1.5">
          <label className="font-bold">Publication Name</label>
          <input
            type="text"
            disabled
            value={selectedSite === "trc254" ? "The Reading Circle 254" : "Demo Sandbox Publication"}
            className="w-full px-3.5 py-2 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-muted)] cursor-not-allowed"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-bold">Authorized Domain</label>
          <input
            type="text"
            disabled
            value={selectedSite === "trc254" ? "readingcircle254.com" : "nyuzi-yap.vercel.app"}
            className="w-full px-3.5 py-2 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-muted)] cursor-not-allowed"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-bold">Verified Notification Subdomain</label>
          <div className="flex items-center justify-between p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400">
            <div className="flex items-center gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="font-mono font-bold">notifications.readingcircle254.com</span>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider">DNS Active</span>
          </div>
        </div>

        <div className="pt-2 border-t border-[var(--border-card)]">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold block">Pre-Moderation Guard</span>
              <span className="text-xs text-[var(--text-muted)]">
                Hold comments for manual approval before making them public.
              </span>
            </div>
            <input
              type="checkbox"
              checked={false}
              readOnly
              className="w-5 h-5 accent-[var(--brand-orange)] rounded cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Account & Password Security */}
      <div className="space-y-4">
        <div>
          <h3 className="font-serif-title text-xl font-bold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[var(--brand-orange)]" />
            <span>Account Security</span>
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Change your account password and manage your active sessions.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-sm text-xs sm:text-sm">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-medium flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-4 max-w-lg">
            <div className="space-y-1.5">
              <label className="font-bold text-[var(--text-main)]">Current Password</label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] text-sm focus:outline-none focus:border-[var(--brand-orange)] transition-colors placeholder:text-[var(--text-muted)]/60"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-[var(--text-main)]">New Password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 8 characters"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] text-sm focus:outline-none focus:border-[var(--brand-orange)] transition-colors placeholder:text-[var(--text-muted)]/60"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[var(--text-main)]">Confirm New Password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] text-sm focus:outline-none focus:border-[var(--brand-orange)] transition-colors placeholder:text-[var(--text-muted)]/60"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-[var(--text-secondary)]">
                <input
                  type="checkbox"
                  checked={revokeOtherSessions}
                  onChange={(e) => setRevokeOtherSessions(e.target.checked)}
                  className="w-4 h-4 accent-[var(--brand-orange)] rounded cursor-pointer"
                />
                <span>Sign out of other devices after changing password</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-[var(--brand-orange)] hover:opacity-90 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <KeyRound className="w-4 h-4" />
              )}
              <span>Update Password</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
