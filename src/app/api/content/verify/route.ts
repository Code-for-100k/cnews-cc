import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { contentVerifications } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { contentId, contentType, status, notes, confidenceScore } = body;

    if (!contentId || !contentType || !status) {
      return NextResponse.json(
        { error: "Missing required fields: contentId, contentType, status" },
        { status: 400 }
      );
    }

    const validTypes = ["blog", "glossary", "learn", "analysis"] as const;
    const validStatuses = [
      "ai-generated",
      "human-verified",
      "editors-pick",
    ] as const;

    if (!validTypes.includes(contentType)) {
      return NextResponse.json(
        { error: `Invalid contentType. Must be one of: ${validTypes.join(", ")}` },
        { status: 400 }
      );
    }

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    // Check for existing verification by this user on this content
    const [existing] = await db
      .select()
      .from(contentVerifications)
      .where(
        and(
          eq(contentVerifications.contentId, contentId),
          eq(contentVerifications.verifiedBy, session.user.id)
        )
      )
      .limit(1);

    if (existing) {
      // Update existing verification
      const [updated] = await db
        .update(contentVerifications)
        .set({
          status,
          notes: notes ?? null,
          confidenceScore: confidenceScore ?? null,
          verifiedAt: new Date(),
        })
        .where(eq(contentVerifications.id, existing.id))
        .returning();

      return NextResponse.json({ verification: updated });
    }

    // Create new verification
    const [verification] = await db
      .insert(contentVerifications)
      .values({
        contentId,
        contentType,
        status,
        verifiedBy: session.user.id,
        verifiedAt: new Date(),
        confidenceScore: confidenceScore ?? null,
        notes: notes ?? null,
      })
      .returning();

    return NextResponse.json({ verification }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
