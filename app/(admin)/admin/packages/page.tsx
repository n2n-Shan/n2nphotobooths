import { prisma } from "@/lib/prisma";
import { isDatabaseConfigured } from "@/lib/content";
import { formatCurrency } from "@/lib/utils";
import { PackageActions } from "./PackageActions";

async function getPackages() {
  if (!isDatabaseConfigured()) return [];
  return prisma.package.findMany({ orderBy: [{ boothGroup: "asc" }, { hours: "asc" }] });
}

export default async function PackagesPage() {
  const packages = await getPackages();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Packages</h1>
          <p className="mt-1 text-sm text-white/40">{packages.length} packages</p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-white/8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8 bg-[#1a1a1a]">
              {["Group", "Hours", "Price", "Popular", "Inclusions", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-widest text-white/40">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {packages.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-12 text-center text-white/30">No packages</td></tr>
            ) : packages.map((p) => (
              <tr key={p.id} className="hover:bg-white/3">
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${p.boothGroup === "GLAM" ? "bg-champagne/15 text-champagne" : "bg-white/10 text-white/60"}`}>
                    {p.boothGroup}
                  </span>
                </td>
                <td className="px-4 py-3 font-bold text-white">{p.hours}h</td>
                <td className="px-4 py-3 font-bold text-champagne">{formatCurrency(Number(p.price))}</td>
                <td className="px-4 py-3 text-white/60">{p.isPopular ? "⭐ Yes" : "—"}</td>
                <td className="max-w-xs px-4 py-3 text-white/50 truncate">
                  {(p.inclusions as string[]).slice(0, 3).join(", ")}…
                </td>
                <td className="px-4 py-3"><PackageActions packageId={p.id} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
