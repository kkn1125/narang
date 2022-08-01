package com.narang.web.repository;

import com.narang.web.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

public class UserRepositoryCustomImpl implements UserRepositoryCustom{
    @Autowired
    MongoTemplate mongo;
    @Override
    public void findQuery(String query) {
        System.out.println("나는 도비다");
        System.out.println(mongo.findAll(User.class));
    }
}
