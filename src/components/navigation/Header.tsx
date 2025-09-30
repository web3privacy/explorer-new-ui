import { Button } from "@/components/ui/button";
import { HEADER_MENU_ITEMS, NAVIGATION_LINKS } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "./MobileNav";
import { SocialIcons } from "./SocialIcons";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-hidden">
      <div className="w-full flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/web3privacy_eye.webp"
              alt="Web3Privacy Eye"
              className="w-20 h-16 md:w-24 md:h-20 lg:w-28 lg:h-24 opacity-50"
              width={130}
              height={130}
              priority
            />
            <Image
              src="/explorer.webp"
              alt="Explorer Logo"
              className="w-auto h-6 md:h-7 lg:h-8"
              width={180}
              height={32}
              priority
            />
          </div>
        </Link>

        <div className="hidden lg:flex gap-6">
          {HEADER_MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-dm-mono text-muted-foreground"
            >
              {item.text}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <Button variant="secondary" className="hidden md:flex border" asChild>
            <Link href={NAVIGATION_LINKS.ADD_PROJECT}>+ ADD PROJECT</Link>
          </Button>

          <SocialIcons className="hidden lg:flex" />

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
