import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/deployai/Layout";
import { motion } from "framer-motion";
import { Hash, Link as LinkIcon, ExternalLink, ShieldCheck, Database } from "lucide-react";

export const Route = createFileRoute("/blockchain")({
  head: () => ({
    meta: [
      { title: "Blockchain · DeployAI" },
      { name: "description", content: "Immutable deployment certification on Ethereum Sepolia with IPFS payload storage." },
    ],
  }),
  component: BlockchainPage,
});

const txs = [
  { run: "#1284", repo: "talan/erp-core", hash: "0x9af3c10b...4e7521bd", ipfs: "QmXa...7Hd", block: 6427812, time: "2m ago" },
  { run: "#1283", repo: "talan/auth-svc", hash: "0xab12fa01...9e2377ef", ipfs: "QmZb...4F1", block: 6427740, time: "14m" },
  { run: "#1281", repo: "talan/web-app", hash: "0x3f0a8810...2d9999cc", ipfs: "QmYc...9Kj", block: 6427611, time: "2h" },
  { run: "#1280", repo: "talan/billing", hash: "0xee21bcde...ff4444ab", ipfs: "QmAd...8Bp", block: 6427420, time: "5h" },
];

function BlockchainPage() {
  return (
    <Layout title="Blockchain" subtitle="Ethereum Sepolia attestations">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-border glass p-8 mb-6">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative grid lg:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-accent pulse-dot" />
              <span className="text-[11px] font-mono tracking-widest text-accent">SEPOLIA · INFURA · LIVE</span>
            </div>
            <h2 className="text-3xl font-semibold mb-3">Every deployment, immutably attested.</h2>
            <p className="text-muted-foreground max-w-xl leading-relaxed">
              SHA256 of the deployment payload (URL, repo, security score, timestamp) is pinned on IPFS,
              then committed to the Ethereum Sepolia testnet via Infura — providing tamper-proof, time-stamped
              proof of every production release.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3 w-3 text-primary" /> Mode: REAL</span>
              <span className="inline-flex items-center gap-1.5"><Database className="h-3 w-3 text-cyan" /> 342 attestations</span>
              <span className="inline-flex items-center gap-1.5"><Hash className="h-3 w-3 text-magenta" /> SHA256 + EIP-1559</span>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-background/60 p-5 font-mono text-xs space-y-2 min-w-[280px]">
            <Field k="chain" v="sepolia (11155111)" />
            <Field k="contract" v="0x12a4...88f0" />
            <Field k="gas (avg)" v="0.00021 ETH" />
            <Field k="latency" v="14.2s" />
          </div>
        </div>
      </motion.div>

      {/* Txs */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold">Recent attestations</h3>
          <span className="text-xs font-mono text-muted-foreground">block 6,427,812 · synced</span>
        </div>
        <div className="divide-y divide-border">
          {txs.map((t, i) => (
            <motion.div key={t.run} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.04 * i }}
              className="px-5 py-4 grid grid-cols-1 lg:grid-cols-[100px_1fr_auto] gap-4 items-center hover:bg-surface/40 transition-colors">
              <div>
                <div className="text-[10px] font-mono text-muted-foreground tracking-widest">RUN</div>
                <div className="font-mono text-sm mt-0.5">{t.run}</div>
              </div>
              <div>
                <div className="font-medium">{t.repo}</div>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono">
                  <span className="text-accent inline-flex items-center gap-1.5"><Hash className="h-3 w-3" /> {t.hash}</span>
                  <span className="text-cyan inline-flex items-center gap-1.5"><LinkIcon className="h-3 w-3" /> ipfs://{t.ipfs}</span>
                  <span className="text-muted-foreground">block #{t.block.toLocaleString()}</span>
                  <span className="text-muted-foreground">{t.time}</span>
                </div>
              </div>
              <a href="#" className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-xs hover:bg-surface-2 transition-colors">
                Etherscan <ExternalLink className="h-3 w-3" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

function Field({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{k}</span>
      <span className="text-foreground">{v}</span>
    </div>
  );
}
