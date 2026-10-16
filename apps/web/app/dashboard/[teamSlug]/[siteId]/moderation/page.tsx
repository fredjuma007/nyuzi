"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import { useDashboard } from "../../../context";
import { ModerationTab } from "../../../components/ModerationTab";

export default function PublicationModerationPage() {
  const params = useParams<{ teamSlug: string; siteId: string }>();
  const teamSlug = params?.teamSlug || "";
  const siteId = params?.siteId || "";

  const {
    loading,
    commentsList,
    selectedSite,
    setSelectedSite,
    selectedSiteData,
    activeTeamSlug,
    setActiveTeamSlug,
    handleApprove,
    handleFlagSpam,
    handleDelete,
    handleEditComment,
  } = useDashboard();

  useEffect(() => {
    if (siteId && siteId !== selectedSite) {
      setSelectedSite(siteId);
    }
    if (teamSlug && teamSlug !== activeTeamSlug) {
      setActiveTeamSlug(teamSlug);
    }
  }, [siteId, teamSlug, selectedSite, activeTeamSlug, setSelectedSite, setActiveTeamSlug]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "approved" | "pending" | "spam">("all");

  const filteredComments = commentsList.filter((comment) => {
    if (comment.status === "deleted") return false;

    const matchesStatus = statusFilter === "all" || comment.status === statusFilter;
    const matchesSearch =
      searchQuery === "" ||
      comment.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.threadTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const siteDisplayName =
    selectedSiteData?.name || (siteId === "trc254" ? "The Reading Circle 254" : siteId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[var(--border-card)]">
        <div>
          <h2 className="font-serif-title text-2xl font-bold flex items-center gap-2.5">
            <ShieldAlert className="w-6 h-6 text-rose-500" />
            <span>Moderation Queue</span>
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-0.5">
            Review, edit, and moderate reader comments across {siteDisplayName}.
          </p>
        </div>
      </div>

      {/* Moderation Inbox Workspace */}
      <ModerationTab
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        loading={loading}
        filteredComments={filteredComments}
        selectedSite={siteId}
        handleApprove={handleApprove}
        handleFlagSpam={handleFlagSpam}
        handleDelete={handleDelete}
        handleEdit={handleEditComment}
      />
    </div>
  );
}
