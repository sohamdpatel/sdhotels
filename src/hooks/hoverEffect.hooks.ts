import { create } from "zustand";

interface HoverState {
  hoveredHotelId: string | null;
  setHoveredHotelId: (id: string | null) => void;
  selectedHotelId: string | null;
  setSelectedHotelId: (id: string | null) => void;
}

export const useHotelHoverStore = create<HoverState>((set) => ({
  hoveredHotelId: null,
  setHoveredHotelId: (id) => set({ hoveredHotelId: id }),
  selectedHotelId: null,
  setSelectedHotelId: (id) => set({ selectedHotelId: id }),
}));
