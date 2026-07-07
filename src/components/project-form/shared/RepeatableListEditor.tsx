"use client";

import { X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";

interface RepeatableListEditorProps<T> {
  items: T[];
  emptyItem: T;
  renderSavedRow: (item: T) => { label: string; desc?: string };
  renderAddForm: (
    newItem: T,
    setNewItem: (item: T) => void
  ) => React.ReactNode;
  onAdd: (item: T) => void;
  onRemove: (index: number) => void;
  addButtonLabel: string;
  isRowValid?: (item: T) => boolean;
}

export function RepeatableListEditor<T>({
  items,
  emptyItem,
  renderSavedRow,
  renderAddForm,
  onAdd,
  onRemove,
  addButtonLabel,
  isRowValid,
}: RepeatableListEditorProps<T>) {
  const [newItem, setNewItem] = React.useState<T>(emptyItem);

  const canAdd = isRowValid ? isRowValid(newItem) : true;

  const handleAdd = () => {
    if (!canAdd) return;
    onAdd(newItem);
    setNewItem(emptyItem);
  };

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => {
        const { label, desc } = renderSavedRow(item);
        return (
          <div
            key={index}
            className="flex items-center justify-between gap-4 bg-foreground px-4 py-3 text-background"
          >
            <span className="font-dm-mono text-sm font-bold">{label}</span>
            <div className="flex items-center gap-4">
              {desc && (
                <span className="hidden font-dm-mono text-sm text-background/50 lg:block">
                  {desc}
                </span>
              )}
              <button
                type="button"
                onClick={() => onRemove(index)}
                aria-label="Remove"
              >
                <X className="size-3 text-background" />
              </button>
            </div>
          </div>
        );
      })}

      <div className="flex w-full flex-col gap-4 border-2 border-foreground p-6">
        {renderAddForm(newItem, setNewItem)}
        <Button
          type="button"
          variant="secondary"
          className="mt-2 w-fit"
          disabled={!canAdd}
          onClick={handleAdd}
        >
          {addButtonLabel}
        </Button>
      </div>
    </div>
  );
}
