import { Project } from "@/types/project";
import { Cpu, ExternalLink, Users } from "lucide-react";

interface ProjectSecurityProps {
  project: Project;
}

export function ProjectSecurity({ project }: ProjectSecurityProps) {
  return (
    <section id="security" className="scroll-mt-20">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Security Dependencies */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold mb-4">Security</h3>

          <div className="space-y-4">
            {/* Technical Dependency */}
            <div className="bg-card p-4 rounded-lg border">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Cpu className="h-4 w-4" />
                Technical Dependency
              </h4>
              <p className="text-muted-foreground text-sm">
                {project.technical_spof ||
                  "No technical dependency information available"}
              </p>
            </div>

            {/* Social Dependency */}
            <div className="bg-card p-4 rounded-lg border">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Social Dependency
              </h4>
              <p className="text-muted-foreground text-sm">
                {project.social_trust ||
                  "No social dependency information available"}
              </p>
            </div>

            {/* Third-party Dependency */}
            <div className="bg-card p-4 rounded-lg border">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Third-party Dependency
              </h4>
              <p className="text-muted-foreground text-sm">
                {project.third_party_dependency ||
                  "No third-party dependency information available"}
              </p>
            </div>
          </div>
        </div>

        {/* Security Audits */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold mb-4">Audits</h3>

          {project.audits && project.audits.length > 0 ? (
            <div className="space-y-4">
              {project.audits.map((audit, index) => (
                <div key={index} className="bg-card p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">{audit.name}</h4>
                  <div className="space-y-2">
                    {audit.company && (
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Company:</span>{" "}
                        {audit.company}
                      </p>
                    )}
                    {audit.time && (
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Completed:</span>{" "}
                        {audit.time}
                      </p>
                    )}
                    {audit.link && (
                      <a
                        href={audit.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-2 text-sm"
                      >
                        View Audit Report <span className="text-xs">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card p-4 rounded-lg border">
              <p className="text-muted-foreground text-sm">
                No security audits available for this project.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
