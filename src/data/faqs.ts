import type { FAQItem } from "@/types";

export const faqs: FAQItem[] = [
  // General
  {
    id: "g1",
    category: "general",
    question: "What is The Able Guide?",
    answer:
      "The Able Guide is a travel resource created specifically for families raising children with autism, sensory processing differences, intellectual disabilities, and other special needs. We create expert-written travel guides, free tools, and planning resources that take the guesswork out of family adventures — so you can focus on making memories.",
  },
  {
    id: "g2",
    category: "general",
    question: "Who creates The Able Guide content?",
    answer:
      "Our guides are written by a team that includes parents of children with autism and sensory differences, pediatric occupational therapists, and experienced travel planners who specialize in accessible family travel. Every recommendation is based on real-world testing, not just research.",
  },
  {
    id: "g3",
    category: "general",
    question: "Do I need to share my child's diagnosis to use your guides?",
    answer:
      "Absolutely not. Our guides are designed to be useful for any family navigating travel with a child who has sensory or accessibility needs. You don't need to share any personal information to purchase or use our guides.",
  },
  {
    id: "g4",
    category: "general",
    question: "Is The Able Guide affiliated with Disney, Universal, or any travel company?",
    answer:
      "No. The Able Guide is fully independent. We are not affiliated with, sponsored by, or endorsed by any theme park, airline, cruise line, or travel company. This independence allows us to give you honest, unfiltered information.",
  },

  // Guides
  {
    id: "guide1",
    category: "guides",
    question: "What format are the guides delivered in?",
    answer:
      "All guides are delivered as downloadable PDFs. They're optimized for both on-screen reading and printing. Many families print and laminate key pages (like sensory ride rating charts) to take with them to the parks.",
  },
  {
    id: "guide2",
    category: "guides",
    question: "How often are the guides updated?",
    answer:
      "We update our guides whenever there are significant changes — new DAS policies, ride openings or closures, accessibility program updates. When you purchase a guide, you get lifetime access to all future updates at no additional cost.",
  },
  {
    id: "guide3",
    category: "guides",
    question: "Can I share my purchased guide with other families?",
    answer:
      "Our guides are licensed for personal use within your household. We ask that you don't distribute them publicly or share them in Facebook groups or forums — it directly affects our ability to keep creating free content and updated guides. That said, sharing with a close family member or caregiver for the same trip is totally fine.",
  },
  {
    id: "guide4",
    category: "guides",
    question: "What if the guide doesn't have what I needed?",
    answer:
      "We offer a 30-day money-back guarantee, no questions asked. Just email us at hello@theableguide.com with your order number and we'll process your refund promptly.",
  },
  {
    id: "guide5",
    category: "guides",
    question: "Is there a free guide I can try first?",
    answer:
      "Yes! Our Sensory-Friendly Travel Starter Guide is completely free. It covers the foundational strategies — packing, preparation, managing transitions, and what to do when things go sideways — and gives you a great sense of how our paid guides are structured.",
  },

  // Custom Itineraries
  {
    id: "custom1",
    category: "custom",
    question: "What is a custom itinerary?",
    answer:
      "A custom itinerary is a personalized travel plan built specifically for your child and your destination. You tell us about your child's specific needs, your travel dates, your destination, and your family's goals — and we create a detailed, day-by-day plan tailored to your situation. Think of it as having an expert travel planner who specializes in your child's exact needs.",
  },
  {
    id: "custom2",
    category: "custom",
    question: "How long does a custom itinerary take?",
    answer:
      "We deliver custom itineraries within 5–7 business days of receiving your completed intake form. Rush delivery (2–3 business days) is available for an additional fee. We'll confirm your delivery timeline when you place your order.",
  },
  {
    id: "custom3",
    category: "custom",
    question: "What information do I need to provide?",
    answer:
      "When you place a custom itinerary order, you'll fill out a detailed intake form covering: your destination and travel dates, your child's age, diagnoses, and specific sensory/accessibility needs, your family's travel experience level, must-haves and non-negotiables, and your daily budget range. The more detail you provide, the better we can tailor the plan.",
  },
  {
    id: "custom4",
    category: "custom",
    question: "What does a custom itinerary include?",
    answer:
      "A custom itinerary includes a day-by-day schedule with specific timing recommendations, attraction and restaurant picks tailored to your child's sensory profile, accommodation recommendations, transportation logistics, a packing checklist specific to your destination, and a contingency plan for difficult moments. Most custom itineraries are 15–25 pages.",
  },

  // Accessibility
  {
    id: "acc1",
    category: "accessibility",
    question: "What is the Disability Access Service (DAS) at Disney?",
    answer:
      "Disney's Disability Access Service (DAS) is an accommodation for guests with developmental disabilities (primarily autism) who have difficulty tolerating extended waits in conventional queues. It provides a return time for attractions rather than requiring you to wait in the standard line. DAS now requires pre-registration via video chat up to 30 days before your visit.",
  },
  {
    id: "acc2",
    category: "accessibility",
    question: "Does my child need an official diagnosis to qualify for DAS or other park accommodations?",
    answer:
      "No park or attraction requires a diagnosis. They ask you to describe your child's needs and how conventional queuing creates difficulty. That said, having a clear, honest explanation ready — based on your child's specific behaviors — is the most important preparation you can do.",
  },
  {
    id: "acc3",
    category: "accessibility",
    question: "What is the Hidden Disabilities Sunflower program?",
    answer:
      "The Sunflower is an internationally recognized symbol of hidden disability. Wearing a Sunflower lanyard (available free at participating airports and venues) signals to trained staff that you or your child may need additional support, without requiring you to explain publicly. The program is growing rapidly in US airports and attractions.",
  },

  // Payment
  {
    id: "pay1",
    category: "payment",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover) through our secure payment processor, Stripe. We do not store your card information.",
  },
  {
    id: "pay2",
    category: "payment",
    question: "Is my payment secure?",
    answer:
      "Yes. All payments are processed through Stripe, which is PCI DSS Level 1 certified — the highest level of security certification available in the payments industry. Your card details are encrypted and never touch our servers.",
  },
  {
    id: "pay3",
    category: "payment",
    question: "Do you offer refunds?",
    answer:
      "Yes. We offer a 30-day money-back guarantee on all guide purchases. For custom itineraries, we offer a full refund if you cancel before we begin work, and a 50% refund if cancelled within 24 hours of placing the order. Contact us at hello@theableguide.com.",
  },
];

export function getFAQsByCategory(category: string): FAQItem[] {
  return faqs.filter((f) => f.category === category);
}

export const faqCategories = [
  { id: "general",       label: "General" },
  { id: "guides",        label: "Guides & Downloads" },
  { id: "custom",        label: "Custom Itineraries" },
  { id: "accessibility", label: "Accessibility Programs" },
  { id: "payment",       label: "Payment & Refunds" },
];
