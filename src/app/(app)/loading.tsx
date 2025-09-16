

import HotelsSliderSkeleton from "@/components/ui/HotelSiderSckeleton";

export default function Loading() {
  return (
    <div className="font-sans md:min-h-screen py-8 pt-24 px-4 space-y-16 md:p-10 lg:p-20 md:pt-[200px] lg:pt-[200px]">
      {/* Repeat skeleton sliders for each section */}
      <HotelsSliderSkeleton />
      <HotelsSliderSkeleton />
      <HotelsSliderSkeleton />
    </div>
  );
}
