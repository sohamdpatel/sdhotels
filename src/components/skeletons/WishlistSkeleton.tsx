export default function WishlistSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl  "
        > 
          <div className="aspect-square bg-gray-200 rounded-2xl mb-3 shadow-lg" />
          <div className="p-3 space-y-2">
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
            <div className="h-3 w-1/4 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}