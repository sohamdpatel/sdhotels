"use client";

import { GoogleMap, OverlayView, useLoadScript } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";

type Hotel = {
  hotelId: string;
  name: string;
  geoCode: { latitude: number; longitude: number };
  address: { cityName: string };
  description?: string;
  offer?: { price: { total: string; currency: string } };
};

const containerStyle = {
  width: "100%",
  height: "600px",
};

export default function MapHotels({ hotels, hoveredHotel, setHoveredHotel }: { hotels: any[], hoveredHotel: Hotel | null, setHoveredHotel: any }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
//   const [hoveredHotel, setHoveredHotel] = useState<Hotel | null>(null);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 28.6,
    lng: 77.2, // default Delhi
  });

  // ✅ When hotels change, recenter map to the first hotel’s city
  useEffect(() => {
    if (hotels.length > 0) {
      const firstHotel = hotels[0];
      setMapCenter({
        lat: firstHotel.geoCode.latitude,
        lng: firstHotel.geoCode.longitude,
      });
    }
  }, [hotels]);

  // ✅ Ensure selected hotel is always "on top"
//   const orderedHotels = useMemo(() => {
//     if (!selectedHotel) return hotels;
//     return [
//       ...hotels.filter((h) => h.hotelId !== selectedHotel.hotelId),
//       selectedHotel, // move selected to last so it's rendered above
//     ];
//   }, [hotels, selectedHotel]);

  const orderedHotels = useMemo(() => {
    // console.log("hotels", selectedHotel, hoveredHotel);
    
  if (!selectedHotel && !hoveredHotel) return hotels;

  const uniqueHotels = new Set([selectedHotel?.hotelId, hoveredHotel?.hotelId]);
  
  const filteredHotels = hotels.filter((h) => !uniqueHotels.has(h.hotelId));

  const sortedArray = [...filteredHotels];

  if (selectedHotel) {
    sortedArray.push(selectedHotel);
  }
  if (hoveredHotel && hoveredHotel.hotelId !== selectedHotel?.hotelId) {
    sortedArray.push(hoveredHotel);
  }

  return sortedArray;
}, [hotels]);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={12} mapContainerClassName="flex-1 sticky ">
      {orderedHotels.map((hotel) => (
        <OverlayView 
          key={hotel.hotelId}
          position={{
            lat: hotel.geoCode.latitude,
            lng: hotel.geoCode.longitude,
          }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div
            onMouseEnter={() =>
              setHoveredHotel(
                hoveredHotel?.hotelId === hotel.hotelId ? null : hotel
              )
            }
            onMouseLeave={() => setHoveredHotel(null)}
            onClick={() =>
              setSelectedHotel(
                selectedHotel?.hotelId === hotel.hotelId ? null : hotel
              )}
            className="relative flex flex-col items-center"
            style={{
              zIndex: selectedHotel?.hotelId === hotel.hotelId || hoveredHotel?.hotelId === hotel.hotelId ? 9999 : 1,
            }}
          >
            {/* Price bubble */}
            <div
              className={`px-3 py-1 rounded-full font-semibold text-sm cursor-pointer transition ${
                selectedHotel?.hotelId === hotel.hotelId || hoveredHotel?.hotelId === hotel.hotelId
                  ? "bg-black text-white scale-110 z-50"
                  : "bg-white text-black shadow"
              }`}
            >
              ₹{hotel.offer?.price?.total ?? "N/A"}
            </div>

            {/* Detail card when selected */}
            {selectedHotel?.hotelId === hotel.hotelId && (
              <div className="absolute -top-68 left-1/2 -translate-x-1/2 w-60 bg-white rounded-xl shadow-lg overflow-hidden z-50">
                <img
                  src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NjE5Mzc0MDg3NzM1MTA5MTM0/original/ddb89954-9b3f-467d-9fdf-036affd6b537.jpeg"
                  alt={hotel.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-base truncate">{hotel.name}</h3>
                    <button
                      onClick={() => {setSelectedHotel(null)
                        setHoveredHotel(null)
                      }}
                      className="text-gray-400 hover:text-black"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">{hotel.address.cityName}</p>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                    {hotel.description ?? "Nice hotel with comfortable stay."}
                  </p>
                  {hotel.offer ? (
                    <p className="mt-2 font-semibold text-red-500">
                      ₹{hotel.offer.price.total} {hotel.offer.price.currency}
                    </p>
                  ) : (
                    <p className="text-gray-400 text-xs">No offer available</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </OverlayView>
      ))}
    </GoogleMap>
  );
}
