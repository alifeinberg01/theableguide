"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteUserButton({
  uid,
  email,
}: {
  uid: string;
  email: string;
}) {
  const router   = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    if (!confirm(`Remove ${email}? This cannot be undone.`)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/users/${uid}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error ?? "Failed to delete user");
        return;
      }
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={busy}
      className="text-xs text-red-500 hover:text-red-700 font-medium disabled:opacity-40"
    >
      {busy ? "Removing…" : "Remove"}
    </button>
  );
}
