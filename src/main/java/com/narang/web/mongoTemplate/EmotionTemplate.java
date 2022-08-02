package com.narang.web.mongoTemplate;

import com.narang.web.entity.Emotion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class EmotionTemplate implements CrudTemplate<Emotion>{
    private static final String COLLECTION = "emotion";
    private static final Class<Emotion> CLASS = Emotion.class;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<Emotion> findAll() {
        return mongoTemplate.findAll(CLASS);
    }

    @Override
    public Emotion findById(String id) {
        return mongoTemplate.findById(id, CLASS);
    }

    public Emotion findOne(String relatedField, String id) {
        Criteria cr = new Criteria(relatedField);
        cr.is(id);
        Query q = new Query(cr);

        return mongoTemplate.findOne(q, CLASS);
    }

    @Override
    public String insert(Emotion emotion) {
        return mongoTemplate.save(emotion, COLLECTION).getId();
    }

    @Override
    public void update(Emotion emotion) {
        mongoTemplate.save(emotion, COLLECTION);
    }

    @Override
    public void delete(String id) {
        Criteria cr = new Criteria("_id");
        cr.is(id);
        Query q = new Query(cr);
        mongoTemplate.save(q, COLLECTION);
    }

    public void deleteByUid(String id, String uid) {
        Criteria cr = new Criteria("_id").is(id);

        Query q = new Query(cr);

        Criteria exp = new Criteria();
        exp.and("_id").is(id);

        q.addCriteria(exp);

        System.out.println(q);
        mongoTemplate.remove(q, COLLECTION);
    }
}
