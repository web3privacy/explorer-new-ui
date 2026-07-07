"use client";

import { Input } from "@/components/ui/input";
import { Fund } from "@/types/fund";

import { useProjectForm } from "../ProjectFormProvider";
import { RepeatableListEditor } from "../shared/RepeatableListEditor";
import { SectionDivider } from "../shared/SectionDivider";

const EMPTY_FUND: Fund = { name: "", link: "" };

export function FundingTab() {
  const { draft, updateDraft } = useProjectForm();
  const funding = draft.funding ?? [];

  return (
    <div className="flex flex-col gap-6 py-8">
      <SectionDivider title="Funding" />

      <RepeatableListEditor<Fund>
        items={funding}
        emptyItem={EMPTY_FUND}
        isRowValid={(item) => !!item.name?.trim()}
        onAdd={(item) => updateDraft({ funding: [...funding, item] })}
        onRemove={(index) =>
          updateDraft({ funding: funding.filter((_, i) => i !== index) })
        }
        addButtonLabel="ADD FUNDING"
        renderSavedRow={(item) => ({ label: item.name, desc: item.link })}
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
