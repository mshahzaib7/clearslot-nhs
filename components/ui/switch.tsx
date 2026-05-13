"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export function Switch({
  checked,
  onCheckedChange,
  "aria-label": ariaLabel,
  id,
}: {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  id?: string;
  "aria-label": string;
}) {
  return (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full border border-[hsl(var(--border))] transition-colors",
        checked ? "bg-[#005EB8]" : "bg-[hsl(var(--muted))]",
      )}
    >
      <span
        className={cn(
          "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-5" : "translate-x-0.5",
        )}
      />
    </button>
  );
}

