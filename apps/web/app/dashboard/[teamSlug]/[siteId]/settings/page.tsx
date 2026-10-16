"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDashboard } from "../../../context";
import { SettingsTab } from "../../../components/SettingsTab";

export default function PublicationSettingsPage() {
  const params = useParams<{ teamSlug: string; siteId: string }>();
  const teamSlug = params?.teamSlug || "";
  const siteId = params?.siteId || "";
  const {
    selectedSite,
    setSelectedSite,
    activeTeamSlug,
    setActiveTeamSlug,
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
    <div className="space-y-6">
      <SettingsTab selectedSite={siteId} />
    </div>
  );
}
