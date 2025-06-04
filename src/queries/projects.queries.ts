import { GETProjectsResponse } from "@/app/api/projects/route";
import { ProjectFilters } from "@/types/projectFilters";

export const createParams = (filters: ProjectFilters): string => {
  const params = new URLSearchParams();

  if (filters.categories) {
    filters.categories.forEach((cat) => params.append("categories", cat));
  }

  if (filters.ecosystems) {
    filters.ecosystems.forEach((eco) => params.append("ecosystems", eco));
  }
  if (filters.usecases) {
    filters.usecases.forEach((usecase) => params.append("usecases", usecase));
  }

  if (filters.sortBy) params.set("sortBy", filters.sortBy);
  if (filters.sortOrder) params.set("sortOrder", filters.sortOrder);
  if (filters.page) params.set("page", filters.page.toString());
  if (filters.pageSize) params.set("pageSize", filters.pageSize.toString());
  if (filters.q) params.set("q", filters.q);
  return params.toString();
};

export async function getProjects(
  filters: ProjectFilters = {}
): Promise<GETProjectsResponse> {
  const queryString = createParams(filters);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/api/projects?${queryString}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch projects: ${res.statusText}`);
  }

  return res.json();
}

export async function getProject(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/projects/${id}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch project");
  }

  return data.project;
}
