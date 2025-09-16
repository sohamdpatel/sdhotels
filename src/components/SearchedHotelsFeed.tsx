"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import HotelCard from "@/components/cards/HotelCard";
import { hotelService } from "@/data-services/hotelData";
import MapHotels from "./MapHotels";
import { useState } from "react";
import { boolean } from "zod";

type Props = {
  city: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  adults: number;
  childrens: number;
};

export default function SearchedHotelsFeed({
  city,
  checkIn,
  checkOut,
  guests,
  adults,
  childrens,
}: Props) {
  // const [hoveredHotel,setHoveredHotel] = useState<any>()

  console.log("searched hotel feed page")

  const { data, isLoading, error } = useQuery({
    queryKey: ["hotels", city, checkIn, checkOut],
    queryFn: async () => {
      console.log("recall the query")
      const allHotels = await hotelService.searchAvailableHotelsV2(
        city,
        checkIn,
        checkOut,
      );
      return allHotels
    },
    staleTime: 60 * 60 * 1000
  });

  // const handlePageChange = (newPage: number) => {
  //   const params = new URLSearchParams(searchParams.toString());
  //   params.set("page", String(newPage));
  //   router.push(`/search?${params.toString()}`);
  // };

  if (isLoading) return <p>Loading hotels...</p>; 
  if (error) return <p>Failed to load hotels</p>;

  // const totalPages = Math.ceil((data?.total ?? 0) / PAGE_SIZE);

  return (
    <div className="w-full flex gap-5">
  {/* Hotels Grid */}
  <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 flex-2">
    {data?.length ? (
      data?.map((hotel: any) => (
        <HotelCard
          key={hotel.hotelId}
          hotel={hotel}
          guests={guests}
          adults={adults}
          childrens={childrens}
        />
      ))
    ) : (
      <p>No hotels found</p>
    )}
  </div>

  {/* Sticky Map */}
  <div className="hidden lg:block w-[40%] sticky top-24 h-fit">
    <MapHotels
      hotels={data!}
    />
  </div>
</div>

  );
}
