"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDashboard } from "./context";
import { useSession } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";

export default function DashboardRootRedirect() {
  const router = useRouter();
  const { data: session, isPending: sessionPending } = useSession();
  const { activeTeamSlug, teams, teamsLoading } = useDashboard();

  useEffect(() => {
    if (sessionPending) return;

    if (!session?.user) {
      router.replace("/");
      return;
    }

    if (teamsLoading) return;

    if (teams.length === 0) {
      router.replace("/onboarding");
      return;
    }

    const targetTeam = teams.find((t) => t.slug === activeTeamSlug) || teams[0];
    router.replace(`/dashboard/${targetTeam.slug}`);
  }, [router, session, sessionPending, activeTeamSlug, teams, teamsLoading]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center text-[var(--text-muted)]">
      <Loader2 className="w-6 h-6 animate-spin text-[var(--brand-orange)]" />
    </div>
  );
}
