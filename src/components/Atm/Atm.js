import React, { useState } from "react";
import "./Atm.css";
import { useNavigate } from "react-router-dom";

const Atm = (props) => {
  const { title = "Checking Account", loginSuccess } = props;
  const navigate = useNavigate();

  const [balance, setBalance] = useState(50);
  const [showBalance, setShowBalance] = useState(false);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

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
      {loginSuccess ? (
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
            <div className="balance">Current balance: ${balance}</div>
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
      ) : (
        <div>
          <h3>Login to access your account</h3>
          <input
            type="button"
            value="Return to login screen"
            onClick={() => navigate("/")}
          />
        </div>
      )}
    </>
  );
};

export default Atm;
