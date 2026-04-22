import type { Metadata } from "next";
import { getGallery } from "@/lib/queries";
import { PageHeader } from "@/components/marketing/PageHeader";
import { GalleryGrid } from "@/components/marketing/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Selected portraits and event photographs from N2N Photobooths.",
};

export const revalidate = 600;

export default async function GalleryPage() {
  const items = await getGallery();
  return (
    <>
      <PageHeader
        eyebrow="Selected work"
        title="A small archive"
        italicTail="of recent nights."
        intro="A curated cross-section of weddings, birthdays, brand activations, and school formals from the past few seasons."
      />
      <GalleryGrid items={items} />
    </>
  );
}
