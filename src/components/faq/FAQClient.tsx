"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs, faqCategories } from "@/data/faqs";
import { cn } from "@/lib/utils";
import SectionLabel from "@/components/ui/SectionLabel";

export default function FAQClient() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = faqs.filter((f) => f.category === activeCategory);

  return (
    <>
      {/* Header */}
      <section className="bg-terra-50 pt-[calc(72px+64px)] pb-16 border-b border-border">
        <div className="container-site text-center">
          <SectionLabel className="justify-center mb-4" color="teal">FAQs</SectionLabel>
          <h1 className="heading-xl text-charcoal mb-4">
            Answers to what <em className="italic text-terra">every parent asks</em>
          </h1>
          <p className="body-lg text-charcoal-muted max-w-2xl mx-auto">
            Everything you need to know about our guides, custom itineraries,
            accessibility programs, and more.
          </p>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-site max-w-4xl">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setOpenId(null); }}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium transition-all",
                  activeCategory === cat.id
                    ? "bg-terra text-white"
                    : "bg-transparent border border-border text-charcoal-muted hover:border-terra hover:text-terra"
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
                  <span className="font-display font-medium text-charcoal text-lg leading-snug">
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
            <h3 className="heading-md text-charcoal mb-2">Still have questions?</h3>
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
