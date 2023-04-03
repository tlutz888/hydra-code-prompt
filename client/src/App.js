import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { MyAccount } from "./pages/MyAccount";
import { NavigationBar } from "./pages/NavigationBar";
import { SignIn } from "./pages/SignIn/SignIn";
import { SignUp } from "./pages/SignUp/SignUp";

function App() {
  const [user, setUser] = useState();
  const [isAuthorized, setIsAuthorized] = useState(false);

  console.log({ user, isAuthorized });

  // TODO - Add a useEffect to check if the user is logged in on load

  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route
          path="/"
          element={
            <Home {...{ user, setUser, isAuthorized, setIsAuthorized }} />
          }
        />
        <Route
          path="/signin"
          element={
            <SignIn {...{ user, setUser, isAuthorized, setIsAuthorized }} />
          }
        />
        <Route
          path="/signup"
          element={
            <SignUp {...{ user, setUser, isAuthorized, setIsAuthorized }} />
          }
        />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="*" element={<div>Error!!</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
