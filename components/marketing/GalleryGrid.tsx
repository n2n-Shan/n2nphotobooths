"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { GalleryItem } from "@/lib/content";
import { cn } from "@/lib/utils";

const FILTERS: { key: string; label: string }[] = [
  { key: "ALL", label: "All" },
  { key: "WEDDING", label: "Weddings" },
  { key: "BIRTHDAY", label: "Birthdays" },
  { key: "CORPORATE", label: "Corporate" },
  { key: "SCHOOL", label: "School" },
];

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState("ALL");
  const [open, setOpen] = useState<GalleryItem | null>(null);
  const visible = filter === "ALL" ? items : items.filter((i) => i.eventType === filter);

  return (
    <section className="container-luxe pb-32">
      {/* Filter chips */}
      <div className="mb-10 flex flex-wrap items-center gap-2.5 border-y border-white/8 py-6">
        <span className="eyebrow mr-2">Filter</span>
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest transition-all",
              filter === f.key
                ? "bg-champagne text-white"
                : "border border-white/15 text-white/50 hover:border-white/40 hover:text-white"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <motion.div layout className="columns-1 gap-4 sm:columns-2 md:gap-6 lg:columns-3">
        <AnimatePresence mode="popLayout">
          {visible.map((g, i) => (
            <motion.button
              key={g.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setOpen(g)}
              className={cn(
                "group relative mb-4 block w-full overflow-hidden rounded-xl bg-[#1a1a1a] md:mb-6",
                i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/5]"
              )}
            >
              <Image
                src={g.imageUrl}
                alt={g.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="relative max-h-[90vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/5] w-full">
                <Image src={open.imageUrl} alt={open.alt} fill sizes="80vw" className="object-contain" />
              </div>
              <button
                onClick={() => setOpen(null)}
                className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Close"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
