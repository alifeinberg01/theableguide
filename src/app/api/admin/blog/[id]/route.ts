import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { getPostById, updatePost, deletePost } from "@/lib/firestore/blog";
import type { BlogPost } from "@/types";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const post = await getPostById(id);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!session.permissions.includes("manage_content")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const data: Partial<BlogPost> = await req.json();
  await updatePost(id, data);
  return NextResponse.json({ status: "ok" });
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!session.permissions.includes("delete")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await deletePost(id);
  return NextResponse.json({ status: "ok" });
}
