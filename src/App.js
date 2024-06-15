import React, { useState } from "react";
import "./App.css";
import Atm from "./components/Atm";
import Auth from "./components/Auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [pin, setPin] = useState("");
  const [loginSuccess, setloginSuccess] = useState("");
  const [loginError, setLoginError] = useState("");

  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Auth
                  pin={pin}
                  setPin={setPin}
                  loginSuccess={loginSuccess}
                  setloginSuccess={setloginSuccess}
                  loginError={loginError}
                  setLoginError={setLoginError}
                />
              }
            />
            <Route
              path="/atm"
              element={
                <Atm loginSuccess={loginSuccess} loginError={loginError} />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
