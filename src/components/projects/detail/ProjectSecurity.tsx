import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Project } from "@/types/project";
import { Cpu, ExternalLink, Info, Shield, Users } from "lucide-react";

interface ProjectSecurityProps {
  project: Project;
}

interface DataPoint {
  icon: React.ComponentType<{ className?: string }>;
  key: string;
  getValue: () => string | undefined;
}

export function ProjectSecurity({ project }: ProjectSecurityProps) {
  const technicalDependency = project.technical_spof;
  const socialDependency = project.social_trust;
  const thirdPartyDependency = project.third_party_dependency;

  const dataPoints: DataPoint[] = [
    {
      icon: Cpu,
      key: "Technical Dependency",
      getValue: () => technicalDependency,
    },
    {
      icon: Users,
      key: "Social Dependency",
      getValue: () => socialDependency,
    },
    {
      icon: ExternalLink,
      key: "Third-party Dependency",
      getValue: () => thirdPartyDependency,
    },
  ];

  const renderValue = (dataPoint: DataPoint) => {
    const value = dataPoint.getValue();

    if (!value || value.trim() === "") {
      return (
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Not available</span>
        </div>
      );
    }

    return <span className="text-sm text-muted-foreground">{value}</span>;
  };

  return (
    <section id="security" className="scroll-mt-20">
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Security
          </h3>
          <Separator />
        </div>

        <Card>
          <CardContent>
            <Table>
              <TableBody>
                {dataPoints.map((dataPoint) => {
                  const IconComponent = dataPoint.icon;
                  return (
                    <TableRow key={dataPoint.key}>
                      <TableCell className="text-muted-foreground flex items-center gap-2">
                        <IconComponent className="h-4 w-4" />
                        {dataPoint.key}
                      </TableCell>
                      <TableCell>{renderValue(dataPoint)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
