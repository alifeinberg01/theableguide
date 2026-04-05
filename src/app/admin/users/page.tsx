import { requirePermission } from "@/lib/admin-session";
import { adminAuth } from "@/lib/firebase-admin";
import { ROLES, ROLE_ORDER, type Role } from "@/lib/roles";
import Link from "next/link";
import DeleteUserButton from "./DeleteUserButton";

export const dynamic = "force-dynamic";

const ROLE_BADGE: Record<Role, string> = {
  super_admin:      "bg-purple-100 text-purple-800",
  admin:            "bg-blue-100 text-blue-800",
  manager:          "bg-emerald-100 text-emerald-800",
  editor:           "bg-yellow-100 text-yellow-800",
  customer_support: "bg-gray-100 text-gray-700",
};

async function listAdminUsers() {
  const result = await adminAuth.listUsers(1000);
  return result.users
    .filter((u) => u.customClaims?.admin === true)
    .map((u) => ({
      uid:         u.uid,
      email:       u.email ?? "",
      displayName: u.displayName ?? "",
      role:        (u.customClaims?.role as Role) ?? "editor",
      disabled:    u.disabled,
      createdAt:   u.metadata.creationTime,
    }))
    .sort(
      (a, b) =>
        ROLE_ORDER.indexOf(a.role) - ROLE_ORDER.indexOf(b.role)
    );
}

export default async function UsersPage() {
  const session = await requirePermission("manage_users");
  const users   = await listAdminUsers();

  const canAddSuperAdmin = session.permissions.includes("manage_super_admins");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/dashboard"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Dashboard
          </Link>
          <span className="text-gray-300">/</span>
          <h1 className="text-lg font-semibold text-gray-900">Users</h1>
        </div>
        <Link
          href="/admin/users/new"
          className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          + Add User
        </Link>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-6">
        {/* Role legend */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Role Hierarchy
          </h2>
          <div className="space-y-3">
            {ROLE_ORDER.map((role) => (
              <div key={role} className="flex items-start gap-3">
                <span
                  className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mt-0.5 ${ROLE_BADGE[role]}`}
                >
                  {ROLES[role].label}
                </span>
                <p className="text-sm text-gray-600">{ROLES[role].description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Users table */}
        <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              All Admin Accounts ({users.length})
            </h2>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Created
                </th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((u) => {
                const isSelf = u.uid === session.uid;
                const targetIsSuperAdmin = u.role === "super_admin";
                const canDelete =
                  !isSelf &&
                  (canAddSuperAdmin || !targetIsSuperAdmin);

                return (
                  <tr key={u.uid} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">
                        {u.displayName || u.email}
                      </p>
                      {u.displayName && (
                        <p className="text-xs text-gray-400">{u.email}</p>
                      )}
                      {isSelf && (
                        <span className="text-xs text-indigo-500 font-medium">You</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${ROLE_BADGE[u.role]}`}
                      >
                        {ROLES[u.role]?.label ?? u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(u.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day:   "numeric",
                        year:  "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {canDelete && (
                        <DeleteUserButton uid={u.uid} email={u.email} />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
