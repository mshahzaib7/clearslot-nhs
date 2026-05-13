"use client";

import * as React from "react";

import { RiskForm } from "@/components/risk-engine/RiskForm";
import { RiskResult } from "@/components/risk-engine/RiskResult";
import { ErrorCard } from "@/components/ui/error-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { RiskScoreRequest, RiskScoreResponse } from "@/types";

const initial: RiskScoreRequest = {
  specialty: "Physiotherapy",
  dayOfWeek: "Monday",
  timeSlot: "Morning (9am-12pm)",
  leadTimeDays: 21,
  ageGroup: "46-60",
  imdScore: 4,
  previousDNAs: "1 previous DNA",
  reminderSent: false,
  weather: "Rain",
  transportBarrier: false,
};

export default function RiskEngineClient() {
  const [form, setForm] = React.useState<RiskScoreRequest>(initial);
  const [result, setResult] = React.useState<RiskScoreResponse | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const submit = async () => {
    setError(null);
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/risk-score", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(`Request failed (${res.status}): ${msg}`);
      }
      const json = (await res.json()) as RiskScoreResponse;
      setResult(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-start">
      <RiskForm value={form} onChange={setForm} onSubmit={submit} submitting={loading} />

      <div>
        {error ? (
          <ErrorCard title="Risk calculation failed" description={error} onRetry={submit} />
        ) : loading ? (
          <div className="space-y-4">
            <Skeleton className="h-[420px] w-full" />
            <Skeleton className="h-[220px] w-full" />
          </div>
        ) : result ? (
          <RiskResult result={result} />
        ) : (
          <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 text-sm text-[hsl(var(--muted-foreground))]">
            Submit the form to view a risk score, factor breakdown, and recommended action.
          </div>
        )}
      </div>
    </div>
  );
}

