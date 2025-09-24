"use client";

import { useMemo, useState } from "react";
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
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormValues } from "@/schemas/book.schema";
import ConfirmBookingModal from "@/components/modals/ConfirmBookingModal";
import { useParams } from "next/navigation";
import { hotelService } from "@/data-services/hotelData";
import { useQuery } from "@tanstack/react-query";
import { useHotelBookingStore } from "@/hooks/zustandStore.hooks";
import { differenceInDays, format } from "date-fns";

// type FormValues = z.infer<typeof formSchema>;
export default function BookingPage() {
  //   const params = useParams();
  // const offerIdParam = params?.offerId;

  const hotelDetails = useHotelBookingStore((state) => state.hotelDetails);

  // if (typeof offerIdParam !== 'string') {
  //   // Show error UI or return early
  //   return <p>Invalid offer ID</p>;
  // }

  // Now offerId is guaranteed string
  // const offerId: string = offerIdParam;

  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [formData, setFormData] = useState<FormValues | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
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

  // get offer data using amadeus query
  //   const { data, isLoading, error } = useQuery({
  //   queryKey: ["hotelOffer", offerId],
  //   enabled: Boolean(offerId),   // ⬅️ only run when offerId is truthy
  //   queryFn: async () => {
  //     const result = await hotelService.getOfferData(offerId);
  //     if (!result) throw new Error("No data"); // optional
  //     return result;
  //   },
  //   staleTime: 60 * 60 * 1000,
  // });

  const onSubmit = (data: FormValues) => {
    setFormData(data);
    setIsPaymentConfirmed(true);
  };

  //   if (isLoading) return <div>...Loading</div>
  //   if (error) return <p>Failed to load hotel offer</p>;
  // if (!data) return <div>No offer found</div>;  // optional guard

  //   if(data) console.log("data from booking", data);
  // if (!hotelDetails) {
  //   return <p>Please select a hotel first.</p>;
  // }

  console.log("hotelDetail from booking", hotelDetails);
  const { nights, withOutTotalPrice, onedayPrice, tax } = useMemo(() => {
  if (!hotelDetails) return { nights: 1, withOutTotalPrice: 0, onedayPrice: 0, tax: 0 };
  const nights = differenceInDays(
    hotelDetails?.offer?.checkOutDate!,
    hotelDetails?.offer?.checkInDate!
  );
  const total = parseFloat(hotelDetails?.offer?.price?.total!);
  const taxPerc = parseFloat(hotelDetails?.offer?.price?.taxes[0]?.percentage!);
  const withoutTotal = total - (total * taxPerc) / 100;
  return {
    nights,
    withOutTotalPrice: withoutTotal.toFixed(2),
    onedayPrice: (withoutTotal / nights).toFixed(2),
    tax: (total - withoutTotal).toFixed(2)
  };
}, [hotelDetails]);


  return !hotelDetails ? (
    <div>Loading...</div>
  ) : (
    <>
      {/* header */}
      <header className="max-w-[1840px] mx-auto flex md:block md:w-full top-0 bg-white shadow-sm py-3 md:py-0 px-5 md:px-0">
        <div className="flex items-center justify-center md:justify-between md:px-6 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 mr-4 z-10">
            <span className="text-4xl font-bold text-red-500">SD</span>
            <span className="text-xl hidden md:inline font-semibold text-gray-800">
              Travel
            </span>
          </Link>
        </div>
      </header>

      {/* main */}
      <main className="w-full">
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
              <section className="flex-1 space-y-6">
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
                  {isPaymentConfirmed && (
                    <>
                      <p className="text-sm text-gray-600 mt-2">
                        By selecting the button, I agree to the{" "}
                        <span className="underline cursor-pointer">
                          booking terms
                        </span>
                        .
                      </p>
                      <Button
                        onClick={() => {
                          setButtonLoading(true);

                          setTimeout(() => {
                            setIsOpen(true);
                            setButtonLoading(false); // ✅ stop loader after task
                          }, 3000);
                        }}
                        disabled={buttonLoading} // optional: disable button during loading
                        className="mt-6 w-full bg-pink-600 hover:bg-pink-700"
                      >
                        {buttonLoading ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          "Confirm and pay"
                        )}
                      </Button>
                    </>
                  )}
                </Card>
              </section>

              {/* right */}
              <section className="md:w-[300px] lg:w-[350px]">
                <Card className="p-6 rounded-2xl shadow-sm sticky top-10">
                  <div className="flex gap-4">
                    <Image
                      src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NjE5Mzc0MDg3NzM1MTA5MTM0/original/ddb89954-9b3f-467d-9fdf-036affd6b537.jpeg?im_w=1200"
                      alt="Hotel room"
                      width={80}
                      height={90}
                      className="rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{hotelDetails?.name}</h3>
                      <p className="text-sm text-gray-600">
                        {hotelDetails?.address?.cityName +
                          ", " +
                          hotelDetails?.address?.countryCode}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 text-sm space-y-2">
                    {hotelDetails?.offer?.policies?.cancellations?.map(
                      (policy: any, i: number) => (
                        <p key={i}>
                          Free cancellation before{" "}
                          <span className="font-medium">{policy.deadline}</span>{" "}
                          <br />• Charge for {policy.numberOfNights} night(s)
                          after deadline
                        </p>
                      )
                    )}

                    <div className="flex justify-between mt-4">
                      <span>Dates</span>
                      <span>
                        {format(
                          new Date(hotelDetails?.offer?.checkInDate!),
                          "dd"
                        )}{" "}
                        -{" "}
                        {format(
                          new Date(hotelDetails?.offer?.checkOutDate!),
                          "dd LLL"
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Guests</span>
                      <span>
                        {(hotelDetails?.offer?.guests?.adults || 0) +
                          (hotelDetails?.offer?.guests?.children || 0) +
                          " guests"}
                      </span>
                    </div>

                    <hr className="my-3" />

                    <div className="flex justify-between">
                      <span>{nights + " nights ×" + { onedayPrice }}</span>
                      <span>{withOutTotalPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes</span>
                      <span>{tax}</span>
                    </div>

                    <hr className="my-3" />

                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total INR</span>
                      <span>₹{hotelDetails?.offer?.price?.total}</span>
                    </div>

                    <button className="text-sm underline text-gray-600 mt-1">
                      Price breakdown
                    </button>
                  </div>
                </Card>
              </section>
            </form>
          </div>
        </div>
      </main>
      {/* footer */}
      <footer className="h-24 w-full bg-gray-200 text-center">
        {" "}
        Privacy and Policeies
      </footer>
      {isOpen && (
        <ConfirmBookingModal
          onClose={() => setIsOpen(false)}
          hotelDetails={"Hello"}
        />
      )}
    </>
  );
}
