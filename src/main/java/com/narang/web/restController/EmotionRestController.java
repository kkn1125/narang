package com.narang.web.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.narang.web.entity.Emotion;
import com.narang.web.service.EmotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EmotionRestController {
    final String UID = "uid";
    final String DID = "did";

    //    @Autowired
//    private EmotionTemplate emotionTemplate;
    private EmotionService emotionService;

    @Autowired
    EmotionRestController(EmotionService emotionService) {
        this.emotionService = emotionService;
    }

    @GetMapping("/emotions")
    public String findAll() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(emotionService.findAll());
    }

    @GetMapping("/emotion/{id}")
    public String findById(@PathVariable("id") String id) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(emotionService.findById(id));
    }

    @GetMapping("/emotion/uid/{uid}")
    public String findByUid(@PathVariable("uid") String uid) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(emotionService.findByUid(UID));
    }

    @GetMapping("/emotion/did/{did}")
    public String findByDid(@PathVariable("did") String did) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        System.out.println(emotionService.findByDid(DID));
        return mapper.writeValueAsString(emotionService.findByDid(DID));
    }

    @PostMapping("/emotion")
    public String insert(Emotion emotion) {
        System.out.println(emotion);
        String newObjectId = emotionService.insert(emotion);
        return newObjectId;
    }

    @DeleteMapping("/emotion/{id}")
    public Boolean delete(@PathVariable("id") String id) {
        emotionService.delete(id);
        return true;
    }

    @DeleteMapping("/emotion/did/{did}")
    public Boolean deleteByDid(@PathVariable("did") String did) {
        emotionService.deleteByDid(did);
        return true;
    }

    @DeleteMapping("/emotion/uid/{uid}")
    public Boolean deleteByUid(@PathVariable("uid") String uid) {
        emotionService.deleteByUid(uid);
        return true;
    }
}
