import { useNavigate } from "react-router-dom";
import AuthForm, { AUTH_FORM_TYPES } from "../../components/AuthForm/AuthForm";
import { SERVER_PORT } from "../../utils/constants";

// TODO - clean up props
export const SignUp = ({ user, setUser, isAuthorized, setIsAuthorized }) => {
  const navigate = useNavigate();
  const handleSignUp = async ({ username, password }) => {
    try {
      const response = await fetch(`${SERVER_PORT}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (!response.ok || data.error) {
        const errorMessage = data.error || "unknown error in sign up";
        throw new Error(errorMessage);
      }

      if (data.token) {
        setUser({ username });
        setIsAuthorized(true);
        localStorage.setItem("jwt", data.token);
        navigate("/");
      }
      // TODO - show error in UI
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  return (
    <main>
      <h1>Sign Up</h1>
      <h2>Enter a username and password to create an account.</h2>
      <AuthForm onSubmit={handleSignUp} formType={AUTH_FORM_TYPES.SIGN_IN} />
    </main>
  );
};
