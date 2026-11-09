import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db, ensureTables } from "@/lib/db";
import {
  organization,
  member,
  sites,
  threads,
  comments,
  authors,
  siteCollaborators,
} from "@nyuzi/db";
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

      // Security check: Verify that the current user is a member of this team, a site collaborator, or platform admin
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

      const allTeamSites = await db
        .select()
        .from(sites)
        .where(eq(sites.organizationId, org.id));

      if (isMember.length > 0 || isFred) {
        const enrichedSites = allTeamSites.map((s) => ({
          ...s,
          userRole: isFred ? "owner" : isMember[0]?.role || "owner",
          isShared: false,
        }));
        return NextResponse.json({ sites: enrichedSites, team: org });
      }

      // Check if user is invited as a collaborator to specific site(s) in this workspace
      const cleanEmail = session.user.email.toLowerCase();
      const userCollabs = await db
        .select()
        .from(siteCollaborators)
        .where(
          or(
            eq(siteCollaborators.userId, session.user.id),
            eq(siteCollaborators.email, cleanEmail)
          )
        );

      const collabBySiteId = new Map(
        userCollabs.map((c) => [c.siteId, c])
      );

      const authorizedSites = allTeamSites
        .filter((s) => collabBySiteId.has(s.id))
        .map((s) => ({
          ...s,
          userRole: collabBySiteId.get(s.id)?.role || "moderator",
          isShared: true,
        }));

      if (authorizedSites.length === 0) {
        return NextResponse.json(
          { error: "Forbidden: You do not have access to any publications in this workspace" },
          { status: 403 }
        );
      }

      return NextResponse.json({ sites: authorizedSites, team: org });
    }

    // If no teamSlug query param, return user's authorized sites (owned + collaborated)
    const userMemberships = await db
      .select({ organizationId: member.organizationId })
      .from(member)
      .where(eq(member.userId, session.user.id));

    const orgIds = userMemberships.map((m: any) => m.organizationId);

    const cleanEmail = session.user.email.toLowerCase();
    const userCollabs = await db
      .select()
      .from(siteCollaborators)
      .where(
        or(
          eq(siteCollaborators.userId, session.user.id),
          eq(siteCollaborators.email, cleanEmail)
        )
      );
    const collabSiteIds = userCollabs.map((c) => c.siteId);

    let userSites = [];
    const conditions: any[] = [eq(sites.ownerId, session.user.id)];
    if (orgIds.length > 0) {
      conditions.push(inArray(sites.organizationId, orgIds));
    }
    if (collabSiteIds.length > 0) {
      conditions.push(inArray(sites.id, collabSiteIds));
    }

    userSites = await db
      .select()
      .from(sites)
      .where(or(...conditions));

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

export async function PATCH(req: Request) {
  await ensureTables();
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      siteId,
      name,
      domain,
      moderationRequired,
      turnstileEnabled,
      accentColor,
    } = body;

    if (!siteId) {
      return NextResponse.json({ error: "Publication ID is required" }, { status: 400 });
    }

    const existingSites = await db
      .select()
      .from(sites)
      .where(eq(sites.id, siteId))
      .limit(1);

    if (existingSites.length === 0) {
      return NextResponse.json({ error: "Publication not found" }, { status: 404 });
    }

    const site = existingSites[0];
    const isAdmin = isPlatformAdmin(session.user.email);

    // Check membership / ownership
    let isAuthorized = isAdmin || site.ownerId === session.user.id;
    if (!isAuthorized && site.organizationId) {
      const mem = await db
        .select()
        .from(member)
        .where(
          and(
            eq(member.organizationId, site.organizationId),
            eq(member.userId, session.user.id)
          )
        )
        .limit(1);
      if (mem.length > 0 && (mem[0].role === "owner" || mem[0].role === "admin")) {
        isAuthorized = true;
      }
    }
    if (!isAuthorized) {
      const collab = await db
        .select()
        .from(siteCollaborators)
        .where(
          and(
            eq(siteCollaborators.siteId, siteId),
            or(
              eq(siteCollaborators.userId, session.user.id),
              eq(siteCollaborators.email, session.user.email.toLowerCase())
            )
          )
        )
        .limit(1);
      if (collab.length > 0 && collab[0].role === "admin") {
        isAuthorized = true;
      }
    }

    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Forbidden: You do not have permission to edit this publication" },
        { status: 403 }
      );
    }

    let parsedSettings: Record<string, any> = {};
    try {
      parsedSettings = site.settings ? JSON.parse(site.settings) : {};
    } catch {
      parsedSettings = {};
    }

    if (accentColor !== undefined) {
      parsedSettings.accentColor = accentColor;
    }

    const updatedFields: Record<string, any> = {
      settings: JSON.stringify(parsedSettings),
    };

    if (typeof name === "string" && name.trim()) {
      updatedFields.name = name.trim();
    }
    if (typeof domain === "string" && domain.trim()) {
      updatedFields.domain = domain.trim().toLowerCase().replace(/^https?:\/\//, "");
    }
    if (typeof moderationRequired === "boolean") {
      updatedFields.moderationRequired = moderationRequired;
    }
    if (typeof turnstileEnabled === "boolean") {
      updatedFields.turnstileEnabled = turnstileEnabled;
    }

    await db.update(sites).set(updatedFields).where(eq(sites.id, siteId));

    const updatedSite = {
      ...site,
      ...updatedFields,
    };

    return NextResponse.json({ site: updatedSite });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  await ensureTables();
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    let siteId = url.searchParams.get("siteId");
    let purgeOnly = url.searchParams.get("purgeOnly") === "true";

    if (!siteId) {
      try {
        const body = await req.json();
        siteId = body.siteId;
        if (body.purgeOnly !== undefined) purgeOnly = Boolean(body.purgeOnly);
      } catch {
        // No JSON body
      }
    }

    if (!siteId) {
      return NextResponse.json({ error: "Publication ID is required" }, { status: 400 });
    }

    const existingSites = await db
      .select()
      .from(sites)
      .where(eq(sites.id, siteId))
      .limit(1);

    if (existingSites.length === 0) {
      return NextResponse.json({ error: "Publication not found" }, { status: 404 });
    }

    const site = existingSites[0];
    const isAdmin = isPlatformAdmin(session.user.email);

    let isAuthorized = isAdmin || site.ownerId === session.user.id;
    if (!isAuthorized && site.organizationId) {
      const mem = await db
        .select()
        .from(member)
        .where(
          and(
            eq(member.organizationId, site.organizationId),
            eq(member.userId, session.user.id)
          )
        )
        .limit(1);
      if (mem.length > 0 && (mem[0].role === "owner" || mem[0].role === "admin")) {
        isAuthorized = true;
      }
    }
    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Forbidden: Only the publication owner can delete this publication" },
        { status: 403 }
      );
    }

    // Cascade delete dependent records for this site
    await db.delete(comments).where(eq(comments.siteId, siteId));
    await db.delete(threads).where(eq(threads.siteId, siteId));

    if (purgeOnly) {
      return NextResponse.json({
        success: true,
        purgedSiteId: siteId,
      });
    }

    await db.delete(siteCollaborators).where(eq(siteCollaborators.siteId, siteId));
    await db.delete(authors).where(eq(authors.siteId, siteId));
    await db.delete(sites).where(eq(sites.id, siteId));

    return NextResponse.json({
      success: true,
      deletedSiteId: siteId,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
