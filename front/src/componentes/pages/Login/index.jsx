import React, { useState } from 'react';
import { useUser } from '../UserContext/UserContext';
import './style.css';

function LoginForm({ onLogin }) {
  const [name, setName] = useState('');
  const { setUserName } = useUser();  // Define o userName no contexto

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      setUserName(name);  // Define o nome de usuário no contexto
      onLogin();          // Notifica o App que o login foi realizado
    }
  };

  return (
    <section className="login">
      <h2>Login</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="login__input"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit" className="login__button">Entrar</button>
      </form>
    </section>
  );
}

export default LoginForm;
