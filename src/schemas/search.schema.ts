import z from "zod";


export const searchSchema = z.object({
  cityCode: z.string().min(1, "Location is required"),
  dateRange: z
    .object({
      from: z.string().min(1, "Start date is required"),
      to: z.string().min(1, "End date is required"),
    })
    .refine((d) => new Date(d.to) >= new Date(d.from), {
      message: "End date must be after start date",
      path: ["end"],
    }),
  guests: z.object({
    adults: z.number().min(1, "At least 1 adult is required"),
    children: z.number().min(0),
    infants: z.number().min(0),
    pets: z.number().min(0),
  }),
}); 