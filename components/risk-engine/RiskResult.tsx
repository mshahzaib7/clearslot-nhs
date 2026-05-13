"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { RiskScoreResponse } from "@/types";

function bandMeta(band: RiskScoreResponse["band"]) {
  if (band === "HIGH") return { label: "HIGH RISK", color: "#DA291C", badge: "danger" as const };
  if (band === "MEDIUM")
    return { label: "MEDIUM RISK", color: "#FFB81C", badge: "warning" as const };
  return { label: "LOW RISK", color: "#007F3B", badge: "success" as const };
}

export function RiskResult({ result }: { result: RiskScoreResponse }) {
  const meta = bandMeta(result.band);
  const pct = Math.min(100, Math.max(0, result.score));
  const trackColor = "hsl(var(--muted))";
  const bg = `conic-gradient(${meta.color} ${pct * 3.6}deg, ${trackColor} 0deg)`;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <CardTitle className="text-base font-extrabold">Result</CardTitle>
          <Badge variant={meta.badge}>{meta.label}</Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center">
            <div className="flex items-center justify-center">
              <div
                className="relative h-44 w-44 rounded-full p-3 shadow-inner"
                style={{ background: bg }}
                aria-label={`Risk score gauge: ${result.score}`}
              >
                <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[hsl(var(--card))] shadow-sm">
                  <div className="text-4xl font-extrabold">{result.score}</div>
                  <div className="text-xs text-[hsl(var(--muted-foreground))]">0–100</div>
                </div>
              </div>
            </div>

            <div>
              <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 shadow-sm">
                <div className="text-sm font-extrabold">{result.recommendation.title}</div>
                <div className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                  <div>
                    <span className="font-semibold text-[hsl(var(--foreground))]">Action:</span>{" "}
                    {result.recommendation.action}
                  </div>
                  <div className="mt-1">
                    <span className="font-semibold text-[hsl(var(--foreground))]">Channel:</span>{" "}
                    {result.recommendation.channel}
                  </div>
                  <div className="mt-1">
                    <span className="font-semibold text-[hsl(var(--foreground))]">Urgency:</span>{" "}
                    {result.recommendation.urgency}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <div className="text-sm font-extrabold">Risk Factor Breakdown</div>
            <div className="mt-3 space-y-3">
              {result.factors.map((f) => {
                const abs = Math.min(40, Math.abs(f.points));
                const width = `${(abs / 40) * 100}%`;
                const bar =
                  f.direction === "decrease"
                    ? "bg-[#007F3B]/30 dark:bg-[#4ade80]/40"
                    : f.points >= 12
                      ? "bg-[#DA291C]/30 dark:bg-[#ff8a8a]/40"
                      : "bg-[#FFB81C]/35 dark:bg-[#FFB81C]/40";
                return (
                  <div key={f.key} className="grid grid-cols-1 gap-2 md:grid-cols-3 md:items-center">
                    <div className="text-sm font-semibold">{f.label}</div>
                    <div className="h-2 w-full rounded-full bg-[hsl(var(--muted))] md:col-span-2">
                      <div className={`h-2 rounded-full ${bar}`} style={{ width }} />
                    </div>
                    <div className="text-xs text-[hsl(var(--muted-foreground))] md:col-span-3">
                      {f.points > 0 ? `+${f.points}` : `${f.points}`} points
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-extrabold">How the Score is Calculated</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-xl bg-black/5 p-4 text-xs leading-5 dark:bg-white/5">
{`base_score = specialty_risk[specialty]
  + lead_time_factor(days)
  + (previous_dnas * 12)
  + (imd_score * 4)
  + day_time_factor(day, time)
  + weather_factor(weather)
  + transport_barrier(flagged)
  - reminder_discount(sent)

final_score = clamp(base_score, 0, 100)`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}

