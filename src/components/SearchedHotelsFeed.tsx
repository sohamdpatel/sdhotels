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

const PAGE_SIZE = 10; // hotels per page

export default function SearchedHotelsFeed({
  city,
  checkIn,
  checkOut,
  guests,
  adults,
  childrens,
}: Props) {
  const [hoveredHotel,setHoveredHotel] = useState<any>()

  const { data, isLoading, error } = useQuery({
    queryKey: ["hotels", city, checkIn, checkOut],
    queryFn: async () => {
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
    <div className=" w-full flex gap-5">
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 flex-2">
        {data?.length ? (
          data?.map((hotel: any) => (
            <HotelCard key={hotel.hotelId} hotel={hotel} setHoveredHotel={setHoveredHotel} guests={guests} adults={adults} childrens={childrens} />
          ))
        ) : (
          <p>No hotels found</p>
        )}
      </div>
         <MapHotels hotels={data!} hoveredHotel={hoveredHotel} setHoveredHotel={setHoveredHotel}/>
      {/* Pagination */}
      {/* {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            className={`px-4 py-2 rounded border ${
              page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            Prev
          </button>

          <span className="px-3 py-2">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
            className={`px-4 py-2 rounded border ${
              page === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      )} */}
    </div>
  );
}
