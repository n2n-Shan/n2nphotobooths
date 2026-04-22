import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const RESEND_FROM = process.env.RESEND_FROM_EMAIL ?? "bookings@n2nphotobooths.com.au";
export const OWNER_EMAIL =
  process.env.OWNER_NOTIFICATION_EMAIL ?? "info@n2nphotobooths.com.au";
