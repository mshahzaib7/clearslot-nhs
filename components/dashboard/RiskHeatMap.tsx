"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RiskHeatMap() {
  const grid = [
    { day: "Mon", am: "High", pm: "Medium" },
    { day: "Tue", am: "Medium", pm: "Low" },
    { day: "Wed", am: "Medium", pm: "Medium" },
    { day: "Thu", am: "Low", pm: "Medium" },
    { day: "Fri", am: "Medium", pm: "High" },
  ] as const;

  const color = (v: "Low" | "Medium" | "High") => {
    if (v === "High") return "bg-[#DA291C]/20 text-[#DA291C] dark:text-[#ff8a8a]";
    if (v === "Medium") return "bg-[#FFB81C]/25 text-[#8a5a00] dark:text-[#FFB81C]";
    return "bg-[#007F3B]/15 text-[#007F3B] dark:text-[#4ade80]";
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Risk Heat Map (illustrative)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="font-semibold text-[hsl(var(--muted-foreground))]">Day</div>
          <div className="font-semibold text-[hsl(var(--muted-foreground))]">AM</div>
          <div className="font-semibold text-[hsl(var(--muted-foreground))]">PM</div>
          {grid.map((r) => (
            <div key={r.day} className="contents">
              <div className="flex items-center font-semibold">{r.day}</div>
              <div className={`rounded-md px-2 py-2 text-center font-semibold ${color(r.am)}`}>{r.am}</div>
              <div className={`rounded-md px-2 py-2 text-center font-semibold ${color(r.pm)}`}>{r.pm}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

