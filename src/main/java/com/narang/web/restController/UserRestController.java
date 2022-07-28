package com.narang.web.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.narang.web.mongoTemplate.UserTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserRestController {
    @Autowired
    private UserTemplate userTemplate;

    @GetMapping("/users")
    public String findAll() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        /* 매퍼를 먼저 생성합니다. */

        return mapper.writeValueAsString(userTemplate.findAll());
        /* 객체를 JSON String 으로 변환 :: String */
    }
}
