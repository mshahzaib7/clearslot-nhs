"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export function Slider({
  value,
  min,
  max,
  step = 1,
  onValueChange,
  "aria-label": ariaLabel,
}: {
  value: number;
  min: number;
  max: number;
  step?: number;
  onValueChange: (v: number) => void;
  "aria-label": string;
}) {
  return (
    <input
      aria-label={ariaLabel}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onValueChange(Number(e.target.value))}
      className={cn(
        "h-2 w-full cursor-pointer appearance-none rounded-full bg-[hsl(var(--muted))]",
        "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#005EB8] [&::-webkit-slider-thumb]:shadow",
      )}
    />
  );
}

