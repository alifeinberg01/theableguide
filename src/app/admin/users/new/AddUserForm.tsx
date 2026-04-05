"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Role } from "@/lib/roles";

interface RoleOption {
  value: Role;
  label: string;
  description: string;
  permissions: string[];
}

export default function AddUserForm({ roleOptions }: { roleOptions: RoleOption[] }) {
  const router = useRouter();

  const [email,       setEmail]       = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password,    setPassword]    = useState("12345678");
  const [role,        setRole]        = useState<Role>(roleOptions[0]?.value ?? "editor");
  const [error,       setError]       = useState("");
  const [busy,        setBusy]        = useState(false);

  const selectedRole = roleOptions.find((r) => r.value === role);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/admin/users", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, displayName, password, role }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to create user.");
        return;
      }
      router.push("/admin/users");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Account Details
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.com"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Display Name
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Jane Smith"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Temporary Password <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 font-mono"
          />
          <p className="mt-1 text-xs text-gray-400">
            The user will be required to change this on first login.
          </p>
        </div>
      </div>

      {/* Role selector + permissions preview */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Role &amp; Permissions
        </h2>

        <div className="grid gap-3">
          {roleOptions.map((r) => (
            <label
              key={r.value}
              className={`flex items-start gap-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                role === r.value
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="role"
                value={r.value}
                checked={role === r.value}
                onChange={() => setRole(r.value)}
                className="mt-0.5 accent-gray-900"
              />
              <div>
                <p className="text-sm font-semibold text-gray-900">{r.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{r.description}</p>
              </div>
            </label>
          ))}
        </div>

        {/* Live permissions list */}
        {selectedRole && (
          <div className="rounded-lg bg-gray-50 border border-gray-100 p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              {selectedRole.label} — Permissions
            </p>
            <ul className="space-y-1">
              {selectedRole.permissions.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-gray-700">
                  <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <div className="flex items-center justify-end gap-3">
        <a
          href="/admin/users"
          className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2"
        >
          Cancel
        </a>
        <button
          type="submit"
          disabled={busy}
          className="bg-gray-900 text-white text-sm font-medium px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          {busy ? "Creating…" : "Create User"}
        </button>
      </div>
    </form>
  );
}
