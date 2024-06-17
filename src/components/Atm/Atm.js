import React, { useEffect, useState } from 'react';
import './Atm.css';
import { useNavigate } from 'react-router-dom';

const DAILY_WITHDRAWAL_LIMIT = 1000;

const Atm = (props) => {
  const {
    title = 'Checking Account',
    loginSuccessMessage = '',
    setloginSuccessMessage,
  } = props;
  const navigate = useNavigate();

  const [showWelcome, setShowWelcome] = useState(true);
  const [balance, setBalance] = useState(50);
  const [showBalance, setShowBalance] = useState(false);
  const [totalWithdrawn, setTotalWithdrawn] = useState(0);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleAmountChange = (e) => {
    const value = Number(e.target.value);
    setAmount(value);
    setError(null);
  };

  const deposit = () => {
    const newBalance = balance + amount;
    setBalance(newBalance);
    setAmount('');
  };

  const withdraw = () => {
    if (amount > balance && totalWithdrawn < DAILY_WITHDRAWAL_LIMIT) {
      setError("You don't have that much money in here");
    } else if (
      amount < balance &&
      totalWithdrawn < DAILY_WITHDRAWAL_LIMIT &&
      amount < DAILY_WITHDRAWAL_LIMIT
    ) {
      const newBalance = balance - amount;
      const newWithdrawalAmount = totalWithdrawn + amount;
      setTotalWithdrawn(newWithdrawalAmount);
      setBalance(newBalance);
    } else if (totalWithdrawn > DAILY_WITHDRAWAL_LIMIT) {
      const newWithdrawalAmount = totalWithdrawn + amount;
      setTotalWithdrawn(newWithdrawalAmount);
      setError('You have reached your daily withdrawal limit');
    } else if (totalWithdrawn === DAILY_WITHDRAWAL_LIMIT) {
      setError('You have reached your daily withdrawal limit');
    } else if (amount < balance && amount >= DAILY_WITHDRAWAL_LIMIT) {
      setError('Amount exceeds your daily withdrawal limit');
    }
    setAmount('');
  };

  const exit = () => {
    setloginSuccessMessage('');
    navigate('/');
  };

  useEffect(() => {
    setTimeout(() => {
      setShowWelcome(false);
    }, 2000);
  }, []);

  return (
    <>
      {loginSuccessMessage ? (
        <div className='account'>
          {showWelcome && (
            <p className='welcomeMessage'>{loginSuccessMessage} 🎉</p>
          )}
          <h1 className='accountTitle'>{title}</h1>
          <input
            className='amountInput'
            type='number'
            placeholder='Enter an amount'
            value={amount}
            onChange={handleAmountChange}
          />
          <div className='topButtonContainer'>
            <input
              className='button depositButton'
              type='button'
              value='Deposit'
              onClick={deposit}
            />
            <input
              className='button showBalanceButton'
              type='button'
              value='Balance'
              onClick={setShowBalance}
            />
          </div>
          <div className='bottomButtonContainer'>
            <input
              className='button withdrawalButton'
              type='button'
              value='Withdrawal'
              onClick={withdraw}
            />
            <input
              className='button withdrawalButton'
              type='button'
              value='Exit'
              onClick={exit}
            />
          </div>
          <h2 className='balance'>
            Current balance:{' '}
            <span className='balanceAmount'>
              {showBalance ? `$${balance.toFixed(2)}` : ''}
            </span>
          </h2>
          {error && <h2 className='errorMessage'>{error}</h2>}
        </div>
      ) : (
        // when a user navigates to /atm without first logging in, give them CTA to get to login screen
        <div>
          <h1>Login to access your account</h1>
          <input
            className='button returnToLoginButton'
            type='button'
            value='Login'
            onClick={() => navigate('/')}
          />
        </div>
      )}
    </>
  );
};

export default Atm;
