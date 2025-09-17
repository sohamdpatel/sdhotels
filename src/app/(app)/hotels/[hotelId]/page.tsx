import HotelDetails from "@/components/HotelDetails";
import { hotelService } from "@/data-services/hotelData";

export default async function HotelDetailsPage({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) {

  console.log("main detail page")
  const {hotelId} = await params;

  const hotelDetails = await hotelService.getHotelDetailsById(hotelId);
  

  return (
    <HotelDetails
      hotelDetails={hotelDetails}
    />
  );
}


