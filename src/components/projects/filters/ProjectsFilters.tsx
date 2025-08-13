"use client";

import { Button } from "@/components/ui/button";
import SearchInput from "@/components/ui/search-input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";
import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import EcosystemFilter from "./EcosystemFilter";
import UsecaseFilter from "./UsecaseFilter";

interface ProjectsFiltersProps {
  className?: string;
}

const ProjectsFilters: React.FC<ProjectsFiltersProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("relative w-full", className)}>
      {/* Mobile: Collapsible filter panel */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="space-y-4 mt-6">
              <div>
                <label className="text-sm font-medium mb-2 block font-dm-mono">
                  Search
                </label>
                <SearchInput />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block font-dm-mono">
                  Ecosystem
                </label>
                <EcosystemFilter />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block font-dm-mono">
                  Category
                </label>
                <CategoryFilter />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block font-dm-mono">
                  Use Case
                </label>
                <UsecaseFilter />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: Horizontal layout */}
      <div className="hidden md:block">
        <div className="flex items-center gap-2 py-2">
          <div className="w-[250px] flex-shrink-0">
            <SearchInput />
          </div>
          <EcosystemFilter />
          <CategoryFilter />
          <UsecaseFilter />
        </div>
      </div>
    </div>
  );
};

export default ProjectsFilters;
