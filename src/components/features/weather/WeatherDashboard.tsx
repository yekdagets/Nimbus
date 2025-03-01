"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/redux/store";
import {
  toggleTemperatureUnit,
  addToSearchHistory,
  setRefreshCity,
} from "@/store/redux/weatherSlice";
import { useWeatherData } from "@/hooks/useWeather";
import { SearchBar } from "./SearchBar";
import { SearchHistory } from "./SearchHistory";
import { CurrentWeather } from "./CurrentWeather";
import { ForecastWeather } from "./ForecastWeather";
import { TemperatureUnitToggle } from "./TemperatureUnitToggle";
import { PopularCities } from "./PopularCities";
import { Button } from "@/components/ui/Button";
import { Home as HomeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatCityName } from "@/utils/helpers";

interface WeatherDashboardProps {
  initialSearchCity?: string | null;
  initialWeatherData?: any;
  initialForecastData?: any;
}

export function WeatherDashboard({
  initialSearchCity = null,
  initialWeatherData = null,
  initialForecastData = null,
}: WeatherDashboardProps) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { searchHistory, temperatureUnit } = useSelector(
    (state: RootState) => state.weather
  );

  const initialData =
    initialWeatherData && initialForecastData
      ? { current: initialWeatherData, forecast: initialForecastData }
      : null;

  const { weatherData, forecastData, isLoading, error, refetch } =
    useWeatherData(initialSearchCity, initialData);

  const handleSearch = (city: string, force: boolean = false) => {
    const formattedCity = formatCityName(city);

    dispatch(addToSearchHistory(formattedCity));

    if (formattedCity === initialSearchCity) {
      refetch();
    } else {
      if (force) {
        dispatch(setRefreshCity(formattedCity));
      }

      router.push(`/weather/${formattedCity}`);
    }
  };

  const handleGoHome = () => {
    router.push("/");
  };

  const handleToggleUnit = () => {
    dispatch(toggleTemperatureUnit());
  };

  const showPopularCities = !initialSearchCity && !weatherData;

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
            currentCity={initialSearchCity}
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

      {weatherData ? (
        <>
          <div className="mb-4">
            <Button
              variant="ghost"
              onClick={handleGoHome}
              className="flex items-center gap-2"
            >
              <HomeIcon className="h-4 w-4" />
              Back to Home
            </Button>
          </div>

          <div className="space-y-6">
            <CurrentWeather
              data={weatherData}
              isLoading={isLoading}
              temperatureUnit={temperatureUnit}
            />

            <ForecastWeather
              data={forecastData}
              isLoading={isLoading}
              temperatureUnit={temperatureUnit}
            />
          </div>
        </>
      ) : (
        showPopularCities &&
        !isLoading && <PopularCities onSelectCity={handleSearch} />
      )}
    </div>
  );
}
