import { requirePermission } from "@/lib/admin-session";
import { getGuideById } from "@/lib/firestore/guides";
import Link from "next/link";
import GuideForm from "../../_components/GuideForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export default async function EditGuidePage({ params }: Params) {
  await requirePermission("manage_content");
  const { id } = await params;
  const guide = await getGuideById(id);
  if (!guide) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
        <Link href="/admin/guides" className="text-sm text-gray-500 hover:text-gray-700">← Guides</Link>
        <span className="text-gray-300">/</span>
        <h1 className="text-lg font-semibold text-gray-900 line-clamp-1">{guide.title}</h1>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-10">
        <GuideForm guide={guide} />
      </main>
    </div>
  );
}
