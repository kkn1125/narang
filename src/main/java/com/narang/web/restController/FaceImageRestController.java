package com.narang.web.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.narang.web.entity.FaceImage;
import com.narang.web.mongoTemplate.FaceImageTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FaceImageRestController {
    @Autowired
    private FaceImageTemplate faceTemplate;

    @GetMapping("/faces")
    public String findAll() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        /* 매퍼를 먼저 생성합니다. */
        System.out.println(faceTemplate.findAll());
        return mapper.writeValueAsString(faceTemplate.findAll());
    }

    @GetMapping("/face/{uid}")
    public String findOne(@PathVariable("uid") String uid) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        /* 매퍼를 먼저 생성합니다. */
        System.out.println(faceTemplate.findById(uid));
        return mapper.writeValueAsString(faceTemplate.findById(uid));
    }

    @RequestMapping(path = "/face", method = {RequestMethod.POST, RequestMethod.PUT})
    public Boolean save(FaceImage face) {
        /* 매퍼를 먼저 생성합니다. */
        System.out.println(face);
        faceTemplate.insert(face);
        return true;
    }

    @DeleteMapping("/face/{uid}")
    public Boolean delete(@PathVariable("uid") String uid, @RequestParam("ids") List<String> ids) {
        /* 매퍼를 먼저 생성합니다. */
        System.out.println(uid);
        System.out.println(ids);
        if (ids == null) {
            faceTemplate.delete(uid);
        } else {
            faceTemplate.deleteByTwo(uid, ids);
        }
        return true;
    }
    // https://stackoverflow.com/questions/17987380/combine-get-and-post-request-methods-in-spring 메서드 값 받아오기
}