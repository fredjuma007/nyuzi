"use client";

import React from "react";
import { useDashboard } from "../context";
import { EmbedStudioTab } from "../components/EmbedStudioTab";

export default function WidgetStudioPage() {
  const { selectedSite, showToast } = useDashboard();

  return (
    <div className="space-y-6">
      <EmbedStudioTab selectedSite={selectedSite} showToast={showToast} />
    </div>
  );
}
