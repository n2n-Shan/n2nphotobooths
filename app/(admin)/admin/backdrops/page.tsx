import { prisma } from "@/lib/prisma";
import { isDatabaseConfigured, STATIC_BACKDROPS } from "@/lib/content";
import Image from "next/image";
import { BackdropForm } from "./BackdropForm";

async function getBackdrops() {
  if (!isDatabaseConfigured()) return STATIC_BACKDROPS;
  return prisma.backdrop.findMany({ orderBy: { sortOrder: "asc" } });
}

export default async function BackdropsPage() {
  const backdrops = await getBackdrops();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Backdrops</h1>
          <p className="mt-1 text-sm text-white/40">{backdrops.length} backdrops</p>
        </div>
        <BackdropForm mode="create" />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {backdrops.map((b) => (
          <div key={b.id} className="group relative overflow-hidden rounded-xl border border-white/8 bg-[#1a1a1a]">
            <div className="relative aspect-[3/4] w-full bg-[#0f0f0f]">
              <Image src={b.imageUrl} alt={b.name} fill sizes="300px" className="object-cover opacity-80" />
            </div>
            <div className="p-4">
              <p className="font-bold text-white">{b.name}</p>
              <p className="mt-0.5 text-xs text-champagne">{b.mood}</p>
            </div>
            <div className="absolute right-2 top-2">
              <BackdropForm mode="edit" backdrop={{ id: b.id, name: b.name, mood: b.mood, imageUrl: b.imageUrl, slug: b.slug }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
