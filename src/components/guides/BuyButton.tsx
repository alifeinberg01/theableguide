"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import Button from "@/components/ui/Button";

interface BuyButtonProps {
  guideId: string;
  stripePriceId: string;
  title: string;
  price: number;
}

export default function BuyButton({ guideId, stripePriceId, title, price }: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBuy = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: stripePriceId, guideId, title }),
      });

      if (!res.ok) throw new Error("Failed to create checkout session");

      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Button
        onClick={handleBuy}
        loading={loading}
        className="w-full justify-center py-3"
        variant="primary"
      >
        <ShoppingCart className="w-4 h-4" />
        {loading ? "Redirecting…" : `Buy Guide — $${price}`}
      </Button>
      {error && <p className="text-red-500 text-xs text-center">{error}</p>}
    </div>
  );
}
