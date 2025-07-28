"use client";

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
  Globe,
  Landmark,
  Megaphone,
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
];

const allKnownKeys = linkCategories.flatMap((c) => c.keys);

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
          <div className="text-sm font-medium leading-none line-clamp-1">
            {title}
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export function ProjectToolbar({ project }: ProjectToolbarProps) {
  if (!project.links) return null;

  const otherLinks = Object.entries(project.links).filter(
    ([key, value]) => value && !allKnownKeys.includes(key)
  );

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {linkCategories.map((category) => {
          const availableLinks = category.keys
            .map((key) => ({ key, value: project.links?.[key] }))
            .filter((link) => link.value);

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
                      title={
                        link.key.charAt(0).toUpperCase() + link.key.slice(1)
                      }
                    />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}

        {otherLinks.length > 0 && (
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <div className="flex items-center gap-2">
                <MoreHorizontal size={16} />
                <span className="hidden sm:inline">Other</span>
              </div>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-2 p-3 md:w-[250px]">
                {otherLinks.map(([key, value]) => (
                  <ListItem
                    key={key}
                    href={typeof value === "string" ? value : ""}
                    title={key.charAt(0).toUpperCase() + key.slice(1)}
                  />
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
