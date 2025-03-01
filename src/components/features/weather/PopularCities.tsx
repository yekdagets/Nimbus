"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MapPin, Navigation, Compass } from "lucide-react";
import { useState, useEffect } from "react";
import { POPULAR_CITIES } from "@/utils/constants";

interface PopularCitiesProps {
  onSelectCity: (city: string) => void;
}

export function PopularCities({ onSelectCity }: PopularCitiesProps) {
  const [isLocating, setIsLocating] = useState(false);
  const [userCity, setUserCity] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    handleUseLocation(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUseLocation = (autoRedirect: boolean = true) => {
    setIsLocating(true);
    setLocationError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;

            const response = await fetch(
              `/api/geocode?lat=${latitude}&lon=${longitude}`
            );

            if (!response.ok) {
              throw new Error("Failed to get city from coordinates");
            }

            const data = await response.json();
            if (data.city) {
              if (autoRedirect) {
                onSelectCity(data.city);
              } else {
                setUserCity(data.city);
              }
            } else {
              throw new Error("No city found for your location");
            }
          } catch (error) {
            console.error("Error getting city from coordinates:", error);
            setLocationError(
              "Could not determine your city. Please select one from the list."
            );
          } finally {
            setTimeout(() => {
              setIsLocating(false);
            }, 1000);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocationError(
            "Could not get your location. Please select a city from the list."
          );
          setTimeout(() => {
            setIsLocating(false);
          }, 1000);
        },
        { timeout: 10000 }
      );
    } else {
      setLocationError(
        "Geolocation is not supported by your browser. Please select a city from the list."
      );
      setTimeout(() => {
        setIsLocating(false);
      }, 1000);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="relative pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-blue-500" />
            Select a City
          </CardTitle>

          <div className="flex gap-2">
            {userCity && !isLocating && (
              <Button
                onClick={() => onSelectCity(userCity)}
                className="flex items-center justify-center gap-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 animate-pulse"
                size="sm"
              >
                <MapPin className="h-3 w-3" />
                {userCity}
              </Button>
            )}

            <Button
              onClick={() => handleUseLocation(true)}
              disabled={isLocating}
              variant="outline"
              size="sm"
              className="flex items-center justify-center gap-1 border-blue-300 hover:bg-blue-50"
            >
              <Navigation className="h-3 w-3 text-blue-500" />
              {isLocating ? "Locating..." : "Use location"}
            </Button>
          </div>
        </div>

        {locationError && (
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800 text-xs">
            {locationError}
          </div>
        )}
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {POPULAR_CITIES.map((city) => (
            <Button
              key={city}
              variant="outline"
              onClick={() => onSelectCity(city)}
              className="w-full hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200"
              disabled={isLocating}
            >
              {city}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
