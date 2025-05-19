"use client";

import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import { projectsSearchParams } from "@/types/projectFilters";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";

interface Ecosystem {
  id: string;
  name: string;
  icon?: string;
}

interface ExtendedOption extends Option {
  icon?: string;
}

export default function EcosystemFilter() {
  const [selectedEcosystems, setSelectedEcosystems] = useQueryState(
    "ecosystems",
    projectsSearchParams.ecosystems.withOptions({ shallow: false })
  );
  const [options, setOptions] = useState<ExtendedOption[]>([]);
  const [loading, setLoading] = useState(true);

  const selectedOptions = options.filter((o) =>
    selectedEcosystems?.includes(o.value)
  );

  useEffect(() => {
    setLoading(true);

    fetch("/api/ecosystems")
      .then((res) => res.json())
      .then((data: { ecosystems: Ecosystem[] }) => {
        if (Array.isArray(data.ecosystems)) {
          setOptions(
            data.ecosystems.map((eco) => ({
              value: eco.id,
              label: eco.name,
              icon: eco.icon,
            }))
          );
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="*:not-first:mt-2">
      <Label>Ecosystems:</Label>
      <MultipleSelector
        value={selectedOptions}
        onChange={(newOptions) =>
          setSelectedEcosystems(newOptions.map((opt) => opt.value))
        }
        options={options}
        placeholder={loading ? "Loading..." : "Select ecosystems"}
        loadingIndicator={<p className="text-center text-sm">Loading...</p>}
        emptyIndicator={<p className="text-center text-sm">No results found</p>}
        onSearchSync={(input) => {
          return options.filter((o) =>
            o.label.toLowerCase().includes(input.toLowerCase())
          );
        }}
        commandProps={{
          label: "Select ecosystems",
        }}
      />
    </div>
  );
}
