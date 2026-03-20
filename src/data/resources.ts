import type { Resource } from "@/types";

export const resources: Resource[] = [
  {
    id: "r1",
    title: "TSA Cares Helpline",
    description:
      "Call 72 hours before your flight to request a Passenger Support Specialist who will guide your family through airport security at no charge.",
    url: "https://www.tsa.gov/travel/passenger-support",
    type: "organization",
    category: "Airports & Flying",
    tags: ["airport", "TSA", "security", "free"],
    free: true,
  },
  {
    id: "r2",
    title: "Disney DAS Pre-Registration",
    description:
      "Register for Disney's Disability Access Service via video chat up to 30 days before your visit to Walt Disney World or Disneyland.",
    url: "https://disneyworld.disney.go.com/guest-services/disability-access-service/",
    type: "link",
    category: "Theme Parks",
    tags: ["Disney", "DAS", "autism", "theme-park"],
    free: true,
  },
  {
    id: "r3",
    title: "Hidden Disabilities Sunflower Program",
    description:
      "Find participating airports, venues, and retailers where staff are trained to recognize the Sunflower lanyard and offer discreet support.",
    url: "https://hiddendisabilitiesstore.com",
    type: "organization",
    category: "Universal Tools",
    tags: ["sunflower", "hidden-disability", "airports", "global"],
    free: true,
  },
  {
    id: "r4",
    title: "Autism Travel (Official Directory)",
    description:
      "A directory of Certified Autism Centers (CAC) — hotels, theme parks, and attractions that have undergone autism sensitivity training and certification.",
    url: "https://autismtravel.com",
    type: "organization",
    category: "Universal Tools",
    tags: ["CAC", "certified", "directory", "hotels"],
    free: true,
  },
  {
    id: "r5",
    title: "Universal Attraction Assistance Pass",
    description:
      "Information on Universal's AAP program for guests with disabilities — obtain at Guest Services on the day of your visit.",
    url: "https://www.universalorlando.com/web/en/us/plan-your-visit/accessibility",
    type: "link",
    category: "Theme Parks",
    tags: ["Universal", "AAP", "autism", "accessibility"],
    free: true,
  },
  {
    id: "r6",
    title: "Social Story Creator (Do2Learn)",
    description:
      "Free social story resources and templates for preparing children with autism for new environments and travel experiences.",
    url: "https://do2learn.com",
    type: "tool",
    category: "Preparation",
    tags: ["social-stories", "autism", "preparation", "free"],
    free: true,
  },
  {
    id: "r7",
    title: "Morgan's Wonderland",
    description:
      "The world's first ultra-accessible theme park, built specifically for people of all abilities in San Antonio, TX. Free admission for those with special needs.",
    url: "https://www.morganswonderland.com",
    type: "organization",
    category: "Destinations",
    tags: ["theme-park", "accessible", "Texas", "free-admission"],
    free: true,
  },
  {
    id: "r8",
    title: "Sesame Place Philadelphia",
    description:
      "The first theme park in the US to earn the Certified Autism Center designation, with dedicated sensory spaces and trained staff.",
    url: "https://sesameplace.com/philadelphia",
    type: "organization",
    category: "Destinations",
    tags: ["theme-park", "autism-certified", "kids", "Sesame"],
    free: false,
  },
  {
    id: "r9",
    title: "IBCCES Sensory Guide App",
    description:
      "The Sensory Guide app provides sensory ratings and accessibility information for thousands of attractions worldwide, maintained by IBCCES.",
    url: "https://ibcces.org/sensory-guide/",
    type: "tool",
    category: "Universal Tools",
    tags: ["app", "sensory", "ratings", "attractions"],
    free: true,
  },
  {
    id: "r10",
    title: "Beaches STAR Program",
    description:
      "Beaches Resorts' Sensory Timely Action Resources (STAR) program — trained staff, sensory spaces, and modified programming for families with autism and sensory differences.",
    url: "https://beaches.com/blog/autism-friendly-beaches/",
    type: "organization",
    category: "Resorts & Hotels",
    tags: ["resort", "all-inclusive", "Caribbean", "autism-trained"],
    free: false,
  },
  {
    id: "r11",
    title: "National Park Access Pass",
    description:
      "Free lifetime pass to all US National Parks, Federal Recreational Lands, and other federal sites for US citizens or permanent residents with permanent disabilities.",
    url: "https://store.usgs.gov/access-pass",
    type: "organization",
    category: "Destinations",
    tags: ["national-parks", "free", "lifetime-pass", "federal"],
    free: true,
  },
  {
    id: "r12",
    title: "Packing List: The Sensory Travel Kit",
    description:
      "Our comprehensive, downloadable packing checklist for building a complete sensory travel kit for any destination.",
    url: "/blog/packing-list-sensory-travel-kit",
    type: "checklist",
    category: "Preparation",
    tags: ["packing", "checklist", "sensory-kit", "free"],
    free: true,
  },
];

export function getResourcesByCategory(category: string): Resource[] {
  return resources.filter((r) => r.category === category);
}

export const resourceCategories = [
  "All",
  "Airports & Flying",
  "Theme Parks",
  "Resorts & Hotels",
  "Destinations",
  "Universal Tools",
  "Preparation",
];
