"use server";

import { prisma } from "@/lib/prisma";
import { isDatabaseConfigured } from "@/lib/content";
import { revalidatePath } from "next/cache";

export async function updateBookingStatus(id: string, status: string) {
  if (!isDatabaseConfigured()) return;
  await prisma.booking.update({ where: { id }, data: { status: status as "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" } });
  revalidatePath(`/admin/bookings/${id}`);
  revalidatePath("/admin/bookings");
  revalidatePath("/admin");
}
