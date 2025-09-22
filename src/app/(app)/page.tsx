// app/page.tsx
// import HotelCard from "@/components/cards/HotelCard";
import MapHotels from "@/components/MapHotels";
import HotelsSliderSkeleton from "@/components/skeletons/HotelSiderSckeleton";
import HotelsSlider from "@/components/ui/HotelsSlider";
import { hotelService } from "@/data-services/hotelData";
import { Suspense } from "react";
// import { fetchHotelsNearby, fetchHotelsByCity } from "@/lib/hotelApi";

export default async function Home() {
  // Run all API calls in parallel 🚀
  // const [ahmedabad, delhi, goa] = await Promise.all([
  //   // hotelService.getHotelsByGeo(23.0225, 72.5714), // Nearby Ahmedabad
  //   hotelService.getHotelsByCity("AMD"),
  //   hotelService.getHotelsByCity("DEL"),
  //   hotelService.getHotelsByCity("GOI"),
  //   // hotelService.searchAvailableHotelsV2("GOI", "2025-09-22", "2025-09-25", 2)
  // ]);
  // console.log("hotels from home", delhi);
  

  const sections = [
    { title: "Nearby Hotels", hotels:  [] },
    // { title: "Ahmedabad Hotels", hotels: ahmedabad || [] },
    // { title: "Delhi Hotels", hotels: delhi || [] },
    // { title: "Goa Hotels", hotels: goa || [] },
  ];

  return (
    <div className="font-sans md:min-h-screen max-w-[1840px] mx-auto py-8 pt-24 px-4 space-y-5 lg:space-y-16 md:p-10 lg:p-20 md:pt-[200px] lg:pt-[200px]">
      {/* <div className="w-1/2"> */}
        {sections.map((section) => (
          <Suspense key={section.title} fallback={<HotelsSliderSkeleton />}>
            <HotelsSlider
            key={section?.title}
            title={section?.title}
            items={section?.hotels}
            showArrows={true}
            /> 
          </Suspense>
        ))}
    </div>
  );
}
