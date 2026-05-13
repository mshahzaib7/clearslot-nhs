"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type EquityRow = {
  quintile: number;
  label: string;
  rate: string;
  change: string;
  status: "Improving" | "On Target";
};

export function EquityBreakdown({ rows }: { rows: EquityRow[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-extrabold">
          DNA Rate by Deprivation Quintile (IMD)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="text-left text-[hsl(var(--muted-foreground))]">
                <th className="py-2 pr-3">Quintile</th>
                <th className="py-2 pr-3">Label</th>
                <th className="py-2 pr-3">DNA Rate</th>
                <th className="py-2 pr-3">Change vs Baseline</th>
                <th className="py-2 pr-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.quintile} className="border-t border-[hsl(var(--border))]">
                  <td className="py-3 pr-3 font-semibold">{r.quintile}</td>
                  <td className="py-3 pr-3">{r.label}</td>
                  <td className="py-3 pr-3 font-semibold">{r.rate}</td>
                  <td className="py-3 pr-3">{r.change}</td>
                  <td className="py-3 pr-3">
                    <Badge variant={r.status === "On Target" ? "success" : "info"}>
                      {r.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-[hsl(var(--muted-foreground))]">
          ClearSlot monitors equity to ensure AI improvements reach the most deprived
          populations first.
        </p>
      </CardContent>
    </Card>
  );
}

