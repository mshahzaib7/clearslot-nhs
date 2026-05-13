"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BackfillStatus({
  openSlots,
  reserveList,
  avgFillMinutes,
}: {
  openSlots: number;
  reserveList: number;
  avgFillMinutes: number;
}) {
  const hrs = Math.floor(avgFillMinutes / 60);
  const mins = avgFillMinutes % 60;
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-[hsl(var(--muted-foreground))]">Open Slots Today</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-extrabold">{openSlots}</CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-[hsl(var(--muted-foreground))]">Reserve List Size</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-extrabold">{reserveList}</CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-[hsl(var(--muted-foreground))]">Avg Fill Time</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-extrabold">
          {hrs}hr {mins}min
        </CardContent>
      </Card>
    </div>
  );
}

