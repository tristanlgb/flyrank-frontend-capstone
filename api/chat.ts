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

function fallbackText(messages: ChatMessage[]) {
  const userMessages = messages.filter((message) => message.role === "user");
  const last = userMessages[userMessages.length - 1]?.content ?? "your idea";
  return `For "${last}", make one small screen first, then verify its keyboard path and responsive behavior before polishing the visuals.`;
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
