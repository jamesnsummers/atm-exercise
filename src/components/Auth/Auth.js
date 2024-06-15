import React from "react";
import "./Auth.css";
import PinInput from "react-pin-input";
import { useNavigate } from "react-router-dom";

const CORRECT_PIN = "7164";

const Auth = (props) => {
  const {
    pin,
    setPin,
    loginSuccess,
    setloginSuccess,
    loginError,
    setLoginError,
  } = props;
  const navigate = useNavigate();

  const handlePinComplete = (value) => {
    setPin(value);
  };

  const handleLogin = () => {
    if (pin === CORRECT_PIN) {
      setloginSuccess("Welcome back!");
      setLoginError("");
      navigate("/atm");
    } else {
      setLoginError("Incorrect PIN. Please try again.");
      setloginSuccess("");
    }
  };

  return (
    <>
      {!loginSuccess && (
        <div>
          <h1>Enter your PIN</h1>
          <PinInput
            length={4}
            type="numeric"
            onComplete={handlePinComplete}
            secret
            secretDelay={500}
          />
          <button onClick={handleLogin}>SUBMIT</button>
          {loginError && <p>{loginError}</p>}
        </div>
      )}
      {loginSuccess && (
        <div className="account">
          <div>{loginSuccess}</div>
          <input
            type="button"
            value="View account"
            onClick={() => navigate("/atm")}
          />
        </div>
      )}
    </>
  );
};

export default Auth;
