import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/marketing/PageHeader";

export const metadata: Metadata = {
  title: "Blog",
  description: "Updates, ideas, and event inspiration from N2N Photobooths.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Ideas, updates,"
        italicTail="and recent work."
        intro="We&rsquo;re preparing a journal of recent events, styling ideas, and booking tips for Melbourne celebrations."
      />

      <section className="bg-ivory py-24 md:py-32">
        <div className="container-luxe max-w-4xl">
          <div className="rounded-2xl border border-border bg-bone p-8 md:p-10">
            <p className="eyebrow">Coming soon</p>
            <p className="mt-6 text-lg leading-relaxed text-charcoal/80">
              Our first posts are on the way. In the meantime, you can browse recent moments in the gallery or get in touch for package recommendations.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/gallery" className="btn-primary">View gallery</Link>
              <Link href="/quote" className="btn-ghost">Quick quote</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
