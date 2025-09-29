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

interface Ecosystem {
  id: string;
  name: string;
  icon?: string;
}

export default function EcosystemFilter() {
  const [selectedEcosystem, setSelectedEcosystem] = useQueryState(
    "ecosystems",
    projectsSearchParams.ecosystems.withOptions({ shallow: false })
  );
  const [options, setOptions] = useState<Ecosystem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/ecosystems")
      .then((res) => res.json())
      .then((data: { ecosystems: Ecosystem[] }) => {
        if (Array.isArray(data.ecosystems)) {
          setOptions(data.ecosystems);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="*:not-first:mt-2">
      <Select
        value={selectedEcosystem?.[0] || ""}
        onValueChange={(value) => setSelectedEcosystem(value ? [value] : [])}
        disabled={loading}
      >
        <SelectTrigger className="w-full !bg-foreground !text-background !border-foreground !rounded-none font-dm-mono hover:!bg-background hover:!border-foreground hover:!text-primary-foreground">
          <SelectValue
            placeholder={loading ? "Loading..." : "Select ecosystem"}
          />
        </SelectTrigger>
        <SelectContent className="!bg-background !border !border-foreground !text-primary-foreground !rounded-none font-dm-mono">
          {options.map((eco) => (
            <SelectItem
              key={eco.id}
              value={eco.id}
              className="hover:!bg-foreground hover:!text-background focus:!bg-foreground focus:!text-background"
            >
              <span className="flex items-center gap-2">
                <Avatar className="size-4">
                  <AvatarImage src={eco.icon} alt={`${eco.name} icon`} />
                  <AvatarFallback>{eco.name[0]}</AvatarFallback>
                </Avatar>
                {eco.name}
              </span>
            </SelectItem>
          ))}
          {!loading && options.length === 0 && (
            <p className="text-center text-sm p-2 text-muted-foreground">
              No ecosystems found
            </p>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
