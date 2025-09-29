"use client";
export const dynamic = "force-dynamic";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useWishlist } from "@/hooks/wishlist.hooks";
import HotelCard from "@/components/cards/HotelCard";
import { ArrowLeft, Ellipsis } from "lucide-react";
import HotelCardSkeleton from "@/components/skeletons/HotelCardsckeleton";
import MapHotels from "@/components/MapHotels";

// const MapHotels = dynamic(() => import("@/components/MapHotels"), { ssr: false });

export default function WishlistFolderPage() {
  const { folderName } = useParams() as { folderName: string };
  const { folders } = useWishlist();

  // Wait until client is mounted to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Fetch hotels for this folder
  const hotels: HotelWithOffer[] = folders[folderName] || [];

  return (
    <div className="w-full flex h-full min-h-[calc(100vh-96px)]">
      {/* Left Section: Hotel List */}
      <div className="flex-1 flex flex-col">
        {/* Sticky Header */}
        <div className="sticky top-0 md:top-[5.9rem] z-20 lg:mr-5 bg-white border-b pt py-1 min-[425px]:py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="font-bold text-lg min-[425px]:text-2xl capitalize">{folderName}</h2>
          </div>

          {/* Right part of header */}
          <div className="flex gap-3">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Ellipsis className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="p-5 grid gap-6 grid-cols-1 min-[425px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {!mounted ? (
            [1,2,3,4,5,6].map((key) => (<HotelCardSkeleton key={key}/>))
          ) : hotels?.length ? (
            hotels.map((hotel) => (
              <HotelCard key={hotel.hotelId} hotel={hotel} />
            ))
          ) : (
            <p>No hotels found</p>
          )}
        </div>
      </div>

      {/* Right Section: Sticky Map */}
      <div className="hidden lg:block w-[40%] sticky top-24 h-[calc(100vh-96px)]">
        {mounted ? (
          <MapHotels
            hotels={hotels}
            className="rounded-none"
            containerStyle={{ width: "100%", height: "100%" }}
          />
        ) : (<div className="w-full h-full bg-gray-400 animate-pulse"></div>) }
      </div>
    </div>
  );
}
