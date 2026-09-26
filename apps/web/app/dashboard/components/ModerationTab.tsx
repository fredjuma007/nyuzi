"use client";

import React, { useState } from "react";
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  ExternalLink,
  Edit2,
  Check,
  X,
} from "lucide-react";
import { CommentItem } from "./types";

interface ModerationTabProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  statusFilter: "all" | "approved" | "pending" | "spam";
  setStatusFilter: (s: "all" | "approved" | "pending" | "spam") => void;
  loading: boolean;
  filteredComments: CommentItem[];
  selectedSite: string;
  handleApprove: (id: string) => void;
  handleFlagSpam: (id: string) => void;
  handleDelete: (id: string) => void;
  handleEdit: (id: string, newContent: string) => void;
}

export function ModerationTab({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  loading,
  filteredComments,
  selectedSite,
  handleApprove,
  handleFlagSpam,
  handleDelete,
  handleEdit,
}: ModerationTabProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const startEditing = (comment: CommentItem) => {
    setEditingId(comment.id);
    setEditContent(comment.content);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditContent("");
  };

  const saveEdit = (id: string) => {
    if (!editContent.trim()) return;
    handleEdit(id, editContent.trim());
    setEditingId(null);
    setEditContent("");
  };

  return (
    <div className="space-y-4">
      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)]">
        <div className="w-full sm:w-72 relative">
          <input
            type="text"
            placeholder="Search comments or authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[var(--border-card)] bg-[var(--bg-page)] text-xs sm:text-sm focus:outline-none focus:border-[var(--brand-orange)]"
          />
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[var(--text-muted)]" />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto text-xs">
          {(["all", "approved", "pending", "spam"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-colors cursor-pointer font-medium ${
                statusFilter === status
                  ? "bg-[var(--brand-orange)] text-white font-bold"
                  : "bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-main)]"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Comments Stream */}
      <div className="space-y-3">
        {loading ? (
          <div className="p-10 text-center border border-[var(--border-card)] rounded-2xl bg-[var(--bg-card)] text-[var(--text-muted)] text-sm space-y-2">
            <div className="w-8 h-8 rounded-full border-2 border-[var(--brand-orange)] border-t-transparent animate-spin mx-auto mb-2" />
            <p>Syncing moderation queue with Cloudflare D1...</p>
          </div>
        ) : filteredComments.length === 0 ? (
          <div className="p-12 text-center border border-[var(--border-card)] rounded-2xl bg-[var(--bg-card)] space-y-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif-title font-bold text-sm sm:text-base text-[var(--text-main)]">
                {searchQuery ? "No matching comments found" : "Moderation Queue Is Clean"}
              </h4>
              <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
                {searchQuery
                  ? "Try clearing your search query or switching the status filter."
                  : selectedSite === "trc254"
                  ? "No comments currently pending or reported on The Reading Circle 254."
                  : "No comments found in this sandbox."}
              </p>
            </div>
          </div>
        ) : (
          filteredComments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 sm:p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-sm space-y-3 transition-all hover:border-[var(--brand-orange)]/40"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-card)] pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[var(--brand-orange)]/15 text-[var(--brand-orange)] font-bold text-xs flex items-center justify-center shrink-0">
                    {comment.authorName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="font-bold text-xs sm:text-sm text-[var(--text-main)]">
                      {comment.authorName}
                    </span>
                    {comment.authorEmail && (
                      <span className="text-[11px] text-[var(--text-muted)] ml-2">
                        &bull; {comment.authorEmail}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      comment.status === "approved"
                        ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                        : comment.status === "spam"
                        ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                        : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                    }`}
                  >
                    {comment.status}
                  </span>
                  <span className="text-[var(--text-muted)] text-[11px]">{comment.createdAt}</span>
                </div>
              </div>

              {editingId === comment.id ? (
                <div className="space-y-2 pt-1">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={3}
                    className="w-full p-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-page)] text-xs sm:text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--brand-orange)]"
                    placeholder="Edit comment content..."
                  />
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={cancelEditing}
                      className="px-3 py-1.5 rounded-lg border border-[var(--border-card)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-main)] font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <X className="w-3 h-3" />
                      <span>Cancel</span>
                    </button>
                    <button
                      onClick={() => saveEdit(comment.id)}
                      className="px-3 py-1.5 rounded-lg bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1 shadow-sm"
                    >
                      <Check className="w-3 h-3" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {comment.content}
                </p>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs text-[var(--text-muted)]">
                <div className="flex items-center gap-1.5">
                  <span>On:</span>
                  <a
                    href={comment.threadUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-[var(--brand-orange)] hover:underline truncate max-w-xs flex items-center gap-1"
                  >
                    <span>{comment.threadTitle}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => startEditing(comment)}
                    className="px-2.5 py-1 rounded-lg bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-main)] font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1"
                    title="Edit comment content"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>

                  {comment.status !== "approved" && (
                    <button
                      onClick={() => handleApprove(comment.id)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Approve</span>
                    </button>
                  )}

                  {comment.status !== "spam" && (
                    <button
                      onClick={() => handleFlagSpam(comment.id)}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <AlertTriangle className="w-3 h-3" />
                      <span>Flag Spam</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
