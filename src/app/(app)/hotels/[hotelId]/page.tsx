import HotelDetails from "@/components/HotelDetails";
import ErrorModalClient from "@/components/ui/ErrorModal";
import { hotelService } from "@/data-services/hotelData";

export default async function HotelDetailsPage({
  params,
}: {
  params: { hotelId: string };
}) {
  // ✅ no await
  const { hotelId } = params;

  try {
    const hotelDetails = await hotelService.getHotelDetailsById(hotelId);

    if (!hotelDetails) {
      return <ErrorModalClient message="No hotel details found." />;
    }

    return <HotelDetails hotelDetails={hotelDetails} />;
  } catch (err: unknown) {
    // ✅ type-safe error handling
    let message = "Failed to load hotel details.";
    if (err instanceof Error) {
      message = err.message;
    }

    return <ErrorModalClient message={message} />;
  }
}
