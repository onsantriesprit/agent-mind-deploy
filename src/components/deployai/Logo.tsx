import { Link } from "@tanstack/react-router";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div className="relative">
        <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center shadow-glow">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-background" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2 L3 7 L3 17 L12 22 L21 17 L21 7 Z" />
            <path d="M12 12 L21 7 M12 12 L3 7 M12 12 L12 22" />
          </svg>
        </div>
        <div className="absolute inset-0 rounded-lg bg-primary/30 blur-xl group-hover:bg-primary/50 transition-all" />
      </div>
      {!compact && (
        <div className="leading-none">
          <div className="font-mono font-bold text-base tracking-tight">
            Deploy<span className="gradient-text">AI</span>
          </div>
          <div className="text-[10px] font-mono text-muted-foreground tracking-widest mt-0.5">
            DEVSECOPS · v1.0
          </div>
        </div>
      )}
    </Link>
  );
}
