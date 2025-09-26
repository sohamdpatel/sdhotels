// app/page.tsx
import HotelsSliderSkeleton from "@/components/skeletons/HotelSiderSckeleton";
import ErrorModalClient from "@/components/ui/ErrorModal";
import HotelsSlider from "@/components/ui/HotelsSlider";
import { hotelService } from "@/data-services/hotelData";
import { Suspense } from "react";

export default async function Home() {
  try {
    // Run all API calls in parallel 🚀
    const [ahmedabad, delhi, goa] = await Promise.all([
      hotelService.getHotelsByCity("AMD"),
      hotelService.getHotelsByCity("DEL"),
      hotelService.getHotelsByCity("GOI"),
    ]);

    const sections = [
      { title: "Ahmedabad Hotels", hotels: ahmedabad || [] },
      { title: "Delhi Hotels", hotels: delhi || [] },
      { title: "Goa Hotels", hotels: goa || [] },
    ];

    return (
      <div className="font-sans md:min-h-screen max-w-[1840px] mx-auto py-8 pt-24 px-4 space-y-5 lg:space-y-16 md:p-10 lg:p-20 md:pt-[200px] lg:pt-[200px]">
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
  } catch (err: any) {
    // ⬇️ Render the error modal
    return (
      <ErrorModalClient
        message={err?.message || "Failed to load hotels. Please try again."}
      />
    );
  }
}
