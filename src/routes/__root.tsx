import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { ThemeProvider } from "@/components/deployai/theme";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "DeployAI — DevSecOps Intelligent Platform" },
      { name: "description", content: "Multi-agent DevSecOps platform automating CI/CD, security and Kubernetes deployment, with blockchain certification — built with LangGraph + LLM." },
      { name: "author", content: "DeployAI" },
      { property: "og:title", content: "DeployAI — DevSecOps Intelligent Platform" },
      { property: "og:description", content: "Multi-agent DevSecOps platform automating CI/CD, security and Kubernetes deployment, with blockchain certification — built with LangGraph + LLM." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "DeployAI — DevSecOps Intelligent Platform" },
      { name: "twitter:description", content: "Multi-agent DevSecOps platform automating CI/CD, security and Kubernetes deployment, with blockchain certification — built with LangGraph + LLM." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/04c9cf14-4ab3-4054-a06e-6dd5708bcc71/id-preview-3b6a9b47--f2dae622-41df-4a52-85dd-becca3333f26.lovable.app-1777372144129.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/04c9cf14-4ab3-4054-a06e-6dd5708bcc71/id-preview-3b6a9b47--f2dae622-41df-4a52-85dd-becca3333f26.lovable.app-1777372144129.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('deployai-theme');var d=document.documentElement;if(t==='light'){d.classList.remove('dark')}else{d.classList.add('dark')}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  );
}
