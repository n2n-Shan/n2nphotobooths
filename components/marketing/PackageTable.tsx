"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { formatCurrency } from "@/lib/utils";

type Pkg = {
  id: string;
  hours: number;
  price: number;
  inclusions: string[];
  isPopular: boolean;
};

export function PackageTable({
  title,
  subtitle,
  packages,
}: {
  title: string;
  subtitle: string;
  packages: Pkg[];
  dark?: boolean;
}) {
  return (
    <section className="bg-[#0f0f0f] py-24 md:py-32">
      <div className="container-luxe">
        <Reveal className="mb-12 max-w-2xl">
          <p className="eyebrow">{subtitle}</p>
          <h2 className="display mt-6 text-4xl text-white md:text-6xl">{title}</h2>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-4">
          {packages.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-xl border border-white/8 bg-[#1a1a1a] p-8 transition-all duration-500 hover:border-champagne/40 hover:bg-[#1d1d1d]"
            >
              {p.isPopular && (
                <span className="mb-4 inline-block rounded-full bg-champagne px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                  Most Popular
                </span>
              )}
              <p className="display text-5xl text-white">{p.hours}h</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Package</p>
              <p className="display mt-3 text-3xl text-champagne">{formatCurrency(p.price)}</p>
              <ul className="mt-8 space-y-2.5 text-sm">
                {p.inclusions.map((inc) => (
                  <li key={inc} className="flex items-start gap-2 text-white/60">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 fill-champagne" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {inc}
                  </li>
                ))}
              </ul>
              <Link
                href={`/book?package=${p.id}`}
                className="mt-8 inline-flex w-full items-center justify-center rounded-lg border border-white/15 py-3 text-sm font-bold text-white transition-colors hover:border-champagne hover:bg-champagne hover:text-white"
              >
                Reserve →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
