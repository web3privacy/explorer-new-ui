import { Metadata } from "next";

import { ProjectCreateForm } from "@/components/project-form/ProjectCreateForm";
import { getAssetCustodyTypes } from "@/queries/assetCustodyTypes.queries";
import { getAssets } from "@/queries/assets.queries";
import { getCategories } from "@/queries/categories.queries";
import { getEcosystems } from "@/queries/ecosystems.queries";
import { getProjectPhases } from "@/queries/projectPhases.queries";
import { getSignInRequirements } from "@/queries/signInRequirements.queries";
import { getUsecases } from "@/queries/usecases.queries";

export const metadata: Metadata = {
  title: "Create Project - Web3Privacy Explorer",
  description: "Submit a new privacy-focused Web3 project to the explorer.",
};

export default async function ProjectCreatePage() {
  const [
    categories,
    usecases,
    ecosystems,
    assets,
    phases,
    custodyTypes,
    signInRequirements,
  ] = await Promise.all([
    getCategories(),
    getUsecases(),
    getEcosystems(),
    getAssets(),
    getProjectPhases(),
    getAssetCustodyTypes(),
    getSignInRequirements(),
  ]);

  return (
    <ProjectCreateForm
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
