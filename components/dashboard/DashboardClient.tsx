"use client";

import * as React from "react";

import { KPICard } from "@/components/dashboard/KPICard";
import { DNATrendChart, type DNATrendPoint } from "@/components/dashboard/DNATrendChart";
import { SpecialtyBarChart } from "@/components/dashboard/SpecialtyBarChart";
import { SlotsRecoveredChart, type SlotsRecoveredPoint } from "@/components/dashboard/SlotsRecoveredChart";
import { RiskDonutChart, type DonutDatum } from "@/components/dashboard/RiskDonutChart";
import { EquityBreakdown, type EquityRow } from "@/components/dashboard/EquityBreakdown";
import { RiskHeatMap } from "@/components/dashboard/RiskHeatMap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorCard } from "@/components/ui/error-card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchJson } from "@/lib/fetchJson";
import { formatGBP } from "@/lib/utils";
import type { HighRiskAppointment, KPIResponse, SpecialtyRate } from "@/types";

type EquityDatum = EquityRow;

const equityRows: EquityDatum[] = [
  { quintile: 1, label: "Most Deprived", rate: "7.8%", change: "-2.4%", status: "Improving" },
  { quintile: 2, label: "Deprived", rate: "6.1%", change: "-1.9%", status: "Improving" },
  { quintile: 3, label: "Average", rate: "4.8%", change: "-1.5%", status: "On Target" },
  { quintile: 4, label: "Affluent", rate: "3.9%", change: "-1.1%", status: "On Target" },
  { quintile: 5, label: "Least Deprived", rate: "3.2%", change: "-0.9%", status: "On Target" },
];

const dnaTrend: DNATrendPoint[] = [
  { month: "Jun 25", before: 6.4, after: null },
  { month: "Jul 25", before: 6.1, after: null },
  { month: "Aug 25", before: 6.3, after: null },
  { month: "Sep 25", before: 6.0, after: 5.8 },
  { month: "Oct 25", before: 5.7, after: 5.1 },
  { month: "Nov 25", before: 5.9, after: 4.8 },
  { month: "Dec 25", before: 5.5, after: 4.4 },
  { month: "Jan 26", before: 5.8, after: 4.2 },
  { month: "Feb 26", before: 5.6, after: 4.0 },
  { month: "Mar 26", before: 5.4, after: 3.8 },
  { month: "Apr 26", before: null, after: 3.9 },
  { month: "May 26", before: null, after: 4.2 },
];

const slotsRecovered: SlotsRecoveredPoint[] = [
  { month: "Sep 25", slots: 12 },
  { month: "Oct 25", slots: 28 },
  { month: "Nov 25", slots: 35 },
  { month: "Dec 25", slots: 41 },
  { month: "Jan 26", slots: 38 },
  { month: "Feb 26", slots: 47 },
  { month: "Mar 26", slots: 52 },
  { month: "Apr 26", slots: 49 },
  { month: "May 26", slots: 47 },
];

const donutData: DonutDatum[] = [
  { name: "Low Risk (0-39)", value: 142, color: "#007F3B" },
  { name: "Medium Risk (40-69)", value: 38, color: "#FFB81C" },
  { name: "High Risk (70-100)", value: 23, color: "#DA291C" },
];

function riskBadgeVariant(score: number): "success" | "warning" | "danger" {
  if (score >= 70) return "danger";
  if (score >= 40) return "warning";
  return "success";
}

