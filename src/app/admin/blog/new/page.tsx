import { requirePermission } from "@/lib/admin-session";
import Link from "next/link";
import BlogForm from "../_components/BlogForm";

export default async function NewBlogPostPage() {
  await requirePermission("manage_content");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
        <Link href="/admin/blog" className="text-sm text-gray-500 hover:text-gray-700">← Blog</Link>
        <span className="text-gray-300">/</span>
        <h1 className="text-lg font-semibold text-gray-900">New Post</h1>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-10">
        <BlogForm isNew />
      </main>
    </div>
  );
}
