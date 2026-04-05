import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { getGuideById, updateGuide, deleteGuide } from "@/lib/firestore/guides";
import { deleteFromStorage, storagePathFromUrl } from "@/lib/firebase-storage";
import type { Guide } from "@/types";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const guide = await getGuideById(id);
  if (!guide) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ guide });
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!session.permissions.includes("manage_content")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const data: Partial<Guide> = await req.json();
  await updateGuide(id, data);
  return NextResponse.json({ status: "ok" });
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!session.permissions.includes("delete")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Clean up PDF from Storage if present
  const guide = await getGuideById(id);
  if (guide?.pdfUrl) {
    const path = storagePathFromUrl(guide.pdfUrl);
    if (path) await deleteFromStorage(path);
  }

  await deleteGuide(id);
  return NextResponse.json({ status: "ok" });
}
