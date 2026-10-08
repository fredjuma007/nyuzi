"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDashboard } from "./context";
import { Loader2 } from "lucide-react";

export default function DashboardRootRedirect() {
  const router = useRouter();
  const { activeTeamSlug, teams } = useDashboard();

  useEffect(() => {
    const slug = activeTeamSlug || (teams.length > 0 ? teams[0].slug : "freds-projects");
    router.replace(`/dashboard/${slug}`);
  }, [router, activeTeamSlug, teams]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center text-[var(--text-muted)]">
      <Loader2 className="w-6 h-6 animate-spin text-[var(--brand-orange)]" />
    </div>
  );
}
