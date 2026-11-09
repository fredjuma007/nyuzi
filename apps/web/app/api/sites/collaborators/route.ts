import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db, ensureTables } from "@/lib/db";
import { sites, member, user, siteCollaborators } from "@nyuzi/db";
import { eq, and, or } from "drizzle-orm";
import { isPlatformAdmin } from "@/lib/admin";

async function getRequesterSitePermission(
  siteId: string,
  userId: string,
  userEmail: string
): Promise<"owner" | "admin" | "moderator" | "viewer" | null> {
  if (isPlatformAdmin(userEmail)) return "owner";

  const foundSites = await db
    .select()
    .from(sites)
    .where(eq(sites.id, siteId))
    .limit(1);

  if (foundSites.length === 0) return null;
  const site = foundSites[0];

  if (
    site.ownerId === userId ||
    (site.ownerEmail && site.ownerEmail.toLowerCase() === userEmail.toLowerCase())
  ) {
    return "owner";
  }

  if (site.organizationId) {
    const orgMem = await db
      .select()
      .from(member)
      .where(
        and(
          eq(member.organizationId, site.organizationId),
          eq(member.userId, userId)
        )
      )
      .limit(1);

    if (orgMem.length > 0 && (orgMem[0].role === "owner" || orgMem[0].role === "admin")) {
      return "owner";
    }
  }

  const collabs = await db
    .select()
    .from(siteCollaborators)
    .where(
      and(
        eq(siteCollaborators.siteId, siteId),
        or(
          eq(siteCollaborators.userId, userId),
          eq(siteCollaborators.email, userEmail.toLowerCase())
        )
      )
    )
    .limit(1);

  if (collabs.length > 0) {
    return (collabs[0].role as "admin" | "moderator" | "viewer") || "moderator";
  }

  return null;
}

