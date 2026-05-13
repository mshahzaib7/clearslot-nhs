import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const phases = [
  {
    phase: "PHASE 0 — Foundation (Months 1–3)",
    status: { label: "IN PROGRESS", variant: "info" as const, pulse: true },
    icon: "🏗️",
    border: "border-l-[#005EB8]",
    items: [
      "✅ Register company and legal entity",
      "✅ Set up Azure UK South environment",
      "🔄 Submit NHS DSPT self-assessment",
      "🔄 Apply for Cyber Essentials Plus",
      "🔄 Submit GP Connect SCAL application",
      "🔄 Appoint Clinical Safety Officer",
      "🔄 Build ML model on NHS synthetic data",
      "⏳ Recruit 2 GP pilot practices",
    ],
  },
  {
    phase: "PHASE 1 — MVP Pilot (Months 4–9)",
    status: { label: "UPCOMING", variant: "default" as const, pulse: false },
    icon: "🚀",
    border: "border-l-[hsl(var(--border))]",
    items: [
      "⏳ DSPT \"Standards Met\" achieved",
      "⏳ GP Connect IM1 accreditation received",
      "⏳ DPIA signed by Caldicott Guardian",
      "⏳ ClearSlot live at 2–3 GP practices",
      "⏳ ML model trained on live appointment data",
      "⏳ Smart reminder engine live via NHS Notify",
      "⏳ Basic backfill engine live",
      "⏳ Practice manager dashboard live",
    ],
  },
  {
    phase: "PHASE 2 — Evidence (Months 10–12)",
    status: { label: "FUTURE", variant: "default" as const, pulse: false },
    icon: "📊",
    border: "border-l-[hsl(var(--border))]",
    items: [
      "⏳ Independent pilot evaluation (university partner)",
      "⏳ Equity audit across IMD quintiles",
      "⏳ Patient satisfaction survey",
      "⏳ Verified cost saving calculated (target: £100k+)",
      "⏳ Case study / white paper published",
      "⏳ NHS AI Lab innovation registry submission",
      "⏳ ICB procurement pitch with evidence pack",
    ],
  },
  {
    phase: "PHASE 3 — Scale (Months 13–24)",
    status: { label: "FUTURE", variant: "default" as const, pulse: false },
    icon: "📈",
    border: "border-l-[hsl(var(--border))]",
    items: [
      "⏳ Full PCN rollout (10–15 practices)",
      "⏳ Outpatient DNA module added",
      "⏳ WhatsApp channel added",
      "⏳ NHS App notification integration",
      "⏳ Automated backfill (no human in loop)",
      "⏳ Multi-language support (10 languages)",
      "⏳ Second ICS onboarded",
      "⏳ G-Cloud 14 Framework Agreement applied",
    ],
  },
] as const;

const resources = [
  ["Full-stack developer", "Full-time", "18 months"],
  ["ML / Data engineer", "Full-time", "12 months"],
  ["NHS Integration specialist", "Contract", "6 months"],
  ["Clinical Safety Officer", "Part-time (1 day/wk)", "18 months"],
  ["Project Lead", "Full-time", "18 months"],
] as const;

const budget = [
  ["Azure UK South (18 months)", "£8,000–15,000"],
  ["Cyber Essentials Plus", "£2,000–5,000"],
  ["DSPT / IG consultant", "£3,000–8,000"],
  ["NHS Notify (SMS)", "FREE"],
  ["GP Connect / SCAL", "FREE (time only)"],
  ["Clinical Safety Officer", "£10,000–20,000"],
  ["Legal (DPA, contracts)", "£5,000–10,000"],
  ["Independent pilot evaluation", "£5,000–10,000"],
  ["Total MVP Budget", "£33,000–68,000"],
] as const;

const funding = [
  {
    title: "Innovate UK Smart Grants",
    amount: "£25k–£500k",
    for: "UK-registered companies",
    status: "Apply during Phase 0",
  },
  {
    title: "NIHR i4i (Invention for Innovation)",
    amount: "Up to £1M",
    for: "Requires NHS partner",
    status: "Apply at Phase 2 with pilot evidence",
  },
  {
    title: "ICB Innovation Budget",
    amount: "£10k–£50k",
    for: "Pilot co-funding from partner ICB",
    status: "Negotiate during Phase 1",
  },
] as const;

export default function RoadmapPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-extrabold tracking-tight text-[#003087] dark:text-[#7fb6ff]">
        From Idea to NHS Impact
      </h1>
      <p className="mt-1 max-w-3xl text-sm text-[hsl(var(--muted-foreground))]">
        A realistic, evidence-based roadmap from MVP to national deployment.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-4">
        {phases.map((p) => (
          <Card key={p.phase} className={`border-l-4 ${p.border}`}>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div className="text-lg" aria-hidden>
                  {p.icon}
                </div>
                <Badge className={p.status.pulse ? "animate-pulse" : undefined} variant={p.status.variant}>
                  {p.status.label}
                </Badge>
              </div>
              <CardTitle className="text-base font-extrabold">{p.phase}</CardTitle>
              <CardDescription>Milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
                {p.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-extrabold">Resource Estimate</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[520px] text-sm">
                  <thead>
                    <tr className="text-left text-[hsl(var(--muted-foreground))]">
                      <th className="py-2 pr-3">Role</th>
                      <th className="py-2 pr-3">Type</th>
                      <th className="py-2 pr-3">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resources.map((r) => (
                      <tr key={r[0]} className="border-t border-[hsl(var(--border))]">
                        <td className="py-3 pr-3 font-semibold">{r[0]}</td>
                        <td className="py-3 pr-3">{r[1]}</td>
                        <td className="py-3 pr-3">{r[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="grid grid-cols-1 gap-2 md:hidden">
                {resources.map((r) => (
                  <div key={r[0]} className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))/0.1] p-3 text-sm">
                    <div className="font-bold text-[#003087] dark:text-[#7fb6ff]">{r[0]}</div>
                    <div className="mt-1 flex justify-between text-xs">
                      <span>{r[1]}</span>
                      <span className="font-medium">{r[2]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-extrabold">Budget Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[520px] text-sm">
                  <thead>
                    <tr className="text-left text-[hsl(var(--muted-foreground))]">
                      <th className="py-2 pr-3">Item</th>
                      <th className="py-2 pr-3">Estimated Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budget.map((b) => (
                      <tr key={b[0]} className="border-t border-[hsl(var(--border))]">
                        <td className="py-3 pr-3 font-semibold">{b[0]}</td>
                        <td className="py-3 pr-3">{b[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="grid grid-cols-1 gap-2 md:hidden">
                {budget.map((b) => (
                  <div key={b[0]} className="flex items-center justify-between rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))/0.1] p-3 text-sm">
                    <div className="font-semibold text-[#003087] dark:text-[#7fb6ff]">{b[0]}</div>
                    <div className="font-bold">{b[1]}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-extrabold tracking-tight text-[#003087] dark:text-[#7fb6ff]">
          Funding Options
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {funding.map((f) => (
            <Card key={f.title}>
              <CardHeader>
                <CardTitle className="text-base font-extrabold">{f.title}</CardTitle>
                <CardDescription>{f.amount}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-[hsl(var(--muted-foreground))]">
                <div>
                  <span className="font-semibold text-[hsl(var(--foreground))]">For:</span> {f.for}
                </div>
                <div className="mt-2">
                  <span className="font-semibold text-[hsl(var(--foreground))]">Status:</span> {f.status}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

