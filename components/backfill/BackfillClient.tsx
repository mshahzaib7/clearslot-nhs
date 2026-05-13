"use client";

import * as React from "react";

import { BackfillStatus } from "@/components/backfill/BackfillStatus";
import { SlotTable } from "@/components/backfill/SlotTable";
import { BackfillPerformanceChart, type BackfillWeek } from "@/components/backfill/BackfillPerformanceChart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorCard } from "@/components/ui/error-card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchJson } from "@/lib/fetchJson";
import type { BackfillResponse, ReservePatient } from "@/types";

const perf: BackfillWeek[] = [
  { week: "W1 Mar", recovered: 28, lost: 14 },
  { week: "W2 Mar", recovered: 31, lost: 11 },
  { week: "W3 Mar", recovered: 35, lost: 9 },
  { week: "W4 Mar", recovered: 29, lost: 13 },
  { week: "W1 Apr", recovered: 38, lost: 8 },
  { week: "W2 Apr", recovered: 41, lost: 7 },
  { week: "W3 Apr", recovered: 44, lost: 6 },
  { week: "W4 Apr", recovered: 47, lost: 5 },
];

export default function BackfillClient() {
  const [data, setData] = React.useState<BackfillResponse | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const d = await fetchJson<BackfillResponse>("/api/backfill");
      setData(d);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void load();
  }, [load]);

  if (error) {
    return <ErrorCard title="Backfill data failed to load" description={error} onRetry={load} />;
  }

  return (
    <div className="space-y-8">
      {loading || !data ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      ) : (
        <BackfillStatus
          openSlots={data.openSlots}
          reserveList={data.reserveList}
          avgFillMinutes={data.avgFillMinutes}
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-extrabold">How It Works</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            [
              "Step 1: Slot Vacated",
              "Patient cancels or AI predicts high-probability DNA",
            ],
            [
              "Step 2: Match Found",
              "System finds best-fit patient from reserve list (same specialty, accessible location, available time)",
            ],
            ["Step 3: Confirmed", "Patient contacted, confirms via SMS reply, slot locked"],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
              <div className="font-extrabold">{t}</div>
              <div className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">{d}</div>
            </div>
          ))}
        </CardContent>
      </Card>

      {loading || !data ? <Skeleton className="h-[360px] w-full" /> : <SlotTable slots={data.slots} />}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <CardTitle className="text-base font-extrabold">
              Top Reserve List Patients (Waiting for Earlier Slot)
            </CardTitle>
            <Button variant="outline" size="sm" onClick={load} aria-label="Refresh backfill data">
              Refresh
            </Button>
          </CardHeader>
          <CardContent>
            {loading || !data ? (
              <div className="space-y-3">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : (
              <ReserveTable rows={data.reservePatients} />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-extrabold">
              Slots Recovered vs Slots Lost (Last 8 Weeks)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BackfillPerformanceChart data={perf} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ReserveTable({ rows }: { rows: ReservePatient[] }) {
  return (
    <div>
      {/* Desktop Table View */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[780px] text-sm">
          <thead>
            <tr className="text-left text-[hsl(var(--muted-foreground))]">
              <th className="py-2 pr-3">Patient Ref</th>
              <th className="py-2 pr-3">Specialty</th>
              <th className="py-2 pr-3">Waiting Since</th>
              <th className="py-2 pr-3">Max Travel</th>
              <th className="py-2 pr-3">Preferred Times</th>
              <th className="py-2 pr-3">Priority</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-[hsl(var(--border))]">
                <td className="py-3 pr-3 font-semibold">{r.patientRef}</td>
                <td className="py-3 pr-3">{r.specialty}</td>
                <td className="py-3 pr-3">{r.waitingSinceDays} days</td>
                <td className="py-3 pr-3">{r.maxTravel}</td>
                <td className="py-3 pr-3">{r.preferredTimes}</td>
                <td className="py-3 pr-3 font-semibold">{r.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {rows.map((r) => (
          <div key={r.id} className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))/0.1] p-4 text-sm">
            <div className="flex items-center justify-between">
              <div className="font-bold text-[#003087] dark:text-[#7fb6ff]">{r.patientRef}</div>
              <Badge variant={r.priority === "Clinical Priority" ? "danger" : "default"}>{r.priority}</Badge>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[hsl(var(--muted-foreground))]">Specialty:</span>
                <div className="font-medium">{r.specialty}</div>
              </div>
              <div>
                <span className="text-[hsl(var(--muted-foreground))]">Waiting:</span>
                <div className="font-medium">{r.waitingSinceDays} days</div>
              </div>
              <div>
                <span className="text-[hsl(var(--muted-foreground))]">Travel:</span>
                <div className="font-medium">{r.maxTravel}</div>
              </div>
              <div>
                <span className="text-[hsl(var(--muted-foreground))]">Times:</span>
                <div className="font-medium">{r.preferredTimes}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 text-xs text-[hsl(var(--muted-foreground))]">
        Patients shown are synthetic references for demonstration.
      </div>
    </div>
  );
}

