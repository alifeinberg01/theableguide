import type { Metadata } from "next";
import EmergencyCardClient from "@/components/tools/EmergencyCardClient";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Emergency Information Card — Free Printable Tool",
  description:
    "Create a printable emergency information card for your child with autism or sensory differences. Wallet-sized and customizable.",
};

export const revalidate = 300;

export default function EmergencyCardPage() {
  return (
    <>
      <section className="bg-terra-50 pt-[calc(72px+64px)] pb-16 border-b border-border">
        <div className="container-site text-center">
          <SectionLabel className="justify-center mb-4" color="terra">Free Printable Resource</SectionLabel>
          <h1 className="heading-xl text-charcoal mb-4">
            Emergency Travel <em className="italic text-terra">ID Card</em>
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
        </div>
      </section>
    </>
  );
}
