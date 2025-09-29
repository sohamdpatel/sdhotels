// types/amadeus.d.ts
declare module "amadeus" {
  interface AmadeusConfig {
    clientId: string;
    clientSecret: string;
  }

  // ---- Your data shapes (simplified) ----
  export interface AmadeusHotel {
    type: string;
    hotelId: string;
    name: string;
    address: {
      cityName: string;
      countryCode: string;
    };
    geoCode: {
      latitude: number;
      longitude: number;
    };
  }

  export interface AmadeusHotelOffer {
    type: string;
    hotel: AmadeusHotel;
    offers: {
      id: string;
      checkInDate: string;
      checkOutDate: string;
      guests: {
        adults: number;
        children?: number;
      };
      price: {
        currency: string;
        total: string;
        taxes?: { code: string; percentage: string }[];
      };
      policies?: {
        cancellations?: { deadline: string; numberOfNights: number }[];
      };
    }[];
  }

  export default class Amadeus {
    constructor(config: AmadeusConfig);

    referenceData: {
      locations: {
        hotels: {
          byCity: {
            get(params: { cityCode: string }): Promise<{ data: AmadeusHotel[] }>;
          };
          byGeocode: {
            get(params: {
              latitude: number;
              longitude: number;
              radius?: number;
            }): Promise<{ data: AmadeusHotel[] }>;
          };
        };
      };
    };

    shopping: {
      hotelOffers: {
        get(params: {
          hotelIds: string;
        }): Promise<{ data: AmadeusHotelOffer[] }>;
      };
      hotelOffersByHotel: {
        get(params: {
          hotelId: string;
        }): Promise<{ data: AmadeusHotelOffer[] }>;
      };
    };
  }
}
