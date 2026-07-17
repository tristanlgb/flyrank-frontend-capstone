import { render, screen } from "@testing-library/react";
import { App } from "./App";

describe("App", () => {
  it("renders the settings workflow heading", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "Account settings" })).toBeInTheDocument();
  });
});
