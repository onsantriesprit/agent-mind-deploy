import { Link, useRouterState } from "@tanstack/react-router";
import { Logo } from "./Logo";
import {
  LayoutDashboard, GitBranch, ShieldCheck, Activity,
  FileBarChart, Bot, Boxes, Settings, LogOut, Sparkles
} from "lucide-react";

const nav = [
  { to: "/", label: "Overview", icon: LayoutDashboard, hint: "01" },
  { to: "/pipeline", label: "Pipeline", icon: GitBranch, hint: "02" },
  { to: "/security", label: "Security", icon: ShieldCheck, hint: "03" },
  { to: "/monitoring", label: "Monitoring", icon: Activity, hint: "04" },
  { to: "/agents", label: "Agents", icon: Bot, hint: "05" },
  { to: "/reports", label: "Reports", icon: FileBarChart, hint: "06" },
  { to: "/blockchain", label: "Blockchain", icon: Boxes, hint: "07" },
] as const;

export function Sidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-border bg-surface/40 backdrop-blur-xl">
      <div className="p-5 border-b border-border">
        <Logo />
      </div>

      <div className="px-3 py-4 flex-1 overflow-y-auto">
        <div className="px-2 mb-2 text-[10px] font-mono text-muted-foreground tracking-[0.2em]">
          NAVIGATION
        </div>
        <nav className="space-y-0.5">
          {nav.map((item) => {
            const active = item.to === "/" ? path === "/" : path.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all
                  ${active
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface-2/50 border border-transparent"
                  }`}
              >
                {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-0.5 bg-primary rounded-r shadow-glow" />}
                <Icon className="h-4 w-4 shrink-0" />
                <span className="flex-1 font-medium">{item.label}</span>
                <span className="text-[10px] font-mono opacity-50">{item.hint}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-2 mt-8 mb-2 text-[10px] font-mono text-muted-foreground tracking-[0.2em]">
          SYSTEM
        </div>
        <div className="space-y-0.5">
          <button className="w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-surface-2/50 transition-all">
            <Settings className="h-4 w-4" /> <span>Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-surface-2/50 transition-all">
            <LogOut className="h-4 w-4" /> <span>Sign out</span>
          </button>
        </div>
      </div>

      <div className="p-3 border-t border-border">
        <div className="rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 p-3">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-mono font-semibold">LangGraph</span>
          </div>
          <div className="text-[11px] text-muted-foreground leading-relaxed">
            8 agents online · Groq llama-3.3-70b
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-success pulse-dot" />
            <span className="text-[10px] font-mono text-success">OPERATIONAL</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
