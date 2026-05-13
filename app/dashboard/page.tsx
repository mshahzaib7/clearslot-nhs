import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DashboardClient from "@/components/dashboard/DashboardClient";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#003087] dark:text-[#7fb6ff]">
            Analytics Dashboard
          </h1>
          <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
            Operational intelligence for DNA reduction and slot recovery.
          </p>
        </div>
        <Card className="hidden md:block">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm">Status</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Badge variant="info">Demo mode · Synthetic data</Badge>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <DashboardClient />
      </div>
    </div>
  );
}

