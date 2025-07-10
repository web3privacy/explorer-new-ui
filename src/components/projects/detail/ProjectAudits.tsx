import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Project } from "@/types/project";
import { format } from "date-fns";
import { Calendar, ExternalLink, FileCheck, Info } from "lucide-react";

interface ProjectAuditsProps {
  project: Project;
}

export function ProjectAudits({ project }: ProjectAuditsProps) {
  const formatAuditDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM do, yyyy");
    } catch {
      return dateString;
    }
  };

  return (
    <section id="audits" className="scroll-mt-20">
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FileCheck className="h-6 w-6" />
            Audits
          </h3>
          <Separator />
        </div>

        <Card>
          <CardContent>
            {project.audits && project.audits.length > 0 ? (
              <div className="space-y-4 divide-y">
                {project.audits.map((audit, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between gap-4 py-3"
                  >
                    <div className="flex-1 space-y-2">
                      <a
                        href={audit.url || audit.link || ""}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary cursor-pointer hover:underline flex items-center gap-2 font-medium"
                      >
                        {audit.name}
                        <ExternalLink className="h-4 w-4" />
                      </a>

                      {audit.time && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {formatAuditDate(audit.time)}
                        </div>
                      )}

                      {audit.company && (
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Company:</span>{" "}
                          {audit.company}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 py-4">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  No security audits available for this project.
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
