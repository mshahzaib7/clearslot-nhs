import { NextResponse } from "next/server";

import { highRiskAppointments } from "@/lib/data";
import type { HighRiskAppointment } from "@/types";

export const runtime = "nodejs";

export async function GET() {
  const body: HighRiskAppointment[] = highRiskAppointments;
  return NextResponse.json(body, { status: 200 });
}

