import { NextResponse } from "next/server";

import { kpis } from "@/lib/data";
import type { KPIResponse } from "@/types";

export const runtime = "nodejs";

export async function GET() {
  const body: KPIResponse = kpis;
  return NextResponse.json(body, { status: 200 });
}

