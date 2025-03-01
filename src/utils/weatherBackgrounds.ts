export type WeatherBackground = {
  gradient: string;
  textColor: string;
  iconColor: string;
};

const weatherBackgrounds: Record<string, WeatherBackground> = {
  // Even though iconColor and textColor are not currently used, I put them as 'placeholders' to fully reflect the feature. #yekta
  Clear: {
    gradient: "from-yellow-400 to-orange-500",
    textColor: "text-white",
    iconColor: "text-yellow-300",
  },
  Clouds: {
    gradient: "from-gray-300 to-gray-500",
    textColor: "text-white",
    iconColor: "text-gray-600",
  },
  Rain: {
    gradient: "from-blue-700 to-blue-900",
    textColor: "text-white",
    iconColor: "text-blue-200",
  },
  Snow: {
    gradient: "from-blue-200 to-blue-400",
    textColor: "text-white",
    iconColor: "text-white",
  },
  Mist: {
    gradient: "from-gray-400 to-gray-600",
    textColor: "text-white",
    iconColor: "text-gray-200",
  },
  Fog: {
    gradient: "from-gray-400 to-gray-600",
    textColor: "text-white",
    iconColor: "text-gray-200",
  },
  Thunderstorm: {
    gradient: "from-gray-700 to-gray-900",
    textColor: "text-white",
    iconColor: "text-yellow-400",
  },
  default: {
    gradient: "from-blue-500 to-blue-700",
    textColor: "text-white",
    iconColor: "text-blue-200",
  },
};

/**
 * @param condition
 */
export function getWeatherBackground(condition: string): WeatherBackground {
  for (const key of Object.keys(weatherBackgrounds)) {
    if (condition.includes(key)) {
      return weatherBackgrounds[key];
    }
  }

  return weatherBackgrounds.default;
}
