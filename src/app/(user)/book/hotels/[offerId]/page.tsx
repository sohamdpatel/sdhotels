"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ArrowLeft,
  CreditCard,
  Landmark,
  Smartphone,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// type FormValues = {
//   paymentMethod: "upi" | "card" | "netbanking";
//   upiId?: string;
//   cardNumber?: string;
//   expiry?: string;
//   cvv?: string;
//   cardholder?: string;
//   bankName?: string;
// };

const formSchema = z.discriminatedUnion("paymentMethod", [
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

type FormValues = z.infer<typeof formSchema>;

// type FormValues = z.infer<typeof formSchema>;
export default function BookingPage() {
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [formData, setFormData] = useState<FormValues | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { paymentMethod: "card" },
  });

  const paymentMethod = watch("paymentMethod");

  const onSubmit = (data: FormValues) => {
    setFormData(data);
    setIsPaymentConfirmed(true);
  };

  return (
    <>
      {/* header */}
      <div className="max-w-[1840px] mx-auto flex md:block md:w-full top-0 bg-white shadow-sm py-3 md:py-0 px-5 md:px-0">
        <div className="flex items-center justify-center md:justify-between md:px-6 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 mr-4 z-10">
            <span className="text-4xl font-bold text-red-500">SD</span>
            <span className="text-xl hidden md:inline font-semibold text-gray-800">
              Travel
            </span>
          </Link>
        </div>
      </div>

      {/* main */}
      <div className="w-full">
        <div className="max-w-[1024px] mx-auto p-4 min-[848px]:p-10 flex md:justify-center lg:justify-normal">
          <div>
            <div className="bg-gray-200 p-2 rounded-full w-fit sticky top-4 sm:top-10 z-20">
              <ArrowLeft />
            </div>
          </div>

          <div className="ml-4 lg:ml-10 w-full">
            <h1 className="font-bold text-2xl sm:text-3xl mb-6">
              Confirm and Pay
            </h1>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col-reverse md:flex-row gap-6 transition-all ease-out"
            >
              {/* left content */}
              <div className="flex-1 space-y-6">
                {/* Step 1 */}
                <Card className="p-6 rounded-2xl shadow-sm">
                  {!isPaymentConfirmed ? (
                    <>
                      <h2 className="text-xl font-semibold mb-4">
                        1. Add a payment method
                      </h2>

                      <RadioGroup
                        className="divide-y"
                        value={paymentMethod}
                        onValueChange={(val) => {
                          const event = {
                            target: { name: "paymentMethod", value: val },
                          } as any;
                          register("paymentMethod").onChange(event);
                        }}
                      >
                        {/* UPI */}
                        <div className="flex flex-col gap-3 py-2">
                          <div className="flex items-center space-x-3 p-3 rounded-lg">
                            <RadioGroupItem value="upi" id="upi" />
                            <Smartphone className="w-5 h-5" />
                            <Label
                              htmlFor="upi"
                              className="flex-1 cursor-pointer"
                            >
                              UPI
                            </Label>
                          </div>
                          {paymentMethod === "upi" && (
                            <div>
                              <input
                                type="text"
                                placeholder="Virtual payment address"
                                {...register("upiId")}
                                className={`w-full border rounded-md px-3 py-2 text-sm ${
                                  (errors as any)?.upiId
                                    ? "border-red-500 bg-red-50"
                                    : ""
                                }`}
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                Example: username@bank
                              </p>
                              {(errors as any)?.upiId && (
                                <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                                  <AlertCircle className="w-4 h-4" />{" "}
                                  {(errors as any).upiId.message}
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Credit Card */}
                        <div className="py-2">
                          <div className="flex items-center space-x-3 p-3 rounded-lg">
                            <RadioGroupItem value="card" id="card" />
                            <CreditCard className="w-5 h-5" />
                            <Label
                              htmlFor="card"
                              className="flex-1 cursor-pointer"
                            >
                              Credit or debit card
                            </Label>
                            <div className="flex space-x-1">
                              <Image
                                src="/visa.png"
                                alt="visa"
                                width={30}
                                height={20}
                              />
                              <Image
                                src="/mastercard.png"
                                alt="master"
                                width={30}
                                height={20}
                              />
                              <Image
                                src="/amex.png"
                                alt="amex"
                                width={30}
                                height={20}
                              />
                            </div>
                          </div>
                          {paymentMethod === "card" && (
                            <div className="space-y-3 mt-3">
                              <div>
                                <input
                                  type="text"
                                  placeholder="Card number"
                                  {...register("cardNumber")}
                                  className={`w-full border rounded-md px-3 py-2 text-sm ${
                                    (errors as any)?.cardNumber
                                      ? "border-red-500 bg-red-50"
                                      : ""
                                  }`}
                                />
                                {(errors as any)?.cardNumber && (
                                  <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                                    <AlertCircle className="w-4 h-4" />{" "}
                                    {(errors as any).cardNumber.message}
                                  </p>
                                )}
                              </div>

                              <div className="flex gap-3 w-full">
                                <div>
                                  <input
                                    type="text"
                                    placeholder="MM/YY"
                                    maxLength={5} // e.g. "12/26"
                                    {...register("expiry")}
                                    onChange={(e) => {
                                      let val = e.target.value.replace(
                                        /\D/g,
                                        ""
                                      ); // remove non-digits
                                      if (val.length >= 3) {
                                        val =
                                          val.slice(0, 2) +
                                          "/" +
                                          val.slice(2, 4);
                                      }
                                      e.target.value = val;
                                      register("expiry").onChange(e); // notify RHF
                                    }}
                                    className={`flex-1 border rounded-md px-3 py-2 text-sm ${
                                      (errors as any)?.expiry
                                        ? "border-red-500 bg-red-50"
                                        : ""
                                    }`}
                                  />
                                  {(errors as any)?.expiry && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                      <AlertCircle className="w-4 h-4" />{" "}
                                      {(errors as any).expiry.message}
                                    </p>
                                  )}
                                </div>
                                <div>
                                  <input
                                    type="text"
                                    placeholder="CVV"
                                    {...register("cvv")}
                                    className={`flex-1 border rounded-md px-3 py-2 text-sm ${
                                      (errors as any)?.cvv
                                        ? "border-red-500 bg-red-50"
                                        : ""
                                    }`}
                                  />
                                  {(errors as any)?.cvv && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                      <AlertCircle className="w-4 h-4" />{" "}
                                      {(errors as any).cvv.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div>
                                <input
                                  type="text"
                                  placeholder="Cardholder name"
                                  {...register("cardholder")}
                                  className={`w-full border rounded-md px-3 py-2 text-sm ${
                                    (errors as any)?.cardholder
                                      ? "border-red-500 bg-red-50"
                                      : ""
                                  }`}
                                />
                                {(errors as any)?.cardholder && (
                                  <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                                    <AlertCircle className="w-4 h-4" />{" "}
                                    {(errors as any).cardholder.message}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Net Banking */}
                        <div className="py-2">
                          <div className="flex items-center space-x-3 p-3 rounded-lg">
                            <RadioGroupItem
                              value="netbanking"
                              id="netbanking"
                            />
                            <Landmark className="w-5 h-5" />
                            <Label
                              htmlFor="netbanking"
                              className="flex-1 cursor-pointer"
                            >
                              Net Banking
                            </Label>
                          </div>
                          {paymentMethod === "netbanking" && (
                            <div>
                              <input
                                type="text"
                                placeholder="Bank name"
                                {...register("bankName")}
                                className={`w-full border rounded-md px-3 py-2 text-sm ${
                                  (errors as any)?.bankName
                                    ? "border-red-500 bg-red-50"
                                    : ""
                                }`}
                              />
                              {(errors as any)?.bankName && (
                                <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                                  <AlertCircle className="w-4 h-4" />{" "}
                                  {(errors as any).bankName.message}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </RadioGroup>

                      {(errors as any)?.paymentMethod && (
                        <p className="text-sm text-red-600 flex items-center gap-1 mt-2">
                          <AlertCircle className="w-4 h-4" />{" "}
                          {(errors as any).paymentMethod.message as string}
                        </p>
                      )}

                      <Button type="submit" className="mt-6 w-full">
                        Next
                      </Button>
                    </>
                  ) : (
                    // ✅ Summary view after completion
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-lg font-semibold mb-2">
                          1. Add a payment method
                        </h2>
                        {formData?.paymentMethod === "upi" && (
                          <p className="text-gray-700">{formData.upiId}</p>
                        )}
                        {formData?.paymentMethod === "card" && (
                          <p className="text-gray-700">
                            •••• •••• •••• {formData.cardNumber?.slice(-4)}
                          </p>
                        )}
                        {formData?.paymentMethod === "netbanking" && (
                          <p className="text-gray-700">{formData.bankName}</p>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setIsPaymentConfirmed(false)}
                      >
                        Change
                      </Button>
                    </div>
                  )}
                </Card>

                {/* Step 2 */}
                <Card className="p-6 rounded-2xl shadow-sm">
                  <h2 className="text-xl font-semibold">
                    2. Review your reservation
                  </h2>
                  {isPaymentConfirmed && <>
                  <p className="text-sm text-gray-600 mt-2">
                    By selecting the button, I agree to the{" "}
                    <span className="underline cursor-pointer">
                      booking terms
                    </span>
                    .
                  </p>
                  <Button className="mt-6 w-full bg-pink-600 hover:bg-pink-700">
                    Confirm and pay
                  </Button>
                  </>}
                </Card>
              </div>

              {/* right */}
              <div className="md:w-[300px] lg:w-[350px]">
                <Card className="p-6 rounded-2xl shadow-sm sticky top-10">
                  <div className="flex gap-4">
                    <Image
                      src="/hotel-room.jpg"
                      alt="Hotel room"
                      width={120}
                      height={90}
                      className="rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">
                        Luxury 2BHK – Leela Niwas – Ground Floor
                      </h3>
                      <p className="text-sm text-gray-600">
                        ⭐ 4.83 (6) · Guest favourite
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 text-sm space-y-2">
                    <p className="text-green-600 font-medium">
                      Free cancellation
                    </p>
                    <p className="text-gray-600">
                      Cancel before <b>3 Feb</b> for a full refund.{" "}
                      <span className="underline cursor-pointer">
                        Full policy
                      </span>
                    </p>

                    <div className="flex justify-between mt-4">
                      <span>Dates</span>
                      <span>4–6 Feb 2026</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Guests</span>
                      <span>6 adults</span>
                    </div>

                    <hr className="my-3" />

                    <div className="flex justify-between">
                      <span>2 nights × ₹7,189.42</span>
                      <span>₹14,378.83</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes</span>
                      <span>₹1,512</span>
                    </div>

                    <hr className="my-3" />

                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total INR</span>
                      <span>₹15,890.83</span>
                    </div>

                    <button className="text-sm underline text-gray-600 mt-1">
                      Price breakdown
                    </button>
                  </div>
                </Card>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="h-24 w-full bg-gray-200"></div>
    </>
  );
}
