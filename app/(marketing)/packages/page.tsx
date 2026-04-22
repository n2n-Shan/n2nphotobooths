import type { Metadata } from "next";
import { getPackages } from "@/lib/queries";
import { PageHeader } from "@/components/marketing/PageHeader";
import { PackageTable } from "@/components/marketing/PackageTable";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Packages",
  description:
    "Transparent pricing for open-air, glam, and enclosed photo booths. From 2 to 5 hours, no deposit, free metro delivery.",
};

export const revalidate = 600;

const ADDONS = [
  ["Extra hour", "$120 / hr", "Add time on the night, billed at the end."],
  ["Traditional guest book", "$80", "Leather-bound, with strip mounted by your attendant."],
  ["Custom photo-strip design", "Included", "Branded, themed, or initials — turned around in 24h."],
  ["Premium prop wardrobe", "$60", "Curated by event style, swapped to your colour palette."],
];

export default async function PackagesPage() {
  const packages = await getPackages();
  const oe = packages
    .filter((p) => p.boothGroup === "OPEN_ENCLOSED")
    .map((p) => ({ ...p, inclusions: (p.inclusions as string[]) ?? [] }));
  const glam = packages
    .filter((p) => p.boothGroup === "GLAM")
    .map((p) => ({ ...p, inclusions: (p.inclusions as string[]) ?? [] }));

  return (
    <>
      <PageHeader
        eyebrow="No deposit · No hidden fees"
        title="Packages"
        italicTail="for every kind of night."
        intro="Two pricing tiers that cover open-air, enclosed, and our signature glam booth. Free delivery within 40km of the Melbourne CBD."
      />

      <PackageTable
        title="Open Air & Enclosed"
        subtitle="Studio-quality, instant 4×6 prints"
        packages={oe}
      />

      <PackageTable
        title="Glam Booth"
        subtitle="Black & white · postcard prints · beauty filter"
        packages={glam}
      />

      {/* Add-ons */}
      <section className="bg-[#1a1a1a] py-24 md:py-32">
        <div className="container-luxe grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-4">
            <p className="eyebrow">Make it yours</p>
            <h2 className="display mt-6 text-4xl text-white md:text-5xl">
              Add-ons &amp;
              <br />
              <span className="display-italic text-champagne">extras.</span>
            </h2>
          </Reveal>
          <div className="md:col-span-8">
            <ul className="divide-y divide-white/8 border-y border-white/8">
              {ADDONS.map(([name, price, desc]) => (
                <Reveal key={name} as="li" className="grid grid-cols-12 gap-4 py-6 md:py-8">
                  <p className="col-span-7 text-2xl font-bold text-white md:col-span-5">{name}</p>
                  <p className="col-span-5 text-right text-xl font-bold text-champagne md:order-3 md:col-span-2">
                    {price}
                  </p>
                  <p className="col-span-12 text-sm text-white/50 md:col-span-5 md:text-base">{desc}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
