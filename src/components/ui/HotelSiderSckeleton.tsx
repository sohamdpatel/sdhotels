"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import HotelCardSkeleton from "../cards/HotelCardsckeleton";
// import HotelCardSkeleton from "../cards/HotelCardSkeleton";

type HotelsSliderSkeletonProps = {
  title?: string;
  slides?: number; // how many skeleton cards to render
  slidesPerView?: {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    "2xl"?: number;
  };
  spaceBetween?: number;
};

export default function HotelsSliderSkeleton({
  title = "Loading hotels...",
  slides = 6,
  spaceBetween = 16,
  slidesPerView = {
    base: 2,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
    "2xl": 6,
  },
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

      <Swiper
        modules={[Navigation]}
        spaceBetween={spaceBetween}
        breakpoints={{
          0: { slidesPerView: slidesPerView.base ?? 2, spaceBetween },
          640: { slidesPerView: slidesPerView.sm ?? 2, spaceBetween },
          768: { slidesPerView: slidesPerView.md ?? 3, spaceBetween },
          1024: { slidesPerView: slidesPerView.lg ?? 4, spaceBetween },
          1280: { slidesPerView: slidesPerView.xl ?? 5, spaceBetween },
          1536: { slidesPerView: slidesPerView["2xl"] ?? 6, spaceBetween },
        }}
      >
        {Array.from({ length: slides }).map((_, i) => (
          <SwiperSlide key={i}>
            <HotelCardSkeleton />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
