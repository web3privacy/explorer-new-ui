import { getRanks } from "@/queries/ranks.queries";
import {
  Project,
  ProjectRatingItem,
  ProjectRating as ProjectRatingType,
} from "@/types/project";

export const RATING_COLORS = [
  "hsl(358, 77%, 30%)", // 1-10% - Dark red
  "hsl(11, 100%, 30%)", // 11-20% - Dark red-orange
  "hsl(25, 98%, 30%)", // 21-30% - Dark orange
  "hsl(35, 96%, 30%)", // 31-40% - Dark orange-yellow
  "hsl(48, 98%, 30%)", // 41-50% - Dark yellow
  "hsl(51, 100%, 30%)", // 51-60% - Dark yellow
  "hsl(72, 85%, 30%)", // 61-70% - Dark yellow-green
  "hsl(85, 85%, 30%)", // 71-80% - Dark green
  "hsl(102, 100%, 30%)", // 81-90% - Dark bright green
  "hsl(102, 100%, 30%)", // 91-100% - Dark bright green
] as const;

export const getRatingColor = (percentage: number): string => {
  // Handle edge cases
  if (percentage === 100) return "hsl(102, 100%, 30%)"; // Dark bright green
  if (percentage === 0) return "hsl(0, 0%, 30%)"; // Dark gray

  // Normalize percentage to 0-100 range
  const normalizedPercentage = Math.min(Math.max(percentage, 0), 100);

  // Calculate color index (0-9)
  const colorIndex = Math.floor(normalizedPercentage / 10);

  // Ensure we don't go out of bounds
  return RATING_COLORS[Math.min(colorIndex, RATING_COLORS.length - 1)];
};

export const getRatingColorClass = (percentage: number): string => {
  const color = getRatingColor(percentage);

  // Return Tailwind class with HSL color
  return `text-[${color}]`;
};

export const getRatingLabel = (percentage: number): string => {
  if (percentage >= 90) return "Excellent";
  if (percentage >= 80) return "Very Good";
  if (percentage >= 70) return "Good";
  if (percentage >= 60) return "Fair";
  if (percentage >= 50) return "Average";
  if (percentage >= 40) return "Below Average";
  if (percentage >= 30) return "Poor";
  if (percentage >= 20) return "Very Poor";
  if (percentage >= 10) return "Critical";
  return "Failing";
};

const getNestedField = (obj: unknown, path: string): unknown => {
  return path.split(".").reduce((current, key) => {
    if (current && typeof current === "object" && key in current) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
};

export const generateProjectRatings = async (
  project: Project
): Promise<ProjectRatingType[]> => {
  const ranks = await getRanks();
  if (!ranks) return [];

  return ranks.map((rank) => {
    let rankPoints = 0;
    let maxPoints = 0;
    const ratingStats: ProjectRatingItem[] = [];

    rank.references?.forEach((ref) => {
      let isValid = false;
      const field = ref.field.includes(".")
        ? getNestedField(project, ref.field)
        : project[ref.field as keyof Project];

      if (
        ref.label.positive === "Link" &&
        ref.label.name !== "Documentation" &&
        (ratingStats.some(
          (r) => r.positive === "Link" && r.label !== "Documentation" && r.value
        ) ||
          !field)
      ) {
        return;
      }

      let value = 0;
      let positive: string | undefined;

      if (ref.condition.minLength !== undefined) {
        value = Array.isArray(field) ? field.length : 0;
        if (value) {
          isValid = value >= ref.condition.minLength;
          positive = `${value} ${ref.label.positive}${value > 1 ? "s" : ""}`;
        }
      } else if (ref.condition.equals !== undefined) {
        value = field ? 1 : 0;
        isValid = field === ref.condition.equals;
      } else if (ref.condition.exists !== undefined) {
        value = field ? 1 : 0;
        isValid = ref.condition.exists ? !!field : !field;
      }

      if (ref.field === "compliance" && typeof field === "string") {
        positive = field;
      }

      rankPoints += isValid ? ref.points : 0;
      maxPoints += ref.points;

      ratingStats.push({
        isValid,
        label: ref.label.name,
        positive: positive ?? ref.label.positive,
        negative: ref.label.negative,
        value,
      });
    });

    return {
      type: rank.id,
      name: rank.name,
      items: ratingStats,
      points: rankPoints,
      percentagePoints: maxPoints > 0 ? (rankPoints / maxPoints) * 100 : 0,
    };
  });
};
