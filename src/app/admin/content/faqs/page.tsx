import { requirePermission } from "@/lib/admin-session";
import { getFaqs } from "@/lib/firestore/content";
import Link from "next/link";
import SeedButton from "../../_components/SeedButton";
import FaqsEditor from "./_components/FaqsEditor";

export const dynamic = "force-dynamic";

export default async function AdminFaqsPage() {
  await requirePermission("manage_content");
  const faqs = await getFaqs();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="text-sm text-gray-500 hover:text-gray-700">← Dashboard</Link>
          <span className="text-gray-300">/</span>
          <h1 className="text-lg font-semibold text-gray-900">FAQs</h1>
        </div>
        <SeedButton collection="faqs" label="Seed from static data" />
      </header>
      <main className="max-w-3xl mx-auto px-6 py-10">
        <FaqsEditor initialFaqs={faqs} />
      </main>
    </div>
  );
}
