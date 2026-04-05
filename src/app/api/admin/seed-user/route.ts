import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

/**
 * One-time endpoint to provision the afeinberg admin account.
 * Protected by ADMIN_SEED_SECRET env var.
 * Disable or delete this route after first use.
 */
export async function POST(req: NextRequest) {
  const { secret } = await req.json();

  if (!secret || secret !== process.env.ADMIN_SEED_SECRET) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    // Check if user already exists
    let uid: string;
    try {
      const existing = await adminAuth.getUserByEmail("alifeinberg01@gmail.com");
      uid = existing.uid;
    } catch {
      // User doesn't exist — create them
      const newUser = await adminAuth.createUser({
        email:       "alifeinberg01@gmail.com",
        password:    "12345678",
        displayName: "A. Feinberg",
      });
      uid = newUser.uid;
    }

    // Set super_admin claims + force password change on first login
    await adminAuth.setCustomUserClaims(uid, {
      admin:                  true,
      role:                   "super_admin",
      permissions:            [
        "read", "write", "delete",
        "manage_content", "manage_settings", "manage_billing",
        "manage_users", "manage_super_admins", "manage_support",
      ],
      requiresPasswordChange: true,
    });

    return NextResponse.json({
      status:  "ok",
      uid,
      email:   "alifeinberg01@gmail.com",
      message: "Admin user provisioned. Delete or disable this endpoint.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
