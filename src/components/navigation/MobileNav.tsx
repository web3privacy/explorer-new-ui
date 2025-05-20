import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { MainNav } from "./MainNav";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="lg:hidden px-0 text-foreground">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>{" "}
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader className="px-4 pt-6 pb-2">
          <SheetTitle className="text-lg">Navigation Menu</SheetTitle>
        </SheetHeader>
        <div className="px-4 py-6">
          <MainNav className="flex-col items-start space-y-4" isMobile />
        </div>
      </SheetContent>
    </Sheet>
  );
}
