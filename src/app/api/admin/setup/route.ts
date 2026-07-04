import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { seedGuides } from "@/lib/firestore/guides";

export async function POST(req: NextRequest) {
  const { secret } = await req.json();

  if (!secret || secret !== process.env.ADMIN_SEED_SECRET) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    // 1. Create or update admin user
    let uid: string;
    try {
      const existing = await adminAuth.getUserByEmail("alifeinberg01@gmail.com");
      uid = existing.uid;
    } catch {
      const newUser = await adminAuth.createUser({
        email:       "alifeinberg01@gmail.com",
        password:    "TempPass123!",
        displayName: "A. Feinberg",
      });
      uid = newUser.uid;
    }

    await adminAuth.setCustomUserClaims(uid, {
      admin:       true,
      role:        "super_admin",
      permissions: [
        "read", "write", "delete",
        "manage_content", "manage_settings", "manage_billing",
        "manage_users", "manage_super_admins", "manage_support",
      ],
      requiresPasswordChange: true,
    });

    // 2. Seed all guides to Firestore
    const seeded = await seedGuides();

    return NextResponse.json({
      status:  "ok",
      uid,
      email:   "alifeinberg01@gmail.com",
      tempPassword: "TempPass123!",
      guidesSeeded: seeded,
      message: "Admin account ready and guides seeded. Log in and change your password.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
