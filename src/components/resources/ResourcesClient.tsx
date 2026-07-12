"use client";

import { useState } from "react";
import { ExternalLink, BookOpen, Link2, CheckSquare, Wrench, Building2 } from "lucide-react";
import { resources, resourceCategories } from "@/data/resources";
import { cn } from "@/lib/utils";
import type { ResourceType } from "@/types";
import SectionLabel from "@/components/ui/SectionLabel";
import Badge from "@/components/ui/Badge";

const typeIcons: Record<ResourceType, React.ElementType> = {
  link:         Link2,
  checklist:    CheckSquare,
  template:     BookOpen,
  tool:         Wrench,
  organization: Building2,
};

const typeColors: Record<ResourceType, "navy" | "teal" | "terra" | "sage" | "amber"> = {
  link:         "navy",
  checklist:    "teal",
  template:     "terra",
  tool:         "sage",
  organization: "amber",
};

export default function ResourcesClient({ initialCategory = "All" }: { initialCategory?: string }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const filtered =
    activeCategory === "All"
      ? resources
      : resources.filter((r) => r.category === activeCategory);

  return (
    <>
      {/* Header */}
      <section className="bg-terra-50 pt-[calc(72px+64px)] pb-16 border-b border-border">
        <div className="container-site">
          <SectionLabel className="mb-4" color="sage">Resource Library</SectionLabel>
          <h1 className="heading-xl text-charcoal mb-4 max-w-2xl">
            Tools that <em className="italic text-terra">actually work</em>
          </h1>
          <p className="body-lg text-charcoal-muted max-w-xl">
            Tools, links, programs, and organizations that make accessible travel easier —
            all vetted and organized in one place.
          </p>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-site">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-12">
            {resourceCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium transition-all",
                  activeCategory === cat
                    ? "bg-terra text-white"
                    : "bg-transparent border border-border text-charcoal-muted hover:border-terra hover:text-terra"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((resource) => {
              const Icon = typeIcons[resource.type];
              const color = typeColors[resource.type];

              return (
                <div key={resource.id} className="card-base card-hover p-6 flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${color}/10`}>
                      <Icon className={`w-5 h-5 text-${color}`} />
                    </div>
                    <div className="flex gap-2">
                      {resource.free && <Badge color="sage">Free</Badge>}
                      <Badge color={color}>{resource.type}</Badge>
                    </div>
                  </div>

                  <h3 className="font-display font-medium text-charcoal text-lg mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-charcoal-muted text-sm leading-relaxed flex-1 mb-4">
                    {resource.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {resource.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-charcoal/5 text-charcoal-muted rounded-full px-2 py-0.5">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {resource.url && (
                    <a
                      href={resource.url}
                      target={resource.url.startsWith("http") ? "_blank" : undefined}
                      rel={resource.url.startsWith("http") ? "noreferrer" : undefined}
                      className="inline-flex items-center gap-1.5 text-dust-700 font-medium text-sm hover:text-dust-800 transition-colors"
                    >
                      Visit Resource
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
