import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/deployai/Layout";
import { StatusDot } from "@/components/deployai/StatusDot";
import { motion } from "framer-motion";
import {
  GitBranch, ShieldCheck, Activity, Boxes, ArrowUpRight,
  Cpu, Database, Network, CheckCircle2, AlertTriangle, Zap, Hash
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DeployAI — DevSecOps Intelligent Platform" },
      { name: "description", content: "Multi-agent DevSecOps platform automating CI/CD, security scanning, Kubernetes deployment and blockchain certification powered by LangGraph + LLM." },
      { property: "og:title", content: "DeployAI — DevSecOps Intelligent Platform" },
      { property: "og:description", content: "From code to blockchain-certified deployment, fully automated by 8 cooperating AI agents." },
    ],
  }),
  component: Overview,
});

const kpis = [
  { label: "Pipeline runs", value: "1,284", delta: "+18.2%", icon: GitBranch, accent: "primary" },
  { label: "Security score", value: "92.4", delta: "+4.1", icon: ShieldCheck, accent: "success", suffix: "/100" },
  { label: "Deployments", value: "342", delta: "+12", icon: Boxes, accent: "accent" },
  { label: "Avg. cycle time", value: "4m 12s", delta: "-22s", icon: Zap, accent: "warning" },
] as const;

const agents = [
  { name: "Analysis", desc: "Repo clone · LLM intent · Mermaid", status: "active" },
  { name: "Preparation", desc: "RAG · Plan · Security parallel", status: "active" },
  { name: "Security Gate", desc: "Semgrep · Bandit · Trivy", status: "active" },
  { name: "CI/CD", desc: "GitHub Actions YAML", status: "active" },
  { name: "Terraform", desc: "HCL infra provisioning", status: "idle" },
  { name: "Deployment", desc: "K8s rollout · auto-rollback", status: "active" },
  { name: "Supervision", desc: "kubectl · Prom · Grafana", status: "active" },
  { name: "Blockchain", desc: "IPFS · Ethereum Sepolia", status: "active" },
] as const;

