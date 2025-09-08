// types/amadeus.d.ts
declare module "amadeus" {
  interface AmadeusConfig {
    clientId: string;
    clientSecret: string;
  }

  export default class Amadeus {
    constructor(config: AmadeusConfig);

    referenceData: {
      locations: {
        hotels: {
          byCity: {
            get(params: { cityCode: string }): Promise<{ data: any[] }>;
          };
          byGeocode: {
            get(params: {
              latitude: number;
              longitude: number;
              radius?: number;
            }): Promise<{ data: any[] }>;
          };
        };
      };
    };

    shopping: {
      hotelOffers: {
        get(params: { hotelIds: string }): Promise<{ data: any[] }>;
      };
      hotelOffersByHotel: {
        get(params: { hotelId: string }): Promise<{ data: any[] }>;
      };
    };
  }
}
