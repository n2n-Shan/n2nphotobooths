"use client";

import Image from "next/image";
import Link from "next/link";
import { MarqueeRow } from "@/components/motion/MarqueeRow";
import { Reveal } from "@/components/motion/Reveal";

type Backdrop = { id: string; slug: string; name: string; imageUrl: string };

export function BackdropMarquee({ backdrops }: { backdrops: Backdrop[] }) {
  return (
    <section className="overflow-hidden bg-[#161616] py-24 md:py-32">
      <div className="container-luxe mb-12 md:mb-16">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Fifteen worlds, one booth</p>
            <h2 className="display mt-6 text-4xl text-white md:text-6xl">
              A backdrop for
              <span className="display-italic text-champagne"> every story.</span>
            </h2>
          </div>
          <Link
            href="/backdrops"
            className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-champagne hover:text-champagne"
          >
            View full collection →
          </Link>
        </Reveal>
      </div>

      <MarqueeRow duration={60}>
        {backdrops.map((b) => (
          <Link
            key={b.id}
            href={`/backdrops#${b.slug}`}
            className="group relative block aspect-[3/4] w-[240px] shrink-0 overflow-hidden rounded-xl bg-[#1a1a1a]"
          >
            <Image
              src={b.imageUrl}
              alt={b.name}
              fill
              sizes="240px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="text-lg font-bold text-white">{b.name}</p>
            </div>
          </Link>
        ))}
      </MarqueeRow>
    </section>
  );
}
