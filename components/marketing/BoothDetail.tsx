"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import type { Booth } from "@/lib/content";

export function BoothDetail({
  booth,
  next,
}: {
  booth: Booth;
  next?: { name: string; slug: string };
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative h-[100svh] min-h-[600px] overflow-hidden bg-[#0f0f0f]">
        <motion.div style={{ y }} className="absolute inset-0">
          <Image
            src={booth.heroImage}
            alt={booth.name}
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f0f0f]/40 to-[#0f0f0f]" />
        </motion.div>
        <div className="container-luxe relative z-10 flex h-full flex-col justify-end pb-24 text-white md:pb-32">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="eyebrow"
          >
            The {booth.name} booth
          </motion.p>
          <h1 className="display mt-6 text-[clamp(3rem,8vw,7rem)] leading-[0.95] text-white">
            <SplitWords text={booth.tagline.split(".")[0]} delay={0.3} />
          </h1>
        </div>
      </section>

      {/* Description */}
      <section className="bg-[#0f0f0f] py-24 md:py-32">
        <div className="container-luxe grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-4">
            <p className="eyebrow">The experience</p>
          </Reveal>
          <div className="md:col-span-8">
            <Reveal>
              <p className="text-2xl font-semibold leading-snug text-white/80 md:text-4xl lg:text-5xl">
                {booth.description}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Gear list */}
      <section className="border-y border-white/8 bg-[#1a1a1a] py-24 md:py-32">
        <div className="container-luxe grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-4">
            <p className="eyebrow">What we bring</p>
            <h2 className="display mt-6 text-3xl text-white md:text-4xl">
              The full
              <br />
              <span className="display-italic text-champagne">studio kit.</span>
            </h2>
          </Reveal>
          <div className="md:col-span-8">
            <ul className="divide-y divide-white/8 border-y border-white/8">
              {booth.gear.map((g, i) => (
                <Reveal as="li" delay={i * 0.05} key={g} className="flex items-center justify-between py-5">
                  <span className="text-xl font-semibold text-white md:text-2xl">{g}</span>
                  <span className="text-champagne">✓</span>
                </Reveal>
              ))}
            </ul>
            <Reveal className="mt-12 flex flex-wrap gap-4">
              <Link href={`/book?booth=${booth.slug}`} className="btn-primary">
                Reserve the {booth.name} booth
              </Link>
              <Link href="/packages" className="btn-ghost">
                View packages
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Next booth */}
      {next && (
        <section className="bg-[#0f0f0f] py-24">
          <div className="container-luxe">
            <Link href={`/photo-booths/${next.slug}`} className="group block">
              <p className="eyebrow">Next</p>
              <h3 className="display mt-4 text-5xl text-white transition-colors group-hover:text-champagne md:text-7xl">
                The {next.name} booth →
              </h3>
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
