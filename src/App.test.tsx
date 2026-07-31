import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("App", () => {
  it("renders the capstone overview by default", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "Capstone workspace" })).toBeInTheDocument();
  });

  it("renders the dynamic chat route", () => {
    window.location.hash = "#chat";
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Build with a clear next step" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });
});
