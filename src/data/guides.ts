import type { Guide } from "@/types";

export const guides: Guide[] = [
  {
    id: "1",
    slug: "disney-world-sensory-guide",
    title: "Walt Disney World: The Complete Sensory & Accessibility Guide",
    subtitle: "Everything you need for a magical, meltdown-free trip",
    description:
      "A comprehensive guide covering Disney's Disability Access Service (DAS), sensory-friendly shows, quiet spaces, rider switch passes, and day-by-day strategies for families navigating the Most Magical Place on Earth.",
    category: "theme-park",
    tags: ["autism", "sensory", "DAS", "popular", "wheelchair"],
    coverImage: "/images/guides/disney-world-cover.jpg",
    coverImageAlt: "Cinderella Castle at Walt Disney World lit up at night",
    price: 24,
    stripeProductId: "prod_disney_world",
    stripePriceId: "price_disney_world_24",
    featured: true,
    publishedAt: "2024-11-01",
    readTime: 45,
    destination: "Orlando, FL",
    highlights: [
      "Step-by-step DAS registration walkthrough",
      "Park-by-park sensory ratings for every ride",
      "Hidden quiet spots in each park",
      "Best times to visit each attraction",
      "Rider Switch & return-time strategies",
      "Recommended accommodations on and off property",
    ],
    includes: [
      "Full PDF guide (50+ pages)",
      "Printable sensory map",
      "Day-by-day sample itineraries",
      "Emergency information card template",
      "Packing checklist",
      "Lifetime updates",
    ],
    sections: [
      {
        title: "Understanding Disney's Disability Access Service (DAS)",
        content:
          "Disney's DAS program is designed to accommodate guests who have difficulty tolerating extended waits in a conventional queue due to a disability. In 2024, Disney updated DAS to focus on guests with developmental disabilities — autism being the primary qualifying condition. Registration is done via video chat or in-park at Guest Relations.",
        tips: [
          "Pre-register via video chat up to 30 days in advance to save time at the park.",
          "Have a brief, honest explanation of your child's challenges ready — you don't need a diagnosis letter.",
          "DAS now grants a return time equal to the current wait minus 10 minutes, then you join the Lightning Lane queue.",
        ],
        image: "/images/guides/disney-das-registration.jpg",
        imageAlt: "Guest Relations window at Disney World where DAS is registered",
      },
      {
        title: "Magic Kingdom: Sensory Breakdown",
        content:
          "Magic Kingdom is the most visited park and can be the most overwhelming, but with the right strategy it's deeply rewarding. The key is front-loading your morning, using DAS return times strategically, and knowing your retreat spots.",
        tips: [
          "Arrive 30 minutes before rope drop — the crowd energy is manageable and Main Street is calm.",
          "Space Mountain is dark with sudden turns and loud sound effects — rate: HIGH sensory.",
          "The Hall of Presidents is a reliable cool, dark, quiet retreat with short queues.",
          "Fantasyland characters have quieter meet-and-greets early in the morning.",
        ],
        image: "/images/guides/space-mountain-exterior.jpg",
        imageAlt: "Space Mountain at Magic Kingdom, Walt Disney World",
      },
      {
        title: "EPCOT: The Sensory Sweet Spot",
        content:
          "EPCOT tends to be the most sensory-friendly of the four parks. World Showcase offers open outdoor spaces, international food, and cultural exploration with minimal coercive queuing.",
        tips: [
          "Guardians of the Galaxy: Cosmic Rewind uses an omni-mover system — no sudden drops but the dark launch may surprise.",
          "The World Showcase opens at 11am — morning is the best time for rides in Future World.",
          "Test Track is high sensory (loud, fast, bright lights at the end). Use the stationary simulator option.",
        ],
        image: "/images/guides/epcot-world-showcase.jpg",
        imageAlt: "EPCOT World Showcase at sunset with the globe and fireworks",
      },
      {
        title: "Hollywood Studios & Animal Kingdom",
        content:
          "Hollywood Studios is thrills-focused — Slinky Dog Dash and the Millennium Falcon: Smugglers Run are lower-intensity favorites. Animal Kingdom offers incredible natural settings and is often the least crowded early in the day.",
        tips: [
          "Slinky Dog Dash: moderate sensory, great starter coaster for nervous riders.",
          "Avatar Flight of Passage: intense sensory simulation — preview YouTube videos at home first.",
          "Animal Kingdom's Gorilla Falls Trail is a free-roaming, low-pressure experience families love.",
        ],
        image: "/images/guides/animal-kingdom-gorilla-trail.jpg",
        imageAlt: "Lush trail at Animal Kingdom with guests exploring wildlife exhibits",
      },
    ],
  },
  {
    id: "2",
    slug: "disneyland-accessibility-guide",
    title: "Disneyland Resort: Complete Accessibility & Sensory Guide",
    subtitle: "Navigating the Original Magic Kingdom with confidence",
    description:
      "From DAS registration to quiet corners of Fantasyland, this guide covers everything your family needs for a successful trip to Disneyland and Disney California Adventure.",
    category: "theme-park",
    tags: ["autism", "sensory", "DAS", "popular"],
    coverImage: "/images/guides/disneyland-cover.jpg",
    coverImageAlt: "Sleeping Beauty Castle at Disneyland during the day",
    price: 22,
    stripeProductId: "prod_disneyland",
    stripePriceId: "price_disneyland_22",
    featured: true,
    publishedAt: "2024-10-15",
    readTime: 40,
    destination: "Anaheim, CA",
    highlights: [
      "DAS strategy for both parks in one day",
      "Sensory ratings for every major attraction",
      "Best quiet zones and sensory breaks",
      "Hotel recommendations near the parks",
      "Character dining with lower sensory demand",
      "California Adventure bonus strategies",
    ],
    includes: [
      "Full PDF guide (45+ pages)",
      "Printable park maps with sensory notes",
      "Sample 2-day itinerary",
      "Emergency information card template",
      "Packing checklist",
      "Lifetime updates",
    ],
    sections: [
      {
        title: "DAS at Disneyland",
        content:
          "Disneyland's DAS functions the same as Walt Disney World's — register via video chat or at the park at City Hall on Main Street. The smaller footprint of Disneyland means DAS return times are typically shorter.",
        tips: [
          "City Hall opens at park opening — arrive early to avoid a line.",
          "Disneyland's smaller size means shorter return windows and faster park crossings.",
          "Both parks (Disneyland and DCA) are covered under a single DAS registration.",
        ],
        image: "/images/guides/disneyland-city-hall.jpg",
        imageAlt: "City Hall on Main Street U.S.A. at Disneyland where DAS is registered",
      },
      {
        title: "Fantasyland: The Heart of Sensory Planning",
        content:
          "Fantasyland is the most popular area for young children and can become extremely crowded by midday. The rides are generally low-sensory with the exception of Mr. Toad's Wild Ride (dark, chaotic imagery) and the Matterhorn (loud, cold, fast).",
        tips: [
          "Peter Pan's Flight: moderate wait, worth DAS — soaring and dark but very gentle.",
          "It's a Small World: near-zero sensory load, great cool-down experience.",
          "Matterhorn: HIGH sensory — loud roar, Yeti appearance, water mist, fast drops.",
        ],
        image: "/images/guides/disneyland-fantasyland.jpg",
        imageAlt: "Fantasyland at Disneyland with the Matterhorn in the background",
      },
    ],
  },
  {
    id: "3",
    slug: "airport-flying-with-autism",
    title: "Flying with Autism & Sensory Differences: The Airport Survival Guide",
    subtitle: "From security to landing — a family travel blueprint",
    description:
      "Airports and airplanes are one of the most challenging environments for children with autism and sensory differences. This guide breaks down every step of the journey with concrete strategies, TSA tips, and airline accommodations.",
    category: "airport",
    tags: ["autism", "sensory", "beginner"],
    coverImage: "/images/guides/airport-cover.jpg",
    coverImageAlt: "Family with child walking through a bright airport terminal",
    price: 18,
    stripeProductId: "prod_airport",
    stripePriceId: "price_airport_18",
    featured: true,
    publishedAt: "2024-09-20",
    readTime: 35,
    destination: "All Airports",
    highlights: [
      "TSA Cares program walkthrough",
      "Airline pre-boarding & accommodation requests",
      "Sensory kit packing list",
      "Managing meltdowns at altitude",
      "Gate area strategies to reduce overwhelm",
      "Hidden Disabilities Sunflower lanyard program",
    ],
    includes: [
      "Full PDF guide (40+ pages)",
      "Printable TSA communication card",
      "Airline accommodation request letter template",
      "Sensory travel kit checklist",
      "Emergency information card template",
      "Lifetime updates",
    ],
    sections: [
      {
        title: "TSA Cares: Your Pre-Flight Secret Weapon",
        content:
          "TSA Cares is a free helpline that connects travelers with disabilities to a Passenger Support Specialist who will walk you through security. Call 72 hours before departure. This one step dramatically reduces airport stress.",
        tips: [
          "Call TSA Cares at 1-855-787-2227 at least 72 hours before your flight.",
          "Request a dedicated support specialist who will meet you at security.",
          "You are never required to disclose a diagnosis — explaining behavior is sufficient.",
        ],
        image: "/images/guides/tsa-security-checkpoint.jpg",
        imageAlt: "TSA security checkpoint at a US airport with open lanes",
      },
      {
        title: "Pre-Boarding & Airline Accommodations",
        content:
          "Every major US airline is required under the Air Carrier Access Act to provide certain accommodations for passengers with disabilities. Pre-boarding is one of the most impactful — boarding early removes the crowd stress and lets your child settle.",
        tips: [
          "Call the airline's disability desk (not general reservations) to pre-arrange accommodations.",
          "Request a bulkhead row for extra legroom and fewer passengers directly in front.",
          "Southwest allows \"special assistance\" pre-boarding — ask at the gate.",
        ],
        image: "/images/guides/airline-boarding.jpg",
        imageAlt: "Family pre-boarding an airplane at a departure gate",
      },
      {
        title: "The Hidden Disabilities Sunflower Program",
        content:
          "The Sunflower Lanyard is an internationally recognized symbol indicating a hidden disability. Growing numbers of US airports now participate, and staff are trained to offer discreet assistance when they see the lanyard.",
        tips: [
          "Request a free Sunflower lanyard at participating airport information desks.",
          "The lanyard signals staff without requiring you to explain your situation publicly.",
          "Check hiddendisabilitiesstore.com for a list of participating airports.",
        ],
        image: "/images/guides/sunflower-lanyard.jpg",
        imageAlt: "Close-up of the Hidden Disabilities Sunflower lanyard",
      },
    ],
  },
  {
    id: "4",
    slug: "universal-studios-accessibility",
    title: "Universal Studios: Accessibility & Sensory Guide",
    subtitle: "Islands of Adventure, Epic Universe & Hollywood covered",
    description:
      "Universal's Attraction Assistance Pass (AAP) explained, sensory ratings for every major ride, and how to handle the intense theming that Universal is known for — all tailored for families with children on the spectrum.",
    category: "theme-park",
    tags: ["autism", "sensory", "DAS", "advanced"],
    coverImage: "/images/guides/universal-cover.jpg",
    coverImageAlt: "Hogwarts Castle at Universal's Islands of Adventure",
    price: 22,
    stripeProductId: "prod_universal",
    stripePriceId: "price_universal_22",
    featured: false,
    publishedAt: "2024-10-01",
    readTime: 38,
    destination: "Orlando, FL & Hollywood, CA",
    highlights: [
      "Attraction Assistance Pass (AAP) deep dive",
      "Harry Potter area sensory breakdown",
      "Epic Universe preview & accessibility plans",
      "High-intensity vs. low-intensity ride split",
      "Best quiet zones and sensory retreats",
      "Hollywood vs. Orlando comparison",
    ],
    includes: [
      "Full PDF guide (42+ pages)",
      "Printable sensory ride ratings chart",
      "Sample itinerary for Islands of Adventure",
      "Emergency information card template",
      "Packing checklist",
      "Lifetime updates",
    ],
    sections: [
      {
        title: "Universal's Attraction Assistance Pass",
        content:
          "Universal's AAP is similar to Disney's DAS — it provides return times so guests with disabilities can experience attractions without waiting in standard queues. Unlike Disney, Universal's AAP does not require pre-registration and is obtained at the park on the day of your visit.",
        tips: [
          "Visit Guest Services at the front of the park first thing in the morning.",
          "Bring any supporting documentation that helps describe your child's needs — not required but can help.",
          "AAP at Universal grants a return time and then directs you to the Express entrance.",
        ],
        image: "/images/guides/universal-guest-services.jpg",
        imageAlt: "Universal Studios Guest Services desk near the park entrance",
      },
      {
        title: "The Wizarding World of Harry Potter",
        content:
          "The Wizarding World is immersive, atmospheric, and visually dense — which makes it simultaneously magical and challenging for sensory-sensitive guests. The cobblestone streets, ambient audio, and dense crowds of Hogsmeade can build quickly.",
        tips: [
          "Visit Hogsmeade at rope drop before the atmospheric audio is turned up to full volume.",
          "Hagrid's Motorbike: HIGH sensory — outdoor coaster with physical theming, creatures, and multi-sensory effects.",
          "Flight of the Hippogriff: moderate — short outdoor coaster, good first roller coaster for tentative riders.",
          "Harry Potter and the Forbidden Journey: VERY HIGH — moving theater with dementors, spiders, dragons.",
        ],
        image: "/images/guides/hogwarts-castle-universal.jpg",
        imageAlt: "Hogwarts Castle at night at Universal's Islands of Adventure",
      },
    ],
  },
  {
    id: "5",
    slug: "accessible-cruising-guide",
    title: "Accessible Family Cruising: The Complete Planning Guide",
    subtitle: "Choosing the right ship, cabin, and itinerary for your family",
    description:
      "Cruise ships can be surprisingly accessible for families with disabilities — when you know what to look for. This guide covers cabin selection, cruise line accessibility programs, port excursion planning, and onboard sensory strategies.",
    category: "cruise",
    tags: ["autism", "wheelchair", "beginner"],
    coverImage: "/images/guides/cruise-cover.jpg",
    coverImageAlt: "Large cruise ship sailing through calm blue waters at sunset",
    price: 20,
    stripeProductId: "prod_cruise",
    stripePriceId: "price_cruise_20",
    featured: false,
    publishedAt: "2024-08-15",
    readTime: 32,
    destination: "Various Cruise Lines",
    highlights: [
      "Accessibility feature comparison across cruise lines",
      "How to request special needs accommodations",
      "Sensory-friendly cabin selection tips",
      "Port excursion planning for wheelchair users",
      "Onboard meltdown management strategies",
      "Disney Cruise Line deep dive",
    ],
    includes: [
      "Full PDF guide (38+ pages)",
      "Cruise accessibility request letter template",
      "Cabin selection checklist",
      "Emergency information card template",
      "Shore excursion questions to ask",
      "Lifetime updates",
    ],
    sections: [
      {
        title: "Choosing the Right Cruise Line",
        content:
          "Not all cruise lines are equal when it comes to accessibility. Disney Cruise Line consistently tops rankings for families with disabilities. Royal Caribbean and Norwegian both have strong accessibility programs. Smaller luxury lines may lack the facilities needed.",
        tips: [
          "Disney Cruise Line has sensory-sensitive character meet-and-greets with smaller, quieter settings.",
          "Royal Caribbean's Freedom and Oasis class ships have the most accessible cabin inventory.",
          "Always call the cruise line's Access Desk (not general reservations) to discuss specific needs.",
        ],
        image: "/images/guides/disney-cruise-ship.jpg",
        imageAlt: "Disney Cruise Line ship docked at a sunny Caribbean port",
      },
    ],
  },
  {
    id: "6",
    slug: "sensory-friendly-travel-starter",
    title: "Sensory-Friendly Travel: The Starter Guide",
    subtitle: "Your first steps toward confident family adventures",
    description:
      "New to traveling with a child with sensory differences or autism? This free starter guide lays the foundation — what to pack, how to prepare your child, and how to handle the unexpected.",
    category: "resort",
    tags: ["autism", "sensory", "beginner", "free"],
    coverImage: "/images/guides/starter-guide-cover.jpg",
    coverImageAlt: "Happy family with young child at an outdoor resort pool area",
    price: "free",
    featured: false,
    publishedAt: "2024-07-01",
    readTime: 20,
    destination: "Universal Tips",
    highlights: [
      "Pre-trip preparation strategies",
      "What to pack in a sensory travel kit",
      "Scripts for talking to kids about travel",
      "How to scope out a destination in advance",
      "What to do when things go sideways",
      "Building toward bigger adventures",
    ],
    includes: [
      "Full PDF guide (25+ pages)",
      "Printable packing checklist",
      "Sample visual schedule template",
      "Emergency information card template",
    ],
    sections: [
      {
        title: "Building Your Sensory Travel Kit",
        content:
          "A well-stocked sensory kit can be the difference between a meltdown and a breakthrough. Think layers: noise-cancelling headphones for auditory overwhelm, chewy jewelry for oral sensory needs, a comfort object for emotional grounding, and fidgets for hands that need to stay busy.",
        tips: [
          "Noise-cancelling headphones (not just earmuffs) make an enormous difference in airports and theme parks.",
          "Bring a visual schedule printed out — novelty is reduced when the child knows what's coming next.",
          "A small photo book of your destination previewed at home reduces first-encounter anxiety.",
          "Pack familiar foods as backup — new environments + unfamiliar food is a double stressor.",
        ],
        image: "/images/guides/sensory-kit-contents.jpg",
        imageAlt: "Organized sensory travel kit with headphones, fidgets, and comfort items",
      },
    ],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getFeaturedGuides(): Guide[] {
  return guides.filter((g) => g.featured);
}

export function getGuidesByCategory(category: string): Guide[] {
  return guides.filter((g) => g.category === category);
}

export function getPaidGuides(): Guide[] {
  return guides.filter((g) => g.price !== "free");
}
