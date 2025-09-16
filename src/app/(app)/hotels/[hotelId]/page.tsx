import HotelDetails from "@/components/HotelDetails";
import { hotelService } from "@/data-services/hotelData";

export default async function HotelDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ hotelId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const {hotelId} = await params;
  const {checkIn,checkOut,guests,adults,childrens} = await searchParams
  // Convert query params to numbers safely
  // const checkInDate =checkIn as string | undefined;
  // const checkOutDate =checkOut as string | undefined;
  const guestss =guests ? Number(guests) : 1;
  const adultss =adults ? Number(adults) : 1;
  const childrenss =childrens
    ? Number(childrens)
    : 0;

  const hotelDetails = await hotelService.getHotelDetailsById(hotelId);

  // Example calculation logic
  if (hotelDetails && guestss && guestss > 3) {
    console.log("i am in detail page condition");

    const price =
      parseFloat(hotelDetails?.offer?.price?.total) * Math.ceil(guestss / 3);

    console.log("price after cal from detail server", price);

    hotelDetails.offer.price.total = price;
  }

  return (
    <HotelDetails
      hotelDetails={hotelDetails}
      guests={guestss}
      adults={adultss}
      childrens={childrenss}
    />
  );
}
