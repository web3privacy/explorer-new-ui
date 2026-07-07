"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { useProjectForm } from "./ProjectFormProvider";
import { TAB_LABELS, TAB_ORDER } from "./types";

export function ProjectFormTabNav() {
  const { activeTabIndex, setActiveTabIndex } = useProjectForm();

  return (
    <div className="border-b border-border">
      <div className="hidden gap-8 lg:flex">
        {TAB_ORDER.map((tabId, index) => {
          const active = index === activeTabIndex;
          return (
            <button
              key={tabId}
              type="button"
              onClick={() => setActiveTabIndex(index)}
              className={cn(
                "border-b-4 border-transparent pb-2 font-dm-mono leading-10 text-muted-foreground",
                active && "border-foreground font-bold text-foreground"
              )}
            >
              {TAB_LABELS[tabId]}
            </button>
          );
        })}
      </div>

      <div className="py-3 lg:hidden">
        <Select
          value={String(activeTabIndex)}
          onValueChange={(v) => setActiveTabIndex(Number(v))}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TAB_ORDER.map((tabId, index) => (
              <SelectItem key={tabId} value={String(index)}>
                {TAB_LABELS[tabId]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
