package com.narang.web.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.narang.web.entity.Diary;
import com.narang.web.service.DiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class DiaryRestController {
    @Autowired
    DiaryService diaryService;

    @GetMapping("/diaries")
    public String findAll() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(diaryService.findAll());
    }

    @GetMapping("/diary/{id}")
    public String findById(@PathVariable("id") String id) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(diaryService.findById(id));
    }

    @PostMapping("/diary")
    public String insert(Diary diary) {
        String newObjectId = diaryService.insert(diary);
        System.out.println(diary);
        return newObjectId;
    }

    @PutMapping("/diary")
    public Boolean update(Diary diary) {
        return diaryService.update(diary);
    }

    @DeleteMapping("/diary/{id}")
    public Boolean delete(@PathVariable("id") String id) {
        diaryService.deleteById(id);
        return true;
    }
}
