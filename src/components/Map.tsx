// components/Map.tsx
"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
interface Pin {
  id: string;
  name: string;
  lat: number;
  lng: number;
}
export default function Map({ hotels }: { hotels: Pin[] }) {
  if (hotels.length === 0) return null;

  const center = [hotels[0].lat, hotels[0].lng];

  return (
    <MapContainer center={center} zoom={13} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hotels.map((hotel) => (
        <Marker key={hotel.id} position={[hotel.lat, hotel.lng]}>
          <Popup>
            <strong>{hotel.name}</strong>
            <br />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
  