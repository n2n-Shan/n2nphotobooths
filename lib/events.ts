import type { EventType } from "@prisma/client";

export type EventCopy = {
  slug: string;
  type: EventType;
  name: string;
  tagline: string;
  italicTail: string;
  intro: string;
  hero: string;
  highlights: { title: string; body: string }[];
  recommendedBooth: string;
  recommendedHours: number;
};

const u = (id: string, w = 2000) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const EVENTS: EventCopy[] = [
  {
    slug: "weddings",
    type: "WEDDING",
    name: "Weddings",
    tagline: "A frame for the way",
    italicTail: "you celebrate love.",
    intro:
      "From garden ceremonies in the Yarra Valley to Mansion at Werribee receptions, our booths slot quietly into the room and quietly steal the night.",
    hero: u("1519741497674-611481863552", 2400),
    highlights: [
      { title: "Studio quality", body: "Mirrorless Canon body, dual studio strobes, and a colour-managed printer profile per venue." },
      { title: "Discreet attendant", body: "WWCC-checked, dressed for your event, briefed on your timeline." },
      { title: "Day-after delivery", body: "An online gallery in your inbox the next morning, USB to follow." },
    ],
    recommendedBooth: "Glam",
    recommendedHours: 4,
  },
  {
    slug: "birthdays",
    type: "BIRTHDAY",
    name: "Birthdays",
    tagline: "Make a year you can",
    italicTail: "hold in your hands.",
    intro:
      "Milestones, surprise parties, and the kind of nights you keep talking about. Our booths fit any room and run themselves.",
    hero: u("1530023367847-a683933f4172", 2400),
    highlights: [
      { title: "Open or enclosed", body: "Open for big-mood backdrops, enclosed for an intimate cocoon." },
      { title: "Props on tap", body: "Curated to your theme — colour, era, vibe." },
      { title: "Instant prints", body: "Guests leave with a 4×6 in hand within seconds." },
    ],
    recommendedBooth: "Open Air",
    recommendedHours: 3,
  },
  {
    slug: "corporate",
    type: "CORPORATE",
    name: "Corporate",
    tagline: "Brand activations that",
    italicTail: "outlive the launch.",
    intro:
      "We run booths for Deakin, Bunnings, Special Olympics, and Oshi Gallery. Custom-branded prints, lead-capture flows, and discreet on-brand attendants.",
    hero: u("1492366254240-43affaefc3e3", 2400),
    highlights: [
      { title: "Branded prints", body: "Logo lock-up, colour-matched, signed off before the event." },
      { title: "Lead capture", body: "Email or QR collection per print, exported to your CRM." },
      { title: "Insured & WHS-ready", body: "Public liability up to $20m; WWCC where needed." },
    ],
    recommendedBooth: "Open Air",
    recommendedHours: 4,
  },
  {
    slug: "school",
    type: "SCHOOL",
    name: "School & Graduation",
    tagline: "Formals, graduations,",
    italicTail: "and end-of-year nights.",
    intro:
      "Trained attendants with current Working with Children Checks, photo-strip designs that match your year colours, and prints in seconds.",
    hero: u("1517457373958-b7bdd4587205", 2400),
    highlights: [
      { title: "WWCC attendants", body: "Always with current credentials and friendly to teen energy." },
      { title: "School-safe props", body: "Curated wardrobe — hats, glasses, frames. No risky surprises." },
      { title: "Class-photo gallery", body: "Online gallery shared with the school for yearbook use." },
    ],
    recommendedBooth: "Open Air",
    recommendedHours: 3,
  },
];

export const getEventBySlug = (slug: string) => EVENTS.find((e) => e.slug === slug);
