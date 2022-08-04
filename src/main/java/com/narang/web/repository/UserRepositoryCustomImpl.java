package com.narang.web.repository;

import com.narang.web.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.Optional;


public class UserRepositoryCustomImpl implements UserRepositoryCustom {
    @Autowired
    MongoTemplate mongo;

    @Override
    public User findByNickName(String nickName) {
        Criteria cr = new Criteria("nickName");
        cr.is(nickName);
        Query q = new Query(cr);
        return mongo.findOne(q, User.class);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        Criteria cr = new Criteria("email");
        cr.is(email);
        Query q = new Query(cr);

        return Optional.of(mongo.findOne(q, User.class));
    }
}
