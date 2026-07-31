import { useEffect, useRef, useState } from "react";
import { ShaderHero } from "./ShaderHero";

type Health = { status: string; service: string; updatedAt: string };
type Message = { role: "assistant" | "user"; text: string };

const navigation = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#chat", label: "AI mentor" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

const projects = [
  {
    category: "Data visualization · Social research",
    title: "Social Observatory",
    description: "An accessible dashboard comparing socioeconomic samples from 2016 and 2024 while making methodological limits explicit.",
    tags: ["React", "Chart.js", "Accessible UI"],
    live: "https://app-graficos-clase-social.vercel.app/",
    source: "https://github.com/tristanlgb/AppGraficosClaseSocial",
  },
  {
    category: "Interactive systems · API experience",
    title: "Interactive Pokédex",
    description: "An exploratory Pokédex that transforms public API data into a responsive, searchable interface.",
    tags: ["React", "TypeScript", "PokéAPI"],
    live: "https://pokedex-pokeapi-ruddy.vercel.app/",
  },
  {
    category: "End-to-end product",
    title: "Full-Stack Commerce",
    description: "A complete shopping experience with authentication, product management, persistent data, and a responsive customer interface.",
    tags: ["React", "Authentication", "MongoDB"],
    live: "https://tpfinal-react-lenzberg.vercel.app/",
    source: "https://github.com/tristanlgb/TPFinal_React_Lenzberg",
  },
  {
    category: "Operations platform",
    title: "Academic Administration",
    description: "A portal for managing students, courses, and enrolments, designed around everyday administrative tasks.",
    tags: ["Angular", "Information design", "Responsive"],
    live: "https://trabajo-final-angular-indol.vercel.app/",
    source: "https://github.com/tristanlgb/TrabajoFinalAngular",
  },
  {
    category: "Applied machine learning · Search intelligence",
    title: "Refresh Opportunity Model",
    description: "A reproducible ML pipeline that ranks content for human refresh review using an anonymized dataset, client-holdout validation, explainable reason codes, and careful decision-support language.",
    tags: ["Python", "Random Forest", "Data validation"],
    live: "https://github.com/tristanlgb/flyrank-ml-internship",
    liveLabel: "Open ML repository ↗",
    source: "https://github.com/tristanlgb/flyrank-ml-internship/blob/main/outputs/model_report.md",
    sourceLabel: "Read model report ↗",
  },
];

function HealthStatus() {
  const [health, setHealth] = useState<Health | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    fetch("/health.json")
      .then((response) => {
        if (!response.ok) throw new Error("health check failed");
        return response.json() as Promise<Health>;
      })
      .then(setHealth)
      .catch(() => setError(true));
  }, []);
  return (
    <div className="health-status" id="health" aria-live="polite">
      <span className={`status-dot ${error ? "status-error" : ""}`} />
      {health && <span><strong>{health.status}</strong> · {health.service}</span>}
      {error && <span>Service check unavailable</span>}
      {!health && !error && <span>Checking service status…</span>}
    </div>
  );
}

