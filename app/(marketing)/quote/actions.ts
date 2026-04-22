"use server";

import { quoteSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { sendQuoteNotification } from "@/lib/email";
import { isDatabaseConfigured } from "@/lib/content";

export type QuoteState = { ok: boolean; error?: string };

export async function submitQuote(
  _prev: QuoteState,
  formData: FormData
): Promise<QuoteState> {
  const raw = {
    customerName: formData.get("customerName"),
    customerEmail: formData.get("customerEmail"),
    customerPhone: formData.get("customerPhone"),
    eventDate: formData.get("eventDate") || undefined,
    eventType: formData.get("eventType") || undefined,
    hours: formData.get("hours") || undefined,
    message: formData.get("message") || undefined,
  };

  const parsed = quoteSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Please check your details." };
  }

  try {
    if (isDatabaseConfigured()) {
      await prisma.quote.create({
        data: {
          customerName: parsed.data.customerName,
          customerEmail: parsed.data.customerEmail,
          customerPhone: parsed.data.customerPhone,
          eventDate: parsed.data.eventDate ?? null,
          eventType: parsed.data.eventType ?? null,
          hours: parsed.data.hours ?? null,
          message: parsed.data.message ?? null,
        },
      });
    }
    if (process.env.RESEND_API_KEY) {
      await sendQuoteNotification({
        customerName: parsed.data.customerName,
        customerEmail: parsed.data.customerEmail,
        customerPhone: parsed.data.customerPhone,
        eventDate: parsed.data.eventDate ?? null,
        eventType: parsed.data.eventType ?? null,
        hours: parsed.data.hours ?? null,
        message: parsed.data.message ?? null,
      });
    }
    return { ok: true };
  } catch (err) {
    console.error("[quote]", err);
    return { ok: false, error: "Something went wrong. Please try again or call 0414 521 425." };
  }
}
