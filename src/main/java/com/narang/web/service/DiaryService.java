package com.narang.web.service;

import com.narang.web.entity.Diary;
import com.narang.web.repository.DiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiaryService {
    private DiaryRepository diaryRepository;

    @Autowired
    DiaryService(DiaryRepository diaryRepository) {
        this.diaryRepository = diaryRepository;
    }

    public List<Diary> findAll() {
        return diaryRepository.findAll();
    }

    public Diary findById(String id) {
        return diaryRepository.findById(id).orElseThrow();
    }

    public String insert(Diary diary) {
        Diary newDiary = diaryRepository.insert(diary);
        return newDiary.getId();
    }

    public Diary update(Diary diary){
        return diaryRepository.update(diary);
    }

    public Boolean deleteById(String id) {
        diaryRepository.deleteById(id);
        return true;
    }
}
