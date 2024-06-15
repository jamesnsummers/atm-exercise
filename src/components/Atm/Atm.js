import React, { useState } from "react";
import "./Atm.css";
import PinInput from "react-pin-input";

const CORRECT_PIN = "7164";

const Atm = (props) => {
  const { title = "Checking Account" } = props;

  const [pin, setPin] = useState("");
  const [balance, setBalance] = useState(50);
  const [showBalance, setShowBalance] = useState(false);
  const [amount, setAmount] = useState("");
  const [loginSuccess, setloginSuccess] = useState("");
  const [loginError, setLoginError] = useState("");
  const [error, setError] = useState("");

  const handlePinComplete = (value) => {
    setPin(value);
  };

  const handleLogin = () => {
    if (pin === CORRECT_PIN) {
      setloginSuccess("🎉 Welcome back! Login successful!");
      setLoginError("");
      console.log("User logged in successfully");
    } else {
      // PIN is incorrect
      setLoginError("❌ Incorrect PIN. Please try again.");
      setloginSuccess("");
      console.log("Incorrect PIN attempt");
    }
  };

  const handleAmountChange = (e) => {
    const value = Number(e.target.value);
    setAmount(value);
    setError(null);
  };

  const deposit = () => {
    const newBalance = balance + amount;
    setBalance(newBalance);
    setAmount("");
  };

  const withdraw = () => {
    if (amount > balance) {
      setError("You broke");
    } else {
      const newBalance = balance - amount;
      setBalance(newBalance);
      setAmount("");
    }
  };
  return (
    <>
      {loginError && <p>{loginError}</p>}
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
        </div>
      )}
      {loginSuccess && (
        <div className="account">
          <div>{loginSuccess}</div>
          <h1>{title}</h1>
          {!showBalance && (
            <input
              type="button"
              value="Show Balance"
              onClick={setShowBalance}
            />
          )}
          {showBalance && (
            <div className="balance">
              Current balance: ${showBalance && balance}
            </div>
          )}
          <input
            type="number"
            placeholder="Enter an amount"
            value={amount}
            onChange={handleAmountChange}
          />
          <input type="button" value="Deposit" onClick={deposit} />
          <input type="button" value="Withdraw" onClick={withdraw} />
          {error && <h3>{error}</h3>}
        </div>
      )}
    </>
  );
};

export default Atm;
