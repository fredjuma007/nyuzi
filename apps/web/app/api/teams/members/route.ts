import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db, ensureTables } from "@/lib/db";
import { organization, member, user } from "@nyuzi/db";
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

  const url = new URL(req.url);
  const teamSlug = url.searchParams.get("teamSlug");

  if (!teamSlug) {
    return NextResponse.json({ error: "teamSlug is required" }, { status: 400 });
  }

  try {
    const orgs = await db
      .select()
      .from(organization)
      .where(eq(organization.slug, teamSlug))
      .limit(1);

    if (orgs.length === 0) {
      return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
    }

    const org = orgs[0];
    const isAdmin = isPlatformAdmin(session.user.email);

    const rows = await db
      .select({
        memberId: member.id,
        role: member.role,
        joinedAt: member.createdAt,
        userId: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      })
      .from(member)
      .innerJoin(user, eq(member.userId, user.id))
      .where(eq(member.organizationId, org.id));

    const isMember = rows.some((r) => r.userId === session.user.id);
    if (!isMember && !isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ members: rows });
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
    const { teamSlug, email, name, role = "moderator" } = body;

    if (!teamSlug || !email || !email.trim()) {
      return NextResponse.json(
        { error: "Workspace slug and member email are required" },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    const orgs = await db
      .select()
      .from(organization)
      .where(eq(organization.slug, teamSlug))
      .limit(1);

    if (orgs.length === 0) {
      return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
    }

    const org = orgs[0];
    const isAdmin = isPlatformAdmin(session.user.email);

    const requesterMem = await db
      .select()
      .from(member)
      .where(
        and(
          eq(member.organizationId, org.id),
          eq(member.userId, session.user.id)
        )
      )
      .limit(1);

    const requesterRole = requesterMem[0]?.role;
    if (!isAdmin && requesterRole !== "owner" && requesterRole !== "admin") {
      return NextResponse.json(
        { error: "Forbidden: Only owners and admins can add team members" },
        { status: 403 }
      );
    }

    // Find or provision user by email
    const existingUsers = await db
      .select()
      .from(user)
      .where(eq(user.email, cleanEmail))
      .limit(1);

    let targetUser = existingUsers[0];
    if (!targetUser) {
      const generatedId = `usr_${Math.random().toString(36).substring(2, 10)}_${Date.now()}`;
      const fallbackName =
        name?.trim() ||
        cleanEmail
          .split("@")[0]
          .replace(/[._-]/g, " ")
          .replace(/\b\w/g, (l: string) => l.toUpperCase());

      targetUser = {
        id: generatedId,
        name: fallbackName,
        email: cleanEmail,
        emailVerified: false,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await db.insert(user).values(targetUser);
    }

    // Check if already a member
    const existingMember = await db
      .select()
      .from(member)
      .where(
        and(
          eq(member.organizationId, org.id),
          eq(member.userId, targetUser.id)
        )
      )
      .limit(1);

    if (existingMember.length > 0) {
      return NextResponse.json(
        { error: "This user is already a member of this workspace" },
        { status: 409 }
      );
    }

    const validRole = ["owner", "admin", "editor", "moderator"].includes(role)
      ? role
      : "moderator";

    const newMemberId = `mem_${org.id}_${targetUser.id}`;
    const joinedAt = new Date();

    await db.insert(member).values({
      id: newMemberId,
      organizationId: org.id,
      userId: targetUser.id,
      role: validRole,
      createdAt: joinedAt,
    });

    return NextResponse.json(
      {
        member: {
          memberId: newMemberId,
          role: validRole,
          joinedAt,
          userId: targetUser.id,
          name: targetUser.name,
          email: targetUser.email,
          image: targetUser.image,
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
    const { memberId, role } = body;

    if (!memberId || !role) {
      return NextResponse.json(
        { error: "memberId and role are required" },
        { status: 400 }
      );
    }

    const targetMembers = await db
      .select()
      .from(member)
      .where(eq(member.id, memberId))
      .limit(1);

    if (targetMembers.length === 0) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    const targetMem = targetMembers[0];
    const isAdmin = isPlatformAdmin(session.user.email);

    const requesterMem = await db
      .select()
      .from(member)
      .where(
        and(
          eq(member.organizationId, targetMem.organizationId),
          eq(member.userId, session.user.id)
        )
      )
      .limit(1);

    const requesterRole = requesterMem[0]?.role;
    if (!isAdmin && requesterRole !== "owner" && requesterRole !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await db
      .update(member)
      .set({ role })
      .where(eq(member.id, memberId));

    return NextResponse.json({ success: true, memberId, role });
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
    const memberId = url.searchParams.get("memberId");

    if (!memberId) {
      return NextResponse.json({ error: "memberId is required" }, { status: 400 });
    }

    const targetMembers = await db
      .select()
      .from(member)
      .where(eq(member.id, memberId))
      .limit(1);

    if (targetMembers.length === 0) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    const targetMem = targetMembers[0];
    const isAdmin = isPlatformAdmin(session.user.email);

    const allTeamMembers = await db
      .select()
      .from(member)
      .where(eq(member.organizationId, targetMem.organizationId));

    const owners = allTeamMembers.filter((m) => m.role === "owner");
    if (targetMem.role === "owner" && owners.length <= 1) {
      return NextResponse.json(
        { error: "Cannot remove the last owner of a workspace. Transfer ownership or delete the workspace instead." },
        { status: 400 }
      );
    }

    const requesterMem = allTeamMembers.find((m) => m.userId === session.user.id);
    const isSelf = targetMem.userId === session.user.id;
    if (!isAdmin && !isSelf && requesterMem?.role !== "owner" && requesterMem?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await db.delete(member).where(eq(member.id, memberId));

    return NextResponse.json({ success: true, deletedMemberId: memberId });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

