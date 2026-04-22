import type { Metadata } from "next";
import { getBooths } from "@/lib/queries";
import { PageHeader } from "@/components/marketing/PageHeader";
import { BoothShowcase } from "@/components/marketing/BoothShowcase";

export const metadata: Metadata = {
  title: "Photo Booths",
  description: "Three booth styles — open-air, glam, enclosed — each crafted with studio lighting and instant prints.",
};

export const revalidate = 600;

export default async function PhotoBoothsPage() {
  const booths = await getBooths();
  return (
    <>
      <PageHeader
        eyebrow="Three booths · one obsession"
        title="Choose the room"
        italicTail="your guests want to live inside."
        intro="Studio-quality cameras, professional lighting, and an attendant who treats every guest like the cover of a magazine."
      />
      <BoothShowcase booths={booths} />
    </>
  );
}
