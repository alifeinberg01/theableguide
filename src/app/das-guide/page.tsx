import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, AlertCircle, Video, MapPin, Clock, ArrowRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Disney Disability Access Service (DAS) Guide",
  description:
    "The most complete free guide to Disney's DAS program — who qualifies, how to register, and strategies for using it effectively at both Walt Disney World and Disneyland.",
};

const steps = [
  {
    step: "1",
    title: "Schedule Your Video Chat",
    description:
      "Up to 30 days before your visit, go to Disney's DAS pre-registration page and schedule a video chat. Appointment slots fill fast — book early.",
    icon: Video,
  },
  {
    step: "2",
    title: "Speak with a Cast Member",
    description:
      "A trained cast member will ask you to describe — in plain language — why your child has difficulty waiting in a conventional queue. Be honest and specific. You do not need documentation.",
    icon: AlertCircle,
  },
  {
    step: "3",
    title: "Receive Your DAS + 2 Advance Selections",
    description:
      "If approved, DAS is linked to your My Disney Experience account. You'll also receive 2 DAS Advance selections per day for top attractions — book these during registration.",
    icon: CheckCircle,
  },
  {
    step: "4",
    title: "Use DAS at the Park",
    description:
      "At any attraction, tap your MagicBand or app to receive a return time (equal to the current wait minus 10 minutes). Return at that time and enter via the Lightning Lane.",
    icon: MapPin,
  },
];

const tips = [
  {
    title: "Be Specific About Behavior, Not Diagnosis",
    body: "Telling a cast member \"my child has autism\" is less effective than \"my child cannot tolerate unpredictable waiting environments and will have a meltdown if made to wait in a queue longer than 5-10 minutes.\" Focus on the functional impact.",
  },
  {
    title: "Pre-Register — Don't Wait Until Arrival",
    body: "The video chat registration system means you no longer need to wait at a physical Guest Relations window. Do it from your couch, 30 days out. This also means your DAS Advance selections are set before you even arrive.",
  },
  {
    title: "Use DAS Advance Selections Strategically",
    body: "Your two daily DAS Advance selections are best used for the highest-demand attractions — think Seven Dwarfs Mine Train, Tiana's Bayou Adventure, or Guardians of the Galaxy at EPCOT. Book these during registration.",
  },
  {
    title: "DAS Doesn't Mean Skipping the Wait Entirely",
    body: "DAS gives you a return time equal to the current standby wait minus 10 minutes. You'll wait that time somewhere else (ideally somewhere calmer) and then return. It's not instantaneous access.",
  },
  {
    title: "Rider Switch Works Alongside DAS",
    body: "If one parent needs to stay with a non-riding child, Rider Switch allows the waiting parent to ride afterward without a full wait. Combine this with DAS for maximum flexibility.",
  },
];

