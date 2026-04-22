import { z } from "zod";

export const eventTypeEnum = z.enum([
  "WEDDING",
  "BIRTHDAY",
  "CORPORATE",
  "SCHOOL",
  "OTHER",
]);

export const bookingSchema = z.object({
  eventDate: z.coerce.date({
    message: "Please select an event date",
  }),
  eventStartTime: z.string().optional(),
  hours: z.coerce.number().int().min(2).max(12),
  eventType: eventTypeEnum,
  boothId: z.string().min(1, "Please choose a booth"),
  packageId: z.string().min(1, "Please choose a package"),
  backdropId: z.string().optional().nullable(),
  addons: z.array(z.string()).default([]),
  venueName: z.string().optional(),
  venueAddress: z.string().min(3, "Venue address required").optional().or(z.literal("")),
  venuePostcode: z.string().optional(),
  guestCount: z.coerce.number().int().positive().optional(),
  customerName: z.string().min(2, "Please share your name"),
  customerEmail: z.string().email("Enter a valid email"),
  customerPhone: z.string().min(6, "Please share a phone number"),
  notes: z.string().optional(),
  estimatedTotal: z.coerce.number().nonnegative(),
  deliveryFee: z.coerce.number().nonnegative().default(0),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const quoteSchema = z.object({
  eventDate: z.coerce.date().optional().nullable(),
  eventType: eventTypeEnum.optional(),
  hours: z.coerce.number().int().min(2).max(12).optional(),
  customerName: z.string().min(2, "Please share your name"),
  customerEmail: z.string().email("Enter a valid email"),
  customerPhone: z.string().min(6, "Please share a phone number"),
  message: z.string().optional(),
});
export type QuoteInput = z.infer<typeof quoteSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Please share your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  message: z.string().min(10, "A few more words please"),
});
export type ContactInput = z.infer<typeof contactSchema>;
