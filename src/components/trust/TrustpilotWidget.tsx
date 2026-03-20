"use client";

/**
 * TrustpilotWidget
 *
 * CURRENTLY HIDDEN — set NEXT_PUBLIC_TRUSTPILOT_ENABLED=true to activate.
 *
 * Once you have a Trustpilot Business account and have collected sufficient
 * reviews, replace the placeholder values below with your real Business Unit ID
 * and update the widget template ID from your Trustpilot dashboard.
 *
 * Dashboard: https://businessapp.b2b.trustpilot.com/
 */

const ENABLED = process.env.NEXT_PUBLIC_TRUSTPILOT_ENABLED === "true";

// ── Replace these when activating ────────────────────────────────────────────
const TRUSTPILOT_BUSINESS_UNIT_ID = "YOUR_BUSINESS_UNIT_ID";
const TRUSTPILOT_DOMAIN           = "theableguide.com";
// Trustpilot widget template IDs:
// "5419b6a8b0d04a076446a9ad" = MicroReviewCount (small)
// "5406e65db0d04a09e042d5fc" = TrustBox Mini (stars + count)
// "53aa8807dec7e10d38f59f32" = TrustBox Slider (full review carousel)
const WIDGET_TEMPLATE_ID = "5406e65db0d04a09e042d5fc";
// ─────────────────────────────────────────────────────────────────────────────

interface TrustpilotWidgetProps {
  variant?: "mini" | "micro" | "slider";
  className?: string;
}

export default function TrustpilotWidget({ variant = "mini", className }: TrustpilotWidgetProps) {
  // Render nothing until explicitly enabled
  if (!ENABLED) return null;

  const templateIds: Record<string, string> = {
    mini:   "5406e65db0d04a09e042d5fc",
    micro:  "5419b6a8b0d04a076446a9ad",
    slider: "53aa8807dec7e10d38f59f32",
  };

  const templateId = templateIds[variant] ?? WIDGET_TEMPLATE_ID;

  return (
    <div className={className}>
      {/* Trustpilot TrustBox — loaded via their external script */}
      <div
        className="trustpilot-widget"
        data-locale="en-US"
        data-template-id={templateId}
        data-businessunit-id={TRUSTPILOT_BUSINESS_UNIT_ID}
        data-style-height="52px"
        data-style-width="100%"
        data-theme="light"
        data-min-review-count="10"
        data-without-reviews-preferred-string-id="1"
      >
        <a
          href={`https://www.trustpilot.com/review/${TRUSTPILOT_DOMAIN}`}
          target="_blank"
          rel="noreferrer"
        >
          Trustpilot
        </a>
      </div>
    </div>
  );
}

/**
 * HOW TO ACTIVATE:
 *
 * 1. Create a Trustpilot Business account at trustpilot.com/signup/business
 * 2. Verify your domain (theableguide.com)
 * 3. Collect at least 5–10 reviews
 * 4. From your Trustpilot dashboard → TrustBox Library → copy your Business Unit ID
 * 5. Update TRUSTPILOT_BUSINESS_UNIT_ID above
 * 6. Add the Trustpilot script to src/app/layout.tsx:
 *      <Script src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" strategy="lazyOnload" />
 * 7. Set NEXT_PUBLIC_TRUSTPILOT_ENABLED=true in your .env
 */
