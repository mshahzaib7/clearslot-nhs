import RiskEngineClient from "@/components/risk-engine/RiskEngineClient";

export default function RiskEnginePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-extrabold tracking-tight text-[#003087] dark:text-[#7fb6ff]">
        DNA Risk Scoring Engine
      </h1>
      <p className="mt-1 max-w-3xl text-sm text-[hsl(var(--muted-foreground))]">
        Simulate how ClearSlot&apos;s ML model scores appointment risk. In production, this runs
        automatically for every booking.
      </p>

      <div className="mt-8">
        <RiskEngineClient />
      </div>
    </div>
  );
}

