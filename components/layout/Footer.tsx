import Link from "next/link";
import { Code, Link as LinkIcon, ExternalLink, ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[hsl(var(--border))] bg-[#F0F4F5] dark:bg-[#0f131a]">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-lg font-bold text-[#003087] dark:text-[#7fb6ff]">
              🏥 <span>ClearSlot</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
              An advanced NHS Appointment Intelligence Platform designed to predict DNA risks 
              and automate slot recovery through ethical AI and FHIR-based integration.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[#007F3B] dark:text-[#4ade80]">
              <ShieldCheck className="h-4 w-4" />
              <span>DSPT · UK GDPR · DCB0129 Compliant Architecture</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#003087] dark:text-[#7fb6ff]">
              Resources
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="text-[hsl(var(--muted-foreground))] hover:text-[#005EB8] transition-colors">Dashboard</Link>
              </li>
              <li>
                <Link href="/risk-engine" className="text-[hsl(var(--muted-foreground))] hover:text-[#005EB8] transition-colors">Risk Engine</Link>
              </li>
              <li>
                <Link href="/compliance" className="text-[hsl(var(--muted-foreground))] hover:text-[#005EB8] transition-colors">Governance</Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-[hsl(var(--muted-foreground))] hover:text-[#005EB8] transition-colors">Roadmap</Link>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#003087] dark:text-[#7fb6ff]">
              Connect
            </h4>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href="https://github.com/mshahzaib7/clearslot-nhs"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[#005EB8] transition-colors"
              >
                <Code className="h-4 w-4" />
                <span>GitHub Repository</span>
              </a>
              <a
                href="https://www.linkedin.com/in/sib00"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[#005EB8] transition-colors"
              >
                <LinkIcon className="h-4 w-4" />
                <span>LinkedIn Profile</span>
              </a>
              <a
                href="https://clearslot-nhs.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[#005EB8] transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Live Deployment</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[hsl(var(--border))] pt-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-xs text-[hsl(var(--muted-foreground))]">
              <span className="font-semibold text-[#003087] dark:text-[#7fb6ff]">Data Sources:</span> NHS England · BMA · GP Patient Survey 2025
            </div>
            
            <div className="flex flex-col items-center gap-2 md:items-end">
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <span>Developed by</span>
                {/* <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" />
                <span>by</span> */}
                <span className="font-bold text-[#003087] dark:text-[#7fb6ff]">Muhammad Shahzaib Khan</span>
              </div>
              <p className="text-[10px] text-[hsl(var(--muted-foreground))]">
                © {currentYear} ClearSlot.
              </p>
              <p className="max-w-[300px] text-right text-[10px] leading-tight text-[hsl(var(--muted-foreground))]">
                Built with publicly available NHS data · For research and demonstration purposes only · Not a regulated medical device
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

