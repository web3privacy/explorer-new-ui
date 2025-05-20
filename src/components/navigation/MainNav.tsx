import { cn } from "@/lib/utils";
import Link from "next/link";
import { SocialIcons } from "./SocialIcons";

interface MainNavProps {
  className?: string;
  isMobile?: boolean;
}

const menuItems = [
  { text: "Projects", href: "/" },
  { text: "Ecosystems", href: "/ecosystems" },
  { text: "About", href: "/about" },
];

export function MainNav({ className, isMobile }: MainNavProps) {
  return (
    <nav className={cn("flex items-center gap-6 w-full", className)}>
      {!isMobile && (
        <Link href="/" className="flex items-center space-x-2 mr-4">
          <span className="font-bold inline-block text-lg">Web3Privacy</span>
        </Link>
      )}

      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "transition-colors hover:text-foreground/80 text-foreground/60 flex items-center",
            isMobile
              ? "text-base font-medium px-2 py-1 -ml-2 rounded-md hover:bg-foreground/5"
              : "text-sm h-16"
          )}
        >
          {item.text}
        </Link>
      ))}

      {isMobile && <SocialIcons className="mt-8" />}
    </nav>
  );
}
