import { processWeatherData, processForecastData } from "@/utils/helpers";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function fetchWeatherData(city: string) {
  try {
    const weatherResponse = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!weatherResponse.ok) {
      const error = await weatherResponse.json();
      throw new Error(error.message || "Failed to fetch weather data");
    }

    const weatherData = await weatherResponse.json();

    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!forecastResponse.ok) {
      const error = await forecastResponse.json();
      throw new Error(error.message || "Failed to fetch forecast data");
    }

    const forecastData = await forecastResponse.json();

    return {
      current: processWeatherData(weatherData),
      forecast: processForecastData(forecastData),
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}
