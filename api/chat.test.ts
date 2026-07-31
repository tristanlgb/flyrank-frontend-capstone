import { describe, expect, it } from "vitest";
import { fallbackText } from "./chat";

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
});
