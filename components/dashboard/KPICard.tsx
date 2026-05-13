"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function KPICard({
  title,
  value,
  badgeText,
  badgeVariant,
}: {
  title: string;
  value: string;
  badgeText: string;
  badgeVariant: "warning" | "success" | "info" | "default";
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-[hsl(var(--muted-foreground))]">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-end justify-between gap-4">
        <div className="text-2xl font-extrabold">{value}</div>
        <Badge variant={badgeVariant}>{badgeText}</Badge>
      </CardContent>
    </Card>
  );
}

