import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem;
`;

export const AUTH_FORM_TYPES = {
  SIGN_IN: "SIGN_IN",
  SIGN_UP: "SIGN_UP",
};

const AuthForm = ({ onSubmit, formType }) => {
  // TODO handle errors
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("submitting", { username, password });
    await onSubmit({ username, password });
    // TODO - make sure this doesn't fire after unmount
    setLoading(false);
  };

  // TODO - Form validation
  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="username">Username:</Label>
      <Input
        disabled={loading}
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Label htmlFor="password">Password:</Label>
      <Input
        disabled={loading}
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" disabled={loading}>
        {formType === AUTH_FORM_TYPES.SIGN_IN ? "Sign In" : "Sign Up"}
      </Button>
    </Form>
  );
};

export default AuthForm;
