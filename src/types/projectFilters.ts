import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";
import { z } from "zod";

export const SORT_BY_OPTIONS = ["name", "created_at"] as const;
export const SORT_ORDER_OPTIONS = ["asc", "desc"] as const;

export type SortBy = (typeof SORT_BY_OPTIONS)[number];
export type SortOrder = (typeof SORT_ORDER_OPTIONS)[number];

export const ProjectFiltersSchema = z
  .object({
    categories: z.array(z.string()).optional(),
    ecosystems: z.array(z.string()).optional(),
    usecases: z.array(z.string()).optional(),
    sortBy: z.enum(SORT_BY_OPTIONS).optional(),
    sortOrder: z.enum(SORT_ORDER_OPTIONS).optional(),
    page: z.number().optional(),
    pageSize: z.number().optional(),
    q: z.string().optional(),
  })
  .strict();

export type ProjectFilters = z.infer<typeof ProjectFiltersSchema>;

export const projectsSearchParams = {
  categories: parseAsArrayOf(parseAsString).withDefault([]),
  ecosystems: parseAsArrayOf(parseAsString).withDefault([]),
  usecases: parseAsArrayOf(parseAsString).withDefault([]),
  sortBy: parseAsStringEnum([...SORT_BY_OPTIONS]).withDefault(
    [...SORT_BY_OPTIONS][0]
  ),
  sortOrder: parseAsStringEnum([...SORT_ORDER_OPTIONS]).withDefault(
    [...SORT_ORDER_OPTIONS][0]
  ),
  page: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(50),
  q: parseAsString.withDefault(""),
};
