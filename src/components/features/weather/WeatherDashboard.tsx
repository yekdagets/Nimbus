"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/redux/store";
import { toggleTemperatureUnit } from "@/store/redux/weatherSlice";
import { useWeatherData } from "@/hooks/useWeather";
import { SearchBar } from "./SearchBar";
import { SearchHistory } from "./SearchHistory";
import { CurrentWeather } from "./CurrentWeather";
import { ForecastWeather } from "./ForecastWeather";
import { TemperatureUnitToggle } from "./TemperatureUnitToggle";

export function WeatherDashboard() {
  const [searchCity, setSearchCity] = useState<string | null>(null);
  const dispatch = useDispatch();

  const { searchHistory, temperatureUnit } = useSelector(
    (state: RootState) => state.weather
  );

  const { weatherData, forecastData, refetch, isLoading, error } =
    useWeatherData(searchCity);

  const handleSearch = (city: string, force: boolean = false) => {
    if (force && city === searchCity) {
      refetch();
    } else {
      setSearchCity(city);
    }
  };

  const handleToggleUnit = () => {
    dispatch(toggleTemperatureUnit());
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">Nimbus</h1>
        <p className="text-gray-600 mb-6">
          Check the weather forecast for any city
        </p>

        <div className="w-full max-w-md">
          <SearchBar
            onSearch={(city) => handleSearch(city)}
            isLoading={isLoading}
          />
          <SearchHistory
            history={searchHistory}
            onSelect={(city) => handleSearch(city, true)}
            isLoading={isLoading}
          />
        </div>

        <div className="flex justify-end w-full max-w-4xl mt-4">
          <TemperatureUnitToggle
            unit={temperatureUnit}
            onToggle={handleToggleUnit}
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error instanceof Error ? error.message : "An error occurred"}
        </div>
      )}

      {(weatherData || isLoading) && (
        <div className="space-y-6">
          <CurrentWeather
            data={weatherData || null}
            isLoading={isLoading}
            temperatureUnit={temperatureUnit}
          />

          <ForecastWeather
            data={forecastData || null}
            isLoading={isLoading}
            temperatureUnit={temperatureUnit}
          />
        </div>
      )}
    </div>
  );
}
