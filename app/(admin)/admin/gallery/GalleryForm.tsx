"use client";

import { useState, useTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import { upsertGalleryItem, deleteGalleryItem } from "./actions";

const EVENT_TYPES = ["WEDDING", "BIRTHDAY", "CORPORATE", "SCHOOL", "OTHER"];

type GalleryData = { id: string; imageUrl: string; eventType: string; alt: string };

export function GalleryForm({ mode, item }: { mode: "create" | "edit"; item?: GalleryData }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    imageUrl: item?.imageUrl ?? "",
    eventType: item?.eventType ?? "WEDDING",
    alt: item?.alt ?? "",
  });
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const result = await upsertGalleryItem({ ...form, id: item?.id });
      if (result?.error) setError(result.error);
      else setOpen(false);
    });
  }

  function handleDelete() {
    if (!item?.id || !confirm("Delete this gallery item?")) return;
    startTransition(() => deleteGalleryItem(item.id));
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={mode === "create"
          ? "btn-primary text-sm"
          : "rounded-lg bg-black/60 px-2 py-1 text-xs text-white/70 hover:bg-black/80"}
      >
        {mode === "create" ? "+ Add image" : "Edit"}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              className="w-full max-w-md rounded-2xl border border-white/8 bg-[#1a1a1a] p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="mb-6 text-lg font-bold text-white">
                {mode === "create" ? "Add gallery image" : "Edit gallery image"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Field label="Image URL" value={form.imageUrl} onChange={(v) => setForm((f) => ({ ...f, imageUrl: v }))} required />
                <Field label="Alt text" value={form.alt} onChange={(v) => setForm((f) => ({ ...f, alt: v }))} required />
                <label className="block">
                  <span className="mb-1 block text-[11px] font-semibold uppercase tracking-widest text-white/50">Event Type</span>
                  <select
                    value={form.eventType}
                    onChange={(e) => setForm((f) => ({ ...f, eventType: e.target.value }))}
                    className="w-full rounded-lg border border-white/12 bg-[#242424] px-4 py-3 text-white [&>option]:bg-[#242424]"
                  >
                    {EVENT_TYPES.map((t) => <option key={t} value={t}>{t.charAt(0) + t.slice(1).toLowerCase()}</option>)}
                  </select>
                </label>
                {error && <p className="text-sm text-red-400">{error}</p>}
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={isPending} className="btn-primary flex-1 text-sm disabled:opacity-50">
                    {isPending ? "Saving…" : "Save"}
                  </button>
                  {mode === "edit" && (
                    <button type="button" onClick={handleDelete} disabled={isPending}
                      className="rounded-lg border border-red-500/30 px-4 text-sm text-red-400 hover:bg-red-950/30">
                      Delete
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Field({ label, value, onChange, required }: {
  label: string; value: string; onChange: (v: string) => void; required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-widest text-white/50">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} required={required}
        className="w-full rounded-lg border border-white/12 bg-[#242424] px-4 py-3 text-white placeholder-white/30 outline-none focus:border-champagne" />
    </label>
  );
}
