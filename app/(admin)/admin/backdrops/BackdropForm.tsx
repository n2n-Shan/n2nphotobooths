"use client";

import { useState, useTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import { upsertBackdrop, deleteBackdrop } from "./actions";

const MOODS = ["Neutral", "Luxe", "Natural", "Geometric", "Atmospheric"];

type BackdropData = { id: string; slug: string; name: string; mood: string; imageUrl: string };

export function BackdropForm({ mode, backdrop }: { mode: "create" | "edit"; backdrop?: BackdropData }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    name: backdrop?.name ?? "",
    slug: backdrop?.slug ?? "",
    mood: backdrop?.mood ?? "Neutral",
    imageUrl: backdrop?.imageUrl ?? "",
  });
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const result = await upsertBackdrop({ ...form, id: backdrop?.id });
      if (result?.error) setError(result.error);
      else setOpen(false);
    });
  }

  function handleDelete() {
    if (!backdrop?.id || !confirm("Delete this backdrop?")) return;
    startTransition(() => deleteBackdrop(backdrop.id));
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={mode === "create"
          ? "btn-primary text-sm"
          : "rounded-lg bg-black/60 px-2 py-1 text-xs text-white/70 hover:bg-black/80"}
      >
        {mode === "create" ? "+ Add backdrop" : "Edit"}
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
                {mode === "create" ? "Add backdrop" : "Edit backdrop"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Field label="Name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} required />
                <Field label="Slug (URL-safe)" value={form.slug} onChange={(v) => setForm((f) => ({ ...f, slug: v }))} required />
                <Field label="Image URL" value={form.imageUrl} onChange={(v) => setForm((f) => ({ ...f, imageUrl: v }))} required />
                <label className="block">
                  <span className="mb-1 block text-[11px] font-semibold uppercase tracking-widest text-white/50">Mood</span>
                  <select value={form.mood} onChange={(e) => setForm((f) => ({ ...f, mood: e.target.value }))}
                    className="w-full rounded-lg border border-white/12 bg-[#242424] px-4 py-3 text-white [&>option]:bg-[#242424]">
                    {MOODS.map((m) => <option key={m} value={m}>{m}</option>)}
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
