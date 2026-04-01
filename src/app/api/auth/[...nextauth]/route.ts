import { handlers } from "@/lib/auth";
import type { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ nextauth: string[] }> }
) {
  // Consume params to satisfy Next.js 16 route handler signature
  await context.params;
  return handlers.GET(request);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ nextauth: string[] }> }
) {
  await context.params;
  return handlers.POST(request);
}
