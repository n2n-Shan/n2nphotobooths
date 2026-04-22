import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number | string) {
  const n = typeof value === "string" ? Number(value) : value;
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(n);
}

const DELIVERY_FREE_RADIUS_KM = 40;
const DELIVERY_RATE_PER_KM = 0.7;

export function calcDeliveryFee(distanceKm: number) {
  if (distanceKm <= DELIVERY_FREE_RADIUS_KM) return 0;
  return Math.round((distanceKm - DELIVERY_FREE_RADIUS_KM) * DELIVERY_RATE_PER_KM);
}

export function formatDate(d: Date | string) {
  const date = typeof d === "string" ? new Date(d) : d;
  return new Intl.DateTimeFormat("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
