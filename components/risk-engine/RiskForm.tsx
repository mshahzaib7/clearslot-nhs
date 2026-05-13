"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import type { RiskScoreRequest } from "@/types";

const specialties: RiskScoreRequest["specialty"][] = [
  "Physiotherapy",
  "Cardiology",
  "Ophthalmology",
  "Neurology",
  "Trauma & Orthopaedics",
  "General Surgery",
  "Dermatology",
  "ENT",
  "Gastroenterology",
  "Urology",
];

const days: RiskScoreRequest["dayOfWeek"][] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const timeSlots: RiskScoreRequest["timeSlot"][] = [
  "Early Morning (8-9am)",
  "Morning (9am-12pm)",
  "Afternoon (12-5pm)",
  "Evening (5pm+)",
];

const ageGroups: RiskScoreRequest["ageGroup"][] = ["18-30", "31-45", "46-60", "61-75", "76+"];

const previousDNAOptions: RiskScoreRequest["previousDNAs"][] = [
  "None",
  "1 previous DNA",
  "2 DNAs",
  "3+ DNAs",
];

const weatherOptions: RiskScoreRequest["weather"][] = [
  "Clear",
  "Cloudy",
  "Rain",
  "Heavy Rain",
  "Snow/Ice",
];

export function RiskForm({
  value,
  onChange,
  onSubmit,
  submitting,
}: {
  value: RiskScoreRequest;
  onChange: (next: RiskScoreRequest) => void;
  onSubmit: () => void;
  submitting: boolean;
}) {
  const set = <K extends keyof RiskScoreRequest>(k: K, v: RiskScoreRequest[K]) =>
    onChange({ ...value, [k]: v });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-extrabold">Simulator Inputs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="specialty" className="dark:text-slate-200">Specialty</Label>
          <Select
            id="specialty"
            aria-label="Specialty"
            value={value.specialty}
            onChange={(e) => set("specialty", e.target.value as RiskScoreRequest["specialty"])}
          >
            {specialties.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="dow" className="dark:text-slate-200">Day of Week</Label>
            <Select
              id="dow"
              aria-label="Day of week"
              value={value.dayOfWeek}
              onChange={(e) => set("dayOfWeek", e.target.value as RiskScoreRequest["dayOfWeek"])}
            >
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeSlot" className="dark:text-slate-200">Appointment Time</Label>
            <Select
              id="timeSlot"
              aria-label="Appointment time"
              value={value.timeSlot}
              onChange={(e) => set("timeSlot", e.target.value as RiskScoreRequest["timeSlot"])}
            >
              {timeSlots.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="lead" className="dark:text-slate-200">Days Until Appointment</Label>
          <Input
            id="lead"
            aria-label="Lead time days"
            type="number"
            min={1}
            max={90}
            value={value.leadTimeDays}
            onChange={(e) => set("leadTimeDays", Number(e.target.value) as number)}
          />
          <div className="text-xs text-[hsl(var(--muted-foreground))]">
            Lead time from booking to appointment. Longer lead times increase DNA risk.
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="age" className="dark:text-slate-200">Patient Age Group</Label>
            <Select
              id="age"
              aria-label="Age group"
              value={value.ageGroup}
              onChange={(e) => set("ageGroup", e.target.value as RiskScoreRequest["ageGroup"])}
            >
              {ageGroups.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="prev" className="dark:text-slate-200">Previous DNA Count</Label>
            <Select
              id="prev"
              aria-label="Previous DNAs"
              value={value.previousDNAs}
              onChange={(e) =>
                set("previousDNAs", e.target.value as RiskScoreRequest["previousDNAs"])
              }
            >
              {previousDNAOptions.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="imd" className="dark:text-slate-200">IMD Deprivation Score</Label>
            <div className="text-sm font-extrabold dark:text-white">{value.imdScore}</div>
          </div>
          <Slider
            aria-label="IMD score"
            min={1}
            max={5}
            value={value.imdScore}
            onValueChange={(v) => set("imdScore", v as 1 | 2 | 3 | 4 | 5)}
          />
          <div className="text-xs text-[hsl(var(--muted-foreground))]">
            1 = Least deprived · 5 = Most deprived
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="weather" className="dark:text-slate-200">Weather Forecast</Label>
            <Select
              id="weather"
              aria-label="Weather"
              value={value.weather}
              onChange={(e) => set("weather", e.target.value as RiskScoreRequest["weather"])}
            >
              {weatherOptions.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="dark:text-slate-200">Reminder Sent?</Label>
            <div className="flex items-center justify-between rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 shadow-sm">
              <div className="text-sm font-semibold dark:text-white">{value.reminderSent ? "Yes" : "No"}</div>
              <Switch
                aria-label="Reminder sent toggle"
                checked={value.reminderSent}
                onCheckedChange={(v) => set("reminderSent", v)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="dark:text-slate-200">Transport Barrier Flagged?</Label>
          <div className="flex items-center justify-between rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 shadow-sm">
            <div className="text-sm font-semibold dark:text-white">{value.transportBarrier ? "Yes" : "No"}</div>
            <Switch
              aria-label="Transport barrier toggle"
              checked={value.transportBarrier}
              onCheckedChange={(v) => set("transportBarrier", v)}
            />
          </div>
        </div>

        <Button
          className="w-full"
          size="lg"
          variant="default"
          onClick={onSubmit}
          disabled={submitting}
          aria-label="Calculate risk score"
        >
          {submitting ? "Calculating..." : "Calculate Risk Score"}
        </Button>
      </CardContent>
    </Card>
  );
}