export async function GET(req: Request) {
  await ensureTables();
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const siteId = url.searchParams.get("siteId");

  if (!siteId) {
    return NextResponse.json({ error: "siteId is required" }, { status: 400 });
  }

  try {
    const role = await getRequesterSitePermission(
      siteId,
      session.user.id,
      session.user.email
    );

    if (!role) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const foundSites = await db
      .select()
      .from(sites)
      .where(eq(sites.id, siteId))
      .limit(1);

    const site = foundSites[0];

    const rawCollabs = await db
      .select()
      .from(siteCollaborators)
      .where(eq(siteCollaborators.siteId, siteId));

    // Enrich with registered user info if available
    const allUsers = await db.select().from(user);
    const userByEmail = new Map(
      allUsers.map((u) => [u.email.toLowerCase(), u])
    );

    const enrichedCollabs = rawCollabs.map((c) => {
      const matchedUser = userByEmail.get(c.email.toLowerCase());
      return {
        id: c.id,
        siteId: c.siteId,
        userId: c.userId || matchedUser?.id || null,
        email: c.email,
        name: matchedUser?.name || c.name || c.email.split("@")[0],
        role: c.role,
        hasAccount: Boolean(matchedUser),
        createdAt: c.createdAt,
      };
    });

    const ownerUser = site?.ownerEmail
      ? userByEmail.get(site.ownerEmail.toLowerCase())
      : null;

    return NextResponse.json({
      owner: {
        name: ownerUser?.name || (site?.id === "trc254" ? "Fred Juma" : "Owner"),
        email: site?.ownerEmail || "fredjuma8@gmail.com",
        role: "owner",
      },
      collaborators: enrichedCollabs,
      requesterRole: role,
    });
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
    const { siteId, email, name, role = "moderator" } = body;

    if (!siteId || !email || !email.trim()) {
      return NextResponse.json(
        { error: "siteId and collaborator email are required" },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    const requesterRole = await getRequesterSitePermission(
      siteId,
      session.user.id,
      session.user.email
    );

    if (requesterRole !== "owner" && requesterRole !== "admin") {
      return NextResponse.json(
        { error: "Forbidden: Only the publication owner or admin can invite collaborators" },
        { status: 403 }
      );
    }

    const foundSites = await db
      .select()
      .from(sites)
      .where(eq(sites.id, siteId))
      .limit(1);

    if (foundSites.length === 0) {
      return NextResponse.json({ error: "Publication not found" }, { status: 404 });
    }

    const site = foundSites[0];
    if (site.ownerEmail && site.ownerEmail.toLowerCase() === cleanEmail) {
      return NextResponse.json(
        { error: "This user is already the owner of this publication" },
        { status: 409 }
      );
    }

    const existingCollab = await db
      .select()
      .from(siteCollaborators)
      .where(
        and(
          eq(siteCollaborators.siteId, siteId),
          eq(siteCollaborators.email, cleanEmail)
        )
      )
      .limit(1);

    if (existingCollab.length > 0) {
      return NextResponse.json(
        { error: "This email is already a collaborator on this publication" },
        { status: 409 }
      );
    }

    // Check if user already has a NyuziYap account (without creating a dummy user row that could block OAuth)
    const existingUsers = await db
      .select()
      .from(user)
      .where(eq(user.email, cleanEmail))
      .limit(1);

    const matchedUser = existingUsers[0];
    const validRole: "admin" | "moderator" | "viewer" = ["admin", "moderator", "viewer"].includes(
      role
    )
      ? role
      : "moderator";

    const displayName =
      name?.trim() ||
      matchedUser?.name ||
      cleanEmail
        .split("@")[0]
        .replace(/[._-]/g, " ")
        .replace(/\b\w/g, (l: string) => l.toUpperCase());

    const collabId = `collab_${siteId}_${Math.random().toString(36).substring(2, 8)}`;
    const now = new Date();

    await db.insert(siteCollaborators).values({
      id: collabId,
      siteId,
      userId: matchedUser?.id || null,
      email: cleanEmail,
      name: displayName,
      role: validRole,
      createdAt: now,
    });

    return NextResponse.json(
      {
        collaborator: {
          id: collabId,
          siteId,
          userId: matchedUser?.id || null,
          email: cleanEmail,
          name: displayName,
          role: validRole,
          hasAccount: Boolean(matchedUser),
          createdAt: now,
        },
      },
      { status: 201 }
    );
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
    const { collaboratorId, role } = body;

    if (!collaboratorId || !role) {
      return NextResponse.json(
        { error: "collaboratorId and role are required" },
        { status: 400 }
      );
    }

    const rows = await db
      .select()
      .from(siteCollaborators)
      .where(eq(siteCollaborators.id, collaboratorId))
      .limit(1);

    if (rows.length === 0) {
      return NextResponse.json({ error: "Collaborator not found" }, { status: 404 });
    }

    const target = rows[0];
    const requesterRole = await getRequesterSitePermission(
      target.siteId,
      session.user.id,
      session.user.email
    );

    if (requesterRole !== "owner" && requesterRole !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const validRole: "admin" | "moderator" | "viewer" = ["admin", "moderator", "viewer"].includes(
      role
    )
      ? role
      : "moderator";

    await db
      .update(siteCollaborators)
      .set({ role: validRole })
      .where(eq(siteCollaborators.id, collaboratorId));

    return NextResponse.json({
      success: true,
      collaboratorId,
      role: validRole,
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
    const collaboratorId = url.searchParams.get("collaboratorId");

    if (!collaboratorId) {
      return NextResponse.json(
        { error: "collaboratorId is required" },
        { status: 400 }
      );
    }

    const rows = await db
      .select()
      .from(siteCollaborators)
      .where(eq(siteCollaborators.id, collaboratorId))
      .limit(1);

    if (rows.length === 0) {
      return NextResponse.json({ error: "Collaborator not found" }, { status: 404 });
    }

    const target = rows[0];
    const isSelf =
      target.userId === session.user.id ||
      target.email.toLowerCase() === session.user.email.toLowerCase();

    const requesterRole = await getRequesterSitePermission(
      target.siteId,
      session.user.id,
      session.user.email
    );

    if (!isSelf && requesterRole !== "owner" && requesterRole !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await db
      .delete(siteCollaborators)
      .where(eq(siteCollaborators.id, collaboratorId));

    return NextResponse.json({
      success: true,
      deletedCollaboratorId: collaboratorId,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

