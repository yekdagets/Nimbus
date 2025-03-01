import {
  WeatherData,
  ForecastData,
  ForecastDay,
  OpenWeatherCurrentResponse,
  OpenWeatherForecastResponse,
  OpenWeatherForecastItem,
} from "@/types/weather";

export function processWeatherData(
  data: OpenWeatherCurrentResponse
): WeatherData {
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

export function processForecastData(
  data: OpenWeatherForecastResponse
): ForecastData {
  const dailyData: { [key: string]: ForecastDay } = {};

  data.list.forEach((item: OpenWeatherForecastItem) => {
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

function capitalizeFirstLetter(text: string): string {
  const firstLetter = text.charAt(0);

  const firstLetterCap = firstLetter.toUpperCase();

  const remainingLetters = text.slice(1);

  return firstLetterCap + remainingLetters;
}

function normalizeText(text: string): string {
  if (!text) return "";

  return text
    .toLowerCase()
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u");
}

export function formatCityName(city: string): string {
  return capitalizeFirstLetter(normalizeText(city));
}
