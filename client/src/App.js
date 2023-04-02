import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { SignIn } from "./components/SignIn";
import { Signup } from "./components/Signup";
import { MyAccount } from "./components/MyAccount";
import { NavigationBar } from "./components/NavigationBar";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="*" element={<div>Error!!</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
