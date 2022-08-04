package com.narang.web.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.narang.web.entity.Like;
import com.narang.web.mongoTemplate.LikeTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class LikeRestController {
    @Autowired
    LikeTemplate template;

    @GetMapping("/likes")
    public String findAll() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();

        return mapper.writeValueAsString(template.findAll());
    }

    @GetMapping("/like/{id}")
    public String findById(@PathVariable("id") String id) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();

        return mapper.writeValueAsString(template.findById(id));
    }

    @GetMapping("/like/did/{did}")
    public String findByDid(@PathVariable("did") String did) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();

        return mapper.writeValueAsString(template.findByDid(did));
    }

    @GetMapping("/like/uid/{uid}")
    public String findByUid(@PathVariable("uid") String uid) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();

        return mapper.writeValueAsString(template.findByDid(uid));
    }

    @PostMapping("/like")
    public String insert(Like like) {
        return template.insert(like);
    }

    @PutMapping("/like")
    public Boolean update(Like like) {
        try {
            template.update(like);
        } catch(Exception ex) {
            return false;
        }
        return true;
    }

    @DeleteMapping("/like/{id}")
    public Boolean delete(@PathVariable("id") String id) {
        template.delete(id);

        return true;
    }
    @DeleteMapping("/like/did/{did}")
    public Boolean deleteByDid(@PathVariable("did") String did, String uid) {
        System.out.println(uid);
        template.deleteByDid(did, uid);

        return true;
    }
    @DeleteMapping("/like/uid/{uid}")
    public Boolean deleteByUid(@PathVariable("uid") String uid) {
        template.deleteByUid(uid);

        return true;
    }
}
