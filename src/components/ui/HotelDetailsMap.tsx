"use client"
import { GoogleMap, OverlayView, useLoadScript } from "@react-google-maps/api";
import { Hotel } from "lucide-react";
 

export default function HotelDetailsMap({hotelDetails}: {hotelDetails: HotelOffer}){

    const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  if (!isLoaded) {
    return <div className="h-[400px] bg-gray-300 animate-pulse"></div>;
  }
    return(
        <GoogleMap
                mapContainerStyle={{ height: "400px" }}
                center={{
                  lat: hotelDetails?.geoCode?.latitude,
                  lng: hotelDetails?.geoCode?.longitude,
                }}
                zoom={12}
                mapContainerClassName="flex-1 sticky "
              >
                <OverlayView
                  position={{
                    // TODO: Change this
                    lat: hotelDetails?.geoCode?.latitude,
                    lng: hotelDetails?.geoCode?.longitude,
                  }}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                  <div className="relative flex flex-col items-center">
                    <div
                      className={` p-3 rounded-full bg-black font-semibold text-sm cursor-pointer transition`}
                    >
                      <Hotel className="text-white" />
                    </div>
                  </div>
                </OverlayView>
              </GoogleMap>  
    )
}