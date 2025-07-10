import { Link } from "@/components/ui/link";
import React from "react";

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  showDialog?: boolean; // Optional prop to show confirmation dialog
}

export function ExternalLink({
  href,
  children,
  className = "text-primary hover:underline",
  showDialog = true,
}: ExternalLinkProps) {
  return (
    <Link href={href} className={className} showExternalDialog={showDialog}>
      {children}
    </Link>
  );
}
