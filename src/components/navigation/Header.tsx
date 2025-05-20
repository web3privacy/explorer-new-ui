import { MainNav } from "./MainNav";
import { MobileNav } from "./MobileNav";
import { SocialIcons } from "./SocialIcons";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <MainNav />

        <div className="flex items-center gap-4">
          <SocialIcons className="hidden lg:flex" />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
