import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders NavigationBar component", () => {
    render(<App />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders Home component at root path", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "Home" })).toBeInTheDocument();
  });
});
