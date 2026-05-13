import { NextResponse } from "next/server";
import { z } from "zod";

import { scoreRisk } from "@/lib/riskEngine";
import type { RiskScoreRequest, RiskScoreResponse } from "@/types";

export const runtime = "nodejs";

const RiskScoreSchema = z.object({
  specialty: z.string().min(1),
  dayOfWeek: z.string().min(1),
  timeSlot: z.string().min(1),
  leadTimeDays: z.number().int().min(1).max(90),
  ageGroup: z.string().min(1),
  imdScore: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
  ]),
  previousDNAs: z.enum(["None", "1 previous DNA", "2 DNAs", "3+ DNAs"]),
  reminderSent: z.boolean(),
  weather: z.enum(["Clear", "Cloudy", "Rain", "Heavy Rain", "Snow/Ice"]),
  transportBarrier: z.boolean(),
});

export async function POST(req: Request) {
  try {
    const json = (await req.json()) as unknown;
    const parsed = RiskScoreSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const input = parsed.data as unknown as RiskScoreRequest;
    const result: RiskScoreResponse = scoreRisk(input);
    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to calculate risk score" },
      { status: 500 },
    );
  }
}

