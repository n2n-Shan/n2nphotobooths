"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SplitWords } from "@/components/motion/SplitWords";

const STARS = Array(5).fill(null);

export function Hero({ rating, reviewCount }: { rating?: number; reviewCount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 180]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-[#0f0f0f]"
    >
      {/* Background image with parallax */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2400&q=80"
          alt="Photo booth event"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f]/60 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="container-luxe relative z-10 flex h-full flex-col justify-end pb-24 md:pb-32"
      >
        {/* Star rating badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 inline-flex items-center gap-2"
        >
          <div className="flex gap-0.5">
            {STARS.map((_, i) => (
              <svg key={i} className="h-4 w-4 fill-champagne" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm font-semibold text-white">
            {rating ?? 5.0} · {reviewCount ? `${reviewCount}+` : "200+"} Google Reviews
          </span>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow mb-5"
        >
          Melbourne · Since 2014
        </motion.p>

        {/* Headline */}
        <h1 className="display text-[clamp(2.8rem,8vw,7rem)] leading-[0.92] text-white">
          <SplitWords text="Melbourne's Favourite" delay={0.35} />
          <br />
          <span className="display-italic text-champagne">
            <SplitWords text="Photo Booth Hire." delay={0.85} />
          </span>
        </h1>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xl text-base text-white/60 md:text-lg"
        >
          Premium open-air, glam &amp; enclosed booths for weddings, birthdays,
          corporate events and more. Free delivery within 40km of Melbourne CBD.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <Link href="/book" className="btn-primary text-sm">
            Get a Free Quote
          </Link>
          <Link href="/photo-booths" className="btn-ghost text-sm">
            Our Booths →
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 right-6 z-10 hidden items-center gap-3 md:flex"
      >
        <span className="text-[11px] font-semibold uppercase tracking-widest text-white/40">Scroll</span>
        <div className="h-px w-10 bg-white/20" />
      </motion.div>
    </section>
  );
}
