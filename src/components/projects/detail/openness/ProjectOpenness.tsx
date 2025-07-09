import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Project } from "@/types/project";
import { format } from "date-fns";
import {
  Banknote,
  Calendar,
  Coins,
  DollarSign,
  Flag,
  Users,
} from "lucide-react";
import { ItemList } from "./ItemList";

interface ProjectOpennessProps {
  project: Project;
}

export function ProjectOpenness({ project }: ProjectOpennessProps) {
  const projectPhase = project.project_phase || "Not available";
  const assetsUsed = project.assets_used || [];
  const tokens = project.tokens || [];
  const launchDay = project.product_launch_day
    ? (() => {
        try {
          return format(new Date(project.product_launch_day), "MMM do, yyyy");
        } catch {
          return "Not available";
        }
      })()
    : "Not available";
  const teamMembers = project.team?.teammembers || [];
  const funding = project.funding || [];

  const projectData = [
    {
      field: "Project Phase",
      icon: <Flag className="h-3 w-3" />,
      value: [projectPhase],
    },
    {
      field: "Project Launch Day",
      icon: <Calendar className="h-3 w-3" />,
      value: [launchDay],
    },
    {
      field: "Assets Used",
      icon: <Coins className="h-3 w-3" />,
      value: assetsUsed.length > 0 ? assetsUsed : ["Not available"],
    },
    {
      field: "Native Token",
      icon: <Banknote className="h-3 w-3" />,
      value:
        tokens.length > 0
          ? [tokens[0]?.name || tokens[0]?.symbol || "Available"]
          : ["Not available"],
    },
  ];

  return (
    <section id="openness" className="scroll-mt-20">
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold mb-4">Openness</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardContent>
              <Table>
                <TableBody>
                  {projectData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-muted-foreground flex items-center gap-1">
                        {item.icon}
                        {item.field}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          {item.value.map((val, badgeIndex) => (
                            <Badge key={badgeIndex} variant="secondary">
                              {val.toUpperCase()}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="team">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Team Members ({teamMembers.length})
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ItemList items={teamMembers} />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="funding">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Funding ({funding.length})
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ItemList items={funding} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
