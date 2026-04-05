import { requirePermission } from "@/lib/admin-session";
import { ROLES, ROLE_ORDER, assignableRoles, PERMISSION_LABELS, type Role } from "@/lib/roles";
import AddUserForm from "./AddUserForm";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function NewUserPage() {
  const session = await requirePermission("manage_users");

  // Roles this session is allowed to assign
  const allowed = assignableRoles(session.role);
  const roleOptions = ROLE_ORDER.filter((r) => allowed.includes(r)).map((r) => ({
    value:       r,
    label:       ROLES[r].label,
    description: ROLES[r].description,
    permissions: ROLES[r].permissions.map((p) => PERMISSION_LABELS[p]),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
        <Link
          href="/admin/users"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Users
        </Link>
        <span className="text-gray-300">/</span>
        <h1 className="text-lg font-semibold text-gray-900">Add User</h1>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10">
        <AddUserForm roleOptions={roleOptions} />
      </main>
    </div>
  );
}
