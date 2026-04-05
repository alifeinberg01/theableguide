/**
 * Generic CRUD handler for FAQs, testimonials, and resources.
 *
 * GET    /api/admin/content/faqs
 * POST   /api/admin/content/faqs          (body: item data, or { action: "seed" })
 * PUT    /api/admin/content/faqs?id=xxx
 * DELETE /api/admin/content/faqs?id=xxx
 */

import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import {
  getFaqs, createFaq, updateFaq, deleteFaq, seedFaqs,
  getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial, seedTestimonials,
  getResources, createResource, updateResource, deleteResource, seedResources,
} from "@/lib/firestore/content";

type Params = { params: Promise<{ collection: string }> };

const ALLOWED = ["faqs", "testimonials", "resources"] as const;
type AllowedCol = (typeof ALLOWED)[number];

function isAllowed(col: string): col is AllowedCol {
  return (ALLOWED as readonly string[]).includes(col);
}

const crud = {
  faqs:          { list: getFaqs, create: createFaq, update: updateFaq, remove: deleteFaq, seed: seedFaqs },
  testimonials:  { list: getTestimonials, create: createTestimonial, update: updateTestimonial, remove: deleteTestimonial, seed: seedTestimonials },
  resources:     { list: getResources, create: createResource, update: updateResource, remove: deleteResource, seed: seedResources },
};

async function guard(writeRequired = false) {
  const session = await getAdminSession();
  if (!session) return null;
  if (writeRequired && !session.permissions.includes("manage_content")) return null;
  return session;
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { collection } = await params;
  if (!isAllowed(collection)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const items = await crud[collection].list();
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest, { params }: Params) {
  const { collection } = await params;
  if (!isAllowed(collection)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (!(await guard(true))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  if (body.action === "seed") {
    const count = await crud[collection].seed();
    return NextResponse.json({ status: "ok", seeded: count });
  }

  const { id: _id, ...data } = body;
  const id = await crud[collection].create(data);
  return NextResponse.json({ status: "ok", id });
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { collection } = await params;
  if (!isAllowed(collection)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (!(await guard(true))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url  = new URL(req.url);
  const id   = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const data = await req.json();
  await crud[collection].update(id, data);
  return NextResponse.json({ status: "ok" });
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const { collection } = await params;
  if (!isAllowed(collection)) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const session = await getAdminSession();
  if (!session || !session.permissions.includes("delete")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const url = new URL(req.url);
  const id  = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await crud[collection].remove(id);
  return NextResponse.json({ status: "ok" });
}
