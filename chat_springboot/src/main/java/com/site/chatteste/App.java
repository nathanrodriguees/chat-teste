package com.site.chatteste;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.site.chatteste.config.ObjMsg;
import com.site.chatteste.repository.MsgRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/app")
public class App {

	@Autowired
	MsgRepository repository;

	@GetMapping
	public ResponseEntity<List<ObjMsg>> getMensagens() {
		return ResponseEntity.ok(repository.findAll());
	}

	@MessageMapping("/chatMessage")
	@SendTo("/canal")
	public ObjMsg sendMessage(@RequestBody @Valid ObjMsg message) {

		repository.save(message);
		System.out.println(message.toString());
		return message;
	}

}