export default function DashboardClient() {
  const [kpis, setKpis] = React.useState<KPIResponse | null>(null);
  const [specialties, setSpecialties] = React.useState<SpecialtyRate[] | null>(null);
  const [appointments, setAppointments] = React.useState<HighRiskAppointment[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const [k, s, a] = await Promise.all([
        fetchJson<KPIResponse>("/api/kpis"),
        fetchJson<SpecialtyRate[]>("/api/specialties"),
        fetchJson<HighRiskAppointment[]>("/api/appointments"),
      ]);
      setKpis(k);
      setSpecialties(s);
      setAppointments(a);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void load();
  }, [load]);

  const chartStroke = "#005EB8";

  if (error) {
    return <ErrorCard title="Dashboard data failed to load" description={error} onRetry={load} />;
  }

  return (
    <div className="space-y-8">
      {/* KPI BAR */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {loading || !kpis ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-40" />
              </CardHeader>
              <CardContent className="flex items-end justify-between gap-4">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-6 w-28 rounded-full" />
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <KPICard
              title="Today&apos;s DNA Risk Appointments"
              value={`${kpis.todayHighRisk}`}
              badgeText="Needs Attention"
              badgeVariant="warning"
            />
            <KPICard
              title="This Month's DNA Rate"
              value={`${kpis.monthlyDNARate.toFixed(1)}%`}
              badgeText="↓ 1.8% vs last month"
              badgeVariant="success"
            />
            <KPICard
              title="Slots Backfilled This Week"
              value={`${kpis.slotsBackfilled}`}
              badgeText="Recovery Rate 68%"
              badgeVariant="success"
            />
            <KPICard
              title="Estimated Monthly Saving"
              value={formatGBP(kpis.monthlySaving)}
              badgeText="Projected"
              badgeVariant="info"
            />
          </>
        )}
      </div>

      {/* CHART ROW 1 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-extrabold">DNA Rate Trend (12 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="h-72 w-full" /> : <DNATrendChart data={dnaTrend} stroke={chartStroke} />}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-extrabold">DNA Rate by Specialty</CardTitle>
          </CardHeader>
          <CardContent>
            {loading || !specialties ? (
              <Skeleton className="h-72 w-full" />
            ) : (
              <SpecialtyBarChart data={specialties} />
            )}
          </CardContent>
        </Card>
      </div>

      {/* CHART ROW 2 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-extrabold">Slots Recovered via Backfill</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="h-72 w-full" /> : <SlotsRecoveredChart data={slotsRecovered} stroke={chartStroke} />}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-extrabold">
              Today&apos;s Appointment Risk Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-72 w-full" />
            ) : (
              <RiskDonutChart data={donutData} centerTop="203 Total" centerBottom="Today" />
            )}
          </CardContent>
        </Card>
      </div>

      {/* EQUITY + HEATMAP */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <EquityBreakdown rows={equityRows} />
        </div>
        <RiskHeatMap />
      </div>

      {/* HIGH RISK APPOINTMENTS */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div>
            <CardTitle className="text-base font-extrabold">Today&apos;s High Risk Appointments</CardTitle>
            <div className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
              Showing 8 of 23 high-risk appointments
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={load} aria-label="Refresh data">
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          {loading || !appointments ? (
            <div className="space-y-3">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) : (
            <div className="relative">
              {/* Desktop Table View */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[860px] text-sm">
                  <thead>
                    <tr className="text-left text-[hsl(var(--muted-foreground))]">
                      <th className="py-2 pr-3">Time</th>
                      <th className="py-2 pr-3">Patient Ref</th>
                      <th className="py-2 pr-3">Specialty</th>
                      <th className="py-2 pr-3">Risk Score</th>
                      <th className="py-2 pr-3">Risk Factors</th>
                      <th className="py-2 pr-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((a) => (
                      <tr key={a.id} className="border-t border-[hsl(var(--border))]">
                        <td className="py-3 pr-3 font-semibold">{a.time}</td>
                        <td className="py-3 pr-3">{a.patientRef}</td>
                        <td className="py-3 pr-3">{a.specialty}</td>
                        <td className="py-3 pr-3">
                          <Badge variant={riskBadgeVariant(a.riskScore)}>{a.riskScore}</Badge>
                        </td>
                        <td className="py-3 pr-3 text-[hsl(var(--muted-foreground))]">
                          {a.riskFactors.join(", ")}
                        </td>
                        <td className="py-3 pr-3">
                          <Button
                            variant={a.riskScore >= 80 ? "destructive" : "default"}
                            size="sm"
                            aria-label={`Contact now for ${a.patientRef}`}
                          >
                            Contact Now
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {appointments.map((a) => (
                  <div key={a.id} className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))/0.1] p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-bold">{a.time}</div>
                      <Badge variant={riskBadgeVariant(a.riskScore)}>Score: {a.riskScore}</Badge>
                    </div>
                    <div className="mt-2 text-xs text-[hsl(var(--muted-foreground))]">
                      <span className="font-semibold text-foreground">{a.patientRef}</span> · {a.specialty}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {a.riskFactors.map(f => (
                        <span key={f} className="rounded bg-white/50 px-1.5 py-0.5 text-[10px] dark:bg-black/50">{f}</span>
                      ))}
                    </div>
                    <Button
                      variant={a.riskScore >= 80 ? "destructive" : "default"}
                      size="sm"
                      className="mt-4 w-full"
                      aria-label={`Contact now for ${a.patientRef}`}
                    >
                      Contact Now
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-[hsl(var(--muted-foreground))]">
                  Page 1 of 3
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" aria-label="Previous page" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" aria-label="Next page">
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

