import HotelDetails from "@/components/HotelDetails";
import { hotelService } from "@/data-services/hotelData";

export default async function HotelDetailsPage({
  params,
  searchParams,
}: {
  params: { hotelId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const hotelId = params.hotelId;

  // Convert query params to numbers safely
  const checkIn = searchParams.checkIn as string | undefined;
  const checkOut = searchParams.checkOut as string | undefined;
  const guests = searchParams.guests ? Number(searchParams.guests) : 1;
  const adults = searchParams.adults ? Number(searchParams.adults) : 1;
  const childrens = searchParams.childrens
    ? Number(searchParams.childrens)
    : 0;

  const hotelDetails = await hotelService.getHotelDetailsById(hotelId);

  // Example calculation logic
  if (hotelDetails && guests && guests > 3) {
    console.log("i am in detail page condition");

    const price =
      parseInt(hotelDetails?.offer?.price?.total) * Math.ceil(guests / 3);

    console.log("price after cal from detail server", price);

    hotelDetails.offer.price.total = price;
  }

  return (
    <HotelDetails
      hotelDetails={hotelDetails}
      guests={guests}
      adults={adults}
      childrens={childrens}
    />
  );
}
