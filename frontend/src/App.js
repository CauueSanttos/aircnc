import React from 'react';

import './App.css';

import logo from './assets/logo.svg';

import Routes from './routes';

function App() {
  async function handleSignOut() {
    localStorage.removeItem('user');
  }

  return (
    <div className="container">
      <img src={logo} onClick={handleSignOut} alt="AirCnC"/>

      <div className="content">
        <Routes />
      </div>
    </div>
  );
}

export default App;
