package com.site.chatteste.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "comunidades")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Comunidade {
	@Id
	private String id;
	private String nome; 
}
