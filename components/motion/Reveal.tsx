"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  as?: "div" | "section" | "article" | "li" | "span";
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0.01 : 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <Tag
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.18 }}
      variants={variants}
    >
      {children}
    </Tag>
  );
}
