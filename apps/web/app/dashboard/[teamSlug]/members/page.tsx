"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import {
  Users,
  UserPlus,
  Shield,
  Trash2,
  Loader2,
  Mail,
  Crown,
} from "lucide-react";
import { useDashboard } from "../../context";
import { useSession } from "@/lib/auth-client";

interface TeamMemberItem {
  memberId: string;
  role: string;
  joinedAt: string | Date;
  userId: string;
  name: string;
  email: string;
  image?: string | null;
}

export default function TeamMembersPage() {
  const params = useParams<{ teamSlug: string }>();
  const teamSlug = params?.teamSlug || "";

  const { data: session } = useSession();
  const { activeTeam, activeTeamSlug, setActiveTeamSlug, showToast } = useDashboard();

  const [members, setMembers] = useState<TeamMemberItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] = useState("moderator");
  const [inviting, setInviting] = useState(false);

  useEffect(() => {
    if (teamSlug && teamSlug !== activeTeamSlug) {
      setActiveTeamSlug(teamSlug);
    }
  }, [teamSlug, activeTeamSlug, setActiveTeamSlug]);

  const fetchMembers = useCallback(async () => {
    if (!teamSlug) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/teams/members?teamSlug=${encodeURIComponent(teamSlug)}`);
      if (res.ok) {
        const data = await res.json();
        setMembers(Array.isArray(data.members) ? data.members : []);
      }
    } catch (err) {
      console.warn("Failed to load team members:", err);
    } finally {
      setLoading(false);
    }
  }, [teamSlug]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const handleInviteMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    setInviting(true);
    try {
      const res = await fetch("/api/teams/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamSlug,
          email: inviteEmail.trim(),
          name: inviteName.trim(),
          role: inviteRole,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || "Failed to add team member");
        return;
      }
      if (data.member) {
        setMembers((prev) => [...prev, data.member]);
      }
      setInviteEmail("");
      setInviteName("");
      setInviteRole("moderator");
      showToast(`Added ${data.member?.name || inviteEmail} to workspace!`);
    } catch {
      showToast("Error adding member to workspace");
    } finally {
      setInviting(false);
    }
  };

  const handleRoleChange = async (memberId: string, newRole: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.memberId === memberId ? { ...m, role: newRole } : m))
    );
    try {
      const res = await fetch("/api/teams/members", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId, role: newRole }),
      });
      if (res.ok) {
        showToast("Member role updated");
      } else {
        const data = await res.json();
        showToast(data.error || "Failed to update role");
        fetchMembers();
      }
    } catch {
      showToast("Failed to update role");
      fetchMembers();
    }
  };

  const handleRemoveMember = async (memberId: string, name: string) => {
    try {
      const res = await fetch(
        `/api/teams/members?memberId=${encodeURIComponent(memberId)}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || "Cannot remove member");
        return;
      }
      setMembers((prev) => prev.filter((m) => m.memberId !== memberId));
      showToast(`Removed ${name} from workspace`);
    } catch {
      showToast("Failed to remove member");
    }
  };

  return (
    <div className="max-w-4xl space-y-8 pb-12">
      {/* Header */}
      <div>
        <h3 className="font-serif-title text-xl font-bold text-[var(--text-main)]">
          Team Members & Access
        </h3>
        <p className="text-xs text-[var(--text-secondary)]">
          Manage who has access to publications, moderation queues, and settings inside{" "}
          <span className="font-semibold text-[var(--text-main)]">
            {activeTeam?.name || teamSlug}
          </span>
          .
        </p>
      </div>

      {/* Add Member Card */}
      <form
        onSubmit={handleInviteMember}
        className="p-6 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] space-y-4 shadow-sm text-xs sm:text-sm"
      >
        <div>
          <h4 className="font-bold text-sm text-[var(--text-main)] flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-[var(--brand-orange)]" />
            <span>Add Workspace Member</span>
          </h4>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Grant a teammate access to this workspace. When they sign in with this email, they will automatically see this team.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
          <div className="sm:col-span-5">
            <label className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="teammate@publication.com"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] text-xs focus:outline-none focus:border-[var(--brand-orange)]"
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">
              Display Name (Optional)
            </label>
            <input
              type="text"
              value={inviteName}
              onChange={(e) => setInviteName(e.target.value)}
              placeholder="e.g. Brenda Frenjo"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] text-xs focus:outline-none focus:border-[var(--brand-orange)]"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">
              Role
            </label>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] text-xs font-semibold focus:outline-none focus:border-[var(--brand-orange)] cursor-pointer"
            >
              <option value="moderator">Moderator</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
              <option value="owner">Owner</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            disabled={inviting}
            className="px-4 py-2 rounded-xl bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
          >
            {inviting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <UserPlus className="w-3.5 h-3.5" />
            )}
            <span>Add Member</span>
          </button>
        </div>
      </form>

      {/* Members Directory */}
      <div className="rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[var(--border-card)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[var(--brand-orange)]" />
            <h4 className="font-bold text-sm text-[var(--text-main)]">
              Active Workspace Members
            </h4>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--bg-card-subtle)] text-[var(--text-muted)] border border-[var(--border-card)]">
              {members.length}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-[var(--text-muted)] flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-[var(--brand-orange)]" />
            <span>Loading workspace members...</span>
          </div>
        ) : members.length === 0 ? (
          <div className="p-8 text-center text-xs text-[var(--text-muted)]">
            No members found for this workspace.
          </div>
        ) : (
          <div className="divide-y divide-[var(--border-card)]">
            {members.map((m) => {
              const isCurrentUser = m.userId === session?.user?.id;
              return (
                <div
                  key={m.memberId}
                  className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[var(--bg-card-subtle)]/40 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-[var(--brand-orange)]/15 text-[var(--brand-orange)] font-bold text-xs flex items-center justify-center shrink-0">
                      {m.name ? m.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-[var(--text-main)] truncate">
                          {m.name}
                        </span>
                        {isCurrentUser && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-[var(--brand-orange)]/15 text-[var(--brand-orange)]">
                            You
                          </span>
                        )}
                        {m.role === "owner" && (
                          <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        )}
                      </div>
                      <span className="text-xs text-[var(--text-muted)] block truncate">
                        {m.email}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 self-end sm:self-auto">
                    <div className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                      <select
                        value={m.role}
                        onChange={(e) => handleRoleChange(m.memberId, e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-xs font-semibold text-[var(--text-main)] focus:outline-none focus:border-[var(--brand-orange)] cursor-pointer"
                      >
                        <option value="owner">Owner</option>
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                        <option value="moderator">Moderator</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveMember(m.memberId, m.name)}
                      className="p-1.5 rounded-lg border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-rose-500 hover:border-rose-500/30 transition-colors cursor-pointer"
                      title="Remove from workspace"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

