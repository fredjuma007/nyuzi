"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDashboard } from "../../../context";
import { EmbedStudioTab } from "../../../components/EmbedStudioTab";

export default function PublicationWidgetStudioPage() {
  const params = useParams<{ teamSlug: string; siteId: string }>();
  const teamSlug = params?.teamSlug || "";
  const siteId = params?.siteId || "";
  const {
    selectedSite,
    setSelectedSite,
    activeTeamSlug,
    setActiveTeamSlug,
    showToast,
  } = useDashboard();

  useEffect(() => {
    if (siteId && siteId !== selectedSite) {
      setSelectedSite(siteId);
    }
    if (teamSlug && teamSlug !== activeTeamSlug) {
      setActiveTeamSlug(teamSlug);
    }
  }, [siteId, teamSlug, selectedSite, activeTeamSlug, setSelectedSite, setActiveTeamSlug]);

  return (
    <div className="flex-1 flex flex-col min-h-0 h-full">
      <EmbedStudioTab selectedSite={siteId} showToast={showToast} />
    </div>
  );
}
