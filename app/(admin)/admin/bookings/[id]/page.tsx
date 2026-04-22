import { prisma } from "@/lib/prisma";
import { isDatabaseConfigured } from "@/lib/content";
import { formatDate, formatCurrency } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { StatusChanger } from "./StatusChanger";

async function getBooking(id: string) {
  if (!isDatabaseConfigured()) return null;
  return prisma.booking.findUnique({
    where: { id },
    include: { booth: true, package: true, backdrop: true },
  });
}

export default async function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const booking = await getBooking(id);
  if (!booking) notFound();

  const rows: [string, string][] = [
    ["Event date", formatDate(booking.eventDate)],
    ["Start time", booking.eventStartTime ?? "—"],
    ["Duration", `${booking.hours} hours`],
    ["Event type", booking.eventType],
    ["Venue", booking.venueName ?? "—"],
    ["Address", booking.venueAddress ?? "—"],
    ["Postcode", booking.venuePostcode ?? "—"],
    ["Guest count", booking.guestCount?.toString() ?? "—"],
    ["Booth", booking.booth.name],
    ["Package", `${booking.package.hours}h — ${formatCurrency(Number(booking.package.price))}`],
    ["Backdrop", booking.backdrop?.name ?? "None specified"],
    ["Add-ons", (booking.addons as string[]).join(", ") || "None"],
    ["Notes", booking.notes ?? "—"],
  ];

  const contact: [string, string][] = [
    ["Name", booking.customerName],
    ["Email", booking.customerEmail],
    ["Phone", booking.customerPhone],
  ];

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/bookings" className="text-sm text-white/40 hover:text-white">← Bookings</Link>
        <span className="text-white/20">/</span>
        <span className="text-sm text-white">{booking.customerName}</span>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">{booking.customerName}</h1>
          <p className="mt-1 text-sm text-white/40">{booking.customerEmail} · {booking.customerPhone}</p>
        </div>
        <StatusChanger bookingId={booking.id} currentStatus={booking.status} />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Section title="Event details" rows={rows} />
        <div className="space-y-6">
          <Section title="Contact" rows={contact} />
          <div className="rounded-xl border border-white/8 bg-[#1a1a1a] p-5">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-white/40">Financials</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Package</span>
                <span className="text-white">{formatCurrency(Number(booking.package.price))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Delivery fee</span>
                <span className="text-white">{formatCurrency(Number(booking.deliveryFee))}</span>
              </div>
              <div className="flex justify-between border-t border-white/8 pt-2">
                <span className="font-bold text-white">Total</span>
                <span className="font-black text-champagne">{formatCurrency(Number(booking.estimatedTotal))}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <div className="rounded-xl border border-white/8 bg-[#1a1a1a] p-5">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-white/40">{title}</p>
      <dl className="space-y-2 text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4">
            <dt className="text-white/50">{k}</dt>
            <dd className="text-right text-white">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
