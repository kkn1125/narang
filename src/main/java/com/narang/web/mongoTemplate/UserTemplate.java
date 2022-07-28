package com.narang.web.mongoTemplate;

import com.narang.web.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserTemplate {
    @Autowired
    private MongoTemplate mongoTemplate;

    public List<User> findAll() {
        return mongoTemplate.findAll(User.class);
    }
}
