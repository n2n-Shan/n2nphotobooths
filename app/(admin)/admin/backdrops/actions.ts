"use server";

import { prisma } from "@/lib/prisma";
import { isDatabaseConfigured } from "@/lib/content";
import { revalidatePath } from "next/cache";

export async function upsertBackdrop(data: {
  id?: string;
  slug: string;
  name: string;
  mood: string;
  imageUrl: string;
}) {
  if (!isDatabaseConfigured()) return { error: "Database not configured" };
  try {
    if (data.id) {
      await prisma.backdrop.update({
        where: { id: data.id },
        data: { name: data.name, mood: data.mood, imageUrl: data.imageUrl, slug: data.slug },
      });
    } else {
      const count = await prisma.backdrop.count();
      await prisma.backdrop.create({
        data: { slug: data.slug, name: data.name, mood: data.mood, imageUrl: data.imageUrl, sortOrder: count },
      });
    }
    revalidatePath("/admin/backdrops");
    revalidatePath("/backdrops");
    return { ok: true };
  } catch (e) {
    console.error(e);
    return { error: "Failed to save backdrop" };
  }
}

export async function deleteBackdrop(id: string) {
  if (!isDatabaseConfigured()) return;
  await prisma.backdrop.delete({ where: { id } });
  revalidatePath("/admin/backdrops");
  revalidatePath("/backdrops");
}
