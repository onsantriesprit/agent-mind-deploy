import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/deployai/Layout";
import { motion } from "framer-motion";
import {
  Search, Layers, ShieldCheck, GitMerge, Boxes, Rocket, Activity, Hash, ArrowRight
} from "lucide-react";

export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: "Agents · DeployAI" },
      { name: "description", content: "8-node LangGraph orchestrator — typed PipelineState, conditional edges, retry mechanisms." },
    ],
  }),
  component: AgentsPage,
});

const agents = [
  { id: 1, name: "Analysis", icon: Search, llm: "llama-3.3-70b", desc: "Clones the repository, parses sources, identifies frameworks, generates a Mermaid diagram and a narrative analysis.", inputs: "repo URL", outputs: "components[], mermaid, narrative" },
  { id: 2, name: "Preparation", icon: Layers, llm: "llama-3.1-8b", desc: "Runs RAG (ChromaDB), planning and security scan in parallel via ThreadPoolExecutor.", inputs: "components, repo", outputs: "trend, plan, security" },
  { id: 3, name: "Security Gate", icon: ShieldCheck, llm: "deterministic", desc: "Evaluates score vs SECURITY_GATE_THRESHOLD. Hard-blocks on failure.", inputs: "security report", outputs: "PASS / BLOCK" },
  { id: 4, name: "CI/CD", icon: GitMerge, llm: "llama-3.3-70b", desc: "Generates per-component GitHub Actions YAML enriched by LLM with framework-specific steps.", inputs: "components", outputs: ".github/workflows/*.yml" },
  { id: 5, name: "Terraform", icon: Boxes, llm: "llama-3.1-8b", desc: "Produces HCL configuration for Kubernetes infrastructure. Auto-skips for mono-component projects.", inputs: "components, infra", outputs: "main.tf, variables.tf" },
  { id: 6, name: "Deployment", icon: Rocket, llm: "llama-3.3-70b", desc: "Detects kubectl context, generates Dockerfile, applies manifests, waits for rollout, auto-rollback on failure.", inputs: "image, manifests", outputs: "rollout status, URL" },
  { id: 7, name: "Supervision", icon: Activity, llm: "llama-3.3-70b", desc: "Collects pods/nodes/services metrics in parallel, integrates Prometheus & Grafana, LLM narrative.", inputs: "cluster", outputs: "metrics, analysis" },
  { id: 8, name: "Blockchain", icon: Hash, llm: "deterministic", desc: "SHA256 of payload, IPFS storage, Ethereum Sepolia transaction via Infura. DEMO or REAL mode.", inputs: "payload", outputs: "tx hash, IPFS CID" },
] as const;

function AgentsPage() {
  return (
    <Layout title="Agents" subtitle="LangGraph orchestrator">
      {/* Graph hero */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl border border-border glass overflow-hidden mb-6 p-8">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative">
          <div className="text-[10px] font-mono text-muted-foreground tracking-widest mb-2">PipelineState · typed graph</div>
          <h2 className="text-2xl font-semibold mb-6">Eight cooperating agents</h2>
          <div className="flex items-center gap-1 overflow-x-auto pb-2">
            {agents.map((a, i) => (
              <div key={a.id} className="flex items-center gap-1 shrink-0">
                <div className="rounded-md border border-border bg-surface/60 px-3 py-2 text-xs font-mono">
                  <span className="text-muted-foreground">{String(a.id).padStart(2, "0")}</span>{" "}
                  <span className="text-primary">{a.name}</span>
                </div>
                {i < agents.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4">
        {agents.map((a, i) => {
          const Icon = a.icon;
          return (
            <motion.article key={a.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i }}
              className="group relative rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition-colors">
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 grid place-items-center text-primary shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-muted-foreground">{String(a.id).padStart(2, "0")}</span>
                    <h3 className="font-semibold">{a.name}</h3>
                    <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-mono text-success">
                      <span className="h-1.5 w-1.5 rounded-full bg-success pulse-dot" /> ACTIVE
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-accent mt-0.5">groq · {a.llm}</div>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{a.desc}</p>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="rounded border border-border bg-surface/50 px-2.5 py-1.5">
                      <span className="text-muted-foreground">in:</span> {a.inputs}
                    </div>
                    <div className="rounded border border-border bg-surface/50 px-2.5 py-1.5">
                      <span className="text-muted-foreground">out:</span> {a.outputs}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </Layout>
  );
}
