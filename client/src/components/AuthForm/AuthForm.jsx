import React, { useState } from "react";
import styled from "styled-components";
import { useMountedState } from "react-use";

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

export const ErrorContainer = styled.section`
  background-color: #ffeeee;
  border-radius: 0.25rem;
  padding: 0.5rem;
  outline: 1px solid #ff0000;
  margin-bottom: 1rem;
`;

export const AUTH_FORM_TYPES = {
  SIGN_IN: "SIGN_IN",
  SIGN_UP: "SIGN_UP",
};

const AuthForm = ({ onSubmit, formType }) => {
  // TODO handle API errors
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const isMounted = useMountedState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validateForm = () => {
      const errors = [];
      if (!username) {
        errors.push("Username is required");
      }
      if (!password) {
        errors.push("Password is required");
      }
      return errors;
    };

    const formErrors = validateForm();

    if (!formErrors.length) {
      setLoading(true);
      await onSubmit({ username, password });
      // TODO - make sure this doesn't fire after unmount
      if (isMounted) {
        setLoading(false);
      }
    } else {
      setValidationErrors(formErrors);
    }
  };

  // TODO - Form validation
  return (
    <Form onSubmit={handleSubmit}>
      {validationErrors.length > 0 && (
        <ErrorContainer>
          you have the following errors:
          <ul>
            {validationErrors.map((error, i) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </ErrorContainer>
      )}
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
