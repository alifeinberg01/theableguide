"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await signOut(auth);
    await fetch("/api/admin/session", { method: "DELETE" });
    router.push("/admin/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
    >
      Sign out
    </button>
  );
}
