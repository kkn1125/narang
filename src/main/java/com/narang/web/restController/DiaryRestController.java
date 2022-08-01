package com.narang.web.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.narang.web.entity.Diary;
import com.narang.web.mongoTemplate.DiaryTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class DiaryRestController {
    @Autowired
    DiaryTemplate diaryTemplate;

    @GetMapping("/diaries")
    public String findAll() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(diaryTemplate.findAll());
    }

    @GetMapping("/diary/{id}")
    public String findById(@PathVariable("id") String id) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(diaryTemplate.findById(id));
    }

    @RequestMapping(path="/diary", method={RequestMethod.POST,RequestMethod.PUT})
    public Boolean save(Diary diary) {
        diaryTemplate.update(diary);
        return true;
    }

    @DeleteMapping("/diary/{id}")
    public Boolean delete(@PathVariable("id") String id) {
        diaryTemplate.delete(id);
        return true;
    }
}
