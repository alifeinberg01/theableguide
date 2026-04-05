// ─── Role & Permission Definitions ───────────────────────────────────────────
// Single source of truth for every role in the admin system.
// Update this file to add roles, rename permissions, or adjust access.

export type Role =
  | "super_admin"
  | "admin"
  | "manager"
  | "editor"
  | "customer_support";

export type Permission =
  | "read"                 // view any content / data
  | "write"                // create & edit content
  | "delete"               // delete content
  | "manage_content"       // full content lifecycle (guides, blog, FAQs, resources)
  | "manage_settings"      // site-wide settings (sandbox mode, config)
  | "manage_billing"       // Stripe keys, pricing, payment config
  | "manage_users"         // add / edit / remove admin-level accounts
  | "manage_super_admins"  // promote or demote super admins (super_admin only)
  | "manage_support";      // access support queue & customer tickets

// ─── Role Definitions ────────────────────────────────────────────────────────

export interface RoleDefinition {
  label: string;
  description: string;
  permissions: Permission[];
  /** Which roles this role is allowed to assign to new/existing users. */
  canAssignRoles: Role[];
}

export const ROLES: Record<Role, RoleDefinition> = {
  super_admin: {
    label: "Super Admin",
    description:
      "Full control over every part of the site — content, users, settings, billing, and support. " +
      "The only role that can add or remove other Super Admins.",
    permissions: [
      "read",
      "write",
      "delete",
      "manage_content",
      "manage_settings",
      "manage_billing",
      "manage_users",
      "manage_super_admins",
      "manage_support",
    ],
    canAssignRoles: [
      "super_admin",
      "admin",
      "manager",
      "editor",
      "customer_support",
    ],
  },

  admin: {
    label: "Admin",
    description:
      "Manages users (Admin and below), all site content, and site settings. " +
      "Cannot add Super Admins or change billing credentials.",
    permissions: [
      "read",
      "write",
      "delete",
      "manage_content",
      "manage_settings",
      "manage_users",
      "manage_support",
    ],
    canAssignRoles: ["admin", "manager", "editor", "customer_support"],
  },

  manager: {
    label: "Manager",
    description:
      "Full content lifecycle access — create, edit, and delete guides, blog posts, FAQs, and resources. " +
      "No access to user management, settings, or billing.",
    permissions: ["read", "write", "delete", "manage_content"],
    canAssignRoles: [],
  },

  editor: {
    label: "Editor",
    description:
      "Can create and edit content but cannot delete anything. " +
      "No access to user management, settings, or billing.",
    permissions: ["read", "write"],
    canAssignRoles: [],
  },

  customer_support: {
    label: "Customer Support",
    description:
      "Read-only access to site content and full access to the support queue. " +
      "Cannot create, edit, or delete content, and has no user or settings access.",
    permissions: ["read", "manage_support"],
    canAssignRoles: [],
  },
};

// ─── Ordered hierarchy (highest → lowest) ────────────────────────────────────
export const ROLE_ORDER: Role[] = [
  "super_admin",
  "admin",
  "manager",
  "editor",
  "customer_support",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Returns true if `role` includes `permission`. */
export function roleHasPermission(role: Role, permission: Permission): boolean {
  return ROLES[role]?.permissions.includes(permission) ?? false;
}

/** Returns the roles that `assignerRole` is allowed to assign. */
export function assignableRoles(assignerRole: Role): Role[] {
  return ROLES[assignerRole]?.canAssignRoles ?? [];
}

/** Returns a human-readable comma list of permissions for a role. */
export function permissionSummary(role: Role): string {
  return (ROLES[role]?.permissions ?? [])
    .map((p) => PERMISSION_LABELS[p])
    .join(", ");
}

export const PERMISSION_LABELS: Record<Permission, string> = {
  read:                "Read",
  write:               "Write",
  delete:              "Delete",
  manage_content:      "Manage Content",
  manage_settings:     "Manage Settings",
  manage_billing:      "Manage Billing",
  manage_users:        "Manage Users",
  manage_super_admins: "Manage Super Admins",
  manage_support:      "Customer Support Queue",
};
