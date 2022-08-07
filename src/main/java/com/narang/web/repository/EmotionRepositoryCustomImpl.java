package com.narang.web.repository;

import com.narang.web.entity.Diary;
import com.narang.web.entity.Emotion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.Optional;

public class EmotionRepositoryCustomImpl implements EmotionRepositoryCustom {
    private MongoTemplate emotionTemplate;

    @Autowired
    EmotionRepositoryCustomImpl(MongoTemplate emotionTemplate) {
        this.emotionTemplate = emotionTemplate;
    }


    @Override
    public Optional<Emotion> findByUid(String uid) {
        Criteria cr = new Criteria("uid").is(uid);
        Query q = new Query();
        Emotion foundEmotion = emotionTemplate.findOne(q, Emotion.class);
        return Optional.of(foundEmotion);
    }

    @Override
    public Optional<Emotion> findByDid(String did) {
        Criteria cr = new Criteria("did").is(did);
        Query q = new Query();
        Emotion foundEmotion = emotionTemplate.findOne(q, Emotion.class);
        return Optional.of(foundEmotion);
    }

    @Override
    public Boolean updateToPart(Emotion emotion) {
        Criteria cr = new Criteria("did").is(emotion.getDid());
        Query q = new Query(cr);
        emotionTemplate.remove(q, "emotion");
        emotionTemplate.insert(emotion, "emotion");
        return true;
    }

    @Override
    public Boolean deleteByDid(String did) {
        Criteria cr = new Criteria("did").is(did);
        Query q = new Query(cr);
        emotionTemplate.remove(q, "emotion");
        return true;
    }

    @Override
    public Boolean deleteByUid(String uid) {
        Criteria cr = new Criteria("uid").is(uid);
        Query q = new Query(cr);
        emotionTemplate.remove(q, "emotion");
        return true;
    }
}
