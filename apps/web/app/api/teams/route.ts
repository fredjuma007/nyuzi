import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db, ensureTables } from "@/lib/db";
import { organization, member, sites } from "@nyuzi/db";
import { eq, and } from "drizzle-orm";
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

    const teamsList = userMemberships.map((m: any) => ({
      ...m.org,
      role: m.role,
    }));

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
