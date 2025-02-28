"use client";

import { WeatherData, TemperatureUnit } from "@/types/weather";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import Image from "next/image";
import { Droplets, Wind } from "lucide-react";

interface CurrentWeatherProps {
  data: WeatherData | null;
  isLoading: boolean;
  temperatureUnit: TemperatureUnit;
}

export function CurrentWeather({
  data,
  isLoading,
  temperatureUnit,
}: CurrentWeatherProps) {
  if (isLoading) {
    return <CurrentWeatherSkeleton />;
  }

  if (!data) {
    return null;
  }

  const temperature =
    temperatureUnit === "celsius"
      ? `${data.temperature.celsius}°C`
      : `${data.temperature.fahrenheit}°F`;

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl">{data.city}</CardTitle>
            <p className="text-sm opacity-90">{data.country}</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{temperature}</div>
            <Badge
              variant="secondary"
              className="mt-1 bg-white/20 text-white border-none"
            >
              {data.condition}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {data.conditionIcon && (
              <div className="mr-2">
                <Image
                  src={data.conditionIcon}
                  alt={data.condition}
                  width={64}
                  height={64}
                  className="h-16 w-16"
                />
              </div>
            )}
            <div>
              <h3 className="font-medium">{data.condition}</h3>
              <p className="text-sm text-gray-500">
                {new Date(data.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center">
              <Droplets className="h-5 w-5 text-blue-500 mr-1" />
              <span>{data.humidity}%</span>
            </div>
            <div className="flex items-center">
              <Wind className="h-5 w-5 text-blue-500 mr-1" />
              <span>{data.windSpeed} m/s</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CurrentWeatherSkeleton() {
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-32 bg-white/20" />
            <Skeleton className="h-4 w-20 mt-2 bg-white/20" />
          </div>
          <div className="text-right">
            <Skeleton className="h-10 w-20 bg-white/20" />
            <Skeleton className="h-5 w-16 mt-2 bg-white/20" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="ml-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-32 mt-2" />
            </div>
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
