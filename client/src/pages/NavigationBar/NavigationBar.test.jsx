import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NavigationBar } from "./NavigationBar";

describe("NavigationBar", () => {
  it("displays Sign In and Sign Up links when not authorized", () => {
    render(
      <MemoryRouter>
        <NavigationBar
          setUser={jest.fn()}
          isAuthorized={false}
          setIsAuthorized={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  it("displays Sign Out button when authorized", () => {
    render(
      <MemoryRouter>
        <NavigationBar
          setUser={jest.fn()}
          isAuthorized={true}
          setIsAuthorized={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Sign Out")).toBeInTheDocument();
  });

  it("calls setUser and setIsAuthorized with correct arguments on Sign Out button click", () => {
    const setUser = jest.fn();
    const setIsAuthorized = jest.fn();

    render(
      <MemoryRouter>
        <NavigationBar
          setUser={setUser}
          isAuthorized={true}
          setIsAuthorized={setIsAuthorized}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Sign Out"));

    expect(setUser).toHaveBeenCalledWith(null);
    expect(setIsAuthorized).toHaveBeenCalledWith(false);
  });
});
