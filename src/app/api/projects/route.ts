import { API_RESPONSE_KEYS, API_URLS } from "@/lib/constants";
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
  [API_RESPONSE_KEYS.PROJECTS]?: Project[];
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
    const res = await fetch(API_URLS.EXPLORER_DATA);
    const allProjects = await res.json();

    const { total, paginated } = processProjects(
      allProjects[API_RESPONSE_KEYS.PROJECTS],
      filters
    );

    return NextResponse.json({
      [API_RESPONSE_KEYS.PROJECTS]: paginated,
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
