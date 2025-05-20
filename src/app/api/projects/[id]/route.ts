import { API_RESPONSE_KEYS, API_URLS } from "@/lib/constants";
import { Project } from "@/types";
import { NextRequest, NextResponse } from "next/server";

type ProjectResponse = {
  project?: Project;
  error?: string;
};

export type GETProjectResponse = ProjectResponse;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<GETProjectResponse>> {
  try {
    const res = await fetch(API_URLS.EXPLORER_DATA);
    const data = await res.json();
    const projects = data[API_RESPONSE_KEYS.PROJECTS] as Project[];
    const id = (await params).id;

    const project = projects.find((p) => p.id === id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}
