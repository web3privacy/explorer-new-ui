import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";
import { Github, Send } from "lucide-react";
import Image from "next/image";

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
        <Send className="h-4 w-4" />
        <span className="sr-only">Telegram</span>
      </Link>
      <Link
        href="https://github.com/web3privacy"
        className="text-foreground/60 hover:text-foreground/80 transition-colors"
      >
        <Github className="h-4 w-4" />
        <span className="sr-only">GitHub</span>
      </Link>
    </div>
  );
}
