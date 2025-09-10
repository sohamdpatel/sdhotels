import HotelDetails from "@/components/HotelDetails";
import { hotelService } from "@/data-services/hotelData";

export default async function HotelDetailsPage({params}: {params: {hotelId: string}}) {
    const hotelId = params.hotelId
    console.log("hotelId", hotelId);
    
    const hotelDetails = await hotelService.getHotelDetailsById(hotelId)
      console.log("hotels from hoteldetailspage", hotelDetails); 
    return(
        <HotelDetails hotelDetails={hotelDetails}/>
    )
}