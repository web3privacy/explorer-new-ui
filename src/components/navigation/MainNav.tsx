import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SocialIcons } from "./SocialIcons";

interface MainNavProps {
  className?: string;
  isMobile?: boolean;
}

const menuItems = [
  { text: "About", href: "https://hackmd.io/@m-f-/HJZ3aZSekl" },
  {
    text: "Scoring",
    href: "https://mirror.xyz/0x0f1F3DAf416B74DB3DE55Eb4D7513a80F4841073/s9flkE6tMaJ4f2tzWu-FmDy7Zx_TRPe3jdXr2iYmYH0",
  },
  { text: "Contribute", href: "https://github.com/web3privacy/explorer-data" },
];

export function MainNav({ className, isMobile }: MainNavProps) {
  return (
    <nav className={cn("flex items-center gap-6 w-full", className)}>
      {!isMobile && (
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
      )}

      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "hidden lg:flex transition-colors hover:text-foreground/80 text-foreground/60 items-center", // Added hidden lg:flex
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
