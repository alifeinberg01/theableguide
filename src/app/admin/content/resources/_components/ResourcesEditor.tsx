"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Resource, ResourceType } from "@/types";

const TYPES: ResourceType[] = ["link","checklist","template","tool","organization"];

export default function ResourcesEditor({ initialItems }: { initialItems: Resource[] }) {
  const router = useRouter();
  const [items, setItems] = useState<Resource[]>(initialItems);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Omit<Resource,"id">>({
    title: "", description: "", url: "", type: "link",
    category: "", tags: [], free: true,
  });
  const [busy, setBusy] = useState(false);

  const field = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900";

  async function addItem() {
    setBusy(true);
    try {
      const payload = { ...form, tags: typeof form.tags === "string" ? (form.tags as unknown as string).split(",").map((t:string)=>t.trim()).filter(Boolean) : form.tags };
      const res = await fetch("/api/admin/content/resources", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) { alert(data.error); return; }
      setAdding(false);
      router.refresh();
    } finally { setBusy(false); }
  }

  async function deleteItem(id: string) {
    if (!confirm("Delete this resource?")) return;
    await fetch(`/api/admin/content/resources?id=${id}`, { method: "DELETE" });
    setItems(items.filter((i) => i.id !== id));
  }

  return (
    <div className="space-y-4">
      {items.map((r) => (
        <div key={r.id} className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{r.type}</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{r.category}</span>
                {r.free && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Free</span>}
              </div>
              <p className="font-medium text-gray-900 text-sm">{r.title}</p>
              <p className="text-sm text-gray-600 mt-1">{r.description}</p>
              {r.url && <a href={r.url} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline mt-1 block truncate">{r.url}</a>}
            </div>
            <button onClick={() => deleteItem(r.id)} className="text-xs text-red-400 hover:text-red-600 shrink-0">Delete</button>
          </div>
        </div>
      ))}

      {adding ? (
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
          <p className="text-sm font-semibold text-gray-700">New Resource</p>
          <div className="grid grid-cols-2 gap-3">
            <input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} placeholder="Title" className={field} />
            <select value={form.type} onChange={(e) => setForm({...form, type: e.target.value as ResourceType})} className={field}>
              {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <textarea rows={2} value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} placeholder="Description" className={field} />
          <div className="grid grid-cols-2 gap-3">
            <input value={form.url ?? ""} onChange={(e) => setForm({...form, url: e.target.value})} placeholder="URL (optional)" className={field} />
            <input value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} placeholder="Category (Airports & Flying)" className={field} />
          </div>
          <input value={Array.isArray(form.tags) ? form.tags.join(", ") : form.tags as unknown as string} onChange={(e) => setForm({...form, tags: e.target.value.split(",").map(t=>t.trim()).filter(Boolean)})} placeholder="Tags (comma-separated)" className={field} />
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={form.free} onChange={(e) => setForm({...form, free: e.target.checked})} className="accent-gray-900" />
            Free resource
          </label>
          <div className="flex gap-3">
            <button onClick={addItem} disabled={busy} className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50">
              {busy ? "Saving…" : "Add Resource"}
            </button>
            <button onClick={() => setAdding(false)} className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2">Cancel</button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="w-full bg-white border border-dashed border-gray-300 rounded-xl py-4 text-sm text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors"
        >
          + Add Resource
        </button>
      )}
    </div>
  );
}
