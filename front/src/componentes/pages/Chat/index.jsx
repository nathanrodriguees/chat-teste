import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; // Biblioteca para fazer requisições HTTP
import "./style.css";

function ChatWindow({ userName }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null); // Ref para o scroll
  const [socket, setSocket] = useState(null); // Estado para WebSocket

  // Função para rolar até a última mensagem
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Carregar mensagens do MongoDB quando o componente é montado
  useEffect(() => {
    axios.get('http://localhost:8080/messages')
      .then((response) => {
        setMessages(response.data); // Define as mensagens com as salvas no MongoDB
        scrollToBottom();
      })
      .catch((error) => {
        console.error('Erro ao carregar mensagens:', error);
      });
  }, []);

  // Conectar ao WebSocket
  useEffect(() => {
    const webSocket = new WebSocket('ws://localhost:8080/chat'); // Substitua pela URL do seu backend
    setSocket(webSocket);

    webSocket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]); // Adiciona novas mensagens ao estado
    };

    return () => {
      webSocket.close();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = { sender: userName, text: message };
      socket.send(JSON.stringify(newMessage)); // Envia a mensagem via WebSocket
      setMessage(''); // Limpa o campo de entrada
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
