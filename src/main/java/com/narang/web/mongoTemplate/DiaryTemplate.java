package com.narang.web.mongoTemplate;

import com.narang.web.entity.Diary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DiaryTemplate implements CrudTemplate<Diary> {
    private static final String COLLECTION = "diary";
    private static final Class<Diary> CLASS = Diary.class;

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public List<Diary> findAll() {
        return mongoTemplate.findAll(CLASS);
    }

    @Override
    public Diary findById(String id) {
        return mongoTemplate.findById(id, CLASS);
    }

    @Override
    public String insert(Diary diary) {
        return mongoTemplate.save(diary, COLLECTION).getId();
    }

    @Override
    public void update(Diary diary) {
        mongoTemplate.save(diary, COLLECTION);
    }

    @Override
    public void delete(String id) {
        Criteria cr = new Criteria("_id");
        cr.is(id);
        Query q = new Query(cr);

        mongoTemplate.remove(q, COLLECTION);
    }

    public void deleteByUid(String uid) {
        Criteria cr = new Criteria("uid");
        cr.is(uid);
        Query q = new Query(cr);

        mongoTemplate.remove(q, COLLECTION);
    }

}
