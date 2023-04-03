import { useNavigate } from "react-router-dom";
import AuthForm, { AUTH_FORM_TYPES } from "../../components/AuthForm/AuthForm";
import { SERVER_PORT } from "../../utils/constants";

export const SignIn = ({ setUser, setIsAuthorized }) => {
  const navigate = useNavigate();
  const handleSignIn = async ({ username, password }) => {
    try {
      const response = await fetch(`${SERVER_PORT}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (!response.ok || data.error) {
        const errorMessage = data.error || "unknown error in sign in";
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
      <h1>Sign In</h1>
      <h2>Enter your username and password to sign in.</h2>
      <AuthForm onSubmit={handleSignIn} formType={AUTH_FORM_TYPES.SIGN_IN} />
    </main>
  );
};
