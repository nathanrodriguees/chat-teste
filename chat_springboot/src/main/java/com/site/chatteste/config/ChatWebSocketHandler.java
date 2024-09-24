package com.site.chatteste.config;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.site.chatteste.model.Message;
import com.site.chatteste.repository.MessageRepository;

public class ChatWebSocketHandler extends TextWebSocketHandler {

	private final ObjectMapper objectMapper = new ObjectMapper();
	private final List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();
	private final MessageRepository messageRepository;

	public ChatWebSocketHandler(MessageRepository messageRepository) {
		this.messageRepository = messageRepository;
	}

	@Override
	public void afterConnectionEstablished(WebSocketSession session) {
		sessions.add(session);
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		Message newMessage = objectMapper.readValue(message.getPayload(), Message.class);
		messageRepository.save(newMessage); // Salva a mensagem no MongoDB

		// Envia a mensagem para todos os clientes conectados
		for (WebSocketSession webSocketSession : sessions) {
			webSocketSession.sendMessage(new TextMessage(objectMapper.writeValueAsString(newMessage)));
		}
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
		sessions.remove(session);
	}
}
