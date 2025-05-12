import { processProjects } from "@/lib/processProjects";
import { Project } from "@/types";
import {
  ProjectFiltersSchema,
  projectsSearchParams,
} from "@/types/projectFilters";

import { NextRequest, NextResponse } from "next/server";
import { createLoader } from "nuqs/server";

const loadSearchParams = createLoader(projectsSearchParams);

type ProjectsResponse = {
  projects?: Project[];
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
  };
  error?: string;
};

export type GETProjectsResponse = ProjectsResponse;

export async function GET(
  req: NextRequest
): Promise<NextResponse<GETProjectsResponse>> {
  const { searchParams } = req.nextUrl;

  const params = await loadSearchParams(searchParams);

  const filtersResult = ProjectFiltersSchema.safeParse(params);

  if (!filtersResult.success) {
    return NextResponse.json(
      {
        error: "Invalid query parameters",
        details: filtersResult.error.flatten(),
      },
      { status: 400 }
    );
  }

  const filters = filtersResult.data;

  try {
    const res = await fetch("https://explorer-data.web3privacy.info/");
    const allProjects = await res.json();

    const { total, paginated } = processProjects(allProjects.projects, filters);

    return NextResponse.json({
      projects: paginated,
      pagination: {
        page: filters.page!,
        pageSize: filters.pageSize!,
        total: total,
      },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);

    return NextResponse.json(
      { error: "Failed to fetch or process projects" },
      { status: 500 }
    );
  }
}
