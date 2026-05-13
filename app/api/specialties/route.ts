import { NextResponse } from "next/server";

import { specialtyRates } from "@/lib/data";
import type { SpecialtyRate } from "@/types";

export const runtime = "nodejs";

export async function GET() {
  const body: SpecialtyRate[] = specialtyRates;
  return NextResponse.json(body, { status: 200 });
}

