import React from 'react';
import './Auth.css';
import PinInput from 'react-pin-input';
import { useNavigate } from 'react-router-dom';

const CORRECT_PIN = '1234';

const Auth = (props) => {
  const {
    pin,
    setPin,
    loginSuccessMessage,
    setloginSuccessMessage,
    loginErrorMessage,
    setLoginErrorMessage,
  } = props;
  const navigate = useNavigate();

  const handlePinComplete = (value) => {
    setPin(value);
  };

  const handleLogin = () => {
    if (pin === CORRECT_PIN) {
      setloginSuccessMessage('Welcome back!');
      setLoginErrorMessage('');
      navigate('/atm');
    } else {
      setLoginErrorMessage('Incorrect PIN. Please try again.');
      setloginSuccessMessage('');
    }
  };

  return (
    <>
      {!loginSuccessMessage && (
        <div className='loginScreenContainer'>
          <h1 className='loginScreenLogo'>A-T-M</h1>
          <h2 className='enterPinTitle'>Enter your PIN</h2>
          <PinInput
            inputStyle={{
              borderRadius: '10px',
              borderColor: '#f4eeda',
              color: '#00ff33',
              fontSize: '18px',
              fontFamily: 'Tiny5',
              fontWeight: '600',
              marginBottom: '1rem',
            }}
            inputFocusStyle={{ boxShadow: '0px 0px 6px 1px #00ff33' }}
            focus
            length={4}
            onComplete={handlePinComplete}
            secret
            secretDelay={500}
            type='numeric'
          />
          <button className='button loginButton' onClick={handleLogin}>
            Enter
          </button>
          {loginErrorMessage && (
            <p className='loginErrorMessage'>{loginErrorMessage}</p>
          )}
        </div>
      )}
      {/* When user has already logged in but navigates back to root give them a CTA to access their account */}
      {loginSuccessMessage && (
        <div className='account'>
          <p className='welcomeMessage'>
            You're already logged in. Click the button below to view your
            account.
          </p>
          <input
            className='button viewAccountButton'
            type='button'
            value='View account'
            onClick={() => navigate('/atm')}
          />
        </div>
      )}
    </>
  );
};

export default Auth;
