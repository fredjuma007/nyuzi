"use client";

import React, { useState } from "react";
import {
  UserPlus,
  X,
  Check,
  Bell,
  BellOff,
  Pencil,
  Trash2,
  Sparkles,
  Mail,
  AlertCircle,
  Search,
  UserCheck,
} from "lucide-react";
import { AuthorEntry } from "./types";

interface AuthorsTabProps {
  authors: AuthorEntry[];
  selectedSite: string;
  showAddAuthor: boolean;
  setShowAddAuthor: (show: boolean) => void;
  newAuthorName: string;
  setNewAuthorName: (n: string) => void;
  newAuthorEmail: string;
  setNewAuthorEmail: (e: string) => void;
  handleAddAuthor: (e: React.FormEvent) => void;
  editingAuthor: AuthorEntry | null;
  setEditingAuthor: (a: AuthorEntry | null) => void;
  editAuthorName: string;
  setEditAuthorName: (n: string) => void;
  editAuthorEmail: string;
  setEditAuthorEmail: (e: string) => void;
  handleOpenEditAuthor: (author: AuthorEntry) => void;
  handleSaveEditAuthor: (e: React.FormEvent) => void;
  handleToggleAuthor: (id: string) => void;
  handleDeleteAuthor: (id: string) => void;
  handleQuickAssignDefault: (author: AuthorEntry) => void;
}

