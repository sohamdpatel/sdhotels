import React from "react";
import { MapPin } from "lucide-react";
import Link from "next/link";
import HotelCardLikeButton from "../ui/HotelCardLikeButton";

function HotelCard({ hotel, setHoveredHotel, guests = 1, adults = 1, childrens = 0 }: { hotel: HotelOffer, setHoveredHotel?: any, guests?: number, adults?: number, childrens?: number }) {
  const hasOffer = !!hotel?.offer;
  let price;
  if( guests > 3){

    const hotelprice = parseFloat(parseFloat(hotel?.offer?.price?.total).toFixed(2))
    const room = Math.ceil(guests / 3)
    price = parseFloat((hotelprice  * room).toFixed(2))
    console.log("price from cards",hotel?.name, price , hotelprice, room);
    
  } else {
    price = hotel?.offer?.price?.total
  }


  const content = (
    <div
      className={`flex flex-col max-w-md ${
        hasOffer ? "cursor-pointer" : "cursor-not-allowed"
      }`}
      onMouseEnter={() => setHoveredHotel && setHoveredHotel(hotel)}
      onMouseLeave={() => setHoveredHotel && setHoveredHotel(null)}
    >
      {/* Image with overlay */}
      <div className="relative">
        <img
          src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NjE5Mzc0MDg3NzM1MTA5MTM0/original/ddb89954-9b3f-467d-9fdf-036affd6b537.jpeg?im_w=1200"
          alt="hotel"
          className="w-full aspect-square object-cover rounded-3xl"
        />
        <div className="absolute z-10 top-3 left-3 text-[10px] sm:text-sm lg:text-md font-semibold text-[#000] bg-[#ffffffb7] rounded-full px-2 p-1">
          Guest favourite
        </div>
        {/* Heart icon */}
        <HotelCardLikeButton />
      </div>
 
      {/* Hotel Info */}
      <div className="mt-2 flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <h2 className="font-semibold text-sm truncate">{hotel?.name}</h2>
        </div>

        <div className="flex items-center text-gray-500 text-sm">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{hotel?.address?.cityName}</span>
        </div>

        <div className="mt-1">
          {hasOffer && price ? (
            <>
              <span className="font-semibold">
                {price} {hotel?.offer?.price?.currency}
              </span>{" "}
              <span className="text-gray-500 text-sm">for a day</span>
            </>
          ) : (
            <span className="text-gray-400 italic">No offers available</span>
          )}
        </div>
      </div>
    </div>
  );


  return hasOffer ? (
    <Link href={`/hotels/${hotel?.hotelId}?checkIn=${hotel?.offer?.checkInDate}&checkOut=${hotel?.offer?.checkInDate}&guests=${guests}&adults=${adults}&childrens=${childrens}&`} target="_blank" 
        rel="noopener noreferrer" key={hotel?.hotelId}>
      {content}
    </Link>
  ) : (
    <div key={hotel?.hotelId}>{content}</div>
  );
}

export default HotelCard;
