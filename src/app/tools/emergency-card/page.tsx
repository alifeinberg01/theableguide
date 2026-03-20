import type { Metadata } from "next";
import EmergencyCardClient from "@/components/tools/EmergencyCardClient";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Emergency Information Card — Free Printable Tool",
  description:
    "Create a printable emergency information card for your child with autism or sensory differences. Wallet-sized and customizable.",
};

export default function EmergencyCardPage() {
  return (
    <>
      <section className="bg-navy pt-32 pb-0 overflow-hidden">
        <div className="container-site py-12 text-center">
          <SectionLabel className="justify-center mb-4 text-white/60" color="terra">Free Tool</SectionLabel>
          <h1 className="heading-xl text-white mb-4">Emergency Information Card</h1>
          <p className="body-lg text-white/70 max-w-2xl mx-auto">
            A wallet-sized card that travels with your child and gives first responders,
            staff, and good Samaritans everything they need to help — without you
            having to explain it in a high-stress moment.
          </p>
        </div>
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 40V20C360 0 720 40 1080 20C1260 10 1380 28 1440 32V40H0Z" fill="#FEFDF8" />
        </svg>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-site">
          <EmergencyCardClient />
        </div>
      </section>
    </>
  );
}
