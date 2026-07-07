"use client";

import { Input } from "@/components/ui/input";
import { Project } from "@/types/project";

import { useProjectForm } from "../ProjectFormProvider";
import { DatePickerField } from "../shared/DatePickerField";
import { RepeatableListEditor } from "../shared/RepeatableListEditor";

type HistoryEvent = NonNullable<Project["history"]>[number];

const EMPTY_EVENT: HistoryEvent = {
  title: "",
  description: "",
  link: "",
  time: "",
};

function formatDate(iso?: string) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB");
}

export function HistoryTab() {
  const { draft, updateDraft } = useProjectForm();
  const history = draft.history ?? [];

  return (
    <div className="flex flex-col gap-6 py-8">
      <RepeatableListEditor<HistoryEvent>
        items={history}
        emptyItem={EMPTY_EVENT}
        isRowValid={(item) => !!item.title?.trim()}
        onAdd={(item) => updateDraft({ history: [...history, item] })}
        onRemove={(index) =>
          updateDraft({ history: history.filter((_, i) => i !== index) })
        }
        addButtonLabel="ADD EVENT"
        renderSavedRow={(item) => ({
          label: item.title ?? "",
          desc: formatDate(item.time),
        })}
        renderAddForm={(newItem, setNewItem) => (
          <>
            <Input
              placeholder="Title"
              value={newItem.title ?? ""}
              onChange={(e) =>
                setNewItem({ ...newItem, title: e.target.value })
              }
            />
            <Input
              placeholder="Description"
              value={newItem.description ?? ""}
              onChange={(e) =>
                setNewItem({ ...newItem, description: e.target.value })
              }
            />
            <Input
              placeholder="Link"
              value={newItem.link ?? ""}
              onChange={(e) =>
                setNewItem({ ...newItem, link: e.target.value })
              }
            />
            <DatePickerField
              value={newItem.time}
              onChange={(v) => setNewItem({ ...newItem, time: v })}
            />
          </>
        )}
      />
    </div>
  );
}
