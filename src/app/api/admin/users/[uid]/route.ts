import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { getAdminSession } from "@/lib/admin-session";
import { ROLES, type Role } from "@/lib/roles";

type Params = { params: Promise<{ uid: string }> };

// ─── PUT /api/admin/users/[uid] ───────────────────────────────────────────────
// Update a user's role. Respects the same promotion rules as creation.
export async function PUT(req: NextRequest, { params }: Params) {
  const { uid } = await params;
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!session.permissions.includes("manage_users")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { role } = await req.json();

  if (!role || !(role in ROLES)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  // Prevent self-demotion
  if (uid === session.uid) {
    return NextResponse.json({ error: "You cannot change your own role" }, { status: 400 });
  }

  if (role === "super_admin" && !session.permissions.includes("manage_super_admins")) {
    return NextResponse.json(
      { error: "Only Super Admins can assign the Super Admin role" },
      { status: 403 }
    );
  }

  const allowedRoles = ROLES[session.role]?.canAssignRoles ?? [];
  if (!allowedRoles.includes(role as Role)) {
    return NextResponse.json(
      { error: `Your role cannot assign the ${role} role` },
      { status: 403 }
    );
  }

  try {
    const permissions = ROLES[role as Role].permissions;

    await adminAuth.setCustomUserClaims(uid, {
      admin: true,
      role:  role as Role,
      permissions,
    });

    return NextResponse.json({ status: "ok", uid, role, permissions });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ─── DELETE /api/admin/users/[uid] ───────────────────────────────────────────
// Delete an admin user entirely. Cannot delete yourself.
export async function DELETE(_req: NextRequest, { params }: Params) {
  const { uid } = await params;
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!session.permissions.includes("manage_users")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (uid === session.uid) {
    return NextResponse.json({ error: "You cannot delete your own account" }, { status: 400 });
  }

  // Non-super-admins cannot delete super admins
  const target = await adminAuth.getUser(uid);
  if (target.customClaims?.role === "super_admin" && !session.permissions.includes("manage_super_admins")) {
    return NextResponse.json({ error: "Only Super Admins can remove Super Admin accounts" }, { status: 403 });
  }

  try {
    await adminAuth.deleteUser(uid);
    return NextResponse.json({ status: "ok", uid });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
