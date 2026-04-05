"use client";

import { useState } from "react";

export default function SandboxToggle({ initialValue }: { initialValue: boolean }) {
  const [enabled, setEnabled] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [status, setStatus]   = useState<"idle" | "saved" | "error">("idle");

  async function toggle() {
    setLoading(true);
    setStatus("idle");
    const next = !enabled;

    try {
      const res = await fetch("/api/admin/sandbox", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ enabled: next }),
      });

      if (!res.ok) throw new Error("Failed");
      setEnabled(next);
      setStatus("saved");
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={toggle}
        disabled={loading}
        aria-pressed={enabled}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          enabled ? "bg-blue-600" : "bg-gray-300"
        } ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>

      <span className="text-sm font-medium text-gray-700">
        {enabled ? "Sandbox ON — paywall disabled" : "Sandbox OFF — live mode"}
      </span>

      {status === "saved" && (
        <span className="text-xs text-green-600">Saved</span>
      )}
      {status === "error" && (
        <span className="text-xs text-red-600">Failed to save</span>
      )}
    </div>
  );
}
