import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HoverState {
  hoveredHotelId: string | null;
  setHoveredHotelId: (id: string | null) => void;
  selectedHotelId: string | null;
  setSelectedHotelId: (id: string | null) => void;
}

interface HotelBookingState {
  hotelDetails: HotelOffer | null
  setHotelDetails: (hotelDetail: HotelOffer | null) => void;
}

const localStoragePersist = {
  getItem: (name: string) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name: string, value: unknown) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

export const useHotelHoverStore = create<HoverState>((set) => ({
  hoveredHotelId: null,
  setHoveredHotelId: (id) => set({ hoveredHotelId: id }),
  selectedHotelId: null,
  setSelectedHotelId: (id) => set({ selectedHotelId: id }),
}));


export const useHotelBookingStore = create<HotelBookingState>()(
  persist(
    (set) => ({
      hotelDetails: null,
      setHotelDetails: (details: HotelOffer | null) => set({ hotelDetails: details }),
      clearHotelDetails: () => set({ hotelDetails: null }),
    }),
    {
      name: "hotel-storage", // key in localStorage
      storage: localStoragePersist, // use localStorage
    }
  )
);