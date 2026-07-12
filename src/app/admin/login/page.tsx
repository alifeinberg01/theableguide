"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const [mode, setMode]                 = useState<"login" | "forgot">("login");
  const [resetEmail, setResetEmail]     = useState("");
  const [resetSent, setResetSent]       = useState(false);
  const [resetError, setResetError]     = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  async function handleForgotSubmit(e: FormEvent) {
    e.preventDefault();
    setResetError("");
    setResetLoading(true);

    try {
      await sendPasswordResetEmail(auth, resetEmail, {
        url: `${window.location.origin}/admin/reset-password`,
        handleCodeInApp: true,
      });
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      // Only "user not found" is swallowed — don't reveal whether an email
      // is a registered admin account. Real errors (bad config, disabled
      // provider, rate limits, etc.) still surface so this isn't silently broken.
      if (code && code !== "auth/user-not-found") {
        setResetError(
          code === "auth/too-many-requests"
            ? "Too many attempts. Please wait a few minutes and try again."
            : "Something went wrong sending the reset email. Please try again or contact hello@theableguide.com."
        );
        setResetLoading(false);
        return;
      }
    } finally {
      setResetLoading(false);
      setResetSent(true);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const idToken    = await credential.user.getIdToken();

      const res = await fetch("/api/admin/session", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ idToken }),
      });

      if (!res.ok) {
        setError("Access denied. This account does not have admin privileges.");
        await auth.signOut();
        setLoading(false);
        return;
      }

      // Check if password change is required
      const tokenResult = await credential.user.getIdTokenResult(true);
      if (tokenResult.claims.requiresPasswordChange) {
        router.push("/admin/change-password");
      } else {
        router.push("/admin/dashboard");
      }
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found") {
        setError("Invalid email or password.");
      } else {
        setError("An error occurred. Please try again.");
      }
      setLoading(false);
    }
  }

  if (mode === "forgot") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Reset password</h1>
            <p className="mt-1 text-sm text-gray-500">The Able Guide</p>
          </div>

          {resetSent ? (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 space-y-4">
              <p className="text-sm text-gray-700">
                If <strong>{resetEmail}</strong> is a registered admin account, we&apos;ve sent
                a password reset link to that address. Check your inbox (and spam folder) and
                follow the link to set a new password.
              </p>
              <button
                type="button"
                onClick={() => { setMode("login"); setResetSent(false); setResetEmail(""); }}
                className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
              >
                Back to sign in
              </button>
            </div>
          ) : (
            <form onSubmit={handleForgotSubmit} className="space-y-4 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500">
                Enter the email address for your admin account and we&apos;ll send you a link to
                set a new password.
              </p>

              <div>
                <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="reset-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={resetEmail}
                  onChange={e => setResetEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {resetError && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {resetError}
                </p>
              )}

              <button
                type="submit"
                disabled={resetLoading}
                className="w-full py-2 px-4 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
              >
                {resetLoading ? "Sending…" : "Send reset link"}
              </button>

              <button
                type="button"
                onClick={() => setMode("login")}
                className="w-full text-center text-sm text-gray-500 hover:text-gray-700"
              >
                Back to sign in
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-xs text-gray-400">
            Don&apos;t remember which email your admin account uses?{" "}
            <a href="mailto:hello@theableguide.com" className="text-blue-600 hover:underline">
              Contact hello@theableguide.com
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
          <p className="mt-1 text-sm text-gray-500">The Able Guide</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <button
                type="button"
                onClick={() => { setMode("forgot"); setResetEmail(email); }}
                className="text-xs text-blue-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
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
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          Don&apos;t remember which email your admin account uses?{" "}
          <a href="mailto:hello@theableguide.com" className="text-blue-600 hover:underline">
            Contact hello@theableguide.com
          </a>
        </p>
      </div>
    </div>
  );
}
