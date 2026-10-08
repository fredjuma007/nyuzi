"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDashboard } from "../context";

export default function LegacySettingsRedirect() {
  const router = useRouter();
  const { selectedSite } = useDashboard();

  useEffect(() => {
    router.replace(`/dashboard/${selectedSite || "trc254"}/settings`);
  }, [router, selectedSite]);

  return null;
}
