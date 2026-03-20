import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, ShieldCheck, FileText } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-family-theme-park.jpg"
          alt="Happy family with child wearing Mickey ears at a theme park"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-site w-full pt-24 pb-20">
        <div className="max-w-3xl">
          {/* Label */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-2 mb-8">
            <Star className="w-3.5 h-3.5 text-amber fill-amber" />
            <span className="text-white text-xs font-semibold tracking-wide uppercase">
              Trusted by 10,000+ families
            </span>
          </div>

          {/* Headline */}
          <h1 className="heading-xl text-white mb-6">
            Every Family Deserves
            <br />
            <span className="text-amber-300">to Explore the World.</span>
          </h1>

          <p className="body-lg text-white/85 mb-10 max-w-xl">
            Expert travel guides for families raising children with autism,
            sensory differences, and other disabilities. Theme parks, airports,
            cruises — planned with care, written by people who get it.
          </p>

          {/* CTA Row */}
          <div className="flex flex-wrap gap-4 mb-14">
            <Link
              href="/guides"
              className="btn-primary px-8 py-4 text-base shadow-lg group"
            >
              Browse All Guides
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/free-guide"
              className="btn inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white hover:bg-white/25 px-8 py-4 text-base rounded-full font-semibold"
            >
              <FileText className="w-4 h-4" />
              Free Starter Guide
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-6">
            {[
              { icon: ShieldCheck, text: "30-Day Money-Back Guarantee" },
              { icon: Star,        text: "4.9 / 5 Average Rating" },
              { icon: FileText,    text: "Lifetime Guide Updates" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white/80">
                <Icon className="w-4 h-4 text-amber-300" />
                <span className="text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 inset-x-0 z-10">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80V40C360 0 720 80 1080 40C1260 20 1380 48 1440 56V80H0Z" fill="#FEFDF8" />
        </svg>
      </div>
    </section>
  );
}
