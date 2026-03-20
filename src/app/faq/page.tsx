"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs, faqCategories } from "@/data/faqs";
import { cn } from "@/lib/utils";
import SectionLabel from "@/components/ui/SectionLabel";

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = faqs.filter((f) => f.category === activeCategory);

  return (
    <>
      {/* Header */}
      <section className="bg-navy pt-32 pb-20">
        <div className="container-site text-center">
          <SectionLabel className="justify-center mb-4 text-white/60" color="teal">FAQs</SectionLabel>
          <h1 className="heading-xl text-white mb-4">Frequently Asked Questions</h1>
          <p className="body-lg text-white/70 max-w-2xl mx-auto">
            Everything you need to know about our guides, custom itineraries,
            accessibility programs, and more.
          </p>
        </div>
      </section>

      <div className="bg-navy">
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 40V20C360 0 720 40 1080 20C1260 10 1380 28 1440 32V40H0Z" fill="#FEFDF8" />
        </svg>
      </div>

      <section className="section-padding bg-cream">
        <div className="container-site max-w-4xl">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setOpenId(null); }}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-semibold transition-all",
                  activeCategory === cat.id
                    ? "bg-navy text-white shadow-pill"
                    : "bg-white border border-navy/15 text-charcoal hover:border-navy hover:text-navy"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            {filtered.map((faq) => (
              <div key={faq.id} className="card-base overflow-hidden">
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                >
                  <span className="font-display font-semibold text-navy text-lg leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-charcoal-muted shrink-0 transition-transform duration-200",
                      openId === faq.id && "rotate-180"
                    )}
                  />
                </button>

                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    openId === faq.id ? "max-h-96" : "max-h-0"
                  )}
                >
                  <p className="px-6 pb-6 text-charcoal-muted leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-16 text-center card-base p-10">
            <h3 className="heading-md text-navy mb-2">Still have questions?</h3>
            <p className="text-charcoal-muted mb-6">
              We typically respond within one business day.
            </p>
            <a href="mailto:hello@theableguide.com" className="btn-primary px-8 py-3">
              Email Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
