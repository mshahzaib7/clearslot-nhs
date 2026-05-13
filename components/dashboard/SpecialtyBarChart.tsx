"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { SpecialtyRate } from "@/types";

function barColor(rate: number) {
  if (rate > 8) return "#DA291C";
  if (rate >= 6) return "#FFB81C";
  return "#007F3B";
}

export function SpecialtyBarChart({ data }: { data: SpecialtyRate[] }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-72 w-full bg-[hsl(var(--muted)/0.1)] animate-pulse rounded-lg" />;

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
          <CartesianGrid stroke="currentColor" strokeDasharray="3 3" opacity={0.1} />
          <XAxis dataKey="specialty" interval={0} angle={-20} textAnchor="end" height={60} tick={{ fontSize: 11, fill: 'currentColor' }} stroke="currentColor" opacity={0.5} />
          <YAxis unit="%" tick={{ fontSize: 12, fill: 'currentColor' }} stroke="currentColor" opacity={0.5} domain={[0, 12]} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
            itemStyle={{ color: 'inherit' }}
            formatter={(v) => (typeof v === "number" ? `${v.toFixed(1)}%` : v)} 
          />
          <Bar dataKey="rate" radius={[8, 8, 0, 0]}>
            {data.map((d) => (
              <Cell key={d.specialty} fill={barColor(d.rate)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

