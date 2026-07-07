"use client";

import { Input } from "@/components/ui/input";
import { Project } from "@/types/project";

import { useProjectForm } from "../ProjectFormProvider";
import { FormField } from "../shared/FormField";
import { SectionDivider } from "../shared/SectionDivider";

type Links = NonNullable<Project["links"]>;

const GROUP_A: { key: keyof Links; label: string }[] = [
  { key: "web", label: "Website" },
  { key: "blog", label: "Blog" },
  { key: "github", label: "GitHub" },
  { key: "forum", label: "Forum" },
];

const GROUP_TECH: { key: keyof Links; label: string }[] = [
  { key: "docs", label: "Docs" },
  { key: "whitepaper", label: "Whitepaper" },
  { key: "block_explorer", label: "Block explorer" },
  { key: "governance", label: "Governance" },
];

const GROUP_SOCIAL: { key: keyof Links; label: string }[] = [
  { key: "twitter", label: "Twitter / X" },
  { key: "discord", label: "Discord" },
  { key: "telegram", label: "Telegram" },
  { key: "lens", label: "Lens" },
  { key: "farcaster", label: "Farcaster" },
];

export function LinksTab() {
  const { draft, updateDraft } = useProjectForm();
  const links = draft.links ?? {};

  const setLink = (key: keyof Links, value: string) => {
    updateDraft({ links: { ...links, [key]: value } });
  };

  const renderGroup = (fields: { key: keyof Links; label: string }[]) => (
    <div className="grid gap-6 lg:grid-cols-2">
      {fields.map(({ key, label }) => (
        <FormField key={key} label={label}>
          <Input
            value={(links[key] as string) ?? ""}
            onChange={(e) => setLink(key, e.target.value)}
            placeholder={`https://...`}
          />
        </FormField>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-6 py-8">
      {renderGroup(GROUP_A)}
      <SectionDivider title="Technology details" />
      {renderGroup(GROUP_TECH)}
      <SectionDivider title="Social networks" />
      {renderGroup(GROUP_SOCIAL)}
    </div>
  );
}
