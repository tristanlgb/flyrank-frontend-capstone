import { useEffect, useState } from "react";

type Health = { status: string; service: string; updatedAt: string };
const routes = [
  { href: "#overview", label: "Overview" },
  { href: "#chat", label: "AI chat" },
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

type Message = { role: "assistant" | "user"; text: string };

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", text: "Hi — I’m the FlyRank assistant. Ask me about your content map, accessibility, or next build step." }]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const send = (value = draft) => {
    const text = value.trim();
    if (!text || busy) return;
    setMessages((current) => [...current, { role: "user", text }]);
    setDraft(""); setBusy(true);
    window.setTimeout(() => { setMessages((current) => [...current, { role: "assistant", text: "A useful next step is to turn that idea into one small, testable screen and verify it with keyboard navigation before polishing the visuals." }]); setBusy(false); }, 350);
  };
  return <section className="chat-panel" aria-labelledby="chat-title"><div className="chat-heading"><div><p className="eyebrow">AI-assisted workflow</p><h1 id="chat-title">Build with a clear next step</h1><p className="intro">A local demo chat keeps the interaction reliable without exposing an API key.</p></div><span className="online-pill"><span className="status-dot" /> Ready</span></div><div className="suggestions" aria-label="Suggested prompts">{["What should I build next?", "Check my accessibility plan", "Turn this into a small screen"].map((suggestion) => <button key={suggestion} type="button" onClick={() => send(suggestion)}>{suggestion}</button>)}</div><div className="messages" aria-live="polite" aria-label="Conversation">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`message ${message.role}`}><span className="message-label">{message.role === "assistant" ? "Assistant" : "You"}</span><p>{message.text}</p></div>)}{busy && <div className="message assistant"><span className="message-label">Assistant</span><p>Thinking…</p></div>}</div><form className="chat-form" onSubmit={(event) => { event.preventDefault(); send(); }}><label htmlFor="chat-input">Message</label><div><input id="chat-input" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Describe the next thing you want to make" /><button type="submit" disabled={busy || !draft.trim()}>Send</button></div></form></section>;
}

export function App() {
  const [route, setRoute] = useState(currentRoute);
  useEffect(() => { const onHashChange = () => setRoute(currentRoute()); window.addEventListener("hashchange", onHashChange); return () => window.removeEventListener("hashchange", onHashChange); }, []);
  const page = route === "health" ? <HealthPage /> : route === "chat" ? <ChatPage /> : route === "settings" ? <Placeholder title="Account settings" description="Settings form workflow drill." /> : route === "content-map" ? <Placeholder title="Content map" description="A clear route for mapping content, calls to action, and the next decision." /> : route === "accessibility" ? <Placeholder title="Accessibility" description="A dedicated space for keyboard, contrast, and responsive checks." /> : <Placeholder title="Capstone workspace" description="A responsive, accessible shell for the FlyRank frontend capstone." />;
  return <div className="app-shell"><header className="topbar"><a className="brand" href="#overview" aria-label="FlyRank capstone home"><span className="brand-mark">F</span> FlyRank</a><nav aria-label="Primary navigation"><ul>{routes.map((item) => <li key={item.href}><a className={route === item.href.slice(1) ? "active" : ""} href={item.href}>{item.label}</a></li>)}</ul></nav></header><main className="shell">{page}</main><footer className="footer"><span>Frontend AI Engineering · Week 3</span><a href="#health">Service status</a></footer></div>;
}
