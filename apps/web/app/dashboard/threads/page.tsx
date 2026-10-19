"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDashboard } from "../context";

export default function LegacyThreadsRedirect() {
  const router = useRouter();
  const { selectedSite, activeTeamSlug, teams, sites, teamsLoading } = useDashboard();

  useEffect(() => {
    if (teamsLoading) return;
    if (teams.length === 0) {
      router.replace("/onboarding");
      return;
    }
    const team = activeTeamSlug || teams[0].slug;
    const site = selectedSite || (sites.length > 0 ? sites[0].id : "");
    if (site) {
      router.replace(`/dashboard/${team}/${site}/threads`);
    } else {
      router.replace(`/dashboard/${team}`);
    }
  }, [router, selectedSite, activeTeamSlug, teams, sites, teamsLoading]);

  return null;
}
