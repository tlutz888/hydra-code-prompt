import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { MyAccount } from "./pages/MyAccount";
import { NavigationBar } from "./pages/NavigationBar";
import { SignIn } from "./pages/SignIn/SignIn";
import { SignUp } from "./pages/SignUp/SignUp";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="*" element={<div>Error!!</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
