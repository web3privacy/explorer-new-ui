import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Project } from "@/types/project";
import { ProjectRating } from "./ProjectRating";

interface ProjectStatsProps {
  project: Project;
  ecosystems: Array<{ id: string; icon?: string; name?: string }>;
}

export function ProjectStats({ project, ecosystems }: ProjectStatsProps) {
  const getEcosystemIcon = (ecosystemId: string) => {
    const ecosystem = ecosystems.find((eco) => eco.id === ecosystemId);
    return ecosystem?.icon;
  };

  const getEcosystemName = (ecosystemId: string) => {
    const ecosystem = ecosystems.find((eco) => eco.id === ecosystemId);
    return ecosystem?.name || ecosystemId;
  };

  const useCases = project.usecases || [];
  const initialVisibleCount = 3;
  const visibleUseCases = useCases.slice(0, initialVisibleCount);
  const hiddenUseCases = useCases.slice(initialVisibleCount);
  const hiddenCount = hiddenUseCases.length;

  return (
    <Card className="overflow-hidden shrink-0 w-full md:w-96">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left side with two rows */}
          <div className="divide-y divide-border">
            {/* Ecosystems Cell */}
            <div className="p-4 flex flex-col justify-center items-start gap-3 h-24">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Ecosystems
              </h3>
              {project.ecosystem && project.ecosystem.length > 0 ? (
                <TooltipProvider delayDuration={100}>
                  <div className="flex -space-x-2">
                    {project.ecosystem.map((eco, index) => {
                      const icon = getEcosystemIcon(eco);
                      const name = getEcosystemName(eco);
                      return (
                        <Tooltip key={`${eco}-${index}`}>
                          <TooltipTrigger asChild>
                            <Avatar className="size-8 border-2 border-background bg-card hover:z-10 transition-transform hover:scale-110">
                              <AvatarImage
                                src={icon}
                                alt={name}
                                className="object-contain p-1"
                              />
                              <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-medium">
                                {name ? name[0].toUpperCase() : ""}
                              </AvatarFallback>
                            </Avatar>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{name}</p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                </TooltipProvider>
              ) : (
                <p className="text-sm text-muted-foreground">No ecosystems</p>
              )}
            </div>

            {/* Use Cases Cell */}
            <div className="p-4 flex flex-col justify-center items-start gap-3 h-24">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Use Cases
              </h3>
              {useCases.length > 0 ? (
                <TooltipProvider delayDuration={100}>
                  <div className="flex flex-wrap gap-2 items-center">
                    {visibleUseCases.map((usecase, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs font-medium border-primary/20 text-primary hover:bg-primary/5 max-w-20 truncate"
                      >
                        {usecase}
                      </Badge>
                    ))}
                    {hiddenCount > 0 && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge
                            variant="secondary"
                            className="text-xs cursor-pointer"
                          >
                            +{hiddenCount}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="flex flex-col gap-1 items-start">
                            {hiddenUseCases.map((usecase, index) => (
                              <span key={index} className="text-xs">
                                {usecase}
                              </span>
                            ))}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </TooltipProvider>
              ) : (
                <p className="text-sm text-muted-foreground">No use cases</p>
              )}
            </div>
          </div>

          {/* Rating Cell */}
          <div className="p-4 flex flex-col items-center justify-center space-y-3 border-t md:border-t-0 md:border-l border-border">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Rating
            </h3>
            <ProjectRating project={project} size={80} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
