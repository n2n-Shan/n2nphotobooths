import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EVENTS } from "@/lib/events";
import { PageHeader } from "@/components/marketing/PageHeader";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Events",
  description: "Photo booth hire for weddings, birthdays, corporate, and school events across Melbourne and Victoria.",
};

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Made for the moments"
        title="Every kind of"
        italicTail="night, photographed."
        intro="From wedding receptions to brand launches, our booths are quiet on set and unforgettable in the morning."
      />

      <section className="container-luxe pb-32">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {EVENTS.map((e, i) => (
            <Reveal key={e.slug} delay={i * 0.05}>
              <Link
                href={`/events/${e.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden bg-ink"
              >
                <Image
                  src={e.hero}
                  alt={e.name}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                  <p className="eyebrow text-champagne">{i + 1 < 10 ? `0${i + 1}` : i + 1}</p>
                  <h2 className="display mt-3 text-4xl text-ivory md:text-6xl">{e.name}</h2>
                  <p className="mt-3 max-w-md text-sm text-ivory/80 md:text-base">
                    {e.tagline} <span className="display-italic text-champagne-soft">{e.italicTail}</span>
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ivory/80">
                    Discover →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
