import { requirePermission } from "@/lib/admin-session";
import Link from "next/link";
import GuideForm from "../_components/GuideForm";

export default async function NewGuidePage() {
  await requirePermission("manage_content");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
        <Link href="/admin/guides" className="text-sm text-gray-500 hover:text-gray-700">← Guides</Link>
        <span className="text-gray-300">/</span>
        <h1 className="text-lg font-semibold text-gray-900">New Guide</h1>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-10">
        <GuideForm isNew />
      </main>
    </div>
  );
}
