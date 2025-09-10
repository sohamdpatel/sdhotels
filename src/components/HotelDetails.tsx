"use client";

import { Button } from "@/components/ui/button";
import { ClipboardList, Heart, Hotel, Info, MapPin, Share } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { GoogleMap, OverlayView, useLoadScript } from "@react-google-maps/api";
import { useParams } from "next/navigation";


export default function HotelDetails({hotelDetails}: {hotelDetails: HotelOffer}) {
  // Dummy single hotel data from your object
  console.log("hoteldeatils from inner component", hotelDetails);
  
//   const [hotel] = useState<HotelData>({
//     hotel: {
//       name: "Holiday Inn New Delhi Intl Arpt",
//       latitude: 28.55583,
//       longitude: 77.09681,
//       cityCode: "DEL",
//       hotelId: "HIDEL429",
//       chainCode: "HI",
//     },
//     offers: [
//       {
//         id: "PW5X8H3KKF",
//         boardType: "ROOM_ONLY",
//         checkInDate: "2025-09-09",
//         checkOutDate: "2025-09-10",
//         guests: { adults: 1 },
//         paymentType: "guarantee",
//         refundable: { cancellationRefund: "REFUNDABLE_UP_TO_DEADLINE" },
//         price: {
//           base: "16384.00",
//           total: "19824.64",
//           currency: "INR",
//           taxes: [
//             { code: "TOTAL_TAX", percentage: "18.00", included: false },
//             { code: "SERVICE_CHARGE", percentage: "3.00", included: false },
//           ],
//         },
//         room: {
//           description: {
//             lang: "EN",
//             text: "BEST FLEXIBLE RATE\n1 King Bed Standard Nonsmoking 32 SqM Room With offers Ergonomic work area extra bed extra",
//           },
//           type: "*1K",
//           typeEstimated: {
//             bedType: "KING",
//             beds: 1,
//             category: "STANDARD_ROOM",
//           },
//         },
//         policies: {
//           cancellations: [
//             { deadline: "2025-09-09T10:33:00+05:30", numberOfNights: 1 },
//           ],
//         },
//       },
//     ],
//   });
  const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    });

  const [guests,setGuests] = useState(1)

//   const offer = hotel.offers[0];

  if (!isLoaded){
    return (
        <div className="h-[400px] bg-gray-300 animate-pulse"></div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
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
              Hotel in {hotelDetails?.address?.cityName + "," + hotelDetails?.address?.countryCode}
            </h1>
            <p className="text-gray-600">
              Hotel ID: {hotelDetails.hotelId} • Chain: {hotelDetails.chainCode}
            </p>
          </div>

          {/* Reviews and Rating */}
          <div>
            <div className="flex justify-between w-full divide-x-2 border-2 p-5 rounded-3xl my-8">
                <div className=" flex-1 text-center font-semibold text-xl text-wrap">Guests favourite</div>
                <div className=" flex-1 text-center font-semibold text-xl self-center text-wrap">4.9 Rating</div>
                <div className=" flex-1 text-center font-semibold text-xl self-center text-wrap">10 reviews</div>
            </div>
          </div>

          {/* About Hotel's Room */}
          <div className="flex flex-col space-y-2 py-8">
            <h2 className="text-2xl font-semibold flex gap-3 items-center"><Info />About Its Room</h2>
            <p className=" text-xl text-wrap text-gray-600">
                {hotelDetails?.offer?.roomInformation?.description}
            </p>
          </div>

          {/* Policies */}
          <div className="space-y-2 py-8">
            <h2 className="text-2xl font-semibold flex gap-3 items-center"><ClipboardList />Policies</h2>
            {hotelDetails?.offer?.policies?.cancellations?.map((policy: any, i: number) => (
              <p key={i} className=" text-xl">
                Free cancellation before{" "}
                <span className="font-medium">{policy.deadline}</span> • Charge
                for {policy.numberOfNights} night(s) after deadline
              </p>
            ))}
          </div>

          {/* Location */}
          <div className="flex flex-col gap-2 pt-8">
            <h2 className="text-2xl font-semibold flex gap-3 items-center"><MapPin />Location</h2>
            <p className=" text-xl text-wrap text-gray-600 ">
                {hotelDetails?.address?.lines.join(", ")}
            </p>
            <div className=" mt-5">
                <GoogleMap mapContainerStyle={{height: "400px" }} center={{lat: hotelDetails?.geoCode?.latitude, lng: hotelDetails?.geoCode?.longitude}} zoom={12} mapContainerClassName="flex-1 sticky ">
                        <OverlayView 
                          position={{
                            // TODO: Change this
                            lat: hotelDetails?.geoCode?.latitude,
                            lng: hotelDetails?.geoCode?.longitude,
                          }}
                          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                        >
                          <div
                            className="relative flex flex-col items-center"
                          >
                            <div
                              className={` p-3 rounded-full bg-black font-semibold text-sm cursor-pointer transition`}
                            >
                              <Hotel className="text-white"/>
                            </div>
                
                            
                          </div>
                        </OverlayView>
                    </GoogleMap>
            </div>
          </div>
        </div>
        {/* Sidebar for getOffer */}
        <aside className="w-full md:w-[350px] lg:w-[400px] sticky top-[124px] self-start">
          <div className="p-4 w-[300px] lg:w-[400px] border rounded-2xl shadow-md bg-white">
            {/* Top Badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-pink-500 text-lg">💎</span>
              <p className="text-sm font-medium text-gray-600">
                Rare find! This place is usually booked
              </p>
            </div>

            {/* Price & Nights */}
            <p className="text-2xl font-semibold">
              ₹12,668{" "}
              <span className="text-gray-500 font-normal text-base">
                for 3 nights
              </span>
            </p>

            {/* Date & Guest Selector */}
            <div className="mt-4 border rounded-lg overflow-hidden">
              <div className="grid grid-cols-2 border-b">
                <div className="p-3">
                  <p className="text-xs font-medium uppercase">Check-in</p>
                  <p className="text-sm">3/7/2026</p>
                </div>
                <div className="p-3 border-l">
                  <p className="text-xs font-medium uppercase">Check-out</p>
                  <p className="text-sm">3/10/2026</p>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs font-medium uppercase">Guests</p>
                <select
                  className="w-full mt-1 border rounded-md p-2 text-sm"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6].map((g) => (
                    <option key={g} value={g}>
                      {g} {g === 1 ? "guest" : "guests"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Reserve Button */}
            <button className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold hover:opacity-90 transition">
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
        </aside>
      </div>
    </div>
  );
}
