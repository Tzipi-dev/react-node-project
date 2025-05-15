import { useEffect, useRef, useState } from "react";
import { useGetAllFoundsQuery } from "../redux/api/founds/apiFoundSlice";

import KEY_API from '.././vite-env'

const containerStyle = {
  width: '100%',
  height: '600px',
};

const center = {
  lat: 31.0461,
  lng: 34.8516,
};

const getLatLngFromCity = async (cityName: string): Promise<{ lat: number; lng: number }> => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(cityName)}&key=${KEY_API}`
  );
  const data = await response.json();
  if (data.status === "OK") {
    return data.results[0].geometry.location;
  } else {
    throw new Error("לא נמצאו נתונים לעיר הזאת");
  }
};

type FoundWithCoords = {
  _id: string;
  city: string;
  position: { lat: number; lng: number };
};

// ✅ גרסה מבוססת Promise לטעינת הסקריפט
const loadGoogleMapsScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.google?.maps) {
      resolve();
      return;
    }

    const existingScript = document.getElementById("googleMaps");
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve());
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${KEY_API}&libraries=marker`;
    script.id = "googleMaps";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("שגיאה בטעינת Google Maps API"));
    document.body.appendChild(script);
  });
};

const FoundsMap = () => {
  const { data: AllFounds } = useGetAllFoundsQuery();
  const [foundWithCoords, setFoundWithCoords] = useState<FoundWithCoords[]>([]);
  const mapRef = useRef<google.maps.Map | null>(null);
  const mapDivRef = useRef<HTMLDivElement | null>(null);

  // שלב 1: טעינת קואורדינטות
  useEffect(() => {
    const loadCoords = async () => {
      if (!AllFounds) return;
      const results: FoundWithCoords[] = [];
      for (const found of AllFounds) {
        try {
          const position = await getLatLngFromCity(found.city);
          results.push({ ...found, _id: found._id!, position });
        } catch (error) {
          console.error("שגיאה בקבלת קואורדינטות לעיר:", found.city, error);
        }
      }
      setFoundWithCoords(results);
    };
    loadCoords();
  }, [AllFounds]);

  // שלב 2: טעינת הסקריפט ויצירת המפה עם AdvancedMarkerElement
  useEffect(() => {
    if (!mapDivRef.current || foundWithCoords.length === 0) return;

    const initMap = async () => {
      try {
        await loadGoogleMapsScript();
        // יצירת מפה אם עדיין לא קיימת
        if (!mapRef.current && mapDivRef.current) {
          mapRef.current = new window.google.maps.Map(mapDivRef.current, {
            center,
            zoom: 8,
          });
        }

        // ניקוי מרקרים קודמים אפשר להוסיף כאן אם רוצים

        // הוספת מרקרים
        foundWithCoords.forEach((found) => {
          new google.maps.Marker({
            position: found.position,
            map: mapRef.current!,
            title: found.city,
          });
        });

      } catch (error) {
        console.error("שגיאה בטעינת המפה:", error);
      }
    };

    initMap();
  }, [foundWithCoords]);

  return (
    <div
      ref={mapDivRef}
      style={{ width: containerStyle.width, height: containerStyle.height }}
    />
  );
};

export default FoundsMap;
