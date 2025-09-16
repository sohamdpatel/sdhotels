"use client";
import { useEffect, useState } from "react";
import { useWishlist } from "@/hooks/wishlist.hooks";
import Image from "next/image";
import Link from "next/link";

export default function WishlistsPage() {
  const { folders } = useWishlist();
  const [mounted, setMounted] = useState(false);

  // Wait until after mount to render client data
  useEffect(() => {
    setMounted(true);
  }, []);

  // While server + first client paint, render a placeholder
  if (!mounted) {
    return (
      <div className="max-w-6xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-4">Wishlists</h1>
        <p className="text-gray-500">Loading your wishlists…</p>
      </div>
    );
  }

  const folderNames = Object.keys(folders);

  if (folderNames.length === 0) {
    return (
      <div className="max-w-6xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-4">Wishlists</h1>
        <p className="text-gray-500">You haven’t added any wishlists yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Wishlists</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {folderNames.map((folder) => {
          const hotels = folders[folder];
          const coverImg =
            "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NjE5Mzc0MDg3NzM1MTA5MTM0/original/ddb89954-9b3f-467d-9fdf-036affd6b537.jpeg?im_w=1200";

          return (
            <Link
              href={`/user/wishlists/${encodeURIComponent(folder)}`}
              key={folder}
              className="block rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <div className="grid grid-cols-2 grid-rows-2 h-48">
                {hotels.slice(0, 4).map((hotel, i) => (
                  <Image
                    key={i}
                    src={coverImg}
                    alt={hotel.name || "Hotel"}
                    width={300}
                    height={200}
                    className={`object-cover w-full h-full ${
                      i === 0 && hotels.length < 4
                        ? "col-span-2 row-span-2"
                        : ""
                    }`}
                  />
                ))}
                {hotels.length === 0 && (
                  <Image
                    src={coverImg}
                    alt="cover"
                    width={300}
                    height={200}
                    className="object-cover w-full h-full col-span-2 row-span-2"
                  />
                )}
              </div>

              <div className="p-3">
                <h2 className="text-lg font-medium">{folder}</h2>
                <p className="text-sm text-gray-500">{hotels.length} saved</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
