"use client";

import { useActionState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { submitContact, type ActionState } from "@/app/(marketing)/contact/actions";

const initial: ActionState = { ok: false };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initial);

  return (
    <form action={formAction} className="space-y-6">
      <Field label="Name" name="name" required />
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone (optional)" name="phone" type="tel" />
      </div>
      <Field label="Tell us about your event" name="message" textarea required />

      <button
        type="submit"
        disabled={pending}
        className="btn-primary w-full disabled:opacity-50 md:w-auto"
      >
        {pending ? "Sending…" : "Send message"}
      </button>

      <AnimatePresence>
        {state.ok && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm font-semibold text-champagne"
          >
            Thank you — we&rsquo;ll be in touch within one business day.
          </motion.p>
        )}
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
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const cls =
    "w-full rounded-lg border border-white/12 bg-[#1a1a1a] px-4 py-3 text-base text-white placeholder-white/30 outline-none transition-colors focus:border-champagne focus:ring-1 focus:ring-champagne/30";
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-white/50">{label}</span>
      {textarea ? (
        <textarea name={name} required={required} rows={4} className={cls} />
      ) : (
        <input name={name} type={type} required={required} className={cls} />
      )}
    </label>
  );
}
