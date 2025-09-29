// services/HotelService.ts
import Amadeus, { AmadeusHotel, AmadeusHotelOffer } from "amadeus";

class HotelService {
  private client: Amadeus;

  constructor() {
    this.client = new Amadeus({
      clientId: process.env.NEXT_PUBLIC_AMADEUS_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_AMADEUS_CLIENT_SECRET!,
    });
  }

  async getHotelsByCity(cityCode: string, limit: number = 20) {
    // Step 1: Get reference hotels
    try {
      // console.log("cityCode", cityCode);
      console.log("cityCode", this.client);

      const refRes =
        await this.client.referenceData.locations.hotels.byCity.get({
          cityCode,
        });
      // console.log("hotelby city full", refRes);

      let hotels = refRes.data || [];
      if (!hotels.length) return [];

      // Step 2: Limit hotels
      hotels = hotels.slice(0, limit);

      // console.log("hotelby city", hotels);

      // Step 3: Collect hotelIds
      const hotelIds = hotels.map((h: AmadeusHotel) => h.hotelId);
      // return hotelIds
      // @ts-expect-error – Amadeus typings outdated
      // Step 4: Fetch price offers only for those hotels
      const offersRes = await this.client.shopping.hotelOffersSearch.get({
        hotelIds: hotelIds.join(","),
      });
      // console.log("hotelby city offersRes", offersRes);

      const offers = await offersRes.data;

      console.log("hotelby city offer", offers);
      if (!offers) {
        return hotels;
      }
      // Step 5: Merge reference + price
      return hotels.map((hotel: AmadeusHotel) => {
        const offer = offers.find(
          (o: AmadeusHotelOffer) => o.hotel.hotelId === hotel.hotelId
        );

        return {
          ...hotel,
          offer: offer?.offers?.[0], // first available offer
        };
      });
    } catch (err: unknown) {
  // If it's a standard Error instance
  if (err instanceof Error) {
    console.error("Amadeus Offer fetch error:", err.message);
    throw err; // rethrow
  }

  // If it's an object with a `response` property (common in Axios-like errors)
  if (
    typeof err === "object" &&
    err !== null &&
    "response" in err &&
    typeof (err as { response?: { result?: unknown } }) === "object"
  ) {
    const responseResult = (err as { response?: { result?: unknown } }).response?.result;
    console.error("Amadeus Offer fetch error:", responseResult || err);
    throw new Error(
      responseResult ? JSON.stringify(responseResult) : "Unknown error occurred"
    );
  }

  // Fallback for anything else
  console.error("Amadeus Offer fetch error:", err);
  throw new Error("Unknown error occurred");
}

  }

  async searchAvailableHotelsV2(
    cityCode: string,
    checkIn: string,
    checkOut: string,
    adults: number = 1
  ) {
    try {
      // STEP 1: Get hotels in the city
      console.log(
        "search",
        cityCode,
        typeof checkIn,
        checkIn,
        checkOut,
        adults
      );

      const hotelsRes =
        await this.client.referenceData.locations.hotels.byCity.get({
          cityCode,
        });

      const hotelIds = hotelsRes.data.map((h: AmadeusHotel) => h.hotelId);
      console.log("total hotels", hotelIds.length);

      if (hotelIds.length === 0) return [];

      // STEP 2: Fetch offers for those hotels
      // Batch them because Amadeus allows max 200 hotelIds at once

      const batches = [];
      for (let i = 0; i < hotelIds.length; i += 50) {
        const chunk = hotelIds.slice(i, i + 50);
        console.log("loopchunk length", chunk.length);
        console.log("loopchunk", chunk);

        // @ts-expect-error - old version of amadeus type
        const offersRes = await this.client.shopping.hotelOffersSearch.get({
          hotelIds: chunk.join(","),
          checkInDate: checkIn,
          checkOutDate: checkOut,
          adults,
          roomQuantity: 1,
          currency: "INR",
        });
        console.log("offersre length", offersRes);

        offersRes?.data && batches.push(...offersRes.data);
      }

      // ✅ filter hotels with valid offers
      const offers = batches.filter((h: AmadeusHotelOffer) => h.offers?.length > 0);
      console.log("offers after filter", offers);

      const availableHotels: HotelWithOffer[] = hotelsRes.data
  .map((hotel: AmadeusHotel) => {
    const offer = offers.find(
      (o: AmadeusHotelOffer) => o.hotel.hotelId === hotel.hotelId
    );

    if (!offer || !offer.offers?.length) return null;

    return {
  ...hotel,
  offer: offer.offers[0],
} as unknown as HotelOffer;
  })
  .filter((hotel): hotel is HotelOffer => hotel !== null); // type guard


      return availableHotels;
    } catch (err: unknown) {
    // Narrow the error type
    if (err instanceof Error) {
    console.error("Amadeus Offer fetch error:", err.message);
  }

  // If it's an object with a `response` property (common in Axios-like errors)
  if (
    typeof err === "object" &&
    err !== null &&
    "response" in err &&
    typeof (err as { response?: { result?: unknown } }) === "object"
  ) {
    const responseResult = (err as { response?: { result?: unknown } }).response?.result;
    console.error("Amadeus Offer fetch error:", responseResult || err);
  }

  // Fallback for anything else
  console.error("Amadeus Offer fetch error:", err);
      return [];
    }
  }

