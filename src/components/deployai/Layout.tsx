import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export function Layout({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar title={title} subtitle={subtitle} />
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
