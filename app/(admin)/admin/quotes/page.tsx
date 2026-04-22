import { prisma } from "@/lib/prisma";
import { isDatabaseConfigured } from "@/lib/content";
import { formatDate } from "@/lib/utils";

async function getQuotes() {
  if (!isDatabaseConfigured()) return [];
  return prisma.quote.findMany({ orderBy: { createdAt: "desc" } });
}

export default async function QuotesPage() {
  const quotes = await getQuotes();

  return (
    <div>
      <h1 className="text-2xl font-black text-white">Quote requests</h1>
      <p className="mt-1 text-sm text-white/40">{quotes.length} total</p>

      <div className="mt-8 overflow-hidden rounded-xl border border-white/8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8 bg-[#1a1a1a]">
              {["Customer", "Phone", "Event date", "Type", "Hours", "Message", "Received"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-widest text-white/40">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {quotes.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-12 text-center text-white/30">No quote requests yet</td></tr>
            ) : quotes.map((q) => (
              <tr key={q.id} className="transition-colors hover:bg-white/3">
                <td className="px-4 py-3">
                  <p className="font-medium text-white">{q.customerName}</p>
                  <a href={`mailto:${q.customerEmail}`} className="text-xs text-champagne hover:underline">{q.customerEmail}</a>
                </td>
                <td className="px-4 py-3 text-white/60">{q.customerPhone}</td>
                <td className="px-4 py-3 text-white/60">{q.eventDate ? formatDate(q.eventDate) : "—"}</td>
                <td className="px-4 py-3 text-white/60">{q.eventType ?? "—"}</td>
                <td className="px-4 py-3 text-white/60">{q.hours ?? "—"}</td>
                <td className="max-w-xs px-4 py-3 truncate text-white/50">{q.message ?? "—"}</td>
                <td className="px-4 py-3 text-white/40">{formatDate(q.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