function Overview() {
  return (
    <Layout title="Overview" subtitle="Mission control">
      {/* Hero panel */}
      <motion.section
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl border border-border glass mb-8"
      >
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />

        <div className="relative p-8 lg:p-10 grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 mb-5">
              <StatusDot status="success" />
              <span className="text-[11px] font-mono tracking-wider text-primary">LANGGRAPH ORCHESTRATOR · ONLINE</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-semibold leading-[1.05] tracking-tight">
              From <span className="gradient-text">git push</span> to{" "}
              <span className="gradient-cyber-text">blockchain-certified</span> production —
              autonomously.
            </h2>
            <p className="mt-5 text-muted-foreground text-base max-w-xl leading-relaxed">
              Eight cooperating LLM agents orchestrated by LangGraph automate the full DevSecOps lifecycle:
              code analysis, parallel SAST/DAST, Kubernetes rollout and immutable Ethereum attestation.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/pipeline"
                className="group inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-5 py-2.5 font-medium text-sm shadow-glow hover:brightness-110 transition-all"
              >
                Launch a pipeline
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                to="/agents"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-5 py-2.5 font-medium text-sm hover:bg-surface-2 transition-colors"
              >
                Inspect agents
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Cpu className="h-3 w-3 text-primary" /> Groq · llama-3.3-70b</span>
              <span className="inline-flex items-center gap-1.5"><Database className="h-3 w-3 text-cyan" /> ChromaDB RAG</span>
              <span className="inline-flex items-center gap-1.5"><Network className="h-3 w-3 text-accent" /> Minikube · k8s</span>
              <span className="inline-flex items-center gap-1.5"><Hash className="h-3 w-3 text-magenta" /> ETH Sepolia</span>
            </div>
          </div>

          {/* Live terminal */}
          <div className="relative rounded-xl border border-border bg-background/80 overflow-hidden font-mono text-[12.5px] leading-relaxed">
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border bg-surface/60">
              <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
              <span className="ml-2 text-[10px] text-muted-foreground tracking-wider">deploy-ai · run #1284</span>
            </div>
            <div className="p-4 space-y-1.5 relative scanlines">
              <Line c="text-muted-foreground">$ deployai run --repo github.com/talan/erp-core</Line>
              <Line c="text-cyan">[01] analysis      ✓ 14 components · React, FastAPI, PG</Line>
              <Line c="text-cyan">[02] preparation   ✓ RAG: trend ↑ improving (+6.2)</Line>
              <Line c="text-amber">[03] security      ⚡ Semgrep · Bandit · Trivy · DAST</Line>
              <Line c="text-success">     gate         ✓ score 92.4 / threshold 80</Line>
              <Line c="text-cyan">[04] ci-cd         ✓ 3 workflows generated</Line>
              <Line c="text-cyan">[05] terraform     ✓ HCL · 1 cluster · 4 nodes</Line>
              <Line c="text-cyan">[06] deployment    ✓ kubectl rollout: ready 4/4</Line>
              <Line c="text-cyan">[07] supervision   ✓ pods Running 12 / Pending 0</Line>
              <Line c="text-magenta">[08] blockchain    ✓ tx 0x9af3…21bd · IPFS Qm…7Hd</Line>
              <Line c="text-primary"><span className="cursor">deploy-ai ready</span></Line>
            </div>
          </div>
        </div>
      </motion.section>

      {/* KPI grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((k, i) => {
          const Icon = k.icon;
          return (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i, duration: 0.4 }}
              className="group relative rounded-xl border border-border bg-card p-5 overflow-hidden hover:border-primary/40 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">{k.label}</div>
                  <div className="mt-2 text-3xl font-semibold tracking-tight">
                    {k.value}<span className="text-base text-muted-foreground font-normal">{(k as any).suffix ?? ""}</span>
                  </div>
                </div>
                <div className="h-9 w-9 rounded-md bg-surface-2 grid place-items-center text-primary">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3 text-xs font-mono text-success">{k.delta}<span className="text-muted-foreground"> · 7d</span></div>
              <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          );
        })}
      </section>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Agents grid */}
        <section className="lg:col-span-2 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-mono tracking-widest text-muted-foreground">AGENT GRAPH</h3>
              <div className="text-base font-semibold mt-0.5">8 nodes · LangGraph PipelineState</div>
            </div>
            <Link to="/agents" className="text-xs font-mono text-primary hover:text-glow inline-flex items-center gap-1">
              VIEW ALL <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {agents.map((a, i) => (
              <div key={a.name} className="group relative rounded-lg border border-border bg-surface/40 p-3.5 hover:border-primary/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-md bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 grid place-items-center text-[10px] font-mono text-primary font-bold">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{a.name}</div>
                      <div className="text-[11px] text-muted-foreground">{a.desc}</div>
                    </div>
                  </div>
                  <StatusDot status={a.status === "active" ? "success" : "muted"} pulse={a.status === "active"} />
                </div>
                {a.status === "active" && (
                  <div className="absolute inset-x-3 bottom-1.5 h-px bg-surface-2 overflow-hidden">
                    <div className="h-full w-1/3 bg-primary data-flow" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Recent runs */}
        <section className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-mono tracking-widest text-muted-foreground">RECENT RUNS</h3>
              <div className="text-base font-semibold mt-0.5">Last 10 deployments</div>
            </div>
            <Link to="/reports" className="text-xs font-mono text-primary inline-flex items-center gap-1">
              ALL <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <ul className="space-y-2.5">
            {[
              { id: "#1284", repo: "talan/erp-core", ok: true, score: 92, t: "2m ago" },
              { id: "#1283", repo: "talan/auth-svc", ok: true, score: 88, t: "14m" },
              { id: "#1282", repo: "esprit/data-api", ok: false, score: 64, t: "1h" },
              { id: "#1281", repo: "talan/web-app", ok: true, score: 95, t: "2h" },
              { id: "#1280", repo: "talan/billing", ok: true, score: 87, t: "5h" },
            ].map((r) => (
              <li key={r.id} className="flex items-center gap-3 rounded-md p-2 hover:bg-surface/60 transition-colors">
                {r.ok ? <CheckCircle2 className="h-4 w-4 text-success shrink-0" /> : <AlertTriangle className="h-4 w-4 text-danger shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{r.repo}</div>
                  <div className="text-[11px] font-mono text-muted-foreground">{r.id} · {r.t}</div>
                </div>
                <div className={`text-sm font-mono font-semibold ${r.ok ? "text-success" : "text-danger"}`}>{r.score}</div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  );
}

function Line({ c, children }: { c: string; children: React.ReactNode }) {
  return <div className={c}>{children}</div>;
}
