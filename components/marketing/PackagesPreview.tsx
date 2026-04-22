"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { formatCurrency } from "@/lib/utils";

type Pkg = {
  id: string;
  hours: number;
  price: number;
  isPopular: boolean;
};

export function PackagesPreview({
  openEnclosed,
  glam,
}: {
  openEnclosed: Pkg[];
  glam: Pkg[];
}) {
  return (
    <section className="bg-[#161616] py-24 text-white md:py-32">
      <div className="container-luxe">
        <Reveal className="mb-16 max-w-3xl md:mb-20">
          <p className="eyebrow">Transparent pricing</p>
          <h2 className="display mt-6 text-4xl text-white md:text-6xl">
            No hidden fees.{" "}
            <span className="display-italic text-champagne">No surprises.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60">
            Two pricing tiers, no deposit required. Free delivery within 40km
            of Melbourne CBD; modest fee outside the zone. Final quote before
            you commit.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <PriceColumn title="Open Air & Enclosed" packages={openEnclosed} />
          <PriceColumn title="Glam Booth" packages={glam} accent />
        </div>

        <Reveal className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-8">
          <p className="text-sm text-white/50">
            Need something specific? We tailor packages for weddings and corporate events.
          </p>
          <Link href="/packages" className="btn-primary">
            See full packages
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function PriceColumn({ title, packages, accent }: { title: string; packages: Pkg[]; accent?: boolean }) {
  return (
    <Reveal>
      <div className="rounded-xl border border-white/8 bg-[#1d1d1d] p-8">
        <p className={`eyebrow ${accent ? "text-champagne-soft" : "text-champagne"}`}>{title}</p>
        <div className="mt-8 divide-y divide-white/8">
          {packages.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between py-5 transition-colors hover:text-champagne"
            >
              <div className="flex items-center gap-4">
                <p className="display text-3xl text-white md:text-4xl">{p.hours}h</p>
                {p.isPopular && (
                  <span className="rounded-full bg-champagne/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-champagne">
                    Popular
                  </span>
                )}
              </div>
              <p className="display text-3xl text-white md:text-4xl">{formatCurrency(p.price)}</p>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
