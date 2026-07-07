"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/types/category";
import { Ecosystem } from "@/types/ecosystem";
import { Usecase } from "@/types/usecase";

import { useProjectForm } from "../ProjectFormProvider";
import { ChipMultiSelect } from "../shared/ChipMultiSelect";
import { ContactDialog } from "../shared/ContactDialog";
import { DatePickerField } from "../shared/DatePickerField";
import { FormField } from "../shared/FormField";
import { ToggleField } from "../shared/ToggleField";
import { BasicInfoTabHandle } from "../types";
import { basicInfoSchema, BasicInfoValues } from "./BasicInfoTab.schema";

interface BasicInfoTabProps {
  categories: Category[];
  usecases: Usecase[];
  ecosystems: Ecosystem[];
}

export const BasicInfoTab = React.forwardRef<
  BasicInfoTabHandle,
  BasicInfoTabProps
>(function BasicInfoTab({ categories, usecases, ecosystems }, ref) {
  const { draft, updateDraft } = useProjectForm();
  const [nicknameDialogOpen, setNicknameDialogOpen] = React.useState(false);
  const [hasNickname, setHasNickname] = React.useState(!!draft.nickname);

  const form = useForm<BasicInfoValues>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      categories: draft.categories ?? [],
      usecases: draft.usecases ?? [],
      ecosystem: draft.ecosystem ?? [],
      description: draft.description ?? "",
      product_launch_day: draft.product_launch_day,
      nickname: draft.nickname,
      sunset: draft.sunset ?? false,
    },
  });

  React.useImperativeHandle(ref, () => ({
    validate: async () => form.trigger(),
  }));

  React.useEffect(() => {
    const subscription = form.watch((values) => updateDraft(values));
    return () => subscription.unsubscribe();
  }, [form, updateDraft]);

  const errors = form.formState.errors;
  const shouldValidate = form.formState.isSubmitted;

  return (
    <div className="flex flex-col gap-6 py-8">
      <FormField
        label="Categories"
        required
        hint="Choose categories that fits your project"
        error={errors.categories?.message}
      >
        <ChipMultiSelect
          value={form.watch("categories")}
          onChange={(v) =>
            form.setValue("categories", v, { shouldValidate })
          }
          options={categories}
          placeholder="Add category"
        />
      </FormField>

      <FormField
        label="Use-cases"
        required
        hint="What can be your project used for?"
        error={errors.usecases?.message}
      >
        <ChipMultiSelect
          value={form.watch("usecases")}
          onChange={(v) => form.setValue("usecases", v, { shouldValidate })}
          options={usecases}
          placeholder="Add use-case"
        />
      </FormField>

      <FormField
        label="Ecosystems"
        required
        hint="Choose ecosystems that is your project part of"
        error={errors.ecosystem?.message}
      >
        <ChipMultiSelect
          value={form.watch("ecosystem")}
          onChange={(v) => form.setValue("ecosystem", v, { shouldValidate })}
          options={ecosystems}
          placeholder="Add ecosystem"
        />
      </FormField>

      <FormField
        label="Description"
        required
        hint="What kind of technology you use, what are your special features and why should user use your project."
        error={errors.description?.message}
      >
        <Textarea
          rows={5}
          value={form.watch("description")}
          onChange={(e) =>
            form.setValue("description", e.target.value, { shouldValidate })
          }
          placeholder="Write something about your project"
        />
      </FormField>

      <FormField
        label="Project launch date"
        hint="Date of project emergence (Optional)"
      >
        <DatePickerField
          value={form.watch("product_launch_day")}
          onChange={(v) => form.setValue("product_launch_day", v)}
        />
      </FormField>

      <div className="flex flex-col gap-4">
        <span className="font-dm-mono text-sm font-bold text-muted-foreground uppercase">
          Other Information
        </span>

        <ToggleField
          label="Sunset (project is dead)"
          hint="Check if project is currently running and working"
          checked={form.watch("sunset")}
          onCheckedChange={(v) => form.setValue("sunset", v)}
        />

        <label className="flex w-fit items-center gap-2 font-dm-mono text-sm text-foreground">
          <input
            type="checkbox"
            checked={hasNickname}
            onChange={(e) => {
              setHasNickname(e.target.checked);
              if (e.target.checked) setNicknameDialogOpen(true);
              else form.setValue("nickname", "");
            }}
          />
          Add nickname
        </label>
      </div>

      <ContactDialog
        open={nicknameDialogOpen}
        onOpenChange={setNicknameDialogOpen}
        defaultValue={form.watch("nickname")}
        onConfirm={(nickname) => form.setValue("nickname", nickname)}
      />
    </div>
  );
});
