package com.site.chatteste.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.site.chatteste.model.Comunidade;
import com.site.chatteste.model.Mensagem;
import com.site.chatteste.repository.ComunidadeRepository;
import com.site.chatteste.repository.MensagemRepository;

@RestController
@CrossOrigin(origins = "*")
public class ChatController {

	@Autowired
	MensagemRepository repository;

	@Autowired
	ComunidadeRepository comunidadeRepository;

	@GetMapping("/mensagens")
	public List<Mensagem> getMessagesByChat(@RequestParam String chatId) {
		return repository.findByChatId(chatId);
	}

	// Endpoint para buscar todas as comunidades
	@GetMapping("/comunidades")
	public List<Comunidade> getAllComunidades() {
		return comunidadeRepository.findAll();
	}

	// Endpoint para criar uma nova comunidade
	@PostMapping("/comunidades")
	public Comunidade createComunidade(@RequestBody Comunidade comunidade) {
		return comunidadeRepository.save(comunidade);
	}

}
