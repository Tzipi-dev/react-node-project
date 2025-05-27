import { useEffect, useState } from "react";
import { useGetAllLostsQuery } from "../redux/api/losts/apiLostSlice";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Lost } from "../interfaces/models";
import 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
const customIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // לדוג' סיכת מיקום
  iconSize: [32, 32], // גודל האייקון
  iconAnchor: [16, 32], // נקודת העיגון (כדי שייראה מונח על הקרקע)
  popupAnchor: [0, -32], // מיקום הפופאפ ביחס לאייקון
});

const LostsMap = () => {
    const { data: items } = useGetAllLostsQuery();
    const [itemsWithCoords, setItemsWithCoords] = useState<Array<Lost & { lat: number; lng: number }>>([]);
    useEffect(() => {
        const loadCoords = async () => {
            if (!items) return;
            const updatedItems = await Promise.all(
                items.map(async (item) => {
                    const lat = await returnLat(item.city);
                    const lng = await returnLon(item.city);
                    if (lat !== null && lng !== null) {
                        return { ...item, lat, lng };
                    }
                    return null;
                })
            );
            setItemsWithCoords(updatedItems.filter((item): item is Lost & { lat: number; lng: number } => item !== null));
        };
        loadCoords();
    }, [items]);
    const returnLat = async (cityName: string): Promise<number | null> => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}`
            );
            const data = await response.json();
            if (!data.length) return null;  // אין תוצאות
            const latStr = data[0]?.lat;
            if (!latStr) return null; // אין ערך lat
            const lat = parseFloat(latStr);
            if (isNaN(lat)) return null; // לא מספר תקין
            return lat;

        } catch (error) {
            console.error("Error fetching lat:", error);
            return null;
        }
    };
    const returnLon = async (cityName: string): Promise<number | null> => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}`
            );
            const data = await response.json();
            if (!data.length) return null; // אין תוצאות
            const lonStr = data[0]?.lon;
            if (!lonStr) return null; // אין ערך lon
            const lon = parseFloat(lonStr);
            if (isNaN(lon)) return null; // לא מספר תקין
            return lon;
        } catch (error) {
            console.error("Error fetching lon:", error);
            return null;
        }
    };
    return (
        <MapContainer center={[32.08, 34.78]} zoom={13} style={{ height: "500px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap"
            />
            {itemsWithCoords.map((item) => (
                <Marker key={item._id} position={[item.lat, item.lng]} icon={customIcon}>
                    <Popup>
                        <strong>{item.category}</strong><br/>
                        {item.name}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default LostsMap;
