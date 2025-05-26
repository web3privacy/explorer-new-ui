import { cn } from "@/lib/utils";
import { Github, Send, Twitter } from "lucide-react";
import Link from "next/link";

interface SocialIconsProps {
  className?: string;
}

export function SocialIcons({ className }: SocialIconsProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Link
        href="https://twitter.com/web3privacy"
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground/60 hover:text-foreground/80 transition-colors"
      >
        <Twitter className="h-4 w-4" />
        <span className="sr-only">X</span>
      </Link>
      <Link
        href="https://t.me/c/2035190866/1"
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground/60 hover:text-foreground/80 transition-colors"
      >
        <Send className="h-4 w-4" />
        <span className="sr-only">Telegram</span>
      </Link>
      <Link
        href="https://github.com/web3privacy"
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground/60 hover:text-foreground/80 transition-colors"
      >
        <Github className="h-4 w-4" />
        <span className="sr-only">GitHub</span>
      </Link>
    </div>
  );
}
