import { prisma } from "@/lib/prisma";
import { isDatabaseConfigured } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

async function getStats() {
  if (!isDatabaseConfigured()) return { pending: 0, thisMonth: 0, upcoming: 0, recentBookings: [] };
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const in30 = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  const [pending, thisMonth, upcoming, recentBookings] = await Promise.all([
    prisma.booking.count({ where: { status: "PENDING" } }),
    prisma.booking.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.booking.count({ where: { eventDate: { gte: now, lte: in30 }, status: { in: ["PENDING", "CONFIRMED"] } } }),
    prisma.booking.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      select: { id: true, customerName: true, eventDate: true, eventType: true, status: true, estimatedTotal: true },
    }),
  ]);
  return { pending, thisMonth, upcoming, recentBookings };
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-500/15 text-yellow-400",
  CONFIRMED: "bg-green-500/15 text-green-400",
  COMPLETED: "bg-blue-500/15 text-blue-400",
  CANCELLED: "bg-red-500/15 text-red-400",
};

export default async function AdminDashboard() {
  const { pending, thisMonth, upcoming, recentBookings } = await getStats();

  return (
    <div>
      <h1 className="text-2xl font-black text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-white/40">N2N Photobooths admin panel</p>

      {/* Stat cards */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Pending bookings", value: pending, color: "text-yellow-400" },
          { label: "Bookings this month", value: thisMonth, color: "text-white" },
          { label: "Upcoming (30 days)", value: upcoming, color: "text-champagne" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-white/8 bg-[#1a1a1a] p-6">
            <p className="text-sm text-white/50">{s.label}</p>
            <p className={`mt-2 text-4xl font-black ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Recent bookings</h2>
          <Link href="/admin/bookings" className="text-sm text-champagne hover:text-champagne-deep">
            View all →
          </Link>
        </div>
        <div className="overflow-hidden rounded-xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-[#1a1a1a]">
                {["Customer", "Event date", "Type", "Status", "Total"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-widest text-white/40">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentBookings.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-white/30">No bookings yet</td></tr>
              ) : recentBookings.map((b) => (
                <tr key={b.id} className="transition-colors hover:bg-white/3">
                  <td className="px-4 py-3">
                    <Link href={`/admin/bookings/${b.id}`} className="font-medium text-white hover:text-champagne">
                      {b.customerName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-white/60">{formatDate(b.eventDate)}</td>
                  <td className="px-4 py-3 text-white/60">{b.eventType}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${STATUS_COLORS[b.status] ?? "bg-white/10 text-white"}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-bold text-white">${Number(b.estimatedTotal).toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
