package com.narang.web.repository;

import com.narang.web.entity.Emotion;
import com.narang.web.entity.FaceImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class FaceImageRepositoryCustomImpl implements FaceImageRepositoryCustom {
    private static final String COLLECTION = "faceImage";
    private static final Class<FaceImage> CLASS = FaceImage.class;

    private MongoTemplate faceTemplate;

    @Autowired
    FaceImageRepositoryCustomImpl(MongoTemplate faceTemplate) {
        this.faceTemplate = faceTemplate;
    }

    @Override
    public Optional<FaceImage> findByUid(String uid) {
        Criteria cr = new Criteria("uid").is(uid);
        Query q = new Query(cr);
        FaceImage newFaceImage = faceTemplate.findOne(q, FaceImage.class);
        return Optional.of(newFaceImage);
    }

    @Override
    public Boolean deleteByUid(String uid) {
        Criteria cr = new Criteria("uid").is(uid);
        Query q = new Query(cr);
        faceTemplate.remove(q, "faceImage");
        return true;
    }


    @Override
    public Boolean deleteByTwo(String uid, List<String> ids) {
        Criteria orCriteria = new Criteria();
        List<Criteria> orExp = new ArrayList<>();

        Criteria cr = new Criteria("uid").is(uid);
        Query q = new Query(cr);

        ids.forEach(id -> {
            Criteria exp = new Criteria();
            exp.and("_id").is(id);
            orExp.add(exp);
        });

        q.addCriteria(orCriteria.orOperator(orExp.toArray(new Criteria[orExp.size()])));

        System.out.println(q);
        faceTemplate.remove(q, COLLECTION);
        return true;
    }
}
