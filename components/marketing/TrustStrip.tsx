"use client";

import { MarqueeRow } from "@/components/motion/MarqueeRow";
import { Reveal } from "@/components/motion/Reveal";

const CLIENTS = [
  "DEAKIN UNIVERSITY",
  "BUNNINGS",
  "SPECIAL OLYMPICS",
  "OSHI GALLERY",
  "RACV",
  "MELBOURNE CRICKET CLUB",
  "ZOOS VICTORIA",
  "ASOS",
];

export function TrustStrip() {
  return (
    <section className="border-y border-white/8 bg-[#161616] py-14">
      <Reveal className="container-luxe mb-8 text-center">
        <p className="eyebrow">Trusted by Melbourne&rsquo;s best</p>
      </Reveal>
      <MarqueeRow duration={50}>
        {CLIENTS.map((c) => (
          <span
            key={c}
            className="text-xl font-black tracking-[0.18em] text-white/20 md:text-2xl"
          >
            {c}
          </span>
        ))}
      </MarqueeRow>
    </section>
  );
}
