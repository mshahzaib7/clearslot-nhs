import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const complianceCards = [
  {
    title: "NHS DSPT",
    status: { label: "In Progress", variant: "warning" as const },
    desc:
      "NHS Data Security and Protection Toolkit — Standards Met submission in progress. Expected completion: Q3 2026",
    link: "https://www.dsptoolkit.nhs.uk/",
  },
  {
    title: "UK GDPR",
    status: { label: "Compliant", variant: "success" as const },
    desc:
      "Lawful basis: Article 6(1)(e) Public Task. Full DPIA completed. Data minimisation principles applied. No clinical data stored.",
    link: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/",
  },
  {
    title: "Cyber Essentials Plus",
    status: { label: "In Progress", variant: "warning" as const },
    desc:
      "Certification in progress. Required for NHS contract eligibility. Expected Q3 2026.",
    link: "https://www.ncsc.gov.uk/cyberessentials/overview",
  },
  {
    title: "DCB0129 Clinical Safety",
    status: { label: "Compliant", variant: "success" as const },
    desc:
      "Clinical Risk Management standard for health IT manufacturers. Hazard log maintained. Clinical Safety Officer appointed.",
    link: "https://digital.nhs.uk/data-and-information/information-standards/information-standards-and-data-collections-including-extractions/publications-and-notifications/standards-and-collections/dcb0129-clinical-risk-management",
  },
  {
    title: "GP Connect / IM1",
    status: { label: "Applied", variant: "info" as const },
    desc:
      "SCAL application submitted to NHS England. Covers EMIS Web and SystmOne integration via FHIR R4 Appointment Management API.",
    link: "https://digital.nhs.uk/services/gp-connect",
  },
  {
    title: "DCB0160",
    status: { label: "Planned", variant: "default" as const },
    desc:
      "Deploying organisation clinical safety standard. Required at each NHS Trust deployment site.",
    link: "https://digital.nhs.uk/data-and-information/information-standards/information-standards-and-data-collections-including-extractions/publications-and-notifications/standards-and-collections/dcb0160-clinical-risk-management",
  },
] as const;

const retention = [
  ["Appointment risk scores", "30 days post-appointment", "Operational only"],
  ["Reminder send logs", "90 days", "Audit trail"],
  ["Aggregated analytics", "2 years", "Service improvement"],
  ["Patient identifiers", "Never stored", "Real-time lookup only"],
] as const;

const risks = [
  [
    "NHS API accreditation delayed",
    "High",
    "High",
    "Begin SCAL Day 1; build with synthetic data in parallel",
  ],
  [
    "ML model bias vs deprived populations",
    "Medium",
    "High",
    "Quarterly equity audit; stratified performance monitoring",
  ],
  [
    "Patient distressed by over-communication",
    "Medium",
    "Medium",
    "Max 3 contacts per appointment; instant SMS opt-out",
  ],
  [
    "Data breach",
    "Low",
    "Critical",
    "Cyber Essentials Plus; encryption at rest+transit; no clinical data stored",
  ],
  [
    "Clinical safety incident",
    "Low",
    "Critical",
    "DCB0129 compliant; CSO appointed; hazard log maintained",
  ],
  [
    "GP practice resistance to change",
    "High",
    "Medium",
    "Co-design with practice managers; champion programme",
  ],
] as const;

function riskBadge(v: string) {
  if (v === "High" || v === "Critical") return <Badge variant="danger">{v}</Badge>;
  if (v === "Medium") return <Badge variant="warning">{v}</Badge>;
  return <Badge variant="success">{v}</Badge>;
}

