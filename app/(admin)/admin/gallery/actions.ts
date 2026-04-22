"use server";

import { prisma } from "@/lib/prisma";
import { isDatabaseConfigured } from "@/lib/content";
import { revalidatePath } from "next/cache";

export async function upsertGalleryItem(data: {
  id?: string;
  imageUrl: string;
  eventType: string;
  alt: string;
}) {
  if (!isDatabaseConfigured()) return { error: "Database not configured" };
  try {
    if (data.id) {
      await prisma.galleryItem.update({
        where: { id: data.id },
        data: { imageUrl: data.imageUrl, eventType: data.eventType as any, alt: data.alt },
      });
    } else {
      const count = await prisma.galleryItem.count();
      await prisma.galleryItem.create({
        data: { imageUrl: data.imageUrl, eventType: data.eventType as any, alt: data.alt, sortOrder: count },
      });
    }
    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
    return { ok: true };
  } catch (e) {
    console.error(e);
    return { error: "Failed to save gallery item" };
  }
}

export async function deleteGalleryItem(id: string) {
  if (!isDatabaseConfigured()) return;
  await prisma.galleryItem.delete({ where: { id } });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}
