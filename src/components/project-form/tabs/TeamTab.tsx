"use client";

import { Input } from "@/components/ui/input";
import { Team } from "@/types/team";

import { useProjectForm } from "../ProjectFormProvider";
import { RepeatableListEditor } from "../shared/RepeatableListEditor";
import { SectionDivider } from "../shared/SectionDivider";
import { ToggleField } from "../shared/ToggleField";

type TeamMember = NonNullable<Team["teammembers"]>[number];

const EMPTY_MEMBER: TeamMember = { name: "", link: "" };

export function TeamTab() {
  const { draft, updateDraft } = useProjectForm();
  const team = draft.team ?? {};
  const members = team.teammembers ?? [];

  return (
    <div className="flex flex-col gap-6 py-8">
      <ToggleField
        label="Anonymous team"
        checked={!!team.anonymous}
        onCheckedChange={(v) => updateDraft({ team: { ...team, anonymous: v } })}
      />

      <SectionDivider title="Team members" />

      <RepeatableListEditor<TeamMember>
        items={members}
        emptyItem={EMPTY_MEMBER}
        isRowValid={(item) => !!item.name?.trim()}
        onAdd={(item) =>
          updateDraft({ team: { ...team, teammembers: [...members, item] } })
        }
        onRemove={(index) =>
          updateDraft({
            team: {
              ...team,
              teammembers: members.filter((_, i) => i !== index),
            },
          })
        }
        addButtonLabel="ADD MEMBER"
        renderSavedRow={(item) => ({ label: item.name ?? "", desc: item.link })}
        renderAddForm={(newItem, setNewItem) => (
          <>
            <Input
              placeholder="Name"
              value={newItem.name ?? ""}
              onChange={(e) =>
                setNewItem({ ...newItem, name: e.target.value })
              }
            />
            <Input
              placeholder="Link"
              value={newItem.link ?? ""}
              onChange={(e) =>
                setNewItem({ ...newItem, link: e.target.value })
              }
            />
          </>
        )}
      />
    </div>
  );
}
