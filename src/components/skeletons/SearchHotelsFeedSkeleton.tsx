import HotelCardSkeleton from "./HotelCardsckeleton";

function SearchHotelsFeedSkeleton() {
  return (
    <div className="w-full flex gap-5">
      {/* Hotels Grid Skeleton */}
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 flex-2">
        {Array.from({ length: 9 }).map((_, i) => (
          <HotelCardSkeleton key={i} />
        ))}
      </div>

      {/* Sticky Map Skeleton */}
      <div className="hidden lg:block w-[40%] sticky top-28 h-fit">
        <div className="w-full h-[500px] bg-gray-200 rounded-2xl animate-pulse" />
      </div>
    </div>
  );
}

export default SearchHotelsFeedSkeleton;
