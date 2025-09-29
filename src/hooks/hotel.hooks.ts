// queries/hotelQueries.ts

import { hotelService } from "@/data-services/hotelData";
import { useQuery } from "@tanstack/react-query";


// Set token when available (e.g., after login)
// hotelService.setToken("your-jwt-token");

// 🏨 Get hotels by city
export function useHotelsByCity(cityCode: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ["hotels", "city", cityCode],
    queryFn: () => hotelService.getHotelsByCity(cityCode),
    enabled: !!cityCode && enabled, // don’t run until cityCode exists
  });
}

// 📍 Get hotels by geo
export function useHotelsByGeo(lat: number, lon: number, radius = 10) {
  return useQuery({
    queryKey: ["hotels", "geo", lat, lon, radius],
    queryFn: () => hotelService.getHotelsByGeo(lat, lon, radius),
    enabled: !!lat && !!lon,
  });
}

// 🏨 Get hotel details
export function useHotelById(hotelId: string) {
  return useQuery({
    queryKey: ["hotel", hotelId],
    queryFn: () => hotelService.getHotelById(hotelId),
    enabled: !!hotelId,
  });
}

