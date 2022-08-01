package com.narang.web.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.narang.web.entity.Emotion;
import com.narang.web.mongoTemplate.EmotionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EmotionRestController {
    final String UID = "uid";
    final String DID = "did";

    @Autowired
    private EmotionTemplate emotionTemplate;

    @GetMapping("/emotions")
    public String findAll() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(emotionTemplate.findAll());
    }

    @GetMapping("/emotion/{id}")
    public String findById(@PathVariable("id") String id) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(emotionTemplate.findById(id));
    }

    @GetMapping("/emotion/uid/{uid}")
    public String findByUid(@PathVariable("uid") String uid) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(emotionTemplate.findOne(UID, uid));
    }

    @GetMapping("/emotion/did/{did}")
    public String findByDid(@PathVariable("did") String did) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(emotionTemplate.findOne(DID, did));
    }

    @RequestMapping(path = "/emotion", method = {RequestMethod.POST, RequestMethod.PUT})
    public Boolean save(Emotion emotion) {
        emotionTemplate.insert(emotion);
        return true;
    }

    @DeleteMapping("/emotion/{id}")
    public Boolean delete(@PathVariable("id") String id) {
        emotionTemplate.delete(id);
        return true;
    }

    @DeleteMapping("/emotion/uid/{id}")
    public Boolean deleteByUid(@PathVariable("uid") String uid, String id) {
        emotionTemplate.deleteByUid(id, uid);
        return true;
    }
}
