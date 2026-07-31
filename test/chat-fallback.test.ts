import { describe, expect, it } from "vitest";
import { fallbackText } from "../api/chat";

const message = (content: string) => [{ role: "user" as const, content }];

describe("free mentor fallback", () => {
  it("returns topic-specific guidance", () => {
    const accessibility = fallbackText(message("Check my accessibility plan"));
    const deployment = fallbackText(message("How should I deploy to Vercel?"));

    expect(accessibility).toContain("keyboard-only");
    expect(deployment).toContain("runtime logs");
    expect(accessibility).not.toBe(deployment);
  });

  it("gives a concrete next build step", () => {
    expect(fallbackText(message("What should I build next?"))).toContain(
      "evidence-backed case-study screen",
    );
  });

  it("answers greetings as greetings", () => {
    expect(fallbackText(message("Hello"))).toContain("Hello!");
  });

  it("uses prior conversation for a referential request", () => {
    const response = fallbackText([
      { role: "user", content: "Check my accessibility plan" },
      { role: "assistant", content: "Start with a keyboard-only pass." },
      { role: "user", content: "Turn this into a small screen" },
    ]);

    expect(response).toContain("Check my accessibility plan");
    expect(response).toContain("one primary action");
  });

  it("asks for context instead of inventing an unrelated answer", () => {
    expect(fallbackText(message("Tell me about database indexes"))).toContain(
      "I don’t have a reliable free-mode rule",
    );
  });
});