function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", text: "Hi — I’m Tristan’s guided frontend mentor. Ask me about this portfolio, accessibility, testing, deployment, or your next build step." }]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const streamRef = useRef<HTMLDivElement>(null);

  const send = async (value = draft) => {
    const text = value.trim();
    if (!text || busy) return;
    const next = [...messages, { role: "user" as const, text }, { role: "assistant" as const, text: "" }];
    setMessages(next);
    setDraft("");
    setBusy(true);
    setError("");
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(0, -1).map((message) => ({ role: message.role, content: message.text })) }),
        signal: controller.signal,
      });
      if (!response.ok || !response.body) throw new Error("stream unavailable");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const result = await reader.read();
        if (result.done) break;
        buffer += decoder.decode(result.value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ") || line === "data: [DONE]") continue;
          const payload = JSON.parse(line.slice(6)) as { text?: string };
          if (payload.text) {
            setMessages((current) => current.map((item, index) => index === current.length - 1 ? { ...item, text: item.text + payload.text } : item));
          }
        }
        streamRef.current?.scrollTo({ top: streamRef.current.scrollHeight, behavior: "smooth" });
      }
    } catch (caught) {
      if ((caught as Error).name !== "AbortError") setError("The mentor could not respond. Please try again.");
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  };

  return (
    <section className="section mentor-section" id="chat" aria-labelledby="chat-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Live AI feature</p>
          <h2 id="chat-title">A mentor that turns questions into next steps.</h2>
        </div>
        <span className="online-pill"><span className="status-dot" /> {busy ? "Streaming" : "Ready"}</span>
      </div>
      <div className="mentor-grid">
        <div>
          <p className="section-copy">This is the working capstone feature. Messages travel to a protected server-side route, stream back to the interface, and fall back to transparent project rules when no paid model key is configured.</p>
          <ul className="proof-list">
            <li>Server-side API key protection</li>
            <li>Input caps and rate limiting</li>
            <li>Streaming response with stop control</li>
            <li>Context-aware free-mode guidance</li>
          </ul>
        </div>
        <div className="chat-card">
          <div className="suggestions" aria-label="Suggested prompts">
            {["What should I build next?", "Check my accessibility plan", "Explain the shader"].map((suggestion) => (
              <button key={suggestion} type="button" onClick={() => void send(suggestion)} disabled={busy}>{suggestion}</button>
            ))}
          </div>
          <div ref={streamRef} className="messages" aria-live="polite" aria-label="Conversation">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`message ${message.role}`}>
                <span className="message-label">{message.role === "assistant" ? "Assistant" : "You"}</span>
                <p>{message.text || (busy ? "Thinking…" : "No response received.")}</p>
              </div>
            ))}
          </div>
          {error && <p className="error" role="alert">{error}</p>}
          <form className="chat-form" onSubmit={(event) => { event.preventDefault(); void send(); }}>
            <label htmlFor="chat-input">Message</label>
            <div>
              <input id="chat-input" maxLength={1_000} value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Describe what you want to build or verify" />
              <button type="submit" disabled={busy || !draft.trim()}>Send</button>
              {busy && <button type="button" className="stop-button" onClick={() => abortRef.current?.abort()}>Stop</button>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export function App() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="topbar">
        <a className="brand" href="#home"><span className="brand-mark">TL</span><span className="brand-name">Tristan Lenzberg</span></a>
        <nav aria-label="Primary navigation"><ul>{navigation.map((item) => <li key={item.href}><a href={item.href}>{item.label}</a></li>)}</ul></nav>
        <a className="resume-link" href="https://drive.google.com/file/d/1SGQyw23De9kk18zZmCULGiOmXOAI07mR/view?usp=sharing" target="_blank" rel="noreferrer">View résumé ↗</a>
      </header>

      <main id="main-content">
        <section className="portfolio-hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow">Buenos Aires, Argentina</p>
            <h1>I build digital products with a <em>human point of view.</em></h1>
            <p>Full-stack developer, UBA social communicator, and Sociology student. I connect technology, research, and clear communication to turn complex ideas into thoughtful digital experiences.</p>
            <div className="hero-actions"><a className="button primary-button" href="#work">Explore selected work →</a><a className="button secondary-button" href="#chat">Try the AI mentor</a></div>
          </div>
          <div className="hero-proof" aria-label="Core capabilities">
            <div><span>Development</span><strong>Web products and interfaces</strong></div>
            <div><span>Social insight</span><strong>Research and communication</strong></div>
            <div><span>AI workflow</span><strong>Prompt, verify, improve</strong></div>
          </div>
        </section>

        <section className="section about-section" id="about">
          <div><p className="eyebrow">About</p><h2>Code is one part of how I understand and shape the world.</h2></div>
          <div className="about-copy">
            <p>I graduated in <strong>Social Communication from UBA</strong>, where I developed a lasting interest in how people, institutions, and narratives interact.</p>
            <p>Today, I study <strong>Sociology at UBA</strong> while building full-stack products. That combination helps me ask better questions, communicate clearly, and design beyond the screen.</p>
            <div className="tag-list" aria-label="Skills">{["React & TypeScript", "NestJS & MongoDB", "Product thinking", "Data visualization", "Social research", "Clear communication"].map((skill) => <span key={skill}>{skill}</span>)}</div>
          </div>
        </section>

        <section className="section work-section" id="work">
          <div className="section-heading">
            <div><p className="eyebrow">Selected work</p><h2>Projects where technology serves a clear purpose.</h2></div>
            <p className="section-copy">A focused selection spanning social data, interactive experiences, commerce, institutional tools, and AI-assisted development.</p>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article className="project-card" key={project.title}>
                <span className="project-number">0{index + 1}</span><p className="project-category">{project.category}</p><h3>{project.title}</h3><p>{project.description}</p>
                <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className="project-links"><a href={project.live} target="_blank" rel="noreferrer">{"liveLabel" in project ? project.liveLabel : "Live project ↗"}</a>{project.source && <a href={project.source} target="_blank" rel="noreferrer">{"sourceLabel" in project ? project.sourceLabel : "View source ↗"}</a>}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="shader-section" aria-labelledby="signature-title">
          <div className="section-intro-dark"><p className="eyebrow">Signature interaction</p><h2 id="signature-title">A custom shader, built to be explainable.</h2><p>The WebGL surface responds to time, screen resolution, and pointer movement. It pauses when hidden, caps pixel density, and respects reduced-motion preferences.</p></div>
          <ShaderHero />
        </section>

        <ChatSection />

        <section className="section process-section" id="process">
          <div><p className="eyebrow">How this was built</p><h2>AI-assisted does not mean unreviewed.</h2></div>
          <div className="process-grid">
            <article id="content-map"><span>01</span><h3>Map the job</h3><p>Start with the audience, the action, and the smallest useful flow before generating interface code.</p></article>
            <article id="accessibility"><span>02</span><h3>Check the human path</h3><p>Verify keyboard navigation, focus visibility, contrast, responsive layout, readable errors, and reduced motion.</p></article>
            <article id="settings"><span>03</span><h3>Prove the behavior</h3><p>Run tests, type checking, a production build, and the real browser flow before calling the feature complete.</p></article>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div><p className="eyebrow">Contact</p><h2>Have a meaningful idea? <em>Let’s make it real.</em></h2><p>I am available for junior frontend roles, full-stack projects, and collaborations at the intersection of technology, communication, and social impact.</p></div>
          <div className="contact-links"><a className="button contact-primary" href="mailto:tristanlgb@hotmail.com?subject=Portfolio%20conversation">Book a conversation →</a><a href="https://www.linkedin.com/in/tristanlenzberg">LinkedIn ↗</a><a href="https://github.com/tristanlgb">GitHub ↗</a></div>
        </section>
      </main>
      <footer className="footer"><p>Developer, communicator, and Sociology student based in Buenos Aires.</p><HealthStatus /><a href="https://github.com/tristanlgb/flyrank-frontend-capstone">Capstone source ↗</a></footer>
    </div>
  );
}
