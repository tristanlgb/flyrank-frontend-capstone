# FE-06 — AI-assisted React chat

The current version includes a server-side `/api/chat` route that streams SSE chunks. It uses `ANTHROPIC_API_KEY` only on the server when configured and falls back to a deterministic mentor response for a public preview without credentials.

## Prompts used during development

1. “Build a small React + TypeScript chat interface with accessible labels, a message history, suggested prompts, and a clear submit state. Keep the assistant response deterministic and local so the demo needs no API key.”
2. “Review the chat UI for keyboard access and responsive behavior. Preserve native form semantics, visible focus, disabled submit feedback, and an aria-live conversation region.”
3. “Upgrade the local chat to a server-side SSE route with an optional Anthropic key, token-by-token rendering, AbortController stop behavior, and preserved partial messages.”

## How AI assisted

AI helped draft the component shape, identify the minimum state (`messages`, `draft`, and `busy`), and suggest accessible interaction details. The implementation was kept intentionally small so every behavior remains easy to inspect in the repository.

## Manual improvements and corrections

- Kept the API key server-side in `api/chat.ts`; the public preview uses its deterministic fallback when no secret is configured.
- Added a server-side SSE route and an `AbortController` stop action so partial assistant text persists after cancellation.
- Added a native `<form>` and disabled submit state to prevent empty or duplicate messages.
- Added a visible “Ready” status, responsive message widths, keyboard-friendly suggestion buttons, and an `aria-live` conversation region after reviewing the first draft.
- Added the `#chat` route to the existing navigation and preserved the previously built overview, health check, accessibility, and settings routes.
