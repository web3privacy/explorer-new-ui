import { Asset } from "@/types/asset";
import { Category } from "@/types/category";
import { Ecosystem } from "@/types/ecosystem";
import { Project } from "@/types/project";
import { ReferenceItem } from "@/types/referenceItem";
import { Usecase } from "@/types/usecase";

export const TAB_ORDER = [
  "basic-info",
  "assets",
  "links",
  "technology",
  "privacy",
  "security",
  "team",
  "funding",
  "history",
] as const;

export type TabId = (typeof TAB_ORDER)[number];

export const TAB_LABELS: Record<TabId, string> = {
  "basic-info": "Basic Info",
  assets: "Assets",
  links: "Links",
  technology: "Technology",
  privacy: "Privacy",
  security: "Security",
  team: "Team",
  funding: "Funding",
  history: "History",
};

export type ProjectDraft = Partial<Project>;

export interface ProjectFormReferenceData {
  categories: Category[];
  usecases: Usecase[];
  ecosystems: Ecosystem[];
  assets: Asset[];
  phases: ReferenceItem[];
  custodyTypes: ReferenceItem[];
  signInRequirements: ReferenceItem[];
}

export interface BasicInfoTabHandle {
  validate: () => Promise<boolean>;
}
