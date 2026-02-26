import { NextPage } from "next";
import Image from "next/image";
import { Link } from "@/components/ui/link";

const AboutPage: NextPage = () => {
  return (
    <div className="flex flex-col items-center p-10 max-w-3xl mx-auto">
      <Image src="/about_title.png" alt="About" width={300} height={100} />

      <article className="mt-12 w-full space-y-10 text-foreground [&_a]:underline [&_a]:text-primary [&_a:hover]:text-primary/80 [&_a]:transition-colors">
        <section>
          <h1 className="text-2xl font-mono font-medium mb-4">
            About Explorer
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-4">
            A ranked database system to empower the general public in exploring
            the privacy levels, security, and reliability of Web3 projects.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            To make the right decisions, one must be able to compare options.
            Having more options while your demand for what you need stays the
            same allows you to find what you need. Data is at the heart of many
            decision-making processes, from fundraising to attesting the
            legibility behind ecosystem tooling.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            As a neutral platform, we are transparent about our system. All
            changes are committed to our GitHub and are open to all.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-mono font-medium mb-4">Main features</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <Link
                href="https://explorer.web3privacy.info/"
                showExternalDialog={false}
              >
                Dashboard with filters and search
              </Link>
              <img
                src="/about-dashboard-filter.png"
                alt="Dashboard with filters and search"
              />
            </li>
            <li>
              <Link
                href="https://explorer.web3privacy.info/project/create"
                showExternalDialog={false}
              >
                Editor
              </Link>
              <img src="/about-editor.png" alt="Editor" />
            </li>

            <li>
              <Link
                href="https://explorer.web3privacy.info/project/web3privacynow"
                showExternalDialog={false}
              >
                Detailed project overview
              </Link>
              <img
                src="/about-project-overview.png"
                alt="Detailed project overview"
              />
            </li>
            <li>
              <Link
                href="https://mirror.xyz/0x0f1F3DAf416B74DB3DE55Eb4D7513a80F4841073/s9flkE6tMaJ4f2tzWu-FmDy7Zx_TRPe3jdXr2iYmYH0"
                showExternalDialog={false}
              >
                Scoring Mechanism (learn more about this here)
              </Link>
              <img src="/about-scoring-mechanism.png" alt="Scoring mechanism" />
            </li>
            <li>
              <Link
                href="https://github.com/web3privacy/explorer-data/tree/main/src/projects"
                showExternalDialog={false}
              >
                Public Project Database
              </Link>
              <img
                src="/about-public-project-db.png"
                alt="Public project database"
              />
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-mono font-medium mb-6">Ethos</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-mono font-medium mb-2">
                Privacy First
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                The explorer it&apos;s main focus is to be able to bring privacy
                focused projects first. Allowing anyone to discover projects
                without being identified or personally tracked.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-mono font-medium mb-2">
                Open-source
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our explorer and it&apos;s data is completely open-source, which
                means you can access our data from the front-end code, to the
                individual github code through our repo on Github &amp; Radicle.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  <Link
                    href="https://github.com/web3privacy/explorer-data"
                    showExternalDialog={false}
                  >
                    For the data see here
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/web3privacy/explorer-app"
                    showExternalDialog={false}
                  >
                    For the front-end see here
                  </Link>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                If you would like access to the database through JSON format,
              </p>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>
                  <Link
                    href="https://explorer-data.web3privacy.info/"
                    showExternalDialog={false}
                  >
                    We self-host an API here
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-mono font-medium mb-2">Neutral</h3>
              <p className="text-muted-foreground leading-relaxed">
                Privacy is a fluid concept resolving around the ideals of the
                interprenter. We aim to provide a neutral perspective by letting
                you make your own decisions through accessible datapoints.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-mono font-medium mb-2">Accessible</h3>
              <p className="text-muted-foreground leading-relaxed">
                There is no need to register to access any of our work, as the
                information we share is permissionless.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-mono font-medium mb-4">Contribute</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            As we&apos;re primairly an open-source organisation, we rely on
            contributions from people like you to help us move forward. From
            submitting your favourite project to our database, to assisting us
            in building the application are all things that help us enormously.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4 space-y-2">
            <Link
              href="https://mirror.xyz/0x0f1F3DAf416B74DB3DE55Eb4D7513a80F4841073/Ri2ZMIq6Os-ZKQyT_l6a5F1-gJURySvvwNRKzBvNpWM"
              showExternalDialog={false}
            >
              Learn how to submit your project here
            </Link>
            <br />
            <Link
              href="https://mirror.xyz/0x0f1F3DAf416B74DB3DE55Eb4D7513a80F4841073/yDbRRq8FjSogK7iUWdiRKkm54wvx6DgRt99gFuineuY"
              showExternalDialog={false}
            >
              Learn how to edit an existing project here
            </Link>
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Want to polish your dev skills, write an article, or apply your
            non-technical efforts, or in general contribute more to our
            open-source project?{" "}
            <Link
              href="https://telegram.me/dragon_mf"
              showExternalDialog={false}
            >
              Hit me up on Telegram (@Dragon_Mf)
            </Link>{" "}
            I will gladly introduce you to our team.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-mono font-medium mb-4">
            Funding &amp; Organisation
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The explorer runs through major volunteer efforts to create
            transparency within the privacy landscape. Explorer is also directly
            a part of{" "}
            <Link href="https://web3privacy.info/" showExternalDialog={false}>
              Web3Privacy Now
            </Link>{" "}
            (W3PN).
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              W3PN Manifesto can be found{" "}
              <Link
                href="https://docs.web3privacy.info/about-us/manifesto/"
                showExternalDialog={false}
              >
                here
              </Link>
            </li>
            <li>
              W3PN treasury is explained{" "}
              <Link
                href="https://docs.web3privacy.info/governance/treasury/"
                showExternalDialog={false}
              >
                here
              </Link>
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
};

export default AboutPage;
