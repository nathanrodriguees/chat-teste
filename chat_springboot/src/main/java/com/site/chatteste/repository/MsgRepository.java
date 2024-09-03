package com.site.chatteste.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.site.chatteste.config.ObjMsg;

@Repository
public interface MsgRepository extends MongoRepository<ObjMsg, String> {

}
