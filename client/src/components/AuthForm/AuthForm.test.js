import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthForm, { AUTH_FORM_TYPES } from "./AuthForm";

const setup = (formType = AUTH_FORM_TYPES.SIGN_IN) => {
  const onSubmit = jest.fn();
  render(<AuthForm onSubmit={onSubmit} formType={formType} />);
  const usernameInput = screen.getByLabelText("Username:");
  const passwordInput = screen.getByLabelText("Password:");
  const submitButton = screen.getByRole("button");
  return { onSubmit, usernameInput, passwordInput, submitButton };
};

describe("AuthForm", () => {
  it("renders AuthForm and inputs", () => {
    const { usernameInput, passwordInput } = setup();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it("shows errors when required fields are empty", async () => {
    const { submitButton } = setup();
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText("Username is required")).toBeInTheDocument();
    });
    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });

  it("calls onSubmit with correct data", async () => {
    const { onSubmit, usernameInput, passwordInput, submitButton } = setup();
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
    expect(onSubmit).toHaveBeenCalledWith({
      username: "testuser",
      password: "testpassword",
    });
  });

  it("renders Sign Up button when formType is SIGN_UP", () => {
    const { submitButton } = setup(AUTH_FORM_TYPES.SIGN_UP);
    expect(submitButton).toHaveTextContent("Sign Up");
  });

  it("disables form inputs and button when loading", async () => {
    const onSubmit = jest.fn();
    render(<AuthForm onSubmit={onSubmit} formType={AUTH_FORM_TYPES.SIGN_IN} />);

    const usernameInput = screen.getByLabelText("Username:");
    const passwordInput = screen.getByLabelText("Password:");
    const submitButton = screen.getByRole("button", { name: "Sign In" });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(submitButton);

    // Loading state is true after clicking the submit button
    expect(usernameInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });

  it("displays validation errors when form is submitted with empty fields and doesn't call API", async () => {
    const onSubmit = jest.fn();
    render(<AuthForm onSubmit={onSubmit} formType={AUTH_FORM_TYPES.SIGN_IN} />);

    const submitButton = screen.getByRole("button", { name: "Sign In" });
    fireEvent.click(submitButton);

    screen.getByText("Username is required");
    screen.getByText("Password is required");
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
