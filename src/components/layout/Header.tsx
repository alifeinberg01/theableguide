"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Compass } from "lucide-react";
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
    ],
  },
  { label: "DAS Guide", href: "/das-guide" },
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-pill"
          : "bg-transparent"
      )}
    >
      <div className="container-site">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-navy flex items-center justify-center shadow-md group-hover:bg-terra transition-colors duration-200">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className={cn("font-display font-bold text-lg tracking-tight transition-colors", scrolled ? "text-navy" : "text-white")}>
                The Able Guide
              </span>
              <span className={cn("text-xs font-sans tracking-wide transition-colors", scrolled ? "text-charcoal-muted" : "text-white/70")}>
                Travel for Every Family
              </span>
            </div>
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
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                      scrolled
                        ? "text-charcoal hover:text-navy hover:bg-navy/8"
                        : "text-white/90 hover:text-white hover:bg-white/15"
                    )}
                  >
                    {item.label}
                    <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", dropdown === item.label && "rotate-180")} />
                  </button>
                  {dropdown === item.label && (
                    <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-card-hover border border-navy/8 py-2 animate-fade-in">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center px-4 py-2.5 text-sm text-charcoal hover:bg-cloud hover:text-navy font-medium transition-colors"
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
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    pathname === item.href
                      ? scrolled ? "text-navy font-semibold" : "text-white font-semibold"
                      : scrolled
                      ? "text-charcoal hover:text-navy hover:bg-navy/8"
                      : "text-white/90 hover:text-white hover:bg-white/15"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/free-guide"
              className={cn(
                "text-sm font-semibold transition-colors",
                scrolled ? "text-navy hover:text-terra" : "text-white/90 hover:text-white"
              )}
            >
              Free Guide
            </Link>
            <Link
              href="/custom"
              className="btn-primary text-sm px-5 py-2.5"
            >
              Custom Itinerary
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className={cn("md:hidden p-2 rounded-xl transition-colors", scrolled ? "text-navy" : "text-white")}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-navy/10 shadow-card-hover animate-fade-in">
          <div className="container-site py-4 flex flex-col gap-1">
            {nav.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center px-4 py-3 text-charcoal font-medium hover:text-navy hover:bg-cloud rounded-xl transition-colors"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-6 flex flex-col gap-0.5">
                    {item.children.slice(1).map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center px-4 py-2 text-sm text-charcoal-muted hover:text-navy hover:bg-cloud rounded-xl transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-navy/10 flex flex-col gap-2 mt-2">
              <Link href="/free-guide" className="btn-outline text-center py-3">
                Download Free Guide
              </Link>
              <Link href="/custom" className="btn-primary text-center py-3">
                Custom Itinerary
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
