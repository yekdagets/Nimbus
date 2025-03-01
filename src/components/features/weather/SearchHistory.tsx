"use client";

import { memo, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Clock } from "lucide-react";

interface SearchHistoryProps {
  history: string[];
  onSelect: (city: string) => void;
  isLoading?: boolean;
}

export const SearchHistory = memo(function SearchHistory({
  history,
  onSelect,
  isLoading = false,
}: SearchHistoryProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <Clock className="h-4 w-4" />
        <span>Recent searches</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.map((city) => (
          <Button
            key={city}
            variant="outline"
            size="sm"
            onClick={() => onSelect(city)}
            disabled={isLoading}
          >
            {city}
          </Button>
        ))}
      </div>
    </div>
  );
});
