import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Heart, Compass, ShieldCheck, Users } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story behind The Able Guide — why we started, who we are, and what drives us to help families travel with confidence.",
};

const values = [
  {
    icon: Heart,
    title: "Made by Families, for Families",
    description:
      "Our team includes parents of children with autism, sensory differences, and intellectual disabilities. We don't write from theory — we write from experience.",
    color: "bg-terra/10 text-terra",
  },
  {
    icon: ShieldCheck,
    title: "Honest & Independent",
    description:
      "We have no sponsorships, no affiliate relationships with parks or airlines. Our recommendations are based purely on what's best for your family.",
    color: "bg-navy/10 text-navy",
  },
  {
    icon: Compass,
    title: "Clinically Informed",
    description:
      "Our guides are reviewed by pediatric occupational therapists to ensure our sensory ratings and recommendations are accurate and clinically grounded.",
    color: "bg-teal/10 text-teal",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "We give back by making foundational resources free and maintaining a free starter guide that any family can access regardless of budget.",
    color: "bg-sage/10 text-sage",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-navy pt-32 pb-20">
        <div className="container-site text-center">
          <SectionLabel className="justify-center mb-4 text-white/60" color="terra">Our Story</SectionLabel>
          <h1 className="heading-xl text-white mb-4">We Started Where You Are Now</h1>
          <p className="body-lg text-white/70 max-w-2xl mx-auto">
            Staring at a browser full of generic travel blogs, wondering if there was
            anything written specifically for families like ours.
          </p>
        </div>
      </section>

      <div className="bg-navy">
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 40V20C360 0 720 40 1080 20C1260 10 1380 28 1440 32V40H0Z" fill="#FEFDF8" />
        </svg>
      </div>

      {/* Mission */}
      <section className="section-padding bg-cream">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[480px] rounded-3xl overflow-hidden shadow-card-hover">
              <Image
                src="/images/about-family-adventure.jpg"
                alt="Family with special needs child enjoying an outdoor adventure together"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div>
              <SectionLabel className="mb-4" color="terra">Our Mission</SectionLabel>
              <h2 className="heading-lg text-navy mb-6">
                Every Family Deserves a Guide That Actually Gets It
              </h2>
              <div className="space-y-4 text-charcoal-muted body-md">
                <p>
                  The Able Guide was born from a simple, maddening truth: when you&apos;re
                  planning a trip with a child who has autism or sensory differences,
                  the information you need doesn&apos;t exist in one place. You&apos;re
                  piecing it together from Facebook groups, Reddit threads, and
                  five-year-old blog posts.
                </p>
                <p>
                  We changed that. Our guides are built from the ground up for
                  families like yours — with real sensory ratings, real DAS
                  walkthroughs, real quiet spots, and real contingency plans for
                  when things don&apos;t go as expected.
                </p>
                <p>
                  We call ourselves The Able Guide because &ldquo;able&rdquo; is about
                  capability, not limitation. Your child is able. Your family is able.
                  With the right information, you can go anywhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding section-gradient">
        <div className="container-site">
          <div className="text-center mb-14">
            <SectionLabel className="justify-center mb-3" color="teal">What We Stand For</SectionLabel>
            <h2 className="heading-lg text-navy">Our Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((val) => (
              <div key={val.title} className="card-base p-8 flex gap-5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${val.color}`}>
                  <val.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-navy text-xl mb-2">{val.title}</h3>
                  <p className="text-charcoal-muted leading-relaxed">{val.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-navy text-center">
        <div className="container-site max-w-2xl">
          <h2 className="heading-lg text-white mb-4">Ready to Plan Your Next Adventure?</h2>
          <p className="text-white/70 body-md mb-8">
            Start with our free guide or dive straight into the destination that&apos;s
            been on your family&apos;s list.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/guides" className="btn-primary px-8 py-4 text-base">Browse All Guides</Link>
            <Link href="/free-guide" className="btn bg-white/15 border border-white/30 text-white hover:bg-white/25 rounded-full px-8 py-4 text-base font-semibold">
              Get Free Guide
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
