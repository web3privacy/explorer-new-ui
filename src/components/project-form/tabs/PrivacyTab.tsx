"use client";

import { Input } from "@/components/ui/input";
import { ReferenceItem } from "@/types/referenceItem";

import { useProjectForm } from "../ProjectFormProvider";
import { ChipMultiSelect } from "../shared/ChipMultiSelect";
import { FormField } from "../shared/FormField";
import { SectionDivider } from "../shared/SectionDivider";
import { ToggleField } from "../shared/ToggleField";

interface PrivacyTabProps {
  signInRequirements: ReferenceItem[];
}

export function PrivacyTab({ signInRequirements }: PrivacyTabProps) {
  const { draft, updateDraft } = useProjectForm();
  const privacyPolicy = draft.privacy_policy ?? { defined: false };
  const tracebility = draft.tracebility ?? { kyc: false };

  return (
    <div className="flex flex-col gap-6 py-8">
      <FormField label="Privacy policy link">
        <Input
          value={privacyPolicy.link ?? ""}
          onChange={(e) =>
            updateDraft({
              privacy_policy: { ...privacyPolicy, link: e.target.value },
            })
          }
          placeholder="https://..."
        />
      </FormField>

      <FormField label="Compliance">
        <Input
          value={draft.compliance ?? ""}
          onChange={(e) => updateDraft({ compliance: e.target.value })}
          placeholder="e.g. OFAC, USA"
        />
      </FormField>

      <ToggleField
        label="KYC required"
        checked={!!tracebility.kyc}
        onCheckedChange={(v) =>
          updateDraft({ tracebility: { ...tracebility, kyc: v } })
        }
      />

      <ToggleField
        label="Default privacy"
        checked={!!draft.default_privacy}
        onCheckedChange={(v) => updateDraft({ default_privacy: v })}
      />

      <SectionDivider title="Additional info" />

      <FormField label="Sign-in requirements">
        <ChipMultiSelect
          value={tracebility.sign_in_type_requirments ?? []}
          onChange={(v) =>
            updateDraft({
              tracebility: { ...tracebility, sign_in_type_requirments: v },
            })
          }
          options={signInRequirements}
          placeholder="Add requirement"
        />
      </FormField>

      <FormField label="Tracked data">
        <Input
          value={tracebility.tracked_data ?? ""}
          onChange={(e) =>
            updateDraft({
              tracebility: { ...tracebility, tracked_data: e.target.value },
            })
          }
          placeholder="e.g. user wallet address"
        />
      </FormField>

      <FormField label="Data usage">
        <Input
          value={privacyPolicy.data_usage ?? ""}
          onChange={(e) =>
            updateDraft({
              privacy_policy: { ...privacyPolicy, data_usage: e.target.value },
            })
          }
          placeholder="e.g. tools you are making TXs on"
        />
      </FormField>
    </div>
  );
}
