import z from "zod";

export const formSchema = z.discriminatedUnion("paymentMethod", [
  // 🔹 UPI
  z.object({
    paymentMethod: z.literal("upi"),
    upiId: z
      .string()
      .trim()
      .min(1, "UPI ID is required")
      .regex(/^[\w.\-]{2,}@[a-zA-Z]{2,}$/, "Invalid UPI ID (e.g. name@bank)"),
  }),

  // 🔹 Card
  z.object({
    paymentMethod: z.literal("card"),
    cardNumber: z
      .string()
      .trim()
      .regex(/^\d{16,19}$/, "Card number must be 16–19 digits"),
    expiry: z
      .string()
      .trim()
      .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Invalid expiration (MM/YY)")
      .refine(
        (val) => {
          const [month, year] = val.split("/").map((v) => parseInt(v, 10));
          if (!month || !year) return false;

          const now = new Date();
          const currentMonth = now.getMonth() + 1;
          const currentYear = now.getFullYear() % 100;

          if (year < currentYear) return false;
          if (year === currentYear && month < currentMonth) return false;

          return true;
        },
        { message: "Expiration date must be in the future" }
      ),

    cvv: z
      .string()
      .trim()
      .regex(/^\d{3,4}$/, "Invalid CVV"),
    cardholder: z
      .string()
      .trim()
      .min(1, "Cardholder name is required")
      .regex(/^[a-zA-Z ]+$/, "Only letters and spaces allowed"),
  }),

  // 🔹 Netbanking
  z.object({
    paymentMethod: z.literal("netbanking"),
    bankName: z
      .string()
      .trim()
      .min(1, "Bank name is required")
      .regex(/^[a-zA-Z ]+$/, "Bank name must be letters only"),
  }),
]);

export type FormValues = z.infer<typeof formSchema>;