"use client";

import { Input } from "@/components/ui/input";
import { Asset } from "@/types/asset";
import { Project } from "@/types/project";

import { useProjectForm } from "../ProjectFormProvider";
import { ChipMultiSelect } from "../shared/ChipMultiSelect";
import { FormField } from "../shared/FormField";
import { RepeatableListEditor } from "../shared/RepeatableListEditor";
import { SectionDivider } from "../shared/SectionDivider";

type Token = NonNullable<Project["tokens"]>[number];

const EMPTY_TOKEN: Token = {
  symbol: "",
  name: "",
  contract_address: "",
  token_link: "",
};

interface AssetsTabProps {
  assets: Asset[];
}

export function AssetsTab({ assets }: AssetsTabProps) {
  const { draft, updateDraft } = useProjectForm();
  const tokens = draft.tokens ?? [];

  return (
    <div className="flex flex-col gap-6 py-8">
      <FormField label="Assets used" hint="Which assets does your project support?">
        <ChipMultiSelect
          value={draft.assets_used ?? []}
          onChange={(v) => updateDraft({ assets_used: v })}
          options={assets}
          placeholder="Add asset"
          creatable
        />
      </FormField>

      <SectionDivider title="Native tokens" />

      <RepeatableListEditor<Token>
        items={tokens}
        emptyItem={EMPTY_TOKEN}
        isRowValid={(item) => !!item.symbol?.trim()}
        onAdd={(item) => updateDraft({ tokens: [...tokens, item] })}
        onRemove={(index) =>
          updateDraft({ tokens: tokens.filter((_, i) => i !== index) })
        }
        addButtonLabel="ADD TOKEN"
        renderSavedRow={(item) => ({
          label: `${item.symbol ?? ""} (${item.name ?? ""})`,
          desc: item.token_link,
        })}
        renderAddForm={(newItem, setNewItem) => (
          <>
            <Input
              placeholder="Token symbol"
              value={newItem.symbol ?? ""}
              onChange={(e) =>
                setNewItem({ ...newItem, symbol: e.target.value })
              }
            />
            <Input
              placeholder="Token name"
              value={newItem.name ?? ""}
              onChange={(e) =>
                setNewItem({ ...newItem, name: e.target.value })
              }
            />
            <Input
              placeholder="Token contract address"
              value={newItem.contract_address ?? ""}
              onChange={(e) =>
                setNewItem({ ...newItem, contract_address: e.target.value })
              }
            />
            <Input
              placeholder="URL for explorer"
              value={newItem.token_link ?? ""}
              onChange={(e) =>
                setNewItem({ ...newItem, token_link: e.target.value })
              }
            />
          </>
        )}
      />
    </div>
  );
}
