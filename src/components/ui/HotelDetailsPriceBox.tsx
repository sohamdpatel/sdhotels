"use client";
export const dynamic = "force-dynamic";

import { Button } from "@/components/ui/button";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { differenceInDays, format } from "date-fns";
import { Plus, Minus, Loader2 } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Controller, useForm } from "react-hook-form";
import { hotelService } from "@/data-services/hotelData";
import { debounce } from "@/lib/debounce";
import { useEffect, useMemo, useState } from "react";
import { useHotelBookingStore } from "@/hooks/zustandStore.hooks";

function useDebouncedEffect(effect: () => void, deps: [{ from: Date | undefined; to: Date | undefined; }, string], delay: number) {
  useEffect(() => {
    const handler = setTimeout(() => effect(), delay);
    return () => clearTimeout(handler);
  }, [...deps, delay, effect]);
}

export default function HotelDetailsPriceBox({
  hotelDetails,
}: {
  hotelDetails: HotelOffer;
}) {
  const searchParams = useSearchParams();

const adultsParam = Number(searchParams.get("adults")) || 1; // fallback to 1 adult
const childrensParam = Number(searchParams.get("childrens")) || 0;
const guestsParam = Number(searchParams.get("guests")) || 0;
const checkInParam = searchParams.get("checkIn");
const checkOutParam = searchParams.get("checkOut");


  const router = useRouter()
  const [guestPopover, setGuestPopover] = useState(false);
 const [offer, setOffer] = useState<HotelOffersOffer | undefined>(() => {
  if (!hotelDetails?.offer) return undefined;

  const baseTotal = parseFloat(hotelDetails.offer.price?.total || "0");
  const totalGuests = adultsParam + childrensParam;
  const multiplier = Math.max(1, Math.ceil(totalGuests / 3));
  const newTotal = baseTotal * multiplier;

  return {
    ...hotelDetails.offer,
    price: {
      ...hotelDetails.offer.price,
      baseTotal: String(baseTotal), // 🔥 fix: cast to string
      total: String(newTotal),      // also string
    },
  };
});

const setHotelDetails = useHotelBookingStore((state) => state.setHotelDetails);

 // current offer from API
  const [loading, setLoading] = useState(false);



  const form = useForm({
  defaultValues: {
    dateRange: {
      from: checkInParam ? new Date(checkInParam) : hotelDetails?.offer?.checkInDate ? new Date(hotelDetails.offer.checkInDate) : undefined,
      to: checkOutParam ? new Date(checkOutParam) : hotelDetails?.offer?.checkOutDate ? new Date(hotelDetails.offer.checkOutDate) : undefined,
    },
    guests: {
      adults: adultsParam,
      childrens: childrensParam,
    },
  },
});


  const dateRange = form.watch("dateRange");
  const guestss = form.watch("guests");
 
  // 🔥 Fetch new offer whenever dateRange or guests change
  useDebouncedEffect(() => {
  if (!dateRange?.from || !dateRange?.to) return;

  if (dateRange?.from.getTime() === new Date(hotelDetails.offer!.checkInDate).getTime() && dateRange?.to.getTime() === new Date(hotelDetails.offer!.checkOutDate).getTime()) {
    return;
  };

  // prevent same-day triggering API
  if (dateRange.from.getTime() === dateRange.to.getTime()) return;
console.log("i am debouceoffer initially")
  const fetchOffer = async () => {
    try {
      console.log("Fetching offer with", hotelDetails.hotelId, dateRange);

      setLoading(true);
      const response = await hotelService.getHotelOffers({
        hotelId: hotelDetails.hotelId,
        checkInDate: dateRange?.from ? format(new Date(dateRange.from), "yyyy-MM-dd") : undefined, 
        checkOutDate: dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : undefined,
      });
      console.log("Updated offer response:", response);
      const newOffer = response?.offers?.[0] ?? null;
      console.log("Updated before new offer response:", newOffer);

      const price =
      parseFloat(newOffer.price?.total) * Math.ceil((guestss.adults + guestss.childrens) / 3);
      newOffer.price.baseTotal =  parseFloat(newOffer?.price?.total);
      newOffer.price.total = price
      newOffer.guests = guestss
      console.log("Updated new offer response:", newOffer); 

      setOffer(newOffer);

    } catch (err) {
      console.error("Error fetching updated offer:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchOffer();
}, [dateRange, hotelDetails.hotelId], 500); // 500ms debounce

const debouncedRecalculatePrice = useMemo(
  () =>
    debounce(
      (guestsObj: { adults: number; childrens: number }) => {
        if (!offer?.price?.baseTotal || !offer) {
          setLoading(false); // stop loading if nothing to recalc
          return;
        }

        const totalGuests = (guestsObj.adults || 0) + (guestsObj.childrens || 0);
        const multiplier = Math.max(1, Math.ceil(totalGuests / 3));

        const newTotal = parseFloat(offer?.price?.baseTotal) * multiplier;

        setOffer((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            guests: guestss,
            price: {
              ...prev.price,
              total: String(parseFloat(newTotal.toFixed(2))),
            },
          };
        });

        setLoading(false); // ✅ stop after debounce finishes
      },
      1000 // debounce delay
    ),
  [offer, guestss]
);
const debouncedUpdateUrl = useMemo(
  () =>
    debounce((dateRange: DateRange | undefined, guests: {adults: number, childrens: number}) => {
      const params = new URLSearchParams(searchParams.toString());

      if (dateRange?.from)
        params.set("checkIn", format(dateRange.from, "yyyy-MM-dd"));
      if (dateRange?.to)
        params.set("checkOut", format(dateRange.to, "yyyy-MM-dd"));

      params.set("guests", String(guests.adults+guests.childrens));
      params.set("adults", String(guests.adults));
      params.set("childrens", String(guests.childrens));

      router.replace(`?${params.toString()}`, { scroll: false });
    }, 400),
  [searchParams, router]
);

  useEffect(() => {
  if ((guestss.adults + guestss.childrens) === guestsParam) return;

  setLoading(true); // show spinner immediately

  debouncedRecalculatePrice(guestss); 
}, [guestss,debouncedRecalculatePrice,guestss]);

  useEffect(()=>{
    if (guestss.adults=== adultsParam && guestss.childrens === childrensParam && dateRange.from!.getTime() === new Date(hotelDetails.offer!.checkInDate).getTime() && dateRange.to!.getTime() === new Date(hotelDetails.offer!.checkOutDate).getTime()) return;
    console.log("urlupdater effect run")
  debouncedUpdateUrl(dateRange,guestss); 
  },[dateRange,guestss,debouncedUpdateUrl,adultsParam,childrensParam,hotelDetails])


  const nights =
    dateRange?.from && dateRange?.to
      ? differenceInDays(dateRange.to, dateRange.from)
      : 0;




  return (
    <div className="md:p-4 my-8 md:my-0 md:w-[300px] lg:w-[400px] max-w-[540px] mx-auto md:border rounded-2xl md:shadow-md bg-white">
      {/* Top Badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-pink-500 text-lg">💎</span>
        <p className="text-sm font-medium text-gray-600">
          Rare find! This place is usually booked
        </p>
      </div>

      {/* Price & Nights */}
      <p className="text-2xl font-semibold">
        {loading ? (
          <Loader2 className=" animate-spin" />
        ) : offer?.price?.total ? (
          `₹${(parseFloat(offer.price.total)).toFixed(2)}`
        ) : (
          "—"
        )}{" "}
        {nights > 0 && !loading && (
          <span className="text-gray-500 font-normal text-base">
            for {nights} {nights === 1 ? "night" : "nights"}
          </span>
        )}
      </p>

      {/* Date & Guest Selector */}
      <form className="mt-4 border rounded-lg overflow-hidden">
        {/* Dates */}
        <Controller
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <div className="grid grid-cols-2 border-b">
              <div className="p-3">
                <p className="text-xs font-medium uppercase">Check-in</p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="p-0 h-auto text-sm font-normal"
                    >
                      {field.value?.from
                        ? format(field.value.from, "LLL dd, yyyy")
                        : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="p-0">
                    <Calendar
                      mode="range"
                      numberOfMonths={1}
                      selected={field.value}
                      onSelect={(range) => field.onChange(range)}
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="p-3 border-l">
                <p className="text-xs font-medium uppercase">Check-out</p>
                <span className="text-sm">
                  {field.value?.to
                    ? format(field.value.to, "LLL dd, yyyy")
                    : "Select date"}
                </span>
              </div>
            </div>
          )}
        />

        {/* Guests */}
        <Controller
          control={form.control}
          name="guests"
          render={({ field }) => (
            <div className="p-3">
              <p className="text-xs font-medium uppercase">Guests</p>
              <Popover open={guestPopover} onOpenChange={setGuestPopover}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left text-sm font-normal"
                  >
                    {field.value.adults + field.value.childrens} guests
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72 p-4 space-y-4">
                  {["adults", "childrens"].map((type) => (
                    <div
                      key={type}
                      className="flex items-center justify-between"
                    >
                      <span className="capitalize">{type}</span>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          size="icon"
                          disabled={field.value[type as keyof typeof field.value] <= 0}
                          variant="outline"
                          onClick={() =>
                            field.onChange({
                              ...field.value,
                              [type]: Math.max(
                                0,
                                field.value[type as keyof typeof field.value] -
                                  1
                              ),
                            })
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span>
                          {field.value[type as keyof typeof field.value]}
                        </span>
                        <Button
                          type="button"
                          size="icon"
                          variant="outline"
                          disabled={field.value[type as keyof typeof field.value] >= 9}
                          onClick={() =>
                            field.onChange({
                              ...field.value,
                              [type]:
                                field.value[type as keyof typeof field.value] +
                                1,
                            })
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </PopoverContent>
              </Popover>
            </div>
          )}
        />
      </form>

      {/* Reserve Button */}
      <button onClick={() => {
        setHotelDetails({...hotelDetails, offer})
        router.push(`/book/hotels/${offer?.id}`)
      }} 
        className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold hover:opacity-90 transition">
        Reserve
      </button>

      <p className="text-xs text-center text-gray-500 mt-2">
        You won&apos;t be charged yet
      </p>

      {/* Bottom Link */}
      <p className="text-xs text-gray-600 underline mt-3 cursor-pointer text-center">
        🚩 Report this listing
      </p>
    </div>
  );
}
