import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { SocialIcons } from "./SocialIcons";

interface MainNavProps {
  className?: string;
  isMobile?: boolean;
}

const menuItems = [
  { text: "About", href: "/about" },
  {
    text: "Scoring",
    href: "/scoring",
  },
  { text: "Contribute", href: "https://github.com/web3privacy/explorer-data" },
  {
    text: "+ Add Project",
    href: "https://explorer.web3privacy.info/project/create",
    isButton: true,
  },
];

export function MainNav({ className, isMobile }: MainNavProps) {
  return (
    <nav className={cn("flex items-center gap-6 w-full", className)}>
      {!isMobile && (
        <Link href="/" className="flex items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/web3privacy_eye.webp"
              alt="Web3Privacy Eye"
              className="w-auto h-10 md:h-12 lg:h-14"
              width={56}
              height={56}
              priority
            />
            <Image
              src="/explorer.webp"
              alt="Explorer Logo"
              className="w-auto h-3 md:h-4 lg:h-5"
              width={100}
              height={20}
              priority
            />
          </div>
        </Link>
      )}

      <div className="flex gap-6 flex-col lg:flex-row w-full">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            className={buttonVariants({
              variant: item.isButton ? "secondary" : "ghost",
              className: "w-full border-2",
            })}
            href={item.href}
          >
            {item.text}
          </Link>
        ))}
      </div>

      {isMobile && <SocialIcons className="mt-8" />}
    </nav>
  );
}
