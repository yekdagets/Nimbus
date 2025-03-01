export interface WeatherData {
  city: string;
  country: string;
  temperature: {
    celsius: number;
    fahrenheit: number;
  };
  condition: string;
  conditionIcon: string;
  humidity: number;
  windSpeed: number;
  timestamp: number;
}

export interface ForecastDay {
  date: string;
  temperature: {
    celsius: {
      min: number;
      max: number;
    };
    fahrenheit: {
      min: number;
      max: number;
    };
  };
  condition: string;
  conditionIcon: string;
}

export interface ForecastData {
  city: string;
  country: string;
  days: ForecastDay[];
}

export type TemperatureUnit = "celsius" | "fahrenheit";

export interface WeatherError {
  message: string;
}

export interface OpenWeatherForecastItem {
  dt: number;
  main: {
    temp_min: number;
    temp_max: number;
  };
  weather: Array<{
    main: string;
    icon: string;
  }>;
}

export interface OpenWeatherCurrentResponse {
  name: string;
  sys: { country: string };
  main: { temp: number; humidity: number; temp_min: number; temp_max: number };
  weather: Array<{ main: string; icon: string }>;
  wind: { speed: number };
}

export interface OpenWeatherForecastResponse {
  city: { name: string; country: string };
  list: OpenWeatherForecastItem[];
}
