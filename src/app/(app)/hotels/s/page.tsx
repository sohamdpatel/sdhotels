
import SearchedHotelsFeed from "@/components/SearchedHotelsFeed"
import { Suspense } from "react";

  
export const dynamic = 'force-dynamic'
  export default async function SearchHotelsPage({searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
     
    const { city, checkIn, checkOut,guests, adults, childrens } = searchParams;

  return (
    <div className="max-w-8xl mx-auto p-6 pt-24 md:pt-[200px]">
      <h1 className="text-2xl font-semibold mb-6">
        Hotels in {city ?? "Unknown"}
      </h1>

      <Suspense fallback={<div>...Loading Hotels</div>}>
        <SearchedHotelsFeed
          city={city || "DEL"}
          checkIn={checkIn || "2025-09-22"}
          checkOut={checkOut || "2025-09-25"}
          guests={Number(guests) || 0}
          adults={Number(adults) || 1}
          childrens={Number(childrens) || 0}
        />
      </Suspense>
    </div>
  );
}