import { WeatherDashboard } from "@/components/features/weather/WeatherDashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <WeatherDashboard showPopularCities={true} />
    </main>
  );
}