export default function CompliancePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-extrabold tracking-tight text-[#003087] dark:text-[#7fb6ff]">
        Compliance &amp; Governance Framework
      </h1>
      <p className="mt-1 max-w-3xl text-sm text-[hsl(var(--muted-foreground))]">
        ClearSlot is built to NHS standards from day one — not as an afterthought.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {complianceCards.map((c) => (
          <Card key={c.title}>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="text-base font-extrabold">{c.title}</CardTitle>
                <Badge variant={c.status.variant}>{c.status.label}</Badge>
              </div>
              <CardDescription className="mt-2">{c.desc}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <a
                href={c.link}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-[#005EB8] hover:underline"
                aria-label={`Open ${c.title} reference`}
              >
                Reference
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-extrabold">What Data ClearSlot Uses and Stores</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
              <div className="font-extrabold">Data We ACCESS (real-time, not stored)</div>
              <ul className="mt-2 list-disc pl-5 text-sm text-[hsl(var(--muted-foreground))]">
                <li>Appointment metadata (via GP Connect FHIR)</li>
                <li>NHS number for identity matching (via PDS API)</li>
                <li>Demographics: age group, postcode (for IMD lookup only)</li>
                <li>Previous DNA history count (not clinical context)</li>
              </ul>
            </div>
            <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
              <div className="font-extrabold">Data We NEVER ACCESS</div>
              <ul className="mt-2 list-disc pl-5 text-sm text-[hsl(var(--muted-foreground))]">
                <li>Clinical diagnoses or medical history</li>
                <li>Medications or prescriptions</li>
                <li>Mental health, HIV, or sensitive category records</li>
                <li>Any data beyond appointment management scope</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-extrabold">Data Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[520px] text-sm">
                  <thead>
                    <tr className="text-left text-[hsl(var(--muted-foreground))]">
                      <th className="py-2 pr-3">Data Type</th>
                      <th className="py-2 pr-3">Retention Period</th>
                      <th className="py-2 pr-3">Justification</th>
                    </tr>
                  </thead>
                  <tbody>
                    {retention.map((r) => (
                      <tr key={r[0]} className="border-t border-[hsl(var(--border))]">
                        <td className="py-3 pr-3 font-semibold">{r[0]}</td>
                        <td className="py-3 pr-3">{r[1]}</td>
                        <td className="py-3 pr-3 text-[hsl(var(--muted-foreground))]">{r[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="grid grid-cols-1 gap-3 md:hidden">
                {retention.map((r) => (
                  <div key={r[0]} className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))/0.1] p-3 text-sm">
                    <div className="font-bold text-[#003087] dark:text-[#7fb6ff]">{r[0]}</div>
                    <div className="mt-1 flex justify-between">
                      <span className="text-[hsl(var(--muted-foreground))]">Retention:</span>
                      <span>{r[1]}</span>
                    </div>
                    <div className="mt-1 text-xs italic text-[hsl(var(--muted-foreground))]">{r[2]}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-extrabold">NHS API Integration Diagram</CardTitle>
            <CardDescription>Illustrative flow (divs/CSS)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <FlowNode title="ClearSlot Platform" />
              <FlowArrow />
              <FlowNode title="GP Connect FHIR R4 API">
                <div className="mt-2 grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
                  <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))/0.5] p-2">
                    EMIS Web (50%+ GP practices)
                  </div>
                  <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))/0.5] p-2">
                    SystmOne (40%+ GP practices)
                  </div>
                </div>
              </FlowNode>
              <FlowArrow />
              <FlowNode title="PDS FHIR API — NHS Spine">
                <div className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                  Patient demographic lookup
                </div>
              </FlowNode>
              <FlowArrow />
              <FlowNode title="NHS Notify">
                <div className="mt-2 grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
                  <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))/0.5] p-2">
                    SMS reminders (free)
                  </div>
                  <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))/0.5] p-2">
                    Email reminders (free)
                  </div>
                </div>
              </FlowNode>
              <FlowArrow />
              <FlowNode title="Met Office DataPoint API">
                <div className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                  Weather risk factor (free)
                </div>
              </FlowNode>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-extrabold">Key Risks and Mitigations</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[720px] text-sm">
                  <thead>
                    <tr className="text-left text-[hsl(var(--muted-foreground))]">
                      <th className="py-2 pr-3">Risk</th>
                      <th className="py-2 pr-3">Likelihood</th>
                      <th className="py-2 pr-3">Impact</th>
                      <th className="py-2 pr-3">Mitigation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {risks.map((r) => (
                      <tr key={r[0]} className="border-t border-[hsl(var(--border))]">
                        <td className="py-3 pr-3 font-semibold">{r[0]}</td>
                        <td className="py-3 pr-3">{riskBadge(r[1])}</td>
                        <td className="py-3 pr-3">{riskBadge(r[2])}</td>
                        <td className="py-3 pr-3 text-[hsl(var(--muted-foreground))]">{r[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {risks.map((r) => (
                  <div key={r[0]} className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))/0.1] p-4 text-sm">
                    <div className="font-bold text-[#003087] dark:text-[#7fb6ff]">{r[0]}</div>
                    <div className="mt-3 flex items-center gap-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Likelihood</span>
                        {riskBadge(r[1])}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Impact</span>
                        {riskBadge(r[2])}
                      </div>
                    </div>
                    <div className="mt-3 rounded-lg bg-white/50 p-2 text-xs dark:bg-black/20">
                      <span className="font-semibold">Mitigation:</span> {r[3]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function FlowNode({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 shadow-sm">
      <div className="text-sm font-extrabold text-[#003087] dark:text-[#7fb6ff]">{title}</div>
      {children}
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex items-center justify-center">
      <div className="h-6 w-0.5 bg-[#005EB8] dark:bg-[#41B6E6]" />
      <div className="-ml-[5px] h-0 w-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#005EB8] dark:border-t-[#41B6E6]" />
    </div>
  );
}

