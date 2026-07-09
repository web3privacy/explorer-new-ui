import { Octokit } from "@octokit/rest";
import { NextRequest, NextResponse } from "next/server";
import yaml from "yaml";

import {
  ProjectSubmissionRequest,
  ProjectSubmissionResponse,
} from "@/components/project-form/types";
import {
  BASE_BRANCH,
  OWNER,
  REPO,
  deleteFolder,
  extensionForMimeType,
  getOctokit,
  parseDataUrl,
  projectExists,
  slugify,
  upsertFile,
} from "@/lib/githubProjectSubmissions";

type RouteParams = { params: Promise<{ id: string }> };

export async function PUT(
  req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<ProjectSubmissionResponse | { error: string }>> {
  const { id: originalId } = await params;

  let body: ProjectSubmissionRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { project, logoDataUrl } = body;
  const name = project.name;
  if (!name) {
    return NextResponse.json(
      { error: "Project name is required" },
      { status: 400 }
    );
  }

  let octokit: Octokit;
  try {
    octokit = getOctokit();
  } catch (error) {
    console.error("GitHub auth not configured:", error);
    return NextResponse.json(
      { error: "GitHub integration is not configured" },
      { status: 500 }
    );
  }

  try {
    if (!(await projectExists(octokit, originalId))) {
      return NextResponse.json(
        { error: `Project '${originalId}' not found` },
        { status: 404 }
      );
    }

    const newId = slugify(name);
    const yamlContent = yaml.stringify({ ...project, id: newId });

    const { data: baseRef } = await octokit.git.getRef({
      owner: OWNER,
      repo: REPO,
      ref: `heads/${BASE_BRANCH}`,
    });

    const branch = `${newId}-project-update-${Date.now()}`;
    await octokit.git.createRef({
      owner: OWNER,
      repo: REPO,
      ref: `refs/heads/${branch}`,
      sha: baseRef.object.sha,
    });

    if (newId !== originalId) {
      await deleteFolder(
        octokit,
        `src/projects/${originalId}`,
        branch,
        `Removing old project folder: ${originalId}`
      );
    }

    await upsertFile(
      octokit,
      `src/projects/${newId}/index.yaml`,
      Buffer.from(yamlContent, "utf-8").toString("base64"),
      branch,
      `Update project: ${originalId}`
    );

    if (logoDataUrl) {
      const { mimeType, base64 } = parseDataUrl(logoDataUrl);
      const ext = extensionForMimeType(mimeType);
      await upsertFile(
        octokit,
        `src/projects/${newId}/logo.${ext}`,
        base64,
        branch,
        `Update logo for project: ${originalId}`
      );
    }

    const { data: pullRequest } = await octokit.pulls.create({
      owner: OWNER,
      repo: REPO,
      head: branch,
      base: BASE_BRANCH,
      title: `Update project: ${originalId}`,
      body: `Updating the project: ${originalId}`,
    });

    return NextResponse.json({ prUrl: pullRequest.html_url });
  } catch (error) {
    console.error("Error creating project update PR:", error);
    return NextResponse.json(
      { error: "Failed to open pull request on explorer-data" },
      { status: 502 }
    );
  }
}
