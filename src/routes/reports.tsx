import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/deployai/Layout";
import { CheckCircle2, AlertTriangle, ArrowUpRight, Hash } from "lucide-react";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports · DeployAI" },
      { name: "description", content: "Last 10 pipeline runs with security scores, deployment status and blockchain attestations." },
    ],
  }),
  component: ReportsPage,
});

const runs = [
  { id: "#1284", repo: "talan/erp-core", branch: "main", ok: true, score: 92, time: "2m ago", duration: "4m 12s", tx: "0x9af3…21bd" },
  { id: "#1283", repo: "talan/auth-svc", branch: "main", ok: true, score: 88, time: "14m", duration: "3m 04s", tx: "0xab12…77ef" },
  { id: "#1282", repo: "esprit/data-api", branch: "feat/v2", ok: false, score: 64, time: "1h", duration: "1m 22s", tx: "—" },
  { id: "#1281", repo: "talan/web-app", branch: "main", ok: true, score: 95, time: "2h", duration: "5m 47s", tx: "0x3f0a…99cc" },
  { id: "#1280", repo: "talan/billing", branch: "main", ok: true, score: 87, time: "5h", duration: "4m 33s", tx: "0xee21…44ab" },
  { id: "#1279", repo: "talan/notify", branch: "hotfix", ok: true, score: 90, time: "8h", duration: "2m 51s", tx: "0xd001…12fa" },
  { id: "#1278", repo: "talan/erp-core", branch: "main", ok: true, score: 86, time: "1d", duration: "4m 22s", tx: "0xbb47…02ac" },
  { id: "#1277", repo: "esprit/ml-svc", branch: "main", ok: false, score: 71, time: "1d", duration: "2m 03s", tx: "—" },
  { id: "#1276", repo: "talan/web-app", branch: "main", ok: true, score: 93, time: "2d", duration: "5m 19s", tx: "0x7711…8821" },
  { id: "#1275", repo: "talan/auth-svc", branch: "main", ok: true, score: 89, time: "3d", duration: "3m 10s", tx: "0xaa55…66bb" },
];

function ReportsPage() {
  return (
    <Layout title="Reports" subtitle="Last 10 runs">
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold">Pipeline history</h3>
          <button className="text-xs font-mono text-primary inline-flex items-center gap-1 hover:text-glow">
            EXPORT JSON <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead className="text-[10px] font-mono text-muted-foreground tracking-widest">
            <tr className="border-b border-border">
              <th className="text-left px-5 py-3">RUN</th>
              <th className="text-left px-5 py-3">REPO</th>
              <th className="text-left px-5 py-3">BRANCH</th>
              <th className="text-left px-5 py-3">STATUS</th>
              <th className="text-right px-5 py-3">SCORE</th>
              <th className="text-right px-5 py-3">DURATION</th>
              <th className="text-left px-5 py-3">ATTESTATION</th>
              <th className="text-right px-5 py-3">TIME</th>
            </tr>
          </thead>
          <tbody>
            {runs.map((r) => (
              <tr key={r.id} className="border-b border-border/60 hover:bg-surface/50 transition-colors">
                <td className="px-5 py-3 font-mono text-xs">{r.id}</td>
                <td className="px-5 py-3 font-medium">{r.repo}</td>
                <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{r.branch}</td>
                <td className="px-5 py-3">
                  {r.ok ? (
                    <span className="inline-flex items-center gap-1.5 text-xs"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Success</span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs text-danger"><AlertTriangle className="h-3.5 w-3.5" /> Blocked</span>
                  )}
                </td>
                <td className={`px-5 py-3 text-right font-mono font-semibold ${r.ok ? "text-success" : "text-danger"}`}>{r.score}</td>
                <td className="px-5 py-3 text-right font-mono text-xs text-muted-foreground">{r.duration}</td>
                <td className="px-5 py-3 font-mono text-xs">
                  {r.tx === "—" ? <span className="text-muted-foreground">—</span> : (
                    <span className="inline-flex items-center gap-1.5 text-accent"><Hash className="h-3 w-3" />{r.tx}</span>
                  )}
                </td>
                <td className="px-5 py-3 text-right text-xs text-muted-foreground">{r.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </Layout>
  );
}
