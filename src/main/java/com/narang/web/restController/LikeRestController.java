package com.narang.web.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.narang.web.entity.Like;
import com.narang.web.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class LikeRestController {
    LikeService likeService;

    @Autowired
    LikeRestController(LikeService likeService) {
        this.likeService = likeService;
    }

    private String mapper(Object object) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        return mapper.writeValueAsString(object);
    }

    @GetMapping("/likes")
    public String findAll() throws JsonProcessingException {
        return mapper(likeService.findAll());
    }

    @GetMapping("/like/{id}")
    public String findById(@PathVariable("id") String id) throws JsonProcessingException {
        return mapper(likeService.findById(id));
    }

    @GetMapping("/like/did/{did}")
    public String findByDid(@PathVariable("did") String did) throws JsonProcessingException {
        return mapper(likeService.findByDid(did));
    }

    @GetMapping("/like/uid/{uid}")
    public String findByUid(@PathVariable("uid") String uid) throws JsonProcessingException {
        return mapper(likeService.findByUid(uid));
    }

    @PostMapping("/like")
    public String insert(Like like) {
        return likeService.insert(like);
    }

    @DeleteMapping("/like/{id}")
    public Boolean deleteById(@PathVariable("id") String id) {
        return likeService.deleteById(id);
    }

    @DeleteMapping("/like/did/{did}")
    public Boolean deleteByDid(@PathVariable("did") String did, String uid) {
        return likeService.deleteByDid(did, uid);
    }

    @DeleteMapping("/like/uid/{uid}")
    public Boolean deleteByUid(@PathVariable("uid") String uid) {
        return likeService.deleteByUid(uid);
    }
}
