import React, { useState, useEffect, useRef } from 'react';
import "./style.css";

function ChatWindow({ userName }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null); // Ref para o scroll

  // Efeito para carregar mensagens salvas no localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages)); // Carrega as mensagens do localStorage
    }
  }, []);

  // Efeito para salvar mensagens no localStorage sempre que elas mudam
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages)); // Salva as mensagens no localStorage
    }
  }, [messages]);

  // Função para rolar até a última mensagem
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Efeito para rolar automaticamente para a última mensagem quando novas mensagens chegarem
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
        <div ref={messagesEndRef} /> {/* Div que serve para o scroll até o fim */}
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
