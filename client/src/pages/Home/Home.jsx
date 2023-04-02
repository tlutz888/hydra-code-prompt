import { Link } from "react-router-dom";
import { HomePageContainer } from "./styles";

export const Home = () => {
  const authorized = false;

  if (!authorized) {
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
      <section>Welcome to Tom's Hydra Prompt. Here is your content!</section>
    </HomePageContainer>
  );
};
