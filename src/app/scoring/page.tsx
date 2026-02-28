import { NextPage } from "next";
import { Link } from "@/components/ui/link";

const ScoringPage: NextPage = () => {
  return (
    <div className="flex flex-col items-center p-10 max-w-3xl mx-auto">
      <article className="w-full space-y-10 text-foreground [&_a]:underline [&_a]:text-primary [&_a:hover]:text-primary/80 [&_a]:transition-colors">
        <section>
          <p className="text-muted-foreground leading-relaxed mb-4">
            In a forever-evolving blockchain and privacy landscape, evaluating
            projects objectively is crucial.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Our scoring system provides a structured approach to assessing crypto
            initiatives across three key areas: Openness, Technology, and
            Privacy. We currently rank projects based on that filled-in
            information with little to no conditional logic.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Do you want to help us improve our scoring mechanism?
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <Link href="https://t.me/c/2035190866/679" showExternalDialog={false}>
              Come say hi in our TG channel
            </Link>
            , or join our weekly meeting on Fridays at 14:00 CEST located at this
            Jitsi beneath.
          </p>
          <h2 className="text-xl font-mono font-medium mb-4">Jitsi Meet</h2>
          <p className="text-muted-foreground leading-relaxed">
            <Link
              href="https://meet.jit.si/web3privacynowexplorer"
              showExternalDialog={false}
            >
              Join a WebRTC video conference powered by the Jitsi Videobridge
            </Link>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-mono font-medium mb-4">
            Openness: Fostering Transparency and Trust
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Transparency is fundamental in our space. This Openness score
            reflects a project&apos;s commitment to clear communication and
            accessibility of information.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-mono font-medium mb-2">
                Team Information (10 points)
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-1">
                <strong>Importance:</strong> Visible leadership enhances project
                credibility and reduces the chances of it being a rug pull.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>What to look for:</strong> Detailed profiles of core
                team members on the project&apos;s official website.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-mono font-medium mb-2">
                Documentation (10 points)
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-1">
                <strong>Importance:</strong> Comprehensive documentation
                facilitates understanding and adoption.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>What to look for:</strong> Well-organized, up-to-date
                documentation, easily accessible online.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-mono font-medium mb-2">
                GitHub Presence (10 points)
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-1">
                <strong>Importance:</strong> Open-source code promotes trust and
                collaboration.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>What to look for:</strong> An active GitHub repository
                with regular updates and community engagement.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-mono font-medium mb-2">
                Social Media Engagement (5 points)
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-1">
                <strong>Importance:</strong> Active channels indicate community
                involvement and information flow.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>What to look for:</strong> Regularly updated profiles on
                platforms like Twitter, Discord, or Telegram.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-mono font-medium mb-2">
                Whitepaper Availability (10 points)
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-1">
                <strong>Importance:</strong> A whitepaper outlines the
                project&apos;s vision and technical approach.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>What to look for:</strong> A comprehensive, easily
                accessible whitepaper on the project&apos;s website. A gitbook,
                or extensive documentation can also be included here in case
                there is no project whitepaper.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-mono font-medium mb-2">
                Funding Transparency (10 points)
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-1">
                <strong>Importance:</strong> Clear funding information builds
                investor confidence.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>What to look for:</strong> Disclosed information about
                funding rounds or sources. It&apos;s important to note that not
                all projects are necessarily investor-funded; if this is the
                case, including &quot;bootstrapped&quot; or &quot;self-funded&quot;
                is more than fine.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-mono font-medium mb-4">
            Technology: Building Robust and Secure Systems
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            The Technology score assesses the project&apos;s technical foundation
            and security measures.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-mono font-medium mb-2">
                Mainnet Deployment (10 points)
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-1">
                <strong>Importance:</strong> A live mainnet demonstrates a
                functional product.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>What to look for:</strong> Confirmation of the
                project&apos;s deployment on a main blockchain network.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-mono font-medium mb-2">
                Open Source Code (20 points)
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-1">
                <strong>Importance:</strong> Open-source projects allow for
                community review and contribution.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>What to look for:</strong> Publicly available code under
                an open-source license.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-mono font-medium mb-2">
                Non-Custodial Asset Management (10 points)
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-1">
                <strong>Importance:</strong> Non-custodial solutions give users
                control over their assets.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>What to look for:</strong> Architecture that allows users
                to maintain control of their private keys.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-mono font-medium mb-2">
                Immutable Smart Contracts (10 points)
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-1">
                <strong>Importance:</strong> Non-upgradeable contracts reduce the
                risk of unexpected changes.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>What to look for:</strong> Smart contracts deployed
                without upgradeable features.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-mono font-medium mb-2">
                Security Audits (10 points)
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-1">
                <strong>Importance:</strong> Third-party audits help identify and
                address vulnerabilities.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>What to look for:</strong> Published results of security
                audits from third-party security firms.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-mono font-medium mb-4">
            Privacy: Protecting User Data and Rights
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            The Privacy score evaluates how well a project safeguards user
            information and autonomy.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-mono font-medium mb-2">
                Privacy Policy (10 points)
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-1">
                <strong>Importance:</strong> A clear policy informs users about
                data handling practices.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>What to look for:</strong> A comprehensive, easily
                accessible privacy policy.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-mono font-medium mb-2">
                Minimal KYC Requirements (10 points)
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-1">
                <strong>Importance:</strong> Limited data collection respects
                user privacy.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>What to look for:</strong> Systems designed to operate
                without mandatory Know Your Customer processes.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-mono font-medium mb-2">
                Regulatory Compliance (5 points)
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-1">
                <strong>Importance:</strong> Compliance efforts demonstrate
                commitment to legal operation.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>What to look for:</strong> Clear communication about the
                project&apos;s regulatory status and efforts.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-mono font-medium mb-2">
                Default Privacy Settings (10 points)
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-1">
                <strong>Importance:</strong> Privacy by default protects users
                proactively.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>What to look for:</strong> Strong privacy features
                implemented as the default setting.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-mono font-medium mb-4">Conclusion</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            This scoring system provides a framework for evaluating projects
            across various dimensions.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Remember, while a high score indicates strength in these areas,
            it&apos;s important to conduct your own independent and thorough
            research before engaging with any cryptocurrency project.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We encourage ongoing discussion about these metrics. If you have
            insights or questions about how projects are scored, please reach out
            to us. We&apos;re happy to engage with your feedback and or
            criticism.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-mono font-medium mb-4">
            Scoring in a nutshell
          </h3>
          <div className="space-y-4 text-muted-foreground">
            <div>
              <p className="font-medium text-foreground mb-2">
                Category: Openness
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Team Information: 10 points</li>
                <li>Documentation: 10 points</li>
                <li>GitHub Presence: 10 points</li>
                <li>Social Media Engagement: 5 points</li>
                <li>Whitepaper Availability: 10 points</li>
                <li>Funding Transparency: 10 points</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">
                Category: Technology
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Mainnet Deployment: 10 points</li>
                <li>Open Source Code: 20 points</li>
                <li>Non-Custodial Asset Management: 10 points</li>
                <li>Immutable Smart Contracts: 10 points</li>
                <li>Security Audits: 10 points</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">
                Category: Privacy
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Privacy Policy: 10 points</li>
                <li>Minimal KYC Requirements: 10 points</li>
                <li>Regulatory Compliance: 5 points</li>
                <li>Default Privacy Settings: 10 points</li>
              </ul>
            </div>
            <p className="font-mono font-medium text-foreground pt-2">
              Total Possible Score: 150 points
            </p>
          </div>
        </section>
      </article>
    </div>
  );
};

export default ScoringPage;
