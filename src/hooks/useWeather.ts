import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentWeather,
  setForecast,
  setError,
  setIsLoading,
  setRefreshCity,
} from "@/store/redux/weatherSlice";
import { WeatherData, ForecastData } from "@/types/weather";
import { formatCityName } from "@/utils/helpers";
import { RootState } from "@/store/redux/store";
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

export function useWeatherData(
  city: string | null,
  initialData: { current: WeatherData; forecast: ForecastData } | null = null
) {
  const dispatch = useDispatch();
  const refreshCity = useSelector(
    (state: RootState) => state.weather.refreshCity
  );

  const [initialDataState] = useState(initialData);
  const forceRefresh = city && refreshCity === city;

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey: ["weather", city ? formatCityName(city) : null],
    queryFn: () => fetchWeatherData(city!),
    enabled: !!city && (forceRefresh || !initialDataState),
    gcTime: 1000 * 60 * 10,
    initialData: initialDataState,
  });

  useEffect(() => {
    if (forceRefresh) {
      dispatch(setRefreshCity(null));
    }
  }, [forceRefresh, dispatch]);

  useEffect(() => {
    if (data) {
      dispatch(setCurrentWeather(data.current));
      dispatch(setForecast(data.forecast));
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
