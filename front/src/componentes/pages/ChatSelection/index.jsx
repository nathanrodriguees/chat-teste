import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext/UserContext';
import './style.css';

function ChatSelection() {
  const navigate = useNavigate();
  const { userName } = useUser();  // Obtém o nome do usuário do contexto

  const enterChat = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <section className="chat-selection">
      <h2>Bem-vindo, {userName}! Selecione um Chat</h2> {/* Mostra o nome do usuário */}
      <div className="chat-selection__options">
        <button onClick={() => enterChat('Chat1')}>Entrar no Chat 1</button>
        <button onClick={() => enterChat('Chat2')}>Entrar no Chat 2</button>
      </div>
    </section>
  );
}

export default ChatSelection;
