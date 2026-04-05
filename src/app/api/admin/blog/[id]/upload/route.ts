import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { updatePost } from "@/lib/firestore/blog";
import { uploadToStorage } from "@/lib/firebase-storage";

type Params = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!session.permissions.includes("manage_content")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const formData = await req.formData();
  const file     = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const bytes  = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext    = file.name.split(".").pop() ?? "jpg";
  const dest   = `blog/${id}/cover.${ext}`;

  const publicUrl = await uploadToStorage(buffer, dest, file.type || "image/jpeg");
  await updatePost(id, { coverImage: publicUrl });

  return NextResponse.json({ status: "ok", url: publicUrl });
}
