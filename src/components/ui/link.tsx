"use client";

import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

export interface LinkProps extends React.ComponentPropsWithoutRef<"a"> {
  asChild?: boolean;
  showExternalDialog?: boolean; // New prop to control confirmation dialog
}

// Helper function to detect external links
const isExternalLink = (href?: string): boolean => {
  if (!href) return false;

  // Check for absolute URLs (http://, https://, //, mailto:, tel:, etc.)
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//") ||
    href.includes("://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
};

const Link = React.forwardRef<React.ElementRef<"a">, LinkProps>(
  (
    {
      className,
      asChild = false,
      href,
      target,
      rel,
      showExternalDialog = true,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "a";
    const [dialogOpen, setDialogOpen] = React.useState(false);

    // Automatically detect external links and set target="_blank"
    const isExternal = isExternalLink(href);
    const finalTarget =
      target !== undefined ? target : isExternal ? "_blank" : undefined;

    // Automatically add security attributes for external links
    const securityProps =
      finalTarget === "_blank"
        ? {
            target: "_blank",
            rel: rel || "noopener noreferrer",
          }
        : {
            target: finalTarget,
            rel,
          };

    // Handle click for external links with dialog confirmation
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isExternal && showExternalDialog && href) {
        e.preventDefault();
        setDialogOpen(true);
        return;
      }

      // Call original onClick if provided
      if (onClick) {
        onClick(e);
      }
    };

    // Handle confirmed navigation
    const handleConfirmedNavigation = () => {
      if (href) {
        window.open(href, finalTarget || "_self");
      }
      setDialogOpen(false);
    };

    // If external link needs confirmation, wrap in AlertDialog
    if (isExternal && showExternalDialog) {
      return (
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <AlertDialogTrigger asChild>
            <Comp
              ref={ref}
              href={href}
              className={cn(className)}
              onClick={handleClick}
              {...props}
            >
              {children}
            </Comp>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>External Link Confirmation</AlertDialogTitle>
              <AlertDialogDescription>
                You are about to navigate to an external website. Please verify
                the URL is correct:
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="my-4 p-3 bg-muted rounded-md">
              <code className="text-sm break-all">{href}</code>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDialogOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmedNavigation}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    }

    // Regular link without confirmation dialog
    return (
      <Comp
        ref={ref}
        href={href}
        className={cn(className)}
        onClick={handleClick}
        {...securityProps}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Link.displayName = "Link";

export { Link };
