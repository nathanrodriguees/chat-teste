package com.site.chatteste.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.site.chatteste.model.Message;

@Repository
public interface MessageRepository extends MongoRepository<Message, String> {
	
	
}
