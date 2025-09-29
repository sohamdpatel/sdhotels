interface HotelOffer {
  address: {
    countryCode: string;
    postalCode: string;
    cityName: string;
    lines: string[];
  };
  chainCode: string;
  dupeId: number;
  geoCode: {
    latitude: number;
    longitude: number;
  };
  hotelId: string;
  iataCode: string;
  lastUpdate: string; // ISO date string
  masterChainCode: string;
  name: string;
  offer?: HotelOffersOffer;
  self: string;
}

interface HotelOffersOffer {
  boardType: string;
  checkInDate: string; // yyyy-MM-dd
  checkOutDate: string; // yyyy-MM-dd
  guests: {
    adults: number;
    childrens?: number;
  };
  id: string;
  policies: {
    cancellations: {
      deadline: string; // ISO date string
      numberOfNights: number;
      policyType: string;
    }[];
    guarantee: {
      acceptedPayments: {
        creditCardPolicies: {
          vendorCode: string;
        }[];
        creditCards: string[];
        methods: string[];
      };
    };
    paymentType: string;
    refundable: {
      cancellationRefund: string;
    };
  };
  price: {
    currency: string;
    base: string;
    total: string;
    baseTotal?: string;
    taxes: {
      code: string;
      included: boolean;
      percentage: string;
    }[];
    variations: {
      average: {
        base: string;
      };
      changes: {
        startDate: string;
        endDate: string;
        base: string;
      }[];
    };
  };
  rateCode: string;
  rateFamilyEstimated: {
    code: string;
    type: string;
  };
  room: {
    description: {
      text: string;
      lang: string;
    };
    type: string;
    typeEstimated: {
      category: string;
    };
  };
  roomInformation: {
    description: string;
    type: string;
    typeEstimated: {
      category: string;
    };
  };
}

interface ConfirmBooking {
  hotelName: string | undefined;
  hotelLocation: string | undefined;
  checkInDate: string | undefined;
  checkOutDate: string | undefined;
  guests: number | undefined;
}

type CancellationPolicy = {
  deadline: string;
  numberOfNights: number;
};

type getCitySuggestionsResponse = {
  name: string;
  cityCode: string;
  country: string;
};

interface HotelWithOffer {
  hotelId: string;
  name: string;
  type?: string;
  address: {
    cityName: string;
    countryCode: string;
  };
  geoCode: {
    latitude: number;
    longitude: number;
  };
  offer?: AmadeusHotelOfferDetails; // type of offer.offers[0]
}
