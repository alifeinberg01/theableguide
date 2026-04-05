"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword]         = useState("");
  const [confirm, setConfirm]                 = useState("");
  const [error, setError]                     = useState("");
  const [loading, setLoading]                 = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (newPassword === currentPassword) {
      setError("New password must be different from your current password.");
      return;
    }

    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user?.email) throw new Error("Not authenticated");

      // Re-authenticate before changing password
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      // Clear the requiresPasswordChange flag via a new session cookie
      const idToken = await user.getIdToken(true);
      await fetch("/api/admin/session", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ idToken }),
      });

      router.push("/admin/dashboard");
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === "auth/wrong-password" || code === "auth/invalid-credential") {
        setError("Current password is incorrect.");
      } else if (code === "auth/weak-password") {
        setError("Password is too weak. Use at least 8 characters.");
      } else {
        setError("An error occurred. Please try again.");
      }
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Set a new password</h1>
          <p className="mt-1 text-sm text-gray-500">
            You must change your password before continuing.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-8 rounded-xl shadow-sm border border-gray-200"
        >
          <div>
            <label htmlFor="current" className="block text-sm font-medium text-gray-700 mb-1">
              Current password
            </label>
            <input
              id="current"
              type="password"
              required
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="new" className="block text-sm font-medium text-gray-700 mb-1">
              New password
            </label>
            <input
              id="new"
              type="password"
              required
              minLength={8}
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm new password
            </label>
            <input
              id="confirm"
              type="password"
              required
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {loading ? "Updating…" : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
}
