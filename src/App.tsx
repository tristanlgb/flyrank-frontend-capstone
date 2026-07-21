import { useEffect, useState } from "react";

type Health = { status: string; service: string; updatedAt: string };
const routes = [
  { href: "#overview", label: "Overview" },
  { href: "#content-map", label: "Content map" },
  { href: "#accessibility", label: "Accessibility" },
  { href: "#settings", label: "Account settings" },
  { href: "#health", label: "Health check" },
];
const currentRoute = () => window.location.hash.replace("#", "") || "overview";

function Placeholder({ title, description }: { title: string; description: string }) {
  return <section className="panel" aria-labelledby="page-title"><p className="eyebrow">FlyRank capstone</p><h1 id="page-title">{title}</h1><p className="intro">{description}</p><div className="placeholder-grid" aria-label={`${title} preview`}><div className="placeholder-block" /><div className="placeholder-block short" /><div className="placeholder-block" /></div></section>;
}

function HealthPage() {
  const [health, setHealth] = useState<Health | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => { fetch("/health.json").then((response) => { if (!response.ok) throw new Error("health check failed"); return response.json() as Promise<Health>; }).then(setHealth).catch(() => setError(true)); }, []);
  return <section className="panel" aria-labelledby="page-title"><p className="eyebrow">System status</p><h1 id="page-title">Health check</h1><p className="intro">A fetched-data check confirms the app can render service metadata.</p>{health && <div className="status-card"><span className="status-dot" /><strong>{health.status}</strong><span>{health.service} · updated {health.updatedAt}</span></div>}{error && <p role="alert" className="error">The health endpoint could not be reached.</p>}{!health && !error && <p className="muted">Checking service status…</p>}</section>;
}

export function App() {
  const [route, setRoute] = useState(currentRoute);
  useEffect(() => { const onHashChange = () => setRoute(currentRoute()); window.addEventListener("hashchange", onHashChange); return () => window.removeEventListener("hashchange", onHashChange); }, []);
  const page = route === "health" ? <HealthPage /> : route === "settings" ? <Placeholder title="Account settings" description="Settings form workflow drill." /> : route === "content-map" ? <Placeholder title="Content map" description="A clear route for mapping content, calls to action, and the next decision." /> : route === "accessibility" ? <Placeholder title="Accessibility" description="A dedicated space for keyboard, contrast, and responsive checks." /> : <Placeholder title="Capstone workspace" description="A responsive, accessible shell for the FlyRank frontend capstone." />;
  return <div className="app-shell"><header className="topbar"><a className="brand" href="#overview" aria-label="FlyRank capstone home"><span className="brand-mark">F</span> FlyRank</a><nav aria-label="Primary navigation"><ul>{routes.map((item) => <li key={item.href}><a className={route === item.href.slice(1) ? "active" : ""} href={item.href}>{item.label}</a></li>)}</ul></nav></header><main className="shell">{page}</main><footer className="footer"><span>Frontend AI Engineering · Week 3</span><a href="#health">Service status</a></footer></div>;
}
