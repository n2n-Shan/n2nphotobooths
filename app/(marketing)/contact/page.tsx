import type { Metadata } from "next";
import { PageHeader } from "@/components/marketing/PageHeader";
import { ContactForm } from "@/components/marketing/ContactForm";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with N2N Photobooths — Melbourne photo booth hire since 2014.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Say hello"
        title="Tell us about"
        italicTail="your night."
        intro="We typically reply within one business day. Need to talk now? Call 0414 521 425."
      />

      <section className="bg-[#0f0f0f] pb-32">
        <div className="container-luxe">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-20">
            <Reveal className="md:col-span-5">
              <div className="space-y-10">
                <div>
                  <p className="eyebrow">Phone</p>
                  <a href="tel:0414521425" className="mt-3 block text-3xl font-bold text-white hover:text-champagne md:text-4xl">
                    0414 521 425
                  </a>
                </div>
                <div>
                  <p className="eyebrow">Email</p>
                  <a
                    href="mailto:info@n2nphotobooths.com.au"
                    className="mt-3 block break-all text-2xl font-bold text-white hover:text-champagne md:text-3xl"
                  >
                    info@n2nphotobooths.com.au
                  </a>
                </div>
                <div>
                  <p className="eyebrow">Service area</p>
                  <p className="mt-3 text-2xl font-bold text-white md:text-3xl">
                    Melbourne metro &amp;
                    <br />
                    <span className="italic text-champagne">regional Victoria.</span>
                  </p>
                  <p className="mt-3 text-sm text-white/50">
                    Free delivery within 40km of Melbourne CBD.
                  </p>
                </div>
                <div>
                  <p className="eyebrow">Hours</p>
                  <p className="mt-3 text-base text-white/60">
                    Replies M–F · 9am–6pm AEST
                    <br />
                    Events run any time, any day.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal className="md:col-span-7">
              <div className="rounded-2xl border border-white/8 bg-[#1a1a1a] p-8 md:p-10">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
