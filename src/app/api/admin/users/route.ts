import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { getAdminSession } from "@/lib/admin-session";
import { ROLES, type Role } from "@/lib/roles";

// ─── GET /api/admin/users ─────────────────────────────────────────────────────
// List all admin users. Requires manage_users permission.
export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!session.permissions.includes("manage_users")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    // List all users — Firebase returns up to 1000 per page
    const result = await adminAuth.listUsers(1000);
    const adminUsers = result.users
      .filter((u) => u.customClaims?.admin === true)
      .map((u) => ({
        uid:         u.uid,
        email:       u.email ?? "",
        displayName: u.displayName ?? "",
        role:        (u.customClaims?.role as Role) ?? "editor",
        permissions: u.customClaims?.permissions ?? [],
        disabled:    u.disabled,
        createdAt:   u.metadata.creationTime,
      }));

    return NextResponse.json({ users: adminUsers });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ─── POST /api/admin/users ────────────────────────────────────────────────────
// Create a new admin user. Requires manage_users; creating super_admin also
// requires manage_super_admins.
export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!session.permissions.includes("manage_users")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { email, displayName, role, password } = await req.json();

  if (!email || !role || !password) {
    return NextResponse.json({ error: "email, role, and password are required" }, { status: 400 });
  }

  if (!(role in ROLES)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  // Only super_admins can create other super_admins
  if (role === "super_admin" && !session.permissions.includes("manage_super_admins")) {
    return NextResponse.json(
      { error: "Only Super Admins can create Super Admin accounts" },
      { status: 403 }
    );
  }

  // Assigner can only assign roles within their allowed list
  const allowedRoles = ROLES[session.role]?.canAssignRoles ?? [];
  if (!allowedRoles.includes(role as Role)) {
    return NextResponse.json(
      { error: `Your role (${session.role}) cannot assign the ${role} role` },
      { status: 403 }
    );
  }

  try {
    const newUser = await adminAuth.createUser({
      email,
      password,
      displayName: displayName ?? "",
    });

    const permissions = ROLES[role as Role].permissions;

    await adminAuth.setCustomUserClaims(newUser.uid, {
      admin:                  true,
      role:                   role as Role,
      permissions,
      requiresPasswordChange: true,
    });

    return NextResponse.json({
      status:      "ok",
      uid:         newUser.uid,
      email:       newUser.email,
      role,
      permissions,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
