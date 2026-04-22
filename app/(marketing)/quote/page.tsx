"use client";

import { useActionState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PageHeader } from "@/components/marketing/PageHeader";
import { submitQuote, type QuoteState } from "./actions";

const initial: QuoteState = { ok: false };

const EVENT_TYPES = [
  { value: "WEDDING", label: "Wedding" },
  { value: "BIRTHDAY", label: "Birthday" },
  { value: "CORPORATE", label: "Corporate" },
  { value: "SCHOOL", label: "School" },
  { value: "OTHER", label: "Other" },
];

export default function QuotePage() {
  const [state, formAction, pending] = useActionState(submitQuote, initial);

  if (state.ok) {
    return (
      <>
        <PageHeader eyebrow="All done" title="Quote request" italicTail="received." />
        <section className="bg-[#0f0f0f] pb-32">
          <div className="container-luxe max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-champagne/30 bg-champagne/5 p-10 text-center"
            >
              <div className="mb-4 text-4xl">🎉</div>
              <h2 className="text-2xl font-bold text-white">We&rsquo;ll be in touch shortly!</h2>
              <p className="mt-3 text-white/60">
                Our team typically responds within one business day. For urgent enquiries,
                call <a href="tel:0414521425" className="text-champagne">0414 521 425</a>.
              </p>
            </motion.div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Free · No obligation"
        title="Get a quick"
        italicTail="quote."
        intro="Fill in a few details and we'll come back to you with pricing, availability, and everything you need to know."
      />

      <section className="bg-[#0f0f0f] pb-32">
        <div className="container-luxe max-w-2xl">
          <form action={formAction} className="space-y-6 rounded-2xl border border-white/8 bg-[#1a1a1a] p-8 md:p-10">
            {/* Contact details */}
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Your name" name="customerName" required />
              <Field label="Email" name="customerEmail" type="email" required />
            </div>
            <Field label="Phone" name="customerPhone" type="tel" required />

            <hr className="border-white/8" />

            {/* Event details */}
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Event date (optional)" name="eventDate" type="date" />
              <div>
                <label className="block">
                  <span className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-white/50">
                    Event type (optional)
                  </span>
                  <select
                    name="eventType"
                    className="w-full rounded-lg border border-white/12 bg-[#1a1a1a] px-4 py-3 text-base text-white outline-none transition-colors focus:border-champagne [&>option]:bg-[#1a1a1a]"
                  >
                    <option value="">Select…</option>
                    {EVENT_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
            <Field label="Hours needed (optional)" name="hours" type="number" placeholder="e.g. 3" />
            <Field label="Anything else we should know?" name="message" textarea />

            <AnimatePresence>
              {state.error && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-red-400"
                >
                  {state.error}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={pending}
              className="btn-primary w-full disabled:opacity-50"
            >
              {pending ? "Sending…" : "Get my free quote →"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  placeholder?: string;
}) {
  const cls =
    "w-full rounded-lg border border-white/12 bg-[#1a1a1a] px-4 py-3 text-base text-white placeholder-white/30 outline-none transition-colors focus:border-champagne focus:ring-1 focus:ring-champagne/30";
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-white/50">
        {label}
      </span>
      {textarea ? (
        <textarea name={name} required={required} rows={4} placeholder={placeholder} className={cls} />
      ) : (
        <input name={name} type={type} required={required} placeholder={placeholder} className={cls} />
      )}
    </label>
  );
}
