"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Backdrop } from "@/lib/content";
import { cn } from "@/lib/utils";

const MOODS = ["All", "Neutral", "Luxe", "Natural", "Geometric", "Atmospheric"];

export function BackdropGrid({ backdrops }: { backdrops: Backdrop[] }) {
  const [mood, setMood] = useState<string>("All");
  const [active, setActive] = useState<Backdrop | null>(null);

  const filtered = mood === "All" ? backdrops : backdrops.filter((b) => b.mood === mood);

  return (
    <section className="container-luxe pb-32">
      {/* Mood filter */}
      <div className="mb-10 flex flex-wrap items-center gap-2.5 border-y border-white/8 py-6">
        <span className="eyebrow mr-2">Mood</span>
        {MOODS.map((m) => (
          <button
            key={m}
            onClick={() => setMood(m)}
            className={cn(
              "rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest transition-all",
              mood === m
                ? "bg-champagne text-white"
                : "border border-white/15 text-white/50 hover:border-white/40 hover:text-white"
            )}
          >
            {m}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((b, i) => (
            <motion.button
              key={b.id}
              id={b.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setActive(b)}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-[#1a1a1a] text-left"
            >
              <Image
                src={b.imageUrl}
                alt={b.name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-lg font-bold text-white">{b.name}</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-champagne">{b.mood}</p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {active && <Lightbox backdrop={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}

function Lightbox({ backdrop, onClose }: { backdrop: Backdrop; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative grid w-full max-w-5xl grid-cols-1 gap-8 rounded-2xl bg-[#1a1a1a] p-6 md:grid-cols-2 md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#0f0f0f]">
          <Image src={backdrop.imageUrl} alt={backdrop.name} fill sizes="50vw" className="object-cover" />
        </div>
        <div className="flex flex-col justify-between py-2">
          <div>
            <p className="eyebrow">{backdrop.mood}</p>
            <h3 className="display mt-4 text-4xl text-white md:text-5xl">{backdrop.name}</h3>
            <p className="mt-6 text-base leading-relaxed text-white/60">
              Available with our Open Air booth. We bring the full kit, set up
              the sweep, and your guests step into a curated frame.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/book?backdrop=${backdrop.slug}`} className="btn-primary">
              Reserve with this backdrop
            </Link>
            <button onClick={onClose} className="btn-ghost">Close</button>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          ×
        </button>
      </motion.div>
    </motion.div>
  );
}
