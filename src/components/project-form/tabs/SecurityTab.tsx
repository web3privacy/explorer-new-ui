"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Audit } from "@/types/audit";

import { useProjectForm } from "../ProjectFormProvider";
import { DatePickerField } from "../shared/DatePickerField";
import { FormField } from "../shared/FormField";
import { RepeatableListEditor } from "../shared/RepeatableListEditor";
import { SectionDivider } from "../shared/SectionDivider";

const EMPTY_AUDIT: Audit = { name: "", url: "", time: "" };

function formatDate(iso?: string) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB");
}

export function SecurityTab() {
  const { draft, updateDraft } = useProjectForm();
  const audits = draft.audits ?? [];

  return (
    <div className="flex flex-col gap-6 py-8">
      <SectionDivider title="Audits" />

      <RepeatableListEditor<Audit>
        items={audits}
        emptyItem={EMPTY_AUDIT}
        isRowValid={(item) => !!item.name?.trim()}
        onAdd={(item) => updateDraft({ audits: [...audits, item] })}
        onRemove={(index) =>
          updateDraft({ audits: audits.filter((_, i) => i !== index) })
        }
        addButtonLabel="ADD AUDIT"
        renderSavedRow={(item) => ({
          label: item.name ?? "",
          desc: formatDate(item.time),
        })}
        renderAddForm={(newItem, setNewItem) => (
          <>
            <Input
              placeholder="Audit name"
              value={newItem.name ?? ""}
              onChange={(e) =>
                setNewItem({ ...newItem, name: e.target.value })
              }
            />
            <Input
              placeholder="URL of audit"
              value={newItem.url ?? ""}
              onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
            />
            <DatePickerField
              value={newItem.time}
              onChange={(v) => setNewItem({ ...newItem, time: v })}
            />
          </>
        )}
      />

      <SectionDivider title="Additional info" />

      <FormField label="Third party dependency">
        <Textarea
          rows={3}
          value={draft.third_party_dependency ?? ""}
          onChange={(e) =>
            updateDraft({ third_party_dependency: e.target.value })
          }
        />
      </FormField>

      <FormField label="Social trust">
        <Textarea
          rows={3}
          value={draft.social_trust ?? ""}
          onChange={(e) => updateDraft({ social_trust: e.target.value })}
        />
      </FormField>

      <FormField label="Technical SPOF">
        <Textarea
          rows={3}
          value={draft.technical_spof ?? ""}
          onChange={(e) => updateDraft({ technical_spof: e.target.value })}
        />
      </FormField>
    </div>
  );
}
