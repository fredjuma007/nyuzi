"use client";

import React from "react";
import { useDashboard } from "../context";
import { ThreadsTab } from "../components/ThreadsTab";

export default function ThreadsPage() {
  const { loading, threadsList, selectedSite } = useDashboard();

  return (
    <div className="space-y-6">
      <ThreadsTab
        loading={loading}
        threadsList={threadsList}
        selectedSite={selectedSite}
      />
    </div>
  );
}
