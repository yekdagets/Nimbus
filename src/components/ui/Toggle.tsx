import React from "react";
import { cn } from "@/utils/cn";

interface ToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  checked: boolean;
  onToggle: () => void;
  leftLabel?: string;
  rightLabel?: string;
}

export function Toggle({
  checked,
  onToggle,
  leftLabel,
  rightLabel,
  className,
  ...props
}: ToggleProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)} {...props}>
      {leftLabel && <span className="text-sm">{leftLabel}</span>}
      <button
        type="button"
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          checked ? "bg-blue-600" : "bg-gray-200"
        )}
        onClick={onToggle}
        aria-pressed={checked}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
            checked ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>
      {rightLabel && <span className="text-sm">{rightLabel}</span>}
    </div>
  );
}
