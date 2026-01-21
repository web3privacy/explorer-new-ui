import { generateProjectRatings, getRatingColor } from "@/lib/ratings";
import { Project } from "@/types/project";
import { Cpu, Eye, Lock } from "lucide-react";

interface ProjectBarsProps {
  project: Project;
}

const RATING_MAPPINGS = [
  { type: "openness", icon: Eye },
  { type: "technology", icon: Cpu },
  { type: "privacy", icon: Lock },
] as const;

export async function ProjectBars({ project }: ProjectBarsProps) {
  const ratings = await generateProjectRatings(project);

  if (!ratings || ratings.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 w-20">
      {RATING_MAPPINGS.map(({ type, icon: Icon }) => {
        const rating = ratings.find((r) => r.type.toLowerCase() === type);
        const percentage = rating?.percentagePoints ?? 0;
        const color = getRatingColor(percentage);

        return (
          <div key={type} className="flex items-center gap-2">
            <Icon className="w-3 h-3 text-muted-foreground" />
            <div className="flex-1">
              <div className="bg-primary/20 relative h-2 w-full overflow-hidden rounded-full">
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: color,
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
