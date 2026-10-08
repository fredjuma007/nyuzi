"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDashboard } from "../../context";
import { SettingsTab } from "../../components/SettingsTab";

export default function PublicationSettingsPage() {
  const params = useParams<{ siteId: string }>();
  const siteId = params?.siteId || "trc254";
  const { selectedSite, setSelectedSite } = useDashboard();

  useEffect(() => {
    if (siteId && siteId !== selectedSite) {
      setSelectedSite(siteId);
    }
  }, [siteId, selectedSite, setSelectedSite]);

  return (
    <div className="space-y-6">
      <SettingsTab selectedSite={siteId} />
    </div>
  );
}
