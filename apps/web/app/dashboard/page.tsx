"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ProjectsHub } from "./components/ProjectsHub";
import { useDashboard } from "./context";

export default function DashboardRootPage() {
  const router = useRouter();
  const { setSelectedSite } = useDashboard();

  const handleSelectSite = (siteId: string) => {
    setSelectedSite(siteId);
    router.push(`/dashboard/${siteId}`);
  };

  return <ProjectsHub onSelectSite={handleSelectSite} />;
}
