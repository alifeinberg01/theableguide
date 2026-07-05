import type { Metadata } from "next";
import Image from "next/image";
import { Clock, CheckCircle, Star } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import CustomOrderForm from "@/components/guides/CustomOrderForm";

export const metadata: Metadata = {
  title: "Custom Itinerary — Personalized Travel Planning",
  description:
    "Order a custom travel itinerary tailored to your child's specific sensory profile, your destination, and your family's goals. Delivered in 5-7 business days.",
};

const includes = [
  "Day-by-day schedule tailored to your child's sensory profile",
  "Attraction picks matched to their specific needs",
  "Accommodation and dining recommendations",
  "Transportation logistics",
  "A contingency plan for difficult moments",
  "A packing checklist for your destination",
  "15–25 pages, delivered as a PDF",
];

export default function CustomPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-terra pt-[calc(72px+64px)] pb-20 overflow-hidden">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <SectionLabel className="mb-4" color="terra">
                <span className="text-white/70">Custom Itineraries</span>
              </SectionLabel>
              <h1 className="heading-xl text-white mb-4">
                A plan built
                <br />
                for <em className="italic text-terra-100">your</em> child.
              </h1>
              <p className="body-lg text-white/80 mb-8">
                A custom itinerary is a personalized travel plan built specifically
                for your child&apos;s sensory profile, your destination, and your
                family&apos;s goals. Not a template — a real plan, made for you.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "5–7 days", label: "Turnaround time" },
                  { value: "15–25 pages", label: "Avg. plan length" },
                  { value: "4.9★", label: "Customer rating" },
                  { value: "100%", label: "Satisfaction guarantee" },
                ].map(({ value, label }) => (
                  <div key={label} className="bg-white/10 rounded-2xl p-4">
                    <p className="font-display font-medium text-white text-2xl">{value}</p>
                    <p className="text-white/60 text-sm mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[440px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80"
                alt="Family reviewing a custom travel plan at home"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="section-padding bg-cream">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* What's included */}
            <div>
              <SectionLabel className="mb-4" color="navy">What You Get</SectionLabel>
              <h2 className="heading-lg text-charcoal mb-6">Every Custom Itinerary Includes</h2>
              <ul className="space-y-4 mb-10">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-sage-600 mt-0.5 shrink-0" />
                    <span className="text-charcoal">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Testimonial snippet */}
              <div className="card-base p-6 border-l-4 border-terra">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-terra fill-terra" />)}
                </div>
                <p className="font-display text-charcoal italic text-base mb-3">
                  &ldquo;We ordered a custom itinerary for our Universal trip and it was incredible.
                  My son had zero meltdowns and we rode everything. I cried on the way home — happy tears.&rdquo;
                </p>
                <p className="font-medium text-charcoal text-sm">— Jason T., Atlanta, GA</p>
              </div>
            </div>

            {/* Order form */}
            <div>
              <SectionLabel className="mb-4" color="terra">Order Now</SectionLabel>
              <h2 className="heading-lg text-charcoal mb-6">Start Your Custom Plan</h2>
              <CustomOrderForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
