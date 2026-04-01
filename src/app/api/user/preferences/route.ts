import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { userPreferences } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [prefs] = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, session.user.id))
      .limit(1);

    if (!prefs) {
      // Return defaults for users without saved preferences
      return NextResponse.json({
        preferences: {
          userId: session.user.id,
          layoutMode: "dashboard",
          favoriteTokens: [],
          favoriteValidators: [],
          theme: "dark",
          notifications: true,
        },
      });
    }

    return NextResponse.json({ preferences: prefs });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      layoutMode,
      favoriteTokens,
      favoriteValidators,
      theme,
      notifications,
    } = body;

    // Validate layoutMode
    const validLayouts = ["dashboard", "feed", "compact"] as const;
    if (layoutMode && !validLayouts.includes(layoutMode)) {
      return NextResponse.json(
        { error: `Invalid layoutMode. Must be one of: ${validLayouts.join(", ")}` },
        { status: 400 }
      );
    }

    // Check if preferences exist
    const [existing] = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, session.user.id))
      .limit(1);

    const values = {
      layoutMode: layoutMode ?? existing?.layoutMode ?? "dashboard",
      favoriteTokens: favoriteTokens ?? existing?.favoriteTokens ?? [],
      favoriteValidators:
        favoriteValidators ?? existing?.favoriteValidators ?? [],
      theme: theme ?? existing?.theme ?? "dark",
      notifications: notifications ?? existing?.notifications ?? true,
    };

    if (existing) {
      const [updated] = await db
        .update(userPreferences)
        .set(values)
        .where(eq(userPreferences.userId, session.user.id))
        .returning();

      return NextResponse.json({ preferences: updated });
    }

    const [created] = await db
      .insert(userPreferences)
      .values({ userId: session.user.id, ...values })
      .returning();

    return NextResponse.json({ preferences: created }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
