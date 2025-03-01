import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeatherData, ForecastData, TemperatureUnit } from "@/types/weather";
import { formatCityName } from "@/utils/helpers";

interface WeatherState {
  currentWeather: WeatherData | null;
  forecast: ForecastData | null;
  searchHistory: string[];
  isLoading: boolean;
  error: string | null;
  temperatureUnit: TemperatureUnit;
  refreshCity: string | null;
}

const initialState: WeatherState = {
  currentWeather: null,
  forecast: null,
  searchHistory: [],
  isLoading: false,
  error: null,
  temperatureUnit: "celsius",
  refreshCity: null,
};

if (typeof window !== "undefined") {
  const savedHistory = localStorage.getItem("searchHistory");
  const savedUnit = localStorage.getItem("temperatureUnit");

  if (savedHistory) {
    initialState.searchHistory = JSON.parse(savedHistory);
  }

  if (savedUnit && (savedUnit === "celsius" || savedUnit === "fahrenheit")) {
    initialState.temperatureUnit = savedUnit as TemperatureUnit;
  }
}

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCurrentWeather: (state, action: PayloadAction<WeatherData | null>) => {
      state.currentWeather = action.payload;
    },
    setForecast: (state, action: PayloadAction<ForecastData | null>) => {
      state.forecast = action.payload;
    },
    addToSearchHistory: (state, action: PayloadAction<string>) => {
      const city = action.payload;
      const formattedCity = formatCityName(city);

      const filteredHistory = state.searchHistory.filter(
        (item) => item !== formattedCity
      );

      state.searchHistory = [formattedCity, ...filteredHistory].slice(0, 5);

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "searchHistory",
          JSON.stringify(state.searchHistory)
        );
      }
    },
    setRefreshCity: (state, action: PayloadAction<string | null>) => {
      state.refreshCity = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    toggleTemperatureUnit: (state) => {
      state.temperatureUnit =
        state.temperatureUnit === "celsius" ? "fahrenheit" : "celsius";

      if (typeof window !== "undefined") {
        localStorage.setItem("temperatureUnit", state.temperatureUnit);
      }
    },
  },
});

export const {
  setCurrentWeather,
  setForecast,
  addToSearchHistory,
  setIsLoading,
  setError,
  setRefreshCity,
  toggleTemperatureUnit,
} = weatherSlice.actions;

export default weatherSlice.reducer;
