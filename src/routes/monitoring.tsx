import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/deployai/Layout";
import { motion } from "framer-motion";
import { Server, Cpu, MemoryStick, Network, Activity } from "lucide-react";

export const Route = createFileRoute("/monitoring")({
  head: () => ({
    meta: [
      { title: "Monitoring · DeployAI" },
      { name: "description", content: "Real-time Kubernetes cluster metrics — pods, nodes, services, Prometheus & Grafana." },
    ],
  }),
  component: MonitoringPage,
});

function MonitoringPage() {
  return (
    <Layout title="Monitoring" subtitle="Cluster · Minikube">
      {/* Cluster status */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Stat label="Pods Running" value="12" total="12" tone="success" icon={Server} />
        <Stat label="Pods Pending" value="0" total="12" tone="muted" icon={Server} />
        <Stat label="CPU usage" value="38%" total="100" tone="primary" icon={Cpu} />
        <Stat label="Memory" value="62%" total="100" tone="warning" icon={MemoryStick} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Sparkline-ish charts */}
        <Chart title="CPU · 1h" tone="primary" />
        <Chart title="Memory · 1h" tone="accent" />
        <Chart title="Network I/O · 1h" tone="cyan" />
      </div>

      {/* Pods table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-muted-foreground tracking-widest">PODS</div>
            <h3 className="font-semibold mt-0.5">Top consumers</h3>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success pulse-dot" /> kubectl streaming
          </span>
        </div>
        <table className="w-full text-sm">
          <thead className="text-[10px] font-mono text-muted-foreground tracking-widest">
            <tr className="border-b border-border">
              <th className="text-left px-5 py-3">POD</th>
              <th className="text-left px-5 py-3 hidden md:table-cell">NAMESPACE</th>
              <th className="text-left px-5 py-3">STATUS</th>
              <th className="text-right px-5 py-3">CPU</th>
              <th className="text-right px-5 py-3">MEM</th>
              <th className="text-right px-5 py-3 hidden md:table-cell">RESTARTS</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["erp-frontend-7d8c-x2k", "default", "Running", "120m", "256Mi", 0],
              ["erp-api-6f9c-pl2", "default", "Running", "340m", "512Mi", 0],
              ["postgres-0", "data", "Running", "180m", "1.2Gi", 0],
              ["redis-cache-2", "data", "Running", "60m", "128Mi", 0],
              ["prometheus-0", "monitoring", "Running", "210m", "768Mi", 1],
              ["grafana-7c4d", "monitoring", "Running", "80m", "256Mi", 0],
            ].map((r, i) => (
              <tr key={i} className="border-b border-border/60 hover:bg-surface/50 transition-colors">
                <td className="px-5 py-3 font-mono text-xs">{r[0]}</td>
                <td className="px-5 py-3 hidden md:table-cell text-xs text-muted-foreground">{r[1]}</td>
                <td className="px-5 py-3"><span className="inline-flex items-center gap-1.5 text-xs"><span className="h-1.5 w-1.5 rounded-full bg-success pulse-dot" /> Running</span></td>
                <td className="px-5 py-3 text-right font-mono text-xs">{r[3]}</td>
                <td className="px-5 py-3 text-right font-mono text-xs">{r[4]}</td>
                <td className="px-5 py-3 text-right hidden md:table-cell font-mono text-xs">{r[5]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

function Stat({ label, value, tone, icon: Icon }: any) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">{label}</div>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="mt-2 text-3xl font-semibold tracking-tight">{value}</div>
      <div className="mt-3 h-1 rounded-full bg-surface overflow-hidden">
        <div className={`h-full ${tone === "success" ? "bg-success" : tone === "warning" ? "bg-warning" : "bg-primary"}`}
          style={{ width: typeof value === "string" && value.endsWith("%") ? value : "100%" }} />
      </div>
    </div>
  );
}

function Chart({ title, tone }: { title: string; tone: string }) {
  // generate sparkline path
  const pts = Array.from({ length: 40 }, (_, i) => 50 + Math.sin(i / 3) * 18 + Math.random() * 12);
  const w = 320, h = 110;
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${(i / (pts.length - 1)) * w} ${h - p}`).join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  const color = tone === "primary" ? "oklch(0.78 0.18 165)" : tone === "accent" ? "oklch(0.65 0.22 295)" : "oklch(0.78 0.15 210)";
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-[10px] font-mono text-muted-foreground tracking-widest">{title}</div>
          <div className="text-lg font-semibold mt-0.5">{Math.round(pts[pts.length - 1])}<span className="text-sm text-muted-foreground"> avg</span></div>
        </div>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-24" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`grad-${tone}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#grad-${tone})`} />
        <path d={path} stroke={color} strokeWidth="1.5" fill="none" />
      </svg>
    </motion.div>
  );
}
