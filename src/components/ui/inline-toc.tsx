import { cn } from "@/lib/utils";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { ChevronDown, LucideIcon } from "lucide-react";
import * as React from "react";

interface TableOfContentsProps
  extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root> {
  items: Array<{
    title: string;
    url: string;
    depth: number;
    icon: LucideIcon;
  }>;
  title?: string;
  defaultOpen?: boolean;
}

export function TableOfContents({
  items,
  title = "Table of Contents",
  className,
  defaultOpen = false,
  ...props
}: TableOfContentsProps) {
  return (
    <CollapsiblePrimitive.Root
      {...props}
      defaultOpen={defaultOpen}
      className={cn(
        "not-prose rounded-lg border bg-card text-card-foreground",
        className
      )}
    >
      <CollapsiblePrimitive.Trigger className="group flex w-full items-center justify-between px-4 py-2.5 font-medium">
        {title}
        <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </CollapsiblePrimitive.Trigger>
      <CollapsiblePrimitive.Content className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        <div className="flex flex-col p-4 pt-0 text-sm text-muted-foreground">
          {items.map(({ icon: Icon, url, depth, title }) => {
            return (
              <a
                key={url}
                href={url}
                className="flex items-center gap-2 border-l py-1.5 transition-colors hover:text-accent-foreground"
                style={{
                  paddingInlineStart: `${Math.max(depth - 1, 0) * 0.75}rem`,
                }}
              >
                {<Icon className="h-4 w-4" />}
                {title}
              </a>
            );
          })}
        </div>
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  );
}
