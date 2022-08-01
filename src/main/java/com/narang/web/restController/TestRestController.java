package com.narang.web.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document("test")
class Test {
    @Id
    public String id;
    @Field
    public String name;
    @Field
    public Integer age;
    @Field
    public List<String> saids;
    @Field
    public String _class;
}

@RestController
@RequestMapping("/api")
public class TestRestController {
    @Autowired
    MongoTemplate mongo;

    @GetMapping("/tests")
    public String findAll() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();

        return mapper.writeValueAsString(mongo.findAll(Test.class));
    }

    @PostMapping("/test")
    public Boolean insertOne() throws JsonProcessingException {
        Test test = new Test();
        List<String> list = new ArrayList<String>();
        list.add("haha");
        list.add("keke");

        test.setAge(30);
        test.setName("kimson");
        test.setSaids(list);

        mongo.insert(test, "test");
        return true;
    }
}
