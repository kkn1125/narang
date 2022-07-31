package com.narang.web.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.narang.web.entity.User;
import com.narang.web.mongoTemplate.UserTemplate;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;

@RestController
@RequestMapping("/api")
public class UserRestController {
    @Autowired
    private UserTemplate userTemplate;

    @GetMapping("/users")
    public String findAll() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        /* 매퍼를 먼저 생성합니다. */
        System.out.println(userTemplate.findAll());
        return mapper.writeValueAsString(userTemplate.findAll());
        /* 객체를 JSON String 으로 변환 :: String */
    }

    @GetMapping("/user/{id}")
    public String findById(@PathVariable("id") String id) throws JsonProcessingException {
        System.out.println(id);
        ObjectMapper mapper = new ObjectMapper();
        System.out.println(userTemplate.findById(id));
        return mapper.writeValueAsString(userTemplate.findById(id));
    }

    @PostMapping("/user")
    @PutMapping("/user")
    public Boolean save(User user) {
        System.out.println("called user insert method");
        System.out.println(user);
        userTemplate.insert(user);
        return true;
    }

    @DeleteMapping("/user/{id}")
    public Boolean delete(@PathVariable("id") String id) {
        System.out.println("called user insert method");
        userTemplate.delete(id);
        return true;
    }
}
