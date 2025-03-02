"use client";

import { useState, FormEvent, useEffect, memo } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Search, X } from "lucide-react"; // X ikonunu import ediyoruz

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading?: boolean;
  currentCity?: string | null;
}

export const SearchBar = memo(function SearchBar({
  onSearch,
  isLoading = false,
  currentCity = null,
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (currentCity === null) {
      setQuery("");
    } else if (currentCity) {
      setQuery(decodeURIComponent(currentCity));
    }
  }, [currentCity]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pr-10"
          disabled={isLoading}
          aria-label="Search for a city"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <Button type="submit" disabled={isLoading || !query.trim()}>
        {isLoading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <Search className="h-5 w-5" />
        )}
        <span className="ml-2 sr-only md:not-sr-only">Search</span>
      </Button>
    </form>
  );
});
