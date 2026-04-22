"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";

type FAQ = { q: string; a: string };

export function FaqAccordion({ items }: { items: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="divide-y divide-white/8 border-y border-white/8">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <Reveal as="li" key={item.q} delay={i * 0.04}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-7 text-left transition-colors hover:text-champagne md:py-8"
              aria-expanded={isOpen}
            >
              <span className="text-xl font-bold text-white md:text-2xl">{item.q}</span>
              <span className={`text-2xl font-bold transition-colors ${isOpen ? "text-champagne" : "text-white/40"}`}>
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-8 text-base leading-relaxed text-white/60">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        );
      })}
    </ul>
  );
}
