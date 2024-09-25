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
		sessions.add(session); // Adiciona a nova sessão à lista
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		// Recebe a mensagem, converte para o objeto Message e salva no MongoDB
		Message newMessage = objectMapper.readValue(message.getPayload(), Message.class);
		messageRepository.save(newMessage); // Salva a mensagem no banco

		// Extrai o chatId da URL da sessão
		String sessionChatId = extractChatIdFromSession(session);

		// Envia a mensagem apenas para os usuários conectados ao mesmo chatId
		for (WebSocketSession webSocketSession : sessions) {
			String webSocketChatId = extractChatIdFromSession(webSocketSession); // Extrai o chatId da outra sessão
			if (webSocketSession.isOpen() && webSocketChatId.equals(newMessage.getChatId())) {
				webSocketSession.sendMessage(new TextMessage(objectMapper.writeValueAsString(newMessage)));
			}
		}
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
		sessions.remove(session); // Remove a sessão quando o WebSocket é desconectado
	}

	// Método auxiliar para extrair o chatId da URL
	private String extractChatIdFromSession(WebSocketSession session) {
		String path = session.getUri().getPath();
		return path.substring(path.lastIndexOf('/') + 1); // Extrai o chatId da URL
	}
}