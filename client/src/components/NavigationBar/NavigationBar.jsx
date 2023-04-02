import { Link } from "react-router-dom";

export const NavigationBar = () => {
  // TODO hide if areas if not relevant
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/signin">Sign In</Link>
      <Link to="/signup">Sign Up</Link>
      <Link to="/myaccount">My Account</Link>
    </nav>
  );
};
