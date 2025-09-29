import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FaTelegram } from "react-icons/fa";

interface SocialIconsProps {
  className?: string;
}

export function SocialIcons({ className }: SocialIconsProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Link
        href="https://twitter.com/web3privacy"
        className="text-foreground/60 hover:text-foreground/80 transition-colors"
      >
        <Image
          src="/x-logo-white.png"
          alt="X"
          width={16}
          height={16}
          className="h-4 w-4"
        />
        <span className="sr-only">X</span>
      </Link>
      <Link
        href="https://t.me/+QOj6126xlEs0OTQ0"
        className="text-foreground/60 hover:text-foreground/80 transition-colors"
      >
        <FaTelegram className="h-6 w-6 text-white" />
        <span className="sr-only">Telegram</span>
      </Link>
      <Link
        href="https://github.com/web3privacy"
        className="text-foreground/60 hover:text-foreground/80 transition-colors"
      >
        <Image
          src="/github-mark-white.png"
          alt="GitHub"
          width={16}
          height={16}
          className="h-6 w-6"
        />
        <span className="sr-only">GitHub</span>
      </Link>
      <Link
        href="https://matrix.to/#/%23web3privacy:matrix.org"
        className="text-foreground/60 hover:text-foreground/80 transition-colors"
      >
        <Image
          src="/matrix-favicon.svg"
          alt="Matrix"
          width={16}
          height={16}
          className="h-6 w-6 brightness-0 invert"
        />
        <span className="sr-only">Matrix</span>
      </Link>
    </div>
  );
}
