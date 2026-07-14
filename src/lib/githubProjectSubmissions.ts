import { Octokit } from "@octokit/rest";

export const OWNER = "web3privacy";
export const REPO = "explorer-data";
export const BASE_BRANCH = "main";

export function getOctokit(): Octokit {
  const auth = process.env.GITHUB_TOKEN;
  if (!auth) throw new Error("GITHUB_TOKEN not set");
  return new Octokit({ auth });
}

export function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export function extensionForMimeType(mimeType: string): string {
  const subtype = mimeType.split("/")[1] ?? "png";
  return subtype === "svg+xml" ? "svg" : subtype;
}

export function parseDataUrl(dataUrl: string): {
  mimeType: string;
  base64: string;
} {
  const match = dataUrl.match(/^data:([^;]+);base64,([\s\S]*)$/);
  if (!match) throw new Error("Invalid logo data URL");
  return { mimeType: match[1], base64: match[2] };
}

export function isOctokitNotFound(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    (error as { status?: number }).status === 404
  );
}

export async function projectExists(
  octokit: Octokit,
  id: string
): Promise<boolean> {
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

/**
 * Creates or updates a file on a branch, fetching the existing blob's sha
 * first when the file already exists there (required by the GitHub API to
 * update in place rather than error with a conflict).
 */
export async function upsertFile(
  octokit: Octokit,
  path: string,
  content: string,
  branch: string,
  message: string
): Promise<void> {
  let sha: string | undefined;
  try {
    const { data } = await octokit.repos.getContent({
      owner: OWNER,
      repo: REPO,
      path,
      ref: branch,
    });
    if (!Array.isArray(data)) sha = data.sha;
  } catch (error) {
    if (!isOctokitNotFound(error)) throw error;
  }

  await octokit.repos.createOrUpdateFileContents({
    owner: OWNER,
    repo: REPO,
    path,
    message,
    content,
    branch,
    sha,
  });
}

/**
 * Deletes every file in a folder on a branch. Used for the project-rename
 * case, where the old src/projects/{old-id}/ folder must be removed after
 * its contents are recreated at the new slug's path.
 */
export async function deleteFolder(
  octokit: Octokit,
  path: string,
  branch: string,
  message: string
): Promise<void> {
  const { data } = await octokit.repos.getContent({
    owner: OWNER,
    repo: REPO,
    path,
    ref: branch,
  });

  if (!Array.isArray(data)) return;

  for (const entry of data) {
    await octokit.repos.deleteFile({
      owner: OWNER,
      repo: REPO,
      path: entry.path,
      message,
      sha: entry.sha,
      branch,
    });
  }
}
