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
          <h1 className='loginScreenTitle'>Enter your PIN</h1>
          <PinInput
            inputStyle={{
              borderRadius: '10px',
              borderColor: '#ffffff',
              color: '#ffffff',
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '1rem',
            }}
            inputFocusStyle={{ borderColor: '#009FCF' }}
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
          <p className='welcomeMessage'>{loginSuccessMessage} 🎉</p>
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
