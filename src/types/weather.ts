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
