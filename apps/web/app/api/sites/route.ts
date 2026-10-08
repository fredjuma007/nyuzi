import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db, ensureTables } from "@/lib/db";
import { sites } from "@nyuzi/db";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  await ensureTables();
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // If the logged in user is Fred, ensure trc254 is linked to his account
    const isFred =
      Boolean(session.user.email && session.user.email.toLowerCase().includes("fred")) ||
      Boolean(session.user.name && session.user.name.toLowerCase().includes("fred")) ||
      session.user.email === "readingcircle254@gmail.com";

    if (isFred) {
      await db
        .update(sites)
        .set({ ownerId: session.user.id, ownerEmail: session.user.email })
        .where(eq(sites.id, "trc254"));
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
    const { name, domain, accentColor } = body;

    if (!name || !domain) {
      return NextResponse.json(
        { error: "Publication name and domain are required" },
        { status: 400 }
      );
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
