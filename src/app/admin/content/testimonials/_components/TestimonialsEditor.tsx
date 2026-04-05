"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Testimonial } from "@/types";

function Stars({ n }: { n: number }) {
  return <span>{Array.from({ length: 5 }, (_, i) => i < n ? "★" : "☆").join("")}</span>;
}

export default function TestimonialsEditor({ initialItems }: { initialItems: Testimonial[] }) {
  const router = useRouter();
  const [items, setItems] = useState<Testimonial[]>(initialItems);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Omit<Testimonial,"id">>({
    name: "", location: "", quote: "", rating: 5,
    guideTitle: "", avatarInitials: "", date: new Date().toISOString().slice(0,10),
  });
  const [busy, setBusy] = useState(false);

  const field = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900";

  async function addItem() {
    setBusy(true);
    try {
      const res  = await fetch("/api/admin/content/testimonials", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { alert(data.error); return; }
      setAdding(false);
      router.refresh();
    } finally { setBusy(false); }
  }

  async function deleteItem(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`/api/admin/content/testimonials?id=${id}`, { method: "DELETE" });
    setItems(items.filter((i) => i.id !== id));
  }

  return (
    <div className="space-y-4">
      {items.map((t) => (
        <div key={t.id} className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full">{t.avatarInitials}</span>
                <p className="font-medium text-gray-900 text-sm">{t.name}</p>
                <p className="text-xs text-gray-400">{t.location}</p>
                <span className="text-yellow-400 text-xs"><Stars n={t.rating} /></span>
              </div>
              <p className="text-sm text-gray-600 italic">"{t.quote}"</p>
              {t.guideTitle && <p className="text-xs text-gray-400 mt-1">Re: {t.guideTitle}</p>}
            </div>
            <button onClick={() => deleteItem(t.id)} className="text-xs text-red-400 hover:text-red-600 shrink-0">Delete</button>
          </div>
        </div>
      ))}

      {adding ? (
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
          <p className="text-sm font-semibold text-gray-700">New Testimonial</p>
          <div className="grid grid-cols-2 gap-3">
            <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Name" className={field} />
            <input value={form.location} onChange={(e) => setForm({...form, location: e.target.value})} placeholder="Location (Tampa, FL)" className={field} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input value={form.avatarInitials} onChange={(e) => setForm({...form, avatarInitials: e.target.value})} placeholder="Initials (ML)" className={field} />
            <input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({...form, rating: parseInt(e.target.value)})} placeholder="Rating (1-5)" className={field} />
          </div>
          <textarea rows={3} value={form.quote} onChange={(e) => setForm({...form, quote: e.target.value})} placeholder="Quote text" className={field} />
          <input value={form.guideTitle ?? ""} onChange={(e) => setForm({...form, guideTitle: e.target.value})} placeholder="Guide Title (optional)" className={field} />
          <input type="date" value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} className={field} />
          <div className="flex gap-3">
            <button onClick={addItem} disabled={busy} className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50">
              {busy ? "Saving…" : "Add Testimonial"}
            </button>
            <button onClick={() => setAdding(false)} className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2">Cancel</button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="w-full bg-white border border-dashed border-gray-300 rounded-xl py-4 text-sm text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors"
        >
          + Add Testimonial
        </button>
      )}
    </div>
  );
}
