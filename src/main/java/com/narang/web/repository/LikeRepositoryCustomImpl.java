package com.narang.web.repository;

import com.narang.web.entity.Like;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.Optional;

public class LikeRepositoryCustomImpl implements LikeRepositoryCustom {
    private MongoTemplate likeTemplate;

    @Autowired
    LikeRepositoryCustomImpl(MongoTemplate likeTemplate) {
        this.likeTemplate = likeTemplate;
    }

    @Override
    public Optional<Like> findByUid(String uid) {
        Criteria cr = new Criteria("uid").is(uid);
        Query q = new Query(cr);
        Like foundLike = likeTemplate.findOne(q, Like.class);
        return Optional.of(foundLike);
    }

    @Override
    public Optional<Like> findByDid(String did) {
        Criteria cr = new Criteria("did").is(did);
        Query q = new Query(cr);
        Like foundLike = likeTemplate.findOne(q, Like.class);
        return Optional.of(foundLike);
    }

    @Override
    public Boolean deleteByUid(String uid) {
        Criteria cr = new Criteria("uid").is(uid);
        Query q = new Query(cr);
        likeTemplate.remove(q, "like");
        return true;
    }

    @Override
    public Boolean deleteByDid(String did, String uid) {
        Criteria cr = new Criteria("did");
        cr.is(did);
        Query q = new Query(cr);
        q.addCriteria(new Criteria("uid").is(uid));
        likeTemplate.remove(q, "like");
        return true;
    }

}
