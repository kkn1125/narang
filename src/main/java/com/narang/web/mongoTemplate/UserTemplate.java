package com.narang.web.mongoTemplate;

import com.narang.web.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserTemplate implements CrudTemplate<User>{
    private static final String COLLECTION = "user";
    private static final Class<User> CLASS = User.class;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<User> findAll() {
        return mongoTemplate.findAll(CLASS);
    }

    @Override
    public User findById(String id) {
        return mongoTemplate.findById(id, CLASS);
    }

    @Override
    public void insert(User user) {
        mongoTemplate.save(user, COLLECTION);
    }

    @Override
    public void update(User user) {
        mongoTemplate.save(user, COLLECTION);
    }

    @Override
    public void delete(String id) {
        Criteria cr = new Criteria("_id");
        cr.is(id);
        Query q = new Query(cr);
        mongoTemplate.remove(q, CLASS);
    }
}
