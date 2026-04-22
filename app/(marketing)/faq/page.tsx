import type { Metadata } from "next";
import { PageHeader } from "@/components/marketing/PageHeader";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about photo booth hire from N2N Photobooths.",
};

const FAQS = [
  {
    q: "How long do you need to set up?",
    a: "We arrive one hour before your booth start time and pack down within 30 minutes of finish. Our attendant handles everything; you don't lift a finger.",
  },
  {
    q: "Is a deposit required?",
    a: "No deposit. We confirm your date, then settle the invoice closer to the event. We're happy to take partial deposits if it helps your accounting.",
  },
  {
    q: "What's included in delivery?",
    a: "Free delivery anywhere within 40km of the Melbourne CBD. Outside that zone, we charge $0.70/km — quoted up front, no surprises on the night.",
  },
  {
    q: "Do you bring props?",
    a: "Yes — a curated wardrobe of hats, glasses, masks, oversized accessories. We'll match props to your event style; just tell us your colour palette.",
  },
  {
    q: "Will my guests get the photos?",
    a: "Each photo prints instantly in 4×6 format (or postcard for Glam). After the event, you receive a private online gallery and a USB drive with high-res digitals.",
  },
  {
    q: "Are you insured?",
    a: "Fully — public liability up to $20m. Our attendants hold current Working with Children Checks for school and family events.",
  },
  {
    q: "Can prints be branded?",
    a: "Absolutely. For corporate clients, we colour-match your brand and produce a custom photo-strip design, signed off before the event.",
  },
  {
    q: "Do you travel outside Melbourne?",
    a: "We regularly travel across Victoria — Yarra Valley, Mornington Peninsula, Geelong, Phillip Island. Get in touch for a quote outside the metro zone.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Common questions"
        title="Everything you might"
        italicTail="want to ask first."
        intro="Still curious? Call 0414 521 425 or write to info@n2nphotobooths.com.au."
      />
      <section className="container-luxe pb-32">
        <FaqAccordion items={FAQS} />
      </section>
    </>
  );
}
