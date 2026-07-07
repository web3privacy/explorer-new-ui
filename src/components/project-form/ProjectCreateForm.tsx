"use client";

import { useRouter } from "next/navigation";
import * as React from "react";

import {
  ProjectFormProvider,
  useProjectForm,
} from "./ProjectFormProvider";
import { ProjectFormFooter } from "./ProjectFormFooter";
import { ProjectFormHeader } from "./ProjectFormHeader";
import { ProjectFormTabNav } from "./ProjectFormTabNav";
import { submitProject } from "./submitProject";
import { AssetsTab } from "./tabs/AssetsTab";
import { BasicInfoTab } from "./tabs/BasicInfoTab";
import { FundingTab } from "./tabs/FundingTab";
import { HistoryTab } from "./tabs/HistoryTab";
import { LinksTab } from "./tabs/LinksTab";
import { PrivacyTab } from "./tabs/PrivacyTab";
import { SecurityTab } from "./tabs/SecurityTab";
import { TeamTab } from "./tabs/TeamTab";
import { TechnologyTab } from "./tabs/TechnologyTab";
import { BasicInfoTabHandle, ProjectFormReferenceData } from "./types";

interface ProjectCreateFormProps {
  referenceData: ProjectFormReferenceData;
}

export function ProjectCreateForm({ referenceData }: ProjectCreateFormProps) {
  return (
    <ProjectFormProvider>
      <ProjectCreateFormInner referenceData={referenceData} />
    </ProjectFormProvider>
  );
}

function ProjectCreateFormInner({ referenceData }: ProjectCreateFormProps) {
  const router = useRouter();
  const { draft, activeTabId } = useProjectForm();
  const basicInfoRef = React.useRef<BasicInfoTabHandle>(null);
  const [isPublishing, setIsPublishing] = React.useState(false);
  const [submitState, setSubmitState] = React.useState<
    "success" | "error" | undefined
  >();

  const handleCancel = () => router.push("/");

  const handlePublish = async () => {
    if (activeTabId === "basic-info") {
      const valid = await basicInfoRef.current?.validate();
      if (!valid) return;
    }

    setIsPublishing(true);
    try {
      await submitProject(draft);
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 pb-32 md:px-6 lg:px-8">
      <ProjectFormHeader />
      <ProjectFormTabNav />

      {activeTabId === "basic-info" && (
        <BasicInfoTab
          ref={basicInfoRef}
          categories={referenceData.categories}
          usecases={referenceData.usecases}
          ecosystems={referenceData.ecosystems}
        />
      )}
      {activeTabId === "assets" && <AssetsTab assets={referenceData.assets} />}
      {activeTabId === "links" && <LinksTab />}
      {activeTabId === "technology" && (
        <TechnologyTab
          phases={referenceData.phases}
          custodyTypes={referenceData.custodyTypes}
        />
      )}
      {activeTabId === "privacy" && (
        <PrivacyTab signInRequirements={referenceData.signInRequirements} />
      )}
      {activeTabId === "security" && <SecurityTab />}
      {activeTabId === "team" && <TeamTab />}
      {activeTabId === "funding" && <FundingTab />}
      {activeTabId === "history" && <HistoryTab />}

      <ProjectFormFooter
        onCancel={handleCancel}
        onPublish={handlePublish}
        isPublishing={isPublishing}
        submitState={submitState}
      />
    </div>
  );
}
