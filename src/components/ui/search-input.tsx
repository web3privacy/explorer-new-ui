"use client";

import { ArrowRightIcon, SearchIcon } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  autoScrollWithFrame,
  scrollToProjectsSection,
} from "@/lib/scroll-utils";
import { projectsSearchParams } from "@/types/projectFilters";
import { useQueryState } from "nuqs";

export default function SearchInput() {
  const [query, setQuery] = useQueryState(
    "q",
    projectsSearchParams.q.withOptions({ shallow: false })
  );
  const [searchValue, setSearchValue] = useState(query ?? "");

  useEffect(() => {
    setSearchValue(query ?? "");

    // Auto-scroll to results if user navigates with search params
    if (query && query.trim()) {
      // Wait for any potential layout shifts after navigation
      const timer = setTimeout(() => {
        scrollToProjectsSection();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [query]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Only proceed if there's actually a search value
    if (searchValue.trim()) {
      setQuery(searchValue.trim() || null);

      // Auto-scroll to projects section after search
      autoScrollWithFrame(() => scrollToProjectsSection());
    }
  };

  return (
    <div className="*:not-first:mt-2">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Input
            name="q"
            className="peer ps-9 pe-9 bg-background border-foreground font-dm-mono"
            placeholder="Search..."
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <SearchIcon size={16} />
          </div>
          <button
            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Submit search"
            type="submit"
          >
            <ArrowRightIcon size={16} aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
}
