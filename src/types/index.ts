// ─── Guide / Itinerary ───────────────────────────────────────────────────────

export type GuideCategory =
  | "theme-park"
  | "airport"
  | "cruise"
  | "resort"
  | "national-park"
  | "city";

export type GuideTag =
  | "autism"
  | "sensory"
  | "wheelchair"
  | "DAS"
  | "beginner"
  | "advanced"
  | "free"
  | "popular";

export interface GuideSection {
  title: string;
  content: string;
  tips?: string[];
  image?: string;
  imageAlt?: string;
}

export interface Guide {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: GuideCategory;
  tags: GuideTag[];
  coverImage: string;
  coverImageAlt: string;
  price: number | "free";
  stripeProductId?: string;
  stripePriceId?: string;
  featured: boolean;
  publishedAt: string;
  readTime: number; // minutes
  sections: GuideSection[];
  highlights: string[];
  includes: string[];
  destination: string;
}

// ─── Blog ────────────────────────────────────────────────────────────────────

export type BlogCategory =
  | "tips"
  | "destinations"
  | "gear"
  | "real-stories"
  | "planning"
  | "advocacy";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  tags: string[];
  coverImage: string;
  coverImageAlt: string;
  author: string;
  publishedAt: string;
  readTime: number;
  featured: boolean;
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "general" | "guides" | "custom" | "accessibility" | "payment";
}

// ─── Resource ────────────────────────────────────────────────────────────────

export type ResourceType =
  | "link"
  | "checklist"
  | "template"
  | "tool"
  | "organization";

export interface Resource {
  id: string;
  title: string;
  description: string;
  url?: string;
  type: ResourceType;
  category: string;
  tags: string[];
  free: boolean;
}

// ─── Testimonial ─────────────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  guideTitle?: string;
  avatarInitials: string;
  date: string;
}

// ─── Schedule Builder ────────────────────────────────────────────────────────

export interface ScheduleBlock {
  id: string;
  time: string;
  activity: string;
  duration: number; // minutes
  notes?: string;
  color: string;
  icon?: string;
}

// ─── Stripe / Commerce ───────────────────────────────────────────────────────

export interface CartItem {
  guideId: string;
  title: string;
  price: number;
  stripePriceId: string;
}

export interface CheckoutSession {
  sessionId: string;
  url: string;
}
