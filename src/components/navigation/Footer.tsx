import { Link as UILink } from "@/components/ui/link";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-foreground/50 bg-background/95">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
            <div className="md:col-span-2">
              <Link
                href="https://hackmd.io/@m-f-/HJZ3aZSekl"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <Image
                  src="/explorer-logo1.png"
                  alt="Web3Privacy Now"
                  width={266}
                  height={72}
                  className="h-12 w-auto"
                  priority
                />
              </Link>
              <p className="mt-4 text-base text-foreground/60 max-w-xs leading-relaxed">
                Exploring and showcasing privacy-focused projects in the Web3
                ecosystem.
              </p>
            </div>

            <div>
              {" "}
              <ul className="space-y-3">
                {[
                  {
                    label: "Manifesto",
                    href: "https://docs.web3privacy.info/about-us/manifesto/",
                  },
                  { label: "Events", href: "https://web3privacy.info/events/" },
                  {
                    label: "Projects Database",
                    href: "https://github.com/web3privacy/explorer-data",
                  },
                  {
                    label: "Privacy Awards 2025",
                    href: "https://awards.web3privacy.info/",
                  },
                ].map((item) => (
                  <li key={item.label}>
                    <UILink
                      href={item.href}
                      showExternalDialog={false}
                      className="text-base text-foreground/60 hover:text-foreground/80 transition-colors"
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
                    label: "News",
                    href: "https://news.web3privacy.info/",
                  },
                  {
                    label: "Privacy Academy",
                    href: "https://academy.web3privacy.info/",
                  },
                  {
                    label: "Hackathons Report",
                    href: "https://github.com/web3privacy/research/blob/main/initiatives/ethereum-privacy-ecosystem/resources/hackathons/visuals/Ethereum%20Privacy%20Ecosystem%20Research.pdf",
                  },
                  {
                    label: "Talks",
                    href: "https://www.youtube.com/@Web3PrivacyNow",
                  },
                ].map((item) => (
                  <li key={item.label}>
                    <UILink
                      href={item.href}
                      showExternalDialog={false}
                      className="text-base text-foreground/60 hover:text-foreground/80 transition-colors"
                    >
                      {item.label}
                    </UILink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 mx-12 pt-8 border-t border-foreground/30 text-center text-sm text-foreground/60">
            <p>
              Built with ❤️ by the{" "}
              <UILink
                href="https://web3privacy.info/about/"
                showExternalDialog={false}
                className="underline decoration-1 underline-offset-4"
              >
                Web3Privacy Now
              </UILink>{" "}
              team. The source code is available on{" "}
              <UILink
                href="https://github.com/web3privacy/web3privacy-now"
                showExternalDialog={false}
                className="underline decoration-1 underline-offset-4"
              >
                GitHub
              </UILink>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
