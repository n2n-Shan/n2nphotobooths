/**
 * Data queries that fall back to static content if no database is configured.
 * Marketing pages call these so the site renders before Supabase is wired up.
 */
import { prisma } from "@/lib/prisma";
import {
  STATIC_BOOTHS,
  STATIC_PACKAGES,
  STATIC_BACKDROPS,
  STATIC_GALLERY,
  isDatabaseConfigured,
} from "@/lib/content";

export async function getBooths() {
  if (!isDatabaseConfigured()) return STATIC_BOOTHS;
  try {
    return await prisma.booth.findMany({ orderBy: { sortOrder: "asc" } });
  } catch (e) {
    console.warn("[queries] booths fallback to static:", (e as Error).message);
    return STATIC_BOOTHS;
  }
}

export async function getBoothBySlug(slug: string) {
  if (!isDatabaseConfigured()) return STATIC_BOOTHS.find((b) => b.slug === slug) ?? null;
  try {
    return await prisma.booth.findUnique({ where: { slug } });
  } catch {
    return STATIC_BOOTHS.find((b) => b.slug === slug) ?? null;
  }
}

export async function getPackages() {
  if (!isDatabaseConfigured())
    return STATIC_PACKAGES.map((p) => ({ ...p, price: p.price as unknown as number }));
  try {
    const packages = await prisma.package.findMany({
      orderBy: [{ boothGroup: "asc" }, { sortOrder: "asc" }],
    });
    return packages.map((p) => ({ ...p, price: Number(p.price) }));
  } catch {
    return STATIC_PACKAGES.map((p) => ({ ...p, price: p.price as unknown as number }));
  }
}

export async function getBackdrops() {
  if (!isDatabaseConfigured()) return STATIC_BACKDROPS;
  try {
    return await prisma.backdrop.findMany({ orderBy: { sortOrder: "asc" } });
  } catch {
    return STATIC_BACKDROPS;
  }
}

export async function getGallery() {
  if (!isDatabaseConfigured()) return STATIC_GALLERY;
  try {
    return await prisma.galleryItem.findMany({ orderBy: { sortOrder: "asc" } });
  } catch {
    return STATIC_GALLERY;
  }
}
