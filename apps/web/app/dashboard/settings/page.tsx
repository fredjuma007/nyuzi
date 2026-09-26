"use client";

import React from "react";
import { useDashboard } from "../context";
import { SettingsTab } from "../components/SettingsTab";

export default function SettingsPage() {
  const { selectedSite } = useDashboard();

  return (
    <div className="space-y-6">
      <SettingsTab selectedSite={selectedSite} />
    </div>
  );
}
