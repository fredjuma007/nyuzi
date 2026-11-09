import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db, ensureTables } from "@/lib/db";
import {
  user,
  session as sessionTable,
  account,
  organization,
  member,
  sites,
  threads,
  comments,
  authors,
} from "@nyuzi/db";
import { eq, inArray } from "drizzle-orm";

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
    const { name, image } = body;

    const updates: Record<string, any> = {
      updatedAt: new Date(),
    };

    if (typeof name === "string" && name.trim()) {
      updates.name = name.trim();
    }
    if (image !== undefined) {
      updates.image = image ? String(image).trim() : null;
    }

    await db.update(user).set(updates).where(eq(user.id, session.user.id));

    return NextResponse.json({
      user: {
        ...session.user,
        ...updates,
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
    const userId = session.user.id;

    // 1. Find all organizations this user belongs to
    const userMemberships = await db
      .select()
      .from(member)
      .where(eq(member.userId, userId));

    for (const mem of userMemberships) {
      const orgMembers = await db
        .select()
        .from(member)
        .where(eq(member.organizationId, mem.organizationId));

      // If this user is the sole member of the organization (and not the shared flagship org), clean up the org & its sites
      if (orgMembers.length <= 1 && mem.organizationId !== "org_fred_personal") {
        const orgSites = await db
          .select({ id: sites.id })
          .from(sites)
          .where(eq(sites.organizationId, mem.organizationId));

        const siteIds = orgSites.map((s) => s.id).filter((id) => id !== "trc254");
        if (siteIds.length > 0) {
          await db.delete(comments).where(inArray(comments.siteId, siteIds));
          await db.delete(threads).where(inArray(threads.siteId, siteIds));
          await db.delete(authors).where(inArray(authors.siteId, siteIds));
          await db.delete(sites).where(inArray(sites.id, siteIds));
        }

        await db.delete(member).where(eq(member.organizationId, mem.organizationId));
        await db.delete(organization).where(eq(organization.id, mem.organizationId));
      }
    }

    // 2. Delete remaining memberships, sessions, accounts, and user record
    await db.delete(member).where(eq(member.userId, userId));
    await db.delete(sessionTable).where(eq(sessionTable.userId, userId));
    await db.delete(account).where(eq(account.userId, userId));
    await db.delete(user).where(eq(user.id, userId));

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

