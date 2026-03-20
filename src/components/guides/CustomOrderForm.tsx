"use client";

import { useState } from "react";
import { ShoppingCart, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";

const PRICE = 149;

export default function CustomOrderForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    destination: "",
    travelDates: "",
    childAge: "",
    childNeeds: "",
    budget: "",
    notes: "",
  });

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: process.env.NEXT_PUBLIC_STRIPE_CUSTOM_PRICE_ID,
          title: "Custom Itinerary",
          metadata: form,
        }),
      });

      if (!res.ok) throw new Error();
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch {
      setError("Something went wrong. Please email hello@theableguide.com directly.");
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="card-base p-10 text-center">
        <CheckCircle className="w-12 h-12 text-sage mx-auto mb-4" />
        <h3 className="heading-md text-navy mb-2">Order Received!</h3>
        <p className="text-charcoal-muted">We&apos;ll reach out within 24 hours to confirm details and begin your plan.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name + Email */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">Your Name *</label>
          <input
            required
            type="text"
            placeholder="First name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-navy/20 text-charcoal placeholder-charcoal-muted focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">Email *</label>
          <input
            required
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-navy/20 text-charcoal placeholder-charcoal-muted focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy mb-1.5">Destination *</label>
        <input
          required
          type="text"
          placeholder="e.g. Walt Disney World, Universal Orlando..."
          value={form.destination}
          onChange={(e) => set("destination", e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-navy/20 text-charcoal placeholder-charcoal-muted focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">Travel Dates *</label>
          <input
            required
            type="text"
            placeholder="e.g. June 10–14, 2025"
            value={form.travelDates}
            onChange={(e) => set("travelDates", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-navy/20 text-charcoal placeholder-charcoal-muted focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">Child&apos;s Age *</label>
          <input
            required
            type="text"
            placeholder="e.g. 8 years old"
            value={form.childAge}
            onChange={(e) => set("childAge", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-navy/20 text-charcoal placeholder-charcoal-muted focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy mb-1.5">
          Child&apos;s Needs & Challenges *
        </label>
        <textarea
          required
          rows={4}
          placeholder="Describe your child's diagnosis, sensory sensitivities, behavioral challenges, what helps them, what makes things harder..."
          value={form.childNeeds}
          onChange={(e) => set("childNeeds", e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-navy/20 text-charcoal placeholder-charcoal-muted focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal text-sm resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy mb-1.5">Daily Budget Range</label>
        <select
          value={form.budget}
          onChange={(e) => set("budget", e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-navy/20 text-charcoal focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal text-sm bg-white"
        >
          <option value="">Select a range...</option>
          <option value="budget">Budget (under $150/day)</option>
          <option value="moderate">Moderate ($150–$300/day)</option>
          <option value="premium">Premium ($300–$500/day)</option>
          <option value="luxury">Luxury ($500+/day)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy mb-1.5">Anything Else We Should Know?</label>
        <textarea
          rows={3}
          placeholder="Must-do attractions, things to avoid, travel experience level, other children in the group..."
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-navy/20 text-charcoal placeholder-charcoal-muted focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal text-sm resize-none"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button
        type="submit"
        loading={loading}
        className="w-full justify-center py-4 text-base"
        variant="primary"
      >
        <ShoppingCart className="w-4 h-4" />
        {loading ? "Redirecting to checkout…" : `Order Custom Itinerary — $${PRICE}`}
      </Button>

      <p className="text-center text-xs text-charcoal-muted">
        Secure checkout via Stripe · 30-day money-back guarantee
      </p>
    </form>
  );
}
