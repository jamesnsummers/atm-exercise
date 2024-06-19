import React, { useState } from 'react';
import './App.css';
import Atm from './components/Atm';
import Auth from './components/Auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const [pin, setPin] = useState('');
  const [loginSuccessMessage, setloginSuccessMessage] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  return (
    <div className='app'>
      <div className='atmScreen'>
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={
                <Auth
                  pin={pin}
                  setPin={setPin}
                  loginSuccessMessage={loginSuccessMessage}
                  setloginSuccessMessage={setloginSuccessMessage}
                  loginErrorMessage={loginErrorMessage}
                  setLoginErrorMessage={setLoginErrorMessage}
                />
              }
            />
            <Route
              path='/atm'
              element={
                <Atm
                  title='Checking Account'
                  loginSuccessMessage={loginSuccessMessage}
                  setloginSuccessMessage={setloginSuccessMessage}
                  setPin={setPin}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
