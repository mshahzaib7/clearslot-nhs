import BackfillClient from "@/components/backfill/BackfillClient";

export default function BackfillPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-extrabold tracking-tight text-[#003087] dark:text-[#7fb6ff]">
        Slot Recovery Engine
      </h1>
      <p className="mt-1 max-w-3xl text-sm text-[hsl(var(--muted-foreground))]">
        When a slot becomes available, ClearSlot automatically contacts the next eligible patient
        from the reserve waitlist.
      </p>
      <div className="mt-8">
        <BackfillClient />
      </div>
    </div>
  );
}

