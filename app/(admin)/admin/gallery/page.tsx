import { prisma } from "@/lib/prisma";
import { isDatabaseConfigured } from "@/lib/content";
import Image from "next/image";
import { GalleryForm } from "./GalleryForm";

async function getGalleryItems() {
  if (!isDatabaseConfigured()) return [];
  return prisma.galleryItem.findMany({ orderBy: { sortOrder: "asc" } });
}

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Gallery</h1>
          <p className="mt-1 text-sm text-white/40">{items.length} images</p>
        </div>
        <GalleryForm mode="create" />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <div key={item.id} className="group relative overflow-hidden rounded-xl border border-white/8 bg-[#1a1a1a]">
            <div className="relative aspect-square w-full bg-[#0f0f0f]">
              <Image src={item.imageUrl} alt={item.alt} fill sizes="300px" className="object-cover opacity-80" />
            </div>
            <div className="p-4">
              <p className="font-bold text-white">{item.alt}</p>
              <p className="mt-0.5 text-xs text-champagne">
                {item.eventType.charAt(0) + item.eventType.slice(1).toLowerCase()}
              </p>
            </div>
            <div className="absolute right-2 top-2">
              <GalleryForm
                mode="edit"
                item={{ id: item.id, imageUrl: item.imageUrl, eventType: item.eventType, alt: item.alt }}
              />
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="col-span-full py-12 text-center text-white/30">No gallery images yet. Add one above.</p>
        )}
      </div>
    </div>
  );
}
