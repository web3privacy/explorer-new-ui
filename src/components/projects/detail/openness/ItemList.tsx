import React from "react";
import { ExternalLink } from "./ExternalLink";

interface ItemWithLink {
  name?: string;
  link?: string;
}

interface ItemListProps {
  items: ItemWithLink[];
  emptyMessage?: string;
}

export function ItemList({
  items,
  emptyMessage = "Not available",
}: ItemListProps) {
  if (items.length === 0) {
    return <p className="text-muted-foreground">{emptyMessage}</p>;
  }

  return (
    <div className="flex flex-wrap gap-1">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ExternalLink href={item.link || ""}>
            {item.name || "Unknown"}
          </ExternalLink>
          {index < items.length - 1 && (
            <span className="text-muted-foreground">•</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
