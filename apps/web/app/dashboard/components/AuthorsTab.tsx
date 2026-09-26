"use client";

import React from "react";
import { UserPlus, X, Check, Bell, BellOff, Pencil } from "lucide-react";
import { AuthorEntry } from "./types";

interface AuthorsTabProps {
  authors: AuthorEntry[];
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
}

export function AuthorsTab({
  authors,
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
}: AuthorsTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-serif-title text-xl font-bold">Author Notification Roster</h3>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            When readers comment on TRC articles, Nyuzi automatically alerts the matching author here.
          </p>
        </div>

        <button
          onClick={() => setShowAddAuthor(!showAddAuthor)}
          className="px-4 py-2 rounded-xl bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-bold text-xs shadow transition-all cursor-pointer shrink-0 flex items-center gap-1.5"
        >
          {showAddAuthor ? (
            <>
              <X className="w-3.5 h-3.5" />
              <span>Close Form</span>
            </>
          ) : (
            <>
              <UserPlus className="w-3.5 h-3.5" />
              <span>Add Author</span>
            </>
          )}
        </button>
      </div>

      {/* Add Author Inline Form */}
      {showAddAuthor && (
        <form
          onSubmit={handleAddAuthor}
          className="p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-md space-y-4"
        >
          <h4 className="text-sm font-bold flex items-center gap-1.5">
            <UserPlus className="w-4 h-4 text-[var(--brand-orange)]" />
            <span>Register New Publication Author</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                Author Byline (Matches Blog Byline)
              </label>
              <input
                type="text"
                placeholder="e.g. Chinua Achebe"
                value={newAuthorName}
                onChange={(e) => setNewAuthorName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[var(--border-card)] bg-[var(--bg-page)] text-xs focus:outline-none focus:border-[var(--brand-orange)]"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                Notification Email
              </label>
              <input
                type="email"
                placeholder="author@readingcircle254.com"
                value={newAuthorEmail}
                onChange={(e) => setNewAuthorEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[var(--border-card)] bg-[var(--bg-page)] text-xs focus:outline-none focus:border-[var(--brand-orange)]"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddAuthor(false)}
              className="px-3.5 py-1.5 rounded-lg border border-[var(--border-card)] text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-[var(--brand-orange)] text-white text-xs font-bold shadow cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save to Roster</span>
            </button>
          </div>
        </form>
      )}

      {/* Authors Table */}
      <div className="overflow-x-auto rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-sm">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              <th className="py-3 px-4">Author Byline</th>
              <th className="py-3 px-4">Notification Email</th>
              <th className="py-3 px-4">Tracked Discussions</th>
              <th className="py-3 px-4">Delivery Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-card)]">
            {authors.map((author) => (
              <tr key={author.id} className="hover:bg-[var(--bg-card-subtle)]/50 transition-colors">
                <td className="py-3.5 px-4 font-bold text-[var(--text-main)]">{author.name}</td>
                <td className="py-3.5 px-4 font-mono text-xs text-[var(--text-secondary)]">
                  {author.email}
                </td>
                <td className="py-3.5 px-4 text-xs text-[var(--text-secondary)]">
                  {author.discussionsCount ?? 0} discussions
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      author.status === "active"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "bg-zinc-500/10 text-zinc-400"
                    }`}
                  >
                    {author.status === "active" ? (
                      <Bell className="w-3 h-3 text-emerald-500" />
                    ) : (
                      <BellOff className="w-3 h-3 text-zinc-400" />
                    )}
                    <span>{author.status === "active" ? "Active (Resend)" : "Muted"}</span>
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => handleOpenEditAuthor(author)}
                      className="px-2.5 py-1 rounded-lg border border-[var(--border-card)] text-xs font-semibold hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] transition-colors cursor-pointer flex items-center gap-1"
                      title="Edit Author Byline or Email"
                    >
                      <Pencil className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleToggleAuthor(author.id)}
                      className="px-2.5 py-1 rounded-lg border border-[var(--border-card)] text-xs font-semibold hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] transition-colors cursor-pointer"
                    >
                      {author.status === "active" ? "Mute Alerts" : "Enable Alerts"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
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
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border-card)] bg-[var(--bg-page)] text-xs focus:outline-none focus:border-[var(--brand-orange)] font-mono"
                  required
                />
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
                className="px-4 py-1.5 rounded-lg bg-[var(--brand-orange)] text-white text-xs font-bold shadow hover:bg-[var(--brand-orange-hover)] cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
