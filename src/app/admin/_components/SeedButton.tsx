"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ENDPOINTS: Record<string, string> = {
  guides:       "/api/admin/guides",
  blog:         "/api/admin/blog",
  faqs:         "/api/admin/content/faqs",
  testimonials: "/api/admin/content/testimonials",
  resources:    "/api/admin/content/resources",
};

export default function SeedButton({
  collection,
  label = "Seed from static data",
}: {
  collection: string;
  label?: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function seed() {
    if (!confirm(`This will import all static ${collection} into Firestore. Existing documents won't be overwritten. Continue?`)) return;
    setBusy(true);
    try {
      const res = await fetch(ENDPOINTS[collection], {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ action: "seed" }),
      });
      const data = await res.json();
      if (!res.ok) { alert(data.error ?? "Seed failed"); return; }
      setDone(true);
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  if (done) return <span className="text-xs text-emerald-600 font-medium">Seeded ✓</span>;

  return (
    <button
      onClick={seed}
      disabled={busy}
      className="text-xs text-gray-500 hover:text-gray-800 border border-gray-200 px-3 py-1.5 rounded-lg disabled:opacity-40"
    >
      {busy ? "Seeding…" : label}
    </button>
  );
}
