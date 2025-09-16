"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useWishlist } from "@/hooks/wishlist.hooks";
import { useState } from "react";
import HotelCard from "@/components/cards/HotelCard";
import { ArrowLeft, Ellipsis } from "lucide-react";

const MapHotels = dynamic(() => import("@/components/MapHotels"), { ssr: false });

export default function WishlistFolderPage() {
  const { folderName } = useParams() as { folderName: string };
  const { folders } = useWishlist();
  const [hoveredHotel, setHoveredHotel] = useState<any>();

  // folders[folderName] should be HotelOffer[]
  const hotels: HotelOffer[] = folders[folderName] || [];

  return (
    <div className="w-full flex h-full min-h-[calc(100vh-96px)]">
      {/* Left Section: Hotel List */}
      <div className="flex-1 flex flex-col">
        {/* Sticky Header inside left column */}
        <div className="sticky top-24 z-20 mr-5 bg-white border-b pt py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="font-bold text-2xl capitalize">{folderName}</h2>
          </div>

          {/* Right part of header (filters / share buttons) */}
          <div className="flex gap-3">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Ellipsis className=" h-5 w-5 "/>
            </button>
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="p-5 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3">
          {hotels?.length ? (
            hotels.map((hotel: any) => (
              <HotelCard
                key={hotel.hotelId}
                hotel={hotel}
                setHoveredHotel={setHoveredHotel}
              />
            ))
          ) : (
            <p>No hotels found</p>
          )}
        </div>
      </div>

      {/* Right Section: Sticky Map */}
      <div className="hidden lg:block w-[40%] sticky top-24 h-[calc(100vh-96px)]">
        <MapHotels
          hotels={hotels!}
          hoveredHotel={hoveredHotel}
          setHoveredHotel={setHoveredHotel}
          className="rounded-none"
          containerStyle={{width: "100%",height: "100%"}}
        />
      </div>
    </div>
  );
}
