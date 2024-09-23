import React, { useState, useEffect } from 'react';
import LoginForm from './componentes/pages/Login';
import ChatWindow from './componentes/pages/Chat';
import './App.css';
import "./index.css"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleLogin = (name) => {
    setUserName(name);
    setIsLoggedIn(true);
  };

  return (
    <div className="container">
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <ChatWindow userName={userName} />
      )}
    </div>
  );
}

export default App;
