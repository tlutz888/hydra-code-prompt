import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { NavigationBar } from "./pages/NavigationBar";
import { SignIn } from "./pages/SignIn/SignIn";
import { SignUp } from "./pages/SignUp/SignUp";

function App() {
  const [user, setUser] = useState();
  const [isAuthorized, setIsAuthorized] = useState(false);

  // TODO - Add a useEffect to check if the user is logged in on load

  return (
    <BrowserRouter>
      <NavigationBar {...{ user, setUser, isAuthorized, setIsAuthorized }} />
      <Routes>
        <Route path="/" element={<Home {...{ user, isAuthorized }} />} />
        <Route
          path="/signin"
          element={<SignIn {...{ setUser, setIsAuthorized }} />}
        />
        <Route
          path="/signup"
          element={<SignUp {...{ setUser, setIsAuthorized }} />}
        />
        <Route path="*" element={<div>Error!!</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
