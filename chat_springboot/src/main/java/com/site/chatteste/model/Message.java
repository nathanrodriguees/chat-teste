package com.site.chatteste.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "messages")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Message {

	@Id
	private String id;
	private String sender;
	private String text;

}
