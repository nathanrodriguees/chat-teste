package com.site.chatteste.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.site.chatteste.model.Message;
import com.site.chatteste.repository.MessageRepository;

@RestController
@CrossOrigin(origins = "*")
public class ChatController {

	@Autowired
	MessageRepository repository;

	@GetMapping("/messages")
	public List<Message> getMessagesByChat(@RequestParam String chatId) {
		return repository.findByChatId(chatId);
	}
}
