import { Bell, Search, Globe, Mic } from "lucide-react";

export function TopBar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 px-6 lg:px-8 py-4 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-mono text-muted-foreground tracking-[0.2em] mb-1">
          / {title.toUpperCase()}
        </div>
        <h1 className="text-lg font-semibold truncate">{subtitle ?? title}</h1>
      </div>

      <div className="hidden md:flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5 w-72">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          placeholder="Ask DeployAI…"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <kbd className="text-[10px] font-mono text-muted-foreground border border-border rounded px-1.5 py-0.5">⌘K</kbd>
      </div>

      <button className="h-9 w-9 grid place-items-center rounded-md border border-border bg-surface hover:bg-surface-2 transition-colors" title="Voice (Whisper)">
        <Mic className="h-4 w-4 text-primary" />
      </button>
      <button className="h-9 px-3 grid place-items-center rounded-md border border-border bg-surface hover:bg-surface-2 transition-colors gap-1.5 flex">
        <Globe className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs font-mono">EN</span>
      </button>
      <button className="relative h-9 w-9 grid place-items-center rounded-md border border-border bg-surface hover:bg-surface-2 transition-colors">
        <Bell className="h-4 w-4 text-muted-foreground" />
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent pulse-dot" />
      </button>
      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center text-background text-xs font-bold">
        ES
      </div>
    </header>
  );
}
