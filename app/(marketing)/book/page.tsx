"use client";

import { useState, useTransition, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { submitBooking } from "./actions";
import { formatCurrency, calcDeliveryFee } from "@/lib/utils";
import { STATIC_BOOTHS, STATIC_PACKAGES, STATIC_BACKDROPS } from "@/lib/content";

const EVENT_TYPES = [
  { value: "WEDDING", label: "Wedding" },
  { value: "BIRTHDAY", label: "Birthday" },
  { value: "CORPORATE", label: "Corporate" },
  { value: "SCHOOL", label: "School" },
  { value: "OTHER", label: "Other" },
];

const ADDONS = [
  { id: "guest-book", label: "Traditional Guest Book", price: 80 },
  { id: "extra-props", label: "Premium Prop Wardrobe", price: 60 },
  { id: "extra-hour", label: "Extra Hour", price: 120 },
  { id: "usb-drive", label: "USB Drive with Digitals", price: 40 },
];

type FormData = {
  eventDate: string;
  eventStartTime: string;
  hours: number;
  eventType: string;
  venueName: string;
  venueAddress: string;
  venuePostcode: string;
  guestCount: string;
  boothId: string;
  packageId: string;
  backdropId: string;
  addons: string[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
};

const defaultForm: FormData = {
  eventDate: "",
  eventStartTime: "",
  hours: 3,
  eventType: "WEDDING",
  venueName: "",
  venueAddress: "",
  venuePostcode: "",
  guestCount: "",
  boothId: "",
  packageId: "",
  backdropId: "",
  addons: [],
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  notes: "",
};

const STEPS = ["Event", "Booth & Package", "Add-ons", "Contact", "Confirm"];

function BookingForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(() => ({
    ...defaultForm,
    boothId: searchParams.get("booth") ?? "",
    packageId: searchParams.get("package") ?? "",
    backdropId: searchParams.get("backdrop") ?? "",
  }));
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const selectedBooth = STATIC_BOOTHS.find((b) => b.id === form.boothId);
  const selectedPackage = STATIC_PACKAGES.find((p) => p.id === form.packageId);
  const boothPackages = STATIC_PACKAGES.filter(
    (p) =>
      !selectedBooth ||
      (selectedBooth.slug === "glam" ? p.boothGroup === "GLAM" : p.boothGroup === "OPEN_ENCLOSED")
  );
  const addonTotal = ADDONS.filter((a) => form.addons.includes(a.id)).reduce((s, a) => s + a.price, 0);
  const packagePrice = selectedPackage ? Number(selectedPackage.price) : 0;
  const delivery = calcDeliveryFee(0);
  const total = packagePrice + addonTotal;

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleAddon(id: string) {
    setForm((f) => ({
      ...f,
      addons: f.addons.includes(id) ? f.addons.filter((a) => a !== id) : [...f.addons, id],
    }));
  }

  function canAdvance() {
    if (step === 0) return form.eventDate && form.eventType;
    if (step === 1) return form.boothId && form.packageId;
    return true;
  }

  function handleSubmit() {
    setError("");
    startTransition(async () => {
      const result = await submitBooking({
        eventDate: form.eventDate,
        eventStartTime: form.eventStartTime || undefined,
        hours: selectedPackage ? Number(selectedPackage.hours) : form.hours,
        eventType: form.eventType,
        boothId: form.boothId,
        packageId: form.packageId,
        backdropId: form.backdropId || null,
        addons: form.addons,
        venueName: form.venueName || undefined,
        venueAddress: form.venueAddress || undefined,
        venuePostcode: form.venuePostcode || undefined,
        guestCount: form.guestCount ? Number(form.guestCount) : undefined,
        customerName: form.customerName,
        customerEmail: form.customerEmail,
        customerPhone: form.customerPhone,
        notes: form.notes || undefined,
        estimatedTotal: total,
        deliveryFee: delivery,
      });
      if (result.ok) {
        setDone(true);
      } else {
        setError(result.error ?? "Something went wrong.");
      }
    });
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-champagne/30 bg-champagne/5 p-12 text-center"
      >
        <div className="mb-4 text-5xl">🎉</div>
        <h2 className="text-3xl font-bold text-white">Booking received!</h2>
        <p className="mt-4 text-white/60">
          We&rsquo;ve sent a confirmation to <strong className="text-white">{form.customerEmail}</strong>.
          <br />Our team will confirm your date within one business day.
        </p>
        <p className="mt-6 text-sm text-white/40">
          Questions? Call <a href="tel:0414521425" className="text-champagne">0414 521 425</a>
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-16">
      {/* Main form */}
      <div className="lg:col-span-2">
        {/* Step tabs */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-1">
          {STEPS.map((s, i) => (
            <button
              key={s}
              onClick={() => i < step && setStep(i)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                i === step
                  ? "bg-champagne text-white"
                  : i < step
                  ? "bg-white/10 text-white/70 hover:bg-white/15"
                  : "bg-white/5 text-white/30 cursor-default"
              }`}
            >
              {i + 1}. {s}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-6 rounded-2xl border border-white/8 bg-[#1a1a1a] p-8"
          >
            {step === 0 && (
              <>
                <h2 className="text-xl font-bold text-white">Event details</h2>
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Event date *" name="eventDate" type="date"
                    value={form.eventDate} onChange={(v) => set("eventDate", v)} />
                  <Field label="Start time (optional)" name="eventStartTime" type="time"
                    value={form.eventStartTime} onChange={(v) => set("eventStartTime", v)} />
                </div>
                <SelectField label="Event type *" value={form.eventType} onChange={(v) => set("eventType", v)}
                  options={EVENT_TYPES} />
                <Field label="Venue name (optional)" name="venueName"
                  value={form.venueName} onChange={(v) => set("venueName", v)} />
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Venue address" name="venueAddress"
                    value={form.venueAddress} onChange={(v) => set("venueAddress", v)} />
                  <Field label="Postcode" name="venuePostcode"
                    value={form.venuePostcode} onChange={(v) => set("venuePostcode", v)} />
                </div>
                <Field label="Approx. guest count" name="guestCount" type="number" placeholder="e.g. 80"
                  value={form.guestCount} onChange={(v) => set("guestCount", v)} />
              </>
            )}

            {step === 1 && (
              <>
                <h2 className="text-xl font-bold text-white">Choose your booth</h2>
                <div className="grid gap-3 md:grid-cols-3">
                  {STATIC_BOOTHS.map((b) => (
                    <button key={b.id} onClick={() => { set("boothId", b.id); set("packageId", ""); }}
                      className={`rounded-xl border p-4 text-left transition-all ${
                        form.boothId === b.id
                          ? "border-champagne bg-champagne/10 text-white"
                          : "border-white/10 text-white/60 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      <p className="font-bold">{b.name}</p>
                      <p className="mt-1 text-xs text-white/50">{b.tagline.split(".")[0]}</p>
                    </button>
                  ))}
                </div>

                {form.boothId && (
                  <>
                    <h2 className="pt-2 text-xl font-bold text-white">Choose your package</h2>
                    <div className="grid gap-3 md:grid-cols-2">
                      {boothPackages.map((p) => (
                        <button key={p.id} onClick={() => set("packageId", p.id)}
                          className={`rounded-xl border p-5 text-left transition-all ${
                            form.packageId === p.id
                              ? "border-champagne bg-champagne/10"
                              : "border-white/10 hover:border-white/30"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-2xl font-black text-white">{p.hours}h</p>
                            <p className="text-xl font-bold text-champagne">{formatCurrency(Number(p.price))}</p>
                          </div>
                          {p.isPopular && (
                            <span className="mt-2 inline-block rounded-full bg-champagne/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-champagne">
                              Popular
                            </span>
                          )}
                        </button>
                      ))}
                    </div>

                    <h2 className="pt-2 text-xl font-bold text-white">Backdrop (optional)</h2>
                    <div className="grid grid-cols-3 gap-2 md:grid-cols-5">
                      <button
                        onClick={() => set("backdropId", "")}
                        className={`rounded-lg border p-3 text-xs font-semibold transition-all ${
                          !form.backdropId ? "border-champagne bg-champagne/10 text-white" : "border-white/10 text-white/50 hover:border-white/30"
                        }`}
                      >
                        No preference
                      </button>
                      {STATIC_BACKDROPS.slice(0, 9).map((b) => (
                        <button key={b.id} onClick={() => set("backdropId", b.id)}
                          className={`rounded-lg border p-3 text-xs font-semibold transition-all ${
                            form.backdropId === b.id
                              ? "border-champagne bg-champagne/10 text-white"
                              : "border-white/10 text-white/50 hover:border-white/30"
                          }`}
                        >
                          {b.name}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-xl font-bold text-white">Add-ons</h2>
                <p className="text-sm text-white/50">All optional. Add anything that suits your event.</p>
                <div className="grid gap-3 md:grid-cols-2">
                  {ADDONS.map((a) => {
                    const active = form.addons.includes(a.id);
                    return (
                      <button key={a.id} onClick={() => toggleAddon(a.id)}
                        className={`flex items-center justify-between rounded-xl border p-5 text-left transition-all ${
                          active ? "border-champagne bg-champagne/10" : "border-white/10 hover:border-white/30"
                        }`}
                      >
                        <div>
                          <p className={`font-bold ${active ? "text-white" : "text-white/70"}`}>{a.label}</p>
                          <p className="text-sm text-white/40">+{formatCurrency(a.price)}</p>
                        </div>
                        <div className={`h-5 w-5 rounded-full border-2 transition-colors ${
                          active ? "border-champagne bg-champagne" : "border-white/30"
                        }`}>
                          {active && <svg className="h-full w-full text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-xl font-bold text-white">Your contact details</h2>
                <Field label="Full name *" name="customerName"
                  value={form.customerName} onChange={(v) => set("customerName", v)} />
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Email *" name="customerEmail" type="email"
                    value={form.customerEmail} onChange={(v) => set("customerEmail", v)} />
                  <Field label="Phone *" name="customerPhone" type="tel"
                    value={form.customerPhone} onChange={(v) => set("customerPhone", v)} />
                </div>
                <Field label="Any notes or requests?" name="notes" textarea
                  value={form.notes} onChange={(v) => set("notes", v)} />
              </>
            )}

            {step === 4 && (
              <>
                <h2 className="text-xl font-bold text-white">Confirm your booking</h2>
                <div className="space-y-3 rounded-xl bg-white/5 p-5 text-sm">
                  <Row label="Event date" value={form.eventDate} />
                  <Row label="Event type" value={EVENT_TYPES.find((e) => e.value === form.eventType)?.label ?? ""} />
                  {form.venueName && <Row label="Venue" value={form.venueName} />}
                  <Row label="Booth" value={selectedBooth?.name ?? "—"} />
                  <Row label="Package" value={selectedPackage ? `${selectedPackage.hours}h — ${formatCurrency(Number(selectedPackage.price))}` : "—"} />
                  {form.addons.length > 0 && (
                    <Row label="Add-ons" value={form.addons.map((id) => ADDONS.find((a) => a.id === id)?.label ?? id).join(", ")} />
                  )}
                  <Row label="Name" value={form.customerName} />
                  <Row label="Email" value={form.customerEmail} />
                  <Row label="Phone" value={form.customerPhone} />
                </div>
                {error && (
                  <p className="rounded-lg bg-red-950/50 p-3 text-sm text-red-400">{error}</p>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-6 flex justify-between">
          {step > 0 ? (
            <button onClick={() => setStep(step - 1)} className="btn-ghost px-6 py-3 text-sm">
              ← Back
            </button>
          ) : <span />}
          {step < STEPS.length - 1 ? (
            <button
              onClick={() => canAdvance() && setStep(step + 1)}
              disabled={!canAdvance()}
              className="btn-primary px-8 py-3 text-sm disabled:opacity-40"
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isPending || !form.customerName || !form.customerEmail || !form.customerPhone}
              className="btn-primary px-8 py-3 text-sm disabled:opacity-40"
            >
              {isPending ? "Submitting…" : "Submit booking →"}
            </button>
          )}
        </div>
      </div>

      {/* Summary sidebar */}
      <div className="lg:col-span-1">
        <div className="sticky top-28 rounded-2xl border border-white/8 bg-[#1a1a1a] p-6">
          <p className="eyebrow mb-4">Summary</p>
          {selectedPackage ? (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">{selectedBooth?.name} — {selectedPackage.hours}h</span>
                <span className="font-bold text-white">{formatCurrency(packagePrice)}</span>
              </div>
              {form.addons.map((id) => {
                const a = ADDONS.find((x) => x.id === id);
                return a ? (
                  <div key={id} className="flex justify-between">
                    <span className="text-white/60">{a.label}</span>
                    <span className="text-white">+{formatCurrency(a.price)}</span>
                  </div>
                ) : null;
              })}
              <div className="flex justify-between text-white/40">
                <span>Delivery</span>
                <span>{delivery === 0 ? "Free" : formatCurrency(delivery)}</span>
              </div>
              <div className="border-t border-white/10 pt-3">
                <div className="flex justify-between">
                  <span className="font-bold text-white">Estimated total</span>
                  <span className="font-black text-champagne text-lg">{formatCurrency(total)}</span>
                </div>
                <p className="mt-2 text-[11px] text-white/30">No deposit required. Final invoice before your event.</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-white/40">Select a booth and package to see pricing.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-white/50">{label}</span>
      <span className="text-right text-white">{value}</span>
    </div>
  );
}

function Field({
  label, name, type = "text", value, onChange, textarea, placeholder,
}: {
  label: string; name: string; type?: string; value: string;
  onChange: (v: string) => void; textarea?: boolean; placeholder?: string;
}) {
  const cls = "w-full rounded-lg border border-white/12 bg-[#242424] px-4 py-3 text-base text-white placeholder-white/30 outline-none transition-colors focus:border-champagne focus:ring-1 focus:ring-champagne/30";
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-white/50">{label}</span>
      {textarea ? (
        <textarea name={name} rows={3} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      ) : (
        <input name={name} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      )}
    </label>
  );
}

function SelectField({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-white/50">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/12 bg-[#242424] px-4 py-3 text-base text-white outline-none transition-colors focus:border-champagne [&>option]:bg-[#242424]">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );
}

export default function BookPage() {
  return (
    <>
      <section className="bg-[#0f0f0f] pt-36 pb-6 md:pt-48 md:pb-8">
        <div className="container-luxe">
          <p className="eyebrow">Step-by-step · No deposit</p>
          <h1 className="display mt-4 text-4xl text-white md:text-6xl">
            Reserve your<br />
            <span className="display-italic text-champagne">photo booth.</span>
          </h1>
        </div>
      </section>
      <section className="bg-[#0f0f0f] pb-32 pt-8">
        <div className="container-luxe">
          <Suspense fallback={null}>
            <BookingForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
