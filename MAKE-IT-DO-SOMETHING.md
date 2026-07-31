# Make It Do Something — Dynamic AI Mentor

## The one feature

The portfolio evidence is a live AI mentor demo. A visitor writes a frontend
question and receives a streamed, practical next step. This is intentionally
the only dynamic feature: it demonstrates a real request-and-response flow
without adding unrelated forms or widgets.

## What a backend is, in my own words

A backend is the part of an application that runs away from the visitor's
browser. The browser displays the interface and sends a request, while the
backend validates that request, protects private configuration, talks to an
external service when needed, and sends a result back. This matters because an
API key must never be placed in the visible frontend code.

## How this feature works

1. I type a message in the React chat interface.
2. The browser sends the conversation to `/api/chat`.
3. The backend rejects malformed, oversized, or excessive requests.
4. If an Anthropic API key is configured, the backend requests a Claude
   response. If it is not configured, a deterministic mentor response keeps
   the free demo functional.
5. The backend returns the answer as small streamed text chunks.
6. React appends each chunk to the current assistant message so the response
   appears progressively.

In short: **visitor → React interface → server endpoint → model or safe
fallback → streamed response → interface**.

## Safety and free-tier limits

- Maximum 12 messages per request.
- Maximum 1,000 characters per message.
- Maximum 10 requests per client per minute.
- Server execution is capped at 15 seconds.
- The API key stays server-side.
- The fallback mode makes a real end-to-end test possible without paid usage.

## Evidence to capture

Open the deployed `#chat` section, submit “What should I build next?”, and record
the streamed answer appearing. The recording should show the initial request,
the “Streaming” state, and the final response.
