import { Link as UILink } from "@/components/ui/link";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background/95 mt-auto">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/logo.svg"
                  alt="Web3Privacy Now"
                  width={177}
                  height={48}
                  className="h-8 w-auto"
                  priority
                />
              </Link>
              <p className="mt-4 text-sm text-foreground/60 max-w-xs leading-relaxed">
                Exploring and showcasing privacy-focused projects in the Web3
                ecosystem.
              </p>
            </div>

            <div>
              {" "}
              <ul className="space-y-3">
                {[
                  {
                    label: "Manifiesto",
                    href: "https://docs.web3privacy.info/about-us/manifesto/",
                  },
                  { label: "Events", href: "https://web3privacy.info/events/" },
                  {
                    label: "Privacy Explorer",
                    href: "https://docs.web3privacy.info/projects/privacy-explorer/",
                  },
                  {
                    label: "How to get involved",
                    href: "https://docs.web3privacy.info/get-involved/",
                  },
                ].map((item) => (
                  <li key={item.label}>
                    <UILink
                      href={item.href}
                      className="text-sm text-foreground/60 hover:text-foreground/80 transition-colors"
                    >
                      {item.label}
                    </UILink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {" "}
              <ul className="space-y-3">
                {[
                  {
                    label: "Articles",
                    href: "https://mirror.xyz/0x0f1F3DAf416B74DB3DE55Eb4D7513a80F4841073",
                  },
                  {
                    label: "Privacy database",
                    href: "https://github.com/web3privacy/web3privacy",
                  },
                  {
                    label: "Grants/Support Us",
                    href: "https://github.com/web3privacy/grants",
                  },
                  {
                    label: "Talks",
                    href: "https://docs.web3privacy.info/events/",
                  },
                ].map((item) => (
                  <li key={item.label}>
                    <UILink
                      href={item.href}
                      className="text-sm text-foreground/60 hover:text-foreground/80 transition-colors"
                    >
                      {item.label}
                    </UILink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t text-center text-sm text-foreground/60">
            <p>
              Built with ❤️ by the{" "}
              <UILink href="https://web3privacy.info/about/">
                Web3Privacy
              </UILink>{" "}
              team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
