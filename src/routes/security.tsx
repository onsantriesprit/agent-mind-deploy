import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/deployai/Layout";
import { motion } from "framer-motion";
import { ShieldCheck, AlertOctagon, AlertTriangle, Info, Lock, Bug, KeyRound, FileSearch } from "lucide-react";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security · DeployAI" },
      { name: "description", content: "Full SAST/DAST report — Semgrep, Bandit, Trivy, detect-secrets — gated by configurable threshold." },
    ],
  }),
  component: SecurityPage,
});

const tools = [
  { name: "Semgrep", desc: "OWASP rules · SAST", findings: { critical: 0, high: 0, medium: 2, low: 5 }, icon: FileSearch },
  { name: "Bandit", desc: "Python vulnerabilities", findings: { critical: 0, high: 0, medium: 0, low: 0 }, icon: Bug },
  { name: "Trivy", desc: "Filesystem CVE scan", findings: { critical: 0, high: 1, medium: 3, low: 8 }, icon: ShieldCheck },
  { name: "detect-secrets", desc: "Tokens · API keys", findings: { critical: 0, high: 0, medium: 0, low: 0 }, icon: KeyRound },
] as const;

function SecurityPage() {
  const score = 92.4;
  const threshold = 80;
  return (
    <Layout title="Security" subtitle="SAST · DAST · Secrets · Gate">
      {/* Score header */}
      <div className="grid lg:grid-cols-[420px_1fr] gap-6 mb-6">
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-2xl border border-border glass p-6 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative flex items-center gap-6">
            <ScoreRing value={score} />
            <div>
              <div className="text-[10px] font-mono text-muted-foreground tracking-widest">SECURITY GATE</div>
              <div className="mt-1 inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-success/10 border border-success/30">
                <Lock className="h-3.5 w-3.5 text-success" />
                <span className="text-xs font-mono text-success">PASS · {score} ≥ {threshold}</span>
              </div>
              <div className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-[200px]">
                Deployment authorized.<br/>Threshold defined in <code className="text-primary">.env</code>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Sev label="Critical" value={0} icon={AlertOctagon} tone="danger" />
          <Sev label="High" value={1} icon={AlertTriangle} tone="warning" />
          <Sev label="Medium" value={5} icon={Info} tone="primary" />
          <Sev label="Low" value={13} icon={Info} tone="muted" />
        </div>
      </div>

      {/* Tools grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {tools.map((t, i) => {
          const Icon = t.icon;
          const total = Object.values(t.findings).reduce((a, b) => a + b, 0);
          return (
            <motion.div key={t.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i, duration: 0.4 }}
              className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start justify-between mb-3">
                <Icon className="h-5 w-5 text-primary" />
                <span className={`text-xs font-mono ${total === 0 ? "text-success" : "text-warning"}`}>
                  {total === 0 ? "CLEAN" : `${total} found`}
                </span>
              </div>
              <div className="font-semibold">{t.name}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{t.desc}</div>
              <div className="mt-4 grid grid-cols-4 gap-1.5 text-center">
                {(["critical","high","medium","low"] as const).map((k) => (
                  <div key={k} className="rounded bg-surface/60 py-1.5">
                    <div className="text-sm font-mono font-semibold">{t.findings[k]}</div>
                    <div className="text-[9px] text-muted-foreground tracking-wider uppercase">{k.slice(0,3)}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Findings table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold">Findings</h3>
          <span className="text-xs font-mono text-muted-foreground">19 issues · sorted by severity</span>
        </div>
        <table className="w-full text-sm">
          <thead className="text-[10px] font-mono text-muted-foreground tracking-widest">
            <tr className="border-b border-border">
              <th className="text-left px-5 py-3">SEVERITY</th>
              <th className="text-left px-5 py-3">RULE</th>
              <th className="text-left px-5 py-3 hidden md:table-cell">FILE</th>
              <th className="text-left px-5 py-3">TOOL</th>
              <th className="text-right px-5 py-3">CWE</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["high", "CVE-2021-23337", "node_modules/lodash/template.js", "Trivy", "CWE-94"],
              ["medium", "Hardcoded token in test", "tests/auth.spec.ts", "Semgrep", "CWE-798"],
              ["medium", "SQL string concat", "api/orders.py", "Semgrep", "CWE-89"],
              ["medium", "CVE-2023-28466", "go.mod / go-jwt", "Trivy", "CWE-347"],
              ["low", "Weak hash MD5", "utils/cache.py", "Semgrep", "CWE-327"],
              ["low", "Disabled SSL verify", "scripts/sync.py", "Semgrep", "CWE-295"],
            ].map(([sev, rule, file, tool, cwe], i) => (
              <tr key={i} className="border-b border-border/60 hover:bg-surface/50 transition-colors">
                <td className="px-5 py-3"><SeverityChip sev={sev as string} /></td>
                <td className="px-5 py-3 font-medium">{rule}</td>
                <td className="px-5 py-3 hidden md:table-cell text-muted-foreground font-mono text-xs">{file}</td>
                <td className="px-5 py-3 text-xs font-mono">{tool}</td>
                <td className="px-5 py-3 text-right font-mono text-xs text-muted-foreground">{cwe}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

function ScoreRing({ value }: { value: number }) {
  const r = 44, c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative h-28 w-28">
      <svg viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="50" cy="50" r={r} stroke="oklch(0.25 0.03 260)" strokeWidth="8" fill="none" />
        <circle cx="50" cy="50" r={r} stroke="url(#g1)" strokeWidth="8" fill="none"
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" />
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.18 165)" />
            <stop offset="100%" stopColor="oklch(0.65 0.22 295)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="text-2xl font-semibold gradient-text">{value}</div>
          <div className="text-[10px] font-mono text-muted-foreground">/ 100</div>
        </div>
      </div>
    </div>
  );
}

function Sev({ label, value, icon: Icon, tone }: any) {
  const colors: Record<string, string> = {
    danger: "text-danger border-danger/30 bg-danger/5",
    warning: "text-warning border-warning/30 bg-warning/5",
    primary: "text-primary border-primary/30 bg-primary/5",
    muted: "text-muted-foreground border-border bg-surface/40",
  };
  return (
    <div className={`rounded-xl border p-4 ${colors[tone]}`}>
      <Icon className="h-4 w-4 mb-2" />
      <div className="text-3xl font-semibold">{value}</div>
      <div className="text-xs font-mono mt-1 tracking-wider uppercase opacity-80">{label}</div>
    </div>
  );
}

function SeverityChip({ sev }: { sev: string }) {
  const map: Record<string, string> = {
    high: "bg-warning/15 text-warning border-warning/30",
    medium: "bg-primary/15 text-primary border-primary/30",
    low: "bg-muted text-muted-foreground border-border",
  };
  return <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border ${map[sev]}`}>{sev}</span>;
}
