import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface ToggleFieldProps {
  label: string;
  hint?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function ToggleField({
  label,
  hint,
  checked,
  onCheckedChange,
}: ToggleFieldProps) {
  return (
    <div className="grid items-center gap-2 lg:grid-cols-2 lg:gap-8">
      <div className="flex items-center gap-3">
        <Switch checked={checked} onCheckedChange={onCheckedChange} />
        <span
          className={cn(
            "font-dm-mono text-sm text-foreground",
            !checked && "opacity-50"
          )}
        >
          {label}
        </span>
      </div>
      {hint && (
        <p className="font-dm-mono text-muted-foreground text-sm italic">
          {hint}
        </p>
      )}
    </div>
  );
}
