import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  setCurrentWeather,
  setForecast,
  setIsLoading,
  setError,
  addToSearchHistory,
} from "@/store/redux/weatherSlice";
import { WeatherData, ForecastData } from "@/types/weather";
import { useEffect } from "react";

interface WeatherResponse {
  current: WeatherData;
  forecast: ForecastData;
}

async function fetchWeatherData(city: string): Promise<WeatherResponse> {
  const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch weather data");
  }
  return response.json();
}

export function useWeatherData(city: string | null) {
  const dispatch = useDispatch();

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeatherData(city!),
    enabled: !!city,
    staleTime: 0,
    gcTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data) {
      dispatch(setCurrentWeather(data.current));
      dispatch(setForecast(data.forecast));
      if (city) {
        dispatch(addToSearchHistory(city));
      }
    }

    if (isError && error instanceof Error) {
      dispatch(setError(error.message));
    }

    dispatch(setIsLoading(isLoading || isFetching));

    return () => {
      if (!city) {
        dispatch(setIsLoading(false));
      }
    };
  }, [data, isLoading, isFetching, isError, error, dispatch, city]);

  return {
    weatherData: data?.current || null,
    forecastData: data?.forecast || null,
    isLoading: isLoading || isFetching,
    error: error instanceof Error ? error : null,
    refetch,
  };
}
