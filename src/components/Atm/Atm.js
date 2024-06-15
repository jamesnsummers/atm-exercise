import React, { useState } from "react";
import "./Atm.css";
import { useNavigate } from "react-router-dom";

const DAILY_WITHDRAW_LIMIT = 1000;

const Atm = (props) => {
  const { title = "Checking Account", loginSuccess } = props;
  const navigate = useNavigate();

  const [balance, setBalance] = useState(50);
  const [showBalance, setShowBalance] = useState(false);
  const [totalWithdrawn, setTotalWithdrawn] = useState(0);
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
      setError("You don't have that much money in here");
    } else if (amount < balance && totalWithdrawn < DAILY_WITHDRAW_LIMIT) {
      const newBalance = balance - amount;
      const newWithdrawalAmount = totalWithdrawn + amount;
      setTotalWithdrawn(newWithdrawalAmount);
      setBalance(newBalance);
      setAmount("");
    } else if (amount < balance && totalWithdrawn >= DAILY_WITHDRAW_LIMIT) {
      const newWithdrawalAmount = totalWithdrawn + amount;
      setTotalWithdrawn(newWithdrawalAmount);
      setError("You have reached your daily withdrawal limit");
    }
  };

  return (
    <>
      {loginSuccess ? (
        <div className="account">
          <h1 className="loginSuccess">{loginSuccess}</h1>
          <h2 className="accountTitle">{title}</h2>
          {!showBalance && (
            <input
              className="showBalanceButton"
              type="button"
              value="Show Balance"
              onClick={setShowBalance}
            />
          )}
          {showBalance && (
            <div className="balance">Current balance: ${balance}</div>
          )}
          <input
            className="amountInput"
            type="number"
            placeholder="Enter an amount"
            value={amount}
            onChange={handleAmountChange}
          />
          <input
            className="depositButton"
            type="button"
            value="Deposit"
            onClick={deposit}
          />
          <input
            className="withdrawalButton"
            type="button"
            value="Withdraw"
            onClick={withdraw}
          />
          {error && <h3>{error}</h3>}
        </div>
      ) : (
        <div>
          <h1>Login to access your account</h1>
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
