package com.narang.web.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.narang.web.entity.Diary;
import com.narang.web.service.DiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class DiaryRestController {
    private DiaryService diaryService;

    @Autowired
    DiaryRestController(DiaryService diaryService) {
        this.diaryService = diaryService;
    }

    private String mapper(Object object) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        return mapper.writeValueAsString(object);
    }

    @GetMapping("/diaries")
    public String findAll() throws JsonProcessingException {
        return mapper(diaryService.findAll());
    }

    @GetMapping("/diary/{id}")
    public String findById(@PathVariable("id") String id) throws JsonProcessingException {
        return mapper(diaryService.findById(id));
    }

    @PostMapping("/diary")
    public String insert(Diary diary) {
        String newObjectId = diaryService.insert(diary);
        return newObjectId;
    }

    @PutMapping("/diary")
    public String update(Diary diary) throws JsonProcessingException {
        return mapper(diaryService.update(diary));
    }

    @DeleteMapping("/diary/{id}")
    public Boolean deleteById(@PathVariable("id") String id) {
        return diaryService.deleteById(id);
    }
}
