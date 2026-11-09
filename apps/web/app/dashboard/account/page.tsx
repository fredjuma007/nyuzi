"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  ShieldCheck,
  KeyRound,
  Save,
  Trash2,
  AlertTriangle,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Mail,
} from "lucide-react";
import { useSession, signOut, authClient } from "@/lib/auth-client";
import { useDashboard } from "../context";

export default function AccountSettingsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { showToast } = useDashboard();

  // Profile State
  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  // Password State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [revokeOtherSessions, setRevokeOtherSessions] = useState(true);
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  // Delete Account Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deletingAccount, setDeletingAccount] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setDisplayName(session.user.name || "");
      setAvatarUrl(session.user.image || "");
    }
  }, [session?.user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) return;
    setSavingProfile(true);
    try {
      const res = await fetch("/api/account", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: displayName.trim(),
          image: avatarUrl.trim() || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || "Failed to update profile");
        return;
      }
      showToast("Account profile updated!");
    } catch {
      showToast("Error updating profile");
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match. Please verify both fields.");
      return;
    }

    setSavingPassword(true);
    try {
      const res = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions,
      });

      if (res?.error) {
        setPasswordError(
          res.error.message || "Failed to change password. Verify your current password."
        );
        return;
      }

      setPasswordSuccess("Your password was updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      showToast("Password updated!");
    } catch (err: any) {
      setPasswordError(err?.message || "An unexpected error occurred while updating password.");
    } finally {
      setSavingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== "DELETE" && deleteConfirmText !== session?.user?.email) {
      return;
    }
    setDeletingAccount(true);
    try {
      const res = await fetch("/api/account", {
        method: "DELETE",
      });
      if (res.ok) {
        await signOut();
        router.replace("/");
      } else {
        const data = await res.json();
        showToast(data.error || "Failed to delete account");
      }
    } catch {
      showToast("Error deleting account");
    } finally {
      setDeletingAccount(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-8 pb-12">
      {/* Header */}
      <div>
        <h3 className="font-serif-title text-xl font-bold text-[var(--text-main)]">
          Personal Account Settings
        </h3>
        <p className="text-xs text-[var(--text-secondary)]">
          Manage your publisher profile, authentication credentials, and account lifecycle.
        </p>
      </div>

      {/* Personal Profile Card */}
      <form
        onSubmit={handleSaveProfile}
        className="p-6 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] space-y-5 shadow-sm text-xs sm:text-sm"
      >
        <div className="flex items-center gap-3.5 border-b border-[var(--border-card)] pb-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--brand-orange)]/15 text-[var(--brand-orange)] font-bold text-lg flex items-center justify-center shrink-0">
            {displayName ? displayName.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <h4 className="font-bold text-sm text-[var(--text-main)] flex items-center gap-2">
              <User className="w-4 h-4 text-[var(--brand-orange)]" />
              <span>Publisher Profile</span>
            </h4>
            <p className="text-xs text-[var(--text-muted)]">
              Your name and email associated with your NyuziYap publisher identity.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-bold text-xs text-[var(--text-main)] block">
              Display Name
            </label>
            <input
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] text-xs sm:text-sm focus:outline-none focus:border-[var(--brand-orange)]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-xs text-[var(--text-main)] block">
              Account Email
            </label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                disabled
                value={session?.user?.email || ""}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-muted)] text-xs sm:text-sm cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            disabled={savingProfile}
            className="px-5 py-2.5 rounded-xl bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
          >
            {savingProfile ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>Save Profile</span>
          </button>
        </div>
      </form>

      {/* Password & Session Security */}
      <div className="p-6 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] space-y-5 shadow-sm text-xs sm:text-sm">
        <div>
          <h4 className="font-bold text-sm text-[var(--text-main)] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[var(--brand-orange)]" />
            <span>Password & Session Security</span>
          </h4>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Update your account password and revoke sessions on other devices.
          </p>
        </div>

        {passwordError && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-medium flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{passwordError}</span>
          </div>
        )}

        {passwordSuccess && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{passwordSuccess}</span>
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-lg">
          <div className="space-y-1.5">
            <label className="font-bold text-xs text-[var(--text-main)] block">
              Current Password
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] text-xs sm:text-sm focus:outline-none focus:border-[var(--brand-orange)]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-xs text-[var(--text-main)] block">
                New Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min 8 characters"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] text-xs sm:text-sm focus:outline-none focus:border-[var(--brand-orange)]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-xs text-[var(--text-main)] block">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] text-xs sm:text-sm focus:outline-none focus:border-[var(--brand-orange)]"
              />
            </div>
          </div>

          <div className="pt-1">
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
            disabled={savingPassword}
            className="px-5 py-2.5 rounded-xl bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
          >
            {savingPassword ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <KeyRound className="w-4 h-4" />
            )}
            <span>Update Password</span>
          </button>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="p-6 rounded-2xl border border-rose-500/30 bg-rose-500/5 space-y-4 shadow-sm text-xs sm:text-sm">
        <div>
          <h4 className="font-bold text-sm text-rose-500 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Danger Zone</span>
          </h4>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Permanently delete your personal account and sole-owned workspaces.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-rose-500/25 bg-[var(--bg-card)]">
          <div>
            <span className="font-bold text-xs sm:text-sm block text-[var(--text-main)]">
              Delete Personal Account
            </span>
            <span className="text-xs text-[var(--text-muted)]">
              Permanently remove your login credentials, active sessions, and personal workspaces.
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setDeleteConfirmText("");
              setShowDeleteModal(true);
            }}
            className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 shadow-sm"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Account</span>
          </button>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-rose-500/30 bg-[var(--bg-card)] p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2.5 text-rose-500">
              <Trash2 className="w-5 h-5 shrink-0" />
              <h4 className="font-serif-title font-bold text-base text-[var(--text-main)]">
                Delete Personal Account?
              </h4>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              This action is permanent. Your user account ({session?.user?.email}) and any personal workspaces where you are the only member will be deleted. Type{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--bg-card-subtle)] font-mono text-rose-500">DELETE</code>{" "}
              below to confirm.
            </p>
            <input
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder="Type DELETE to confirm"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] font-mono text-xs focus:outline-none focus:border-rose-500"
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-xl border border-[var(--border-card)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-main)] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={
                  (deleteConfirmText !== "DELETE" &&
                    deleteConfirmText !== session?.user?.email) ||
                  deletingAccount
                }
                onClick={handleDeleteAccount}
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
              >
                {deletingAccount && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Delete My Account</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

