"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDashboard } from "../context";
import { ProjectsHub } from "../components/ProjectsHub";

export default function TeamProjectsHubPage() {
  const params = useParams<{ teamSlug: string }>();
  const router = useRouter();
  const teamSlug = params?.teamSlug || "freds-projects";

  const { activeTeamSlug, setActiveTeamSlug, fetchUserSites, sites } = useDashboard();

  useEffect(() => {
    // If someone visits /dashboard/trc254 directly (legacy siteId URL), redirect to the team-scoped site page
    if (teamSlug === "trc254" || (sites.length > 0 && sites.some((s) => s.id === teamSlug))) {
      const targetTeam = activeTeamSlug || "freds-projects";
      router.replace(`/dashboard/${targetTeam}/${teamSlug}`);
      return;
    }

    if (teamSlug && teamSlug !== activeTeamSlug) {
      setActiveTeamSlug(teamSlug);
      fetchUserSites(teamSlug);
    }
  }, [teamSlug, activeTeamSlug, setActiveTeamSlug, fetchUserSites, sites, router]);

  const handleSelectSite = (siteId: string) => {
    router.push(`/dashboard/${teamSlug}/${siteId}`);
  };

  return (
    <div className="space-y-6">
      <ProjectsHub onSelectSite={handleSelectSite} />
    </div>
  );
}
