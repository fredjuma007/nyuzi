"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDashboard } from "../context";
import { ProjectsHub } from "../components/ProjectsHub";

export default function TeamProjectsHubPage() {
  const params = useParams<{ teamSlug: string }>();
  const router = useRouter();
  const teamSlug = params?.teamSlug || "";

  const { activeTeamSlug, setActiveTeamSlug, fetchUserSites, sites, teams } = useDashboard();

  useEffect(() => {
    if (!teamSlug) return;

    // If someone visits /dashboard/trc254 directly (legacy siteId URL), redirect to the team-scoped site page
    if (teamSlug === "trc254" || (sites.length > 0 && sites.some((s) => s.id === teamSlug))) {
      const targetTeam = activeTeamSlug || (teams.length > 0 ? teams[0].slug : "");
      if (targetTeam) {
        router.replace(`/dashboard/${targetTeam}/${teamSlug}`);
      }
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
