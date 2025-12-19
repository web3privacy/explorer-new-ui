import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getProjects } from "@/queries/projects.queries";
import {
  ProjectFiltersSchema,
  projectsSearchParams,
} from "@/types/projectFilters";
import { generatePageNumbers } from "@/lib/pagination-utils";
import Link from "next/link";
import { createLoader, SearchParams } from "nuqs/server";
import { ProjectCard } from "./ProjectCard";

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

  const pageSize = data.pagination?.pageSize || 50;
  const totalPages =
    pageSize > 0
      ? Math.ceil((data.pagination?.total || 0) / pageSize)
      : 1;
  const currentPage = data.pagination?.page || 1;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function buildPageUrl(currentParams: Record<string, any>, newPage: number) {
    const params = new URLSearchParams(currentParams as Record<string, string>);
    params.set("page", newPage.toString());
    return `?${params.toString()}`;
  }

  return (
    <div>
      <div className="flex gap-2">
        <p className="text-sm text-muted-foreground mb-4">
          {data?.pagination?.total} projects found
        </p>

        <span className="text-sm text-muted-foreground">|</span>

        <p className="text-sm text-muted-foreground mb-4">
          Page {data?.pagination?.page} of {totalPages}
        </p>

        <span className="text-sm text-muted-foreground">|</span>

        <p className="text-sm text-muted-foreground mb-4">
          {data?.pagination?.pageSize} projects per page
        </p>
      </div>{" "}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.projects?.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
      <div className="flex justify-center gap-4 my-8">
        {/* Numbered Page Buttons */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {currentPage > 1 && (
              <Button variant="outline" size="sm" asChild>
                <Link href={buildPageUrl(params, currentPage - 1)}>
                  ← PREVIOUS
                </Link>
              </Button>
            )}

            {generatePageNumbers(currentPage, totalPages).map((page, index) => {
              if (page === "ellipsis") {
                // first ellipsis is always at index 1 (after page 1)
                const isFirstEllipsis = index === 1;
                const ellipsisKey = isFirstEllipsis
                  ? "ellipsis-start"
                  : `ellipsis-end-${index}`;

                return (
                  <span
                    key={ellipsisKey}
                    className="px-2 text-muted-foreground"
                    aria-label="More pages"
                    aria-hidden="true"
                  >
                    ...
                  </span>
                );
              }

              const isCurrentPage = page === currentPage;

              return (
                <Button
                  key={page}
                  variant={isCurrentPage ? "default" : "outline"}
                  size="sm"
                  asChild
                  aria-label={`Go to page ${page}`}
                  aria-current={isCurrentPage ? "page" : undefined}
                >
                  <Link href={buildPageUrl(params, page)}>{page}</Link>
                </Button>
              );
            })}

            {currentPage < totalPages && (
              <Button variant="outline" size="sm" asChild>
                <Link href={buildPageUrl(params, currentPage + 1)}>
                  NEXT →
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const PROJECTS_PER_PAGE = 6;
const CATEGORIES_PER_PROJECT = 2;
const ECOSYSTEMS_PER_PROJECT = 3;

ProjectsList.fallback = function () {
  return (
    <div>
      {" "}
      <div className="flex gap-2">
        {[...Array(3)].map((_, i) => (
          <div key={`stat-group-${i}`} className="flex gap-2">
            <Skeleton className="h-5 w-32" />
            {i < 2 && <span className="text-sm text-muted-foreground">|</span>}
          </div>
        ))}
      </div>{" "}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {[...Array(PROJECTS_PER_PAGE)].map((_, index) => (
          <li key={index}>
            <div className="bg-card rounded-lg border p-6 space-y-4">
              <div className="flex items-start gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-3/4" />
                  <div className="flex gap-1">
                    {[...Array(CATEGORIES_PER_PROJECT)].map((_, i) => (
                      <Skeleton key={`cat-${i}`} className="h-4 w-16" />
                    ))}
                  </div>
                </div>
              </div>
              <Skeleton className="h-12" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <div className="flex gap-1">
                  {[...Array(ECOSYSTEMS_PER_PROJECT)].map((_, i) => (
                    <Skeleton
                      key={`eco-${i}`}
                      className="h-6 w-6 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
