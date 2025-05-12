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
    sortBy,
    sortOrder = "asc",
    page = 1,
    pageSize = 20,
  } = filters;

  let result = projects;

  // FILTERING
  result = _.filter(result, (project) => {
    const categoryMatch = categories?.length
      ? _.some(project.categories, (cat) => categories.includes(cat))
      : true;

    const ecosystemMatch = ecosystems?.length
      ? _.some(project.ecosystem, (eco) => ecosystems.includes(eco))
      : true;

    return categoryMatch && ecosystemMatch;
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
