import AuthForm, { AUTH_FORM_TYPES } from "../../components/AuthForm/AuthForm";

export const SignIn = () => {
  const handleSignIn = ({ username, password }) => {
    // Handle the sign-in process
    console.log("Signing in **  Username:", username, "Password:", password);
  };

  return (
    <main>
      <h1>Sign In</h1>
      <AuthForm onSubmit={handleSignIn} formType={AUTH_FORM_TYPES.SIGN_IN} />
    </main>
  );
};
