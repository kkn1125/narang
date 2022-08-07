package com.narang.web.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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

    @GetMapping("/likes")
    public String findAll() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();

        return mapper.writeValueAsString(likeService.findAll());
    }

    @GetMapping("/like/{id}")
    public String findById(@PathVariable("id") String id) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();

        return mapper.writeValueAsString(likeService.findById(id));
    }

    @GetMapping("/like/did/{did}")
    public String findByDid(@PathVariable("did") String did) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();

        return mapper.writeValueAsString(likeService.findByDid(did));
    }

    @GetMapping("/like/uid/{uid}")
    public String findByUid(@PathVariable("uid") String uid) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();

        return mapper.writeValueAsString(likeService.findByUid(uid));
    }

    @PostMapping("/like")
    public String insert(Like like) {
        return likeService.insert(like);
    }

    @DeleteMapping("/like/{id}")
    public Boolean delete(@PathVariable("id") String id) {
        likeService.deleteById(id);

        return true;
    }

    @DeleteMapping("/like/did/{did}")
    public Boolean deleteByDid(@PathVariable("did") String did, String uid) {
        System.out.println(uid);
        likeService.deleteByDid(did, uid);

        return true;
    }

    @DeleteMapping("/like/uid/{uid}")
    public Boolean deleteByUid(@PathVariable("uid") String uid) {
        likeService.deleteByUid(uid);

        return true;
    }
}
