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
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start gap-4">
          <Avatar className="mt-1">
            <AvatarImage
              src={project.logos ? project.logos[0].url : ""}
              alt={project.name}
            />
            <AvatarFallback className="bg-primary/10 text-primary">
              {project.name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2 w-full">
            <CardTitle>{project.name}</CardTitle>
            {project.categories && project.categories.length > 0 && (
              <div className="flex flex-wrap gap-1">
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
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="line-clamp-2">
          {project.description || "No description available"}
        </CardDescription>

        {project.ecosystem && project.ecosystem.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Ecosystems</p>
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
      </CardContent>
    </Card>
  );
}
