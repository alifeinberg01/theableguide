import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Download, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Purchase Confirmed — Thank You!",
  description: "Your purchase is confirmed. Your guide is on its way to your inbox.",
  robots: { index: false, follow: false },
};

export default function PurchaseSuccessPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-cream pt-20">
      <div className="container-site max-w-xl text-center">
        <div className="card-base p-12">
          <div className="w-20 h-20 rounded-full bg-sage/15 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-sage" />
          </div>

          <h1 className="heading-lg text-navy mb-3">You&apos;re all set!</h1>
          <p className="body-md text-charcoal-muted mb-8">
            Your purchase is confirmed. Check your inbox — your guide and download
            link are on their way. (Check your spam folder if you don&apos;t see it
            within a few minutes.)
          </p>

          <div className="bg-cloud rounded-2xl p-5 mb-8 text-left">
            <p className="font-semibold text-navy mb-2 text-sm">What happens next:</p>
            <ul className="space-y-2 text-sm text-charcoal-muted">
              <li className="flex items-start gap-2">
                <span className="text-sage mt-0.5">→</span>
                Check your email for your download link (arrives within 2 minutes)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage mt-0.5">→</span>
                Download and save your PDF guide
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage mt-0.5">→</span>
                All future updates to your guide arrive at the same email address
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/guides" className="btn-outline">
              Browse More Guides <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/tools/schedule-builder" className="btn-primary">
              Build Your Schedule
            </Link>
          </div>

          <p className="mt-8 text-xs text-charcoal-muted">
            Questions? Email us at{" "}
            <a href="mailto:hello@theableguide.com" className="text-teal underline">
              hello@theableguide.com
            </a>
            {" "}— we respond within one business day.
          </p>
        </div>
      </div>
    </section>
  );
}
