import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../UserContext/UserContext';
import "./style.css";

function ChatWindow() {
  const { chatId } = useParams();  // Obtém o ID do chat da URL
  const { userName } = useUser();  // Obtém o userName do contexto
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [socket, setSocket] = useState(null);

  // Função para rolar até o fim do chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Carregar as mensagens ao selecionar o chat
  useEffect(() => {
    axios.get(`http://localhost:8080/messages?chatId=${chatId}`)
      .then((response) => {
        setMessages(response.data);  // Carrega as mensagens do banco
        scrollToBottom();  // Rola para o fim
      })
      .catch((error) => {
        console.error('Erro ao carregar mensagens:', error);
      });
  }, [chatId]);

  // Conectar ao WebSocket e receber mensagens em tempo real
  useEffect(() => {
    const webSocket = new WebSocket(`ws://localhost:8080/chat/${chatId}`);
    setSocket(webSocket);

    webSocket.onopen = () => {
      console.log('WebSocket conectado');
    };

    webSocket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);  // Adiciona a nova mensagem
      scrollToBottom();  // Rola para o fim
    };

    webSocket.onclose = () => {
      console.log('WebSocket desconectado');
    };

    webSocket.onerror = (error) => {
      console.error('Erro no WebSocket:', error);
    };

    return () => {
      webSocket.close();
    };
  }, [chatId]);  // Conecta e desconecta ao trocar o chatId

  // Função para enviar mensagem
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && socket && socket.readyState === WebSocket.OPEN) {
      const newMessage = { sender: userName, text: message, chatId };

      // Enviar a mensagem via WebSocket (sem adicionar localmente)
      socket.send(JSON.stringify(newMessage));

      // Limpar a mensagem
      setMessage('');

      // Rolar para o fim da conversa
      scrollToBottom();
    } else {
      console.error('WebSocket não está pronto para envio de mensagens.');
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
        <div ref={messagesEndRef} />
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
