"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";

const FEATURES = [
  {
    icon: "📸",
    title: "Unlimited Instant Prints",
    desc: "Every guest walks away with a professional 4×6 print. No limits, no extra charges.",
  },
  {
    icon: "🎨",
    title: "Custom Photo Strip Design",
    desc: "We design your strip to match your event theme — colours, logos, and all.",
  },
  {
    icon: "🎭",
    title: "Fun Props Included",
    desc: "A curated wardrobe of hats, glasses, signs, and accessories for every vibe.",
  },
  {
    icon: "🖼️",
    title: "15 Backdrop Choices",
    desc: "Neutrals, botanicals, luxe metallic, and more. Pick your perfect backdrop.",
  },
  {
    icon: "🌐",
    title: "Online Gallery",
    desc: "All your event photos delivered digitally within 48 hours via private gallery.",
  },
  {
    icon: "👤",
    title: "Friendly Attendant",
    desc: "A professional on-site attendant manages everything so you enjoy the night.",
  },
];

export function Manifesto({ reviewCount }: { reviewCount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#0f0f0f] py-24 md:py-32">
      {/* Scrolling background text */}
      <motion.div
        style={{ x }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]"
      >
        <span className="display whitespace-nowrap text-[16vw] leading-none text-white">
          PHOTOBOOTH · N2N · MELBOURNE ·
        </span>
      </motion.div>

      <div className="container-luxe relative">
        {/* Heading */}
        <Reveal className="mb-16 max-w-3xl md:mb-20">
          <p className="eyebrow">Why hire N2N?</p>
          <h2 className="display mt-6 text-4xl text-white md:text-6xl">
            Everything included.
            <br />
            <span className="display-italic text-champagne">No surprises.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60">
            Every N2N package comes fully loaded — props, backdrops, attendant,
            prints, and online gallery. No hidden add-ons, no deposit required.
          </p>
        </Reveal>

        {/* Feature grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="group rounded-xl border border-white/8 bg-[#1a1a1a] p-8 transition-colors hover:border-champagne/30 hover:bg-[#1d1d1d]">
                <div className="mb-5 text-3xl">{f.icon}</div>
                <h3 className="text-lg font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Stats strip */}
        <Reveal className="mt-16 grid grid-cols-3 gap-6 border-t border-white/8 pt-16">
          <Stat value={`${new Date().getFullYear() - 2014}+`} label="Years in Melbourne" />
          <Stat value="1,800+" label="Events captured" />
          <Stat value={reviewCount ? `${reviewCount}+` : "200+"} label="5-star reviews" />
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="display text-4xl text-champagne md:text-6xl">{value}</p>
      <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">{label}</p>
    </div>
  );
}
