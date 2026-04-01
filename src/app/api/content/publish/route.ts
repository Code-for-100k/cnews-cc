import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { publishedContent } from "@/lib/db/schema";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      content,
      type,
      category,
      tags,
      seoTitle,
      seoDescription,
      aiModel,
      excerpt,
      authorId,
    } = body;

    if (!title || !content || !type) {
      return NextResponse.json(
        { error: "Missing required fields: title, content, type" },
        { status: 400 }
      );
    }

    const validTypes = ["blog", "glossary", "learn", "analysis"] as const;
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: `Invalid type. Must be one of: ${validTypes.join(", ")}` },
        { status: 400 }
      );
    }

    // Generate unique slug
    let slug = slugify(title);
    const timestamp = Date.now().toString(36);
    slug = `${slug}-${timestamp}`;

    const now = new Date();

    const [published] = await db
      .insert(publishedContent)
      .values({
        title,
        slug,
        type,
        content,
        excerpt: excerpt ?? content.slice(0, 160),
        category: category ?? null,
        tags: tags ?? [],
        status: "published",
        verificationStatus: "ai-generated",
        aiModel: aiModel ?? null,
        aiGeneratedAt: now,
        publishedAt: now,
        views: 0,
        seoTitle: seoTitle ?? title,
        seoDescription: seoDescription ?? content.slice(0, 160),
        authorId: authorId ?? null,
      })
      .returning();

    return NextResponse.json(
      {
        content: published,
        url: `/${type}/${slug}`,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
