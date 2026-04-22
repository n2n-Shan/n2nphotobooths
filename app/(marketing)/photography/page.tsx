import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/marketing/PageHeader";

export const metadata: Metadata = {
  title: "Photography",
  description: "Event photography coverage from N2N Photobooths across Melbourne and Victoria.",
};

export default function PhotographyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Photography"
        title="Event coverage"
        italicTail="that fits the room."
        intro="Alongside our booths, we offer relaxed event photography for weddings, birthdays, school formals, and brand activations."
      />

      <section className="bg-ivory py-24 md:py-32">
        <div className="container-luxe grid max-w-5xl gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="eyebrow">What we cover</p>
            <ul className="mt-6 space-y-4 text-lg leading-relaxed text-charcoal/80">
              <li>Wedding reception candids and guest portraits.</li>
              <li>Birthdays, engagements, and milestone celebrations.</li>
              <li>School formals, graduations, and presentation nights.</li>
              <li>Corporate launches, media walls, and branded moments.</li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">How to book</p>
            <p className="mt-6 text-lg leading-relaxed text-charcoal/80">
              Tell us your date, venue, and run sheet and we&rsquo;ll recommend the right mix of booth coverage and roaming photography.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/quote" className="btn-primary">Request a quote</Link>
              <Link href="/contact" className="btn-ghost">Contact us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
