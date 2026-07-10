"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  {
    label: "Guides",
    href: "/guides",
    children: [
      { label: "All Guides", href: "/guides" },
      { label: "Theme Parks", href: "/guides?category=theme-park" },
      { label: "Airports & Flying", href: "/guides?category=airport" },
      { label: "Cruises", href: "/guides?category=cruise" },
      { label: "Resorts", href: "/guides?category=resort" },
      { label: "National Parks", href: "/guides?category=national-park" },
      { label: "City Guides", href: "/guides?category=city" },
    ],
  },
  { label: "Resources", href: "/resources" },
  { label: "Accessibility Card", href: "/tools/emergency-card" },
  { label: "Schedule Builder", href: "/tools/schedule-builder" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDropdown(null);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 h-[72px] bg-cream/95 backdrop-blur-md border-b border-border transition-shadow duration-300",
        scrolled && "shadow-card"
      )}
    >
      <div className="container-site h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-terra flex items-center justify-center flex-shrink-0">
              <span className="font-display italic text-white text-lg leading-none">A</span>
            </div>
            <span className="font-display text-[22px] font-medium tracking-tight text-charcoal">
              The Able <em className="italic text-terra not-italic md:italic">Guide</em>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setDropdown(item.label)}
                  onMouseLeave={() => setDropdown(null)}
                >
                  <button
                    className="flex items-center gap-1 px-4 py-2 text-[13px] font-medium uppercase tracking-wide text-charcoal-muted hover:text-terra transition-colors"
                  >
                    {item.label}
                    <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", dropdown === item.label && "rotate-180")} />
                  </button>
                  {dropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-2xl shadow-card-hover border border-border py-2 animate-fade-in">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center px-4 py-2.5 text-sm text-charcoal-light hover:bg-terra-50 hover:text-terra font-normal transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 text-[13px] font-medium uppercase tracking-wide transition-colors",
                    pathname === item.href
                      ? "text-terra"
                      : "text-charcoal-muted hover:text-terra"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-5">
            <Link
              href="/free-guide"
              className="text-[13px] font-medium uppercase tracking-wide text-charcoal-muted hover:text-terra transition-colors"
            >
              Free Guide
            </Link>
            <Link href="/custom" className="btn-primary text-sm px-6 py-2.5">
              ✦ Custom Plan
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-charcoal"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-cream border-t border-border shadow-card-hover animate-fade-in">
          <div className="container-site py-4 flex flex-col gap-1">
            {nav.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center px-4 py-3 text-charcoal font-medium hover:text-terra hover:bg-terra-50 rounded-xl transition-colors"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-6 flex flex-col gap-0.5">
                    {item.children.slice(1).map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center px-4 py-2 text-sm text-charcoal-muted hover:text-terra hover:bg-terra-50 rounded-xl transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-border flex flex-col gap-2 mt-2">
              <Link href="/free-guide" className="btn-secondary text-center py-3">
                Download Free Guide
              </Link>
              <Link href="/custom" className="btn-primary text-center py-3">
                ✦ Custom Plan
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
