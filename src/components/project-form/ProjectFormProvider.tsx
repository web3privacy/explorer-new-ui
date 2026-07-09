"use client";

import * as React from "react";
import { createContext, useContext, useMemo, useReducer } from "react";

import { ProjectDraft, TAB_ORDER, TabId } from "./types";

const RESERVED_NAMES = ["untitled", "undefined", "create"];

interface ProjectFormState {
  draft: ProjectDraft;
  name: string;
  logoFile?: File;
  logoPreviewUrl?: string;
  activeTabIndex: number;
}

type Action =
  | { type: "UPDATE_DRAFT"; patch: ProjectDraft }
  | { type: "SET_NAME"; name: string }
  | { type: "SET_LOGO"; file: File; previewUrl: string }
  | { type: "SET_ACTIVE_TAB"; index: number };

function reducer(state: ProjectFormState, action: Action): ProjectFormState {
  switch (action.type) {
    case "UPDATE_DRAFT":
      return { ...state, draft: { ...state.draft, ...action.patch } };
    case "SET_NAME":
      return { ...state, name: action.name };
    case "SET_LOGO":
      return { ...state, logoFile: action.file, logoPreviewUrl: action.previewUrl };
    case "SET_ACTIVE_TAB":
      return { ...state, activeTabIndex: action.index };
    default:
      return state;
  }
}

interface ProjectFormContextValue {
  draft: ProjectDraft;
  name: string;
  nameError: string | undefined;
  logoPreviewUrl: string | undefined;
  activeTabIndex: number;
  activeTabId: TabId;
  updateDraft: (patch: ProjectDraft) => void;
  setName: (name: string) => void;
  setLogo: (file: File, previewUrl: string) => void;
  setActiveTabIndex: (index: number) => void;
}

const ProjectFormContext = createContext<ProjectFormContextValue | null>(null);

export function validateProjectName(name: string): string | undefined {
  const trimmed = name.trim();
  if (!trimmed) return "Project name is required";
  if (RESERVED_NAMES.includes(trimmed.toLowerCase())) {
    return "Please choose a real project name";
  }
  return undefined;
}

export function ProjectFormProvider({
  children,
  initialDraft,
  initialLogoUrl,
}: {
  children: React.ReactNode;
  initialDraft?: ProjectDraft;
  initialLogoUrl?: string;
}) {
  const [state, dispatch] = useReducer(reducer, {
    draft: initialDraft ?? {},
    name: initialDraft?.name ?? "Untitled",
    logoPreviewUrl: initialLogoUrl,
    activeTabIndex: 0,
  });

  const value = useMemo<ProjectFormContextValue>(
    () => ({
      draft: state.draft,
      name: state.name,
      nameError: validateProjectName(state.name),
      logoPreviewUrl: state.logoPreviewUrl,
      activeTabIndex: state.activeTabIndex,
      activeTabId: TAB_ORDER[state.activeTabIndex],
      updateDraft: (patch) => dispatch({ type: "UPDATE_DRAFT", patch }),
      setName: (name) => dispatch({ type: "SET_NAME", name }),
      setLogo: (file, previewUrl) => dispatch({ type: "SET_LOGO", file, previewUrl }),
      setActiveTabIndex: (index) => dispatch({ type: "SET_ACTIVE_TAB", index }),
    }),
    [state]
  );

  return (
    <ProjectFormContext.Provider value={value}>
      {children}
    </ProjectFormContext.Provider>
  );
}

export function useProjectForm() {
  const ctx = useContext(ProjectFormContext);
  if (!ctx) {
    throw new Error("useProjectForm must be used within a ProjectFormProvider");
  }
  return ctx;
}
