import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/components/ui/link";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Project } from "@/types/project";
import { ExternalLink } from "lucide-react";
import { ProjectToolbar } from "./ProjectToolbar";

interface ProjectHeaderProps {
  project: Project;
  ecosystems: Array<{ id: string; icon?: string; name?: string }>;
}

export function ProjectHeader({ project, ecosystems }: ProjectHeaderProps) {
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
    <div className="max-w-4xl space-y-6">
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <Avatar className="size-16 md:size-20 shrink-0">
            <AvatarImage
              src={project.logos?.[0]?.url}
              alt={project.name}
              className="object-cover"
            />
            <AvatarFallback className="bg-primary/10 text-primary text-xl md:text-2xl font-semibold">
              {project.name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-3 min-w-0 flex-1">
            {project.links?.web ? (
              <Link href={project.links.web} className="group">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight inline-flex items-center gap-2 group-hover:text-primary transition-colors">
                  {project.name}
                  <ExternalLink className="size-4 md:size-5 opacity-60 group-hover:opacity-100 transition-opacity" />
                </h1>
              </Link>
            ) : (
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                {project.name}
              </h1>
            )}

            {project.categories && project.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.categories.map((category, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs md:text-sm font-medium"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {project.description && (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="prose dark:prose-invert max-w-none cursor-help">
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground max-w-[70ch] line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-[70ch]">
                <p>{project.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {/* Ecosystems and Use Cases */}
        <div className="flex items-center gap-6 border-y py-4">
          {/* Ecosystems */}
          {project.ecosystem && project.ecosystem.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">
                Ecosystems:
              </span>
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
            </div>
          )}

          {/* Separator */}
          {project.ecosystem &&
            project.ecosystem.length > 0 &&
            useCases.length > 0 && (
              <Separator orientation="vertical" className="!h-6" />
            )}

          {/* Use Cases */}
          {useCases.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">
                Use Cases:
              </span>
              <TooltipProvider delayDuration={100}>
                <div className="flex flex-wrap gap-2 items-center">
                  {visibleUseCases.map((usecase, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs font-medium border-primary/20 text-primary hover:bg-primary/5"
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
            </div>
          )}
        </div>
      </div>
      <ProjectToolbar project={project} />
    </div>
  );
}
