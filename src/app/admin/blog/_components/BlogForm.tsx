"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BlogPost } from "@/types";

const CATEGORIES = ["tips","destinations","gear","real-stories","planning","advocacy"] as const;

interface Props { post?: BlogPost; isNew?: boolean; }

export default function BlogForm({ post, isNew }: Props) {
  const router = useRouter();

  const [title,        setTitle]        = useState(post?.title ?? "");
  const [slug,         setSlug]         = useState(post?.slug ?? "");
  const [excerpt,      setExcerpt]      = useState(post?.excerpt ?? "");
  const [content,      setContent]      = useState(post?.content ?? "");
  const [category,     setCategory]     = useState<BlogPost["category"]>(post?.category ?? "tips");
  const [tags,         setTags]         = useState(post?.tags?.join(", ") ?? "");
  const [author,       setAuthor]       = useState(post?.author ?? "The Able Guide Team");
  const [publishedAt,  setPublishedAt]  = useState(post?.publishedAt ?? new Date().toISOString().slice(0, 10));
  const [readTime,     setReadTime]     = useState(post?.readTime?.toString() ?? "5");
  const [featured,     setFeatured]     = useState(post?.featured ?? false);
  const [status,       setStatus]       = useState<"published"|"draft">(post?.status ?? "published");
  const [coverImage,   setCoverImage]   = useState(post?.coverImage ?? "");
  const [coverImageAlt,setCoverImageAlt]= useState(post?.coverImageAlt ?? "");
  const [imgBusy,      setImgBusy]      = useState(false);
  const [busy,         setBusy]         = useState(false);
  const [error,        setError]        = useState("");

  function autoSlug(t: string) {
    return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  async function uploadImage(file: File) {
    if (!post?.id) { alert("Save the post first before uploading images."); return; }
    const fd = new FormData();
    fd.append("file", file);
    setImgBusy(true);
    try {
      const res  = await fetch(`/api/admin/blog/${post.id}/upload`, { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) { alert(data.error ?? "Upload failed"); return; }
      setCoverImage(data.url);
    } finally {
      setImgBusy(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);

    const payload: Omit<BlogPost, "id"> = {
      slug:        slug || autoSlug(title),
      title, excerpt, content, category,
      tags:        tags.split(",").map((t) => t.trim()).filter(Boolean),
      author, publishedAt,
      readTime:    parseInt(readTime, 10),
      featured, status, coverImage, coverImageAlt,
    };

    try {
      let res: Response;
      if (isNew) {
        res = await fetch("/api/admin/blog", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(payload),
        });
      } else {
        res = await fetch(`/api/admin/blog/${post!.id}`, {
          method:  "PUT",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(payload),
        });
      }
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Save failed"); return; }
      router.push("/admin/blog");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  const field = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900";
  const lbl   = "block text-sm font-medium text-gray-700 mb-1";
  const sec   = "bg-white rounded-xl border border-gray-200 p-6 space-y-4";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <div className={sec}>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Post Info</h2>
        <div>
          <label className={lbl}>Title *</label>
          <input required value={title} onChange={(e) => { setTitle(e.target.value); if (isNew) setSlug(autoSlug(e.target.value)); }} className={field} />
        </div>
        <div>
          <label className={lbl}>Slug *</label>
          <input required value={slug} onChange={(e) => setSlug(e.target.value)} className={`${field} font-mono text-xs`} />
        </div>
        <div>
          <label className={lbl}>Excerpt</label>
          <textarea rows={2} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className={field} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={lbl}>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value as BlogPost["category"])} className={field}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={lbl}>Read Time (min)</label>
            <input type="number" min={1} value={readTime} onChange={(e) => setReadTime(e.target.value)} className={field} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={lbl}>Author</label>
            <input value={author} onChange={(e) => setAuthor(e.target.value)} className={field} />
          </div>
          <div>
            <label className={lbl}>Published Date</label>
            <input type="date" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} className={field} />
          </div>
        </div>
        <div>
          <label className={lbl}>Tags (comma-separated)</label>
          <input value={tags} onChange={(e) => setTags(e.target.value)} className={field} placeholder="airports, autism, first-flight" />
        </div>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="accent-gray-900" />
            Featured (hero post)
          </label>
          <select value={status} onChange={(e) => setStatus(e.target.value as "published"|"draft")} className={`${field} w-auto`}>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Cover image */}
      <div className={sec}>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Cover Image</h2>
        <div>
          <label className={lbl}>Image URL</label>
          <input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} className={field} placeholder="/images/blog/... or https://storage.googleapis.com/..." />
        </div>
        <div>
          <label className={lbl}>Alt Text</label>
          <input value={coverImageAlt} onChange={(e) => setCoverImageAlt(e.target.value)} className={field} />
        </div>
        {!isNew && (
          <div>
            <label className={lbl}>Upload Image</label>
            <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(f); }} className="text-sm" />
            {imgBusy && <p className="text-xs text-gray-400 mt-1">Uploading…</p>}
          </div>
        )}
      </div>

      {/* Content */}
      <div className={sec}>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Content</h2>
        <p className="text-xs text-gray-400">
          Use <code className="bg-gray-100 px-1 rounded">## Heading</code>, <code className="bg-gray-100 px-1 rounded">### Subheading</code>, and <code className="bg-gray-100 px-1 rounded">- bullet</code> for formatting.
          Blank lines create paragraph breaks.
        </p>
        <textarea
          rows={24}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`${field} font-mono text-xs leading-relaxed`}
          placeholder="## Introduction&#10;&#10;Start writing your post here..."
        />
      </div>

      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>}

      <div className="flex items-center justify-end gap-3 pb-10">
        <a href="/admin/blog" className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2">Cancel</a>
        <button type="submit" disabled={busy} className="bg-gray-900 text-white text-sm font-medium px-6 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50">
          {busy ? "Saving…" : isNew ? "Publish Post" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
