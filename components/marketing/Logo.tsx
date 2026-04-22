import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="N2N Photobooths home"
      className={cn("group inline-flex items-center gap-0.5", className)}
    >
      <span className="font-sans text-xl font-black tracking-tighter text-champagne transition-colors group-hover:text-champagne-deep">
        N2N
      </span>
      <span className="ml-2 text-[10px] font-bold tracking-[0.28em] uppercase text-white/80">
        Photobooths
      </span>
    </Link>
  );
}
