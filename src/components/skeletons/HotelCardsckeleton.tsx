import React from "react";

function HotelCardSkeleton( {className}: {className?: string}) {
  return (
    <div className={`flex flex-col max-w-md animate-pulse ${className}`}>
      {/* Image Skeleton */}
      <div className="relative">
        <div className="w-full aspect-square rounded-3xl bg-gray-300" />
        <div className="absolute z-10 top-3 left-3 h-5 w-20 bg-gray-200 rounded-full" />
        <div className="absolute top-3 right-3 h-6 w-6 bg-gray-200 rounded-full" />
      </div>

      {/* Hotel Info Skeleton */}
      <div className="mt-2 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div className="h-4 w-3/4 bg-gray-300 rounded" />
        </div>

        <div className="flex items-center gap-1">
          <div className="h-4 w-4 bg-gray-300 rounded-full" />
          <div className="h-4 w-1/2 bg-gray-300 rounded" />
        </div>

        <div className="h-4 w-1/3 bg-gray-300 rounded mt-1" />
      </div>
    </div>
  );
}

export default HotelCardSkeleton;
