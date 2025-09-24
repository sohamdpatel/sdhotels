
import { Button } from "@/components/ui/button";
import { ClipboardList, Heart, Info, MapPin, Share } from "lucide-react";
import HotelDetailsPriceBox from "./ui/HotelDetailsPriceBox";
import HotelDetailsMap from "./ui/HotelDetailsMap";

export default function HotelDetails({
  hotelDetails,
}: {
  hotelDetails: HotelOffer,
}) {


  return (
    <div className="max-w-6xl mx-auto p-6 pt-24 space-y-6 md:pt-[200px]">
      {/* Hotel Header */}
      <div className=" flex justify-between gap-3 sm:gap-0 sm:items-center flex-col sm:flex-row">
        <h1 className="text-3xl font-bold">{hotelDetails?.name}</h1>
        <div className=" flex gap-2">
          <Button className="bg-white hover:bg-[#dcdcdc] text-black text-lg px-5 shadow-none">
            <Share />
            Share
          </Button>
          <Button className="bg-white hover:bg-[#dcdcdc] text-black text-lg px-5 shadow-none">
            <Heart />
            Save
          </Button>
        </div>
      </div>

      {/* Images (Dummy) */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[500px]">
        {/* First big image */}
        <img
          src="https://picsum.photos/800/600?random=1"
          alt="Hotel main"
          className="w-full h-full object-cover rounded-lg col-span-2 row-span-2"
        />

        {/* Other 4 images */}
        {[2, 3, 4, 5].map((img) => (
          <img
            key={img}
            src={`https://picsum.photos/600/400?random=${img}`}
            alt="Hotel"
            className="w-full h-full object-cover rounded-lg"
          />
        ))}
      </div>

      {/* Offer Details */}
      <div className="flex justify-between gap-5">
        <div className=" w-full grid grid-cols-1 md:grid-cols-[1fr_auto] gap-x-5 divide-y-2">
          {/* Hotel Id and its city and chainCode */}
          <div className=" flex flex-col justify-center pb-8">
            <h1 className="text-3xl font-bold">
              Hotel in{" "}
              {hotelDetails?.address?.cityName +
                "," +
                hotelDetails?.address?.countryCode}
            </h1>
            <p className="text-gray-600">
              Hotel ID: {hotelDetails.hotelId} • Chain: {hotelDetails.chainCode}
            </p>
          </div>

          {/* Price box for mobile */}
          <div className=" w-full md:w-[300px] lg:w-[400px] md:sticky md:top-[124px] md:self-start md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-6">
            <HotelDetailsPriceBox  hotelDetails={hotelDetails} />
          </div>

          {/* Reviews and Rating */}
          <div>
            <div className="flex justify-between w-full divide-x-2 border-2 p-5 rounded-3xl my-8">
              <div className=" flex-1 text-center font-semibold text-xl text-wrap">
                Guests favourite
              </div>
              <div className=" flex-1 text-center font-semibold text-xl self-center text-wrap">
                4.9 Rating
              </div>
              <div className=" flex-1 text-center font-semibold text-xl self-center text-wrap">
                10 reviews
              </div>
            </div>
          </div>

          {/* About Hotel's Room */}
          <div className="flex flex-col space-y-2 py-8">
            <h2 className="text-2xl font-semibold flex gap-3 items-center">
              <Info />
              About Its Room
            </h2>
            <p className=" text-xl text-wrap text-gray-600">
              {hotelDetails?.offer?.roomInformation?.description}
            </p>
          </div>

          {/* Policies */}
          <div className="space-y-2 py-8">
            <h2 className="text-2xl font-semibold flex gap-3 items-center">
              <ClipboardList />
              Policies
            </h2>
            {hotelDetails?.offer?.policies?.cancellations?.map(
              (policy: any, i: number) => (
                <p key={i} className=" text-xl">
                  Free cancellation before{" "}
                  <span className="font-medium">{policy.deadline}</span> •
                  Charge for {policy.numberOfNights} night(s) after deadline
                </p>
              )
            )}
          </div>

          {/* Location */}
          <div className="flex flex-col gap-2 pt-8 mb-12 md:mb-0">
            <h2 className="text-2xl font-semibold flex gap-3 items-center">
              <MapPin />
              Location
            </h2>
            <p className=" text-xl text-wrap text-gray-600 ">
              {hotelDetails?.address?.lines.join(", ")}
            </p>
            <div className=" mt-5">
              <HotelDetailsMap hotelDetails={hotelDetails}/>
            </div>
          </div>
        </div>
        {/* Sidebar for getOffer */}
        {/* <aside className="hidden md:block w-full md:w-[350px] lg:w-[400px] sticky top-[124px] self-start">
          <HotelDetailsPriceBox  hotelDetails={hotelDetails} 
          // guests={guests} adults={adults} childrens={childrens}
          />
        </aside> */}
      </div>
    </div>
  );
}
