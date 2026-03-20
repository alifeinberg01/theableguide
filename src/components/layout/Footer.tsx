import Link from "next/link";
import { Compass, Mail, Instagram, Facebook, Youtube } from "lucide-react";

const guides = [
  { label: "Disney World Guide", href: "/guides/disney-world-sensory-guide" },
  { label: "Disneyland Guide",   href: "/guides/disneyland-accessibility-guide" },
  { label: "Universal Studios",  href: "/guides/universal-studios-accessibility" },
  { label: "Airport Guide",      href: "/guides/airport-flying-with-autism" },
  { label: "Cruise Guide",       href: "/guides/accessible-cruising-guide" },
  { label: "All Guides",         href: "/guides" },
];

const resources = [
  { label: "DAS Guide",           href: "/das-guide" },
  { label: "Schedule Builder",    href: "/tools/schedule-builder" },
  { label: "Emergency Info Card", href: "/tools/emergency-card" },
  { label: "Resources Library",   href: "/resources" },
  { label: "Blog",                href: "/blog" },
  { label: "FAQ",                 href: "/faq" },
];

const company = [
  { label: "About Us",          href: "/about" },
  { label: "Testimonials",      href: "/testimonials" },
  { label: "Custom Itinerary",  href: "/custom" },
  { label: "Free Guide",        href: "/free-guide" },
  { label: "Privacy Policy",    href: "/privacy" },
  { label: "Terms of Service",  href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* Newsletter Banner */}
      <div className="bg-terra">
        <div className="container-site py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display text-xl font-semibold text-white">Get our free Sensory-Friendly Starter Guide</p>
            <p className="text-white/80 text-sm mt-1">Tips, checklists & destination insights delivered to your inbox.</p>
          </div>
          <form className="flex w-full md:w-auto gap-2" action="/api/subscribe" method="POST">
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              className="flex-1 md:w-72 px-4 py-3 rounded-full text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button type="submit" className="btn bg-white text-terra hover:bg-cream px-6 py-3 text-sm font-semibold rounded-full whitespace-nowrap">
              Send It Free
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
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-white text-lg leading-none">The Able Guide</p>
                <p className="text-white/50 text-xs mt-0.5">Travel for Every Family</p>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Expert travel guides for families raising children with autism, sensory differences, and other disabilities. Because every family deserves to explore the world.
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
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Guides */}
          <div>
            <p className="font-semibold text-white mb-4 text-sm uppercase tracking-widest">Guides</p>
            <ul className="space-y-2.5">
              {guides.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/65 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="font-semibold text-white mb-4 text-sm uppercase tracking-widest">Resources</p>
            <ul className="space-y-2.5">
              {resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/65 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="font-semibold text-white mb-4 text-sm uppercase tracking-widest">Company</p>
            <ul className="space-y-2.5">
              {company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/65 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/45 text-sm">
            © {new Date().getFullYear()} The Able Guide. All rights reserved.
          </p>
          <p className="text-white/45 text-sm">
            Made with ♥ for families who explore
          </p>
        </div>
      </div>
    </footer>
  );
}
