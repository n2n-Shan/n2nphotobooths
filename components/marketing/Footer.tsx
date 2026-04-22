import Link from "next/link";
import { Logo } from "./Logo";
import { Reveal } from "@/components/motion/Reveal";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-[#0a0a0a] text-white">
      {/* CTA band */}
      <div className="border-b border-white/8 bg-champagne/5">
        <div className="container-luxe py-20 md:py-28">
          <Reveal>
            <p className="eyebrow">Reserve your date</p>
            <h2 className="display mt-6 text-4xl text-white md:text-6xl">
              Let&rsquo;s make a night that
              <br />
              <span className="display-italic text-champagne">photographs itself.</span>
            </h2>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/book" className="btn-primary">
                Begin a booking
              </Link>
              <Link href="/quote" className="btn-ghost">
                Quick quote
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Links grid */}
      <div className="border-b border-white/8">
        <div className="container-luxe grid grid-cols-1 gap-10 py-16 md:grid-cols-4 md:gap-12">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              Premium photo booth hire serving Melbourne and regional Victoria
              since 2014. Open-air, glam, and enclosed booths for weddings,
              birthdays, brand activations, and corporate events.
            </p>
            <div className="mt-4 text-xs text-white/30">
              ABN 94 533 983 060 · Fully insured · Public liability $20m
            </div>
          </div>

          <div>
            <p className="eyebrow">Explore</p>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li><Link href="/photo-booths" className="transition-colors hover:text-champagne">Photo Booths</Link></li>
              <li><Link href="/packages" className="transition-colors hover:text-champagne">Packages</Link></li>
              <li><Link href="/backdrops" className="transition-colors hover:text-champagne">Backdrops</Link></li>
              <li><Link href="/gallery" className="transition-colors hover:text-champagne">Gallery</Link></li>
              <li><Link href="/faq" className="transition-colors hover:text-champagne">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">Get in touch</p>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li>
                <a href="tel:0414521425" className="transition-colors hover:text-champagne">
                  0414 521 425
                </a>
              </li>
              <li>
                <a href="mailto:info@n2nphotobooths.com.au" className="break-all transition-colors hover:text-champagne">
                  info@n2nphotobooths.com.au
                </a>
              </li>
              <li className="text-white/40">Melbourne metro &amp; Victoria</li>
            </ul>
            <div className="mt-6 flex gap-5 text-sm text-white/40">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-champagne">IG</a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-champagne">FB</a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-champagne">TT</a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-champagne">Pin</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container-luxe flex flex-wrap items-center justify-between gap-4 py-6 text-xs text-white/30">
        <span>© {year} N2N Photobooths · Crafted in Melbourne</span>
        <span className="font-bold tracking-wide text-champagne/60">N2N PHOTOBOOTHS</span>
      </div>
    </footer>
  );
}
