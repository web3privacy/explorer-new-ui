import { Project } from "@/types";
import { ProjectFilters } from "@/types/projectFilters";
import _ from "lodash";

export function processProjects(
  projects: Project[],
  filters: ProjectFilters
): {
  total: number;
  paginated: Project[];
} {
  const {
    categories,
    ecosystems,
    usecases,
    sortBy,
    sortOrder = "asc",
    page = 1,
    pageSize = 20,
    q,
  } = filters;

  let result = projects;

  // 🔍 TEXT SEARCH FILTER
  if (q && q.trim() !== "") {
    const lowerQ = q.toLowerCase();
    result = result.filter((project) => {
      return (
        project.name.toLowerCase().includes(lowerQ) ||
        project.description?.toLowerCase().includes(lowerQ) ||
        project.categories?.some((cat) => cat.toLowerCase().includes(lowerQ)) ||
        project.ecosystem?.some((eco) => eco.toLowerCase().includes(lowerQ)) ||
        project.usecases?.some((uc) => uc.toLowerCase().includes(lowerQ))
      );
    });
  }

  // FILTERING
  result = _.filter(result, (project) => {
    const categoryMatch = categories?.length
      ? _.some(project.categories, (cat) => categories.includes(cat))
      : true;

    const ecosystemMatch = ecosystems?.length
      ? _.some(project.ecosystem, (eco) => ecosystems.includes(eco))
      : true;

    const usecaseMatch = usecases?.length
      ? _.some(project.usecases, (uc) => usecases.includes(uc))
      : true;

    return categoryMatch && ecosystemMatch && usecaseMatch;
  });

  // SORTING
  if (sortBy) {
    result = _.orderBy(result, [sortBy], [sortOrder]);
  }

  const total = result.length;
  // PAGINATION
  const paginated = _(result)
    .slice((page - 1) * pageSize, page * pageSize)
    .value();

  return {
    total,
    paginated,
  };
}
