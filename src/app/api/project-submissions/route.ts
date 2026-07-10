import { Octokit } from "@octokit/rest";
import { NextRequest, NextResponse } from "next/server";
import yaml from "yaml";

import {
  ProjectSubmissionRequest,
  ProjectSubmissionResponse,
} from "@/components/project-form/types";

const OWNER = "web3privacy";
const REPO = "explorer-data";
const BASE_BRANCH = "main";

function getOctokit(): Octokit {
  const auth = process.env.GITHUB_TOKEN;
  if (!auth) throw new Error("GITHUB_TOKEN not set");
  return new Octokit({ auth });
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

function extensionForMimeType(mimeType: string): string {
  const subtype = mimeType.split("/")[1] ?? "png";
  return subtype === "svg+xml" ? "svg" : subtype;
}

function parseDataUrl(dataUrl: string): { mimeType: string; base64: string } {
  const match = dataUrl.match(/^data:([^;]+);base64,([\s\S]*)$/);
  if (!match) throw new Error("Invalid logo data URL");
  return { mimeType: match[1], base64: match[2] };
}

async function projectExists(octokit: Octokit, id: string): Promise<boolean> {
  try {
    await octokit.repos.getContent({
      owner: OWNER,
      repo: REPO,
      path: `src/projects/${id}/index.yaml`,
      ref: BASE_BRANCH,
    });
    return true;
  } catch (error) {
    if (isOctokitNotFound(error)) return false;
    throw error;
  }
}

function isOctokitNotFound(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    (error as { status?: number }).status === 404
  );
}

export async function POST(
  req: NextRequest
): Promise<NextResponse<ProjectSubmissionResponse | { error: string }>> {
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

  const id = slugify(name);

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
    if (await projectExists(octokit, id)) {
      return NextResponse.json(
        { error: `A project with id '${id}' already exists` },
        { status: 409 }
      );
    }

    const yamlContent = yaml.stringify({ ...project, id });

    const { data: baseRef } = await octokit.git.getRef({
      owner: OWNER,
      repo: REPO,
      ref: `heads/${BASE_BRANCH}`,
    });

    const branch = `${id}-project-create-${Date.now()}`;
    await octokit.git.createRef({
      owner: OWNER,
      repo: REPO,
      ref: `refs/heads/${branch}`,
      sha: baseRef.object.sha,
    });

    await octokit.repos.createOrUpdateFileContents({
      owner: OWNER,
      repo: REPO,
      path: `src/projects/${id}/index.yaml`,
      message: `Create project: ${name}`,
      content: Buffer.from(yamlContent, "utf-8").toString("base64"),
      branch,
    });

    if (logoDataUrl) {
      const { mimeType, base64 } = parseDataUrl(logoDataUrl);
      const ext = extensionForMimeType(mimeType);
      await octokit.repos.createOrUpdateFileContents({
        owner: OWNER,
        repo: REPO,
        path: `src/projects/${id}/logo.${ext}`,
        message: `Add logo for project: ${name}`,
        content: base64,
        branch,
      });
    }

    const { data: pullRequest } = await octokit.pulls.create({
      owner: OWNER,
      repo: REPO,
      head: branch,
      base: BASE_BRANCH,
      title: `Create project: ${name}`,
      body: `Initiating the creation of project: ${name}`,
    });

    return NextResponse.json({ prUrl: pullRequest.html_url });
  } catch (error) {
    console.error("Error creating project submission PR:", error);
    return NextResponse.json(
      { error: "Failed to open pull request on explorer-data" },
      { status: 502 }
    );
  }
}
