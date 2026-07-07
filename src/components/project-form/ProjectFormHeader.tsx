"use client";

import { Pencil, Upload } from "lucide-react";
import * as React from "react";

import { useProjectForm } from "./ProjectFormProvider";

export function ProjectFormHeader() {
  const { name, nameError, logoPreviewUrl, setName, setLogo } =
    useProjectForm();
  const [isEditingName, setIsEditingName] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setLogo(file, reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center gap-6 py-8">
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="group relative flex size-24 shrink-0 items-center justify-center border border-dashed border-border bg-background lg:size-32"
      >
        {logoPreviewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- data: URL preview, not an optimizable remote asset
          <img
            src={logoPreviewUrl}
            alt="Project logo"
            className="absolute inset-0 size-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-background/80 font-dm-mono text-xs text-foreground opacity-0 transition-opacity group-hover:opacity-100">
          <Upload className="size-4" />
          Upload Logo
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleLogoChange}
        />
      </button>

      <div className="flex flex-col gap-1">
        <span className="font-dm-mono text-sm text-muted-foreground">
          Project Name
        </span>
        {isEditingName ? (
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setIsEditingName(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setIsEditingName(false);
            }}
            className="border-b border-border bg-transparent font-dm-mono text-2xl font-bold text-foreground outline-none"
          />
        ) : (
          <div className="flex items-center gap-2">
            <h2 className="font-dm-mono text-2xl font-bold text-foreground">
              {name}
            </h2>
            <button
              type="button"
              onClick={() => setIsEditingName(true)}
              aria-label="Edit project name"
            >
              <Pencil className="size-4 text-muted-foreground" />
            </button>
          </div>
        )}
        {nameError && (
          <span className="text-destructive text-xs">{nameError}</span>
        )}
      </div>
    </div>
  );
}
