

export default function HotelDetailsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto p-6 pt-24 space-y-6 md:pt-[200px] animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="h-8 w-48 bg-gray-300 rounded" />
        <div className="flex gap-2">
          <div className="h-10 w-24 bg-gray-300 rounded-lg" />
          <div className="h-10 w-24 bg-gray-300 rounded-lg" />
        </div>
      </div>

      {/* Images */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[500px]">
        <div className="col-span-2 row-span-2 w-full h-full bg-gray-300 rounded-lg" />
        <div className="w-full h-full bg-gray-300 rounded-lg" />
        <div className="w-full h-full bg-gray-300 rounded-lg" />
        <div className="w-full h-full bg-gray-300 rounded-lg" />
        <div className="w-full h-full bg-gray-300 rounded-lg" />
      </div>

      {/* Content + Sidebar */}
      <div className="flex justify-between gap-5">
        {/* Left content */}
        <div className="w-full flex flex-col divide-y-2">
          <div className="pb-8 space-y-2">
            <div className="h-6 w-64 bg-gray-300 rounded" />
            <div className="h-4 w-40 bg-gray-200 rounded" />
          </div>

          <div className="py-8">
            <div className="flex justify-between border-2 p-5 rounded-3xl">
              <div className="h-6 w-24 bg-gray-300 rounded" />
              <div className="h-6 w-24 bg-gray-300 rounded" />
              <div className="h-6 w-24 bg-gray-300 rounded" />
            </div>
          </div>

          <div className="py-8 space-y-2">
            <div className="h-6 w-40 bg-gray-300 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
          </div>

          <div className="py-8 space-y-2">
            <div className="h-6 w-40 bg-gray-300 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
            <div className="h-4 w-1/2 bg-gray-200 rounded" />
          </div>

          <div className="pt-8 space-y-2">
            <div className="h-6 w-40 bg-gray-300 rounded" />
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
            <div className="h-[400px] w-full bg-gray-300 rounded-lg" />
          </div>
        </div>

        {/* Sidebar skeleton */}
        <aside className="w-full md:w-[350px] lg:w-[400px] space-y-4">
          <div className="p-4 border rounded-2xl shadow bg-white space-y-4">
            <div className="h-4 w-48 bg-gray-300 rounded" />
            <div className="h-8 w-32 bg-gray-300 rounded" />
            <div className="h-10 w-full bg-gray-200 rounded" />
            <div className="h-10 w-full bg-gray-200 rounded" />
            <div className="h-12 w-full bg-gray-300 rounded" />
            <div className="h-4 w-32 bg-gray-200 rounded mx-auto" />
          </div>
        </aside>
      </div>
    </div>
  );
}
