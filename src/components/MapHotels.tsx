"use client";

import { useHotelHoverStore } from "@/hooks/zustandStore.hooks";
import { GoogleMap, OverlayView, useLoadScript } from "@react-google-maps/api";
import { Hotel as HotelIcon } from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";

type Hotel = {
  hotelId: string;
  name: string;
  geoCode: { latitude: number; longitude: number };
  address: { cityName: string };
  description?: string;
  offer?: { price: { total: string; currency: string } };
};

type containerStyleProp = {
  width: string;
  height?: string;
};

// ------------------------
// Memoized Hotel Marker
// ------------------------
type HotelMarkerProps = {
  hotel: Hotel;
  isHovered: boolean;
  isSelected: boolean;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
};

const HotelMarker = React.memo(
  ({
    hotel,
    isHovered,
    isSelected,
    onHover,
    onClick,
    guests,
  }: HotelMarkerProps & { guests: number }) => {
    return (
      <OverlayView
        key={hotel.hotelId}
        position={{
          lat: hotel.geoCode.latitude,
          lng: hotel.geoCode.longitude,
        }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <div
          onMouseEnter={() => onHover(hotel.hotelId)}
          onMouseLeave={() => onHover(null)}
          onClick={() => onClick(hotel.hotelId)}
          className="relative flex flex-col items-center cursor-pointer"
          style={{ zIndex: isSelected || isHovered ? 9999 : 1 }}
        >
          {hotel.offer ? (
            <div
              className={`px-3 py-1 rounded-full font-semibold text-sm transition ${
                isSelected || isHovered
                  ? "bg-black text-white scale-110 z-50"
                  : "bg-white text-black shadow"
              }`}
            >
              ₹{hotel.offer.price.total ?? "N/A"}
            </div>
          ) : (
            <div
              className={`p-3 rounded-full font-semibold text-sm transition ${
                isSelected || isHovered
                  ? "bg-black text-white scale-110 z-50"
                  : "bg-white text-black shadow"
              }`}
            >
              <HotelIcon />
            </div>
          )}
        </div>
      </OverlayView>
    );
  },
  (prev, next) =>
    prev.isHovered === next.isHovered &&
    prev.isSelected === next.isSelected &&
    prev.hotel.offer?.price.total === next.hotel.offer?.price.total &&
    prev.guests === next.guests
);

// ------------------------
// Marker List Component
// ------------------------
const HotelMarkersList = React.memo(
  ({ hotels, guests }: { hotels: Hotel[]; guests: number | undefined }) => {
    const hoveredHotelId = useHotelHoverStore((state) => state.hoveredHotelId);
    const setHoveredHotelId = useHotelHoverStore(
      (state) => state.setHoveredHotelId
    );

    const selectedHotelId = useHotelHoverStore(
      (state) => state.selectedHotelId
    );
    const setSelectedHotelId = useHotelHoverStore(
      (state) => state.setSelectedHotelId
    );

    const handleHover = useCallback(
      (id: string | null) => setHoveredHotelId(id),
      [setHoveredHotelId]
    );

    const handleClick = useCallback((id: string) => {
      const store = useHotelHoverStore.getState();
      const newId = store.selectedHotelId === id ? null : id;
      store.setSelectedHotelId(newId);
    }, []);

    return (
      <>
        {hotels.map((hotel) => {
          const isHovered = hotel.hotelId === hoveredHotelId;
          const isSelected = hotel.hotelId === selectedHotelId;

          // 🔹 compute adjusted price based on guests:
          let adjustedPrice: string | undefined;
          if (hotel.offer?.price?.total) {
            const basePrice = parseFloat(hotel.offer.price.total);
            if (guests && guests > 3) {
              const rooms = Math.ceil(guests / 3);
              adjustedPrice = (basePrice * rooms).toFixed(2);
            } else {
              adjustedPrice = basePrice.toFixed(2);
            }
          }

          return (
            <HotelMarker
              key={hotel.hotelId}
              hotel={{
                ...hotel,
                offer: hotel.offer
                  ? {
                      ...hotel.offer, 
                      price: {
                        ...hotel.offer.price,
                        total: adjustedPrice ?? hotel.offer.price.total,
                      },
                    }
                  : undefined,
              }}
              isHovered={isHovered}
              isSelected={isSelected}
              guests={guests ?? 1} // pass guests to memo
              onHover={handleHover}
              onClick={handleClick}
            />
          );
        })}
      </>
    );
  }
);

// ------------------------
// Main MapHotels Component
// ------------------------
export default function MapHotels({
  hotels,
  className,
  guests,
  containerStyle = { width: "100%", height: "600px" },
}: {
  hotels: Hotel[];
  className?: string;
  guests?: number;
  containerStyle?: containerStyleProp;
}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });
  console.log("Map");
  const selectedHotelId = useHotelHoverStore((state) => state.selectedHotelId);
  const selectedHotel =
    hotels.find((h) => h.hotelId === selectedHotelId) ?? null;

  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 28.6,
    lng: 77.2,
  });

  useEffect(() => {
    if (hotels.length > 0) {
      const firstHotel = hotels[0];
      setMapCenter({
        lat: firstHotel.geoCode.latitude,
        lng: firstHotel.geoCode.longitude,
      });
    }
  }, [hotels]);

  if (!isLoaded)
    return (
      <div
        style={containerStyle}
        className=" h-full w-full bg-gray-400 animate-pulse"
      ></div>
    );

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={mapCenter}
      zoom={12}
      mapContainerClassName={`flex-1 rounded-2xl ${className}`}
    >
      {/* Marker List */}

      <HotelMarkersList hotels={hotels} guests={guests} />

      {/* Detail Card for Selected Hotel */}
      {selectedHotel && (
        <OverlayView
          position={{
            lat: selectedHotel.geoCode.latitude,
            lng: selectedHotel.geoCode.longitude,
          }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div className="absolute -top-68 left-1/2 -translate-x-1/2 w-60 bg-white rounded-xl shadow-lg overflow-hidden z-50">
            <img
              src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NjE5Mzc0MDg3NzM1MTA5MTM0/original/ddb89954-9b3f-467d-9fdf-036affd6b537.jpeg"
              alt={selectedHotel.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-base truncate">
                  {selectedHotel.name}
                </h3>
                <button
                  onClick={() => {
                    const store = useHotelHoverStore.getState();
                    store.setSelectedHotelId(null);
                    store.setHoveredHotelId(null);
                  }}
                  className="text-gray-400 hover:text-black"
                >
                  ✕
                </button>
              </div>
              <p className="text-sm text-gray-600">
                {selectedHotel.address.cityName}
              </p>
              <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                {selectedHotel.description ??
                  "Nice hotel with comfortable stay."}
              </p>
              {selectedHotel.offer ? (
                <p className="mt-2 font-semibold text-red-500">
                  ₹{selectedHotel.offer.price.total}{" "}
                  {selectedHotel.offer.price.currency}
                </p>
              ) : (
                <p className="text-gray-400 text-xs">No offer available</p>
              )}
            </div>
          </div>
        </OverlayView>
      )}
    </GoogleMap>
  );
}
