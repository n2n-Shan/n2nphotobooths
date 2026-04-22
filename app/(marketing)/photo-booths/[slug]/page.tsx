import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBooths, getBoothBySlug } from "@/lib/queries";
import { BoothDetail } from "@/components/marketing/BoothDetail";

type Params = { slug: string };

export async function generateStaticParams() {
  const booths = await getBooths();
  return booths.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const booth = await getBoothBySlug(slug);
  if (!booth) return { title: "Booth not found" };
  return {
    title: `${booth.name} Photo Booth`,
    description: booth.tagline,
  };
}

export const revalidate = 600;

export default async function BoothPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const [booth, all] = await Promise.all([getBoothBySlug(slug), getBooths()]);
  if (!booth) notFound();

  const idx = all.findIndex((b) => b.slug === slug);
  const next = all[(idx + 1) % all.length];

  const boothTyped = { ...booth, gear: (booth.gear as string[]) ?? [] };
  return <BoothDetail booth={boothTyped} next={next ? { name: next.name, slug: next.slug } : undefined} />;
}
