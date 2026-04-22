"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function MarqueeRow({
  children,
  className,
  duration = 40,
  pauseOnHover = true,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  pauseOnHover?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className={cn(
          "marquee-track flex w-max gap-12 whitespace-nowrap",
          !pauseOnHover && "[&]:hover:[animation-play-state:running]"
        )}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center gap-12">{children}</div>
        <div className="flex shrink-0 items-center gap-12" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
