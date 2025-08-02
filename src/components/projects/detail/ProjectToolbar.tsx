"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/components/ui/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Project } from "@/types/project";
import {
  Code,
  Coins,
  ExternalLink,
  Globe,
  Landmark,
  Megaphone,
  Menu,
  MoreHorizontal,
  Users,
} from "lucide-react";
import React from "react";

interface ProjectToolbarProps {
  project: Project;
}

const linkCategories = [
  {
    icon: <Globe size={16} />,
    label: "Official",
    keys: ["whitepaper", "docs", "changelog", "blog", "rss_feed"],
  },
  {
    icon: <Code size={16} />,
    label: "Development",
    keys: ["github"],
  },
  {
    icon: <Megaphone size={16} />,
    label: "Socials",
    keys: ["twitter", "facebook", "lens", "farcaster"],
  },
  {
    icon: <Users size={16} />,
    label: "Community",
    keys: ["telegram", "discord", "forum"],
  },
  {
    icon: <Landmark size={16} />,
    label: "Governance",
    keys: ["governance", "snapshot"],
  },
  {
    icon: <Coins size={16} />,
    label: "Financial",
    keys: ["coingecko", "token", "block_explorer"],
  },
  {
    icon: <MoreHorizontal size={16} />,
    label: "Other",
    keys: [],
  },
];

const allKnownKeys = linkCategories.flatMap((c) => c.keys);

// Function to format link keys for display
const formatLinkKey = (key: string): string => {
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={`block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
            className || ""
          }`}
          {...props}
        >
          <div className="text-sm flex items-center gap-2 font-medium leading-none line-clamp-1">
            <ExternalLink size={14} className="text-muted-foreground" />
            {title}
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

// Mobile Dropdown Component
function MobileDropdown({ project }: { project: Project }) {
  if (!project.links) return null;

  const otherLinks = Object.entries(project.links).filter(
    ([key, value]) => value && !allKnownKeys.includes(key)
  );

  const allAvailableCategories = linkCategories
    .map((category) => {
      let availableLinks = category.keys
        .map((key) => ({ key, value: project.links?.[key] }))
        .filter((link) => link.value);

      if (category.label === "Other") {
        availableLinks = otherLinks.map(([key, value]) => ({
          key,
          value,
        }));
      }

      return { ...category, availableLinks };
    })
    .filter((category) => category.availableLinks.length > 0);

  if (allAvailableCategories.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <Menu size={16} />
          <span className="ml-2">Links</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]" align="start">
        {allAvailableCategories.map((category, categoryIndex) => (
          <React.Fragment key={category.label}>
            <DropdownMenuGroup>
              <DropdownMenuLabel className="flex items-center gap-2">
                {category.icon}
                {category.label}
              </DropdownMenuLabel>
              {category.availableLinks.map((link) => (
                <DropdownMenuItem key={link.key} asChild>
                  <Link
                    href={typeof link.value === "string" ? link.value : ""}
                    className="flex items-center gap-2"
                  >
                    <ExternalLink size={14} className="text-muted-foreground" />
                    {formatLinkKey(link.key)}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            {categoryIndex < allAvailableCategories.length - 1 && (
              <DropdownMenuSeparator />
            )}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Desktop Navigation Component
function DesktopNavigation({ project }: { project: Project }) {
  if (!project.links) return null;

  const otherLinks = Object.entries(project.links).filter(
    ([key, value]) => value && !allKnownKeys.includes(key)
  );

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {linkCategories.map((category) => {
          let availableLinks = category.keys
            .map((key) => ({ key, value: project.links?.[key] }))
            .filter((link) => link.value);

          if (category.label === "Other") {
            availableLinks = otherLinks.map(([key, value]) => ({
              key,
              value,
            }));
          }

          if (availableLinks.length === 0) return null;

          return (
            <NavigationMenuItem key={category.label}>
              <NavigationMenuTrigger>
                <div className="flex items-center gap-2">
                  {category.icon}
                  <span className="hidden sm:inline">{category.label}</span>
                </div>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-2 p-3 md:w-[250px]">
                  {availableLinks.map((link) => (
                    <ListItem
                      key={link.key}
                      href={typeof link.value === "string" ? link.value : ""}
                      title={formatLinkKey(link.key)}
                    />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function ProjectToolbar({ project }: ProjectToolbarProps) {
  if (!project.links) return null;

  return (
    <>
      {/* Mobile Dropdown */}
      <div className="block md:hidden">
        <MobileDropdown project={project} />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <DesktopNavigation project={project} />
      </div>
    </>
  );
}
