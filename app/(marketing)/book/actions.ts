"use server";

import { bookingSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { sendOwnerNotification, sendCustomerConfirmation } from "@/lib/email";
import { isDatabaseConfigured } from "@/lib/content";
import { calcDeliveryFee } from "@/lib/utils";

export type BookState = { ok: boolean; bookingId?: string; error?: string };

export async function submitBooking(input: unknown): Promise<BookState> {
  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Please check your details." };
  }

  const data = parsed.data;

  try {
    if (isDatabaseConfigured()) {
      const booking = await prisma.booking.create({
        data: {
          eventDate: data.eventDate,
          eventStartTime: data.eventStartTime ?? null,
          hours: data.hours,
          eventType: data.eventType,
          boothId: data.boothId,
          packageId: data.packageId,
          backdropId: data.backdropId ?? null,
          addons: data.addons,
          venueName: data.venueName ?? null,
          venueAddress: data.venueAddress ?? null,
          venuePostcode: data.venuePostcode ?? null,
          guestCount: data.guestCount ?? null,
          customerName: data.customerName,
          customerEmail: data.customerEmail,
          customerPhone: data.customerPhone,
          notes: data.notes ?? null,
          estimatedTotal: data.estimatedTotal,
          deliveryFee: data.deliveryFee,
        },
        include: { booth: true, package: true, backdrop: true },
      });

      if (process.env.RESEND_API_KEY) {
        await Promise.all([
          sendOwnerNotification(booking as Parameters<typeof sendOwnerNotification>[0]),
          sendCustomerConfirmation(booking as Parameters<typeof sendCustomerConfirmation>[0]),
        ]);
      }

      return { ok: true, bookingId: booking.id };
    }

    // No DB — still send notification if key available
    if (process.env.RESEND_API_KEY) {
      await sendOwnerNotification({
        id: "no-db",
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        eventDate: data.eventDate,
        eventType: data.eventType,
        hours: data.hours,
        estimatedTotal: data.estimatedTotal,
        deliveryFee: data.deliveryFee,
        booth: { name: data.boothId },
        package: { hours: data.hours, price: data.estimatedTotal },
        backdrop: null,
      } as Parameters<typeof sendOwnerNotification>[0]);
    }

    return { ok: true };
  } catch (err) {
    console.error("[booking]", err);
    return { ok: false, error: "Something went wrong. Please try again or call 0414 521 425." };
  }
}

export { calcDeliveryFee };
