import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "./MobileNav";
import { SocialIcons } from "./SocialIcons";

const menuItems = [
  { text: "About", href: "https://hackmd.io/@m-f-/HJZ3aZSekl" },
  {
    text: "Scoring",
    href: "https://mirror.xyz/0x0f1F3DAf416B74DB3DE55Eb4D7513a80F4841073/s9flkE6tMaJ4f2tzWu-FmDy7Zx_TRPe3jdXr2iYmYH0",
  },
  { text: "Contribute", href: "https://github.com/web3privacy/explorer-data" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-4">
          <div className="flex items-center gap-2">
            <Image
              src="/web3privacy_eye.webp"
              alt="Web3Privacy Eye"
              className="w-auto h-8 md:h-10 lg:h-12"
              width={48}
              height={48}
              priority
            />
            <Image
              src="/explorer.webp"
              alt="Explorer Logo"
              className="w-auto h-4 md:h-5 lg:h-6"
              width={120}
              height={24}
              priority
            />
          </div>
        </Link>

        <div className="hidden lg:flex gap-6">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.text}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <Button
            variant="secondary"
            className="hidden md:flex bg-muted/60 border hover:bg-accent/80 hover:shadow-md rounded-xl"
            asChild
          >
            <Link href="https://explorer.web3privacy.info/project/create">
              Add Project
            </Link>
          </Button>

          <SocialIcons className="hidden lg:flex" />

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
