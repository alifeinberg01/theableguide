import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth } from "./firebase-admin";
import { type Role, type Permission, roleHasPermission } from "./roles";

export interface AdminClaims {
  uid: string;
  email?: string;
  admin: boolean;
  role: Role;
  permissions: Permission[];
  requiresPasswordChange?: boolean;
}

export async function requireAdmin(): Promise<AdminClaims> {
  const cookieStore = await cookies();
  const session = cookieStore.get("__session");

  if (!session?.value) {
    redirect("/admin/login");
  }

  try {
    const decoded = await adminAuth.verifySessionCookie(session.value, true);

    if (!decoded.admin) {
      redirect("/admin/login");
    }

    return decoded as unknown as AdminClaims;
  } catch {
    redirect("/admin/login");
  }
}

/** Require a specific permission — redirects to dashboard with an error if denied. */
export async function requirePermission(permission: Permission): Promise<AdminClaims> {
  const admin = await requireAdmin();
  if (!roleHasPermission(admin.role, permission)) {
    redirect("/admin/dashboard?error=forbidden");
  }
  return admin;
}

/** Non-redirecting check — use in API routes. */
export async function getAdminSession(): Promise<AdminClaims | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("__session");
  if (!session?.value) return null;

  try {
    const decoded = await adminAuth.verifySessionCookie(session.value, true);
    if (!decoded.admin) return null;
    return decoded as unknown as AdminClaims;
  } catch {
    return null;
  }
}

/** Returns true if the session has a given permission. */
export function hasPermission(admin: AdminClaims, permission: Permission): boolean {
  return roleHasPermission(admin.role, permission);
}
