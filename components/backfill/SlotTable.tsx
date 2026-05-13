"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BackfillSlot } from "@/types";

function statusVariant(status: BackfillSlot["status"]) {
  if (status === "Filled") return "success";
  if (status === "Contacting") return "warning";
  return "default";
}

export function SlotTable({ slots }: { slots: BackfillSlot[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-extrabold">
          Slots Available for Backfill Right Now
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          {/* Desktop Table View */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[980px] text-sm">
              <thead>
                <tr className="text-left text-[hsl(var(--muted-foreground))]">
                  <th className="py-2 pr-3">Slot Time</th>
                  <th className="py-2 pr-3">Specialty</th>
                  <th className="py-2 pr-3">Clinician</th>
                  <th className="py-2 pr-3">Vacancy Reason</th>
                  <th className="py-2 pr-3">Reserve Matches</th>
                  <th className="py-2 pr-3">Status</th>
                  <th className="py-2 pr-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {slots.map((s) => (
                  <tr key={s.id} className="border-t border-[hsl(var(--border))]">
                    <td className="py-3 pr-3 font-semibold">{s.slotTime}</td>
                    <td className="py-3 pr-3">{s.specialty}</td>
                    <td className="py-3 pr-3">{s.clinician}</td>
                    <td className="py-3 pr-3 text-[hsl(var(--muted-foreground))]">{s.vacancyReason}</td>
                    <td className="py-3 pr-3 font-semibold">{s.reserveMatches}</td>
                    <td className="py-3 pr-3">
                      <Badge
                        variant={statusVariant(s.status)}
                        className={s.status === "Contacting" ? "animate-pulse" : undefined}
                      >
                        {s.status === "Filled" ? "Filled ✓" : s.status}
                      </Badge>
                    </td>
                    <td className="py-3 pr-3">
                      <Button
                        variant={s.action === "Activate" ? "default" : "outline"}
                        size="sm"
                        aria-label={`${s.action} slot ${s.id}`}
                      >
                        {s.action}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {slots.map((s) => (
              <div key={s.id} className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))/0.1] p-4 text-sm">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-[#003087] dark:text-[#7fb6ff]">{s.slotTime}</div>
                  <Badge
                    variant={statusVariant(s.status)}
                    className={s.status === "Contacting" ? "animate-pulse" : undefined}
                  >
                    {s.status === "Filled" ? "Filled ✓" : s.status}
                  </Badge>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-y-2 text-xs">
                  <div>
                    <span className="text-[hsl(var(--muted-foreground))]">Specialty:</span>
                    <div className="font-medium">{s.specialty}</div>
                  </div>
                  <div>
                    <span className="text-[hsl(var(--muted-foreground))]">Clinician:</span>
                    <div className="font-medium">{s.clinician}</div>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[hsl(var(--muted-foreground))]">Reason:</span>
                    <div className="font-medium">{s.vacancyReason}</div>
                  </div>
                  <div>
                    <span className="text-[hsl(var(--muted-foreground))]">Matches:</span>
                    <div className="font-medium">{s.reserveMatches}</div>
                  </div>
                </div>
                <Button
                  variant={s.action === "Activate" ? "default" : "outline"}
                  size="sm"
                  className="mt-4 w-full"
                  aria-label={`${s.action} slot ${s.id}`}
                >
                  {s.action}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

