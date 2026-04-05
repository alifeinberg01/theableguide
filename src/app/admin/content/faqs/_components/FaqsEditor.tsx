"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { FAQItem } from "@/types";

const CATEGORIES = ["general","guides","custom","accessibility","payment"] as const;

export default function FaqsEditor({ initialFaqs }: { initialFaqs: FAQItem[] }) {
  const router = useRouter();
  const [faqs, setFaqs]       = useState<FAQItem[]>(initialFaqs);
  const [adding, setAdding]   = useState(false);
  const [newQ, setNewQ]       = useState("");
  const [newA, setNewA]       = useState("");
  const [newCat, setNewCat]   = useState<FAQItem["category"]>("general");
  const [busy, setBusy]       = useState(false);

  const field = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900";

  async function addFaq() {
    if (!newQ.trim() || !newA.trim()) return;
    setBusy(true);
    try {
      const res  = await fetch("/api/admin/content/faqs", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ question: newQ, answer: newA, category: newCat }),
      });
      const data = await res.json();
      if (!res.ok) { alert(data.error); return; }
      setNewQ(""); setNewA(""); setAdding(false);
      router.refresh();
    } finally { setBusy(false); }
  }

  async function deleteFaq(id: string) {
    if (!confirm("Delete this FAQ?")) return;
    await fetch(`/api/admin/content/faqs?id=${id}`, { method: "DELETE" });
    setFaqs(faqs.filter((f) => f.id !== id));
  }

  return (
    <div className="space-y-4">
      {/* List */}
      {faqs.map((faq) => (
        <div key={faq.id} className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">{faq.category}</span>
              <p className="font-medium text-gray-900 mt-2 text-sm">{faq.question}</p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">{faq.answer}</p>
            </div>
            <button onClick={() => deleteFaq(faq.id)} className="text-xs text-red-400 hover:text-red-600 shrink-0">Delete</button>
          </div>
        </div>
      ))}

      {/* Add form */}
      {adding ? (
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
          <p className="text-sm font-semibold text-gray-700">New FAQ</p>
          <select value={newCat} onChange={(e) => setNewCat(e.target.value as FAQItem["category"])} className={`${field} w-auto`}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <input value={newQ} onChange={(e) => setNewQ(e.target.value)} placeholder="Question" className={field} />
          <textarea rows={3} value={newA} onChange={(e) => setNewA(e.target.value)} placeholder="Answer" className={field} />
          <div className="flex gap-3">
            <button onClick={addFaq} disabled={busy} className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50">
              {busy ? "Saving…" : "Add FAQ"}
            </button>
            <button onClick={() => setAdding(false)} className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2">Cancel</button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="w-full bg-white border border-dashed border-gray-300 rounded-xl py-4 text-sm text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors"
        >
          + Add FAQ
        </button>
      )}
    </div>
  );
}
