import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getEcosystems } from "@/queries/ecosystems.queries";
import { Project } from "@/types/project";
import Link from "next/link";
import { ProjectBars } from "../detail/ProjectBars";

interface ProjectCardProps {
  project: Project;
}

export async function ProjectCard({ project }: ProjectCardProps) {
  const ecosystems = await getEcosystems();

  const getEcosystemIcon = (ecosystemId: string) => {
    const ecosystem = ecosystems.find((eco) => eco.id === ecosystemId);
    return ecosystem?.icon;
  };

  return (
    <Link href={`/project/${project.id}`} className="block h-full">
      <Card className="h-full transition-colors hover:bg-accent/50 hover:shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-1 items-center gap-4 overflow-hidden">
              <Avatar className="mt-1 size-10 flex-shrink-0">
                <AvatarImage
                  src={project.logos ? project.logos[0].url : ""}
                  alt={project.name}
                />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {project.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="truncate">{project.name}</CardTitle>
            </div>
            <div className="flex-shrink-0">
              <ProjectBars project={project} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription className="line-clamp-2">
            {project.description || "No description available"}
          </CardDescription>
          <div className="flex items-center justify-between gap-2">
            {/* Ecosystems */}
            {project.ecosystem && project.ecosystem.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex -space-x-[0.4rem]">
                  {project.ecosystem.map((eco, index) => {
                    const icon = getEcosystemIcon(eco);
                    return (
                      <Avatar
                        key={index}
                        className="size-6 border-2 border-card bg-white"
                      >
                        <AvatarImage
                          src={icon}
                          alt={eco}
                          className="object-contain bg-white"
                        />
                        <AvatarFallback className="bg-secondary/50 text-secondary-foreground text-xs">
                          {eco[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex flex-col items-end gap-2">
              {/* Categories */}
              {project.categories && project.categories.length > 0 && (
                <div className="flex flex-wrap gap-1 justify-end">
                  {project.categories.map((category, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-[10px]"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Usecases */}
              {project.usecases && project.usecases.length > 0 && (
                <div className="flex flex-wrap gap-1 justify-end">
                  {project.usecases.map((usecase, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-[10px]"
                    >
                      {usecase}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
