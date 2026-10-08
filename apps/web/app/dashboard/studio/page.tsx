"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDashboard } from "../context";

export default function LegacyStudioRedirect() {
  const router = useRouter();
  const { selectedSite, activeTeamSlug } = useDashboard();

  useEffect(() => {
    const team = activeTeamSlug || "freds-projects";
    router.replace(`/dashboard/${team}/${selectedSite || "trc254"}/studio`);
  }, [router, selectedSite, activeTeamSlug]);

  return null;
}
