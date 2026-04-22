"use client";

import { useTransition } from "react";
import { togglePackagePopular } from "./actions";

export function PackageActions({ packageId }: { packageId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => togglePackagePopular(packageId))}
      disabled={isPending}
      className="text-xs text-white/40 hover:text-champagne disabled:opacity-40 transition-colors"
    >
      Toggle popular
    </button>
  );
}
