import { Project } from "@/types/project";
import { Calendar, DollarSign, Users } from "lucide-react";

interface ProjectOpennessProps {
  project: Project;
}

export function ProjectOpenness({ project }: ProjectOpennessProps) {
  return (
    <section id="openness" className="scroll-mt-20">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Openness Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold mb-4">Openness</h3>

          <div className="space-y-4">
            {/* Project Description */}
            {project.description && (
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-medium mb-2">Project Description</h4>
                <p className="text-muted-foreground text-sm">
                  {project.description}
                </p>
              </div>
            )}

            {/* Project Phase */}
            {project.project_phase && (
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-medium mb-2">Project Phase</h4>
                <p className="text-muted-foreground text-sm">
                  {project.project_phase}
                </p>
              </div>
            )}

            {/* Assets Used */}
            {project.assets_used && project.assets_used.length > 0 && (
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-medium mb-2">Assets Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.assets_used.map((asset, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                    >
                      {asset}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Native Token */}
            {project.tokens && project.tokens.length > 0 && (
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-medium mb-2">Native Token</h4>
                {project.tokens.map((token, index) => (
                  <div key={index} className="text-sm text-muted-foreground">
                    {token.name && (
                      <p>
                        <span className="font-medium">Name:</span> {token.name}
                      </p>
                    )}
                    {token.symbol && (
                      <p>
                        <span className="font-medium">Symbol:</span>{" "}
                        {token.symbol}
                      </p>
                    )}
                    {token.network && (
                      <p>
                        <span className="font-medium">Network:</span>{" "}
                        {token.network}
                      </p>
                    )}
                    {token.contract_address && (
                      <p>
                        <span className="font-medium">Contract:</span>
                        <span className="font-mono text-xs ml-1">
                          {token.contract_address}
                        </span>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Project Launch Day */}
            {project.product_launch_day && (
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Project Launch Day
                </h4>
                <p className="text-muted-foreground text-sm">
                  {project.product_launch_day}
                </p>
              </div>
            )}

            {/* Team Members */}
            {project.team && (
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Team Members
                </h4>
                <div className="space-y-2">
                  {project.team.teammembers &&
                    project.team.teammembers.map(
                      (
                        member: {
                          name?: string;
                          role?: string;
                          link?: string;
                          [k: string]: unknown;
                        },
                        index: number
                      ) => (
                        <div
                          key={index}
                          className="text-sm text-muted-foreground"
                        >
                          <p className="font-medium">{member.name}</p>
                          {member.role && (
                            <p className="text-xs">{member.role}</p>
                          )}
                        </div>
                      )
                    )}
                </div>
              </div>
            )}

            {/* Funding */}
            {project.funding && project.funding.length > 0 && (
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Funding
                </h4>
                <div className="space-y-2">
                  {project.funding.map((fund, index) => (
                    <div key={index} className="text-sm text-muted-foreground">
                      {fund.name && (
                        <p>
                          <span className="font-medium">Name:</span> {fund.name}
                        </p>
                      )}
                      {fund.value && (
                        <p>
                          <span className="font-medium">Value:</span>{" "}
                          {fund.value}
                        </p>
                      )}
                      {fund.type && (
                        <p>
                          <span className="font-medium">Type:</span> {fund.type}
                        </p>
                      )}
                      {fund.time && (
                        <p>
                          <span className="font-medium">Time:</span> {fund.time}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
