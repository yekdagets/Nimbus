import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeatherData, ForecastData, TemperatureUnit } from "@/types/weather";

interface WeatherState {
  currentWeather: WeatherData | null;
  forecast: ForecastData | null;
  searchHistory: string[];
  isLoading: boolean;
  error: string | null;
  temperatureUnit: TemperatureUnit;
}

const initialState: WeatherState = {
  currentWeather: null,
  forecast: null,
  searchHistory: [],
  isLoading: false,
  error: null,
  temperatureUnit: "celsius",
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
      const filteredHistory = state.searchHistory.filter(
        (item) => item.toLowerCase() !== city.toLowerCase()
      );

      state.searchHistory = [city, ...filteredHistory].slice(0, 5);

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "searchHistory",
          JSON.stringify(state.searchHistory)
        );
      }
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
  toggleTemperatureUnit,
} = weatherSlice.actions;

export default weatherSlice.reducer;
