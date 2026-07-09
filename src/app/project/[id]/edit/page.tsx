import { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectForm } from "@/components/project-form/ProjectForm";
import { getAssetCustodyTypes } from "@/queries/assetCustodyTypes.queries";
import { getAssets } from "@/queries/assets.queries";
import { getCategories } from "@/queries/categories.queries";
import { getEcosystems } from "@/queries/ecosystems.queries";
import { getProject } from "@/queries/projects.queries";
import { getProjectPhases } from "@/queries/projectPhases.queries";
import { getSignInRequirements } from "@/queries/signInRequirements.queries";
import { getUsecases } from "@/queries/usecases.queries";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const project = await getProject(id);
    return { title: `Edit ${project.name} - Web3Privacy Explorer` };
  } catch {
    return { title: "Project Not Found - Web3Privacy Explorer" };
  }
}

export default async function ProjectEditPage({ params }: PageProps) {
  const { id } = await params;

  const [
    project,
    categories,
    usecases,
    ecosystems,
    assets,
    phases,
    custodyTypes,
    signInRequirements,
  ] = await Promise.all([
    getProject(id).catch(() => notFound()),
    getCategories(),
    getUsecases(),
    getEcosystems(),
    getAssets(),
    getProjectPhases(),
    getAssetCustodyTypes(),
    getSignInRequirements(),
  ]);

  return (
    <ProjectForm
      mode="edit"
      projectId={id}
      initialDraft={project}
      initialLogoUrl={project.logos?.[0]?.url}
      referenceData={{
        categories,
        usecases,
        ecosystems,
        assets,
        phases,
        custodyTypes,
        signInRequirements,
      }}
    />
  );
}
