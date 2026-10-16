import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db, ensureTables } from "@/lib/db";
import { organization, member, sites } from "@nyuzi/db";
import { eq, and, or, inArray } from "drizzle-orm";
import { isPlatformAdmin } from "@/lib/admin";

export async function GET(req: Request) {
  await ensureTables();
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const teamSlug = url.searchParams.get("teamSlug");

  try {
    const isFred = isPlatformAdmin(session.user.email);

    if (isFred) {
      await db
        .update(sites)
        .set({
          ownerId: session.user.id,
          ownerEmail: session.user.email,
          organizationId: "org_fred_personal",
        })
        .where(eq(sites.id, "trc254"));
    }

    if (teamSlug) {
      // Find org by slug
      const orgs = await db
        .select()
        .from(organization)
        .where(eq(organization.slug, teamSlug))
        .limit(1);

      if (orgs.length === 0) {
        return NextResponse.json({ error: "Team not found" }, { status: 404 });
      }

      const org = orgs[0];

      // Security check: Verify that the current user is a member of this team or platform admin
      const isMember = await db
        .select()
        .from(member)
        .where(
          and(
            eq(member.organizationId, org.id),
            eq(member.userId, session.user.id)
          )
        )
        .limit(1);

      if (isMember.length === 0 && !isFred) {
        return NextResponse.json(
          { error: "Forbidden: You are not a member of this workspace" },
          { status: 403 }
        );
      }

      const teamSites = await db
        .select()
        .from(sites)
        .where(eq(sites.organizationId, org.id));

      return NextResponse.json({ sites: teamSites, team: org });
    }

    // If no teamSlug query param, return user's authorized sites
    const userMemberships = await db
      .select({ organizationId: member.organizationId })
      .from(member)
      .where(eq(member.userId, session.user.id));

    const orgIds = userMemberships.map((m) => m.organizationId);

    let userSites = [];
    if (orgIds.length > 0) {
      userSites = await db
        .select()
        .from(sites)
        .where(
          or(
            eq(sites.ownerId, session.user.id),
            inArray(sites.organizationId, orgIds)
          )
        );
    } else {
      userSites = await db
        .select()
        .from(sites)
        .where(eq(sites.ownerId, session.user.id));
    }

    return NextResponse.json({ sites: userSites });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await ensureTables();
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, domain, accentColor, teamSlug, organizationId } = body;

    if (!name || !domain) {
      return NextResponse.json(
        { error: "Publication name and domain are required" },
        { status: 400 }
      );
    }

    let resolvedOrgId = organizationId;
    let resolvedTeamSlug = teamSlug;

    if (!resolvedOrgId && teamSlug) {
      const orgs = await db
        .select()
        .from(organization)
        .where(eq(organization.slug, teamSlug))
        .limit(1);
      if (orgs.length > 0) {
        resolvedOrgId = orgs[0].id;
      }
    }

    // If user has no organizationId specified (e.g. from onboarding):
    if (!resolvedOrgId) {
      // Find an existing personal organization for this user:
      const existingMemberships = await db
        .select({ org: organization })
        .from(member)
        .innerJoin(organization, eq(member.organizationId, organization.id))
        .where(eq(member.userId, session.user.id))
        .limit(1);

      if (existingMemberships.length > 0) {
        resolvedOrgId = existingMemberships[0].org.id;
        resolvedTeamSlug = existingMemberships[0].org.slug;
      } else {
        // Create their first personal organization now!
        const cleanName = session.user.name || "Publisher";
        const slugPrefix = cleanName.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 14);
        const randomSuffix = Math.random().toString(36).substring(2, 6);
        const autoTeamSlug = `${slugPrefix}-projects-${randomSuffix}`;
        const newOrgId = `org_${session.user.id.slice(0, 8)}_${randomSuffix}`;

        const newOrg = {
          id: newOrgId,
          name: `${cleanName}'s Projects`,
          slug: autoTeamSlug,
          logo: null,
          createdAt: new Date(),
          metadata: JSON.stringify({ type: "personal" }),
        };

        await db.insert(organization).values(newOrg);
        await db.insert(member).values({
          id: `mem_${newOrgId}_${session.user.id}`,
          organizationId: newOrgId,
          userId: session.user.id,
          role: "owner",
          createdAt: new Date(),
        });

        resolvedOrgId = newOrgId;
        resolvedTeamSlug = autoTeamSlug;
      }
    }

    // Generate unique clean site id
    const cleanPrefix = name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 8);
    const randomSuffix = Math.random().toString(36).substring(2, 7);
    const siteId = `${cleanPrefix || "site"}_${randomSuffix}`;

    const newSite = {
      id: siteId,
      name: name.trim(),
      domain: domain.trim().toLowerCase().replace(/^https?:\/\//, ""),
      ownerId: session.user.id,
      ownerEmail: session.user.email,
      organizationId: resolvedOrgId,
      turnstileEnabled: false,
      moderationRequired: false,
      settings: JSON.stringify({
        accentColor: accentColor || "#f56220",
      }),
      createdAt: new Date(),
    };

    await db.insert(sites).values(newSite);

    return NextResponse.json({ site: newSite, teamSlug: resolvedTeamSlug }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
