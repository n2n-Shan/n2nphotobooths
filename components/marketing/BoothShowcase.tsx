"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";

type Booth = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
};

export function BoothShowcase({ booths }: { booths: Booth[] }) {
  return (
    <section className="bg-[#1a1a1a] py-24 md:py-32">
      <div className="container-luxe">
        <Reveal className="mb-16 max-w-3xl md:mb-24">
          <p className="eyebrow">Three booths · one obsession</p>
          <h2 className="display mt-6 text-4xl text-white md:text-6xl lg:text-7xl">
            Choose the experience
            <br />
            <span className="display-italic text-champagne">your guests deserve.</span>
          </h2>
        </Reveal>

        <div className="space-y-24 md:space-y-32">
          {booths.map((b, i) => (
            <BoothRow key={b.slug} booth={b} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BoothRow({ booth, index }: { booth: Booth; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const flip = index % 2 === 1;

  return (
    <div ref={ref} className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16">
      <motion.div
        style={{ y }}
        className={`relative aspect-[4/5] overflow-hidden rounded-xl bg-[#0f0f0f] md:col-span-7 ${flip ? "md:order-2" : ""}`}
      >
        <Image
          src={booth.heroImage}
          alt={booth.name}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        {/* Red accent corner tag */}
        <div className="absolute left-4 top-4 rounded-full bg-champagne px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
          0{index + 1}
        </div>
      </motion.div>

      <Reveal className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
        <p className="eyebrow">{booth.name}</p>
        <h3 className="display mt-4 text-3xl text-white md:text-5xl">{booth.tagline}</h3>
        <p className="mt-6 max-w-md text-base leading-relaxed text-white/60">
          {booth.description}
        </p>
        <Link
          href={`/photo-booths/${booth.slug}`}
          className="mt-8 inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-champagne hover:text-champagne"
        >
          Discover the {booth.name} booth →
        </Link>
      </Reveal>
    </div>
  );
}
