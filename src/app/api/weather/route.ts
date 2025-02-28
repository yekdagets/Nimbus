import { NextResponse } from "next/server";
import { fetchWeatherData, fetchForecastData } from "@/lib/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  if (!city) {
    return NextResponse.json(
      { error: "City parameter is required" },
      { status: 400 }
    );
  }

  try {
    const [weatherData, forecastData] = await Promise.all([
      fetchWeatherData(city),
      fetchForecastData(city),
    ]);

    return NextResponse.json({
      current: weatherData,
      forecast: forecastData,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch weather data",
      },
      { status: 500 }
    );
  }
}
