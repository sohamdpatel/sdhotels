// services/HotelService.ts
import axios, { AxiosInstance } from "axios";
import Amadeus from "amadeus";

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
      const hotelIds = hotels.map((h: any) => h.hotelId);
      // return hotelIds
      // @ts-ignore – Amadeus typings outdated
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
      return hotels.map((hotel: any) => {
        const offer = offers.find(
          (o: any) => o.hotel.hotelId === hotel.hotelId
        );

        return {
          ...hotel,
          offer: offer?.offers?.[0], // first available offer
        };
      });
    } catch (err: any) {
      console.error("Amadeus API Error:", err.response?.result || err);
      throw err;
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
      // @ts-ignore
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

      const hotelIds = hotelsRes.data.map((h: any) => h.hotelId);
      console.log("total hotels", hotelIds.length);

      if (hotelIds.length === 0) return [];

      // STEP 2: Fetch offers for those hotels
      // Batch them because Amadeus allows max 200 hotelIds at once

      const batches = [];
      for (let i = 0; i < hotelIds.length; i += 50) {
        const chunk = hotelIds.slice(i, i + 50);
        console.log("loopchunk length", chunk.length);
        console.log("loopchunk", chunk);

        // @ts-ignore
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
      const offers = batches.filter((h: any) => h.offers?.length > 0);
      console.log("offers after filter", offers);

      const availableHotels = hotelsRes.data
        .map((hotel: any) => {
          const offer = offers.find(
            (o: any) => o.hotel.hotelId === hotel.hotelId
          );

          if (!offer || !offer.offers?.length) return null;

          return {
            ...hotel, // reference info (name, address, rating, etc.)
            offer: offer.offers[0], // first available offer (you can also map all)
          };
        })
        .filter(Boolean); // remove nulls

      return availableHotels;
    } catch (err: any) {
      console.error("Amadeus API Error:", err.response?.result || err);
      return [];
    }
  }

  async getHotelDetailsById(hotelId: string) {
    try {
      console.log("hotelId", hotelId);
      const hotelNormalDetails =
      // @ts-ignore
        await this.client.referenceData.locations.hotels.byHotels.get({
          hotelIds: hotelId,
        });

      console.log("hotelNormalDetails", hotelNormalDetails);
      // @ts-ignore

      const offersRes = await this.client.shopping.hotelOffersSearch.get({
        hotelIds: hotelId,
      });
      console.log("offer?.offers?.[0]", offersRes);

      return {
        ...hotelNormalDetails.data[0],
        offer: offersRes?.data[0]?.offers?.[0],
      };
    } catch (err: any) {
      console.error("Amadeus API Error:", err.response?.result || err);
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

      const hotelIds = hotels.map((h: any) => h.hotelId);

      const offersRes = await this.client.shopping.hotelOffers.get({
        hotelIds: hotelIds.join(","),
      });

      const offers = offersRes.data;

      return hotels.map((hotel: any) => {
        const offer = offers.find(
          (o: any) => o.hotel.hotelId === hotel.hotelId
        );
        return {
          ...hotel,
          offer: offer?.offers?.[0],
        };
      });
    } catch (err: any) {
      console.error("Amadeus API Error:", err.response?.result || err);
      throw err;
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

      // @ts-ignore – Amadeus typings outdated
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
    } catch (err: any) {
      console.error("Amadeus API Error:", err.response?.result || err);
      throw err;
    }
  }

  async getCitySuggestions(keyword: string) {
    try {
      // @ts-ignore - typings outdated
      const response = await this.client.referenceData.locations.get({
        keyword,
        subType: "CITY",
      });

      return response.data.map((item: any) => ({
        name: item.name, // City name
        cityCode: item.iataCode, // City code (IATA)
        country: item.address.countryCode,
      }));
    } catch (err: any) {
      console.error("City fetch error:", err.response?.result || err);
      return [];
    }
  }

  // services/HotelService.ts

  async getOfferData(offerId: string) {
    try {
      if (!offerId) throw new Error("offerId is required");
      console.log("Offer data id", offerId, typeof offerId);

      console.log("Offer data", this.client.shopping);
      // @ts-ignore – Amadeus typings outdated
      const res = await this.client.shopping.hotelOfferSearch(offerId).get();

      // res.data will be the offer object
      return res.data;
    } catch (err: any) {
      console.error("Amadeus Offer fetch error:", err.response?.result || err);
      throw err;
    }
  }
}

export const hotelService = new HotelService();
