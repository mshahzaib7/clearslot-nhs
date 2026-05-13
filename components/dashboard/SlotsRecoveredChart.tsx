"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type SlotsRecoveredPoint = { month: string; slots: number };

export function SlotsRecoveredChart({
  data,
  stroke,
}: {
  data: SlotsRecoveredPoint[];
  stroke: string;
}) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-72 w-full bg-[hsl(var(--muted)/0.1)] animate-pulse rounded-lg" />;

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="nhsBlueFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={stroke} stopOpacity={0.45} />
              <stop offset="100%" stopColor={stroke} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="currentColor" strokeDasharray="3 3" opacity={0.1} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'currentColor' }} stroke="currentColor" opacity={0.5} />
          <YAxis tick={{ fontSize: 12, fill: 'currentColor' }} stroke="currentColor" opacity={0.5} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
            itemStyle={{ color: 'inherit' }}
          />
          <Area
            type="monotone"
            dataKey="slots"
            stroke={stroke}
            strokeWidth={3}
            fill="url(#nhsBlueFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

