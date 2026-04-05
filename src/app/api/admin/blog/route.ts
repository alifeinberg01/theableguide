import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { getAllPosts, createPost, seedBlogPosts } from "@/lib/firestore/blog";
import type { BlogPost } from "@/types";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const posts = await getAllPosts();
  return NextResponse.json({ posts });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!session.permissions.includes("manage_content")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();

  if (body.action === "seed") {
    const count = await seedBlogPosts();
    return NextResponse.json({ status: "ok", seeded: count });
  }

  const { id: _id, ...data } = body as BlogPost;
  const id = await createPost(data);
  return NextResponse.json({ status: "ok", id });
}
