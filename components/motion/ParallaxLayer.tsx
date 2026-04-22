"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

export function ParallaxLayer({
  children,
  className,
  speed = 0.3,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const distance = reduce ? 0 : 120 * speed;
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y }} className="will-change-transform h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
