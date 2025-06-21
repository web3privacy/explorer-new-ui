import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Project } from "@/types/project";
import { ProjectToolbar } from "./ProjectToolbar";

interface ProjectHeaderProps {
  project: Project;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <div className="flex-1 space-y-6">
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
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              {project.name}
            </h1>

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
      </div>
      <ProjectToolbar project={project} />
    </div>
  );
}
