"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDashboard } from "../context";

export default function LegacyAuthorsRedirect() {
  const router = useRouter();
  const { selectedSite, activeTeamSlug } = useDashboard();

  useEffect(() => {
    const team = activeTeamSlug || "freds-projects";
    router.replace(`/dashboard/${team}/${selectedSite || "trc254"}/authors`);
  }, [router, selectedSite, activeTeamSlug]);

  return null;
}
