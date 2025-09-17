
import { Button } from "@/components/ui/button";
import { ClipboardList, Heart, Hotel, Info, MapPin, Share } from "lucide-react";
// import Image from "next/image";
// import { useEffect, useMemo, useState } from "react";
// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { differenceInDays, format } from "date-fns";
// import { Search, Plus, Minus } from "lucide-react";
// import { DateRange } from "react-day-picker";
// import { cn } from "@/lib/utils";  
// import { Calendar } from "@/components/ui/calendar";
// import { Controller, useForm } from "react-hook-form";
// import { hotelService } from "@/data-services/hotelData";
// import { debounce } from "@/lib/debounce";
import HotelDetailsPriceBox from "./ui/HotelDetailsPriceBox";
import HotelDetailsMap from "./ui/HotelDetailsMap";

// function useDebouncedEffect(effect: () => void, deps: any[], delay: number) {
//   useEffect(() => {
//     const handler = setTimeout(() => effect(), delay);
//     return () => clearTimeout(handler);
//   }, [...deps, delay]);
// }

export default function HotelDetails({
  hotelDetails,
  // guests,
  // adults,
  // childrens
}: {
  hotelDetails: HotelOffer,
  // guests: number,
  // adults: number,
  // childrens: number,
}) {
  // Dummy single hotel data from your object
  // console.log("hoteldeatils from inner component", adults, childrens);
// const router = useRouter();
// const searchParams = useSearchParams();

  //   check offer
//   const [guestPopover, setGuestPopover] = useState(false);
//   const [offer, setOffer] = useState<HotelOffersOffer | undefined>(hotelDetails?.offer); // current offer from API
//   const [loading, setLoading] = useState(false);
// const [basePrice, setBasePrice] = useState<number | null>(() =>
//     hotelDetails?.offer?.price?.total
//       ? parseFloat(String(hotelDetails.offer.price.total))
//       : null
//   );


  // const form = useForm({
  //   defaultValues: {
  //     dateRange: {
  //       from: hotelDetails?.offer?.checkInDate ? new Date(hotelDetails.offer.checkInDate) : undefined,
  //       to: hotelDetails?.offer?.checkOutDate ? new Date(hotelDetails.offer.checkOutDate) : undefined,
  //     },
  //     guests: { adults: adults|| 1, children: childrens || 0 },
  //   },
  // });

  // const dateRange = form.watch("dateRange");
  // const guestss = form.watch("guests");

//   useEffect(() => {
//   if (!dateRange?.from || !dateRange?.to) return;

//   const params = new URLSearchParams(searchParams.toString());

//   params.set("checkIn", format(dateRange.from, "yyyy-MM-dd"));
//   params.set("checkOut", format(dateRange.to, "yyyy-MM-dd"));
//   params.set("adults", String(guestss.adults));
//   params.set("children", String(guestss.children));

//   router.replace(`?${params.toString()}`, { scroll: false });
// }, [dateRange, guestss, router]);

  // 🔥 Fetch new offer whenever dateRange or guests change
//   useDebouncedEffect(() => {
//   if (!dateRange?.from || !dateRange?.to) return;

//   // prevent same-day triggering API
//   if (dateRange.from.getTime() === dateRange.to.getTime()) return;

//   const fetchOffer = async () => {
//     try {
//       console.log("Fetching offer with", hotelDetails.hotelId, dateRange, guests);

//       setLoading(true);
//       const response = await hotelService.getHotelOffers({
//         hotelId: hotelDetails.hotelId,
//         checkInDate: dateRange?.from ? format(new Date(dateRange.from), "yyyy-MM-dd") : undefined, 
//         checkOutDate: dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : undefined,
//       });
//       console.log("Updated offer response:", response);
//       const newOffer = response?.offers?.[0] ?? null;
//       setOffer(newOffer);

//       if (newOffer?.price?.total != null) {
//         setBasePrice(parseFloat(String(newOffer.price.total)));
//       } else {
//         setBasePrice(null);
//       }
//     } catch (err) {
//       console.error("Error fetching updated offer:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchOffer();
// }, [dateRange, hotelDetails.hotelId], 500); // 500ms debounce

// const debouncedUpdateUrl = useMemo(
//   () =>
//     debounce((dateRange: DateRange | undefined, guests: any) => {
//       const params = new URLSearchParams(searchParams.toString());

//       if (dateRange?.from)
//         params.set("checkIn", format(dateRange.from, "yyyy-MM-dd"));
//       if (dateRange?.to)
//         params.set("checkOut", format(dateRange.to, "yyyy-MM-dd"));

//       params.set("guests", String(guests.adults+guests.children));
//       params.set("adults", String(guests.adults));
//       params.set("children", String(guests.children));

//       router.replace(`?${params.toString()}`, { scroll: false });
//     }, 400),
//   [searchParams, router]
// );

// const debouncedRecalculatePrice = useMemo(
//     () =>
//       debounce(
//         (
//           guestsObj: { adults: number; children: number },
//           currentBase: number | null
//         ) => {
//           setLoading(true)
//           if (!currentBase || !offer) return;

//           const totalGuests = (guestsObj.adults || 0) + (guestsObj.children || 0);
//           const multiplier = Math.max(1, Math.ceil(totalGuests / 3));

//           const newTotal = currentBase * multiplier;

//           setOffer((prev) => {
//             if (!prev) return prev;
//             return {
//               ...prev,
//               price: {
//                 ...prev.price,
//                 total: String(parseFloat(newTotal.toFixed(2))),
//               },
//             };
//           });
//           setLoading(false)
//         },
//         300 // debounce delay
//       ),
//     [offer]
//   );
//   useEffect(() => {
//     if (hotelDetails?.offer?.price?.total) {
//       setBasePrice(parseFloat(String(hotelDetails.offer.price.total)));
//       setOffer(hotelDetails.offer);
//     }
//   }, [hotelDetails?.offer]);

// useEffect(() => {
//   debouncedRecalculatePrice(guestss, basePrice);
//   debouncedUpdateUrl(dateRange, guestss);
// }, [dateRange, guestss]);




  // const nights =
  //   dateRange?.from && dateRange?.to
  //     ? differenceInDays(dateRange.to, dateRange.from)
  //     : 0;
  
  //     const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  // });

  // if (!isLoaded) {
  //   return <div className="h-[400px] bg-gray-300 animate-pulse"></div>;
  // }

  return (
    <div className="max-w-6xl mx-auto p-6 pt-24 space-y-6 md:pt-[200px]">
      {/* Hotel Header */}
      <div className=" flex justify-between items-center">
        <h1 className="text-3xl font-bold">{hotelDetails?.name}</h1>
        <div className=" flex gap-2">
          <Button className="bg-white hover:bg-[#dcdcdc] text-black text-lg px-5 shadow-none">
            <Share />
            Share
          </Button>
          <Button className="bg-white hover:bg-[#dcdcdc] text-black text-lg px-5 shadow-none">
            <Heart />
            Save
          </Button>
        </div>
      </div>

      {/* Images (Dummy) */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[500px]">
        {/* First big image */}
        <img
          src="https://picsum.photos/800/600?random=1"
          alt="Hotel main"
          className="w-full h-full object-cover rounded-lg col-span-2 row-span-2"
        />

        {/* Other 4 images */}
        {[2, 3, 4, 5].map((img) => (
          <img
            key={img}
            src={`https://picsum.photos/600/400?random=${img}`}
            alt="Hotel"
            className="w-full h-full object-cover rounded-lg"
          />
        ))}
      </div>

      {/* Offer Details */}
      <div className="flex justify-between gap-5">
        <div className=" w-full flex flex-col divide-y-2">
          {/* Hotel Id and its city and chainCode */}
          <div className=" flex flex-col justify-center pb-8">
            <h1 className="text-3xl font-bold">
              Hotel in{" "}
              {hotelDetails?.address?.cityName +
                "," +
                hotelDetails?.address?.countryCode}
            </h1>
            <p className="text-gray-600">
              Hotel ID: {hotelDetails.hotelId} • Chain: {hotelDetails.chainCode}
            </p>
          </div>

          {/* Reviews and Rating */}
          <div>
            <div className="flex justify-between w-full divide-x-2 border-2 p-5 rounded-3xl my-8">
              <div className=" flex-1 text-center font-semibold text-xl text-wrap">
                Guests favourite
              </div>
              <div className=" flex-1 text-center font-semibold text-xl self-center text-wrap">
                4.9 Rating
              </div>
              <div className=" flex-1 text-center font-semibold text-xl self-center text-wrap">
                10 reviews
              </div>
            </div>
          </div>

          {/* About Hotel's Room */}
          <div className="flex flex-col space-y-2 py-8">
            <h2 className="text-2xl font-semibold flex gap-3 items-center">
              <Info />
              About Its Room
            </h2>
            <p className=" text-xl text-wrap text-gray-600">
              {hotelDetails?.offer?.roomInformation?.description}
            </p>
          </div>

          {/* Policies */}
          <div className="space-y-2 py-8">
            <h2 className="text-2xl font-semibold flex gap-3 items-center">
              <ClipboardList />
              Policies
            </h2>
            {hotelDetails?.offer?.policies?.cancellations?.map(
              (policy: any, i: number) => (
                <p key={i} className=" text-xl">
                  Free cancellation before{" "}
                  <span className="font-medium">{policy.deadline}</span> •
                  Charge for {policy.numberOfNights} night(s) after deadline
                </p>
              )
            )}
          </div>

          {/* Location */}
          <div className="flex flex-col gap-2 pt-8">
            <h2 className="text-2xl font-semibold flex gap-3 items-center">
              <MapPin />
              Location
            </h2>
            <p className=" text-xl text-wrap text-gray-600 ">
              {hotelDetails?.address?.lines.join(", ")}
            </p>
            <div className=" mt-5">
              <HotelDetailsMap hotelDetails={hotelDetails}/>
            </div>
          </div>
        </div>
        {/* Sidebar for getOffer */}
        <aside className="w-full md:w-[350px] lg:w-[400px] sticky top-[124px] self-start">
          <HotelDetailsPriceBox  hotelDetails={hotelDetails} 
          // guests={guests} adults={adults} childrens={childrens}
          />
        </aside>
      </div>
    </div>
  );
}
