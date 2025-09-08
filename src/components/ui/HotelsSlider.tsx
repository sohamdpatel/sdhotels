"use client";

import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import HotelCard from "../cards/HotelCard";

type HotelsSliderProps<T> = {
  title?: string;
  items: T[];
  spaceBetween?: number;
  className?: string;
  slidesPerView?: {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    "2xl"?: number;
  };
  showArrows?: boolean;
  loop?: boolean;
};

export default function HotelsSlider<T>({
  title,
  items,
  spaceBetween = 16,
  className = "",
  showArrows = true,
  loop = false,
  slidesPerView = {
    base: 2,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
    "2xl": 6,
  },
}: HotelsSliderProps<T>) {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section className={`w-full ${className}`}>
      {title && (
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          {showArrows && (
            <div className="flex gap-2">
              <button
                ref={prevRef}
                aria-label="Previous"
                disabled={isBeginning}
                className={`flex items-center justify-center h-10 w-10 rounded-full 
                  bg-white shadow-md border border-black/10 transition active:scale-95
                  ${isBeginning ? "opacity-40 cursor-not-allowed" : "hover:shadow-lg"}`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                ref={nextRef}
                aria-label="Next"
                disabled={isEnd}
                className={`flex items-center justify-center h-10 w-10 rounded-full 
                  bg-white shadow-md border border-black/10 transition active:scale-95
                  ${isEnd ? "opacity-40 cursor-not-allowed" : "hover:shadow-lg"}`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      )}

      <Swiper
        modules={[Navigation]}
        loop={loop}
        spaceBetween={spaceBetween}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          // Attach navigation refs before init
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onAfterInit={(swiper) => {
          // Ensure initial state
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        breakpoints={{
          0: { slidesPerView: slidesPerView.base ?? 2, spaceBetween },
          640: { slidesPerView: slidesPerView.sm ?? 2, spaceBetween },
          768: { slidesPerView: slidesPerView.md ?? 3, spaceBetween },
          1024: { slidesPerView: slidesPerView.lg ?? 4, spaceBetween },
          1280: { slidesPerView: slidesPerView.xl ?? 5, spaceBetween },
          1536: { slidesPerView: slidesPerView["2xl"] ?? 6, spaceBetween },
        }}
      >
        {items.map((item: any, i) => (
          <SwiperSlide key={item?.hotelId || i}>
            <HotelCard hotel={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