  async getHotelDetailsById(hotelId: string) {
    try {
      console.log("hotelId", hotelId);
      const hotelNormalDetails =
      // @ts-expect-error - older version of amadeus types
        await this.client.referenceData.locations.hotels.byHotels.get({
          hotelIds: hotelId,
        });

      console.log("hotelNormalDetails", hotelNormalDetails);
      // @ts-expect-error - older version of amadeus types

      const offersRes = await this.client.shopping.hotelOffersSearch.get({
        hotelIds: hotelId,
      });
      console.log("offer?.offers?.[0]", offersRes);

      return {
        ...hotelNormalDetails.data[0],
        offer: offersRes?.data[0]?.offers?.[0],
      };
    } catch (err: unknown) {
    // Narrow the error type
    if (err instanceof Error) {
    console.error("Amadeus Offer fetch error:", err.message);
  }

  // If it's an object with a `response` property (common in Axios-like errors)
  if (
    typeof err === "object" &&
    err !== null &&
    "response" in err &&
    typeof (err as { response?: { result?: unknown } }) === "object"
  ) {
    const responseResult = (err as { response?: { result?: unknown } }).response?.result;
    console.error("Amadeus Offer fetch error:", responseResult || err);
  }

  // Fallback for anything else
  console.error("Amadeus Offer fetch error:", err);
    return [];
  }
  }

  // 📍 Get hotels by lat/lon
  async getHotelsByGeo(
    lat: number,
    lon: number,
    radius: number = 10,
    limit: number = 10
  ) {
    try {
      console.log("geo", lat, lon, radius);

      const refRes =
        await this.client.referenceData.locations.hotels.byGeocode.get({
          latitude: lat,
          longitude: lon,
          radius,
        });

      let hotels = refRes.data || [];
      if (!hotels.length) return [];

      hotels = hotels.slice(0, limit);
      console.log("hotelby geo", hotels);

      const hotelIds = hotels.map((h: AmadeusHotel) => h.hotelId);

      const offersRes = await this.client.shopping.hotelOffers.get({
        hotelIds: hotelIds.join(","),
      });

      const offers = offersRes.data;

      return hotels.map((hotel: AmadeusHotel) => {
        const offer = offers.find(
          (o: AmadeusHotelOffer) => o.hotel.hotelId === hotel.hotelId
        );
        return {
          ...hotel,
          offer: offer?.offers?.[0],
        };
      });
    } catch (err: unknown) {
    // Narrow the error type
    if (err instanceof Error) {
    console.error("Amadeus Offer fetch error:", err.message);
  }

  // If it's an object with a `response` property (common in Axios-like errors)
  if (
    typeof err === "object" &&
    err !== null &&
    "response" in err &&
    typeof (err as { response?: { result?: unknown } }) === "object"
  ) {
    const responseResult = (err as { response?: { result?: unknown } }).response?.result;
    console.error("Amadeus Offer fetch error:", responseResult || err);
  }

  // Fallback for anything else
  console.error("Amadeus Offer fetch error:", err);
    return []
  }
  }

