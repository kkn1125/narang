package com.narang.web.restController;

import com.narang.web.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.data.mongodb.core.MongoTemplate;

@DataMongoTest
class UserRestControllerTest {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Test
    void saveTest() {
//        객체의 부분 정보만 받아와 수정할 때 사용
//        Criteria criteria = new Criteria("_id");
//        criteria.is(1L);
//        Query query = new Query(criteria);
//
//        Update update = new Update();
//        update.set("nickName", "kimson2");
//        update.set("email", "kimson@gmail.com");
//        update.set("password", "123123qQ!");
//        update.set("phone", "010-5050-1010");
//        update.set("isFaceSign", false);
//
//        mongoTemplate.updateFirst(query, update, "user");

//      변경된 객체 정보를 모두 받아와 수정하거나 새로운 정보를 추가할 때 사용
        User user = new User();

//      단, 객체 아이디 값은 필수 사항

        user.setNickName("kimson12");
        user.setEmail("chaplet01@gmail.com");
        user.setPassword("123123qQ!");
        user.setPhone("010-5050-1010");
        user.setIsFaceSign(true);
        System.out.println(user);
        mongoTemplate.save(user, "user");
        System.out.println(mongoTemplate.findAll(User.class));
    }
}