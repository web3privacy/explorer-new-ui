import { Project } from "@/types/project";
import { Eye } from "lucide-react";

interface ProjectOpennessProps {
  project: Project;
}

export function ProjectOpenness({ project }: ProjectOpennessProps) {
  return (
    <section id="openness" className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-6">
        <Eye className="h-6 w-6 text-primary" />
        <h2 className="text-3xl font-bold">Openness</h2>
      </div>
      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground mb-4">
          {project.name} embraces the principles of open source development and
          transparent governance. All code is publicly available under
          permissive licenses, allowing for community collaboration and
          independent verification of security claims.
        </p>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-3">Open Source</h3>
            <p className="text-muted-foreground">
              {project.links?.github ? (
                <>
                  Complete source code available on{" "}
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    GitHub
                  </a>{" "}
                  with MIT license. Community contributions are welcome and
                  actively encouraged.
                </>
              ) : (
                "Complete source code available on GitHub with MIT license. Community contributions are welcome and actively encouraged."
              )}
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-3">Transparency</h3>
            <p className="text-muted-foreground">
              All development decisions, roadmap items, and technical
              specifications are publicly documented and open for discussion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
