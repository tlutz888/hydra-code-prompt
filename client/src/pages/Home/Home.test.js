import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Home } from "./Home";

describe("Home", () => {
  it("displays Sign In and Sign Up links when not authorized", () => {
    render(
      <MemoryRouter>
        <Home user={null} isAuthorized={false} />
      </MemoryRouter>
    );

    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  it("displays username and no links when a user is authorized", () => {
    const user = {
      username: "testuser",
    };

    render(
      <MemoryRouter>
        <Home user={user} isAuthorized={true} />
      </MemoryRouter>
    );

    expect(screen.getByText(/testuser/)).toBeInTheDocument();
    expect(screen.queryByText("Sign In")).not.toBeInTheDocument();
    expect(screen.queryByText("Sign Up")).not.toBeInTheDocument();
  });
});
