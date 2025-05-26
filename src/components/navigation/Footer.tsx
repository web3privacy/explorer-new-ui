import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background/95 mt-auto">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold inline-block text-lg">
                  Web3Privacy
                </span>
              </Link>
              <p className="mt-4 text-sm text-foreground/60 max-w-xs leading-relaxed">
                Exploring and showcasing privacy-focused projects in the Web3
                ecosystem.
              </p>
            </div>

            <div>
              <ul className="space-y-3">
                {[
                  "Manifiesto",
                  "Events",
                  "Privacy Explorer",
                  "How to get involved",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-foreground/60 hover:text-foreground/80 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <ul className="space-y-3">
                {[
                  "Articles",
                  "Privacy database",
                  "Grants/Support Us",
                  "Talks",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-foreground/60 hover:text-foreground/80 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t text-center text-sm text-foreground/60">
            <p>
              © {new Date().getFullYear()} Web3Privacy. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
