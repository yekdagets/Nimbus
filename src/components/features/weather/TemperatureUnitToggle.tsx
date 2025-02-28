"use client";

import { Toggle } from "@/components/ui/Toggle";
import { TemperatureUnit } from "@/types/weather";

interface TemperatureUnitToggleProps {
  unit: TemperatureUnit;
  onToggle: () => void;
}

export function TemperatureUnitToggle({
  unit,
  onToggle,
}: TemperatureUnitToggleProps) {
  return (
    <Toggle
      checked={unit === "fahrenheit"}
      onToggle={onToggle}
      leftLabel="°C"
      rightLabel="°F"
      className="mt-2"
    />
  );
}
