import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { getAllGuides, createGuide, seedGuides } from "@/lib/firestore/guides";
import type { Guide } from "@/types";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!session.permissions.includes("manage_content") && !session.permissions.includes("read")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const guides = await getAllGuides();
  return NextResponse.json({ guides });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!session.permissions.includes("manage_content")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();

  // Handle seed action
  if (body.action === "seed") {
    const count = await seedGuides();
    return NextResponse.json({ status: "ok", seeded: count });
  }

  const { id: _id, ...data } = body as Guide;
  const id = await createGuide(data);
  return NextResponse.json({ status: "ok", id });
}
