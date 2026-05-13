import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/landing/AnimatedCounter";
import { Hero3DCard } from "@/components/landing/Hero3DCard";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative min-h-[450px] overflow-hidden bg-[#003087] text-white flex items-center">
        {/* 3D BACKGROUND LAYERS */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
        <div className="absolute inset-0 bg-dot-pattern opacity-20" />

        {/* BLOOMS / ORBS */}
        <div className="absolute top-[-10%] left-[-5%] h-[600px] w-[600px] rounded-full bg-[#005EB8] opacity-30 blur-[120px] animate-float-slow" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[700px] w-[700px] rounded-full bg-[#41B6E6] opacity-20 blur-[150px] animate-float-slow" style={{ animationDelay: '-5s' }} />

        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12 lg:grid-cols-2 lg:gap-12 lg:py-20">
          <div className="flex flex-col justify-center animate-fade-in-up text-center lg:text-left" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <div className="flex h-9 sm:h-10 w-20 sm:w-24 items-center justify-center rounded-xl bg-white p-2 shadow-lg shadow-black/20">
                <Image
                  src="/nhs-logo-placeholder.svg"
                  alt="NHS logo placeholder"
                  width={80}
                  height={28}
                  className="w-full h-auto"
                  priority
                />
              </div>
              <span className="rounded-full bg-white/10 px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md border border-white/10 whitespace-nowrap">
                AI Precision Platform
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-7xl leading-[0.95] sm:leading-[0.9] animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              Predict <br className="hidden sm:block" />
              <span className="text-[#41B6E6]">the Gap.</span>
            </h1>

            <p className="mt-6 mx-auto lg:mx-0 max-w-xl text-base text-white/80 md:text-lg leading-relaxed font-medium animate-fade-in-up" style={{ animationDelay: '500ms' }}>
              ClearSlot uses cutting-edge machine learning to reclaim clinical time and optimize NHS outpatient capacity in real-time.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '700ms' }}>
              <Button asChild variant="default" size="lg" className="h-12 px-8 text-base font-bold rounded-xl shadow-2xl shadow-blue-900/50 hover:scale-105 transition-transform" aria-label="View dashboard">
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base font-bold rounded-xl border-white/20 text-white hover:bg-white/10 backdrop-blur-xl transition-all hover:scale-105"
                aria-label="See how it works"
              >
                <a href="#how-it-works">Watch the Demo</a>
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 animate-fade-in-up max-w-sm mx-auto lg:mx-0" style={{ animationDelay: '900ms' }}>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4 backdrop-blur-xl">
                <div className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.3em] text-[#41B6E6]">Annual Target</div>
                <div className="mt-1 text-xl sm:text-2xl font-black">
                  <AnimatedCounter value={15} suffix="M" />
                </div>
                <div className="mt-0.5 text-[8px] sm:text-[9px] text-white/40 font-bold uppercase tracking-widest">Slots Recovered</div>
              </div>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4 backdrop-blur-xl">
                <div className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.3em] text-[#41B6E6]">Est. Efficiency</div>
                <div className="mt-1 text-xl sm:text-2xl font-black">
                  <AnimatedCounter value={68} suffix="%" />
                </div>
                <div className="mt-0.5 text-[8px] sm:text-[9px] text-white/40 font-bold uppercase tracking-widest">Backfill Rate</div>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center animate-fade-in-up mt-8 lg:mt-0" style={{ animationDelay: '400ms' }}>
            <Hero3DCard>
              <div className="w-full max-w-[280px] sm:max-w-sm rounded-2xl bg-white/10 p-4 sm:p-5 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] backdrop-blur-[50px] border border-white/20 relative group transition-all duration-500">
                {/* INTERACTIVE GLOW */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#41B6E6] to-[#005EB8] rounded-[3.5rem] blur opacity-10 group-hover:opacity-30 transition-opacity" />

                <div className="relative flex flex-col h-full">
                  <div className="flex items-center justify-between">
                    <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Live Intelligence</div>
                    <div className="flex gap-2">
                      <div className="h-1 w-1 rounded-full bg-[#41B6E6] animate-pulse" />
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
                    {[
                      { label: "High Risk", val: "23", color: "text-red-400" },
                      { label: "Recovered", val: "47", color: "text-emerald-400" },
                      { label: "DNA Rate", val: "4.2%", color: "text-white" },
                      { label: "Daily Savings", val: "£18k", color: "text-[#41B6E6]" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-[0.8rem] sm:rounded-[1rem] bg-white/5 p-3 sm:p-4 border border-white/5 hover:bg-white/10 transition-all">
                        <div className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-white/30">{item.label}</div>
                        <div className={cn("mt-1 sm:mt-2 text-xl sm:text-2xl font-black tracking-tighter", item.color)}>{item.val}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-3 sm:p-4 rounded-[0.8rem] sm:rounded-[1rem] bg-white/5 border border-white/5">
                    <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-white/30">
                      <span>Governance Protocols</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {['DSPT', 'GDPR', 'DCB0129'].map(t => (
                        <div key={t} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[7px] sm:text-[8px] font-black">{t}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Hero3DCard>
          </div>
        </div>
      </section>

      <section className="bg-[hsl(var(--background))]">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {[
              { big: "15M", label: "missed appointments" },
              { big: "£1.9B", label: "annual cost" },
              { big: "1.2M", label: "GP hours wasted" },
              { big: "6.4%", label: "DNA rate" },
            ].map((s) => (
              <Card key={s.label} className="border-none shadow-none bg-transparent">
                <CardHeader className="p-3 sm:p-6 text-center md:text-left">
                  <CardTitle className="text-xl sm:text-2xl font-extrabold text-[#003087] dark:text-[#7fb6ff]">
                    {s.big}
                  </CardTitle>
                  <CardDescription className="text-[10px] sm:text-sm font-medium">{s.label}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-white dark:bg-[#0f131a]">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#003087] dark:text-[#7fb6ff]">
              How ClearSlot Works
            </h2>
            <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
              Predict → Prevent → Recover, with transparent governance and measurable impact.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                n: "1",
                title: "Predict",
                desc:
                  "ML model scores every appointment 0-100 for DNA risk using booking data, demographics, weather, and history",
              },
              {
                n: "2",
                title: "Prevent",
                desc:
                  "Smart reminders sent at the optimal time via SMS and email — tailored by risk level and patient preference",
              },
              {
                n: "3",
                title: "Recover",
                desc:
                  "When a slot is vacated, the backfill engine contacts the next eligible patient on the reserve list automatically",
              },
            ].map((step) => (
              <Card key={step.n} className="border-[#005EB8]/20 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="p-8">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#005EB8]/10 text-[#005EB8] text-xl font-extrabold">
                      {step.n}
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </div>
                  <CardDescription className="mt-6 text-base leading-relaxed">{step.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-[hsl(var(--background))] border-y border-[hsl(var(--border))]">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#003087] dark:text-[#7fb6ff]">
            Platform Features
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["DNA Risk Scoring", "XGBoost ML model, 0-100 score per appointment"],
              ["Smart Reminders", "Multi-channel, optimal timing, 2-way SMS"],
              ["Instant Backfill", "Automated reserve list management"],
              ["Equity Monitoring", "IMD quintile breakdown, bias detection"],
              ["NHS Integration", "GP Connect FHIR API, EMIS + SystmOne"],
              ["DSPT Compliant", "UK GDPR, DCB0129, Cyber Essentials Plus"],
            ].map(([title, desc]) => (
              <Card key={title} className="hover:border-[#005EB8]/40 transition-colors">
                <CardHeader className="p-8">
                  <CardTitle className="text-lg font-extrabold">{title}</CardTitle>
                  <CardDescription className="mt-2 text-sm leading-relaxed">{desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="bg-white dark:bg-[#0f131a]">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#003087] dark:text-[#7fb6ff]">
            Proven Impact
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              ["30% reduction in DNAs", "Proven at Mid & South Essex NHS Trust"],
              ["£27.5M estimated annual saving per Trust", "Modelled from DNA cost and recovery rates"],
              ["1,910 additional patients seen in 6-month pilot", "Recovered capacity via backfill"],
            ].map(([stat, source]) => (
              <Card key={stat} className="bg-[hsl(var(--muted)/0.3)] border-none">
                <CardHeader className="p-10 text-center">
                  <CardTitle className="text-3xl font-extrabold text-[#005EB8] dark:text-[#7fb6ff]">{stat}</CardTitle>
                  <CardDescription className="mt-4 text-base font-medium">{source}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="bg-[#003087] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="mx-auto flex max-w-6xl flex-col items-center text-center lg:text-left lg:items-start lg:flex-row justify-between gap-8 px-4 py-16 relative z-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black">
              Ready to reduce missed appointments?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-white/70 max-w-xl">
              Explore the dashboard and see the intelligence layer in action. Join leading Trusts in reclaiming clinical capacity.
            </p>
          </div>
          <Button asChild size="lg" variant="default" className="bg-white text-[#003087] hover:bg-white/90 h-14 px-10 text-lg font-bold rounded-xl shadow-xl transition-all hover:scale-105 shrink-0" aria-label="Explore dashboard">
            <Link href="/dashboard">Explore Dashboard</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
