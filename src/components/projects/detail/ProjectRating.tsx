import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  generateProjectRatings,
  getRatingColor,
  getRatingLabel,
} from "@/lib/ratings";
import { Project, type ProjectRating } from "@/types/project";

interface ProjectRatingProps {
  project: Project;
  size?: number;
}

const PieSlice = ({
  startAngle,
  endAngle,
  color,
  radius,
  strokeColor,
  strokeWidth,
}: {
  startAngle: number;
  endAngle: number;
  color: string;
  radius: number;
  strokeColor: string;
  strokeWidth: number;
}) => {
  const cx = radius;
  const cy = radius;
  const startRad = ((startAngle - 90) * Math.PI) / 180;
  const endRad = ((endAngle - 90) * Math.PI) / 180;
  const x1 = cx + radius * Math.cos(startRad);
  const y1 = cy + radius * Math.sin(startRad);
  const x2 = cx + radius * Math.cos(endRad);
  const y2 = cy + radius * Math.sin(endRad);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
  const d = `M ${cx},${cy} L ${x1},${y1} A ${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2} Z`;
  return (
    <path d={d} fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
  );
};

const TooltipContentComponent = ({ ratings }: { ratings: ProjectRating[] }) => {
  const radius = 50;
  const sliceAngle = 360 / ratings.length;

  return (
    <div className="flex items-center gap-4">
      <svg
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        width={80}
        height={80}
        className="transform -rotate-90"
      >
        {ratings.map((rating, index) => (
          <PieSlice
            key={rating.type}
            startAngle={index * sliceAngle}
            endAngle={index * sliceAngle + sliceAngle}
            color={getRatingColor(rating.percentagePoints)}
            radius={radius}
            strokeColor="#1F2937"
            strokeWidth={2}
          />
        ))}
      </svg>
      <div className="space-y-1">
        {ratings.map((rating) => {
          const color = getRatingColor(rating.percentagePoints);
          const label = getRatingLabel(rating.percentagePoints);
          return (
            <div key={rating.type} className="text-xs">
              <span className="text-muted-foreground">{rating.name}:</span>{" "}
              <span className="font-bold" style={{ color }}>
                {rating.percentagePoints.toFixed(1)}% ({label})
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export async function ProjectRating({
  project,
  size = 40,
}: ProjectRatingProps) {
  const ratings = await generateProjectRatings(project);

  if (!ratings || ratings.length === 0) {
    return null;
  }

  const sliceAngle = 360 / ratings.length;
  const radius = 50;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <svg
            viewBox={`0 0 ${radius * 2} ${radius * 2}`}
            width={size}
            height={size}
            className="transform -rotate-90 cursor-pointer"
          >
            {ratings.map((rating, index) => {
              const startAngle = index * sliceAngle;
              const endAngle = startAngle + sliceAngle;
              const color = getRatingColor(rating.percentagePoints);
              return (
                <PieSlice
                  key={rating.type}
                  startAngle={startAngle}
                  endAngle={endAngle}
                  color={color}
                  radius={radius}
                  strokeColor="#1F2937"
                  strokeWidth={2}
                />
              );
            })}
          </svg>
        </TooltipTrigger>
        <TooltipContent className="p-4 bg-muted border-2">
          <TooltipContentComponent ratings={ratings} />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