export default function DASGuidePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy pt-32 pb-0 overflow-hidden">
        <div className="container-site py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel className="mb-4 text-white/60" color="teal">Free Resource</SectionLabel>
              <h1 className="heading-xl text-white mb-4">
                The Complete DAS Guide
              </h1>
              <p className="body-lg text-white/75 mb-6">
                Disney&apos;s Disability Access Service explained — who qualifies,
                how to register, and how to use it to give your child the best
                possible theme park experience.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/guides/disney-world-sensory-guide" className="btn-primary px-8 py-4">
                  Full Disney World Guide <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="relative h-80 lg:h-96 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/das-guide-hero.jpg"
                alt="Family using the Lightning Lane entrance at a Disney theme park"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 40V20C360 0 720 40 1080 20C1260 10 1380 28 1440 32V40H0Z" fill="#FEFDF8" />
        </svg>
      </section>

      {/* What is DAS */}
      <section className="section-padding bg-cream">
        <div className="container-site max-w-4xl">
          <SectionLabel className="mb-4" color="terra">What is DAS?</SectionLabel>
          <h2 className="heading-lg text-navy mb-6">Understanding Disney&apos;s Disability Access Service</h2>
          <div className="space-y-4 body-md text-charcoal-muted mb-10">
            <p>
              Disney&apos;s Disability Access Service (DAS) is an accommodation designed for guests
              who have difficulty tolerating extended waits in a conventional queue environment
              due to a disability. Rather than waiting in a standard line, guests with DAS
              receive a return time for attractions and can wait elsewhere — ideally somewhere
              less overwhelming.
            </p>
            <p>
              In 2024, Disney significantly updated DAS. The program now focuses specifically
              on guests with <strong>developmental disabilities</strong> — autism spectrum
              disorder being the primary qualifying condition. Guests with mobility, visual,
              or hearing impairments are directed to separate, more targeted accommodations.
            </p>
            <p>
              DAS is available at both Walt Disney World (Orlando) and Disneyland Resort
              (Anaheim). Registration is now done via video chat — no more standing in line
              at Guest Relations.
            </p>
          </div>

          {/* Who qualifies */}
          <div className="bg-teal/5 border border-teal/20 rounded-2xl p-8 mb-12">
            <h3 className="font-display font-semibold text-teal-700 text-xl mb-4">Who Qualifies for DAS?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-semibold text-navy mb-3">Typically Qualifies:</p>
                <ul className="space-y-2">
                  {["Autism spectrum disorder", "Intellectual disability with behavioral dysregulation in queue environments", "ADHD with severe impulse control challenges in wait situations", "Other developmental disabilities causing functional difficulty with conventional queuing"].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-charcoal">
                      <CheckCircle className="w-4 h-4 text-sage mt-0.5 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-navy mb-3">Directed to Other Accommodations:</p>
                <ul className="space-y-2">
                  {["Mobility impairments (wheelchair-accessible queues)", "Visual impairments (audio description devices)", "Hearing impairments (handheld captioning)", "Medical conditions that primarily cause physical limitations"].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-charcoal">
                      <AlertCircle className="w-4 h-4 text-amber mt-0.5 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Steps */}
          <h2 className="heading-lg text-navy mb-8">How to Register for DAS</h2>
          <div className="space-y-6 mb-12">
            {steps.map((step) => (
              <div key={step.step} className="card-base p-6 flex gap-5">
                <div className="w-12 h-12 rounded-2xl bg-navy flex items-center justify-center shrink-0">
                  <step.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-charcoal-muted uppercase tracking-widest mb-1">
                    Step {step.step}
                  </p>
                  <h3 className="font-display font-semibold text-navy text-lg mb-2">{step.title}</h3>
                  <p className="text-charcoal-muted text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pro Tips */}
          <h2 className="heading-lg text-navy mb-8">DAS Pro Tips</h2>
          <div className="space-y-5">
            {tips.map((tip) => (
              <div key={tip.title} className="card-base p-6 border-l-4 border-terra">
                <h3 className="font-semibold text-navy text-lg mb-2">{tip.title}</h3>
                <p className="text-charcoal-muted text-sm leading-relaxed">{tip.body}</p>
              </div>
            ))}
          </div>

          {/* Upgrade CTA */}
          <div className="mt-16 bg-navy rounded-3xl p-10 text-center">
            <h3 className="font-display font-bold text-white text-2xl mb-3">
              Ready for the Full Disney World or Disneyland Guide?
            </h3>
            <p className="text-white/70 mb-8">
              Get park-by-park sensory ratings, quiet zone maps, sample itineraries,
              and everything else your family needs for an unforgettable trip.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/guides/disney-world-sensory-guide" className="btn-primary px-8 py-4">
                Disney World Guide — $24
              </Link>
              <Link href="/guides/disneyland-accessibility-guide" className="btn bg-white/15 border border-white/25 text-white hover:bg-white/25 rounded-full px-8 py-4 font-semibold">
                Disneyland Guide — $22
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
