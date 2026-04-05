import { requireAdmin } from "@/lib/admin-session";
import { adminDb } from "@/lib/firebase-admin";
import { ROLES, PERMISSION_LABELS } from "@/lib/roles";
import SandboxToggle from "./SandboxToggle";
import LogoutButton from "./LogoutButton";
import Link from "next/link";

export const dynamic = "force-dynamic";

const ROLE_BADGE_CLASS: Record<string, string> = {
  super_admin:      "bg-purple-100 text-purple-800",
  admin:            "bg-blue-100 text-blue-800",
  manager:          "bg-emerald-100 text-emerald-800",
  editor:           "bg-yellow-100 text-yellow-800",
  customer_support: "bg-gray-100 text-gray-700",
};

async function getSandboxMode(): Promise<boolean> {
  try {
    const doc = await adminDb.collection("config").doc("sandbox").get();
    return doc.exists ? (doc.data()?.enabled ?? false) : false;
  } catch {
    return false;
  }
}

const NAV_CARDS = [
  { href: "/admin/guides",                  label: "Guides",        desc: "Create, edit, and upload PDFs",        perm: "manage_content" },
  { href: "/admin/blog",                    label: "Blog Posts",    desc: "Write and publish blog content",       perm: "manage_content" },
  { href: "/admin/orders",                  label: "Orders",        desc: "View purchase history and revenue",    perm: "manage_users"   },
  { href: "/admin/users",                   label: "Users",         desc: "Manage admin accounts and roles",      perm: "manage_users"   },
  { href: "/admin/content/faqs",            label: "FAQs",          desc: "Add and remove FAQ entries",           perm: "manage_content" },
  { href: "/admin/content/testimonials",    label: "Testimonials",  desc: "Manage customer reviews",              perm: "manage_content" },
  { href: "/admin/content/resources",       label: "Resources",     desc: "Curate the resources directory",       perm: "manage_content" },
];

export default async function AdminDashboardPage() {
  const admin       = await requireAdmin();
  const sandboxMode = await getSandboxMode();

  const roleDef    = ROLES[admin.role];
  const badgeClass = ROLE_BADGE_CLASS[admin.role] ?? "bg-gray-100 text-gray-700";

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">The Able Guide — Admin</h1>
          <p className="text-xs text-gray-500">{admin.email}</p>
        </div>
        <LogoutButton />
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">

        {/* Account info */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Account</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium text-gray-900">{admin.email}</p>
            </div>
            <div>
              <p className="text-gray-500">Role</p>
              <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${badgeClass}`}>
                {roleDef?.label ?? admin.role}
              </span>
            </div>
            <div className="col-span-2">
              <p className="text-gray-500 mb-1">Permissions</p>
              <div className="flex flex-wrap gap-1.5">
                {admin.permissions.map((p) => (
                  <span key={p} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                    {PERMISSION_LABELS[p] ?? p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Nav grid */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Manage</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {NAV_CARDS
              .filter((c) => admin.permissions.includes(c.perm as never))
              .map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-400 transition-colors group"
                >
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-black">{c.label} →</p>
                  <p className="text-xs text-gray-500 mt-1">{c.desc}</p>
                </Link>
              ))}
          </div>
        </section>

        {/* Sandbox mode */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Sandbox Mode</h2>
          <p className="text-sm text-gray-500 mb-4">
            When enabled, all guides are unlocked and Stripe payments are bypassed sitewide.
            Use for testing or internal review only.
          </p>
          <SandboxToggle initialValue={sandboxMode} />
        </section>

      </main>
    </div>
  );
}
