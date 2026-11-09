"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Users,
  UserPlus,
  Mail,
  Crown,
  Shield,
  Trash2,
  Loader2,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useDashboard } from "../context";
import { useSession } from "@/lib/auth-client";

interface CollaboratorsTabProps {
  selectedSite: string;
}

interface SiteCollaboratorItem {
  id: string;
  siteId: string;
  userId: string | null;
  email: string;
  name: string;
  role: "admin" | "moderator" | "viewer";
  hasAccount: boolean;
  createdAt: string | Date;
}

export function CollaboratorsTab({ selectedSite }: CollaboratorsTabProps) {
  const { data: session } = useSession();
  const { sites, authors, showToast } = useDashboard();

  const currentSite = sites.find((s) => s.id === selectedSite);

  const [siteOwner, setSiteOwner] = useState<{ name: string; email: string }>({
    name: "Owner",
    email: "",
  });
  const [collaborators, setCollaborators] = useState<SiteCollaboratorItem[]>([]);
  const [requesterRole, setRequesterRole] = useState<
    "owner" | "admin" | "moderator" | "viewer"
  >("owner");
  const [loadingCollabs, setLoadingCollabs] = useState(true);

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] = useState<"admin" | "moderator" | "viewer">(
    "moderator"
  );
  const [inviting, setInviting] = useState(false);

  const fetchCollaborators = useCallback(async () => {
    if (!selectedSite) return;
    setLoadingCollabs(true);
    try {
      const res = await fetch(
        `/api/sites/collaborators?siteId=${encodeURIComponent(selectedSite)}`
      );
      if (res.ok) {
        const data = await res.json();
        if (data.owner) setSiteOwner(data.owner);
        if (Array.isArray(data.collaborators)) {
          setCollaborators(data.collaborators);
        }
        if (data.requesterRole) {
          setRequesterRole(data.requesterRole);
        }
      }
    } catch (err) {
      console.warn("Failed to load site collaborators:", err);
    } finally {
      setLoadingCollabs(false);
    }
  }, [selectedSite]);

  useEffect(() => {
    fetchCollaborators();
  }, [fetchCollaborators]);

  const canManageSite = requesterRole === "owner" || requesterRole === "admin";

  // Authors from roster with distinct emails that aren't already collaborators
  const quickAddAuthors = React.useMemo(() => {
    const existingEmails = new Set([
      siteOwner.email?.toLowerCase(),
      ...collaborators.map((c) => c.email.toLowerCase()),
    ]);
    const unique: { name: string; email: string }[] = [];
    for (const a of authors) {
      if (
        a.email &&
        !existingEmails.has(a.email.toLowerCase()) &&
        !unique.some((u) => u.email.toLowerCase() === a.email!.toLowerCase())
      ) {
        unique.push({ name: a.name, email: a.email });
      }
    }
    return unique.slice(0, 6);
  }, [authors, collaborators, siteOwner.email]);

  const handleInviteCollaborator = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim() || !selectedSite) return;
    setInviting(true);
    try {
      const res = await fetch("/api/sites/collaborators", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteId: selectedSite,
          email: inviteEmail.trim(),
          name: inviteName.trim(),
          role: inviteRole,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || "Failed to add collaborator");
        return;
      }
      if (data.collaborator) {
        setCollaborators((prev) => [...prev, data.collaborator]);
      }
      setInviteEmail("");
      setInviteName("");
      setInviteRole("moderator");
      showToast(
        `Added ${data.collaborator?.name || inviteEmail} to ${currentSite?.name || selectedSite}!`
      );
    } catch {
      showToast("Error inviting collaborator");
    } finally {
      setInviting(false);
    }
  };

  const handleRoleChange = async (
    collaboratorId: string,
    newRole: "admin" | "moderator" | "viewer"
  ) => {
    setCollaborators((prev) =>
      prev.map((c) => (c.id === collaboratorId ? { ...c, role: newRole } : c))
    );
    try {
      const res = await fetch("/api/sites/collaborators", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collaboratorId, role: newRole }),
      });
      if (res.ok) {
        showToast("Collaborator role updated");
      } else {
        const data = await res.json();
        showToast(data.error || "Failed to update role");
        fetchCollaborators();
      }
    } catch {
      showToast("Error updating collaborator role");
      fetchCollaborators();
    }
  };

  const handleRemoveCollaborator = async (
    collaboratorId: string,
    collabName: string
  ) => {
    try {
      const res = await fetch(
        `/api/sites/collaborators?collaboratorId=${encodeURIComponent(collaboratorId)}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        setCollaborators((prev) => prev.filter((c) => c.id !== collaboratorId));
        showToast(`Removed ${collabName} from ${currentSite?.name || selectedSite}`);
      } else {
        const data = await res.json();
        showToast(data.error || "Failed to remove collaborator");
      }
    } catch {
      showToast("Error removing collaborator");
    }
  };

  return (
    <div className="max-w-4xl space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-serif-title text-xl font-bold text-[var(--text-main)]">
            Publication Collaborators
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Invite co-admins, moderators, and editors to{" "}
            <span className="font-semibold text-[var(--text-main)]">
              {currentSite?.name || selectedSite}
            </span>
            . They only get access to this publication and land directly inside it on first login.
          </p>
        </div>

        <span className="self-start sm:self-auto px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-[var(--brand-orange)]/30 bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] shrink-0">
          Your Role: {requesterRole}
        </span>
      </div>

      {/* Role Permissions Legend */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-4 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] space-y-1">
          <div className="font-bold text-[var(--text-main)] flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[var(--brand-orange)]" />
            <span>Site Admin</span>
          </div>
          <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
            Full access to moderation, author roster, widget studio, site settings, and inviting collaborators.
          </p>
        </div>

        <div className="p-4 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] space-y-1">
          <div className="font-bold text-[var(--text-main)] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Moderator</span>
          </div>
          <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
            Can approve, flag, edit, or delete comments and manage threads & authors for this publication.
          </p>
        </div>

        <div className="p-4 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] space-y-1">
          <div className="font-bold text-[var(--text-main)] flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>Viewer</span>
          </div>
          <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
            Read-only access to view live discussions, metrics, and community activity on this publication.
          </p>
        </div>
      </div>

      {/* Invite Collaborator Card (Owner / Site Admin only) */}
      {canManageSite && (
        <form
          onSubmit={handleInviteCollaborator}
          className="p-6 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] space-y-4 shadow-sm text-xs sm:text-sm"
        >
          <div>
            <h4 className="font-bold text-sm text-[var(--text-main)] flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-[var(--brand-orange)]" />
              <span>Invite Collaborator to {currentSite?.name || selectedSite}</span>
            </h4>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Enter their email below. When they sign in with Google or Email, they will skip onboarding and open this publication directly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
            <div className="sm:col-span-5">
              <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="collaborator@gmail.com"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] text-xs focus:outline-none focus:border-[var(--brand-orange)]"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">
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
              <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">
                Site Role
              </label>
              <select
                value={inviteRole}
                onChange={(e) =>
                  setInviteRole(
                    e.target.value as "admin" | "moderator" | "viewer"
                  )
                }
                className="w-full px-3 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] text-xs font-semibold focus:outline-none focus:border-[var(--brand-orange)] cursor-pointer"
              >
                <option value="moderator">Moderator</option>
                <option value="admin">Site Admin</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
          </div>

          {/* Quick-fill from Author Roster */}
          {quickAddAuthors.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1 mr-1">
                <Sparkles className="w-3 h-3 text-[var(--brand-orange)]" />
                <span>Quick-fill from Author Roster:</span>
              </span>
              {quickAddAuthors.map((a) => (
                <button
                  key={a.email}
                  type="button"
                  onClick={() => {
                    setInviteEmail(a.email);
                    setInviteName(a.name);
                  }}
                  className="px-2.5 py-1 rounded-lg border border-[var(--border-card)] bg-[var(--bg-card-subtle)] hover:border-[var(--brand-orange)]/40 text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors cursor-pointer"
                >
                  + {a.name}
                </button>
              ))}
            </div>
          )}

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
              <span>Add Collaborator</span>
            </button>
          </div>
        </form>
      )}

      {/* Active Collaborators Directory */}
      <div className="rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[var(--border-card)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[var(--brand-orange)]" />
            <h4 className="font-bold text-sm text-[var(--text-main)]">
              Publication Access List
            </h4>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--bg-card-subtle)] text-[var(--text-muted)] border border-[var(--border-card)]">
              {collaborators.length + 1}
            </span>
          </div>
        </div>

        <div className="divide-y divide-[var(--border-card)]">
          {/* Site Owner Row */}
          <div className="px-6 py-4 flex items-center justify-between gap-3 bg-[var(--bg-card-subtle)]/20">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-amber-500/15 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0">
                {siteOwner.name ? siteOwner.name.charAt(0).toUpperCase() : "O"}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs sm:text-sm text-[var(--text-main)] truncate">
                    {siteOwner.name}
                  </span>
                  <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                </div>
                <span className="text-xs text-[var(--text-muted)] block truncate">
                  {siteOwner.email}
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider shrink-0">
              Publication Owner
            </span>
          </div>

          {loadingCollabs ? (
            <div className="p-8 text-center text-xs text-[var(--text-muted)] flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-[var(--brand-orange)]" />
              <span>Loading collaborators...</span>
            </div>
          ) : collaborators.length === 0 ? (
            <div className="p-8 text-center text-xs text-[var(--text-muted)]">
              No additional collaborators have been added to this publication yet.
            </div>
          ) : (
            collaborators.map((collab) => {
              const isSelf =
                collab.email.toLowerCase() ===
                session?.user?.email?.toLowerCase();
              return (
                <div
                  key={collab.id}
                  className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[var(--bg-card-subtle)]/40 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-[var(--brand-orange)]/15 text-[var(--brand-orange)] font-bold text-xs flex items-center justify-center shrink-0">
                      {collab.name ? collab.name.charAt(0).toUpperCase() : "C"}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-xs sm:text-sm text-[var(--text-main)] truncate">
                          {collab.name}
                        </span>
                        {isSelf && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-[var(--brand-orange)]/15 text-[var(--brand-orange)]">
                            You
                          </span>
                        )}
                        <span
                          className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                            collab.hasAccount
                              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                              : "bg-amber-500/15 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          {collab.hasAccount ? "Active" : "Invited · Ready on Login"}
                        </span>
                      </div>
                      <span className="text-xs text-[var(--text-muted)] block truncate">
                        {collab.email}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 self-end sm:self-auto">
                    {canManageSite ? (
                      <>
                        <div className="flex items-center gap-1.5">
                          <Shield className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                          <select
                            value={collab.role}
                            onChange={(e) =>
                              handleRoleChange(
                                collab.id,
                                e.target.value as "admin" | "moderator" | "viewer"
                              )
                            }
                            className="px-2.5 py-1.5 rounded-lg border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-xs font-semibold text-[var(--text-main)] focus:outline-none focus:border-[var(--brand-orange)] cursor-pointer"
                          >
                            <option value="moderator">Moderator</option>
                            <option value="admin">Site Admin</option>
                            <option value="viewer">Viewer</option>
                          </select>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveCollaborator(collab.id, collab.name)
                          }
                          className="p-1.5 rounded-lg border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-rose-500 hover:border-rose-500/30 transition-colors cursor-pointer"
                          title="Remove from publication"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : (
                      <span className="px-2.5 py-1 rounded-lg border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[10px] font-bold uppercase text-[var(--text-secondary)]">
                        {collab.role}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

