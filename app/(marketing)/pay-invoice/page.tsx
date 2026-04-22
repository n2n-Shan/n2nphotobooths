import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/marketing/PageHeader";

export const metadata: Metadata = {
  title: "Pay Invoice",
  description: "Invoice payment details for N2N Photobooths bookings and events.",
};

export default function PayInvoicePage() {
  return (
    <>
      <PageHeader
        eyebrow="Accounts"
        title="Pay your"
        italicTail="invoice."
        intro="If you already have a booking with us, use your invoice reference when making payment so we can match it quickly."
      />

      <section className="bg-ivory py-24 md:py-32">
        <div className="container-luxe max-w-4xl">
          <div className="rounded-2xl border border-border bg-bone p-8 md:p-10">
            <p className="eyebrow">Need payment details?</p>
            <p className="mt-6 text-lg leading-relaxed text-charcoal/80">
              For bank transfer details or a fresh copy of your invoice, contact us with your event name and date. We&rsquo;ll resend everything you need.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">Contact accounts</Link>
              <a href="tel:0414521425" className="btn-ghost">Call 0414 521 425</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
