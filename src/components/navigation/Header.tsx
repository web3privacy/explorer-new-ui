import { Link as UILink } from "@/components/ui/link";
import { CirclePlus } from "lucide-react";
import { MainNav } from "./MainNav";
import { MobileNav } from "./MobileNav";
import { SocialIcons } from "./SocialIcons";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <MainNav />

        <div className="flex items-center gap-8">
          <div>
            <UILink
              href="https://explorer.web3privacy.info/project/create"
              className="hidden md:flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-0 rounded-md text-sm font-medium transition-colors"
            >
              <CirclePlus className="h-4 w-4" />
              <span>Add Project</span>
            </UILink>
          </div>

          <div className="flex items-center gap-4">
            <SocialIcons className="hidden lg:flex" />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
