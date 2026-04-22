"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const QUOTES = [
  {
    text: "Our guests are still talking about the booth. The prints look like wedding magazine pages — every single one.",
    author: "Annabelle & James",
    context: "Wedding · Mansion at Werribee",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80",
  },
  {
    text: "We hire booths for activations across the country. N2N is the only one we trust with our brand.",
    author: "Marketing Lead",
    context: "Bunnings · Brand Activation",
    image: "https://images.unsplash.com/photo-1492366254240-43affaefc3e3?auto=format&fit=crop&w=2000&q=80",
  },
];

export function Testimonial() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative h-[200vh] bg-[#0f0f0f] text-white">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 opacity-30">
          <Image
            src={QUOTES[0].image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0f0f0f]/60" />
        </motion.div>

        <div className="container-luxe relative z-10">
          <div className="flex gap-0.5 mb-6">
            {Array(5).fill(null).map((_, i) => (
              <svg key={i} className="h-5 w-5 fill-champagne" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <blockquote className="max-w-4xl">
            <p className="display text-3xl leading-tight text-white md:text-5xl lg:text-6xl">
              <span className="display-italic text-champagne">&ldquo;</span>
              {QUOTES[0].text}
              <span className="display-italic text-champagne">&rdquo;</span>
            </p>
            <footer className="mt-10 flex items-center gap-4">
              <div className="h-0.5 w-10 bg-champagne" />
              <div>
                <cite className="not-italic text-lg font-bold text-white">{QUOTES[0].author}</cite>
                <p className="text-xs uppercase tracking-[0.18em] text-white/50">
                  {QUOTES[0].context}
                </p>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
