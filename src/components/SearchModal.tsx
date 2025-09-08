"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { searchSchema } from "@/schemas/search.schema";

type SearchFormData = z.infer<typeof searchSchema>;

export default function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<"where" | "when" | "who">("where");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      cityCode: "",
      dateRange: { from: "", to: "" },
      guests: { adults: 0, children: 0, infants: 0, pets: 0 },
    },
  });

  const cityCode = watch("cityCode");
  const dateRange = watch("dateRange");
  const guests = watch("guests");
  const totalGuests =
    guests.adults + guests.children + guests.infants + guests.pets;

  useEffect(() => {
    if (!isOpen) return;
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  const handleNext = () => {
    if (step === "where") setStep("when");
    else if (step === "when") setStep("who");
  };

  const handleClear = () => {
    reset();
    setStep("where");
  };

  const onSubmit = (data: SearchFormData) => {
    console.log("✅ Search Data:", data);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-white transition-transform duration-500 ease-in-out
        ${isOpen ? "translate-y-0" : "translate-y-full"}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <Link href="/" className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-red-500">SD</span>
                  <span className="text-xl font-semibold text-gray-800">Travel</span>
                </Link>
        <button onClick={onClose}>
          <X className="h-6 w-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Steps */}
        <div className="p-4 space-y-4">
          {/* WHERE */}
          <div
            className={`border rounded-lg overflow-hidden transition-all duration-500 ${
              step === "where" ? "max-h-60" : "max-h-14"
            }`}
          >
            <div
              className="p-4 cursor-pointer font-medium flex justify-between"
              onClick={() => setStep("where")}
            >
              <span>Where?</span>
              <span className="text-gray-500">
                {cityCode || "I'm flexible"}
              </span>
            </div>
            <div className="px-4 pb-4">
              <input
                type="text"
                placeholder="Search destinations"
                className="w-full border rounded-lg p-3"
                {...register("cityCode")}
              />
              {errors.cityCode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.cityCode.message}
                </p>
              )}
            </div>
          </div>

          {/* WHEN */}
          <div
            className={`border rounded-lg overflow-hidden transition-all duration-500 ${
              step === "when" ? "max-h-96" : "max-h-14"
            }`}
          >
            <div
              className="p-4 cursor-pointer font-medium flex justify-between"
              onClick={() => setStep("when")}
            >
              <span>When?</span>
              <span className="text-gray-500">
                {dateRange?.from && dateRange?.to
                  ? `${dateRange.from} - ${dateRange.to}`
                  : "Add dateRange"}
              </span>
            </div>
            <div className="px-4 pb-4 grid grid-cols-2 gap-2">
              <input
                type="date"
                className="border rounded-lg p-3"
                {...register("dateRange.from")}
              />
              <input
                type="date"
                className="border rounded-lg p-3"
                {...register("dateRange.to")}
              />
              {(errors.dateRange?.from || errors.dateRange?.to) && (
                <p className="text-red-500 text-sm mt-1 col-span-2">
                  {errors.dateRange?.from?.message ||
                    errors.dateRange?.to?.message ||
                    errors.dateRange?.root?.message}
                </p>
              )}
            </div>
          </div>

          {/* WHO */}
          <div
            className={`border rounded-lg overflow-hidden transition-all duration-500 ${
              step === "who" ? "max-h-80" : "max-h-14"
            }`}
          >
            <div
              className="p-4 cursor-pointer font-medium flex justify-between"
              onClick={() => setStep("who")}
            >
              <span>Who?</span>
              <span className="text-gray-500">
                {totalGuests > 0 ? `${totalGuests} guests` : "Add guests"}
              </span>
            </div>
            <div className="px-4 pb-4 space-y-4">
              {(["adults", "children", "infants", "pets"] as const).map(
                (key) => (
                  <div
                    key={key}
                    className="flex justify-between items-center capitalize"
                  >
                    <span>{key}</span>
                    <div className="flex gap-2 items-center">
                      <button
                        type="button"
                        className="px-2 border rounded"
                        onClick={() =>
                          setValue(
                            `guests.${key}`,
                            Math.max(0, guests[key] - 1)
                          )
                        }
                      >
                        -
                      </button>
                      <span>{guests[key]}</span>
                      <button
                        type="button"
                        className="px-2 border rounded"
                        onClick={() =>
                          setValue(`guests.${key}`, guests[key] + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                )
              )}
              {errors.guests?.adults && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.guests.adults.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-between">
          <button
            type="button"
            onClick={handleClear}
            className="text-gray-500"
          >
            Clear all
          </button>
          {step === "who" ? (
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-pink-600 text-white"
            >
              Search
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 rounded-full bg-pink-600 text-white"
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
