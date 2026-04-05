"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Guide, GuideSection } from "@/types";

const CATEGORIES = ["theme-park","airport","cruise","resort","national-park","city"] as const;
const ALL_TAGS   = ["autism","sensory","wheelchair","DAS","beginner","advanced","free","popular"] as const;

interface Props {
  guide?: Guide;
  isNew?: boolean;
}

function emptySection(): GuideSection {
  return { title: "", content: "", tips: [] };
}

export default function GuideForm({ guide, isNew }: Props) {
  const router = useRouter();

  // ── Form state ────────────────────────────────────────────────────────────
  const [title,          setTitle]          = useState(guide?.title ?? "");
  const [subtitle,       setSubtitle]       = useState(guide?.subtitle ?? "");
  const [slug,           setSlug]           = useState(guide?.slug ?? "");
  const [description,    setDescription]    = useState(guide?.description ?? "");
  const [destination,    setDestination]    = useState(guide?.destination ?? "");
  const [category,       setCategory]       = useState<Guide["category"]>(guide?.category ?? "theme-park");
  const [tags,           setTags]           = useState<string[]>(guide?.tags ?? []);
  const [price,          setPrice]          = useState<string>(guide?.price?.toString() ?? "0");
  const [stripeProductId,setStripeProductId]= useState(guide?.stripeProductId ?? "");
  const [stripePriceId,  setStripePriceId]  = useState(guide?.stripePriceId ?? "");
  const [readTime,       setReadTime]       = useState(guide?.readTime?.toString() ?? "30");
  const [publishedAt,    setPublishedAt]    = useState(guide?.publishedAt ?? new Date().toISOString().slice(0, 10));
  const [featured,       setFeatured]       = useState(guide?.featured ?? false);
  const [status,         setStatus]         = useState<"published"|"draft">(guide?.status ?? "published");
  const [coverImage,     setCoverImage]     = useState(guide?.coverImage ?? "");
  const [coverImageAlt,  setCoverImageAlt]  = useState(guide?.coverImageAlt ?? "");
  const [pdfUrl,         setPdfUrl]         = useState(guide?.pdfUrl ?? "");
  const [highlights,     setHighlights]     = useState<string[]>(guide?.highlights ?? [""]);
  const [includes,       setIncludes]       = useState<string[]>(guide?.includes ?? [""]);
  const [sections,       setSections]       = useState<GuideSection[]>(guide?.sections ?? [emptySection()]);

  const [busy,    setBusy]    = useState(false);
  const [error,   setError]   = useState("");
  const [pdfBusy, setPdfBusy] = useState(false);
  const [imgBusy, setImgBusy] = useState(false);

  const pdfRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  // ── Slug auto-generate ────────────────────────────────────────────────────
  function autoSlug(t: string) {
    return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  // ── List helpers ──────────────────────────────────────────────────────────
  function listSet(list: string[], idx: number, val: string): string[] {
    return list.map((v, i) => i === idx ? val : v);
  }
  function listAdd(list: string[]): string[] { return [...list, ""]; }
  function listRemove(list: string[], idx: number): string[] { return list.filter((_, i) => i !== idx); }

  // ── Section helpers ───────────────────────────────────────────────────────
  function sectionSet<K extends keyof GuideSection>(idx: number, key: K, val: GuideSection[K]) {
    setSections(sections.map((s, i) => i === idx ? { ...s, [key]: val } : s));
  }
  function sectionTipSet(si: number, ti: number, val: string) {
    const tips = (sections[si].tips ?? []).map((t, i) => i === ti ? val : t);
    sectionSet(si, "tips", tips);
  }

  // ── File uploads ──────────────────────────────────────────────────────────
  async function uploadFile(file: File, type: "pdf" | "image") {
    if (!guide?.id && isNew) {
      alert("Save the guide first before uploading files.");
      return;
    }
    const id = guide?.id ?? "";
    const fd = new FormData();
    fd.append("file", file);
    fd.append("type", type);

    if (type === "pdf") setPdfBusy(true);
    else setImgBusy(true);

    try {
      const res  = await fetch(`/api/admin/guides/${id}/upload`, { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) { alert(data.error ?? "Upload failed"); return; }
      if (type === "pdf") setPdfUrl(data.url);
      else setCoverImage(data.url);
    } finally {
      if (type === "pdf") setPdfBusy(false);
      else setImgBusy(false);
    }
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);

    const payload: Omit<Guide, "id"> = {
      slug:          slug || autoSlug(title),
      title, subtitle, description, destination, category,
      tags:          tags as Guide["tags"],
      price:         price === "free" ? "free" : parseFloat(price),
      stripeProductId, stripePriceId,
      readTime:      parseInt(readTime, 10),
      publishedAt,   featured, status,
      coverImage,    coverImageAlt, pdfUrl,
      highlights:    highlights.filter(Boolean),
      includes:      includes.filter(Boolean),
      sections:      sections.filter((s) => s.title),
    };

    try {
      let res: Response;
      if (isNew) {
        res = await fetch("/api/admin/guides", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(payload),
        });
      } else {
        res = await fetch(`/api/admin/guides/${guide!.id}`, {
          method:  "PUT",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(payload),
        });
      }
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Save failed"); return; }
      router.push("/admin/guides");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  const field = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900";
  const label = "block text-sm font-medium text-gray-700 mb-1";
  const section = "bg-white rounded-xl border border-gray-200 p-6 space-y-4";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* ── Core metadata ─────────────────────────────────────────────── */}
      <div className={section}>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Core Info</h2>
        <div>
          <label className={label}>Title *</label>
          <input required value={title} onChange={(e) => { setTitle(e.target.value); if (isNew) setSlug(autoSlug(e.target.value)); }} className={field} />
        </div>
        <div>
          <label className={label}>Slug *</label>
          <input required value={slug} onChange={(e) => setSlug(e.target.value)} className={`${field} font-mono text-xs`} />
        </div>
        <div>
          <label className={label}>Subtitle</label>
          <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className={field} />
        </div>
        <div>
          <label className={label}>Description</label>
          <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className={field} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={label}>Destination</label>
            <input value={destination} onChange={(e) => setDestination(e.target.value)} className={field} placeholder="Orlando, FL" />
          </div>
          <div>
            <label className={label}>Read Time (min)</label>
            <input type="number" min={1} value={readTime} onChange={(e) => setReadTime(e.target.value)} className={field} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={label}>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value as Guide["category"])} className={field}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={label}>Published Date</label>
            <input type="date" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} className={field} />
          </div>
        </div>
        <div>
          <label className={label}>Tags</label>
          <div className="flex flex-wrap gap-2">
            {ALL_TAGS.map((t) => (
              <label key={t} className="flex items-center gap-1.5 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={tags.includes(t)}
                  onChange={(e) => setTags(e.target.checked ? [...tags, t] : tags.filter((x) => x !== t))}
                  className="accent-gray-900"
                />
                {t}
              </label>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="accent-gray-900" />
            Featured
          </label>
          <div>
            <select value={status} onChange={(e) => setStatus(e.target.value as "published"|"draft")} className={`${field} w-auto`}>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Pricing & Stripe ───────────────────────────────────────────── */}
      <div className={section}>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Pricing & Stripe</h2>
        <p className="text-xs text-gray-400">Create the product and price in your Stripe Dashboard first, then paste the IDs here.</p>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={label}>Price (USD) or "free"</label>
            <input value={price} onChange={(e) => setPrice(e.target.value)} className={field} placeholder='22 or "free"' />
          </div>
          <div>
            <label className={label}>Stripe Product ID</label>
            <input value={stripeProductId} onChange={(e) => setStripeProductId(e.target.value)} className={`${field} font-mono text-xs`} placeholder="prod_..." />
          </div>
          <div>
            <label className={label}>Stripe Price ID *</label>
            <input value={stripePriceId} onChange={(e) => setStripePriceId(e.target.value)} className={`${field} font-mono text-xs`} placeholder="price_..." />
          </div>
        </div>
      </div>

      {/* ── Cover Image ────────────────────────────────────────────────── */}
      <div className={section}>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Cover Image</h2>
        <div>
          <label className={label}>Image URL (or upload below)</label>
          <input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} className={field} placeholder="/images/guides/... or https://storage.googleapis.com/..." />
        </div>
        <div>
          <label className={label}>Alt Text</label>
          <input value={coverImageAlt} onChange={(e) => setCoverImageAlt(e.target.value)} className={field} />
        </div>
        {!isNew && (
          <div>
            <label className={label}>Upload Image</label>
            <input ref={imgRef} type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadFile(f, "image"); }} className="text-sm" />
            {imgBusy && <p className="text-xs text-gray-400 mt-1">Uploading…</p>}
          </div>
        )}
      </div>

      {/* ── PDF Upload ─────────────────────────────────────────────────── */}
      <div className={section}>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Guide PDF</h2>
        {pdfUrl ? (
          <div className="flex items-center gap-3">
            <a href={pdfUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline truncate max-w-xs">{pdfUrl}</a>
            <button type="button" onClick={() => setPdfUrl("")} className="text-xs text-red-400 hover:text-red-600">Remove</button>
          </div>
        ) : (
          <p className="text-sm text-red-500">No PDF uploaded — customers won't receive a download link after purchase.</p>
        )}
        {!isNew && (
          <div>
            <label className={label}>Upload PDF</label>
            <input ref={pdfRef} type="file" accept=".pdf" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadFile(f, "pdf"); }} className="text-sm" />
            {pdfBusy && <p className="text-xs text-gray-400 mt-1">Uploading…</p>}
          </div>
        )}
        {isNew && <p className="text-xs text-gray-400">Save the guide first, then come back to upload the PDF.</p>}
      </div>

      {/* ── Highlights ─────────────────────────────────────────────────── */}
      <div className={section}>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Highlights</h2>
        {highlights.map((h, i) => (
          <div key={i} className="flex gap-2">
            <input value={h} onChange={(e) => setHighlights(listSet(highlights, i, e.target.value))} className={field} placeholder="Highlight bullet point" />
            <button type="button" onClick={() => setHighlights(listRemove(highlights, i))} className="text-gray-400 hover:text-red-500 text-lg leading-none">×</button>
          </div>
        ))}
        <button type="button" onClick={() => setHighlights(listAdd(highlights))} className="text-xs text-gray-500 hover:text-gray-800">+ Add highlight</button>
      </div>

      {/* ── Includes ───────────────────────────────────────────────────── */}
      <div className={section}>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">What's Included</h2>
        {includes.map((inc, i) => (
          <div key={i} className="flex gap-2">
            <input value={inc} onChange={(e) => setIncludes(listSet(includes, i, e.target.value))} className={field} placeholder="Included item" />
            <button type="button" onClick={() => setIncludes(listRemove(includes, i))} className="text-gray-400 hover:text-red-500 text-lg leading-none">×</button>
          </div>
        ))}
        <button type="button" onClick={() => setIncludes(listAdd(includes))} className="text-xs text-gray-500 hover:text-gray-800">+ Add item</button>
      </div>

      {/* ── Sections ───────────────────────────────────────────────────── */}
      <div className={section}>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Content Sections</h2>
        {sections.map((s, si) => (
          <div key={si} className="border border-gray-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-500 uppercase">Section {si + 1}</p>
              <button type="button" onClick={() => setSections(sections.filter((_, i) => i !== si))} className="text-xs text-red-400 hover:text-red-600">Remove</button>
            </div>
            <div>
              <label className={label}>Section Title</label>
              <input value={s.title} onChange={(e) => sectionSet(si, "title", e.target.value)} className={field} />
            </div>
            <div>
              <label className={label}>Content</label>
              <textarea rows={4} value={s.content} onChange={(e) => sectionSet(si, "content", e.target.value)} className={field} />
            </div>
            <div>
              <label className={label}>Tips (one per line)</label>
              <textarea
                rows={3}
                value={(s.tips ?? []).join("\n")}
                onChange={(e) => sectionSet(si, "tips", e.target.value.split("\n"))}
                className={field}
                placeholder="Each line becomes one tip bullet"
              />
            </div>
            <div>
              <label className={label}>Image URL (optional)</label>
              <input value={s.image ?? ""} onChange={(e) => sectionSet(si, "image", e.target.value)} className={field} />
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setSections([...sections, emptySection()])} className="text-xs text-gray-500 hover:text-gray-800">+ Add section</button>
      </div>

      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>}

      <div className="flex items-center justify-end gap-3 pb-10">
        <a href="/admin/guides" className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2">Cancel</a>
        <button type="submit" disabled={busy} className="bg-gray-900 text-white text-sm font-medium px-6 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50">
          {busy ? "Saving…" : isNew ? "Create Guide" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
