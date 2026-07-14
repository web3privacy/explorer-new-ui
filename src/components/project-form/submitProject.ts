import { ProjectDraft, ProjectSubmissionResponse } from "./types";

/**
 * Assembles the final payload from the in-progress draft, computing the
 * fields that are derived rather than directly edited (mirrors the Vue
 * form's save()/publish() logic).
 */
export function assembleProjectPayload(draft: ProjectDraft): ProjectDraft {
  const tokens = draft.tokens ?? [];
  const version = draft.project_status?.version;

  return {
    ...draft,
    have_token: tokens.some((token) => !!token.contract_address),
    privacy_policy: {
      defined: !!draft.privacy_policy?.link,
      ...draft.privacy_policy,
    },
    project_status: draft.project_status
      ? {
          ...draft.project_status,
          live_status: !!version,
          mainnet: version === "mainnet",
          testnet: version === "testnet",
        }
      : undefined,
  };
}

export async function submitProject(
  project: ProjectDraft,
  logoDataUrl?: string
): Promise<ProjectSubmissionResponse> {
  const payload = assembleProjectPayload(project);
  const res = await fetch("/api/project-submissions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ project: payload, logoDataUrl }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to submit project");
  }
  return data;
}

export async function updateProject(
  originalId: string,
  project: ProjectDraft,
  logoDataUrl?: string
): Promise<ProjectSubmissionResponse> {
  const payload = assembleProjectPayload(project);
  const res = await fetch(`/api/project-submissions/${originalId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ project: payload, logoDataUrl }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to update project");
  }
  return data;
}
