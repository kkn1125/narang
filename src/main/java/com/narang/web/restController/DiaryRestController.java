package com.narang.web.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.narang.web.entity.Diary;
import com.narang.web.mongoTemplate.DiaryTemplate;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

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

    @PostMapping("/diary")
    public String insert(Diary diary) {
        String newObjectId = diaryTemplate.insert(diary);
        System.out.println(diary);
        return newObjectId;
    }
    @PutMapping("/diary")
    public Boolean update(Diary diary) {
        diaryTemplate.update(diary);
        return true;
    }

    @DeleteMapping("/diary/{id}")
    public Boolean delete(@PathVariable("id") String id) {
        diaryTemplate.delete(id);
        return true;
    }
}