  // 🏨 Get hotel details by ID
  async getHotelById(hotelId: string) {
    const res = await this.client.shopping.hotelOffersByHotel.get({
      hotelId,
    });
    return res.data;
  }

  // 💰 Get hotel offers (with prices & rooms)
  async getHotelOffers({
    hotelId,
    checkInDate,
    checkOutDate,
    adults = 1,
  }: {
    hotelId: string;
    checkInDate: string | undefined;
    checkOutDate: string | undefined;
    adults?: number;
  }) {
    try {
      console.log(
        "getHotelOffers data",
        hotelId,
        checkInDate,
        checkOutDate,
        adults
      );

      // @ts-expect-error – Amadeus typings outdated
      const res = await this.client.shopping.hotelOffersSearch.get({
        hotelIds: hotelId,
        checkInDate,
        checkOutDate,
        adults, // required parameter
        roomQuantity: 1,
        currency: "INR",
      });
      console.log("res", res);

      return res.data[0];
    } catch (err: unknown) {
    // Narrow the error type
    if (err instanceof Error) {
    console.error("Amadeus Offer fetch error:", err.message);
    throw err; // rethrow
  }

  // If it's an object with a `response` property (common in Axios-like errors)
  if (
    typeof err === "object" &&
    err !== null &&
    "response" in err &&
    typeof (err as { response?: { result?: unknown } }) === "object"
  ) {
    const responseResult = (err as { response?: { result?: unknown } }).response?.result;
    console.error("Amadeus Offer fetch error:", responseResult || err);
    throw new Error(
      responseResult ? JSON.stringify(responseResult) : "Unknown error occurred"
    );
  }

  // Fallback for anything else
  console.error("Amadeus Offer fetch error:", err);
  throw new Error("Unknown error occurred");
  }
  }

  async getCitySuggestions(keyword: string) {
    try {
      // @ts-expect-error - typings outdated
      const response = await this.client.referenceData.locations.get({
        keyword,
        subType: "CITY",
      });

      return response.data.map((item: { name: string, iataCode: string, address: { countryCode: string}}) => ({
        name: item.name, // City name
        cityCode: item.iataCode, // City code (IATA)
        country: item.address.countryCode,
      }));
    } catch (err: unknown) {
    // Narrow the error type
    if (err instanceof Error) {
    console.error("Amadeus Offer fetch error:", err.message);
    throw err; // rethrow
  }

  // If it's an object with a `response` property (common in Axios-like errors)
  if (
    typeof err === "object" &&
    err !== null &&
    "response" in err &&
    typeof (err as { response?: { result?: unknown } }) === "object"
  ) {
    const responseResult = (err as { response?: { result?: unknown } }).response?.result;
    console.error("Amadeus Offer fetch error:", responseResult || err);
    throw new Error(
      responseResult ? JSON.stringify(responseResult) : "Unknown error occurred"
    );
  }

  // Fallback for anything else
  console.error("Amadeus Offer fetch error:", err);
  throw new Error("Unknown error occurred");
  }
  }

  // services/HotelService.ts

  async getOfferData(offerId: string) {
    try {
      if (!offerId) throw new Error("offerId is required");
      console.log("Offer data id", offerId, typeof offerId);

      console.log("Offer data", this.client.shopping);
      // @ts-expect-error – Amadeus typings outdated
      const res = await this.client.shopping.hotelOfferSearch(offerId).get();

      // res.data will be the offer object
      return res.data;
    } catch (err: unknown) {
    // Narrow the error type
    if (err instanceof Error) {
    console.error("Amadeus Offer fetch error:", err.message);
    throw err; // rethrow
  }

  // If it's an object with a `response` property (common in Axios-like errors)
  if (
    typeof err === "object" &&
    err !== null &&
    "response" in err &&
    typeof (err as { response?: { result?: unknown } }) === "object"
  ) {
    const responseResult = (err as { response?: { result?: unknown } }).response?.result;
    console.error("Amadeus Offer fetch error:", responseResult || err);
    throw new Error(
      responseResult ? JSON.stringify(responseResult) : "Unknown error occurred"
    );
  }

  // Fallback for anything else
  console.error("Amadeus Offer fetch error:", err);
  throw new Error("Unknown error occurred");
  }
  }
}

export const hotelService = new HotelService();
