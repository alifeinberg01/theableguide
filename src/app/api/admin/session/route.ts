import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase-admin";

const SESSION_DURATION_MS = 60 * 60 * 24 * 5 * 1000; // 5 days

export async function POST(req: NextRequest) {
  const { idToken } = await req.json();

  if (!idToken) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  try {
    // Verify the ID token has admin claim before issuing a session cookie
    const decoded = await adminAuth.verifyIdToken(idToken);
    if (!decoded.admin) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: SESSION_DURATION_MS,
    });

    const cookieStore = await cookies();
    cookieStore.set("__session", sessionCookie, {
      maxAge:   SESSION_DURATION_MS / 1000,
      httpOnly: true,
      secure:   process.env.NODE_ENV === "production",
      path:     "/",
      sameSite: "lax",
    });

    return NextResponse.json({ status: "ok" });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("__session");
  return NextResponse.json({ status: "ok" });
}
