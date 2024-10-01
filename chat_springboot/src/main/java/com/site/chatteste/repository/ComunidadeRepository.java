package com.site.chatteste.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.site.chatteste.model.Comunidade;

@Repository
public interface ComunidadeRepository extends MongoRepository<Comunidade, String> {
}
