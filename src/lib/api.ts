import { WeatherData, ForecastData, ForecastDay } from "@/types/weather";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function fetchWeatherData(city: string): Promise<WeatherData> {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch weather data");
  }

  const data = await response.json();

  return {
    city: data.name,
    country: data.sys.country,
    temperature: {
      celsius: Math.round(data.main.temp),
      fahrenheit: Math.round((data.main.temp * 9) / 5 + 32),
    },
    condition: data.weather[0].main,
    conditionIcon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    timestamp: Date.now(),
  };
}

export async function fetchForecastData(city: string): Promise<ForecastData> {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch forecast data");
  }

  const data = await response.json();

  const dailyData: { [key: string]: ForecastDay } = {};

  data.list.forEach((item: any) => {
    const date = new Date(item.dt * 1000).toISOString().split("T")[0];

    if (!dailyData[date]) {
      dailyData[date] = {
        date,
        temperature: {
          celsius: {
            min: Math.round(item.main.temp_min),
            max: Math.round(item.main.temp_max),
          },
          fahrenheit: {
            min: Math.round((item.main.temp_min * 9) / 5 + 32),
            max: Math.round((item.main.temp_max * 9) / 5 + 32),
          },
        },
        condition: item.weather[0].main,
        conditionIcon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
      };
    } else {
      if (item.main.temp_min < dailyData[date].temperature.celsius.min) {
        dailyData[date].temperature.celsius.min = Math.round(
          item.main.temp_min
        );
        dailyData[date].temperature.fahrenheit.min = Math.round(
          (item.main.temp_min * 9) / 5 + 32
        );
      }

      if (item.main.temp_max > dailyData[date].temperature.celsius.max) {
        dailyData[date].temperature.celsius.max = Math.round(
          item.main.temp_max
        );
        dailyData[date].temperature.fahrenheit.max = Math.round(
          (item.main.temp_max * 9) / 5 + 32
        );
      }
    }
  });

  const days = Object.values(dailyData).slice(0, 5);

  return {
    city: data.city.name,
    country: data.city.country,
    days,
  };
}
