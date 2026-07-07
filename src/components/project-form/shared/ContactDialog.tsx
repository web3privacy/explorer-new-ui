"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValue?: string;
  onConfirm: (nickname: string) => void;
}

export function ContactDialog({
  open,
  onOpenChange,
  defaultValue,
  onConfirm,
}: ContactDialogProps) {
  const [nickname, setNickname] = React.useState(defaultValue ?? "");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a nickname</DialogTitle>
          <DialogDescription>
            We collect this to track and reward contributors. It won&apos;t be
            published with your project.
          </DialogDescription>
        </DialogHeader>
        <Input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Your nickname"
        />
        <DialogFooter>
          <Button
            type="button"
            onClick={() => {
              onConfirm(nickname);
              onOpenChange(false);
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
