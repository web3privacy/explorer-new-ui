"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProjectFormFooterProps {
  onCancel: () => void;
  onPublish: () => void;
  isPublishing: boolean;
  prUrl?: string;
  errorMessage?: string;
  publishLabel?: string;
  publishingLabel?: string;
}

export function ProjectFormFooter({
  onCancel,
  onPublish,
  isPublishing,
  prUrl,
  errorMessage,
  publishLabel = "PUBLISH",
  publishingLabel = "PUBLISHING...",
}: ProjectFormFooterProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-border bg-background">
      {prUrl && (
        <p className="px-3 pt-3 text-center font-dm-mono text-xs text-muted-foreground lg:text-right">
          Pull request created —{" "}
          <a
            href={prUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            View it on GitHub
          </a>
        </p>
      )}
      {errorMessage && (
        <p className="px-3 pt-3 text-center font-dm-mono text-xs text-destructive lg:text-right">
          {errorMessage}
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
          {isPublishing ? publishingLabel : publishLabel}
        </Button>
      </div>
    </div>
  );
}