export function AuthorsTab({
  authors,
  selectedSite,
  showAddAuthor,
  setShowAddAuthor,
  newAuthorName,
  setNewAuthorName,
  newAuthorEmail,
  setNewAuthorEmail,
  handleAddAuthor,
  editingAuthor,
  setEditingAuthor,
  editAuthorName,
  setEditAuthorName,
  editAuthorEmail,
  setEditAuthorEmail,
  handleOpenEditAuthor,
  handleSaveEditAuthor,
  handleToggleAuthor,
  handleDeleteAuthor,
  handleQuickAssignDefault,
}: AuthorsTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [authorToDelete, setAuthorToDelete] = useState<AuthorEntry | null>(null);

  // Filter discovered contributors that need attention (no email set yet)
  const discoveredAuthors = authors.filter(
    (a) => a.status === "discovered" || (!a.email && a.status !== "muted")
  );

  // Filter authors by search query
  const filteredAuthors = authors.filter((a) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      a.name.toLowerCase().includes(q) ||
      (a.email && a.email.toLowerCase().includes(q))
    );
  });

  const publicationDefaultEmail =
    selectedSite === "trc254"
      ? "readingcircle254@gmail.com"
      : "admin@nyuzi.dev";

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-serif-title text-xl sm:text-2xl font-bold tracking-tight">
              Author Notification Roster
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] border border-[var(--brand-orange)]/20">
              Cloudflare D1
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            When readers comment on TRC articles, NyuziYap resolves the post author from article metadata and alerts them via Resend edge delivery.
          </p>
        </div>

        <button
          onClick={() => setShowAddAuthor(!showAddAuthor)}
          className="px-4 py-2.5 rounded-xl bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-bold text-xs shadow-md transition-all cursor-pointer shrink-0 flex items-center justify-center gap-2"
        >
          {showAddAuthor ? (
            <>
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              <span>Add Verified Author</span>
            </>
          )}
        </button>
      </div>

      {/* Auto-Discovered Contributors Banner (Inbox Callout) */}
      {discoveredAuthors.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10 shadow-sm space-y-3">
          <div className="flex items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-500 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--text-main)] flex items-center gap-2">
                  <span>Auto-Discovered Contributors Detected</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400">
                    {discoveredAuthors.length} Pending Setup
                  </span>
                </h4>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  The following author bylines were automatically picked up from article comments. Assign their personal notification email or route alerts to the publication default.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {discoveredAuthors.map((author) => (
              <div
                key={author.id}
                className="p-3.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)] flex flex-col justify-between gap-3 shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[var(--text-main)]">
                        {author.name}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/20">
                        Discovered
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      {author.discussionsCount} discussion{author.discussionsCount === 1 ? "" : "s"} on publication articles
                    </p>
                  </div>
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[var(--border-card)]/50">
                  <button
                    onClick={() => handleQuickAssignDefault(author)}
                    className="flex-1 min-w-[130px] px-2.5 py-1.5 rounded-lg bg-[var(--brand-orange)]/10 hover:bg-[var(--brand-orange)]/20 text-[var(--brand-orange)] font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    title={`Assign publication default (${publicationDefaultEmail})`}
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Use Pub Default</span>
                  </button>
                  <button
                    onClick={() => handleOpenEditAuthor(author)}
                    className="px-2.5 py-1.5 rounded-lg border border-[var(--border-card)] hover:border-[var(--brand-orange)] text-[var(--text-main)] text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                    <span>Assign Email</span>
                  </button>
                  <button
                    onClick={() => handleToggleAuthor(author.id)}
                    className="px-2 py-1.5 rounded-lg border border-[var(--border-card)] hover:bg-[var(--bg-card-subtle)] text-[var(--text-muted)] text-xs transition-colors cursor-pointer"
                    title="Mute alerts for this author"
                  >
                    <BellOff className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Author Inline Form */}
      {showAddAuthor && (
        <form
          onSubmit={handleAddAuthor}
          className="p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-lg space-y-4 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold flex items-center gap-2 text-[var(--text-main)]">
              <UserPlus className="w-4 h-4 text-[var(--brand-orange)]" />
              <span>Register New Publication Author</span>
            </h4>
            <span className="text-xs text-[var(--text-muted)]">Site: {selectedSite}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                Author Byline (Matches Article Byline)
              </label>
              <input
                type="text"
                placeholder="e.g. Chinua Achebe"
                value={newAuthorName}
                onChange={(e) => setNewAuthorName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[var(--border-card)] bg-[var(--bg-page)] text-xs focus:outline-none focus:border-[var(--brand-orange)] focus:ring-1 focus:ring-[var(--brand-orange)] transition-all font-medium"
                required
              />
              <p className="text-[10px] text-[var(--text-muted)] mt-1">
                Case-insensitive matching with your CMS article byline.
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                Notification Email (Resend Target)
              </label>
              <input
                type="email"
                placeholder="author@readingcircle254.com"
                value={newAuthorEmail}
                onChange={(e) => setNewAuthorEmail(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[var(--border-card)] bg-[var(--bg-page)] text-xs focus:outline-none focus:border-[var(--brand-orange)] focus:ring-1 focus:ring-[var(--brand-orange)] transition-all font-mono"
                required
              />
              <p className="text-[10px] text-[var(--text-muted)] mt-1">
                Reader comments on this writer's posts will be delivered here.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => setShowAddAuthor(false)}
              className="px-4 py-2 rounded-xl border border-[var(--border-card)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5 transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save to Cloudflare D1</span>
            </button>
          </div>
        </form>
      )}

      {/* Roster Controls & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search authors or emails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)] text-xs focus:outline-none focus:border-[var(--brand-orange)] transition-colors"
          />
        </div>
        <div className="text-xs text-[var(--text-muted)] self-center">
          Showing <span className="font-bold text-[var(--text-main)]">{filteredAuthors.length}</span> author{filteredAuthors.length === 1 ? "" : "s"}
        </div>
      </div>

      {/* Authors Table */}
      <div className="overflow-x-auto rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-sm">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              <th className="py-3 px-4">Author Byline</th>
              <th className="py-3 px-4">Notification Email</th>
              <th className="py-3 px-4">Discussions</th>
              <th className="py-3 px-4">Delivery Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-card)]">
            {filteredAuthors.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-xs text-[var(--text-muted)]">
                  No authors found matching "{searchQuery}".
                </td>
              </tr>
            ) : (
              filteredAuthors.map((author) => (
                <tr key={author.id} className="hover:bg-[var(--bg-card-subtle)]/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] font-bold text-xs flex items-center justify-center shrink-0">
                        {author.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-[var(--text-main)]">{author.name}</div>
                        {author.autoDiscovered && (
                          <span className="inline-block text-[9px] uppercase tracking-wider px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-500 font-mono mt-0.5">
                            Auto-Discovered
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-xs">
                    {author.email ? (
                      <span className="text-[var(--text-secondary)]">{author.email}</span>
                    ) : (
                      <span className="text-amber-500 italic flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>Pending Email (Pub Default)</span>
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-xs">
                    <span className="px-2 py-0.5 rounded-full bg-[var(--bg-card-subtle)] font-bold text-[var(--text-secondary)]">
                      {author.discussionsCount ?? 0} discussions
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    {author.status === "active" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500">
                        <Bell className="w-3 h-3 text-emerald-500" />
                        <span>Active (Resend)</span>
                      </span>
                    )}
                    {author.status === "discovered" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-500">
                        <AlertCircle className="w-3 h-3 text-amber-500" />
                        <span>Discovered</span>
                      </span>
                    )}
                    {author.status === "muted" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-zinc-500/10 text-zinc-400">
                        <BellOff className="w-3 h-3 text-zinc-400" />
                        <span>Muted</span>
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEditAuthor(author)}
                        className="px-2.5 py-1 rounded-lg border border-[var(--border-card)] text-xs font-semibold hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] transition-colors cursor-pointer flex items-center gap-1"
                        title="Edit Author Byline or Email"
                      >
                        <Pencil className="w-3 h-3" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>

                      <button
                        onClick={() => handleToggleAuthor(author.id)}
                        className="px-2.5 py-1 rounded-lg border border-[var(--border-card)] text-xs font-semibold hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] transition-colors cursor-pointer"
                        title={author.status === "active" ? "Mute notification alerts" : "Enable notification alerts"}
                      >
                        {author.status === "active" ? "Mute" : "Unmute"}
                      </button>

                      <button
                        onClick={() => setAuthorToDelete(author)}
                        className="p-1.5 rounded-lg border border-[var(--border-card)] text-xs text-[var(--text-muted)] hover:text-red-500 hover:border-red-500/40 hover:bg-red-500/5 transition-colors cursor-pointer"
                        title="Delete Author from Roster"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Author Modal */}
      {editingAuthor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveEditAuthor}
            className="w-full max-w-md p-6 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[var(--border-card)] pb-3">
              <h4 className="text-base font-bold flex items-center gap-2">
                <Pencil className="w-4 h-4 text-[var(--brand-orange)]" />
                <span>Update Author Credentials</span>
              </h4>
              <button
                type="button"
                onClick={() => setEditingAuthor(null)}
                className="p-1 rounded-lg hover:bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                  Author Byline (matches blog post)
                </label>
                <input
                  type="text"
                  value={editAuthorName}
                  onChange={(e) => setEditAuthorName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border-card)] bg-[var(--bg-page)] text-xs focus:outline-none focus:border-[var(--brand-orange)] font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                  Notification Email (Resend target)
                </label>
                <input
                  type="email"
                  value={editAuthorEmail}
                  onChange={(e) => setEditAuthorEmail(e.target.value)}
                  placeholder="author@readingcircle254.com"
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border-card)] bg-[var(--bg-page)] text-xs focus:outline-none focus:border-[var(--brand-orange)] font-mono"
                  required
                />
              </div>

              <div className="p-3 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-card)] text-[11px] text-[var(--text-muted)] space-y-1">
                <div className="flex items-center justify-between">
                  <span>Current Roster Status:</span>
                  <span className="font-bold uppercase text-[10px] text-[var(--brand-orange)]">
                    {editingAuthor.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tracked Discussions:</span>
                  <span className="font-bold text-[var(--text-main)]">
                    {editingAuthor.discussionsCount || 0}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[var(--border-card)]">
              <button
                type="button"
                onClick={() => setEditingAuthor(null)}
                className="px-3.5 py-1.5 rounded-lg border border-[var(--border-card)] text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white text-xs font-bold shadow cursor-pointer flex items-center gap-1.5 transition-all"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save to Cloudflare D1</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {authorToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm p-6 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--text-main)]">
                  Remove Author from Roster?
                </h4>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  Are you sure you want to remove <span className="font-bold text-[var(--text-main)]">{authorToDelete.name}</span>? Future comments on their articles will route to the publication default.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[var(--border-card)]">
              <button
                onClick={() => setAuthorToDelete(null)}
                className="px-3.5 py-1.5 rounded-lg border border-[var(--border-card)] text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDeleteAuthor(authorToDelete.id);
                  setAuthorToDelete(null);
                }}
                className="px-4 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-bold shadow cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
