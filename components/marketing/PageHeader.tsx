"use client";

import { motion } from "motion/react";
import { SplitWords } from "@/components/motion/SplitWords";
import { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  italicTail,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  italicTail?: string;
  intro?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <section className="bg-[#0f0f0f] pt-36 pb-16 md:pt-48 md:pb-24">
      <div className="container-luxe">
        <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-4xl"}>
          {eyebrow && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow"
            >
              {eyebrow}
            </motion.p>
          )}
          <h1 className="display mt-5 text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] text-white">
            <SplitWords text={title} delay={0.15} />
            {italicTail && (
              <>
                <br />
                <span className="display-italic text-champagne">
                  <SplitWords text={italicTail} delay={0.5} />
                </span>
              </>
            )}
          </h1>
          {intro && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60"
            >
              {intro}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
