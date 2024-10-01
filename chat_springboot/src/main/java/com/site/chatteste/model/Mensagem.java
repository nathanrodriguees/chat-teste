package com.site.chatteste.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "mensagens")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Mensagem {
	@Id
	private String id;
	private String usuario;
	private String conteudo;
	private String chatId; // Novo campo para identificar o chat
}
