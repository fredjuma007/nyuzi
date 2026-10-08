"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDashboard } from "../../context";
import { EmbedStudioTab } from "../../components/EmbedStudioTab";

export default function PublicationWidgetStudioPage() {
  const params = useParams<{ siteId: string }>();
  const siteId = params?.siteId || "trc254";
  const { selectedSite, setSelectedSite, showToast } = useDashboard();

  useEffect(() => {
    if (siteId && siteId !== selectedSite) {
      setSelectedSite(siteId);
    }
  }, [siteId, selectedSite, setSelectedSite]);

  return (
    <div className="flex-1 flex flex-col min-h-0 h-full">
      <EmbedStudioTab selectedSite={siteId} showToast={showToast} />
    </div>
  );
}
