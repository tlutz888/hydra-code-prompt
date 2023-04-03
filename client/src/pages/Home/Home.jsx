import { Link } from "react-router-dom";
import styled from "styled-components";
import { HomePageContent } from "./HomePageContent";

const HomePageContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Home = ({ user, isAuthorized }) => {
  if (!isAuthorized) {
    return (
      <HomePageContainer>
        <h1>Home</h1>
        <section>
          Welcome to Tom's Hydra Prompt. Please
          <Link to="/signin"> Sign In </Link>
          or
          <Link to="/signup"> Sign Up </Link>
          or Create an Account to continue
        </section>
      </HomePageContainer>
    );
  }

  return (
    <HomePageContainer>
      <h1>Home</h1>
      Welcome {user.username}
      <HomePageContent {...{ user }} />
    </HomePageContainer>
  );
};
