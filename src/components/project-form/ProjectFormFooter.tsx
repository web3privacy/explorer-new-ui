"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProjectFormFooterProps {
  onCancel: () => void;
  onPublish: () => void;
  isPublishing: boolean;
  submitState?: "success" | "error";
}

export function ProjectFormFooter({
  onCancel,
  onPublish,
  isPublishing,
  submitState,
}: ProjectFormFooterProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-border bg-background">
      {submitState === "success" && (
        <p className="px-3 pt-3 text-center font-dm-mono text-xs text-muted-foreground lg:text-right">
          Draft assembled — publish flow not yet implemented, see console.
        </p>
      )}
      <div
        className={cn(
          "flex flex-col items-center gap-3 p-3 lg:flex-row lg:justify-end"
        )}
      >
        <Button
          type="button"
          variant="default"
          className="w-full lg:w-fit"
          onClick={onCancel}
        >
          CANCEL
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="w-full lg:w-fit"
          disabled={isPublishing}
          onClick={onPublish}
        >
          {isPublishing ? "PUBLISHING..." : "PUBLISH"}
        </Button>
      </div>
    </div>
  );
}
