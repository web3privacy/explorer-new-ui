import { Project, ProjectFilters } from "@/types";
import _ from "lodash";

export function processData(
  projects: Project[],
  params: ProjectFilters
): Project[] {
  const {
    filters = {},
    sortBy,
    sortDirection = "asc",
    page = 1,
    pageSize = 10,
  } = params;

  let result = projects;

  // ✅ Filtrar usando _.matches
  if (filters.categories?.length) {
    result = _.filter(
      result,
      (project) =>
        _.intersection(project.categories, filters.categories!).length > 0
    );
  }

  if (filters.ecosystems?.length) {
    result = _.filter(
      result,
      (project) =>
        _.intersection(project.ecosystem, filters.ecosystems!).length > 0
    );
  }

  // ✅ Ordenar si se pidió
  if (sortBy) {
    result = _.orderBy(result, [sortBy], [sortDirection]);
  }

  // ✅ Paginar
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return _.slice(result, start, end) as Project[];
}

export async function getProjects(
  filters: ProjectFilters = {}
): Promise<Project[]> {
  const res = await fetch("https://explorer-data.web3privacy.info/");

  if (!res.ok) throw new Error("Error fetching projects");

  const data = await res.json();

  return processData(data.projects, filters);
}
