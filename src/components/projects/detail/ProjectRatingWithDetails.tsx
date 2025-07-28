"use client";
import {
  generateProjectRatings,
  getRatingColor,
  getRatingLabel,
} from "@/lib/ratings";
import type { Project, ProjectRating } from "@/types/project";
import { useEffect, useState } from "react";

// PieSlice from your ProjectRating.tsx
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

export function ProjectRatingWithDetails({
  project,
  size = 160,
}: {
  project: Project;
  size?: number;
}) {
  const [ratings, setRatings] = useState<ProjectRating[]>([]);
  useEffect(() => {
    (async () => {
      const r = await generateProjectRatings(project);
      setRatings(r);
    })();
  }, [project]);

  if (!ratings || ratings.length === 0) return null;

  const sliceAngle = 360 / ratings.length;
  const radius = size / 2;

  return (
    <div className="flex flex-col items-center bg-card rounded-xl p-6 shadow-md w-full max-w-xs">
      {/* Pie Chart */}
      <svg
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        width={size}
        height={size}
        className="transform -rotate-90 mb-4"
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
      {/* Always-visible details */}
      <div className="w-full space-y-2">
        {["openess", "technology", "privacy"].map((type) => {
          const rating = ratings.find((r) => r.type.toLowerCase() === type);
          if (!rating) return null;
          const color = getRatingColor(rating.percentagePoints);
          const label = getRatingLabel(rating.percentagePoints);
          return (
            <div
              key={type}
              className="flex items-center justify-between text-sm border-b last:border-b-0 pb-1"
            >
              <span className="font-medium capitalize" style={{ color }}>
                {rating.name}:
              </span>
              <span className="font-bold" style={{ color }}>
                {rating.percentagePoints.toFixed(1)}% ({label})
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
