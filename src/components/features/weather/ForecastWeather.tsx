"use client";

import { ForecastData, TemperatureUnit } from "@/types/weather";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import Image from "next/image";

interface ForecastWeatherProps {
  data: ForecastData | null;
  isLoading: boolean;
  temperatureUnit: TemperatureUnit;
}

export function ForecastWeather({
  data,
  isLoading,
  temperatureUnit,
}: ForecastWeatherProps) {
  if (isLoading) {
    return <ForecastWeatherSkeleton />;
  }

  if (!data || data.days.length === 0) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {data.days.map((day) => {
            const minTemp =
              temperatureUnit === "celsius"
                ? `${day.temperature.celsius.min}°C`
                : `${day.temperature.fahrenheit.min}°F`;

            const maxTemp =
              temperatureUnit === "celsius"
                ? `${day.temperature.celsius.max}°C`
                : `${day.temperature.fahrenheit.max}°F`;

            const date = new Date(day.date);
            const dayName = new Intl.DateTimeFormat("en-US", {
              weekday: "long",
            }).format(date);
            const formattedDate = new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
            }).format(date);

            return (
              <div
                key={day.date}
                className="flex flex-col items-center p-3 rounded-lg border border-gray-100 bg-white shadow-sm"
              >
                <div className="font-medium">{dayName}</div>
                <div className="text-sm text-gray-500">{formattedDate}</div>

                {day.conditionIcon && (
                  <Image
                    src={day.conditionIcon}
                    alt={day.condition}
                    width={50}
                    height={50}
                    className="my-2"
                  />
                )}

                <div className="text-sm font-medium">{day.condition}</div>

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-blue-600">{minTemp}</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-red-500">{maxTemp}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function ForecastWeatherSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center p-3 rounded-lg border border-gray-100"
            >
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 w-16 mt-1" />
              <Skeleton className="h-12 w-12 rounded-full my-2" />
              <Skeleton className="h-4 w-24 mt-1" />
              <Skeleton className="h-5 w-20 mt-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
