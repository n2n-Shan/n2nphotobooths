import { prisma } from "@/lib/prisma";
import { isDatabaseConfigured } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-500/15 text-yellow-400",
  CONFIRMED: "bg-green-500/15 text-green-400",
  COMPLETED: "bg-blue-500/15 text-blue-400",
  CANCELLED: "bg-red-500/15 text-red-400",
};

async function getBookings() {
  if (!isDatabaseConfigured()) return [];
  return prisma.booking.findMany({
    orderBy: { eventDate: "asc" },
    include: { booth: true, package: true },
  });
}

export default async function BookingsPage() {
  const bookings = await getBookings();

  return (
    <div>
      <h1 className="text-2xl font-black text-white">Bookings</h1>
      <p className="mt-1 text-sm text-white/40">{bookings.length} total</p>

      <div className="mt-8 overflow-hidden rounded-xl border border-white/8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8 bg-[#1a1a1a]">
              {["Customer", "Event date", "Booth", "Hours", "Status", "Total", ""].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-widest text-white/40">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {bookings.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-12 text-center text-white/30">No bookings yet</td></tr>
            ) : bookings.map((b) => (
              <tr key={b.id} className="transition-colors hover:bg-white/3">
                <td className="px-4 py-3">
                  <p className="font-medium text-white">{b.customerName}</p>
                  <p className="text-xs text-white/40">{b.customerEmail}</p>
                </td>
                <td className="px-4 py-3 text-white/70">{formatDate(b.eventDate)}</td>
                <td className="px-4 py-3 text-white/70">{b.booth.name}</td>
                <td className="px-4 py-3 text-white/70">{b.hours}h</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${STATUS_COLORS[b.status] ?? ""}`}>
                    {b.status}
                  </span>
                </td>
                <td className="px-4 py-3 font-bold text-white">${Number(b.estimatedTotal).toFixed(0)}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/bookings/${b.id}`} className="text-champagne hover:text-champagne-deep">
                    View →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
