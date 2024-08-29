import React, { useState } from 'react';
import "./style.css";

function ChatWindow({ userName }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, { sender: userName, text: message }]);
      setMessage('');
    }
  };

  return (
    <section className="chat">
      <section className="chat__messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === userName ? "message--self" : "message--other"}>
            {msg.sender !== userName && <span className="message--sender">{msg.sender}</span>}
            {msg.text}
          </div>
        ))}
      </section>

      <form className="chat__form" onSubmit={handleSendMessage}>
        <input
          type="text"
          className="chat__input"
          placeholder="Digite uma mensagem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit" className="chat__button">
          <span className="material-symbols-outlined">Enviar</span>
        </button>
      </form>
    </section>
  );
}

export default ChatWindow;
