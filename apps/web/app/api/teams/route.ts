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
import { eq, and, or, inArray, ne } from "drizzle-orm";
import { isPlatformAdmin } from "@/lib/admin";

export async function GET(req: Request) {
  await ensureTables();
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const isFred = isPlatformAdmin(session.user.email);

    // If Fred/platform admin, make sure he is registered as owner of org_fred_personal
    if (isFred) {
      const existingMem = await db
        .select()
        .from(member)
        .where(
          and(
            eq(member.organizationId, "org_fred_personal"),
            eq(member.userId, session.user.id)
          )
        );

      if (existingMem.length === 0) {
        await db.insert(member).values({
          id: `mem_${session.user.id}_fred_personal`,
          organizationId: "org_fred_personal",
          userId: session.user.id,
          role: "owner",
          createdAt: new Date(),
        });
      }
    }

    // Query user's organizations via member table
    const userMemberships = await db
      .select({
        org: organization,
        role: member.role,
      })
      .from(member)
      .innerJoin(organization, eq(member.organizationId, organization.id))
      .where(eq(member.userId, session.user.id));

    const teamsMap = new Map<string, any>();
    for (const m of userMemberships) {
      teamsMap.set(m.org.id, {
        ...m.org,
        role: m.role,
      });
    }

    // Also check site-level collaborations for this user's email or userId
    const cleanEmail = session.user.email.toLowerCase();
    const userCollabs = await db
      .select({
        collab: siteCollaborators,
        site: sites,
        org: organization,
      })
      .from(siteCollaborators)
      .innerJoin(sites, eq(siteCollaborators.siteId, sites.id))
      .innerJoin(organization, eq(sites.organizationId, organization.id))
      .where(
        or(
          eq(siteCollaborators.userId, session.user.id),
          eq(siteCollaborators.email, cleanEmail)
        )
      );

    for (const row of userCollabs) {
      // Auto-link userId if not yet linked
      if (!row.collab.userId) {
        await db
          .update(siteCollaborators)
          .set({ userId: session.user.id })
          .where(eq(siteCollaborators.id, row.collab.id));
      }

      const existingTeam = teamsMap.get(row.org.id);
      if (!existingTeam) {
        teamsMap.set(row.org.id, {
          ...row.org,
          role: "collaborator",
          collaboratorSiteIds: [row.site.id],
        });
      } else if (existingTeam.role === "collaborator") {
        existingTeam.collaboratorSiteIds = [
          ...(existingTeam.collaboratorSiteIds || []),
          row.site.id,
        ];
      }
    }

    const teamsList = Array.from(teamsMap.values());

    return NextResponse.json({ teams: teamsList });
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
    const { name } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Team name is required" }, { status: 400 });
    }

    const cleanPrefix = name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 20);
    const randomSuffix = Math.random().toString(36).substring(2, 6);
    const slug = `${cleanPrefix}-${randomSuffix}`;
    const orgId = `org_${randomSuffix}_${Date.now()}`;

    const newOrg = {
      id: orgId,
      name: name.trim(),
      slug,
      logo: null,
      createdAt: new Date(),
      metadata: JSON.stringify({ type: "team" }),
    };

    await db.insert(organization).values(newOrg);
    await db.insert(member).values({
      id: `mem_${orgId}_${session.user.id}`,
      organizationId: orgId,
      userId: session.user.id,
      role: "owner",
      createdAt: new Date(),
    });

    return NextResponse.json({ team: { ...newOrg, role: "owner" } }, { status: 201 });
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
    const { teamId, currentSlug, name, slug } = body;

    const orgs = await db
      .select()
      .from(organization)
      .where(teamId ? eq(organization.id, teamId) : eq(organization.slug, currentSlug || ""))
      .limit(1);

    if (orgs.length === 0) {
      return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
    }

    const org = orgs[0];
    const isAdmin = isPlatformAdmin(session.user.email);

    const mem = await db
      .select()
      .from(member)
      .where(
        and(
          eq(member.organizationId, org.id),
          eq(member.userId, session.user.id)
        )
      )
      .limit(1);

    const userRole = mem[0]?.role;
    if (!isAdmin && userRole !== "owner" && userRole !== "admin") {
      return NextResponse.json(
        { error: "Forbidden: Only workspace owners or admins can update workspace settings" },
        { status: 403 }
      );
    }

    const updatedFields: Record<string, any> = {};
    if (typeof name === "string" && name.trim()) {
      updatedFields.name = name.trim();
    }

    if (typeof slug === "string" && slug.trim()) {
      const cleanSlug = slug
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      if (cleanSlug.length < 2) {
        return NextResponse.json(
          { error: "Workspace slug must be at least 2 characters" },
          { status: 400 }
        );
      }

      if (cleanSlug !== org.slug) {
        const collision = await db
          .select()
          .from(organization)
          .where(and(eq(organization.slug, cleanSlug), ne(organization.id, org.id)))
          .limit(1);

        if (collision.length > 0) {
          return NextResponse.json(
            { error: "That workspace slug is already taken. Try another one." },
            { status: 409 }
          );
        }
        updatedFields.slug = cleanSlug;
      }
    }

    if (Object.keys(updatedFields).length > 0) {
      await db
        .update(organization)
        .set(updatedFields)
        .where(eq(organization.id, org.id));
    }

    return NextResponse.json({
      team: {
        ...org,
        ...updatedFields,
        role: userRole || "owner",
      },
    });
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
    let teamSlug = url.searchParams.get("teamSlug");
    let teamId = url.searchParams.get("teamId");

    if (!teamSlug && !teamId) {
      try {
        const body = await req.json();
        teamSlug = body.teamSlug;
        teamId = body.teamId;
      } catch {
        // No body
      }
    }

    if (!teamSlug && !teamId) {
      return NextResponse.json(
        { error: "Workspace identifier is required" },
        { status: 400 }
      );
    }

    const orgs = await db
      .select()
      .from(organization)
      .where(teamId ? eq(organization.id, teamId) : eq(organization.slug, teamSlug!))
      .limit(1);

    if (orgs.length === 0) {
      return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
    }

    const org = orgs[0];
    const isAdmin = isPlatformAdmin(session.user.email);

    const mem = await db
      .select()
      .from(member)
      .where(
        and(
          eq(member.organizationId, org.id),
          eq(member.userId, session.user.id)
        )
      )
      .limit(1);

    if (!isAdmin && mem[0]?.role !== "owner") {
      return NextResponse.json(
        { error: "Forbidden: Only the workspace owner can delete a workspace" },
        { status: 403 }
      );
    }

    // Find all sites in this organization and cascade delete their data
    const orgSites = await db
      .select({ id: sites.id })
      .from(sites)
      .where(eq(sites.organizationId, org.id));

    const siteIds = orgSites.map((s) => s.id);
    if (siteIds.length > 0) {
      await db.delete(comments).where(inArray(comments.siteId, siteIds));
      await db.delete(threads).where(inArray(threads.siteId, siteIds));
      await db.delete(authors).where(inArray(authors.siteId, siteIds));
      await db.delete(sites).where(inArray(sites.id, siteIds));
    }

    await db.delete(member).where(eq(member.organizationId, org.id));
    await db.delete(organization).where(eq(organization.id, org.id));

    return NextResponse.json({
      success: true,
      deletedTeamId: org.id,
      deletedSlug: org.slug,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
