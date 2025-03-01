import { WeatherDashboard } from "@/components/features/weather/WeatherDashboard";
import { fetchWeatherData } from "@/lib/api";
import { POPULAR_CITIES } from "@/utils/constants";
import { formatCityName } from "@/utils/helpers";

export async function generateStaticParams() {
  return POPULAR_CITIES.map((city) => ({
    city: formatCityName(city),
  }));
}

export const revalidate = 3600;

export default async function WeatherPage({
  params,
}: {
  params: { city: string };
}) {
  try {
    const city = params.city;
    const formattedCity = formatCityName(city);
    const weatherData = await fetchWeatherData(formattedCity);

    return (
      <WeatherDashboard
        initialSearchCity={formattedCity}
        initialWeatherData={weatherData.current}
        initialForecastData={weatherData.forecast}
      />
    );
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return <div>Error loading weather data. Please try again.</div>;
  }
}
