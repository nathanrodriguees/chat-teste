import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './componentes/pages/Login';
import ChatSelection from './componentes/pages/ChatSelection';
import ChatWindow from './componentes/pages/Chat';
import { UserProvider } from './componentes/pages/UserContext/UserContext';
import './App.css';
import "./index.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true); // Define que o usuário está logado
  };

  return (
    <UserProvider>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={!isLoggedIn ? <LoginForm onLogin={handleLogin} /> : <Navigate to="/chat-selection" />} />
            <Route path="/chat-selection" element={isLoggedIn ? <ChatSelection /> : <Navigate to="/" />} />
            <Route path="/chat/:chatId" element={isLoggedIn ? <ChatWindow /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
