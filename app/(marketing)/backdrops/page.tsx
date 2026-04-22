import type { Metadata } from "next";
import { getBackdrops } from "@/lib/queries";
import { PageHeader } from "@/components/marketing/PageHeader";
import { BackdropGrid } from "@/components/marketing/BackdropGrid";

export const metadata: Metadata = {
  title: "Backdrops",
  description:
    "Fifteen editorial backdrops for the open-air photobooth — neutral, luxe, natural, geometric, and atmospheric.",
};

export const revalidate = 600;

export default async function BackdropsPage() {
  const backdrops = await getBackdrops();
  return (
    <>
      <PageHeader
        eyebrow="Fifteen worlds, one booth"
        title="A backdrop for"
        italicTail="every story."
        intro="Choose the room your portraits live in. Each backdrop is hung in-booth, lit with our studio strobes, and framed so your guests look like the cover of a magazine."
      />
      <BackdropGrid backdrops={backdrops} />
    </>
  );
}
