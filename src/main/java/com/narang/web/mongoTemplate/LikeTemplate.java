package com.narang.web.mongoTemplate;

import com.narang.web.entity.Like;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class LikeTemplate implements CrudTemplate<Like> {
    private static final String COLLECTION = "like";
    private static final Class<Like> CLASS = Like.class;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<Like> findAll() {
        return mongoTemplate.findAll(CLASS);
    }

    @Override
    public Like findById(String id) {
        return mongoTemplate.findById(id, CLASS);
    }

    public List<Like> findByDid(String did) {
        Criteria cr = new Criteria("did");
        cr.is(did);
        Query q = new Query(cr);
        return mongoTemplate.find(q, CLASS);
    }

    public List<Like> findByUid(String uid) {
        Criteria cr = new Criteria("uid");
        cr.is(uid);
        Query q = new Query(cr);
        return mongoTemplate.find(q, CLASS);
    }

    @Override
    public String insert(Like like) {
        return mongoTemplate.insert(like, COLLECTION).getId();
    }

    @Override
    public void update(Like like) {
        mongoTemplate.save(like, COLLECTION);
    }

    @Override
    public void delete(String id) {
        Criteria cr = new Criteria("_id");
        cr.is(id);
        Query q = new Query(cr);
        mongoTemplate.remove(q, COLLECTION);
    }

    public void deleteByDid(String did, String uid) {
        Criteria cr = new Criteria("did");
        cr.is(did);
        Query q = new Query(cr);
        q.addCriteria(new Criteria("uid").is(uid));
        mongoTemplate.remove(q, COLLECTION);
    }

    public void deleteByUid(String uid) {
        Criteria cr = new Criteria("uid");
        cr.is(uid);
        Query q = new Query(cr);
        mongoTemplate.remove(q, COLLECTION);
    }
}
