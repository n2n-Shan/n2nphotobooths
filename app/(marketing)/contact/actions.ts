"use server";

import { contactSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { sendContactNotification } from "@/lib/email";
import { isDatabaseConfigured } from "@/lib/content";

export type ActionState = { ok: boolean; error?: string };

export async function submitContact(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Please check your details." };
  }

  try {
    if (isDatabaseConfigured()) {
      await prisma.contact.create({
        data: {
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone ?? null,
          message: parsed.data.message,
        },
      });
    }
    if (process.env.RESEND_API_KEY) {
      await sendContactNotification({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone ?? null,
        message: parsed.data.message,
      });
    }
    return { ok: true };
  } catch (err) {
    console.error("[contact]", err);
    return { ok: false, error: "Something went wrong on our end. Please try again or call 0414 521 425." };
  }
}
