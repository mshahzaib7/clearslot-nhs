"use client";

import * as React from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export type DonutDatum = { name: string; value: number; color: string };

export function RiskDonutChart({
  data,
  centerTop,
  centerBottom,
}: {
  data: DonutDatum[];
  centerTop: string;
  centerBottom: string;
}) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-72 w-full bg-[hsl(var(--muted)/0.1)] animate-pulse rounded-full" />;

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="relative h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={2}
            stroke="transparent"
          >
            {data.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-xl font-extrabold">{centerTop}</div>
        <div className="text-xs text-[hsl(var(--muted-foreground))]">{centerBottom}</div>
        <div className="mt-1 text-[10px] text-[hsl(var(--muted-foreground))]">
          Total: {total}
        </div>
      </div>
    </div>
  );
}

