"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

export function SplitWords({
  text,
  className,
  delay = 0,
  stagger = 0.08,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay },
    },
  };

  const word: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : "70%" },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.01 : 1.0, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.span
      className={cn("inline-block", className)}
      initial="hidden"
      animate="show"
      variants={container}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          aria-hidden="true"
        >
          <motion.span variants={word} className="inline-block pr-[0.25em]">
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
