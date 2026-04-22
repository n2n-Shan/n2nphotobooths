import type { Metadata } from "next";
import { PageHeader } from "@/components/marketing/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for N2N Photobooths.",
};

const SECTIONS = [
  {
    title: "What we collect",
    body: "We collect the details you send us through our booking, quote, and contact forms, including your name, email, phone number, venue, and event information.",
  },
  {
    title: "How we use it",
    body: "We use that information to respond to enquiries, manage bookings, prepare invoices, and deliver our photo booth and photography services.",
  },
  {
    title: "Gallery delivery",
    body: "After your event, we may provide private galleries or digital delivery links. We do not sell your personal information to third parties.",
  },
  {
    title: "Questions",
    body: "If you want to update or remove your details, contact us directly and we will help as soon as practical.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title="How we handle"
        italicTail="your details."
        intro="This page outlines the basic information we collect and how we use it when you enquire or book with N2N Photobooths."
      />

      <section className="bg-ivory py-24 md:py-32">
        <div className="container-luxe max-w-4xl">
          <div className="divide-y divide-border border-y border-border">
            {SECTIONS.map((section) => (
              <div key={section.title} className="py-8">
                <h2 className="font-display text-3xl text-ink">{section.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-charcoal/80">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
