"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import HotelCardSkeleton from "./HotelCardsckeleton";
// import HotelCardSkeleton from "../cards/HotelCardSkeleton";

type HotelsSliderSkeletonProps = {
  title?: string;
  slides?: number; // how many skeleton cards to render
};

export default function HotelsSliderSkeleton({
  title = "Loading hotels...",
  slides = 6,
}: HotelsSliderSkeletonProps) {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <section className="w-full">
      {title && (
        <div className="mb-3 flex items-center justify-between animate-pulse">
          <h2 className="h-6 w-40 bg-gray-300 rounded" />
          <div className="flex gap-2">
            <button
              ref={prevRef}
              aria-label="Previous"
              disabled
              className="flex items-center justify-center h-10 w-10 rounded-full 
                bg-gray-200 border border-gray-300 opacity-40 cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5 text-gray-400" />
            </button>

            <button
              ref={nextRef}
              aria-label="Next"
              disabled
              className="flex items-center justify-center h-10 w-10 rounded-full 
                bg-gray-200 border border-gray-300 opacity-40 cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 overflow-hidden gap-4">
  {/* Always show first two */}
  <HotelCardSkeleton />
  <HotelCardSkeleton />

  {/* Show only ≥ sm */}
  <HotelCardSkeleton className="hidden md:block" />

  {/* Show only ≥ md */}
  <HotelCardSkeleton className="hidden lg:block" />

  {/* Show only ≥ lg */}
  <HotelCardSkeleton className="hidden xl:block" />

  {/* Show only ≥ xl */}
  <HotelCardSkeleton className="hidden 2xl:block" />
</div>


    </section>    
  );
}
