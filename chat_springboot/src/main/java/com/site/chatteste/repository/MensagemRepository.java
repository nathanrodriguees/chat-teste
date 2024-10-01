package com.site.chatteste.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.site.chatteste.model.Mensagem;

@Repository
public interface MensagemRepository extends MongoRepository<Mensagem, String> {

	List<Mensagem> findByChatId(String chatId); // Busca mensagens por chatId

}
