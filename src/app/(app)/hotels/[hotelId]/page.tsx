import HotelDetails from "@/components/HotelDetails";
import ErrorModalClient from "@/components/ui/ErrorModal";
import { hotelService } from "@/data-services/hotelData";

export default async function HotelDetailsPage({ params }: { params: { hotelId: string } }) {

  const {hotelId} = await params
  try {
    const hotelDetails = await hotelService.getHotelDetailsById(hotelId);

    if (!hotelDetails) {
      return <ErrorModalClient message="No hotel details found." />;
    }
 
    return <HotelDetails hotelDetails={hotelDetails} />;
  } catch (err: any) {
    return (
      <ErrorModalClient
        message={err.message || "Failed to load hotel details."}
      />
    );
  }
}


