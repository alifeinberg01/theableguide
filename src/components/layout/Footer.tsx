import Link from "next/link";
import { Mail, Instagram, Facebook, Youtube } from "lucide-react";

const guides = [
  { label: "All Guides",         href: "/guides" },
  { label: "Theme Parks",        href: "/guides?category=theme-park" },
  { label: "Airports & Flying",  href: "/guides?category=airport" },
  { label: "Cruises",            href: "/guides?category=cruise" },
  { label: "Resorts",            href: "/guides?category=resort" },
  { label: "National Parks",     href: "/guides?category=national-park" },
  { label: "City Guides",        href: "/guides?category=city" },
];

const resources = [
  { label: "Schedule Builder",    href: "/tools/schedule-builder" },
  { label: "Emergency Info Card", href: "/tools/emergency-card" },
  { label: "Resources Library",   href: "/resources" },
  { label: "FAQ",                 href: "/faq" },
];

const company = [
  { label: "About Us",          href: "/about" },
  { label: "Custom Itinerary",  href: "/custom" },
  { label: "Free Guide",        href: "/free-guide" },
  { label: "Privacy Policy",    href: "/privacy" },
  { label: "Terms of Service",  href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      {/* Newsletter Banner */}
      <div className="bg-terra">
        <div className="container-site py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display text-xl font-medium text-white">Get our free Sensory-Friendly Starter Guide</p>
            <p className="text-white/80 text-sm mt-1 font-light">Tips, checklists & destination insights delivered to your inbox.</p>
          </div>
          <form className="flex w-full md:w-auto gap-2" action="/api/subscribe" method="POST">
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              className="flex-1 md:w-72 px-4 py-3 rounded-full text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button type="submit" className="btn bg-white text-terra hover:bg-cream px-6 py-3 text-sm font-medium rounded-full whitespace-nowrap">
              Send It Free →
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                <span className="font-display italic text-white text-lg leading-none">A</span>
              </div>
              <p className="font-display font-medium text-white text-xl leading-none">
                The Able <em className="italic text-terra-200">Guide</em>
              </p>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed font-light mb-6 max-w-[260px]">
              Making travel accessible, predictable, and joyful for families of children with disabilities.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, href: "https://instagram.com/theableguide", label: "Instagram" },
                { icon: Facebook,  href: "https://facebook.com/theableguide",  label: "Facebook" },
                { icon: Youtube,   href: "https://youtube.com/@theableguide",  label: "YouTube" },
                { icon: Mail,      href: "mailto:hello@theableguide.com",      label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Guides */}
          <div>
            <p className="text-[11px] font-medium text-white/35 mb-4 uppercase tracking-[0.2em]">Guides</p>
            <ul className="space-y-2.5">
              {guides.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-[11px] font-medium text-white/35 mb-4 uppercase tracking-[0.2em]">Resources</p>
            <ul className="space-y-2.5">
              {resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-[11px] font-medium text-white/35 mb-4 uppercase tracking-[0.2em]">Company</p>
            <ul className="space-y-2.5">
              {company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-7 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} The Able Guide. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            Made with ♥ for every family who dared to try.
          </p>
        </div>
      </div>
    </footer>
  );
}
