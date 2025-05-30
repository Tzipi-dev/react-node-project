import { useEffect, useState } from "react";
import { useGetAllFoundsQuery } from "../redux/api/founds/apiFoundSlice";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Found } from "../interfaces/models";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const customIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const FoundsMap = () => {
  const { data: items } = useGetAllFoundsQuery();
  const [itemsWithCoords, setItemsWithCoords] = useState<Array<Found & { lat: number; lng: number }>>([]);

  const getCoordinates = async (street: string | null, city: string): Promise<{ lat: number; lng: number } | null> => {
    try {
      const query = street ? `${street} ${city}` : city;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      if (!data.length) return null;

      const lat = parseFloat(data[0].lat);
      const lng = parseFloat(data[0].lon);
      if (isNaN(lat) || isNaN(lng)) return null;

      return { lat, lng };
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadCoords = async () => {
      if (!items) return;

      const updatedItems = await Promise.all(
        items.map(async (item) => {
          const coords = await getCoordinates(item.street || null, item.city);
          if (coords) {
            return { ...item, lat: coords.lat, lng: coords.lng };
          }
          return null;
        })
      );

      setItemsWithCoords(updatedItems.filter((item): item is Found & { lat: number; lng: number } => item !== null));
    };

    loadCoords();
  }, [items]);

  return (
    <MapContainer center={[32.08, 34.78]} zoom={13} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap"
      />
      {itemsWithCoords.map((item) => (
        <Marker key={item._id} position={[item.lat, item.lng]} icon={customIcon}>
          <Popup>
            <strong>{item.category}</strong><br />
            {item.name}<br />
            {item.street && <>{item.street}<br /></>}
            {item.city}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default FoundsMap;
