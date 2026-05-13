import { NextResponse } from "next/server";

import { backfillData } from "@/lib/data";
import type { BackfillResponse } from "@/types";

export const runtime = "nodejs";

export async function GET() {
  const body: BackfillResponse = backfillData;
  return NextResponse.json(body, { status: 200 });
}

