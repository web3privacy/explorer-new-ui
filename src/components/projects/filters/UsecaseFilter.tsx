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
import { useEffect, useState } from "react";

interface Usecase {
  id: string;
  name: string;
}

export default function UsecaseFilter() {
  const [selectedUsecase, setSelectedUsecase] = useQueryState(
    "usecases",
    projectsSearchParams.usecases.withOptions({ shallow: false })
  );
  const [options, setOptions] = useState<Usecase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/usecases")
      .then((res) => res.json())
      .then((data: { usecases: Usecase[] }) => {
        if (Array.isArray(data.usecases)) {
          setOptions(data.usecases);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="*:not-first:mt-2">
      <Select
        value={selectedUsecase?.[0] || ""}
        onValueChange={(value) => setSelectedUsecase(value ? [value] : [])}
        disabled={loading}
      >
        <SelectTrigger className="w-full !bg-background !border !border-foreground !text-primary-foreground hover:!bg-foreground hover:!text-background !rounded-none font-dm-mono">
          <SelectValue
            placeholder={loading ? "Loading..." : "Select use case"}
          />
        </SelectTrigger>
        <SelectContent className="!bg-background !border !border-foreground !text-primary-foreground !rounded-none font-dm-mono">
          {options.map((usecase) => (
            <SelectItem
              key={usecase.id}
              value={usecase.id}
              className="hover:!bg-foreground hover:!text-background focus:!bg-foreground focus:!text-background"
            >
              {usecase.name}
            </SelectItem>
          ))}
          {!loading && options.length === 0 && (
            <p className="text-center text-sm p-2 text-muted-foreground">
              No use cases found
            </p>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
