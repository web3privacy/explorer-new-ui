"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { projectsSearchParams } from "@/types/projectFilters";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
  icon?: string;
}

export default function CategoryFilter() {
  const [selectedCategory, setSelectedCategory] = useQueryState(
    "categories",
    projectsSearchParams.categories.withOptions({ shallow: false })
  );
  const [options, setOptions] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data: { categories: Category[] }) => {
        if (Array.isArray(data.categories)) {
          setOptions(data.categories);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="*:not-first:mt-2">
      <Select
        value={selectedCategory?.[0] || ""}
        onValueChange={(value) => setSelectedCategory(value ? [value] : [])}
        disabled={loading}
      >
        <SelectTrigger className="w-full !bg-foreground !text-background !border-foreground !rounded-none font-dm-mono hover:!bg-background hover:!border-foreground hover:!text-primary-foreground">
          <SelectValue
            placeholder={loading ? "Loading..." : "Select category"}
          />
        </SelectTrigger>
        <SelectContent className="!bg-background !border !border-foreground !text-primary-foreground !rounded-none font-dm-mono">
          {options.map((cat) => (
            <SelectItem
              key={cat.id}
              value={cat.id}
              className="hover:!bg-foreground hover:!text-background focus:!bg-foreground focus:!text-background"
            >
              <span className="flex items-center gap-2">
                <Avatar className="size-4">
                  <AvatarImage src={cat.icon} alt={`${cat.name} icon`} />
                  <AvatarFallback>{cat.name[0]}</AvatarFallback>
                </Avatar>
                {cat.name}
              </span>
            </SelectItem>
          ))}
          {!loading && options.length === 0 && (
            <p className="text-center text-sm p-2 text-muted-foreground">
              No categories found
            </p>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
