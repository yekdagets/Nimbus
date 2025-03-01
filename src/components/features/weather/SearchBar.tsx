"use client";

import { useState, FormEvent, useEffect, memo } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Search } from "lucide-react";

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
      setQuery(currentCity);
    }
  }, [currentCity]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
      <Input
        type="text"
        placeholder="Search for a city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1"
        disabled={isLoading}
        aria-label="Search for a city"
      />
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
