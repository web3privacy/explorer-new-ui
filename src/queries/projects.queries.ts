import { Project } from "@/types";

export async function getProjects(): Promise<Project[]> {
  const res = await fetch("https://explorer-data.web3privacy.info/");

  if (!res.ok) throw new Error("Error fetching projects");

  const data = await res.json();

  return data.projects;
}
