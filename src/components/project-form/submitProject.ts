import { ProjectDraft } from "./types";

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

/**
 * TODO(real-impl): generate YAML, upload the logo, and open a GitHub PR via
 * Octokit against explorer-data (see explorer-app/server/api/data.post.ts for
 * the reference flow). This stub only logs the assembled payload so the
 * frontend wizard can be built and tested before that backend exists.
 */
export async function submitProject(
  project: ProjectDraft
): Promise<{ ok: true; project: ProjectDraft }> {
  const payload = assembleProjectPayload(project);
  console.log("[project-form] assembled draft (not published):", payload);
  return { ok: true, project: payload };
}
