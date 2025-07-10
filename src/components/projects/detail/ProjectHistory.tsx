import { Separator } from "@/components/ui/separator";
import { Project } from "@/types/project";
import { Clock } from "lucide-react";

interface ProjectHistoryProps {
  project: Project;
}

export function ProjectHistory({ project }: ProjectHistoryProps) {
  return (
    <section id="history" className="scroll-mt-20">
      <div>
        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Clock className="h-6 w-6" />
          History
        </h3>
        <Separator />
      </div>

      <div className="prose prose-lg max-w-none mt-6">
        <p className="text-muted-foreground mb-4">
          {project.name} has evolved significantly since its inception, driven
          by community feedback and the growing need for privacy-preserving
          technologies in the Web3 ecosystem.
        </p>
        <div className="space-y-6 mt-8">
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-3">2024 - Current</h3>
            <p className="text-muted-foreground">
              Major version 2.0 release with enhanced privacy features, improved
              performance, and expanded blockchain integrations. Community
              governance implementation.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-3">2023 - Growth</h3>
            <p className="text-muted-foreground">
              Rapid adoption in the DeFi ecosystem. Integration with major
              protocols. Security audit completion and bug bounty program
              launch.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-3">2022 - Foundation</h3>
            <p className="text-muted-foreground">
              Initial release focusing on core privacy features. Open source
              launch and community building. First enterprise partnerships.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-3">2021 - Conception</h3>
            <p className="text-muted-foreground">
              Project conceptualization and initial research. Team formation and
              technology stack selection. Early prototype development.
            </p>
          </div>
        </div>
        {project.history && project.history.length > 0 && (
          <div className="bg-card p-6 rounded-lg border mt-6">
            <h3 className="text-xl font-semibold mb-3">Project Timeline</h3>
            <div className="space-y-4">
              {project.history.map((event, index) => (
                <div key={index} className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold text-foreground">
                    {event.title}
                  </h4>
                  {event.time && (
                    <p className="text-muted-foreground text-sm">
                      {event.time}
                    </p>
                  )}
                  {event.description && (
                    <p className="text-muted-foreground text-sm mt-1">
                      {event.description}
                    </p>
                  )}
                  {event.link && (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm"
                    >
                      Learn More
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
