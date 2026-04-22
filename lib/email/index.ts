import { render } from "@react-email/components";
import { resend, RESEND_FROM, OWNER_EMAIL } from "@/lib/resend";
import { BookingCustomerEmail } from "./BookingCustomerEmail";
import { BookingOwnerEmail } from "./BookingOwnerEmail";
import { QuoteOwnerEmail } from "./QuoteOwnerEmail";
import { ContactOwnerEmail } from "./ContactOwnerEmail";
import { formatCurrency, formatDate } from "@/lib/utils";

type BookingFull = {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventDate: Date;
  eventStartTime: string | null;
  hours: number;
  eventType: string;
  estimatedTotal: { toString: () => string } | number | string;
  deliveryFee: { toString: () => string } | number | string;
  notes: string | null;
  venueName: string | null;
  venueAddress: string | null;
  guestCount: number | null;
  booth: { name: string };
  package: { hours: number; price: { toString: () => string } | number | string };
  backdrop: { name: string } | null;
};

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function sendCustomerConfirmation(b: BookingFull) {
  const html = await render(
    BookingCustomerEmail({
      customerName: b.customerName,
      eventDate: formatDate(b.eventDate),
      hours: b.hours,
      boothName: b.booth.name,
      total: formatCurrency(Number(b.estimatedTotal.toString())),
    })
  );
  return resend.emails.send({
    from: RESEND_FROM,
    to: b.customerEmail,
    subject: `We have your booking, ${b.customerName.split(" ")[0]}`,
    html,
  });
}

export async function sendOwnerNotification(b: BookingFull) {
  const html = await render(
    BookingOwnerEmail({
      bookingId: b.id,
      customerName: b.customerName,
      customerEmail: b.customerEmail,
      customerPhone: b.customerPhone,
      eventDate: formatDate(b.eventDate),
      eventStartTime: b.eventStartTime,
      hours: b.hours,
      eventType: b.eventType,
      boothName: b.booth.name,
      packageHours: b.package.hours,
      packagePrice: formatCurrency(Number(b.package.price.toString())),
      backdropName: b.backdrop?.name ?? null,
      venueName: b.venueName,
      venueAddress: b.venueAddress,
      guestCount: b.guestCount,
      notes: b.notes,
      estimatedTotal: formatCurrency(Number(b.estimatedTotal.toString())),
      deliveryFee: formatCurrency(Number(b.deliveryFee.toString())),
      adminUrl: `${SITE}/admin/bookings/${b.id}`,
    })
  );
  return resend.emails.send({
    from: RESEND_FROM,
    to: OWNER_EMAIL,
    subject: `New booking · ${b.customerName} · ${formatDate(b.eventDate)}`,
    html,
  });
}

export async function sendQuoteNotification(q: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventDate: Date | null;
  eventType: string | null;
  hours: number | null;
  message: string | null;
}) {
  const html = await render(
    QuoteOwnerEmail({
      customerName: q.customerName,
      customerEmail: q.customerEmail,
      customerPhone: q.customerPhone,
      eventDate: q.eventDate ? formatDate(q.eventDate) : null,
      eventType: q.eventType,
      hours: q.hours,
      message: q.message,
    })
  );
  return resend.emails.send({
    from: RESEND_FROM,
    to: OWNER_EMAIL,
    subject: `Quote request · ${q.customerName}`,
    html,
  });
}

export async function sendContactNotification(c: {
  name: string;
  email: string;
  phone: string | null;
  message: string;
}) {
  const html = await render(ContactOwnerEmail(c));
  return resend.emails.send({
    from: RESEND_FROM,
    to: OWNER_EMAIL,
    subject: `Contact · ${c.name}`,
    html,
    replyTo: c.email,
  });
}
