package com.site.chatteste.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.site.chatteste.repository.MessageRepository;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

	private final MessageRepository messageRepository;

	@Autowired
	public WebSocketConfig(MessageRepository messageRepository) {
		this.messageRepository = messageRepository;
	}

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(new ChatWebSocketHandler(messageRepository), "/chat").setAllowedOrigins("*");
	}
}
