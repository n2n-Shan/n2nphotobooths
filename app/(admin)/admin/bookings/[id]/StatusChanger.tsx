"use client";

import { useState, useTransition } from "react";
import { updateBookingStatus } from "./actions";

const STATUSES = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"] as const;
type Status = typeof STATUSES[number];

const STATUS_COLORS: Record<Status, string> = {
  PENDING: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  CONFIRMED: "bg-green-500/15 text-green-400 border-green-500/30",
  COMPLETED: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  CANCELLED: "bg-red-500/15 text-red-400 border-red-500/30",
};

export function StatusChanger({ bookingId, currentStatus }: { bookingId: string; currentStatus: string }) {
  const [status, setStatus] = useState<Status>(currentStatus as Status);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleChange(s: Status) {
    setStatus(s);
    setSaved(false);
    startTransition(async () => {
      await updateBookingStatus(bookingId, s);
      setSaved(true);
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex gap-1.5">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => handleChange(s)}
            disabled={isPending}
            className={`rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider transition-all disabled:opacity-50 ${
              status === s ? STATUS_COLORS[s] : "border-white/10 text-white/30 hover:border-white/30 hover:text-white"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      {saved && <span className="text-xs text-green-400">Saved ✓</span>}
    </div>
  );
}
