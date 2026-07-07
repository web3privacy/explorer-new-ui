"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MONTHS = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];

function daysInMonth(year?: number, month?: number) {
  if (!year || !month) return 31;
  return new Date(year, month, 0).getDate();
}

function yearOptions() {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 101 }, (_, i) => currentYear - i);
}

interface DatePickerFieldProps {
  value?: string;
  onChange: (isoDate: string | undefined) => void;
}

export function DatePickerField({ value, onChange }: DatePickerFieldProps) {
  const parsed = value ? new Date(value) : undefined;
  const [day, setDay] = React.useState<number | undefined>(
    parsed ? parsed.getDate() : undefined
  );
  const [month, setMonth] = React.useState<number | undefined>(
    parsed ? parsed.getMonth() + 1 : undefined
  );
  const [year, setYear] = React.useState<number | undefined>(
    parsed ? parsed.getFullYear() : undefined
  );

  const commit = (nextDay?: number, nextMonth?: number, nextYear?: number) => {
    if (nextDay && nextMonth && nextYear) {
      onChange(new Date(nextYear, nextMonth - 1, nextDay).toISOString());
    } else {
      onChange(undefined);
    }
  };

  const days = Array.from({ length: daysInMonth(year, month) }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-3 gap-3">
      <Select
        value={day ? String(day) : undefined}
        onValueChange={(v) => {
          const next = Number(v);
          setDay(next);
          commit(next, month, year);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Day" />
        </SelectTrigger>
        <SelectContent>
          {days.map((d) => (
            <SelectItem key={d} value={String(d)}>
              {d}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={month ? String(month) : undefined}
        onValueChange={(v) => {
          const next = Number(v);
          setMonth(next);
          commit(day, next, year);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          {MONTHS.map((m) => (
            <SelectItem key={m.value} value={String(m.value)}>
              {m.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={year ? String(year) : undefined}
        onValueChange={(v) => {
          const next = Number(v);
          setYear(next);
          commit(day, month, next);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          {yearOptions().map((y) => (
            <SelectItem key={y} value={String(y)}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
