import { Link } from "react-router-dom";
import styled from "styled-components";

const NavHeader = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f0f0f0;
  border-bottom: 1px solid #000000;
  font-size: 1rem;
`;
const StyledLink = styled(Link)`
  padding: 0.5rem;
  text-decoration: none;
  color: #000000;
`;

const LogoutButton = styled.button`
  padding: 0.5rem;
  color: #000000;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1rem;
`;

export const NavigationBar = ({ setUser, isAuthorized, setIsAuthorized }) => {
  const handleSignOut = () => {
    setUser(null);
    setIsAuthorized(false);
    localStorage.removeItem("jwt");
  };
  return (
    <NavHeader>
      <section>
        <StyledLink to="/">Home</StyledLink>
      </section>
      <section>
        {isAuthorized ? (
          <LogoutButton type="button" onClick={handleSignOut}>
            Sign Out
          </LogoutButton>
        ) : (
          <>
            <StyledLink to="/signin">Sign In</StyledLink>
            <StyledLink to="/signup">Sign Up</StyledLink>
          </>
        )}
      </section>
    </NavHeader>
  );
};
