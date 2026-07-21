const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-3-5-haiku-latest";
const SYSTEM_PROMPT = "You are a concise, practical frontend mentor. Suggest one testable next step and mention accessibility when relevant.";

type ChatMessage = { role: "user" | "assistant"; content: string };
type RequestBody = { messages?: ChatMessage[] };

function fallbackStream(messages: ChatMessage[]) {
  const last = messages.filter((message) => message.role === "user").at(-1)?.content ?? "your idea";
  const text = `For “${last}”, make one small screen first, then verify its keyboard path and responsive behavior before polishing the visuals.`;
  const encoder = new TextEncoder(); let index = 0;
  return new ReadableStream({ pull(controller) { if (index >= text.length) { controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n")); controller.close(); return; } const chunk = text.slice(index, index + 5); index += 5; controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`)); } });
}

export default async function handler(request: Request) {
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const body = await request.json() as RequestBody; const messages = body.messages ?? [];
  if (process.env.ANTHROPIC_API_KEY) {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "content-type": "application/json", "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" }, body: JSON.stringify({ model: MODEL, max_tokens: 500, system: SYSTEM_PROMPT, stream: true, messages }) });
    if (upstream.ok && upstream.body) return new Response(upstream.body, { headers: { "content-type": "text/event-stream; charset=utf-8", "cache-control": "no-cache" } });
  }
  return new Response(fallbackStream(messages), { headers: { "content-type": "text/event-stream; charset=utf-8", "cache-control": "no-cache", connection: "keep-alive" } });
}
