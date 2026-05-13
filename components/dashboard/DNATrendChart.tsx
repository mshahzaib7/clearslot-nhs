"use client";

import * as React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type DNATrendPoint = { month: string; before: number | null; after: number | null };

export function DNATrendChart({ data, stroke }: { data: DNATrendPoint[]; stroke: string }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-72 w-full bg-[hsl(var(--muted)/0.1)] animate-pulse rounded-lg" />;

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid stroke="currentColor" strokeDasharray="3 3" opacity={0.1} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'currentColor' }} stroke="currentColor" opacity={0.5} />
          <YAxis unit="%" tick={{ fontSize: 12, fill: 'currentColor' }} stroke="currentColor" opacity={0.5} domain={[0, 12]} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
            itemStyle={{ color: 'inherit' }}
            formatter={(v) => (typeof v === "number" ? `${v.toFixed(1)}%` : v)} 
          />
          <Legend />
          <ReferenceLine y={3} stroke="#41B6E6" strokeDasharray="4 4" label="Target 3%" />
          <Line
            type="monotone"
            dataKey="before"
            name="Baseline (pre-ClearSlot)"
            stroke="#9CA3AF"
            strokeWidth={2}
            strokeDasharray="6 6"
            dot={false}
            connectNulls={false}
          />
          <Line
            type="monotone"
            dataKey="after"
            name="With ClearSlot"
            stroke={stroke}
            strokeWidth={3}
            dot={false}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

