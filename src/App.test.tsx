import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { App } from "./App";

afterEach(cleanup);

describe("App", () => {
  it("renders the portfolio and signature shader", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: /I build digital products with a human point of view/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "I turn AI-assisted ideas into verified interfaces.",
      }),
    ).toBeInTheDocument();
  });

  it("renders the embedded dynamic chat", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: "A mentor that turns questions into next steps.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });
});
