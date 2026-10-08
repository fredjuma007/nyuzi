"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDashboard } from "../../context";
import { ThreadsTab } from "../../components/ThreadsTab";

export default function PublicationThreadsPage() {
  const params = useParams<{ siteId: string }>();
  const siteId = params?.siteId || "trc254";
  const { loading, threadsList, selectedSite, setSelectedSite } = useDashboard();

  useEffect(() => {
    if (siteId && siteId !== selectedSite) {
      setSelectedSite(siteId);
    }
  }, [siteId, selectedSite, setSelectedSite]);

  return (
    <div className="space-y-6">
      <ThreadsTab
        loading={loading}
        threadsList={threadsList}
        selectedSite={siteId}
      />
    </div>
  );
}
