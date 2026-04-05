import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { updateGuide } from "@/lib/firestore/guides";
import { uploadToStorage, deleteFromStorage, storagePathFromUrl } from "@/lib/firebase-storage";
import { getGuideById } from "@/lib/firestore/guides";

type Params = { params: Promise<{ id: string }> };

/**
 * POST /api/admin/guides/[id]/upload
 * Accepts multipart/form-data with:
 *   - file: the PDF or image file
 *   - type: "pdf" | "image"
 */
export async function POST(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!session.permissions.includes("manage_content")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const formData = await req.formData();
  const file     = formData.get("file") as File | null;
  const type     = (formData.get("type") as string) ?? "pdf";

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const bytes  = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext    = file.name.split(".").pop() ?? (type === "pdf" ? "pdf" : "jpg");
  const dest   = type === "pdf"
    ? `guides/${id}/guide.${ext}`
    : `guides/${id}/cover.${ext}`;

  // Delete old file if replacing
  const existing = await getGuideById(id);
  const oldUrl   = type === "pdf" ? existing?.pdfUrl : existing?.coverImage;
  if (oldUrl?.startsWith("https://storage.googleapis.com")) {
    const oldPath = storagePathFromUrl(oldUrl);
    if (oldPath) await deleteFromStorage(oldPath);
  }

  const publicUrl = await uploadToStorage(buffer, dest, file.type || "application/octet-stream");

  // Save URL back to the guide document
  if (type === "pdf") {
    await updateGuide(id, { pdfUrl: publicUrl });
  } else {
    await updateGuide(id, { coverImage: publicUrl });
  }

  return NextResponse.json({ status: "ok", url: publicUrl });
}
