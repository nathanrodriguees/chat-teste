package com.site.chatteste.config;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "mensagem")
public class ObjMsg {

	@Id
	private String id;
	
	private String user;
	private String msg;

	@Override
	public String toString() {
		return user + "   " + msg;
	}
}
