import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EVENTS, getEventBySlug } from "@/lib/events";
import { getGallery } from "@/lib/queries";
import { PageHeader } from "@/components/marketing/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";

type Params = { slug: string };

export async function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = getEventBySlug(slug);
  if (!e) return { title: "Event not found" };
  return { title: e.name, description: e.intro };
}

export default async function EventPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const gallery = await getGallery();
  const eventGallery = gallery.filter((g) => g.eventType === event.type).slice(0, 6);
  const idx = EVENTS.findIndex((e) => e.slug === slug);
  const next = EVENTS[(idx + 1) % EVENTS.length];

  return (
    <>
      <PageHeader
        eyebrow={`Events · ${event.name}`}
        title={event.tagline}
        italicTail={event.italicTail}
        intro={event.intro}
      />

      <section className="container-luxe">
        <ParallaxLayer speed={0.15} className="aspect-[16/9] overflow-hidden bg-ink">
          <div className="relative h-[120%] w-full">
            <Image src={event.hero} alt={event.name} fill sizes="100vw" className="object-cover" />
          </div>
        </ParallaxLayer>
      </section>

      <section className="bg-ivory py-24 md:py-32">
        <div className="container-luxe grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-4">
            <p className="eyebrow">What it looks like</p>
            <h2 className="display mt-6 text-3xl text-ink md:text-4xl">
              On the night.
            </h2>
          </Reveal>
          <div className="md:col-span-8">
            <ul className="divide-y divide-border border-y border-border">
              {event.highlights.map((h, i) => (
                <Reveal as="li" delay={i * 0.06} key={h.title} className="py-8">
                  <p className="font-display text-2xl text-ink md:text-3xl">{h.title}</p>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-charcoal/80">{h.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {eventGallery.length > 0 && (
        <section className="bg-bone py-24 md:py-32">
          <div className="container-luxe">
            <Reveal className="mb-12 flex items-end justify-between">
              <div>
                <p className="eyebrow">Selected work</p>
                <h2 className="display mt-6 text-3xl text-ink md:text-5xl">From recent {event.name.toLowerCase()}.</h2>
              </div>
              <Link href="/gallery" className="link-underline text-[12px] uppercase tracking-[0.18em] text-ink">
                Open the gallery →
              </Link>
            </Reveal>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
              {eventGallery.map((g, i) => (
                <Reveal key={g.id} delay={i * 0.04}>
                  <div className="relative aspect-[3/4] overflow-hidden bg-ink">
                    <Image src={g.imageUrl} alt={g.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-ivory py-24 md:py-32">
        <div className="container-luxe">
          <Reveal>
            <p className="eyebrow">Recommended pairing</p>
            <h2 className="display mt-6 text-4xl text-ink md:text-5xl">
              We&rsquo;d suggest the {event.recommendedBooth} booth at {event.recommendedHours} hours.
            </h2>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href={`/book?event=${event.type}&hours=${event.recommendedHours}`} className="btn-primary">
                Reserve for a {event.name.toLowerCase().replace(/s$/, "")}
              </Link>
              <Link href="/packages" className="btn-ghost">
                View packages
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory pb-24">
        <div className="container-luxe">
          <Link href={`/events/${next.slug}`} className="group block border-t border-border pt-12">
            <p className="eyebrow">Next</p>
            <h3 className="display mt-4 text-5xl text-ink transition-colors group-hover:text-champagne-deep md:text-7xl">
              {next.name} →
            </h3>
          </Link>
        </div>
      </section>
    </>
  );
}
