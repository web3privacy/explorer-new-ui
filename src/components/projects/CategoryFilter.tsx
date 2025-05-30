"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { projectsSearchParams } from "@/types/projectFilters";
import { useQueryState } from "nuqs";

const categories = [
  { id: "all", name: "All" },
  { id: "infrastructure", name: "Infrastructure" },
  { id: "social-and-communications", name: "Social & Communications" },
  { id: "hardware", name: "Hardware" },
  { id: "applications", name: "Applications" },
  { id: "defi", name: "DeFi" },
];

export default function CategoryFilter() {
  const [selectedCategory, setSelectedCategory] = useQueryState(
    "categories",
    projectsSearchParams.categories.withOptions({ shallow: false })
  );

  return (
    <div className="*:not-first:mt-2">
      <Select
        value={selectedCategory?.[0] || ""}
        onValueChange={(value) =>
          setSelectedCategory(value === "all" ? [] : [value])
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
