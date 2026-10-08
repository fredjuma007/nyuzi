import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db, ensureTables } from "@/lib/db";
import { organization, member, sites } from "@nyuzi/db";
import { eq, and, or } from "drizzle-orm";

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
    // If the logged in user is Fred, ensure trc254 is linked to his account and personal org
    const isFred =
      Boolean(session.user.email && session.user.email.toLowerCase().includes("fred")) ||
      Boolean(session.user.name && session.user.name.toLowerCase().includes("fred")) ||
      session.user.email === "readingcircle254@gmail.com";

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

      if (orgs.length > 0) {
        const org = orgs[0];
        const teamSites = await db
          .select()
          .from(sites)
          .where(
            or(
              eq(sites.organizationId, org.id),
              and(eq(sites.ownerId, session.user.id), eq(sites.id, "trc254"))
            )
          );
        return NextResponse.json({ sites: teamSites, team: org });
      }
    }

    const userSites = await db
      .select()
      .from(sites)
      .where(eq(sites.ownerId, session.user.id));

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
      organizationId: resolvedOrgId || "org_fred_personal",
      turnstileEnabled: false,
      moderationRequired: false,
      settings: JSON.stringify({
        accentColor: accentColor || "#f56220",
      }),
      createdAt: new Date(),
    };

    await db.insert(sites).values(newSite);

    return NextResponse.json({ site: newSite }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
