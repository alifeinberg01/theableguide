import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth, adminDb } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const session = cookieStore.get("__session");

  if (!session?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = await adminAuth.verifySessionCookie(session.value, true);
    if (!decoded.admin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { enabled } = await req.json();
    await adminDb.collection("config").doc("sandbox").set({ enabled: Boolean(enabled) });

    return NextResponse.json({ status: "ok", sandboxMode: Boolean(enabled) });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function GET() {
  try {
    const doc = await adminDb.collection("config").doc("sandbox").get();
    const enabled = doc.exists ? (doc.data()?.enabled ?? false) : false;
    return NextResponse.json({ sandboxMode: enabled });
  } catch {
    return NextResponse.json({ sandboxMode: false });
  }
}
