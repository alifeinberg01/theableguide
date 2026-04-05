import { requirePermission } from "@/lib/admin-session";
import { getAllPosts } from "@/lib/firestore/blog";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import SeedButton from "../_components/SeedButton";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  await requirePermission("manage_content");
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="text-sm text-gray-500 hover:text-gray-700">← Dashboard</Link>
          <span className="text-gray-300">/</span>
          <h1 className="text-lg font-semibold text-gray-900">Blog Posts</h1>
        </div>
        <div className="flex items-center gap-3">
          <SeedButton collection="blog" label="Seed from static data" />
          <Link
            href="/admin/blog/new"
            className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            + New Post
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Title</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Published</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900 line-clamp-1">{post.title}</p>
                    <p className="text-xs text-gray-400">{post.slug}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600 capitalize">{post.category}</td>
                  <td className="px-6 py-4 text-gray-500">{formatDate(post.publishedAt)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${
                      (post.status ?? "published") === "published"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {post.status ?? "published"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/blog/${post.id}/edit`} className="text-xs font-medium text-gray-600 hover:text-gray-900">
                      Edit →
                    </Link>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400 text-sm">
                    No posts yet. Click "Seed from static data" to import existing posts.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
