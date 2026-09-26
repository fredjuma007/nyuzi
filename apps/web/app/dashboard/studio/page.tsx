"use client";

import React from "react";
import { useDashboard } from "../context";
import { EmbedStudioTab } from "../components/EmbedStudioTab";

export default function WidgetStudioPage() {
  const { selectedSite, showToast } = useDashboard();

  return (
    <div className="flex-1 flex flex-col min-h-0 h-full">
      <EmbedStudioTab selectedSite={selectedSite} showToast={showToast} />
    </div>
  );
}
