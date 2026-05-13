"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type BackfillWeek = { week: string; recovered: number; lost: number };

export function BackfillPerformanceChart({ data }: { data: BackfillWeek[] }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-80 w-full bg-[hsl(var(--muted)/0.1)] animate-pulse rounded-lg" />;

  const withRate = data.map((d) => ({
    ...d,
    rate: d.recovered + d.lost === 0 ? 0 : Math.round((d.recovered / (d.recovered + d.lost)) * 100),
  }));

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={withRate} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid stroke="currentColor" strokeDasharray="3 3" opacity={0.1} />
          <XAxis dataKey="week" tick={{ fontSize: 12, fill: 'currentColor' }} stroke="currentColor" opacity={0.5} />
          <YAxis tick={{ fontSize: 12, fill: 'currentColor' }} stroke="currentColor" opacity={0.5} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
            itemStyle={{ color: 'inherit' }}
            formatter={(v, name) => (name === "rate" ? `${v}%` : `${v}`)} 
          />
          <Legend />
          <Bar dataKey="recovered" name="Recovered" fill="#007F3B" radius={[6, 6, 0, 0]}>
            <LabelList dataKey="rate" position="top" formatter={(v: any) => `${v}%`} style={{ fontSize: '10px', fontWeight: 'bold', fill: 'currentColor', opacity: 0.8 }} />
          </Bar>
          <Bar dataKey="lost" name="Lost" fill="#DA291C" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

