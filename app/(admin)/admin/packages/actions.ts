"use server";

import { prisma } from "@/lib/prisma";
import { isDatabaseConfigured } from "@/lib/content";
import { revalidatePath } from "next/cache";

export async function togglePackagePopular(id: string) {
  if (!isDatabaseConfigured()) return;
  const pkg = await prisma.package.findUnique({ where: { id }, select: { isPopular: true } });
  if (!pkg) return;
  await prisma.package.update({ where: { id }, data: { isPopular: !pkg.isPopular } });
  revalidatePath("/admin/packages");
}
