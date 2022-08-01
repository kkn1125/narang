package com.narang.web.mongoTemplate;

import com.narang.web.entity.FaceImage;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

@Component
public class FaceImageTemplate implements CrudTemplate<FaceImage> {
    private static final String COLLECTION = "faceImage";
    private static final Class<FaceImage> CLASS = FaceImage.class;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<FaceImage> findAll() {
        return mongoTemplate.findAll(CLASS);
    }

    @Override
    public FaceImage findById(String uid) {
        Criteria cr = new Criteria("uid");
        cr.is(uid);
        Query q = new Query(cr);
        return mongoTemplate.findOne(q, CLASS);
    }

    @Override
    public void insert(FaceImage faceImage) {
        mongoTemplate.save(faceImage, COLLECTION);
    }

    @Override
    public void update(FaceImage faceImage) {
        mongoTemplate.save(faceImage, COLLECTION);
    }

    @Override
    public void delete(String uid) {
        Criteria cr = new Criteria("uid");
        cr.is(uid);
        Query q = new Query(cr);
        mongoTemplate.remove(q, COLLECTION);
    }

    public void deleteByTwo(String uid, List<String> ids) {
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
        mongoTemplate.remove(q, COLLECTION);
    }
}

// https://stackoverflow.com/questions/45719225/specify-multiple-criterias-in-spring-mongo-db-query multi query 참조
// https://stackoverflow.com/questions/12756688/is-it-possible-to-send-an-array-with-the-postman-chrome-extension list로 postman에서 spring으로 값 넘겨주기
// 스프링에서는 List로 받고 postman에서는 동일한 필드명으로 여러개 주면 된다. 아래 링크 참조하면 빠르다.
// https://velog.io/@as9587/Spring%EC%97%90%EC%84%9C-FormData-%EB%A5%BC-%ED%8C%8C%EC%8B%B1Parsing-%ED%95%98%EC%A7%80-%EB%AA%BB%ED%95%98%EB%8A%94-%EA%B2%BD%EC%9A%B0