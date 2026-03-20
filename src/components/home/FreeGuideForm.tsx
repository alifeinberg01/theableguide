"use client";

import { useState } from "react";
import { Download, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";

export default function FreeGuideForm() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/free-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("Check your inbox! Your guide is on its way.");
      } else {
        throw new Error();
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="card-base p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-sage/15 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-sage" />
        </div>
        <h3 className="font-display font-bold text-navy text-2xl mb-2">You&apos;re all set!</h3>
        <p className="text-charcoal-muted">{message}</p>
      </div>
    );
  }

  return (
    <div className="card-base p-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-navy mb-1.5">
            First Name
          </label>
          <input
            id="name"
            type="text"
            required
            placeholder="Your first name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-navy/20 text-charcoal placeholder-charcoal-muted focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-navy mb-1.5">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-navy/20 text-charcoal placeholder-charcoal-muted focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors"
          />
        </div>

        {status === "error" && (
          <p className="text-red-500 text-sm">{message}</p>
        )}

        <Button
          type="submit"
          loading={status === "loading"}
          className="w-full justify-center py-4 text-base"
          variant="primary"
        >
          <Download className="w-4 h-4" />
          Send My Free Guide
        </Button>

        <p className="text-center text-xs text-charcoal-muted">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </div>
  );
}
