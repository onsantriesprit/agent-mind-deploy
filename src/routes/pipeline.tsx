import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/deployai/Layout";
import { motion } from "framer-motion";
import { useState } from "react";
import { Github, Play, CheckCircle2, Loader2, Circle, ArrowRight, Mic } from "lucide-react";

export const Route = createFileRoute("/pipeline")({
  head: () => ({
    meta: [
      { title: "Pipeline · DeployAI" },
      { name: "description", content: "Trigger and monitor the 8-step LangGraph DevSecOps pipeline from a GitHub repository." },
    ],
  }),
  component: PipelinePage,
});

const steps = [
  { id: 1, name: "Analysis", desc: "Repo clone · LLM intent · Mermaid diagram", state: "done" },
  { id: 2, name: "Preparation", desc: "RAG · Plan · Security (parallel)", state: "done" },
  { id: 3, name: "Security Gate", desc: "Score evaluation · threshold 80", state: "done" },
  { id: 4, name: "CI/CD", desc: "GitHub Actions YAML generation", state: "running" },
  { id: 5, name: "Terraform", desc: "HCL infra provisioning", state: "pending" },
  { id: 6, name: "Deployment", desc: "kubectl rollout · auto-rollback", state: "pending" },
  { id: 7, name: "Supervision", desc: "Cluster metrics · LLM analysis", state: "pending" },
  { id: 8, name: "Blockchain", desc: "IPFS · Ethereum Sepolia tx", state: "pending" },
] as const;

function PipelinePage() {
  const [repo, setRepo] = useState("github.com/talan/erp-core");
  return (
    <Layout title="Pipeline" subtitle="Launch deployment">
      <div className="grid lg:grid-cols-[1fr_420px] gap-6">
        <div className="space-y-6">
          {/* Trigger card */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-border bg-card p-6 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative">
              <div className="text-[10px] font-mono text-muted-foreground tracking-widest mb-2">NEW RUN</div>
              <h2 className="text-xl font-semibold mb-5">Trigger a full pipeline</h2>

              <label className="block text-xs font-mono text-muted-foreground mb-2">GITHUB REPOSITORY URL</label>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2.5 focus-within:border-primary/50 transition-colors">
                <Github className="h-4 w-4 text-muted-foreground" />
                <input
                  value={repo} onChange={(e) => setRepo(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm font-mono"
                />
                <button className="h-7 w-7 grid place-items-center rounded-md hover:bg-surface-2" title="Voice">
                  <Mic className="h-3.5 w-3.5 text-primary" />
                </button>
              </div>

              <div className="mt-4 grid sm:grid-cols-3 gap-3">
                <Field label="ENV" value="production" />
                <Field label="K8S CONTEXT" value="minikube" />
                <Field label="LLM" value="llama-3.3-70b" />
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium shadow-glow hover:brightness-110 transition-all">
                  <Play className="h-4 w-4" /> Run pipeline
                </button>
                <button className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-2.5 text-sm hover:bg-surface-2 transition-colors">
                  Save as template
                </button>
                <span className="ml-auto text-xs font-mono text-muted-foreground">~ 4 min average</span>
              </div>
            </div>
          </motion.div>

          {/* Step graph */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-[10px] font-mono text-muted-foreground tracking-widest">EXECUTION GRAPH</div>
                <h3 className="text-base font-semibold mt-0.5">Run #1284 — talan/erp-core</h3>
              </div>
              <div className="text-xs font-mono text-primary">3/8 completed</div>
            </div>

            <ol className="space-y-2">
              {steps.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}
                  className={`flex items-center gap-4 rounded-lg border p-3.5 transition-colors
                    ${s.state === "running" ? "border-primary/40 bg-primary/5" :
                      s.state === "done" ? "border-border bg-surface/40" : "border-border bg-card"}`}
                >
                  <div className="text-[10px] font-mono text-muted-foreground w-6">{String(s.id).padStart(2, "0")}</div>
                  {s.state === "done" && <CheckCircle2 className="h-5 w-5 text-success" />}
                  {s.state === "running" && <Loader2 className="h-5 w-5 text-primary animate-spin" />}
                  {s.state === "pending" && <Circle className="h-5 w-5 text-muted-foreground/40" />}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{s.name}</div>
                    <div className="text-[11px] text-muted-foreground">{s.desc}</div>
                  </div>
                  {s.state === "running" && (
                    <div className="hidden sm:block w-32 h-1 rounded-full bg-surface-2 overflow-hidden">
                      <div className="h-full w-1/2 bg-gradient-to-r from-primary to-accent data-flow" />
                    </div>
                  )}
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/40" />
                </motion.li>
              ))}
            </ol>
          </div>
        </div>

        {/* Logs */}
        <div className="rounded-xl border border-border bg-card overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono text-muted-foreground tracking-widest">LIVE LOGS</div>
              <h3 className="text-sm font-semibold mt-0.5">stdout · run #1284</h3>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success pulse-dot" /> STREAMING
            </span>
          </div>
          <div className="flex-1 p-4 font-mono text-[12px] space-y-1 overflow-y-auto relative scanlines bg-background/50 max-h-[640px]">
            {[
              ["text-muted-foreground", "› git clone https://github.com/talan/erp-core.git"],
              ["text-cyan", "[analysis] 14 source files indexed"],
              ["text-cyan", "[analysis] LLM groq/llama-3.3-70b → React + FastAPI + PostgreSQL"],
              ["text-cyan", "[analysis] mermaid diagram validated ✓"],
              ["text-amber", "[prep] ThreadPoolExecutor: rag, plan, security"],
              ["text-amber", "[prep] RAG ChromaDB: 7 historical runs · trend ↑"],
              ["text-amber", "[prep] plan: 12 steps generated"],
              ["text-amber", "[security] semgrep: 0 critical · 2 medium"],
              ["text-amber", "[security] bandit: 0 issues"],
              ["text-amber", "[security] trivy fs: 1 HIGH (lodash@4.17.20)"],
              ["text-amber", "[security] detect-secrets: clean ✓"],
              ["text-success", "[gate] score=92.4 ≥ threshold=80 → PASS"],
              ["text-cyan", "[ci-cd] generating .github/workflows/build-frontend.yml"],
              ["text-cyan", "[ci-cd] generating .github/workflows/build-api.yml"],
              ["text-primary", "[ci-cd] LLM enriching steps for FastAPI…"],
              ["text-muted-foreground cursor", ""],
            ].map(([c, t], i) => <div key={i} className={c as string}>{t}</div>)}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-surface px-3 py-2">
      <div className="text-[10px] font-mono text-muted-foreground tracking-wider">{label}</div>
      <div className="text-sm font-mono mt-0.5">{value}</div>
    </div>
  );
}
