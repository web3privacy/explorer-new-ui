import { getRanks } from "@/queries/ranks.queries";
import {
  Project,
  ProjectRatingItem,
  ProjectRating as ProjectRatingType,
} from "@/types/project";

export const RATING_COLORS = [
  "#EA171D", // 1-10%
  "#FB2D00", // 11-20%
  "#FD6515", // 21-30%
  "#FD941A", // 31-40%
  "#FECD0A", // 41-50%
  "#FFD806", // 51-60%
  "#D2EF1F", // 61-70%
  "#95DF1C", // 71-80%
  "#42FF00", // 81-90%
  "#42FF00", // 91-100%
] as const;

export const getRatingColor = (percentage: number): string => {
  // Handle edge cases
  if (percentage === 100) return "#42FF00";
  if (percentage === 0) return "#494949";

  // Normalize percentage to 0-100 range
  const normalizedPercentage = Math.min(Math.max(percentage, 0), 100);

  // Calculate color index (0-9)
  const colorIndex = Math.floor(normalizedPercentage / 10);

  // Ensure we don't go out of bounds
  return RATING_COLORS[Math.min(colorIndex, RATING_COLORS.length - 1)];
};

export const getRatingColorClass = (percentage: number): string => {
  const color = getRatingColor(percentage);

  // Convert hex to CSS custom property or use inline style
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
