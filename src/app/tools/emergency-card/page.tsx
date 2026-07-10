import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import EmergencyCardClient from "@/components/tools/EmergencyCardClient";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Accessibility Card — Free Printable Tool",
  description:
    "Create a printable accessibility card for your child with autism or sensory differences. Wallet-sized and customizable.",
};

export const revalidate = 300;

export default function EmergencyCardPage() {
  return (
    <>
      <section className="bg-terra-50 pt-[calc(72px+64px)] pb-16 border-b border-border">
        <div className="container-site text-center">
          <SectionLabel className="justify-center mb-4" color="terra">Free Printable Resource</SectionLabel>
          <h1 className="heading-xl text-charcoal mb-4">
            Accessibility Travel <em className="italic text-terra">ID Card</em>
          </h1>
          <p className="body-lg text-charcoal-muted max-w-2xl mx-auto">
            A wallet-sized card that travels with your child and gives first responders,
            staff, and good Samaritans everything they need to help — without you
            having to explain it in a high-stress moment.
          </p>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-site">
          <EmergencyCardClient />

          <div className="max-w-5xl mx-auto mt-12">
            <div className="card-base p-8 border-l-4 border-dust">
              <p className="text-xs font-medium text-dust-700 uppercase tracking-widest mb-2">
                Looking for something more official?
              </p>
              <h3 className="font-display font-medium text-charcoal text-xl mb-3">
                Register for the IBCCES Accessibility Card (IAC)
              </h3>
              <p className="text-charcoal-muted text-sm leading-relaxed mb-4">
                The card above is a free, DIY tool you print at home for everyday travel —
                it isn&apos;t affiliated with any venue. If your family wants a more
                formal option, the International Board of Credentialing and Continuing
                Education Standards (IBCCES) offers its own Accessibility Card (IAC),
                a free digital pass some IBCCES-certified destinations use as part of
                their own accommodation process. Registration involves a brief online
                cognitive assessment and is entirely optional.
              </p>
              <a
                href="https://accessibilitycard.org"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-dust-700 font-medium text-sm hover:text-dust-800 transition-colors"
              >
                Register at accessibilitycard.org
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
