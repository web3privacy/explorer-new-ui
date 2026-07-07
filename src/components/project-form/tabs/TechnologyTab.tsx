"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Project } from "@/types/project";
import { ReferenceItem } from "@/types/referenceItem";

import { useProjectForm } from "../ProjectFormProvider";
import { FormField } from "../shared/FormField";
import { SectionDivider } from "../shared/SectionDivider";
import { ToggleField } from "../shared/ToggleField";

type BlockchainFeatures = Partial<NonNullable<Project["blockchain_features"]>>;
type ProjectStatus = Partial<NonNullable<Project["project_status"]>>;
type Storage = Partial<NonNullable<Project["storage"]>>;

interface TechnologyTabProps {
  phases: ReferenceItem[];
  custodyTypes: ReferenceItem[];
}

export function TechnologyTab({ phases, custodyTypes }: TechnologyTabProps) {
  const { draft, updateDraft } = useProjectForm();
  const blockchainFeatures: BlockchainFeatures = draft.blockchain_features ?? {};
  const projectStatus: ProjectStatus = draft.project_status ?? {};
  const storage: Storage = draft.storage ?? {};

  const setBlockchainFeatures = (patch: BlockchainFeatures) =>
    updateDraft({
      blockchain_features: {
        ...blockchainFeatures,
        ...patch,
      } as Project["blockchain_features"],
    });

  const setProjectStatus = (patch: ProjectStatus) =>
    updateDraft({
      project_status: {
        ...projectStatus,
        ...patch,
      } as Project["project_status"],
    });

  const setStorage = (patch: Storage) =>
    updateDraft({ storage: { ...storage, ...patch } as Project["storage"] });

  return (
    <div className="flex flex-col gap-6 py-8">
      <SectionDivider title="Version" />
      <RadioGroup
        value={projectStatus.version ?? ""}
        onValueChange={(v) => setProjectStatus({ version: v })}
        className="grid grid-cols-2 gap-4 lg:flex lg:flex-wrap"
      >
        {phases.map((phase) => (
          <div key={phase.id} className="flex items-center gap-2">
            <RadioGroupItem value={phase.id} id={`phase-${phase.id}`} />
            <Label
              htmlFor={`phase-${phase.id}`}
              className="font-dm-mono text-foreground"
            >
              {phase.name}
            </Label>
          </div>
        ))}
      </RadioGroup>

      <SectionDivider title="Features" />

      <FormField label="Asset custody type">
        <Select
          value={blockchainFeatures.asset_custody_type ?? ""}
          onValueChange={(v) => setBlockchainFeatures({ asset_custody_type: v })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select custody type" />
          </SelectTrigger>
          <SelectContent>
            {custodyTypes.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      <ToggleField
        label="Open source"
        checked={!!blockchainFeatures.opensource}
        onCheckedChange={(v) => setBlockchainFeatures({ opensource: v })}
      />

      <ToggleField
        label="Upgradability enabled"
        checked={!!blockchainFeatures.upgradability?.enabled}
        onCheckedChange={(v) =>
          setBlockchainFeatures({
            upgradability: { ...blockchainFeatures.upgradability, enabled: v },
          })
        }
      />

      <SectionDivider title="Additional info" />

      <FormField label="Encryption">
        <Input
          value={blockchainFeatures.encryption ?? ""}
          onChange={(e) =>
            setBlockchainFeatures({ encryption: e.target.value })
          }
          placeholder="e.g. ZK-Snarks"
        />
      </FormField>

      <ToggleField
        label="Peer to peer"
        checked={!!blockchainFeatures.p2p}
        onCheckedChange={(v) => setBlockchainFeatures({ p2p: v })}
      />

      <ToggleField
        label="Decentralized storage"
        checked={!!storage.decentralized}
        onCheckedChange={(v) => setStorage({ decentralized: v })}
      />
    </div>
  );
}
