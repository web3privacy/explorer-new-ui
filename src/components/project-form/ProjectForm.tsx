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
import { submitProject, updateProject } from "./submitProject";
import { AssetsTab } from "./tabs/AssetsTab";
import { BasicInfoTab } from "./tabs/BasicInfoTab";
import { FundingTab } from "./tabs/FundingTab";
import { HistoryTab } from "./tabs/HistoryTab";
import { LinksTab } from "./tabs/LinksTab";
import { PrivacyTab } from "./tabs/PrivacyTab";
import { SecurityTab } from "./tabs/SecurityTab";
import { TeamTab } from "./tabs/TeamTab";
import { TechnologyTab } from "./tabs/TechnologyTab";
import {
  BasicInfoTabHandle,
  ProjectDraft,
  ProjectFormReferenceData,
} from "./types";

interface ProjectFormProps {
  mode: "create" | "edit";
  projectId?: string;
  initialDraft?: ProjectDraft;
  initialLogoUrl?: string;
  referenceData: ProjectFormReferenceData;
}

export function ProjectForm({
  mode,
  projectId,
  initialDraft,
  initialLogoUrl,
  referenceData,
}: ProjectFormProps) {
  return (
    <ProjectFormProvider initialDraft={initialDraft} initialLogoUrl={initialLogoUrl}>
      <ProjectFormInner
        mode={mode}
        projectId={projectId}
        referenceData={referenceData}
      />
    </ProjectFormProvider>
  );
}

interface ProjectFormInnerProps {
  mode: "create" | "edit";
  projectId?: string;
  referenceData: ProjectFormReferenceData;
}

function ProjectFormInner({
  mode,
  projectId,
  referenceData,
}: ProjectFormInnerProps) {
  const router = useRouter();
  const { draft, activeTabId, logoPreviewUrl, name, nameError } =
    useProjectForm();
  const basicInfoRef = React.useRef<BasicInfoTabHandle>(null);
  const [isPublishing, setIsPublishing] = React.useState(false);
  const [prUrl, setPrUrl] = React.useState<string>();
  const [errorMessage, setErrorMessage] = React.useState<string>();

  const handleCancel = () =>
    router.push(mode === "edit" ? `/project/${projectId}` : "/");

  const handlePublish = async () => {
    if (nameError) {
      setErrorMessage(nameError);
      return;
    }

    if (activeTabId === "basic-info") {
      const valid = await basicInfoRef.current?.validate();
      if (!valid) return;
    }

    // The existing logo is a plain https:// URL; only a freshly uploaded
    // file (a data: URL) should ever be sent to the submission API.
    const logoDataUrl = logoPreviewUrl?.startsWith("data:")
      ? logoPreviewUrl
      : undefined;

    setIsPublishing(true);
    setErrorMessage(undefined);
    try {
      const result =
        mode === "edit"
          ? await updateProject(projectId!, { ...draft, name }, logoDataUrl)
          : await submitProject({ ...draft, name }, logoDataUrl);
      setPrUrl(result.prUrl);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to submit project"
      );
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
        prUrl={prUrl}
        errorMessage={errorMessage}
        publishLabel={mode === "edit" ? "SAVE CHANGES" : "PUBLISH"}
        publishingLabel={mode === "edit" ? "SAVING..." : "PUBLISHING..."}
      />
    </div>
  );
}
