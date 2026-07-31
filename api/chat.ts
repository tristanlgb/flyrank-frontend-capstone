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

function clientKey(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
}

function isRateLimited(request: Request) {
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

function fallbackStream(messages: ChatMessage[]) {
  const userMessages = messages.filter((message) => message.role === "user");
  const last = userMessages[userMessages.length - 1]?.content ?? "your idea";
  const text = `For “${last}”, make one small screen first, then verify its keyboard path and responsive behavior before polishing the visuals.`;
  const encoder = new TextEncoder(); let index = 0;
  return new ReadableStream({ pull(controller) { if (index >= text.length) { controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n")); controller.close(); return; } const chunk = text.slice(index, index + 5); index += 5; controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`)); } });
}

export default async function handler(request: Request) {
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
  if (isRateLimited(request)) return new Response("Too many requests", { status: 429 });

  let body: RequestBody;
  try {
    body = await request.json() as RequestBody;
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (!isValidMessages(body.messages)) {
    return new Response("Messages must contain 1-12 short chat messages", { status: 400 });
  }

  const messages = body.messages;
  if (process.env.ANTHROPIC_API_KEY) {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "content-type": "application/json", "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" }, body: JSON.stringify({ model: MODEL, max_tokens: 500, system: SYSTEM_PROMPT, stream: true, messages }) });
    if (upstream.ok && upstream.body) return new Response(upstream.body, { headers: { "content-type": "text/event-stream; charset=utf-8", "cache-control": "no-cache" } });
  }
  return new Response(fallbackStream(messages), { headers: { "content-type": "text/event-stream; charset=utf-8", "cache-control": "no-cache", connection: "keep-alive" } });
}
