declare const process: { env: Record<string, string | undefined> };

const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-3-5-haiku-latest";
const SYSTEM_PROMPT = "You are a concise, practical frontend mentor. Suggest one testable next step and mention accessibility when relevant.";
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1_000;
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 10;
const requestsByClient = new Map<string, number[]>();

export const maxDuration = 15;

type ChatMessage = { role: "user" | "assistant"; content: string };
type RequestBody = { messages?: ChatMessage[] };
type VercelRequest = {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
};
type VercelResponse = {
  status(code: number): VercelResponse;
  setHeader(name: string, value: string): void;
  write(chunk: string): void;
  end(chunk?: string): void;
};

function clientKey(request: VercelRequest) {
  const forwarded = request.headers["x-forwarded-for"];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return raw?.split(",")[0]?.trim() ?? "local";
}

function isRateLimited(request: VercelRequest) {
  const key = clientKey(request);
  const now = Date.now();
  const recent = (requestsByClient.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) return true;
  recent.push(now);
  requestsByClient.set(key, recent);
  return false;
}

function isValidMessages(value: unknown): value is ChatMessage[] {
  return Array.isArray(value)
    && value.length > 0
    && value.length <= MAX_MESSAGES
    && value.every((message) => {
      if (!message || typeof message !== "object") return false;
      const candidate = message as Partial<ChatMessage>;
      return (candidate.role === "user" || candidate.role === "assistant")
        && typeof candidate.content === "string"
        && candidate.content.trim().length > 0
        && candidate.content.length <= MAX_MESSAGE_LENGTH;
    });
}

function parseBody(body: unknown): RequestBody | null {
  if (typeof body === "string") {
    try {
      return JSON.parse(body) as RequestBody;
    } catch {
      return null;
    }
  }
  return body && typeof body === "object" ? body as RequestBody : null;
}

export function fallbackText(messages: ChatMessage[]) {
  const userMessages = messages.filter((message) => message.role === "user");
  const last = userMessages[userMessages.length - 1]?.content ?? "your idea";
  const previous = userMessages[userMessages.length - 2]?.content;
  const topic = last.toLowerCase();

  if (/^(hi|hello|hey|hola|buenas)[!.?\s]*$/i.test(last.trim())) {
    return "Hello! I can help you plan a frontend screen, review accessibility, define tests, debug a deployment, or explain this capstone. What are you working on?";
  }
  if (topic.includes("thank") || topic.includes("gracias")) {
    return "You’re welcome. Tell me what you want to build or verify next, and include the expected result if you already know it.";
  }
  if (
    topic.includes("what can you do")
    || topic.includes("who are you")
    || topic.includes("qué puedes hacer")
    || topic.includes("que puedes hacer")
    || topic.includes("qué podés hacer")
    || topic.includes("que podes hacer")
  ) {
    return "I’m the capstone’s guided frontend mentor. I can suggest next steps for accessibility, forms, tests, content, deployment, and WebGL. In free mode I use transparent project rules rather than a language model.";
  }
  if (
    topic.includes("small screen")
    || topic.includes("pantalla pequeña")
    || topic.includes("pantalla chica")
  ) {
    if (previous) {
      return `Turn “${previous}” into a focused screen with one clear heading, three priority items, one primary action, and a visible status or result. Keep secondary details behind progressive disclosure.`;
    }
    return "Paste the feature, text, or workflow you want to transform. I’ll reduce it to one heading, three essential items, one primary action, and one visible result.";
  }
  if (topic.includes("accessib") || topic.includes("keyboard") || topic.includes("contrast")) {
    return "Start with a keyboard-only pass: reach every control, confirm the focus order, and make the focus indicator easy to see. Then check labels, error messages, and color contrast.";
  }
  if (topic.includes("content") || topic.includes("copy") || topic.includes("case study")) {
    return "Choose one audience and one action first. Keep only the sections that help that person understand the problem, your decision, and the evidence behind the result.";
  }
  if (topic.includes("form") || topic.includes("input") || topic.includes("validation")) {
    return "Build the smallest complete form: visible labels, typed validation, inline errors, disabled submission while saving, and one test proving invalid data never submits.";
  }
  if (topic.includes("test") || topic.includes("bug") || topic.includes("verify")) {
    return "Write one test for the riskiest behavior, then run type checking and the production build. After that, repeat the real browser flow because integration bugs can pass unit tests.";
  }
  if (topic.includes("deploy") || topic.includes("vercel") || topic.includes("production")) {
    return "Deploy the narrowest working flow, inspect the production response and runtime logs, and confirm that secrets stay server-side. Record the live URL only after the browser flow passes.";
  }
  if (topic.includes("shader") || topic.includes("webgl") || topic.includes("animation")) {
    return "Change one shader variable at a time: palette, wave frequency, or pointer influence. Cap pixel density, pause hidden-tab animation, and keep a static reduced-motion fallback.";
  }
  if (topic.includes("next") || topic.includes("build") || topic.includes("start")) {
    return "Build one evidence-backed case-study screen next. Show the problem, one decision you made, and a link or test that proves the result before adding more features.";
  }

  return "I don’t have a reliable free-mode rule for that question. Add the screen, feature, or error you are working on, plus the result you expect, and I can give you a more specific next step.";
}

async function claudeText(messages: ChatMessage[]) {
  if (!process.env.ANTHROPIC_API_KEY) return null;

  const upstream = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages,
    }),
  });

  if (!upstream.ok) return null;
  const data = await upstream.json() as {
    content?: Array<{ type?: string; text?: string }>;
  };
  return data.content
    ?.filter((block) => block.type === "text" && block.text)
    .map((block) => block.text)
    .join("") ?? null;
}

function sendTextStream(response: VercelResponse, text: string) {
  response.status(200);
  response.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  response.setHeader("Cache-Control", "no-cache");
  response.setHeader("Connection", "keep-alive");

  for (let index = 0; index < text.length; index += 8) {
    response.write(`data: ${JSON.stringify({ text: text.slice(index, index + 8) })}\n\n`);
  }
  response.end("data: [DONE]\n\n");
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== "POST") {
    response.status(405).end("Method not allowed");
    return;
  }
  if (isRateLimited(request)) {
    response.status(429).end("Too many requests");
    return;
  }

  const body = parseBody(request.body);
  if (!body) {
    response.status(400).end("Invalid JSON");
    return;
  }
  if (!isValidMessages(body.messages)) {
    response.status(400).end("Messages must contain 1-12 short chat messages");
    return;
  }

  const answer = await claudeText(body.messages) ?? fallbackText(body.messages);
  sendTextStream(response, answer);
}
