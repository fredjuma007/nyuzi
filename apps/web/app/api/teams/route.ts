import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db, ensureTables } from "@/lib/db";
import { organization, member, sites } from "@nyuzi/db";
import { eq, and } from "drizzle-orm";

export async function GET(req: Request) {
  await ensureTables();
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const isFred =
      Boolean(session.user.email && session.user.email.toLowerCase().includes("fred")) ||
      Boolean(session.user.name && session.user.name.toLowerCase().includes("fred")) ||
      session.user.email === "readingcircle254@gmail.com";

    // If Fred, make sure he is registered as owner of org_fred_personal
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

    let teamsList = userMemberships.map((m) => ({
      ...m.org,
      role: m.role,
    }));

    // If a new user has zero teams yet, automatically bootstrap their personal workspace
    if (teamsList.length === 0) {
      const cleanName = session.user.name || "Publisher";
      const slugPrefix = cleanName.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 14);
      const randomSuffix = Math.random().toString(36).substring(2, 6);
      const teamSlug = `${slugPrefix}-projects-${randomSuffix}`;
      const newOrgId = `org_${session.user.id.slice(0, 8)}_${randomSuffix}`;

      const newOrg = {
        id: newOrgId,
        name: `${cleanName}'s Projects`,
        slug: teamSlug,
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

      teamsList = [{ ...newOrg, role: "owner" }];
    }

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
