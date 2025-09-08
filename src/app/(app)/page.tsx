// app/page.tsx
// import HotelCard from "@/components/cards/HotelCard";
import MapHotels from "@/components/MapHotels";
import HotelsSlider from "@/components/ui/HotelsSlider";
import { hotelService } from "@/data-services/hotelData";
// import { fetchHotelsNearby, fetchHotelsByCity } from "@/lib/hotelApi";

export default async function Home() {
  // Run all API calls in parallel 🚀
  const [ahmedabad, delhi, goa] = await Promise.all([
    // hotelService.getHotelsByGeo(23.0225, 72.5714), // Nearby Ahmedabad
    hotelService.getHotelsByCity("AMD"),
    hotelService.getHotelsByCity("DEL"),
    hotelService.getHotelsByCity("GOI"),
    // hotelService.searchAvailableHotelsV2("GOI", "2025-09-22", "2025-09-25", 2)
  ]);
  console.log("hotels from home", delhi);
  

  const sections = [
    // { title: "Nearby Hotels", hotels: nearby || [] },
    { title: "Ahmedabad Hotels", hotels: ahmedabad || [] },
    { title: "Delhi Hotels", hotels: delhi || [] },
    { title: "Goa Hotels", hotels: goa || [] },
  ];

  return (
    <div className="font-sans min-h-screen py-8 px-4  space-y-16 sm:p-20">
      {/* <div className="w-1/2"> */}
        {sections.map((section) => (
          <HotelsSlider 
            key={section?.title}
            title={section?.title}
            items={section?.hotels}
            showArrows={true}
          />
        ))}
      {/* </div> */}
      {/* <div className="w-1/2">

      <MapHotels hotels={delhi} />
      </div> */}



      {/* {sections.map((section) => (
        <div key={section.title}>
          <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {section.hotels.length > 0 ? (
              section.hotels.map((hotel: any) => (
                <HotelCard key={hotel.hotelId} hotel={hotel} />
              ))
            ) : (
              <p className="text-gray-500">No hotels found.</p>
            )}
          </div>
        </div>
      ))} */}
    </div>
  );
}
