"use client";

import MultipleSelector, { Option } from "@/components/ui/multiselect";

interface ChipMultiSelectOption {
  id: string;
  name: string;
}

interface ChipMultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: ChipMultiSelectOption[];
  placeholder?: string;
  creatable?: boolean;
}

export function ChipMultiSelect({
  value,
  onChange,
  options,
  placeholder,
  creatable,
}: ChipMultiSelectProps) {
  const toOption = (id: string): Option => {
    const match = options.find((o) => o.id === id);
    return { value: id, label: match?.name ?? id };
  };

  return (
    <MultipleSelector
      value={value.map(toOption)}
      defaultOptions={options.map((o) => ({ value: o.id, label: o.name }))}
      onChange={(selected) => onChange(selected.map((o) => o.value))}
      placeholder={placeholder}
      creatable={creatable}
      emptyIndicator={
        <p className="text-center text-sm text-muted-foreground">
          No results found
        </p>
      }
    />
  );
}
