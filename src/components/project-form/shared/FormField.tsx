import * as React from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  required,
  hint,
  error,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("grid gap-2 lg:grid-cols-2 lg:gap-8", className)}>
      <div className="flex flex-col gap-2">
        <Label className="font-dm-mono text-foreground">
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
        {children}
        {error && <span className="text-destructive text-xs">{error}</span>}
      </div>
      {hint && (
        <p className="font-dm-mono text-muted-foreground text-sm italic">
          {hint}
        </p>
      )}
    </div>
  );
}
