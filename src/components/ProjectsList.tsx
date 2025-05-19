import { getProjects } from "@/queries/projects.queries";
import {
  ProjectFiltersSchema,
  projectsSearchParams,
} from "@/types/projectFilters";
import { createLoader, SearchParams } from "nuqs/server";

const loadSearchParams = createLoader(projectsSearchParams);

export async function ProjectsList({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await loadSearchParams(searchParams);

  const filtersResult = ProjectFiltersSchema.safeParse(params);

  if (!filtersResult.success) {
    return (
      <div className="min-h-screen p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-500">
          Invalid query parameters: {filtersResult.error.message}
        </p>
      </div>
    );
  }

  const data = await getProjects(params);
  if (data?.error) {
    return (
      <div className="min-h-screen p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-500">{data.error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-2">
        <p className="text-sm text-muted-foreground mb-4">
          {data?.pagination?.total} projects found
        </p>

        <span>°</span>

        <p className="text-sm text-muted-foreground mb-4">
          Page {data?.pagination?.page} of{" "}
          {Math.ceil(
            (data?.pagination?.total || 0) / (data?.pagination?.pageSize || 1)
          )}
        </p>

        <span>°</span>

        <p className="text-sm text-muted-foreground mb-4">
          {data?.pagination?.pageSize} projects per page
        </p>
      </div>

      <ul className="space-y-4 grid grid-cols-3 gap-4">
        {data?.projects?.map((project) => (
          <li
            key={project.id}
            className="bg-muted max-h-100 border p-4 space-y-2 rounded-lg shadow-sm"
          >
            <h2 className="text-lg font-semibold">{project.name}</h2>

            <p className="text-sm text-muted-foreground line-clamp-1 overflow-ellipsis">
              {project.description || "Sin descripción"}
            </p>

            {project.categories && project.categories.length > 0 && (
              <p className="text-xs">🏷️Categories:</p>
            )}
            <ul>
              {project.categories?.map((category, index) => (
                <li key={index} className="text-xs text-muted-foreground">
                  {category}
                </li>
              ))}
            </ul>

            {project.ecosystem && project.ecosystem.length > 0 && (
              <p className="text-xs">⚛️ Ecosystems:</p>
            )}
            <ul>
              {project.ecosystem?.map((ecosystem, index) => (
                <li key={index} className="text-xs text-muted-foreground">
                  {ecosystem}
                </li>
              ))}
            </ul>

            <p className="line-clamp-3 text-xs text-muted-foreground">
              {project.links?.twitter}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
