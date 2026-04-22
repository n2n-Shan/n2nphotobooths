"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const NAV = [
  {
    label: "Photo Booths",
    href: "/photo-booths",
    children: [
      { label: "Open Air", href: "/photo-booths/open" },
      { label: "Glam", href: "/photo-booths/glam" },
      { label: "Enclosed", href: "/photo-booths/enclosed" },
    ],
  },
  {
    label: "Events",
    href: "/events",
    children: [
      { label: "Weddings", href: "/events/weddings" },
      { label: "Birthdays", href: "/events/birthdays" },
      { label: "Corporate", href: "/events/corporate" },
      { label: "School", href: "/events/school" },
    ],
  },
  { label: "Packages", href: "/packages" },
  { label: "Backdrops", href: "/backdrops" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-white/5 bg-[#0f0f0f]/90 backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <div className="container-luxe flex h-20 items-center justify-between">
          <Logo />

          <nav className="hidden items-center gap-8 lg:flex" onMouseLeave={() => setHovered(null)}>
            {NAV.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setHovered(item.label)}
              >
                <Link
                  href={item.href}
                  className="text-[13px] font-medium text-white/80 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
                <AnimatePresence>
                  {item.children && hovered === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-0 top-full pt-4"
                    >
                      <div className="min-w-[200px] rounded-lg border border-white/8 bg-[#1a1a1a] p-3 shadow-xl">
                        {item.children.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            className="block rounded-md px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/quote"
              className="text-[13px] font-medium text-white/70 transition-colors hover:text-white"
            >
              Get a Quote
            </Link>
            <Link
              href="/book"
              className="rounded-md bg-champagne px-5 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-champagne-deep"
            >
              Book Now
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden flex h-10 w-10 flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className={cn("h-0.5 w-6 bg-white transition-transform", open && "translate-y-[4px] rotate-45")} />
            <span className={cn("h-0.5 w-6 bg-white transition-transform", open && "-translate-y-[4px] -rotate-45")} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0f0f0f] lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="container-luxe pt-28"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="flex flex-col gap-4 pb-12">
                {NAV.map((item) => (
                  <div key={item.href} className="border-b border-white/8 pb-4">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="text-3xl font-bold text-white"
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 pl-1">
                        {item.children.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            onClick={() => setOpen(false)}
                            className="text-sm text-white/50 hover:text-white"
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="mt-6 flex gap-3">
                  <Link href="/quote" onClick={() => setOpen(false)} className="btn-ghost flex-1">
                    Get a Quote
                  </Link>
                  <Link href="/book" onClick={() => setOpen(false)} className="btn-primary flex-1">
                    Book Now
                  </Link>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
